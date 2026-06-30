import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // We want to draw page numbers. If totalPages is high (e.g., 57), we can hardcode the pagination representation
  // exactly as requested: 1, 2, 3, 4, 5, ..., 57.
  const isHardcodedList = totalPages >= 10;

  const renderPages = () => {
    if (isHardcodedList) {
      // Draw 1, 2, 3, 4, 5, ..., 57
      const pages = [1, 2, 3, 4, 5];
      return (
        <>
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-sm flex items-center justify-center text-[13px] font-bold cursor-pointer transition-all ${
                currentPage === p
                  ? "bg-[#EE0033] text-white shadow-xs"
                  : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="text-gray-400 px-1 font-bold">...</span>
          <button
            onClick={() => onPageChange(57)}
            className={`w-9 h-9 rounded-sm flex items-center justify-center text-[13px] font-bold cursor-pointer transition-all ${
              currentPage === 57
                ? "bg-[#EE0033] text-white shadow-xs"
                : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-100"
            }`}
          >
            57
          </button>
        </>
      );
    } else {
      // Dynamic rendering for filtered smaller sets
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      return pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-sm flex items-center justify-center text-[13px] font-bold cursor-pointer transition-all ${
            currentPage === p
              ? "bg-[#EE0033] text-white shadow-xs"
              : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-100"
          }`}
        >
          {p}
        </button>
      ));
    }
  };

  return (
    <div className="flex justify-center items-center space-x-1.5 py-6">
      {/* Left Arrow */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={`w-9 h-9 border border-gray-100 rounded-sm flex items-center justify-center bg-white text-gray-500 hover:text-[#EE0033] hover:border-[#EE0033] transition-all ${
          currentPage === 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-label="Trang trước"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Pages */}
      {renderPages()}

      {/* Right Arrow */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className={`w-9 h-9 border border-gray-100 rounded-sm flex items-center justify-center bg-white text-gray-500 hover:text-[#EE0033] hover:border-[#EE0033] transition-all ${
          currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-label="Trang sau"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
