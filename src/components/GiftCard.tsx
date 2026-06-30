import React from "react";
import { Award, MapPin, Sparkles } from "lucide-react";
import { GiftItem } from "../types";

interface GiftCardProps {
  gift: GiftItem;
  onRedeem: (gift: GiftItem) => void;
  onViewDetail: (gift: GiftItem) => void;
}

export default function GiftCard({ gift, onRedeem, onViewDetail }: GiftCardProps) {
  const formatPoints = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return (
    <div className="bg-white border border-gray-200/60 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group overflow-hidden font-sarabun">
      {/* Product Image Section */}
      <div className="relative w-full aspect-video xs:aspect-square sm:aspect-[4/3] bg-gray-50 overflow-hidden shrink-0">
        <img
          src={gift.imageUrl}
          alt={gift.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Brand overlay panel */}
        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
          {gift.brand}
        </div>

        {/* Location badge on image */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-gray-800 text-[9px] font-bold px-2 py-1 rounded-md flex items-center space-x-1 shadow-sm border border-gray-100">
          <MapPin size={9} className="text-[#EE0033]" />
          <span>{gift.location}</span>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-4.5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Mini tags */}
          <div className="flex flex-wrap gap-1">
            <span className="text-[9px] bg-red-50 text-[#EE0033] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
              {gift.giftType}
            </span>
          </div>

          {/* Item Name (max 2 lines) */}
          <h3
            className="text-[13px] font-bold text-gray-800 leading-snug line-clamp-2 h-[38px] overflow-hidden transition-colors"
            title={gift.name}
          >
            {gift.name}
          </h3>
        </div>

        {/* Points & Action Row */}
        <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-[#EE0033] font-sarabun tracking-tight flex items-center space-x-0.5">
              <span>{formatPoints(gift.points)}</span>
              <span className="text-[11px] font-semibold text-gray-500 lowercase ml-0.5">điểm</span>
            </span>
            {gift.originalPriceText && (
              <span className="text-[10px] text-gray-400 line-through">
                {gift.originalPriceText}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => onViewDetail(gift)}
              className="border border-gray-200 hover:border-[#EE0033] hover:text-[#EE0033] active:bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-2 rounded-lg transition-all cursor-pointer transform active:scale-95 whitespace-nowrap"
            >
              Chi Tiết
            </button>
            <button
              onClick={() => onRedeem(gift)}
              className="bg-[#EE0033] hover:bg-[#CC002C] active:bg-[#AA0025] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-2 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer transform active:scale-95 whitespace-nowrap"
            >
              Đổi Quà
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

