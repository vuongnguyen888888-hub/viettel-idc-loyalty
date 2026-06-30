import React, { useState } from "react";
import { X, CheckCircle, Copy, Check, AlertCircle, HelpCircle, Award } from "lucide-react";
import { GiftItem, UserProfile } from "../types";

interface ModalExchangeProps {
  gift: GiftItem | null;
  userProfile: UserProfile;
  onClose: () => void;
  onConfirmRedeem: (pointsCost: number) => void;
}

export default function ModalExchange({
  gift,
  userProfile,
  onClose,
  onConfirmRedeem,
}: ModalExchangeProps) {
  const [step, setStep] = useState<"confirm" | "success">("confirm");
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  if (!gift) return null;

  const hasEnoughPoints = userProfile.points >= gift.points;

  const handleConfirm = () => {
    if (!hasEnoughPoints) return;
    // Generate a random-looking voucher code
    const randStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    const prefix = gift.brand.toUpperCase().replace(/[^A-Z]/g, "").substring(0, 5) || "VTIDC";
    const code = `${prefix}-${randStr}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(code);
    
    // Deduct points
    onConfirmRedeem(gift.points);
    setStep("success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPoints = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="bg-white rounded-sm w-full max-w-lg shadow-2xl relative overflow-hidden animate-fade-in border-t-4 border-[#EE0033]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">
            {step === "confirm" ? "Xác nhận đổi quà tặng" : "Đổi quà thành công"}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {step === "confirm" ? (
          /* Confirm step */
          <div className="p-6 space-y-5">
            {/* Gift Preview */}
            <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-sm">
              <img 
                src={gift.imageUrl} 
                alt={gift.name} 
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-cover rounded-sm border border-gray-200 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] bg-red-100 text-[#EE0033] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  {gift.brand}
                </span>
                <h4 className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2">
                  {gift.name}
                </h4>
                <p className="text-xs text-gray-500 flex items-center space-x-1">
                  <span>Kho: Còn hàng</span>
                  <span>•</span>
                  <span>{gift.location}</span>
                </p>
              </div>
            </div>

            {/* Score Comparison */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Điểm hiện tại của bạn:</span>
                <span className="font-bold text-gray-800 font-mono">
                  {formatPoints(userProfile.points)} điểm
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Chi phí điểm đổi quà:</span>
                <span className="font-bold text-[#EE0033] font-mono">
                  -{formatPoints(gift.points)} điểm
                </span>
              </div>
              <div className="border-t border-dashed border-gray-200 my-2"></div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Số dư điểm sau đổi:</span>
                <span className={`font-bold font-mono ${hasEnoughPoints ? "text-green-600" : "text-gray-400"}`}>
                  {hasEnoughPoints ? `${formatPoints(userProfile.points - gift.points)} điểm` : "Không khả dụng"}
                </span>
              </div>
            </div>

            {/* Terms and details snippet */}
            {gift.descriptionDetail && (
              <div className="bg-blue-50 text-blue-800 p-3.5 rounded-sm text-xs space-y-1 flex items-start space-x-2">
                <HelpCircle size={16} className="shrink-0 mt-0.5 text-blue-600" />
                <div>
                  <span className="font-bold block mb-0.5">Thông tin sử dụng:</span>
                  <p className="leading-relaxed text-blue-900/90">{gift.descriptionDetail}</p>
                </div>
              </div>
            )}

            {/* Warning if not enough points */}
            {!hasEnoughPoints && (
              <div className="bg-red-50 text-red-800 p-3 rounded-sm text-xs flex items-center space-x-2 border border-red-100">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <p className="font-medium">Tài khoản của bạn không đủ điểm để đổi quà tặng này. Vui lòng tích lũy thêm điểm.</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-sm text-sm font-semibold transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={!hasEnoughPoints}
                onClick={handleConfirm}
                className={`flex-1 text-white py-2.5 rounded-sm text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  hasEnoughPoints 
                    ? "bg-[#EE0033] hover:bg-[#CC002C] active:bg-[#AA0025] hover:shadow-md" 
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
              >
                Xác nhận đổi
              </button>
            </div>
          </div>
        ) : (
          /* Success step */
          <div className="p-6 text-center space-y-5">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle size={48} className="animate-bounce" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-gray-800">Giao dịch thành công!</h4>
              <p className="text-xs text-gray-500 px-4">
                Hệ thống đã trừ <strong className="text-[#EE0033]">{formatPoints(gift.points)} điểm</strong> từ tài khoản của bạn. Mã coupon của bạn đã sẵn sàng.
              </p>
            </div>

            {/* Voucher code display */}
            <div className="bg-gray-50 border border-dashed border-gray-300 p-4 rounded-sm flex flex-col items-center space-y-2">
              <span className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">MÃ ƯU ĐÃI CỦA BẠN</span>
              <span className="text-xl font-mono font-black text-[#EE0033] tracking-widest selection:bg-red-100">
                {generatedCode}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium pt-1 cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-600" />
                    <span className="text-green-600 font-bold">Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Sao chép mã</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-left text-xs text-gray-500 bg-gray-50 p-3 rounded-sm leading-relaxed">
              <strong>Lưu ý:</strong> Mã ưu đãi sẽ được gửi tới email <span className="font-semibold text-gray-700">{userProfile.email}</span> và số điện thoại của bạn. Quý khách vui lòng kiểm tra hộp thư đến hoặc thư rác để lưu trữ mã.
            </div>

            {/* Success Finish Button */}
            <button
              onClick={onClose}
              className="w-full bg-gray-800 hover:bg-gray-900 active:bg-black text-white py-2.5 rounded-sm text-sm font-semibold transition-all cursor-pointer shadow-sm"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
