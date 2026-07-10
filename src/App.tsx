import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import HeroAccount from "./components/HeroAccount";
import Filters from "./components/Filters";
import GiftCard from "./components/GiftCard";
import GiftDetail from "./components/GiftDetail";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import ModalExchange from "./components/ModalExchange";
import ModalDeposit from "./components/ModalDeposit";
import { initialUserProfile, sampleGifts } from "./data";
import { GiftItem, UserProfile, FilterState } from "./types";
import { RotateCcw, AlertTriangle, Award, Wallet, PlusCircle, Sparkles, User, Gift } from "lucide-react";

export default function App() {
  // 1. User Profile state (with persistence during session)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("v_idc_profile");
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  useEffect(() => {
    localStorage.setItem("v_idc_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  // 2. Filters state
  const [filters, setFilters] = useState<FilterState>({
    giftType: "Tất cả",
    category: "Tất cả",
    searchQuery: "",
    location: "Tất cả",
    priceRange: "Tất cả",
  });

  // 3. Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // 4. Modals state
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [detailGift, setDetailGift] = useState<GiftItem | null>(null);

  // Reference for scrolling to gifts section
  const giftSectionRef = useRef<HTMLDivElement>(null);

  // Reset page when filters change
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      giftType: "Tất cả",
      category: "Tất cả",
      searchQuery: "",
      location: "Tất cả",
      priceRange: "Tất cả",
    });
    setCurrentPage(1);
  };

  // 5. Filter the gifts in real-time
  const filteredGifts = sampleGifts.filter((gift) => {
    // 5.1 Loại quà tặng
    if (filters.giftType !== "Tất cả" && gift.giftType !== filters.giftType) {
      return false;
    }
    // 5.2 Danh mục
    if (filters.category !== "Tất cả" && gift.category !== filters.category) {
      return false;
    }
    // 5.3 Địa điểm áp dụng
    if (filters.location !== "Tất cả" && gift.location !== filters.location) {
      return false;
    }
    // 5.4 Khoảng giá
    if (filters.priceRange !== "Tất cả") {
      if (filters.priceRange === "Dưới 2.000 điểm" && gift.points >= 2000) {
        return false;
      }
      if (
        filters.priceRange === "Từ 2.000 - 5.000 điểm" &&
        (gift.points < 2000 || gift.points > 5000)
      ) {
        return false;
      }
      if (filters.priceRange === "Trên 5.000 điểm" && gift.points <= 5000) {
        return false;
      }
    }
    // 5.5 Tìm kiếm
    if (filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase();
      const matchesName = gift.name.toLowerCase().includes(q);
      const matchesBrand = gift.brand.toLowerCase().includes(q);
      if (!matchesName && !matchesBrand) {
        return false;
      }
    }
    return true;
  });

  // Calculate pages for pagination.
  // In our specification, we want to allow browsing page 1 to 57 if no filters are active.
  // If active filters exist, totalPages reduces to fit the filtered size dynamically.
  const isFilterActive =
    filters.giftType !== "Tất cả" ||
    filters.category !== "Tất cả" ||
    filters.searchQuery.trim() !== "" ||
    filters.location !== "Tất cả" ||
    filters.priceRange !== "Tất cả";

  const totalPages = isFilterActive
    ? Math.max(1, Math.ceil(filteredGifts.length / 8))
    : 57; // Show 57 pages as seen in reference image

  // Generate page content
  const ITEMS_PER_PAGE = 8;
  const getPaginatedGifts = () => {
    if (isFilterActive) {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      return filteredGifts.slice(start, start + ITEMS_PER_PAGE);
    } else {
      // If we are browsing page 1 or 2, show real items.
      if (currentPage === 1) {
        return sampleGifts.slice(0, 8);
      }
      if (currentPage === 2) {
        return sampleGifts.slice(8, 12);
      }
      // For pages 3 to 57, generate variations of sample items to keep page filled and realistic!
      return sampleGifts.map((gift, index) => {
        const offsetMultiplier = (currentPage * 13) % 7;
        const adjustedPoints = Math.round(gift.points * (1 + (offsetMultiplier - 3) / 10));
        return {
          ...gift,
          id: `${gift.id}-page-${currentPage}-${index}`,
          name: `${gift.name} (Đợt ${currentPage})`,
          points: Math.max(1000, Math.round(adjustedPoints / 100) * 100),
        };
      }).slice(0, 8);
    }
  };

  const visibleGifts = getPaginatedGifts();

  // Scroll to gifts section smoothly
  const scrollToGifts = () => {
    giftSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Open gift redeem flow
  const handleOpenRedeem = (gift: GiftItem) => {
    setSelectedGift(gift);
  };

  // Open gift details page
  const handleViewDetail = (gift: GiftItem) => {
    setDetailGift(gift);
    // Use timeout to let the page render before scrolling
    setTimeout(() => {
      scrollToGifts();
    }, 50);
  };

  // Back to list
  const handleBackToList = () => {
    setDetailGift(null);
    setTimeout(() => {
      scrollToGifts();
    }, 50);
  };

  // Complete points deduction
  const handleConfirmRedeem = (cost: number) => {
    setUserProfile((prev) => ({
      ...prev,
      points: Math.max(0, prev.points - cost),
    }));
  };

  // Deposit Top-up helper
  const handleConfirmDeposit = (vndAmount: number, pointsToAdd: number) => {
    setUserProfile((prev) => ({
      ...prev,
      mainBalance: prev.mainBalance + vndAmount,
      points: prev.points + pointsToAdd,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-between selection:bg-red-50 selection:text-[#EE0033]">
      {/* Header Tier */}
      <Header />

      {/* Red Hero Banner with Account Balances */}
      <HeroAccount
        userProfile={userProfile}
        onOpenDeposit={() => setShowDepositModal(true)}
        onScrollToGifts={scrollToGifts}
      />

      {/* Horizontal Loyalty Card Section (Under Hero) */}
      <div className="max-w-[1180px] w-full mx-auto px-4 mt-2">
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 md:py-3 md:px-5 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden group">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EE0033]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#EE0033]/10 transition-all duration-500"></div>
          
          {/* Section 1: Customer Profile & Tier */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EE0033] to-[#FF3E6C] flex items-center justify-center text-white shadow-md shadow-red-500/10 shrink-0">
              <User size={16} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900 text-xs md:text-sm leading-none">{userProfile.name}</span>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm flex items-center space-x-1">
                  <Award size={8} />
                  <span>KIM CƯƠNG</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-none">
                <span>{userProfile.email}</span>
              </p>
            </div>
          </div>

          {/* Vertical divider on desktop */}
          <div className="hidden md:block h-8 w-px bg-gray-100"></div>

          {/* Section 2: Main Loyalty Points display */}
          <div className="bg-[#EE0033]/5 border border-red-100/30 px-3 py-2 rounded-xl flex items-center justify-between w-full md:w-auto md:min-w-[350px]">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EE0033] to-[#FF3E6C] flex items-center justify-center text-white shadow-md shadow-red-500/10 shrink-0">
                <Gift size={16} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider block">Điểm đổi quà Loyalty</span>
                <span className="text-sm font-black text-[#EE0033] font-sarabun leading-none block">
                  {userProfile.points.toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          </div>

          {/* Vertical divider on desktop */}
          <div className="hidden md:block h-8 w-px bg-gray-100"></div>

          {/* Section 3: Account Wallet Balance with top-up button */}
          <div className="flex items-center justify-between md:justify-start space-x-3 w-full md:w-auto">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-red-50 text-[#EE0033] rounded-lg shrink-0">
                <Wallet size={14} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block">Số dư ví chính</span>
                <span className="text-xs font-black text-gray-800 font-sarabun block">
                  {userProfile.mainBalance.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDepositModal(true)}
              className="bg-gray-900 hover:bg-[#EE0033] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 shrink-0 shadow-sm"
            >
              <PlusCircle size={10} />
              <span>Nạp tiền</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area Container */}
      <main 
        ref={giftSectionRef}
        className="max-w-[1180px] w-full mx-auto px-4 py-10 flex-1 space-y-8"
      >
        {detailGift ? (
          <GiftDetail
            gift={detailGift}
            userProfile={userProfile}
            onBack={handleBackToList}
            onRedeem={handleOpenRedeem}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Left Sidebar: containing Filters */}
              <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-6 self-start">
                <Filters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                />
              </div>

              {/* Right Side: Title, Gift cards, Pagination */}
              <div className="lg:col-span-3 space-y-6">

                {/* Gift Cards Grid Section */}
                {visibleGifts.length > 0 ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {visibleGifts.map((gift) => (
                        <GiftCard
                          key={gift.id}
                          gift={gift}
                          onRedeem={handleOpenRedeem}
                          onViewDetail={handleViewDetail}
                        />
                      ))}
                    </div>

                    {/* Pagination Component */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        scrollToGifts();
                      }}
                    />
                  </div>
                ) : (
                  /* Empty Search/Filter results state */
                  <div className="bg-white border border-gray-100 p-12 text-center rounded-sm max-w-xl mx-auto shadow-sm space-y-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 text-[#EE0033] rounded-full">
                      <AlertTriangle size={28} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-gray-800">Không tìm thấy quà tặng phù hợp</h3>
                      <p className="text-xs text-gray-500 leading-relaxed px-4">
                        Hiện tại không có ưu đãi nào trùng khớp với bộ lọc của bạn. Quý khách vui lòng điều chỉnh bộ lọc hoặc đặt lại để xem toàn bộ danh mục quà tặng.
                      </p>
                    </div>
                    <button
                      onClick={handleResetFilters}
                      className="inline-flex items-center space-x-1.5 bg-[#EE0033] hover:bg-[#CC002C] text-white font-semibold text-xs px-4 py-2 rounded-full cursor-pointer transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>Đặt lại bộ lọc</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Floating Support Assist Widgets */}
      <ChatWidget />

      {/* Corporate Site Footer */}
      <Footer />

      {/* Interactive Modals */}
      {selectedGift && (
        <ModalExchange
          gift={selectedGift}
          userProfile={userProfile}
          onClose={() => setSelectedGift(null)}
          onConfirmRedeem={handleConfirmRedeem}
        />
      )}

      {showDepositModal && (
        <ModalDeposit
          onClose={() => setShowDepositModal(false)}
          onSuccess={handleConfirmDeposit}
        />
      )}
    </div>
  );
}
