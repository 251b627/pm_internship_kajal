import React from "react";
import { useInternships } from "../../context/InternshipContext";
import { INDUSTRY_OPTIONS, WORK_MODES } from "../../data/mockInternships";
import { Search, RotateCcw, ArrowUpDown } from "lucide-react";

export default function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    selectedIndustry,
    setSelectedIndustry,
    selectedWorkMode,
    setSelectedWorkMode,
    selectedDuration,
    setSelectedDuration,
    minStipend,
    setMinStipend,
    sortBy,
    setSortBy,
    resetFilters,
    filteredInternships
  } = useInternships();

  const isFiltered =
    searchQuery ||
    selectedRole !== "All" ||
    selectedIndustry !== "All" ||
    selectedWorkMode !== "All" ||
    selectedDuration !== "All" ||
    minStipend > 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
      
      {/* Top row: Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, role, skills, or city..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="match">✨ Best AI Match</option>
            <option value="stipend">💰 Highest Stipend</option>
            <option value="deadline">⏳ Closest Deadline</option>
            <option value="latest">🆕 Latest Added</option>
          </select>
        </div>

      </div>

      {/* Filter Select Controls Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100">
        
        {/* Role Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role Track</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="Product">Product Management</option>
            <option value="Associate Product Manager">Associate PM (APM)</option>
            <option value="AI">AI Product</option>
            <option value="Technical">Technical PM</option>
            <option value="Growth">Product Growth</option>
            <option value="Design">Product Design / UX</option>
            <option value="Analytics">Product Analytics</option>
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Industry</label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Industries</option>
            {INDUSTRY_OPTIONS.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Work Mode Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Work Mode</label>
          <select
            value={selectedWorkMode}
            onChange={(e) => setSelectedWorkMode(e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Modes</option>
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">Any Duration</option>
            <option value="2 Months">2 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="4 Months">4 Months</option>
            <option value="6 Months">6 Months</option>
          </select>
        </div>

        {/* Min Stipend Filter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Min Stipend</label>
          <select
            value={minStipend}
            onChange={(e) => setMinStipend(Number(e.target.value))}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value={0}>Any Stipend</option>
            <option value={30000}>₹30,000+ / mo</option>
            <option value={40000}>₹40,000+ / mo</option>
            <option value={50000}>₹50,000+ / mo</option>
            <option value={70000}>₹70,000+ / mo</option>
          </select>
        </div>

      </div>

      {/* Filter Stats & Reset Button */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div>
          Showing <strong>{filteredInternships.length}</strong> matching opportunities
        </div>

        {isFiltered && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

    </div>
  );
}
