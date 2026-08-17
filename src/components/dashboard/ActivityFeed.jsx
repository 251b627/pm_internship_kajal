import React from "react";
import { Link } from "react-router-dom";
import { useInternships } from "../../context/InternshipContext";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

export default function ActivityFeed() {
  const { applications, internships } = useInternships();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Interview":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Under Review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Selected":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  // Recent timeline events
  const recentEvents = applications.flatMap((app) => {
    const job = internships.find((j) => j.id === app.internshipId);
    return (app.timeline || []).map((tl) => ({
      ...tl,
      appId: app.id,
      company: job?.company || "Company",
      role: job?.title || "Product Intern",
      jobId: job?.id
    }));
  }).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  // Upcoming deadlines from active recommendations
  const upcomingDeadlines = [...internships]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Activity Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h3 className="text-sm font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Recent Application Activity</span>
            </h3>
            <Link
              to="/applications"
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
            >
              View Pipeline →
            </Link>
          </div>

          <div className="space-y-4">
            {recentEvents.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No recent activity. Apply to an internship to start tracking updates!</p>
            ) : (
              recentEvents.map((ev, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 truncate">{ev.company}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${getStatusBadge(ev.stage)}`}>
                        {ev.stage}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] truncate">{ev.role}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">{ev.note} • {ev.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Application Deadlines */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h3 className="text-sm font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Approaching Application Deadlines</span>
            </h3>
            <Link
              to="/explore"
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
            >
              All Openings →
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map((job) => (
              <div
                key={job.id}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3 hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl ${job.logoColor || "bg-indigo-600"} text-white flex items-center justify-center font-heading font-bold text-xs flex-shrink-0`}
                  >
                    {job.logoText || "PM"}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{job.title}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{job.company} • {job.stipend}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md block mb-1">
                    {job.deadline}
                  </span>
                  <Link
                    to={`/internships/${job.id}`}
                    className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center justify-end gap-0.5"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
