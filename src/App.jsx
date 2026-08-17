import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { InternshipProvider } from "./context/InternshipContext";
import { ProfileProvider, useProfile } from "./context/ProfileContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import AllInternshipsPage from "./pages/AllInternshipsPage";
import InternshipDetailPage from "./pages/InternshipDetailPage";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RequireOnboarding({ children }) {
  const { profile } = useProfile();
  return profile?.onboardingComplete
    ? children
    : <Navigate to="/onboarding" replace />;
}

function GuestOnly({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return children;

  return (
    <Navigate
      to={user?.onboardingComplete ? "/dashboard" : "/onboarding"}
      replace
    />
  );
}

function AppRoutes() {
  const { user } = useAuth();

  // The key makes ProfileProvider reload the saved profile after registration.
  return (
    <ProfileProvider key={user?.id || "guest"}>
      <InternshipProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<GuestOnly><LoginPage /></GuestOnly>} />
          <Route path="/register" element={<GuestOnly><RegisterPage /></GuestOnly>} />

          <Route
            path="/onboarding"
            element={<RequireAuth><OnboardingPage /></RequireAuth>}
          />

          <Route
            path="/dashboard"
            element={<RequireAuth><RequireOnboarding><DashboardPage /></RequireOnboarding></RequireAuth>}
          />
          <Route
            path="/recommendations"
            element={<RequireAuth><RequireOnboarding><RecommendationsPage /></RequireOnboarding></RequireAuth>}
          />
          <Route
            path="/explore"
            element={<RequireAuth><RequireOnboarding><AllInternshipsPage /></RequireOnboarding></RequireAuth>}
          />
          <Route
            path="/internships/:id"
            element={<RequireAuth><RequireOnboarding><InternshipDetailPage /></RequireOnboarding></RequireAuth>}
          />

          {/* These screens are not created in this project yet, so keep their
              existing navigation links safe until their page files are added. */}
          <Route path="/profile" element={<Navigate to="/onboarding" replace />} />
          <Route path="/saved" element={<Navigate to="/recommendations" replace />} />
          <Route path="/applications" element={<Navigate to="/dashboard" replace />} />
          <Route path="/settings" element={<Navigate to="/dashboard" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </InternshipProvider>
    </ProfileProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
