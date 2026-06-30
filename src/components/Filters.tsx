import React, { useState, useRef, useEffect } from "react";
import { Search, RotateCcw, MapPin, Tag, Compass, Filter } from "lucide-react";
import { FilterState } from "../types";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

function CustomDropdown({
  value,
  onChange,
  options,
  icon,
  isActive,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  icon: React.ReactNode;
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-gray-50/50 hover:bg-gray-50 border rounded-xl pl-9 pr-8 py-2 text-xs text-left focus:outline-none transition-all cursor-pointer font-medium flex items-center justify-between ${
          isActive || isOpen
            ? "border-[#EE0033] text-[#EE0033] ring-1 ring-[#EE0033]/10"
            : "border-gray-200/80 text-gray-700 hover:border-gray-300"
        }`}
      >
        <span className="truncate">{selectedOption.label}</span>
        <span className={`text-[9px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Icon positioned absolutely */}
      <span className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isActive || isOpen ? "text-[#EE0033]" : "text-gray-400"}`}>
        {icon}
      </span>

      {/* Floating menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1 overflow-hidden transition-all">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer block ${
                  isSelected
                    ? "bg-[#EE0033] text-white"
                    : "text-gray-700 hover:bg-[#EE0033] hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Filters({
  filters,
  onFilterChange,
  onResetFilters,
}: FiltersProps) {
  const categories = [
    { value: "Tất cả", label: "Tất cả danh mục" },
    { value: "Ăn uống", label: "Ẩm thực" },
    { value: "Golf", label: "Golf" },
    { value: "Du lịch - Khách sạn", label: "Du lịch" },
    { value: "Vui chơi - Giải trí", label: "Giải trí" },
    { value: "Sức khỏe và Làm đẹp", label: "Làm đẹp" },
    { value: "Quà tặng - Dịch vụ khác", label: "Khác" },
    { value: "Khóa học - Đào tạo", label: "Đào tạo" },
    { value: "Thẻ tiện ích", label: "Thẻ tiện ích" },
  ];

  const locationOptions = [
    { value: "Tất cả", label: "Mọi địa điểm" },
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "TP. Hồ Chí Minh", label: "TP. Hồ Chí Minh" },
    { value: "Toàn quốc", label: "Toàn quốc" },
  ];

  const priceOptions = [
    { value: "Tất cả", label: "Mọi mức điểm" },
    { value: "Dưới 2.000 điểm", label: "Dưới 2.000 điểm" },
    { value: "Từ 2.000 - 5.000 điểm", label: "Từ 2.000 - 5.000 điểm" },
    { value: "Trên 5.000 điểm", label: "Trên 5.000 điểm" },
  ];

  const isSearchActive = filters.searchQuery !== "";
  const isLocationActive = filters.location !== "Tất cả";
  const isPriceActive = filters.priceRange !== "Tất cả";

  return (
    <div className="w-full h-full bg-white border border-gray-100 p-5 rounded-2xl font-sans text-gray-700 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top minimal header line */}
      <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <Filter size={15} className="text-[#EE0033]" />
          <span className="text-xs font-bold uppercase tracking-wider">Bộ lọc ưu đãi</span>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center space-x-1.5 text-[11px] font-semibold text-gray-400 hover:text-[#EE0033] transition-colors cursor-pointer"
        >
          <RotateCcw size={11} />
          <span>Đặt lại</span>
        </button>
      </div>

      <div className="space-y-4">
        
        {/* Row 2: Minimalist Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider min-w-[100px]">
            Danh mục:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = filters.category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onFilterChange({ category: cat.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-red-50 text-[#EE0033] font-bold"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Simple, Minimal Form Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-gray-50 pt-3">
          
          {/* Tìm kiếm */}
          <div className="relative">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchActive ? "text-[#EE0033]" : "text-gray-400"}`}>
              <Search size={13} />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm ưu đãi..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className={`w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white border rounded-xl pl-9 pr-4 py-2 text-xs text-gray-700 focus:outline-none transition-all font-medium placeholder-gray-400 ${
                isSearchActive 
                  ? "border-[#EE0033] ring-1 ring-[#EE0033]/10 focus:border-[#EE0033]" 
                  : "border-gray-200/80 hover:border-gray-300 focus:border-[#EE0033]"
              }`}
            />
          </div>

          {/* Địa điểm áp dụng */}
          <CustomDropdown
            value={filters.location}
            onChange={(val) => onFilterChange({ location: val })}
            options={locationOptions}
            icon={<MapPin size={13} />}
            isActive={isLocationActive}
          />

          {/* Khoảng giá */}
          <CustomDropdown
            value={filters.priceRange}
            onChange={(val) => onFilterChange({ priceRange: val })}
            options={priceOptions}
            icon={<Tag size={13} />}
            isActive={isPriceActive}
          />

        </div>
      </div>
    </div>
  );
}

