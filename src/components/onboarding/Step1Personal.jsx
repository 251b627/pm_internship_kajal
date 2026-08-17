import React from "react";
import { User, Building, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function Step1Personal({ data, onChange, onNext }) {
  const avatarOptions = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.college || !data.degree) {
      alert("Please fill in all required fields (Name, College, Degree).");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-heading font-extrabold text-slate-900">
          Personal & Academic Background
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Tell us where you study and how recruiters can address your profile.
        </p>
      </div>

      {/* Profile Photo Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">Select Profile Avatar</label>
        <div className="flex items-center gap-3">
          {avatarOptions.map((avatar, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange({ avatar })}
              className={`relative rounded-2xl overflow-hidden p-0.5 border-2 transition-all cursor-pointer ${
                data.avatar === avatar
                  ? "border-indigo-600 ring-4 ring-indigo-50 scale-105"
                  : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-12 h-12 rounded-xl object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={data.name || ""}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Alex Rivera"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800"
            />
          </div>
        </div>

        {/* College / University */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            College / University <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={data.college || ""}
              onChange={(e) => onChange({ college: e.target.value })}
              placeholder="e.g. Indian Institute of Information Technology"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800"
            />
          </div>
        </div>

        {/* Degree / Course */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Degree / Course <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={data.degree || ""}
              onChange={(e) => onChange({ degree: e.target.value })}
              placeholder="e.g. B.Tech Computer Science"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800"
            />
          </div>
        </div>

        {/* Current Year of Study */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Current Year of Study
          </label>
          <select
            value={data.currentYear || "3rd Year (Pre-final)"}
            onChange={(e) => onChange({ currentYear: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
          >
            <option value="1st Year">1st Year (Freshman)</option>
            <option value="2nd Year">2nd Year (Sophomore)</option>
            <option value="3rd Year (Pre-final)">3rd Year (Pre-final)</option>
            <option value="4th Year (Final Year)">4th Year (Final Year)</option>
            <option value="Postgraduate / MBA">Postgraduate / MBA</option>
          </select>
        </div>

        {/* Expected Graduation Year */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Expected Graduation Year
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={data.graduationYear || "2027"}
              onChange={(e) => onChange({ graduationYear: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
            >
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
        </div>

        {/* Current City / Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Current City / Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.city || ""}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="e.g. Bengaluru, India"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
            />
          </div>
        </div>

      </div>

      {/* Action CTA */}
      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="submit"
          className="px-7 py-3 text-xs font-heading font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          Next: Skills & Experience →
        </button>
      </div>
    </form>
  );
}
