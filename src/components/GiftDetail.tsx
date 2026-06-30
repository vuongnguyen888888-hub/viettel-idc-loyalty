import React, { useState } from "react";
import { ArrowLeft, MapPin, Tag, ShieldAlert, BadgePercent, CheckCircle, Calendar, HelpCircle, Award } from "lucide-react";
import { GiftItem, UserProfile } from "../types";

interface GiftDetailProps {
  gift: GiftItem;
  userProfile: UserProfile;
  onBack: () => void;
  onRedeem: (gift: GiftItem) => void;
}

export default function GiftDetail({ gift, userProfile, onBack, onRedeem }: GiftDetailProps) {
  const [activeTab, setActiveTab] = useState<"info" | "guide" | "terms">("info");

  const formatPoints = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const hasEnoughPoints = userProfile.points >= gift.points;

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden font-sarabun animate-fade-in">
      
      {/* Detail Header / Breadcrumb */}
      <div className="border-b border-gray-50 px-6 py-4 flex items-center justify-between bg-gray-50/50">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-[#EE0033] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>QUAY LẠI DANH SÁCH</span>
        </button>
        <div className="text-[11px] text-gray-400 font-medium">
          Trang chủ / Danh sách quà tặng / <span className="text-gray-600">{gift.brand}</span>
        </div>
      </div>

      {/* Main Intro split-layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
        
        {/* Left column: Image & Specs & Description Tabs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group">
            <img
              src={gift.imageUrl}
              alt={gift.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Tag Overlay */}
            <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
              {gift.brand}
            </div>

            {/* Apply location overlay */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-md border border-gray-100">
              <MapPin size={11} className="text-[#EE0033]" />
              <span>{gift.location}</span>
            </div>
          </div>

          {/* Quick specs card */}
          <div className="bg-gray-50/60 rounded-xl p-4 border border-gray-100 grid grid-cols-2 gap-4 text-xs text-gray-600">
            <div className="space-y-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Hãng cung cấp</span>
              <span className="font-bold text-gray-800">{gift.brand}</span>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Phân loại quà</span>
              <span className="font-bold text-gray-800">{gift.giftType}</span>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Mức điểm đổi</span>
              <span className="font-bold text-[#EE0033] flex items-center space-x-1">
                <span>{formatPoints(gift.points)}</span>
                <span className="text-[10px] text-gray-500 font-normal">điểm</span>
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Tình trạng</span>
              <span className="font-bold text-green-600 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span>Còn ưu đãi</span>
              </span>
            </div>
          </div>

          {/* Detailed description block, aligned with specs card */}
          <div className="border border-gray-100 rounded-xl overflow-hidden bg-white mt-4">
            {/* Tab triggers */}
            <div className="flex border-b border-gray-100 bg-gray-50/50 px-2">
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className={`py-3 px-3 text-[11px] font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === "info"
                    ? "border-[#EE0033] text-[#EE0033]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Mô tả chi tiết
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("guide")}
                className={`py-3 px-3 text-[11px] font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === "guide"
                    ? "border-[#EE0033] text-[#EE0033]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Hướng dẫn
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("terms")}
                className={`py-3 px-3 text-[11px] font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === "terms"
                    ? "border-[#EE0033] text-[#EE0033]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Điều kiện
              </button>
            </div>

            {/* Tab content area */}
            <div className="p-5 text-xs leading-relaxed text-gray-600 space-y-4">
              {activeTab === "info" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-800 flex items-center space-x-1.5">
                    <BadgePercent size={13} className="text-[#EE0033]" />
                    <span>Chi tiết ưu đãi từ {gift.brand}</span>
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {gift.descriptionDetail || "Đang cập nhật nội dung giới thiệu chi tiết cho ưu đãi đặc quyền này."}
                  </p>
                  <p className="text-gray-400 text-[11px]">
                    Hãy đổi quà tặng hấp dẫn này để tận hưởng không gian dịch vụ chất lượng cao, trải nghiệm mua sắm sành điệu hoặc các tiện ích gia tăng hoàn toàn miễn phí từ đối tác liên kết của Viettel IDC Loyalty.
                  </p>
                </div>
              )}

              {activeTab === "guide" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-800 flex items-center space-x-1.5">
                    <HelpCircle size={13} className="text-[#EE0033]" />
                    <span>Quy trình đổi và sử dụng E-Voucher</span>
                  </h4>
                  <ol className="space-y-2.5 list-decimal list-inside text-gray-600 text-xs">
                    <li>
                      <strong className="text-gray-800">Đổi quà:</strong> Nhấn nút <strong className="text-[#EE0033]">"Đổi quà"</strong> và xác nhận giao dịch.
                    </li>
                    <li>
                      <strong className="text-gray-800">Nhận mã:</strong> Nhận mã Voucher gửi qua tin nhắn SMS trong vòng 5 phút.
                    </li>
                    <li>
                      <strong className="text-gray-800">Sử dụng:</strong> 
                      <ul className="list-disc list-inside pl-4 mt-1 text-gray-500 space-y-1">
                        <li>Tại quầy: Xuất trình tin nhắn chứa mã cho thu ngân.</li>
                        <li>Online: Nhập mã khi thanh toán tại website đối tác.</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              )}

              {activeTab === "terms" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-800 flex items-center space-x-1.5">
                    <Calendar size={13} className="text-[#EE0033]" />
                    <span>Điều kiện áp dụng & Hạn dùng</span>
                  </h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-600 text-xs">
                    <li>Voucher có hạn <strong className="text-gray-800">30 ngày</strong> kể từ ngày quy đổi thành công.</li>
                    <li>Áp dụng <strong className="text-gray-800">01 lần duy nhất</strong> cho một hóa đơn.</li>
                    <li>Không áp dụng đồng thời với khuyến mại khác của đối tác {gift.brand}.</li>
                    <li>Mã ưu đãi không có giá trị quy đổi thành tiền mặt.</li>
                    <li>Khu vực áp dụng: Các chi nhánh đối tác tại <strong className="text-gray-800">{gift.location}</strong>.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Info & Redemption Action (compacted) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Category tag */}
          <div className="inline-flex items-center space-x-1.5 bg-red-50 text-[#EE0033] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-100 self-start">
            <BadgePercent size={11} />
            <span>Ưu đãi độc quyền IDC</span>
          </div>

          {/* Gift Title */}
          <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
            {gift.name}
          </h1>

          {/* Points block with original price */}
          <div className="flex items-baseline space-x-3.5 bg-red-50/20 p-4 rounded-xl border border-red-100/30">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Điểm quy đổi ưu đãi</span>
              <div className="flex items-center space-x-1">
                <span className="text-3xl font-black text-[#EE0033] leading-none">
                  {formatPoints(gift.points)}
                </span>
                <span className="text-sm font-bold text-gray-500 self-end mb-1">điểm</span>
              </div>
            </div>

            {gift.originalPriceText && (
              <div className="border-l border-gray-200 pl-4 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Giá trị gốc</span>
                <span className="text-sm font-bold text-gray-400 line-through">
                  {gift.originalPriceText}
                </span>
              </div>
            )}
          </div>

          {/* Account compatibility widget */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start space-x-3.5 shadow-sm">
            <div className="p-2.5 bg-gray-50 rounded-lg text-gray-500 shrink-0 mt-0.5">
              <Award size={18} className="text-[#EE0033]" />
            </div>
            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-gray-700">
                <span>Số dư điểm khả dụng của bạn:</span>
                <span className="text-[#EE0033]">{formatPoints(userProfile.points)} điểm</span>
              </div>
              {hasEnoughPoints ? (
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  Bạn đủ điều kiện đổi quà này. Sau khi xác nhận đổi, tài khoản của bạn sẽ còn lại <span className="font-bold text-gray-700">{formatPoints(userProfile.points - gift.points)} điểm</span>.
                </p>
              ) : (
                <p className="text-amber-600 font-medium text-[11px] leading-relaxed flex items-center space-x-1">
                  <ShieldAlert size={12} className="inline shrink-0" />
                  <span>Bạn chưa đủ điểm để đổi quà này. Hãy nạp tiền để tích lũy thêm điểm.</span>
                </p>
              )}
            </div>
          </div>

          {/* Core action block - pushed right up under the Account compatibility widget */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onRedeem(gift)}
              className="flex-1 bg-[#EE0033] hover:bg-[#CC002C] active:bg-[#AA0025] text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg shadow-red-500/10 cursor-pointer text-center flex items-center justify-center space-x-2 transform active:scale-[0.98]"
            >
              <CheckCircle size={15} />
              <span>ĐỔI QUÀ NGAY</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-800 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer text-center"
            >
              Quay lại
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
