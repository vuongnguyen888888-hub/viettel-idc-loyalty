import React, { useState } from "react";
import { X, CheckCircle, CreditCard, ChevronRight } from "lucide-react";
import { UserProfile } from "../types";

interface ModalDepositProps {
  onClose: () => void;
  onSuccess: (amountVND: number, pointsToAdd: number) => void;
}

export default function ModalDeposit({ onClose, onSuccess }: ModalDepositProps) {
  const [success, setSuccess] = useState(false);
  const [addedPoints, setAddedPoints] = useState(0);
  const [addedVnd, setAddedVnd] = useState(0);

  const options = [
    { label: "Gói Phổ Thông", cost: 100000, points: 10000, desc: "Tặng 10.000 điểm Loyalty" },
    { label: "Gói Nâng Cao", cost: 500000, points: 55000, desc: "Tặng 55.000 điểm Loyalty (Bonus 5k)" },
    { label: "Gói Doanh Nghiệp", cost: 2000000, points: 230000, desc: "Tặng 230.000 điểm Loyalty (Bonus 30k)" },
    { label: "Gói Premium", cost: 5000000, points: 600000, desc: "Tặng 600.000 điểm Loyalty (Bonus 100k)" },
  ];

  const handleSelectOption = (cost: number, points: number) => {
    setAddedPoints(points);
    setAddedVnd(cost);
    onSuccess(cost, points);
    setSuccess(true);
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="bg-white rounded-sm w-full max-w-md shadow-2xl relative overflow-hidden animate-fade-in border-t-4 border-[#EE0033]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">
            Nạp tiền & Tích lũy điểm Loyalty
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {!success ? (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-500">
              Chọn một gói nạp tiền mô phỏng dưới đây để tăng số dư tài khoản chính và nhận điểm thưởng đổi quà tức thì:
            </p>

            <div className="space-y-2.5">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.cost, opt.points)}
                  className="w-full text-left p-3.5 border border-gray-100 hover:border-[#EE0033] hover:bg-red-50/30 transition-all rounded-[3px] flex justify-between items-center cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-gray-800 uppercase block tracking-wider">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-gray-400 block">{opt.desc}</span>
                  </div>
                  <div className="text-right flex items-center space-x-2">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-[#EE0033] font-mono">
                        {formatVND(opt.cost)}
                      </span>
                      <span className="text-[11px] text-green-600 font-semibold">
                        +{formatPoints(opt.points)} điểm
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-gray-400 group-hover:text-[#EE0033] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            <div className="text-[11px] text-gray-400 text-center italic">
              * Đây là tính năng mô phỏng giao dịch thanh toán để kiểm thử quy trình đổi quà của hệ thống Viettel IDC.
            </div>
          </div>
        ) : (
          <div className="p-6 text-center space-y-5">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle size={48} className="animate-bounce" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-gray-800">Giao dịch thành công!</h4>
              <p className="text-xs text-gray-500 px-4">
                Đã nạp <strong className="text-gray-800">{formatVND(addedVnd)}</strong> vào Tài khoản chính. Tài khoản điểm đổi quà của bạn đã được cộng thêm <strong className="text-[#EE0033]">{formatPoints(addedPoints)} điểm</strong>.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#EE0033] hover:bg-[#CC002C] text-white py-2.5 rounded-sm text-sm font-semibold transition-all cursor-pointer shadow-sm"
            >
              Hoàn tất & Quay lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
