import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function EmptyState({
  icon: Icon = Sparkles,
  title = "No results found",
  description = "Try modifying your filter parameters or resetting search queries.",
  actionText,
  actionLink,
  onAction
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto shadow-xs">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-heading font-extrabold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">{description}</p>
      </div>

      {(actionText || actionLink || onAction) && (
        <div className="pt-2">
          {actionLink ? (
            <Link
              to={actionLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-heading font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <span>{actionText}</span>
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-heading font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors cursor-pointer"
            >
              <span>{actionText}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
