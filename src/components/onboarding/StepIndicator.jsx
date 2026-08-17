import React from "react";
import { Check } from "lucide-react";

export default function StepIndicator({ currentStep, steps, onStepClick }) {
  return (
    <div className="mb-8">
      {/* Mobile view step text */}
      <div className="sm:hidden flex items-center justify-between mb-3 text-xs">
        <span className="font-bold text-indigo-600">
          Step {currentStep} of {steps.length}
        </span>
        <span className="font-semibold text-slate-700">
          {steps[currentStep - 1]?.title}
        </span>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:grid grid-cols-5 gap-2">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => onStepClick && stepNum <= currentStep && onStepClick(stepNum)}
              disabled={stepNum > currentStep}
              className={`text-left p-2 rounded-xl border transition-all ${
                isCurrent
                  ? "bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-100 shadow-2xs"
                  : isDone
                  ? "bg-slate-50 hover:bg-slate-100 border-slate-200 cursor-pointer"
                  : "opacity-40 border-transparent cursor-not-allowed"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDone
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3" /> : stepNum}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Step 0{stepNum}
                </span>
              </div>
              <div
                className={`text-xs font-semibold truncate ${
                  isCurrent ? "text-indigo-950 font-bold" : "text-slate-700"
                }`}
              >
                {step.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
