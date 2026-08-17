import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import Navbar from "../components/common/Navbar";
import StepIndicator from "../components/onboarding/StepIndicator";
import Step1Personal from "../components/onboarding/Step1Personal";
import Step2Skills from "../components/onboarding/Step2Skills";
import Step3Interests from "../components/onboarding/Step3Interests";
import Step4Goals from "../components/onboarding/Step4Goals";
import Step5Review from "../components/onboarding/Step5Review";

export default function OnboardingPage() {
  const { profile, completeOnboarding } = useProfile();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    avatar: profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    college: profile?.college || "",
    degree: profile?.degree || "",
    currentYear: profile?.currentYear || "3rd Year (Pre-final)",
    graduationYear: profile?.graduationYear || "2027",
    city: profile?.city || "Bengaluru, India",

    skills: profile?.skills || ["Product Thinking", "Communication", "Research"],
    experienceLevel: profile?.experienceLevel || "Intermediate",
    projects: profile?.projects || "",
    resumeName: profile?.resumeName || "",
    resumeSize: profile?.resumeSize || "",
    resumeDate: profile?.resumeDate || "",

    interests: profile?.interests || ["Product Management", "Technology"],
    industries: profile?.industries || ["FinTech", "E-commerce"],

    targetRole: profile?.targetRole || "Associate Product Manager Intern",
    preferredRoles: profile?.preferredRoles || ["Associate Product Manager Intern", "Product Intern"],
    workMode: profile?.workMode || "Hybrid",
    preferredLocations: profile?.preferredLocations || ["Bengaluru", "Remote"],
    duration: profile?.duration || "6 Months",
    availability: profile?.availability || "Immediate / Within 2 weeks",
    stipendExpectation: profile?.stipendExpectation || "₹35,000+ / month",
    careerGoals: profile?.careerGoals || ["Convert to Full-Time PPO", "Build core PM skills"]
  });

  const steps = [
    { title: "Academic & Personal" },
    { title: "Skills & Resume" },
    { title: "Interests & Industries" },
    { title: "Career Goals & Mode" },
    { title: "Review & Match" }
  ];

  const handleUpdate = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(steps.length, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJumpToStep = (stepNum) => {
    setCurrentStep(stepNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = (finalData) => {
    completeOnboarding(finalData);
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/40">
          
          {/* Step Indicator */}
          <StepIndicator
            currentStep={currentStep}
            steps={steps}
            onStepClick={handleJumpToStep}
          />

          {/* Active Step Content */}
          <div className="mt-6">
            {currentStep === 1 && (
              <Step1Personal
                data={formData}
                onChange={handleUpdate}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <Step2Skills
                data={formData}
                onChange={handleUpdate}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 3 && (
              <Step3Interests
                data={formData}
                onChange={handleUpdate}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 4 && (
              <Step4Goals
                data={formData}
                onChange={handleUpdate}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {currentStep === 5 && (
              <Step5Review
                data={formData}
                onJumpToStep={handleJumpToStep}
                onSubmit={handleFinalSubmit}
                onPrev={handlePrev}
              />
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
