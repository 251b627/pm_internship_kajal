import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { useInternships } from "../context/InternshipContext";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import FilterBar from "../components/internships/FilterBar";
import InternshipCard from "../components/internships/InternshipCard";
import EmptyState from "../components/common/EmptyState";
import { Sparkles, Sliders } from "lucide-react";

export default function RecommendationsPage() {
  const { profile } = useProfile();
  const { filteredInternships, resetFilters } = useInternships();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 space-y-6">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIH Problem Statement 34 Recommender Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Personalized Internship Matches
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                Ranked using weighted similarity across your skills ({profile?.skills?.slice(0, 3).join(", ") || "PM Skills"}), functional interests, and target roles ({profile?.targetRole || "APM"}).
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-100">
              <div className="flex items-center gap-2">
                <span>Matching Persona: <strong>{profile?.name}</strong></span>
                <span>•</span>
                <span>Work Mode: <strong>{profile?.workMode || "Hybrid"}</strong></span>
                <span>•</span>
                <span>Experience: <strong>{profile?.experienceLevel || "Intermediate"}</strong></span>
              </div>

              <Link
                to="/onboarding"
                className="inline-flex items-center gap-1 font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Sliders className="w-3 h-3" />
                <span>Fine-tune Match Criteria</span>
              </Link>
            </div>
          </div>

          {/* Filter & Sort Toolbar */}
          <FilterBar />

          {/* Recommendation Cards Feed */}
          {filteredInternships.length === 0 ? (
            <EmptyState
              title="No matching recommendations"
              description="No internships match your current filter parameters. Try resetting your filters to view all personalized matches."
              actionText="Reset All Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredInternships.map((job) => (
                <InternshipCard key={job.id} internship={job} />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
