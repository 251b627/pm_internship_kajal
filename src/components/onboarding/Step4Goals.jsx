import React from "react";
import { ROLE_OPTIONS, WORK_MODES, GOAL_OPTIONS } from "../../data/mockInternships";
import { Target, Clock, Banknote, Calendar } from "lucide-react";

export default function Step4Goals({ data, onChange, onNext, onPrev }) {
  const selectedGoals = data.careerGoals || [];
  const preferredRoles = data.preferredRoles || [];

  const toggleGoal = (goal) => {
    if (selectedGoals.includes(goal)) {
      onChange({ careerGoals: selectedGoals.filter(g => g !== goal) });
    } else {
      onChange({ careerGoals: [...selectedGoals, goal] });
    }
  };

  const toggleRole = (role) => {
    if (preferredRoles.includes(role)) {
      onChange({ preferredRoles: preferredRoles.filter(r => r !== role) });
    } else {
      onChange({ preferredRoles: [...preferredRoles, role] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.targetRole) {
      onChange({ targetRole: "Associate Product Manager Intern" });
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-heading font-extrabold text-slate-900">
          Career Goals & Internship Preferences
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Specify your role ambitions, work environment, and desired timeline.
        </p>
      </div>

      {/* Target Role & Preferred Roles */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Primary Target Role Ambition <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Target className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={data.targetRole || ""}
              onChange={(e) => onChange({ targetRole: e.target.value })}
              placeholder="e.g. Associate Product Manager Intern"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
            Also Open to These Roles
          </label>
          <div className="flex flex-wrap gap-2">
            {ROLE_OPTIONS.map((role) => {
              const isSelected = preferredRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-50 text-indigo-700 border-indigo-300 font-bold"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {role} {isSelected ? "✓" : "+"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Work Mode & Preferred Locations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Preferred Work Mode */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Preferred Work Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {WORK_MODES.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange({ workMode: mode })}
                className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                  data.workMode === mode
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Desired Duration */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Desired Duration
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={data.duration || "6 Months"}
              onChange={(e) => onChange({ duration: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
            >
              <option value="2 Months">2 Months (Summer Internship)</option>
              <option value="3 Months">3 Months (Quarterly)</option>
              <option value="6 Months">6 Months (Semester Internship)</option>
              <option value="1 Year">1 Year (Long-term Co-op)</option>
            </select>
          </div>
        </div>

        {/* Availability / Start Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Availability / Earliest Start
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={data.availability || "Immediate / Within 2 weeks"}
              onChange={(e) => onChange({ availability: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
            >
              <option value="Immediate / Within 2 weeks">Immediate / Within 2 weeks</option>
              <option value="Next Month">Next Month</option>
              <option value="Summer 2026">Summer 2026 (May–July)</option>
              <option value="Winter 2026">Winter 2026</option>
            </select>
          </div>
        </div>

        {/* Stipend Expectation */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Monthly Stipend Expectation
          </label>
          <div className="relative">
            <Banknote className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={data.stipendExpectation || "₹35,000+ / month"}
              onChange={(e) => onChange({ stipendExpectation: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
            >
              <option value="Any / Experience Focused">Any / Experience Focused</option>
              <option value="₹20,000+ / month">₹20,000+ / month</option>
              <option value="₹35,000+ / month">₹35,000+ / month</option>
              <option value="₹50,000+ / month">₹50,000+ / month</option>
              <option value="₹70,000+ / month">₹70,000+ / month</option>
            </select>
          </div>
        </div>

      </div>

      {/* Select Career Goals */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Key Goals for This Internship Cohort
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {GOAL_OPTIONS.map((goal) => {
            const isSelected = selectedGoals.includes(goal);
            return (
              <label
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-indigo-50/80 border-indigo-400 text-indigo-900 font-bold"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 pointer-events-none"
                />
                <span className="text-xs">{goal}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-7 py-3 text-xs font-heading font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          Next: Review & Match →
        </button>
      </div>
    </form>
  );
}
