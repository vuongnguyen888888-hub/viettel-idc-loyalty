import React from "react";
import { User, Wallet, Gift, PlusCircle, Award, Sparkles, ShieldCheck } from "lucide-react";
import { UserProfile } from "../types";

interface HeroAccountProps {
  userProfile: UserProfile;
  onOpenDeposit: () => void;
  onScrollToGifts: () => void;
}

export default function HeroAccount({
  userProfile,
  onOpenDeposit,
  onScrollToGifts,
}: HeroAccountProps) {
  // Format currency helpers
  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(num)
      .replace("₫", "đ");
  };

  const formatPoints = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return (
    <section 
      className="w-full bg-cover bg-center bg-no-repeat text-white py-10 md:py-12 min-h-[350px] flex items-center relative overflow-hidden font-sans shadow-inner"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1783649840/cc_zzkvme.webp')" }}
    >
      {/* Dynamic abstract decorative elements for a modern premium look */}
      <div className="absolute -right-12 -bottom-12 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none animate-pulse duration-[8s]"></div>
      <div className="absolute -left-12 -top-12 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>
      <div className="absolute right-1/4 top-10 w-40 h-40 rounded-full bg-yellow-400/10 blur-xl pointer-events-none animate-bounce duration-[12s]"></div>
      
      {/* Decorative tech grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-[1180px] w-full mx-auto px-4 relative z-10 my-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Left Column: Headline & Sub-headline */}
          <div className="flex flex-col space-y-3 max-w-xl text-left">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight font-sarabun text-[#EE0033]">
              Viettel IDC loyalty-Trọn vẹn tri ân
            </h1>
            <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
              Thay lời cảm ơn sâu sắc từ Viettel IDC gửi tới Quý khách hàng thân thiết. <br className="hidden sm:inline" />Hãy khám phá ngay kho quà tặng dành riêng cho bạn.
            </p>
          </div>

          {/* Right Column: User Profile Loyalty Card */}
          <div className="w-full md:w-[360px] shrink-0">
            {/* Bright Glass background with reduced opacity */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl p-4 md:p-5 text-gray-800 relative overflow-hidden">
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-200/60 relative z-10">
                <div className="w-10 h-10 rounded-full border border-gray-900 flex items-center justify-center text-gray-900 shrink-0">
                  <User size={20} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{userProfile.name}</h3>
                  <p className="text-xs text-gray-500 font-medium truncate">{userProfile.email}</p>
                </div>
              </div>
              
              <div className="mt-3 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-red-100/60 relative z-10">
                <div className="flex items-center text-gray-600">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Điểm đổi quà Loyalty</span>
                </div>
                <div className="mt-1 flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-[#EE0033] tracking-tight">
                    {formatPoints(userProfile.points)}
                  </span>
                  <span className="text-[10px] font-bold text-[#EE0033] uppercase">điểm</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

