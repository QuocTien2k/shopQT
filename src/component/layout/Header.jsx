import { CloseOutlined, HomeOutlined, MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Search from "../Search";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import ModalUpdateInfo from "../Modal/ModalUpdateInfo";
import { DataContext } from "../Context/DataContext";
import { Tooltip } from "antd";
import { formatCurrency } from "../../utils/helpers";

const Header = () => {

    const { isModalOpen, handleOpenModal, handleCloseModal,
        isAuthenticated, setIsAuthenticated, user, setUser, cart, removeFromCart } = useContext(DataContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        setIsMobileMenuOpen((prev) => !prev);
    };

    //console.log("📌 Giỏ hàng trong Header:", cart);
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        Navigate("/");
    };

    //handle save
    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    //handle menu navbar
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".mobile-menu") && !event.target.closest(".menu-button")) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setIsMobileMenuOpen(false);
        };

        document.addEventListener("click", handleOutsideClick);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="h-[70px] md:h-[88px] flex items-center justify-between px-3 gap-1 md:px-7 shadow-md header-bg">
            {/* Logo */}
            <div className="w-26 md:w-32 font-extrabold text-3xl md:text-4xl tracking-wide">
                <Link to="/" className="text-gray-900 border-none outline-none">
                    <span className="font-[Italiana] italic font-light">Shop</span>
                    <span className="font-[Italiana] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">QT</span>
                </Link>
            </div>

            {/* Header Content on PC */}
            <div className="hidden md:flex items-center gap-3 md:gap-5 w-full justify-around">
                {/* Search Bar */}
                <div className="max-w-full md:max-w-[880px] flex-1 h-[40px]">
                    <Search />
                </div>

                {/* Navbar */}
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <Link to="/" className="flex items-center gap-1 text-gray-700 font-medium">
                        <HomeOutlined /> Trang chủ
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4 lg:space-x-6">
                            {/* Giỏ hàng */}
                            <div
                                className="relative group"
                            >
                                <div className="cursor-pointer" onClick={() => navigate('/cart')}>
                                    <ShoppingCartOutlined className="text-2xl text-gray-700" />
                                    {cart.length > 0 ? (
                                        <span className="absolute -top-[8px] -right-[10px] bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                            {cart.length}
                                        </span>
                                    ) : (
                                        <span className="absolute -top-[8px] -right-[10px] bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                            0
                                        </span>
                                    )}
                                </div>
                                {/* Hiển thị giỏ hàng khi hover */}
                                {cart.length > 0 && (
                                    <div className="dropdown-cart w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto">
                                        <div className="max-h-60 overflow-y-auto">
                                            {cart.map((item) => (
                                                <div key={item.id} className="flex items-center gap-2 border-b py-2">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold">{item.name}</p>
                                                        <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                                                    </div>
                                                    {/* Icon xóa */}
                                                    <CloseOutlined
                                                        className="text-red-500 hover:text-red-700 cursor-pointer border border-gray-300 rounded-full p-1"
                                                        onClick={() => removeFromCart(item.id)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <Button
                                                onClick={() => navigate("/cart")}
                                                label="Xác nhận mua"
                                                variant="primary"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Dropdown */}
                            <div
                                className="relative z-50 bridge"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <span className="font-semibold cursor-pointer inline-block max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                                    Xin chào, {user.firstname}
                                </span>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <div className="flex items-center gap-3 border-b pb-3">
                                            <img
                                                src={user.image || "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"}
                                                alt="User Avatar"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h2 title={user.fullname} className="text-lg font-semibold inline-block max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {user.fullname}
                                                </h2>
                                                <p className="text-sm text-gray-500">{user.phone}</p>
                                                <p className="text-sm text-gray-500 inline-block max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex flex-col gap-2 mt-3 items-center">
                                            <Button onClick={handleOpenModal} label="Cập nhật" variant="primary" />
                                            <ModalUpdateInfo open={isModalOpen} onClose={handleCloseModal} />
                                            <Button onClick={handleLogout} label="Đăng xuất" variant="primary" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
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

            {/* Search on mobile-tablet */}
            <div className="w-full sm:w-[180px] md:w-[880px] flex-1 h-[32px] md:h-[40px] md:hidden">
                <Search />
            </div>

            {/* Mobile Menu Button */}
            <button className="block md:hidden text-2xl p-2 focus:outline-none menu-button" onClick={toggleMenu}>
                {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>

            {/* Mobile Menu */}
            <div className={`z-30 absolute top-[4.6rem] right-2 w-[200px] bg-white shadow-lg rounded-lg p-3 transition-all duration-300 md:hidden
            ${isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                <nav className="flex flex-col gap-4 text-lg font-medium text-[13px]">
                    <Link to="/" className="text-gray-700" onClick={toggleMenu}>Trang chủ</Link>

                    {!isAuthenticated ? (
                        <>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Đăng ký</Link>
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Đăng nhập</Link>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/cart")}>
                                <ShoppingCartOutlined className="text-[18px] text-gray-700" />
                                <p className="flex items-center gap-2 m-0">
                                    Giỏ hàng
                                    <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {cart.length}
                                    </span>
                                </p>
                            </div>
                            <span className="text-gray-700">Xin chào, {user.firstname}</span>
                            <Button onClick={handleOpenModal} label="Cập nhật" variant="primary" customStyle={{ paddingTop: "4px", paddingBottom: "4px" }} />
                            <Button onClick={handleLogout} label="Đăng xuất" variant="primary" customStyle={{ paddingTop: "4px", paddingBottom: "4px" }} />
                        </>
                    )}
                </nav>
            </div>

        </header>
    );
};

export default Header;
