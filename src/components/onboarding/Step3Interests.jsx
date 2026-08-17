import React from "react";
import { INTEREST_CATEGORIES, INDUSTRY_OPTIONS } from "../../data/mockInternships";
import {
  Boxes,
  Cpu,
  Megaphone,
  BarChart3,
  Palette,
  Coins,
  Briefcase,
  Rocket,
  HeartHandshake
} from "lucide-react";

export default function Step3Interests({ data, onChange, onNext, onPrev }) {
  const selectedInterests = data.interests || [];
  const selectedIndustries = data.industries || [];

  const iconMap = {
    Boxes,
    Cpu,
    Megaphone,
    BarChart3,
    Palette,
    Coins,
    Briefcase,
    Rocket,
    HeartHandshake
  };

  const toggleInterest = (name) => {
    if (selectedInterests.includes(name)) {
      onChange({ interests: selectedInterests.filter(i => i !== name) });
    } else {
      onChange({ interests: [...selectedInterests, name] });
    }
  };

  const toggleIndustry = (ind) => {
    if (selectedIndustries.includes(ind)) {
      onChange({ industries: selectedIndustries.filter(i => i !== ind) });
    } else {
      onChange({ industries: [...selectedIndustries, ind] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      alert("Please select at least one core area of interest.");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-heading font-extrabold text-slate-900">
          Core Interests & Target Industries
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Inspired by SIH Problem Statement 34: Match opportunities aligned with your functional passions.
        </p>
      </div>

      {/* Interest Category Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-700">
            Select Your Functional Interest Areas <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] font-semibold text-indigo-600">
            {selectedInterests.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {INTEREST_CATEGORIES.map((cat) => {
            const isSelected = selectedInterests.includes(cat.name);
            const Icon = iconMap[cat.icon] || Boxes;

            return (
              <div
                key={cat.id}
                onClick={() => toggleInterest(cat.name)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-100 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100/80 border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 text-white rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${isSelected ? "text-indigo-950" : "text-slate-900"}`}>
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {cat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Industry Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700">
            Preferred Industry Sectors
          </label>
          <span className="text-[11px] font-semibold text-purple-600">
            {selectedIndustries.length} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {INDUSTRY_OPTIONS.map((ind) => {
            const isSelected = selectedIndustries.includes(ind);
            return (
              <button
                key={ind}
                type="button"
                onClick={() => toggleIndustry(ind)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {ind} {isSelected ? "✓" : "+"}
              </button>
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
          Next: Career Goals & Mode →
        </button>
      </div>
    </form>
  );
}
