import React, { createContext, useContext, useState, useEffect } from "react";
import { Storage } from "../utils/storage";
import { DEMO_STUDENT_COMPLETE, DEMO_STUDENT_FRESH } from "../data/mockProfile";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => Storage.getAuthUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!Storage.getAuthUser());

  useEffect(() => {
    if (user) {
      Storage.setAuthUser(user);
      setIsAuthenticated(true);
    } else {
      Storage.clearAuthUser();
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, _password, _rememberMe = true) => {
    const currentProfile = Storage.getProfile();
    const loggedUser = {
      ...currentProfile,
      email: email || currentProfile.email,
      lastLogin: new Date().toISOString()
    };
    setUser(loggedUser);
    return loggedUser;
  };

  const register = (registrationData) => {
    const newStudent = {
      ...DEMO_STUDENT_FRESH,
      id: "student-" + Date.now(),
      name: registrationData.name,
      email: registrationData.email,
      college: registrationData.college || "",
      degree: registrationData.degree || "",
      graduationYear: registrationData.graduationYear || "2027",
      onboardingComplete: false
    };

    Storage.setProfile(newStudent);
    setUser(newStudent);
    return newStudent;
  };

  const logout = () => {
    Storage.clearAuthUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  const loginAsDemoComplete = () => {
    Storage.resetAll(DEMO_STUDENT_COMPLETE);
    setUser(DEMO_STUDENT_COMPLETE);
    setIsAuthenticated(true);
  };

  const loginAsDemoFresh = () => {
    Storage.resetAll(DEMO_STUDENT_FRESH);
    setUser(DEMO_STUDENT_FRESH);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loginAsDemoComplete,
        loginAsDemoFresh
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
