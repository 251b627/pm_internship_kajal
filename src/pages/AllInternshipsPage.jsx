import React from "react";
import { useInternships } from "../context/InternshipContext";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import FilterBar from "../components/internships/FilterBar";
import InternshipCard from "../components/internships/InternshipCard";
import EmptyState from "../components/common/EmptyState";
import { Compass } from "lucide-react";

export default function AllInternshipsPage() {
  const { filteredInternships, resetFilters, internships } = useInternships();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div>
              <h1 className="text-2xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                <Compass className="w-6 h-6 text-indigo-600" />
                <span>All Internship Opportunities ({internships.length})</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Browse our curated directory of PM, APM, growth, and tech analyst roles across top startups and enterprises.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar />

          {/* Grid */}
          {filteredInternships.length === 0 ? (
            <EmptyState
              title="No opportunities found"
              description="We couldn't find any opportunities matching your active query. Try clearing your keywords or filters."
              actionText="Reset All Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredInternships.map((job) => (
                <InternshipCard key={job.id} internship={job} />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
