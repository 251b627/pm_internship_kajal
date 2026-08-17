import React, { createContext, useContext, useState, useMemo } from "react";
import { MOCK_INTERNSHIPS } from "../data/mockInternships";
import { Storage } from "../utils/storage";
import { useProfile } from "./ProfileContext";
import { rankInternships } from "../utils/recommendationEngine";

const InternshipContext = createContext(null);

export function InternshipProvider({ children }) {
  const { profile } = useProfile();
  const [internships] = useState(MOCK_INTERNSHIPS);
  const [savedIds, setSavedIds] = useState(() => Storage.getSavedInternships());
  const [applications, setApplications] = useState(() => Storage.getApplications());

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedWorkMode, setSelectedWorkMode] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [minStipend, setMinStipend] = useState(0);
  const [sortBy, setSortBy] = useState("match"); // 'match', 'stipend', 'deadline', 'latest'

  // Dynamic ranking based on the current profile
  const rankedInternships = useMemo(() => {
    return rankInternships(internships, profile);
  }, [internships, profile]);

  // Filtered & Sorted recommendations
  const filteredInternships = useMemo(() => {
    let list = [...rankedInternships];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.industry.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          (job.skills || []).some((s) => s.toLowerCase().includes(q))
      );
    }

    // 2. Role Filter
    if (selectedRole !== "All") {
      list = list.filter((job) =>
        job.title.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    // 3. Industry Filter
    if (selectedIndustry !== "All") {
      list = list.filter((job) => job.industry === selectedIndustry);
    }

    // 4. Work Mode
    if (selectedWorkMode !== "All") {
      list = list.filter((job) => job.workMode === selectedWorkMode);
    }

    // 5. Duration
    if (selectedDuration !== "All") {
      list = list.filter((job) => job.duration === selectedDuration);
    }

    // 6. Min Stipend
    if (minStipend > 0) {
      list = list.filter((job) => (job.stipendNumeric || 0) >= minStipend);
    }

    // 7. Sort
    list.sort((a, b) => {
      if (sortBy === "match") return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === "stipend") return (b.stipendNumeric || 0) - (a.stipendNumeric || 0);
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === "latest") return a.id.localeCompare(b.id);
      return 0;
    });

    return list;
  }, [
    rankedInternships,
    searchQuery,
    selectedRole,
    selectedIndustry,
    selectedWorkMode,
    selectedDuration,
    minStipend,
    sortBy
  ]);

  // Saved Internships
  const savedInternships = useMemo(() => {
    return rankedInternships.filter((job) => savedIds.includes(job.id));
  }, [rankedInternships, savedIds]);

  const toggleSave = (id) => {
    const isSaved = savedIds.includes(id);
    const newSaved = isSaved ? savedIds.filter((item) => item !== id) : [...savedIds, id];
    setSavedIds(newSaved);
    Storage.setSavedInternships(newSaved);
  };

  const isSaved = (id) => savedIds.includes(id);

  // Apply to Internship
  const applyToInternship = (internshipId, coverNote = "") => {
    const existing = applications.find((a) => a.internshipId === internshipId);
    if (existing) return existing;

    const newApp = {
      id: "app-" + Date.now(),
      internshipId,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied",
      coverNote,
      timeline: [
        {
          stage: "Applied",
          date: new Date().toISOString().split("T")[0],
          note: "Application submitted with attached student profile."
        }
      ]
    };

    const newApps = [newApp, ...applications];
    setApplications(newApps);
    Storage.setApplications(newApps);
    return newApp;
  };

  const updateApplicationStatus = (appId, newStatus) => {
    const newApps = applications.map((app) => {
      if (app.id === appId) {
        return {
          ...app,
          status: newStatus,
          timeline: [
            ...app.timeline,
            {
              stage: newStatus,
              date: new Date().toISOString().split("T")[0],
              note: `Recruiter transitioned application to ${newStatus}.`
            }
          ]
        };
      }
      return app;
    });

    setApplications(newApps);
    Storage.setApplications(newApps);
  };

  const getApplication = (internshipId) => {
    return applications.find((a) => a.internshipId === internshipId);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRole("All");
    setSelectedIndustry("All");
    setSelectedWorkMode("All");
    setSelectedDuration("All");
    setMinStipend(0);
    setSortBy("match");
  };

  return (
    <InternshipContext.Provider
      value={{
        internships,
        rankedInternships,
        filteredInternships,
        savedInternships,
        savedIds,
        toggleSave,
        isSaved,
        applications,
        applyToInternship,
        updateApplicationStatus,
        getApplication,

        // Filters
        searchQuery,
        setSearchQuery,
        selectedRole,
        setSelectedRole,
        selectedIndustry,
        setSelectedIndustry,
        selectedWorkMode,
        setSelectedWorkMode,
        selectedDuration,
        setSelectedDuration,
        minStipend,
        setMinStipend,
        sortBy,
        setSortBy,
        resetFilters
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
}

export function useInternships() {
  const context = useContext(InternshipContext);
  if (!context) {
    throw new Error("useInternships must be used within an InternshipProvider");
  }
  return context;
}
