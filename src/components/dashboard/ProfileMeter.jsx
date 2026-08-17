import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function ProfileMeter() {
  const { completeness } = useProfile();
  const { percentage, missingFields } = completeness;

  const getStatusText = (pct) => {
    if (pct >= 90) return { label: "High Match Potential (All-Star)", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (pct >= 70) return { label: "Good Match Profile", color: "text-indigo-700 bg-indigo-50 border-indigo-200" };
    return { label: "Incomplete Profile", color: "text-amber-700 bg-amber-50 border-amber-200" };
  };

  const status = getStatusText(percentage);

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left info */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${status.color}`}>
              {status.label}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white">
            Profile Compatibility Score: {percentage}%
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {percentage >= 90
              ? "Your profile is fully optimized. Our matching algorithm has sufficient telemetry across your skills, industry choices, and portfolio."
              : "Adding your remaining details increases match confidence and moves your applications to the top of recruiter pipelines."}
          </p>

          {/* Missing fields pills */}
          {missingFields.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-amber-300 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                Missing:
              </span>
              {missingFields.map((field) => (
                <span
                  key={field}
                  className="px-2.5 py-0.5 text-[10px] font-semibold bg-white/10 text-slate-200 rounded-md border border-white/10"
                >
                  + {field}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right CTA */}
        <div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0 w-full md:w-auto">
          {/* Circular percentage display */}
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center shadow-inner">
            <div className="text-2xl font-heading font-extrabold text-white leading-none">
              {percentage}%
            </div>
            <span className="text-[10px] uppercase font-bold text-indigo-200 mt-1">Ready</span>
          </div>

          <Link
            to="/profile"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-heading font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all"
          >
            <span>Update Profile Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
