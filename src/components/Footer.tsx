import React from "react";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const serviceList = [
    "Viettel Cloud Server",
    "Viettel Virtual Private Cloud",
    "Viettel Cloud Object Storage",
    "Viettel Cloud Backup",
    "Viettel Media CDN",
    "Thuê chỗ đặt thiết bị",
    "Viettel Hybrid Connect",
    "Viettel Cloud Desktop",
    "Viettel Cloud File Storage",
  ];

  const solutionList = [
    "Sao lưu & Dự phòng dữ liệu",
    "Chuyển đổi hạ tầng Cloud",
    "Container",
    "Mạng phân phối nội dung",
    "Phát triển & Vận hành",
    "Đám mây hiệu năng cao",
    "Giám sát & Ứng dụng AI",
    "Làm việc di động",
    "Xây dựng Website",
  ];

  const supportList = [
    "Liên hệ hỗ trợ, khiếu nại",
    "Hỗ trợ sử dụng dịch vụ",
    "Hệ thống Quản trị dịch vụ",
    "Thỏa thuận sử dụng",
    "Cách đăng ký dịch vụ máy chủ ảo",
    "Các hình thức thanh toán",
    "Hướng dẫn gia hạn dịch vụ",
    "Chương trình ưu đãi, khuyến mại",
  ];

  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-gray-100 pt-16 pb-12 font-sans text-gray-700">
      <div className="max-w-[1180px] w-full mx-auto px-4">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cột 1: Thông tin công ty (Left) - 3 cols */}
          <div className="lg:col-span-3 space-y-5 text-[13px] leading-relaxed text-gray-600">
            {/* Logo */}
            <div className="flex items-center -ml-1">
              <img 
                src="https://res.cloudinary.com/dpyizq1m2/image/upload/v1782053913/logo-IDC_2_up2gqp.svg" 
                alt="Viettel IDC" 
                className="h-[52px] w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-bold text-gray-800">Cơ quan chủ quản:</span> Công ty Cổ phần Viettel - CHT (Viettel IDC), trực thuộc Tập đoàn Công nghiệp - Viễn thông Quân đội.
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-gray-800">Mã số doanh nghiệp:</span> 0500589150 do Ban Quản lý các Khu công nghệ cao và Khu công nghiệp - UBND thành phố Hà Nội cấp lần đầu ngày 11/04/2008, sửa đổi lần thứ 13 ngày 10/06/2026.
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-gray-800">Chịu trách nhiệm nội dung:</span> Ông Lê Bá Tân.
              </p>
              
              <div className="space-y-1 pt-1">
                <p className="text-gray-800">
                  <span className="font-bold">Hotline:</span>{" "}
                  <span className="text-[#EE0033] font-bold">1800 8088</span>
                </p>
                <p className="text-gray-800">
                  <span className="font-bold">Email:</span>{" "}
                  <a href="mailto:support@viettelidc.com.vn" className="text-[#EE0033] font-medium hover:underline">
                    support@viettelidc.com.vn
                  </a>
                </p>
              </div>
            </div>

            {/* Social media circular black icons */}
            <div className="flex items-center space-x-2 pt-2">
              <a
                href="#facebook"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Facebook"
              >
                <Facebook size={14} className="fill-white stroke-none" />
              </a>
              <a
                href="#twitter"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Twitter"
              >
                <Twitter size={14} className="fill-white stroke-none" />
              </a>
              <a
                href="#linkedin"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} className="fill-white stroke-none" />
              </a>
              <a
                href="#tiktok"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80 font-black text-[12px] italic leading-none"
                aria-label="TikTok"
              >
                d
              </a>
              <a
                href="#youtube"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80"
                aria-label="YouTube"
              >
                <Youtube size={14} className="fill-white stroke-none" />
              </a>
              <a
                href="#zalo"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80 font-bold text-[8px] tracking-tighter leading-none"
                aria-label="Zalo"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Cột 2: Dịch vụ nổi bật */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-wider">
              Dịch vụ nổi bật
            </h4>
            <ul className="space-y-3 text-[13px]">
              {serviceList.map((srv, index) => (
                <li key={index}>
                  <a href={`#${srv.replace(/\s+/g, "").toLowerCase()}`} className="text-gray-500 hover:text-[#EE0033] font-medium transition-colors">
                    {srv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Giải pháp */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-wider">
              Giải pháp
            </h4>
            <ul className="space-y-3 text-[13px]">
              {solutionList.map((sol, index) => (
                <li key={index}>
                  <a href={`#${sol.replace(/\s+/g, "").toLowerCase()}`} className="text-gray-500 hover:text-[#EE0033] font-medium transition-colors">
                    {sol}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Trợ giúp */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-wider">
              Trợ giúp
            </h4>
            <ul className="space-y-3 text-[13px]">
              {supportList.map((sup, index) => (
                <li key={index}>
                  <a href={`#${sup.replace(/\s+/g, "").toLowerCase()}`} className="text-gray-500 hover:text-[#EE0033] font-medium transition-colors">
                    {sup}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
