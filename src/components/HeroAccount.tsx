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
      className="w-full bg-cover bg-center bg-no-repeat text-white py-12 md:py-16 min-h-[300px] flex items-center relative overflow-hidden font-sans shadow-inner"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1782727395/sxsxs_uw4gsq.png')" }}
    >
      {/* Dynamic abstract decorative elements for a modern premium look */}
      <div className="absolute -right-12 -bottom-12 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none animate-pulse duration-[8s]"></div>
      <div className="absolute -left-12 -top-12 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>
      <div className="absolute right-1/4 top-10 w-40 h-40 rounded-full bg-yellow-400/10 blur-xl pointer-events-none animate-bounce duration-[12s]"></div>
      
      {/* Decorative tech grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-[1180px] w-full mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-left">
          
          {/* Headline & Sub-headline */}
          <div className="flex flex-col space-y-3 w-full">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight font-sarabun text-white">
              Trọn Vẹn Tri Ân
            </h1>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Thay lời cảm ơn sâu sắc từ Viettel IDC gửi tới Quý khách hàng thân thiết. Hãy khám phá ngay kho quà tặng dành riêng cho bạn.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

