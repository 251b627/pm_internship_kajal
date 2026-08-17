import React, { useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { useInternships } from "../../context/InternshipContext";
import Modal from "../common/Modal";
import { FileText, CheckCircle, Send } from "lucide-react";

export default function ApplyModal({ internship, isOpen, onClose }) {
  const { profile } = useProfile();
  const { applyToInternship } = useInternships();
  
  const [coverNote, setCoverNote] = useState(
    `Hello ${internship?.company} Team,\n\nI am very excited to apply for the ${internship?.title} role. With my background in ${profile?.skills?.slice(0, 3).join(", ") || "product thinking"} and passion for the ${internship?.industry || "tech"} space, I am eager to contribute to your product roadmap.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      applyToInternship(internship.id, coverNote);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  if (!internship) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply to ${internship.company}`}>
      {isSuccess ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="text-base font-heading font-extrabold text-slate-900">Application Submitted!</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your candidate profile and resume have been forwarded to the {internship.company} University Recruiting squad.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Target Role summary header */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${internship.logoColor || "bg-indigo-600"} text-white flex items-center justify-center font-heading font-bold text-xs flex-shrink-0`}
            >
              {internship.logoText || "PM"}
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">{internship.title}</h5>
              <p className="text-[11px] text-slate-500">{internship.company} • {internship.stipend}</p>
            </div>
          </div>

          {/* Student Profile Card (Pre-filled) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Applicant Details</label>
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Name</span>
                <div className="font-bold text-slate-800">{profile?.name || "Student"}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Email</span>
                <div className="font-bold text-slate-800 truncate">{profile?.email || "student@college.edu"}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">College</span>
                <div className="font-bold text-slate-800 truncate">{profile?.college || "College"}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Graduation</span>
                <div className="font-bold text-slate-800">{profile?.graduationYear || "2027"}</div>
              </div>
            </div>
          </div>

          {/* Resume Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Attached Resume</label>
            <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800">{profile?.resumeName || "Alex_Rivera_PM_Resume.pdf"}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Verified
              </span>
            </div>
          </div>

          {/* Cover Note */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Quick Pitch / Cover Note <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={4}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Why are you a good fit for this role?"
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed text-slate-800"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-heading font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
}
