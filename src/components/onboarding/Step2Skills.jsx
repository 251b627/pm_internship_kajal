import React, { useState } from "react";
import { SKILL_OPTIONS, EXPERIENCE_LEVELS } from "../../data/mockInternships";
import { Upload, FileText } from "lucide-react";

export default function Step2Skills({ data, onChange, onNext, onPrev }) {
  const [customSkill, setCustomSkill] = useState("");
  const selectedSkills = data.skills || [];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onChange({ skills: selectedSkills.filter(s => s !== skill) });
    } else {
      onChange({ skills: [...selectedSkills, skill] });
    }
  };

  const addCustomSkill = (e) => {
    e.preventDefault();
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      onChange({ skills: [...selectedSkills, customSkill.trim()] });
      setCustomSkill("");
    }
  };

  const handleResumeSimulate = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        resumeName: file.name,
        resumeSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        resumeDate: new Date().toISOString().split("T")[0]
      });
    } else {
      // Default simulated resume
      onChange({
        resumeName: `${data.name?.replace(" ", "_") || "Candidate"}_PM_Resume.pdf`,
        resumeSize: "1.8 MB",
        resumeDate: new Date().toISOString().split("T")[0]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSkills.length < 2) {
      alert("Please select at least 2 skills to generate accurate recommendations.");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-heading font-extrabold text-slate-900">
          Skills, Experience & Resume
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Our recommendation engine uses your skill tags and past projects to match core requirements.
        </p>
      </div>

      {/* Select Core Skills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700">
            Select Your Skills <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] font-semibold text-indigo-600">
            {selectedSkills.length} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {SKILL_OPTIONS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs scale-102"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {skill} {isSelected ? "✓" : "+"}
              </button>
            );
          })}
        </div>

        {/* Custom skill adder */}
        <div className="flex gap-2 max-w-sm">
          <input
            type="text"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            placeholder="Add custom skill (e.g. Mixpanel)..."
            className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
          />
          <button
            type="button"
            onClick={addCustomSkill}
            className="px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors cursor-pointer"
          >
            Add Tag
          </button>
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Current PM / Tech Experience Level
        </label>
        <div className="grid grid-cols-3 gap-3 max-w-md">
          {EXPERIENCE_LEVELS.map((level) => {
            const isSelected = data.experienceLevel === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => onChange({ experienceLevel: level })}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-2 ring-indigo-100 shadow-2xs"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                <div className="text-xs font-bold">{level}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {level === "Beginner" ? "0-1 Projects" : level === "Intermediate" ? "1-3 Projects / Teardowns" : "Prior Internship / Leader"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects, Certifications or Experience */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Key Projects, Product Teardowns, or Case Competitions
        </label>
        <textarea
          rows={3}
          value={data.projects || ""}
          onChange={(e) => onChange({ projects: e.target.value })}
          placeholder="e.g. Built a campus food delivery bot; authored product teardown for Zepto Dark Stores; participated in PM Case Challenge 2025..."
          className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 leading-relaxed"
        ></textarea>
      </div>

      {/* Resume Upload UI */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Upload Resume (PDF, DOCX)
        </label>

        {data.resumeName ? (
          <div className="p-4 bg-slate-50 border border-indigo-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{data.resumeName}</div>
                <div className="text-[11px] text-slate-400">
                  {data.resumeSize || "1.8 MB"} • Uploaded {data.resumeDate || "Today"}
                </div>
              </div>
            </div>
            <label className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer">
              <span>Change File</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeSimulate} className="hidden" />
            </label>
          </div>
        ) : (
          <label className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-indigo-50/20">
            <Upload className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-xs font-bold text-slate-700">Click to upload your resume</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX (Max 10MB)</span>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeSimulate} className="hidden" />
          </label>
        )}
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
          Next: Functional Interests →
        </button>
      </div>
    </form>
  );
}
