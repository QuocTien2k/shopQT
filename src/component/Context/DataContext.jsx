import React, { createContext, useEffect, useState } from 'react'

// Tạo context
export const DataContext = createContext();
const ContextProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // State cho Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Số sản phẩm trên mỗi trang

    //State on Mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth < 820); // Xác định màn hình nhỏ
    // Theo dõi thay đổi kích thước màn hình
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Hàm đăng nhập
    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    // Hàm đăng xuất
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    return (
        <DataContext.Provider
            value={{
                isModalOpen, setIsModalOpen, handleOpenModal, setIsAuthenticated,
                handleCloseModal, isAuthenticated, login, logout, user, setUser,
                currentPage, setCurrentPage, itemsPerPage, isMobile
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextProvider