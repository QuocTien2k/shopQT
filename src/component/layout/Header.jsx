import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import Search from "../Search";
import Button from "../Button";
import { useContext, useEffect } from "react";
import ModalUpdateInfo from "../Modal/ModalUpdateInfo";
import { DataContext } from "../Context/DataContext";
import { Tooltip } from "antd";

const Header = () => {

    const { isModalOpen, handleOpenModal, handleCloseModal, isAuthenticated, setIsAuthenticated, user, setUser } = useContext(DataContext);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        Navigate("/");
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <header className="h-[88px] flex gap-[50px] justify-between items-center header-bg shadow-md px-7 py-3 ml-auto mr-auto">
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
                            <div className="group relative">
                                {/* user name*/}
                                <Tooltip title={user.firstname}>
                                    <span className="font-semibold cursor-pointer inline-block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                                        Xin chào, {user.firstname}
                                    </span>
                                </Tooltip>

                                {/* dropdown */}
                                <div className="dropdown-menu">
                                    {/* User Info */}
                                    <div className="flex items-center gap-3 border-b pb-3">
                                        <img src={user.image} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <Tooltip title={user.firstname}>
                                                <h2 className="text-lg font-semibold inline-block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {user.firstname}
                                                </h2>
                                            </Tooltip>
                                            <p className="text-sm text-gray-500">{user.phone}</p>

                                            <Tooltip title={user.email}>
                                                <p className="text-sm text-gray-500 inline-block max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {user.email}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col gap-2 mt-3 items-center">
                                        <Button onClick={handleOpenModal} label="Cập nhật" variant="primary" />
                                        <ModalUpdateInfo open={isModalOpen} onClose={handleCloseModal} />
                                        <Button onClick={handleLogout} label="Đăng xuất" variant="primary" />
                                    </div>
                                </div>
                            </div>
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
