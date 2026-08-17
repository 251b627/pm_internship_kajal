import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInternships } from "../../context/InternshipContext";
import ApplyModal from "./ApplyModal";
import {
  MapPin,
  Clock,
  Banknote,
  Bookmark,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar
} from "lucide-react";

export default function InternshipCard({ internship }) {
  const { isSaved, toggleSave, getApplication } = useInternships();
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const saved = isSaved(internship.id);
  const application = getApplication(internship.id);
  const isApplied = !!application;

  const getMatchScoreBadge = (score) => {
    if (score >= 90) return "bg-emerald-50 text-emerald-700 border-emerald-300 ring-1 ring-emerald-200";
    if (score >= 75) return "bg-indigo-50 text-indigo-700 border-indigo-300 ring-1 ring-indigo-200";
    return "bg-slate-100 text-slate-700 border-slate-300";
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
        
        {/* Top Match Ribbon */}
        {internship.matchScore >= 90 && (
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Top AI Fit</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          
          {/* Header row: Company logo + Title + Save button */}
          <div className="flex items-start justify-between gap-3 pt-1">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`w-12 h-12 rounded-2xl ${internship.logoColor || "bg-indigo-600"} text-white flex items-center justify-center font-heading font-extrabold text-base flex-shrink-0 shadow-md`}
              >
                {internship.logoText || "PM"}
              </div>

              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block truncate">
                  {internship.company}
                </span>
                <Link
                  to={`/internships/${internship.id}`}
                  className="text-sm font-heading font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 block"
                >
                  {internship.title}
                </Link>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
                    {internship.industry}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {internship.workMode}
                  </span>
                </div>
              </div>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => toggleSave(internship.id)}
              className={`p-2 rounded-xl border transition-all flex-shrink-0 cursor-pointer ${
                saved
                  ? "bg-amber-50 text-amber-600 border-amber-200"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 border-slate-200"
              }`}
              title={saved ? "Remove from saved" : "Save for later"}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-amber-500" : ""}`} />
            </button>
          </div>

          {/* Quick Metrics: Location, Duration, Stipend */}
          <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-slate-50 border border-slate-200/60 rounded-2xl text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{internship.location}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 truncate">
              <Banknote className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{internship.stipend}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>Due: {internship.deadline}</span>
            </div>
          </div>

          {/* "Why This Matches You" AI Callout */}
          {internship.matchExplanation && (
            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Why This Matches You</span>
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full border ${getMatchScoreBadge(internship.matchScore)}`}>
                  {internship.matchScore}% Match
                </span>
              </div>
              <p className="text-[11px] text-indigo-900 leading-relaxed line-clamp-2">
                {internship.matchExplanation}
              </p>
            </div>
          )}

          {/* Skill Badges */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Required Skills</span>
            <div className="flex flex-wrap gap-1.5">
              {(internship.skills || []).slice(0, 4).map((skill) => {
                const isMatched = (internship.matchedSkills || []).some(
                  (ms) => ms.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${
                      isMatched
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200 font-bold"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    {skill} {isMatched ? "✓" : ""}
                  </span>
                );
              })}
              {(internship.skills || []).length > 4 && (
                <span className="px-2 py-1 text-[10px] font-semibold bg-slate-100 text-slate-500 rounded-lg">
                  +{internship.skills.length - 4} more
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            to={`/internships/${internship.id}`}
            className="text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            View Details
          </Link>

          {isApplied ? (
            <div className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Applied</span>
            </div>
          ) : (
            <button
              onClick={() => setApplyModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-xs transition-all hover:scale-102 cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Apply Modal */}
      <ApplyModal
        internship={internship}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </>
  );
}
