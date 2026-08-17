import React, { createContext, useContext, useState } from "react";
import { Storage } from "../utils/storage";

const ProfileContext = createContext(null);

export function calculateProfileCompleteness(profile) {
  if (!profile) return { percentage: 0, missingFields: [] };

  const checkFields = [
    { key: "name", label: "Full Name", weight: 10 },
    { key: "college", label: "College Name", weight: 10 },
    { key: "degree", label: "Degree / Course", weight: 10 },
    { key: "skills", label: "Skills (at least 3)", weight: 15, isValid: (v) => Array.isArray(v) && v.length >= 3 },
    { key: "experienceLevel", label: "Experience Level", weight: 10 },
    { key: "projects", label: "Projects / Portfolio", weight: 10, isValid: (v) => typeof v === "string" && v.trim().length > 10 },
    { key: "resumeName", label: "Resume Upload", weight: 10, isValid: (v) => !!v },
    { key: "interests", label: "Core Interests", weight: 10, isValid: (v) => Array.isArray(v) && v.length >= 1 },
    { key: "industries", label: "Preferred Industries", weight: 5, isValid: (v) => Array.isArray(v) && v.length >= 1 },
    { key: "targetRole", label: "Target Role", weight: 5, isValid: (v) => !!v },
    { key: "workMode", label: "Preferred Work Mode", weight: 5, isValid: (v) => !!v }
  ];

  let totalScore = 0;
  const missing = [];

  for (const item of checkFields) {
    const val = profile[item.key];
    const isOk = item.isValid ? item.isValid(val) : !!val;
    if (isOk) {
      totalScore += item.weight;
    } else {
      missing.push(item.label);
    }
  }

  return {
    percentage: Math.min(100, totalScore),
    missingFields: missing
  };
}

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(() => Storage.getProfile());

  const updateProfile = (updatedFields) => {
    const updated = { ...profile, ...updatedFields };
    setProfileState(updated);
    Storage.setProfile(updated);
    Storage.setAuthUser(updated);
    return updated;
  };

  const completeOnboarding = (onboardingData) => {
    const finalProfile = {
      ...profile,
      ...onboardingData,
      onboardingComplete: true
    };
    setProfileState(finalProfile);
    Storage.setProfile(finalProfile);
    Storage.setAuthUser(finalProfile);
    return finalProfile;
  };

  const completeness = calculateProfileCompleteness(profile);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        completeOnboarding,
        completeness
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
