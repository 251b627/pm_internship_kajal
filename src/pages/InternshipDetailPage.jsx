import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useInternships } from "../context/InternshipContext";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import ApplyModal from "../components/internships/ApplyModal";
import {
  MapPin,
  Clock,
  Banknote,
  Building,
  Bookmark,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Award
} from "lucide-react";

export default function InternshipDetailPage() {
  const { id } = useParams();
  const { rankedInternships, isSaved, toggleSave, getApplication } = useInternships();
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const internship = rankedInternships.find((j) => j.id === id);
  const saved = isSaved(id);
  const application = getApplication(id);
  const isApplied = !!application;

  if (!internship) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md">
            <h3 className="text-base font-bold text-slate-900 mb-2">Internship Not Found</h3>
            <p className="text-xs text-slate-500 mb-4">The opportunity you are looking for may have expired or does not exist.</p>
            <Link to="/recommendations" className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl">
              Back to Recommendations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 space-y-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/recommendations" className="hover:text-indigo-600 flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Recommendations</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{internship.company}</span>
            <span>/</span>
            <span className="text-slate-500 truncate max-w-xs">{internship.title}</span>
          </div>

          {/* Job Header Hero Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl ${internship.logoColor || "bg-indigo-600"} text-white flex items-center justify-center font-heading font-extrabold text-2xl shadow-md flex-shrink-0`}
                >
                  {internship.logoText || "PM"}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{internship.company}</span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
                      {internship.industry}
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
                      {internship.category}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                    {internship.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {internship.location} ({internship.workMode})
                    </span>
                    <span className="flex items-center gap-1 font-bold text-emerald-700">
                      <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                      {internship.stipend}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {internship.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                <button
                  onClick={() => toggleSave(internship.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    saved
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200"
                  }`}
                  title={saved ? "Remove from saved" : "Save internship"}
                >
                  <Bookmark className={`w-5 h-5 ${saved ? "fill-amber-500" : ""}`} />
                </button>

                {isApplied ? (
                  <div className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Applied ({application.status})</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-heading font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-102 cursor-pointer"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* AI Match Explanation Box */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-3xl border border-indigo-200/80 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-indigo-950">
                    Why This Role Matches You ({internship.matchScore || 85}% Match)
                  </h3>
                  <p className="text-[11px] text-indigo-700">Calculated via SIH Problem Statement 34 Recommender</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200">
                Top Tier Compatibility
              </span>
            </div>

            <p className="text-xs text-indigo-900 leading-relaxed pl-10">
              {internship.matchExplanation}
            </p>

            <div className="pl-10 flex flex-wrap gap-2 pt-1">
              {(internship.matchedSkills || []).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-[10px] font-bold bg-white text-indigo-700 border border-indigo-200 rounded-md shadow-2xs"
                >
                  Skill Match: {skill} ✓
                </span>
              ))}
            </div>
          </div>

          {/* Main Job Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Description, Responsibilities, Eligibility */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Overview */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-heading font-bold text-slate-900">Role Overview</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{internship.overview}</p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-heading font-bold text-slate-900">Key Responsibilities</h3>
                <ul className="space-y-2.5">
                  {(internship.responsibilities || []).map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0"></span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required & Preferred Skills */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-heading font-bold text-slate-900">Required & Preferred Skills</h3>
                
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">Core Required Skills</span>
                  <div className="flex flex-wrap gap-2">
                    {(internship.skills || []).map((skill) => {
                      const isMatched = (internship.matchedSkills || []).some(
                        (ms) => ms.toLowerCase() === skill.toLowerCase()
                      );
                      return (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border ${
                            isMatched
                              ? "bg-indigo-50 text-indigo-700 border-indigo-300 font-bold"
                              : "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          {skill} {isMatched ? "✓" : ""}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {(internship.preferredSkills || []).length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">Bonus / Preferred Skills</span>
                    <div className="flex flex-wrap gap-2">
                      {internship.preferredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 text-slate-600 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Eligibility */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-heading font-bold text-slate-900">Eligibility & Qualifications</h3>
                <ul className="space-y-2">
                  {(internship.eligibility || []).map((elig, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{elig}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right 1 Col: Company Bio, Perks & Fast Facts */}
            <div className="space-y-6">
              
              {/* About Company */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-heading font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-indigo-600" />
                  <span>About {internship.company}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{internship.aboutCompany}</p>
              </div>

              {/* Internship Perks */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-heading font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Perks & Learning Outcomes</span>
                </h3>
                <ul className="space-y-2">
                  {(internship.perks || []).map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className="text-indigo-600 font-bold">★</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Summary Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Fast Facts</h4>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span>Application Deadline</span>
                    <strong className="text-slate-900">{internship.deadline}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span>Earliest Start Date</span>
                    <strong className="text-slate-900">{internship.startDate}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span>Total Openings</span>
                    <strong className="text-slate-900">{internship.openings} positions</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience Needed</span>
                    <strong className="text-slate-900">{internship.experienceLevel}</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        internship={internship}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
