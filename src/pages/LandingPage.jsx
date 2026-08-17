import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import {
  Sparkles,
  ArrowRight,
  Target,
  FileCheck,
  Cpu,
  Shield,
  ExternalLink
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated, loginAsDemoComplete } = useAuth();
  const navigate = useNavigate();

  const handleDemoExplore = () => {
    loginAsDemoComplete();
    navigate("/recommendations");
  };

  const steps = [
    {
      num: "01",
      title: "Create Your Student Account",
      desc: "Register in 30 seconds with your college, degree, and graduation year to establish your profile."
    },
    {
      num: "02",
      title: "Set Skills & Career Interests",
      desc: "Select functional areas like Product Management, FinTech, AI, Data Analytics, and preferred work modes."
    },
    {
      num: "03",
      title: "Receive AI Match Scores",
      desc: "Our weighted engine evaluates your skill fit, industry goals, and role ambitions to rank opportunities (e.g. 96% Match)."
    },
    {
      num: "04",
      title: "Save, Apply & Track Progress",
      desc: "Submit 1-click applications with your resume, track recruiter review stages, and manage interview schedules."
    }
  ];

  const features = [
    {
      icon: Sparkles,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      title: "Personalized AI Matches",
      desc: "Algorithmic match scoring (0-100%) that pairs your exact skills and portfolio projects with company criteria."
    },
    {
      icon: Target,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      title: "Goal-Based Role Suggestions",
      desc: "Whether you want a PPO conversion, startup agility, or big tech mentorship, get tailored role pathways."
    },
    {
      icon: FileCheck,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      title: "Real-Time Application Pipeline",
      desc: "Never wonder about your status. Track recruiter reviews, shortlisting, case assessments, and interviews."
    },
    {
      icon: Cpu,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      title: "Skill Fit & Gap Insights",
      desc: "See exactly which required and preferred skills you already possess, and what to learn for top-tier roles."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-indigo-50/30">
        
        {/* Subtle background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* SIH Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-6 shadow-xs animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Inspired by SIH Problem Statement 34: Student PM Internship Matching</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight mb-6">
            Find internships that match your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              interests and career goals.
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Tell us your skills, preferred industries, and role aspirations. Our intelligent matching engine instantly ranks top Product Management and tech internships with transparent match scores and actionable fit breakdowns.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-12">
            <Link
              to={isAuthenticated ? "/recommendations" : "/register"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-heading font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleDemoExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Explore Demo Matches</span>
            </button>
          </div>

          {/* Key Stat Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-200/80">
            <div>
              <div className="text-2xl font-extrabold font-heading text-slate-900">15+</div>
              <div className="text-xs text-slate-500 font-medium">PM & Tech Roles</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-indigo-600">98%</div>
              <div className="text-xs text-slate-500 font-medium">Match Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-slate-900">₹80k</div>
              <div className="text-xs text-slate-500 font-medium">Top Monthly Stipend</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 font-medium">Free for Students</div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200/60">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 mt-3 mb-3">
              How PM Match Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We eliminate the tedious search through hundreds of irrelevant job boards by scoring opportunities directly against your profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative hover:border-indigo-300 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="text-3xl font-heading font-extrabold text-indigo-600/30 group-hover:text-indigo-600 transition-colors mb-3">
                  {step.num}
                </div>
                <h3 className="text-sm font-heading font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md border border-purple-200/60">
              Built for Modern PM Aspirants
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 mt-3 mb-3">
              Everything You Need to Land Top PM Internships
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Designed from the ground up to empower students with intelligent discovery, transparent match criteria, and effortless tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${feat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-heading font-bold text-slate-900 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Original PM Internship Portal Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Government Initiative Reference</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Looking for the Official PM Internship Scheme?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore the Prime Minister’s Internship Scheme in Top 500 Companies portal for national policy guidelines, quota disclosures, and official partner registries.
            </p>
          </div>

          <a
            href="https://pminternship.mca.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-heading font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all flex-shrink-0"
          >
            <span>Visit Original PM Internship Portal</span>
            <ExternalLink className="w-4 h-4 text-slate-700" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
