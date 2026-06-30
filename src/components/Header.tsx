import React, { useState } from "react";
import { Search, ShoppingBag, Bell, User, Globe, ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const menuItems = [
    "Dịch vụ",
    "Giải pháp",
    "Bảng giá",
    "Tin tức",
    "Hợp tác",
    "Về Viettel IDC",
    "Tài liệu & hỗ trợ",
  ];

  return (
    <header className="w-full bg-white font-sans relative z-40 border-b border-gray-100">
      {/* 1. Top bar */}
      <div className="w-full bg-[#333333] text-gray-300 text-[12px] h-8 flex items-center">
        <div className="max-w-[1180px] w-full mx-auto px-4 flex justify-end items-center space-x-6">
          <a href="#tuyendung" className="hover:text-white transition-colors">
            Tuyển dụng
          </a>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors">
            <Globe size={13} />
            <span>Tiếng Việt</span>
            <ChevronDown size={10} />
          </div>
        </div>
      </div>

      {/* 2. Main navigation */}
      <div className="w-full h-14 bg-white flex items-center relative">
        <div className="max-w-[1180px] w-full mx-auto px-4 flex justify-between items-center h-full">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 mr-4 shrink-0" id="viettel-idc-logo-link">
            <img 
              src="https://res.cloudinary.com/dpyizq1m2/image/upload/v1782053913/logo-IDC_2_up2gqp.svg" 
              alt="Viettel IDC" 
              className="h-9 w-auto" 
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[14px] font-medium text-gray-700 h-full">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
                className="hover:text-[#EE0033] transition-colors relative py-4 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EE0033] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right section actions */}
          <div className="flex items-center space-x-4 shrink-0">
            {/* Search toggler */}
            <div className="relative flex items-center">
              {showSearchInput && (
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="absolute right-8 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#EE0033] w-40 transition-all"
                  autoFocus
                  onBlur={() => setShowSearchInput(false)}
                />
              )}
              <button
                onClick={() => setShowSearchInput(!showSearchInput)}
                className="text-gray-600 hover:text-[#EE0033] transition-colors p-1 cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Quản lý dịch vụ */}
            <a
              href="#quan-ly-dich-vu"
              className="hidden md:inline-block text-[13px] font-semibold text-gray-700 hover:text-[#EE0033] transition-colors"
            >
              Quản lý dịch vụ
            </a>

            {/* Cart with badge */}
            <div className="relative cursor-pointer hover:text-[#EE0033] transition-colors text-gray-600 p-1">
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-1 bg-[#EE0033] text-white font-mono text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center scale-90">
                1
              </span>
            </div>

            {/* Notifications with badge */}
            <div className="relative cursor-pointer hover:text-[#EE0033] transition-colors text-gray-600 p-1">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-[#EE0033] text-white font-mono text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center scale-90">
                15
              </span>
            </div>

            {/* User Avatar Outline */}
            <div className="cursor-pointer border border-gray-300 rounded-full p-1.5 hover:border-[#EE0033] hover:text-[#EE0033] text-gray-600 transition-all">
              <User size={16} />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-[#EE0033] transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-t border-gray-100 absolute top-full left-0 z-50 shadow-lg px-4 py-3 space-y-2 animate-fade-in">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
              className="block py-2 text-gray-700 hover:text-[#EE0033] font-medium border-b border-gray-50 text-[14px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#quan-ly-dich-vu"
            className="block py-2 text-[#EE0033] font-semibold text-[14px]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Quản lý dịch vụ
          </a>
        </div>
      )}
    </header>
  );
}
