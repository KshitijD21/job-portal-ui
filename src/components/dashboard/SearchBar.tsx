"use client";
import { Search } from "lucide-react";
import FilterButton from "./FilterButton";

export default function SearchBar({
  onSearch,
}: {
  onSearch?: (q: string) => void;
}) {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by company, skill, tag..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      {/* <FilterButton /> */}
    </div>
  );
}
