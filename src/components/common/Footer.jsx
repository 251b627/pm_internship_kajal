import React from "react";
import { Link } from "react-router-dom";
import { Compass, Shield, ExternalLink, Heart, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-base text-slate-900">
                PM Match Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Intelligent internship recommendation platform inspired by Smart India Hackathon (SIH) Problem Statement 34.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
              <Award className="w-3 h-3 text-indigo-600" />
              <span>Smart India Hackathon 2024–26 Prototype</span>
            </div>
          </div>

          {/* Col 2: Student Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Student Hub</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/recommendations" className="hover:text-indigo-600 transition-colors">
                  Personalized AI Matches
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-indigo-600 transition-colors">
                  All 15+ Internship Listings
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-indigo-600 transition-colors">
                  Application Stage Tracker
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-indigo-600 transition-colors">
                  Bookmarked Roles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: PM Tracks & Roles */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Role Tracks</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/explore" className="hover:text-indigo-600 transition-colors">
                  Associate Product Manager (APM)
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-indigo-600 transition-colors">
                  AI Product Management
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-indigo-600 transition-colors">
                  FinTech & Growth PM
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-indigo-600 transition-colors">
                  Product Analytics & Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: National Initiatives & External Link */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Government Initiative</h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Explore the Prime Minister’s Internship Scheme for national skilling policies and participating enterprise listings.
            </p>
            <a
              href="https://pminternship.mca.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>Visit Official PM Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} PM Match Recommendation Portal. High-Fidelity Student Prototype.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Designed for Student Career Success</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
