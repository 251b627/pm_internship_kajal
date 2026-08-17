import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { useInternships } from "../context/InternshipContext";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import StatsCard from "../components/dashboard/StatsCard";
import ProfileMeter from "../components/dashboard/ProfileMeter";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import InternshipCard from "../components/internships/InternshipCard";
import {
  Sparkles,
  Bookmark,
  FileCheck,
  Award,
  ArrowRight,
  AlertCircle
} from "lucide-react";

export default function DashboardPage() {
  const { profile, completeness } = useProfile();
  const { rankedInternships, savedIds, applications } = useInternships();

  const interviewCount = applications.filter((a) => a.status === "Interview").length;
  const topRecommendations = rankedInternships.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 space-y-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                  Student PM Hub
                </span>
                <span className="text-xs text-slate-400">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                Welcome back, {profile?.name || "Student"} 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Here are your real-time PM match metrics, active applications, and priority recommendations.
              </p>
            </div>

            <Link
              to="/recommendations"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-heading font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all self-start sm:self-auto cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore All {rankedInternships.length} Matches</span>
            </Link>
          </div>

          {/* Missing Profile Details Alert Banner if not 100% */}
          {completeness.percentage < 100 && completeness.missingFields.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">Boost your recommendation accuracy!</strong>
                  <p className="text-amber-700 mt-0.5">
                    Add your remaining details ({completeness.missingFields.slice(0, 3).join(", ")}) to unlock higher match scores.
                  </p>
                </div>
              </div>
              <Link
                to="/profile"
                className="px-3.5 py-1.5 font-bold text-amber-900 bg-white border border-amber-300 hover:bg-amber-100 rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Complete Profile →
              </Link>
            </div>
          )}

          {/* KPI Metrics Row */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Recommended"
              value={rankedInternships.length}
              subtitle="Personalized AI matches"
              icon={Sparkles}
              iconColor="bg-indigo-50 text-indigo-600"
              link="/recommendations"
              linkText="View Feed"
            />
            <StatsCard
              title="Saved Internships"
              value={savedIds.length}
              subtitle="Bookmarked for later"
              icon={Bookmark}
              iconColor="bg-amber-50 text-amber-600"
              link="/saved"
              linkText="View Saved"
            />
            <StatsCard
              title="Applications"
              value={applications.length}
              subtitle="Active recruiter pipeline"
              icon={FileCheck}
              iconColor="bg-blue-50 text-blue-600"
              link="/applications"
              linkText="Track Stages"
            />
            <StatsCard
              title="Interviews"
              value={interviewCount}
              subtitle="Rounds scheduled"
              icon={Award}
              iconColor="bg-emerald-50 text-emerald-600"
              link="/applications"
              linkText="View Schedule"
            />
          </section>

          {/* Profile Completeness Gauge Card */}
          <ProfileMeter />

          {/* Top 3 Personalized Recommendations */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-heading font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Top Matches For You</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Highest compatibility with your {profile?.skills?.slice(0, 2).join(" & ") || "skills"} and {profile?.targetRole || "career goals"}.
                </p>
              </div>
              <Link
                to="/recommendations"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1"
              >
                <span>View All ({rankedInternships.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topRecommendations.map((job) => (
                <InternshipCard key={job.id} internship={job} />
              ))}
            </div>
          </section>

          {/* Recent Activity & Upcoming Deadlines */}
          <ActivityFeed />

        </main>
      </div>
    </div>
  );
}
