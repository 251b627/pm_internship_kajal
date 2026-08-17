import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "bg-indigo-50 text-indigo-600",
  link,
  linkText
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold text-slate-500">{title}</span>
          <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
            {value}
          </div>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${iconColor} flex-shrink-0 shadow-2xs`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {link && linkText && (
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={link}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>{linkText}</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
