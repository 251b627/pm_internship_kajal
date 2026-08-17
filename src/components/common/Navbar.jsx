import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import {
  Compass,
  User,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Bookmark,
  FileCheck,
  Settings,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, logout, loginAsDemoComplete, loginAsDemoFresh } = useAuth();
  const { profile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  PM Match
                </span>
                <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-md">
                  SIH #34
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === "/" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"}`}>
                  Home
                </Link>
                <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                  How It Works
                </a>
                <Link to="/explore" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                  Internships
                </Link>
                <a
                  href="https://pminternship.mca.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span>PM Internship Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/recommendations"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    location.pathname === "/recommendations" ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Recommendations
                </Link>
                <Link
                  to="/explore"
                  className={`text-sm font-semibold transition-colors ${
                    location.pathname === "/explore" ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All Internships
                </Link>
                <Link
                  to="/saved"
                  className={`text-sm font-semibold transition-colors ${
                    location.pathname === "/saved" ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Saved
                </Link>
                <Link
                  to="/applications"
                  className={`text-sm font-semibold transition-colors ${
                    location.pathname === "/applications" ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Applications
                </Link>
              </>
            )}
          </nav>

          {/* Right Action Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Demo Account Quick Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                title="Switch Demo Data"
              >
                <span>Demo Switcher</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {demoDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs animate-in fade-in duration-150"
                  onMouseLeave={() => setDemoDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Switch Demo Persona
                  </div>
                  <button
                    onClick={() => {
                      loginAsDemoComplete();
                      setDemoDropdownOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Alex Rivera (Complete Profile)</div>
                      <div className="text-[11px] text-slate-500">B.Tech CS • 94% match ready</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </button>

                  <button
                    onClick={() => {
                      loginAsDemoFresh();
                      setDemoDropdownOpen(false);
                      navigate("/onboarding");
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-purple-50 flex items-center justify-between text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">Rohan Sharma (Fresh User)</div>
                      <div className="text-[11px] text-slate-500">Triggers 5-step onboarding</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </button>
                </div>
              )}
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm shadow-indigo-500/25 hover:shadow-md transition-all"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <img
                    src={profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                    alt={profile?.name || "Student"}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                  />
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {profile?.name?.split(" ")[0] || "Student"}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      {profile?.targetRole?.split(" ")[0] || "PM Intern"}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{profile?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{profile?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>
                    <Link
                      to="/saved"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      Saved Internships
                    </Link>
                    <Link
                      to="/applications"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      <FileCheck className="w-4 h-4 text-slate-400" />
                      My Applications
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Settings
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-4 shadow-lg">
          
          {/* Quick switchers on mobile */}
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-2">
            <div className="text-[11px] font-bold text-indigo-900">Switch Demo Account:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  loginAsDemoComplete();
                  setMobileMenuOpen(false);
                  navigate("/dashboard");
                }}
                className="p-2 text-left bg-white rounded-lg border border-indigo-200 text-xs font-bold text-slate-800"
              >
                Alex (94% Ready)
              </button>
              <button
                onClick={() => {
                  loginAsDemoFresh();
                  setMobileMenuOpen(false);
                  navigate("/onboarding");
                }}
                className="p-2 text-left bg-white rounded-lg border border-purple-200 text-xs font-bold text-slate-800"
              >
                Rohan (Fresh User)
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  All Internships
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-indigo-600 font-bold bg-indigo-50 rounded-lg"
                >
                  Get Started Free
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  to="/recommendations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-indigo-600 font-bold bg-indigo-50 rounded-lg"
                >
                  ✨ Recommendations
                </Link>
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  All Internships
                </Link>
                <Link
                  to="/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Saved Internships
                </Link>
                <Link
                  to="/applications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  My Applications
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Settings
                </Link>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
