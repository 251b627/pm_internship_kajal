import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { useInternships } from "../../context/InternshipContext";
import {
  LayoutDashboard,
  Sparkles,
  Search,
  Bookmark,
  FileCheck,
  User,
  Settings,
  LogOut,
  Sliders
} from "lucide-react";

export default function Sidebar() {
  const { logout } = useAuth();
  const { profile, completeness } = useProfile();
  const { savedIds, applications, rankedInternships } = useInternships();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard"
    },
    {
      to: "/recommendations",
      icon: Sparkles,
      label: "Recommendations",
      badge: rankedInternships.length,
      badgeColor: "bg-indigo-100 text-indigo-700"
    },
    {
      to: "/explore",
      icon: Search,
      label: "All Internships"
    },
    {
      to: "/saved",
      icon: Bookmark,
      label: "Saved Internships",
      badge: savedIds.length > 0 ? savedIds.length : null,
      badgeColor: "bg-amber-100 text-amber-700"
    },
    {
      to: "/applications",
      icon: FileCheck,
      label: "My Applications",
      badge: applications.length > 0 ? applications.length : null,
      badgeColor: "bg-emerald-100 text-emerald-700"
    },
    {
      to: "/profile",
      icon: User,
      label: "My Profile"
    },
    {
      to: "/settings",
      icon: Settings,
      label: "Settings"
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 sticky top-16 hidden md:flex flex-shrink-0">
      <div className="space-y-6">
        
        {/* User Mini Card */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="flex items-center gap-3 mb-2.5">
            <img
              src={profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
              alt={profile?.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-300"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">{profile?.name || "Student"}</h4>
              <p className="text-[11px] text-slate-500 truncate">{profile?.degree?.split(" in ")[0] || "Student"}</p>
            </div>
          </div>

          {/* Profile Completeness Ring / Bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Profile Completeness</span>
              <span className="text-indigo-600 font-bold">{completeness.percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${completeness.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/50 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && item.badge !== undefined && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.badgeColor || "bg-slate-100 text-slate-600"}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Retake / Update Preferences CTA Card */}
        <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl text-center">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Sliders className="w-4 h-4" />
          </div>
          <h5 className="text-xs font-bold text-slate-900 mb-0.5">Need Better Matches?</h5>
          <p className="text-[11px] text-slate-500 mb-2.5">Update your skills, goals & role interests.</p>
          <button
            onClick={() => navigate("/onboarding")}
            className="w-full py-1.5 text-xs font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            Update Preferences
          </button>
        </div>

      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
