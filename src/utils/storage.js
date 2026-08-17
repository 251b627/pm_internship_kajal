import { DEMO_STUDENT_COMPLETE } from "../data/mockProfile";
import { MOCK_APPLICATIONS } from "../data/mockApplications";

const STORAGE_KEYS = {
  AUTH_USER: "pm_auth_user",
  PROFILE: "pm_student_profile",
  SAVED_INTERNSHIPS: "pm_saved_internships",
  APPLICATIONS: "pm_applications",
  SETTINGS: "pm_portal_settings"
};

const DEFAULT_SETTINGS = {
  matchAlerts: true,
  applicationUpdates: true,
  weeklyDigest: true,
  darkMode: false
};

export const Storage = {
  getAuthUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return data ? JSON.parse(data) : DEMO_STUDENT_COMPLETE;
    } catch {
      return DEMO_STUDENT_COMPLETE;
    }
  },

  setAuthUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } catch (e) {
      console.error("Storage setAuthUser error", e);
    }
  },

  clearAuthUser() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },

  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEMO_STUDENT_COMPLETE;
    } catch {
      return DEMO_STUDENT_COMPLETE;
    }
  },

  setProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error("Storage setProfile error", e);
    }
  },

  getSavedInternships() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_INTERNSHIPS);
      return data ? JSON.parse(data) : ["intern-1", "intern-3", "intern-5"];
    } catch {
      return ["intern-1", "intern-3", "intern-5"];
    }
  },

  setSavedInternships(ids) {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_INTERNSHIPS, JSON.stringify(ids));
    } catch (e) {
      console.error("Storage setSavedInternships error", e);
    }
  },

  getApplications() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : MOCK_APPLICATIONS;
    } catch {
      return MOCK_APPLICATIONS;
    }
  },

  setApplications(apps) {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    } catch (e) {
      console.error("Storage setApplications error", e);
    }
  },

  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  setSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error("Storage setSettings error", e);
    }
  },

  resetAll(completeProfile = DEMO_STUDENT_COMPLETE) {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(completeProfile));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(completeProfile));
      localStorage.setItem(STORAGE_KEYS.SAVED_INTERNSHIPS, JSON.stringify(["intern-1", "intern-3", "intern-5"]));
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(MOCK_APPLICATIONS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {
      console.error("Storage resetAll error", e);
    }
  }
};
