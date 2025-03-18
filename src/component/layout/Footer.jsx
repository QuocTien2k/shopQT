import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-black py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
                {/* Cột 1: Logo & Mô tả */}
                <div>
                    <h2 className="text-xl font-semibold">ShopQT</h2>
                    <p className="text-gray-400 max-w-xs">
                        ShopQT chuyên cung cấp các sản phẩm điện thoại, máy tính bảng, laptop và phụ kiện công nghệ chính hãng từ các thương hiệu hàng đầu như Apple, Samsung, Asus, Dell, Lenovo, v.v.
                    </p>
                    <p className="text-gray-400 max-w-xs">
                        Cam kết hàng chính hãng 100%, bảo hành uy tín, cùng nhiều chương trình ưu đãi hấp dẫn.
                    </p>
                </div>

                {/* Cột 2: Liên kết nhanh */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Liên kết</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400">Trang chủ</a></li>
                        <li><a href="#" className="text-gray-400">Sản phẩm</a></li>
                        <li><a href="#" className="text-gray-400">Giới thiệu</a></li>
                        <li><a href="#" className="text-gray-400">Liên hệ</a></li>
                    </ul>
                </div>

                {/* Cột 3: Phương thức thanh toán & Đối tác giao hàng */}
                <div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Thanh toán</h3>
                        <div className="flex gap-2 flex-wrap">
                            <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-1024.png" alt="Visa" className="w-12 h-8" />
                            <img src="https://pay2s.vn/wp-content/uploads/2024/11/momo_icon_square_pinkbg_RGB.png" alt="MoMo" className="w-12 h-8" />
                            <img src="https://brandlogos.net/wp-content/uploads/2022/05/zalopay-logo_brandlogos.net_fjcup-768x768.png" alt="ZaloPay" className="w-12 h-8" />
                            <img src="https://cdn.brandfetch.io/idV02t6WJs/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="VNPay" className="w-12 h-8" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold mt-2">Vận chuyển</h3>
                        <div className="flex flex-wrap gap-2">
                            <img src="https://jtexpress.vn/themes/jtexpress/assets/images/logo.png" alt="J&T" className="w-12 h-8" />
                            <img src="https://giaohangtietkiem.vn/assets/logo.svg" alt="GHTK" className="w-12 h-8" />
                        </div>
                    </div>
                </div>

                {/* Cột 4: Thông tin liên hệ */}
                <div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">Liên hệ</h3>
                        <p className="text-gray-400">📍 Địa chỉ: 123 Nguyễn Văn A, TP.HCM</p>
                        <p className="text-gray-400">📞 Hotline: 0123 456 789</p>
                        <p className="text-gray-400">📧 Email: support@shopqt.com</p>
                    </div>
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-blue-500 transition">
                            <FaFacebookF className="w-5 h-5 text-gray-600 hover:text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-red-500 transition">
                            <FaYoutube className="w-5 h-5 text-gray-600 hover:text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-blue-400 transition">
                            <FaTwitter className="w-5 h-5 text-gray-600 hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bản quyền */}
            <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} ShopQT. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
