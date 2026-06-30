import React, { useState } from "react";
import { MessageSquare, X, Send, Phone, HelpCircle, ArrowRight } from "lucide-react";

export default function ChatWidget() {
  const [showBubblePrompt, setShowBubblePrompt] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Xin chào! Viettel IDC có thể hỗ trợ gì cho Quý khách trong ngày hôm nay?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);

  const FAQ_OPTIONS = [
    { text: "Làm sao để tích thêm điểm?", reply: "Bạn sẽ tự động tích lũy điểm Loyalty tương ứng với 1% giá trị của mỗi đơn hàng thanh toán thành công cho các dịch vụ Cloud, Server, Hosting của Viettel IDC!" },
    { text: "Điểm đổi quà có hạn dùng không?", reply: "Điểm đổi quà Loyalty có thời hạn sử dụng là 12 tháng kể từ ngày tích lũy. Quý khách vui lòng đổi quà trước khi điểm hết hạn." },
    { text: "Hỗ trợ kỹ thuật 24/7", reply: "Quý khách vui lòng liên hệ Tổng đài hỗ trợ kỹ thuật miễn phí 1800 8088 (nhánh 2) hoặc gửi email đến support@viettelidc.com.vn để được hỗ trợ tức thời!" },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    if (!textToSend) setInputText("");

    // Simulate bot response
    setTimeout(() => {
      let botReply = "Cảm ơn Quý khách đã gửi thông tin. Yêu cầu của quý khách đang được chuyển tới chuyên viên tư vấn. Quý khách cũng có thể liên hệ trực tiếp Hotline miễn phí 1800 8088 để được giải đáp nhanh nhất!";
      
      const foundFaq = FAQ_OPTIONS.find((faq) => faq.text === text);
      if (foundFaq) {
        botReply = foundFaq.reply;
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 800);
  };

  return (
    <>
      {/* 1. BOTTOM LEFT: CHAT WIDGET & BUBBLE NOTIFICATION */}
      <div className="fixed bottom-6 left-6 z-50 flex items-end space-x-3 font-sans">
        <div className="relative flex flex-col items-start">
          {/* Dismissable prompt speech bubble */}
          {showBubblePrompt && !isChatOpen && (
            <div className="bg-white border border-gray-100 text-gray-800 text-[12.5px] font-medium px-4 py-3 rounded-lg shadow-xl mb-3 max-w-[280px] relative animate-fade-in">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubblePrompt(false);
                }}
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Đóng gợi ý"
              >
                <X size={14} />
              </button>
              <p className="pr-3 leading-relaxed">
                Xin chào! Viettel IDC có thể hỗ trợ gì cho Quý khách?
              </p>
              {/* Little triangle arrow at the bottom-left */}
              <div className="absolute -bottom-2 left-5 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white border-r-[8px] border-r-transparent"></div>
            </div>
          )}

          {/* Chat Bubble Button */}
          <button
            onClick={() => {
              setIsChatOpen(!isChatOpen);
              setShowBubblePrompt(false);
            }}
            className="w-14 h-14 bg-[#EE0033] hover:bg-[#CC002C] active:bg-[#AA0025] text-white rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer relative"
            aria-label="Trợ lý trực tuyến"
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
            </span>
          </button>
        </div>

        {/* Live Chat Window */}
        {isChatOpen && (
          <div className="absolute bottom-18 left-0 w-80 sm:w-96 bg-white rounded-sm shadow-2xl border-t-4 border-[#EE0033] overflow-hidden flex flex-col h-[450px] animate-fade-in">
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide">Trợ lý Viettel IDC</h4>
                  <p className="text-[10px] text-gray-400">Trực tuyến 24/7</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-[12.5px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-sm p-3 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#EE0033] text-white"
                        : "bg-white border border-gray-200 text-gray-800 shadow-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Bot Quick Suggestion Buttons */}
              {messages.length < 5 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] text-gray-400 block font-medium uppercase tracking-wider">CÂU HỎI THƯỜNG GẶP:</span>
                  {FAQ_OPTIONS.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(faq.text)}
                      className="block w-full text-left bg-white border border-gray-200 hover:border-[#EE0033] hover:text-[#EE0033] transition-colors p-2 rounded-sm text-xs text-gray-700 cursor-pointer"
                    >
                      {faq.text}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-gray-100 flex items-center space-x-2 bg-white"
            >
              <input
                type="text"
                placeholder="Nhập nội dung tin nhắn..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#EE0033]"
              />
              <button
                type="submit"
                className="bg-[#EE0033] hover:bg-[#CC002C] text-white p-2 rounded-sm transition-colors cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 2. BOTTOM RIGHT: FLOATING PHONE ICON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
        {/* Hotline Popover message */}
        {showPhoneTooltip && (
          <div className="bg-white border border-gray-100 text-gray-800 text-xs font-bold px-3 py-2 rounded-lg shadow-xl mb-3 flex items-center space-x-2 animate-fade-in">
            <span className="bg-red-50 text-[#EE0033] p-1 rounded-full">
              <Phone size={12} />
            </span>
            <span>Hotline miễn phí: <strong className="text-[#EE0033] font-mono text-[13px]">1800 8088</strong></span>
            <button onClick={() => setShowPhoneTooltip(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X size={12} />
            </button>
          </div>
        )}

        <button
          onClick={() => setShowPhoneTooltip(!showPhoneTooltip)}
          className="w-12 h-12 bg-[#EE0033] hover:bg-[#CC002C] text-white rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Liên hệ Hotline"
          title="Liên hệ hotline chăm sóc khách hàng"
        >
          <Phone size={20} className="animate-pulse" />
        </button>
      </div>
    </>
  );
}
