import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Edit3, User, Cpu, Boxes, Target, FileText } from "lucide-react";

export default function Step5Review({ data, onJumpToStep, onSubmit, onPrev }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log("Confetti trigger:", err);
    }

    setTimeout(() => {
      onSubmit(data);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
            Final Step
          </span>
          <span className="text-xs text-slate-400">Ready to Match</span>
        </div>
        <h3 className="text-lg font-heading font-extrabold text-slate-900">
          Review Your Profile & Generate Matches
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Everything looks great! Review your details below before our AI engine runs weighted matching.
        </p>
      </div>

      {/* Section 1: Academic & Personal */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Academic & Personal Details</span>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Name</span>
            <div className="font-bold text-slate-800">{data.name || "N/A"}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">College</span>
            <div className="font-bold text-slate-800 truncate">{data.college || "N/A"}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Degree</span>
            <div className="font-bold text-slate-800 truncate">{data.degree || "N/A"}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Graduation</span>
            <div className="font-bold text-slate-800">{data.graduationYear || "2027"}</div>
          </div>
        </div>
      </div>

      {/* Section 2: Skills & Experience */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Cpu className="w-4 h-4 text-purple-600" />
            <span>Skills & Experience Level</span>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Selected Skills</span>
            <div className="flex flex-wrap gap-1.5">
              {(data.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white text-indigo-700 border border-indigo-200 rounded-lg shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Level</span>
              <div className="font-bold text-slate-800">{data.experienceLevel || "Intermediate"}</div>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Resume File</span>
              <div className="font-bold text-slate-800 truncate flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>{data.resumeName || "Simulated_Resume.pdf"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Interests & Target Industries */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Boxes className="w-4 h-4 text-emerald-600" />
            <span>Functional Interests & Industries</span>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Interest Areas</span>
            <div className="flex flex-wrap gap-1.5">
              {(data.interests || []).map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-0.5 text-[11px] font-bold bg-white text-slate-800 border border-slate-200 rounded-md"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Target Industries</span>
            <div className="flex flex-wrap gap-1.5">
              {(data.industries || []).map((ind) => (
                <span
                  key={ind}
                  className="px-2 py-0.5 text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 rounded-md"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Target Role & Goals */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Target className="w-4 h-4 text-blue-600" />
            <span>Role Aspirations & Work Preferences</span>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(4)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Target Role</span>
            <div className="font-bold text-slate-800">{data.targetRole || "APM Intern"}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Work Mode</span>
            <div className="font-bold text-slate-800">{data.workMode || "Hybrid"}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Duration</span>
            <div className="font-bold text-slate-800">{data.duration || "6 Months"}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Min Stipend</span>
            <div className="font-bold text-emerald-700">{data.stipendExpectation || "₹35,000+ / mo"}</div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
        >
          ← Back
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-heading font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-103 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isSubmitting ? "Generating AI Matches..." : "Generate My Recommendations →"}</span>
        </button>
      </div>
    </div>
  );
}
