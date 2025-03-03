import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Search from "../Search";
import Button from "../Button";

const Header = () => {
    const isAuthenticated = false; // Tạm thời chưa có logic đăng nhập

    return (
        <header className="h-[88px] flex gap-[50px] justify-between items-center bg-white shadow-md px-7 py-3 ml-auto mr-auto">
            {/* Logo */}
            <div className="w-32 font-extrabold text-4xl tracking-wide ">
                <Link to="/" className="text-gray-900 border-none outline-none">
                    <span className="font-[Italiana] italic font-light">Shop</span>
                    <span className="font-[Italiana] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">QT</span>
                </Link>
            </div>

            <div className="w-full flex items-center gap-5 p-2 flex-1 justify-around text-[16px]">
                {/* Search Bar */}
                <div className="max-w-[880px] flex-1 h-[40px]">
                    <Search />
                </div>

                {/* Navbar */}
                <nav className="flex items-center space-x-6">
                    <Link to="/" className="flex items-center gap-1 text-gray-700 font-medium">
                        <HomeOutlined /> Trang chủ
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-6">
                            {/* Giỏ hàng */}
                            <Link to="/cart" className="relative">
                                <ShoppingCartOutlined className="text-2xl text-gray-700" />
                                <span className="absolute -top-[8px] -right-[10px] bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    1
                                </span>
                            </Link>
                            <span className="font-semibold">Xin chào, User</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/register">
                                <Button label="Đăng ký" variant="primary" />
                            </Link>
                            <Link to="/login">
                                <Button label="Đăng nhập" variant="primary" />
                            </Link>
                        </div>
                    )}

                </nav>
            </div>

        </header >
    );
};

export default Header;
