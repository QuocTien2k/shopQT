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

    //màu sắc
    const getColorCode = (color) => {
        const colorMap = {
            Blue: "#007BFF",
            "Navy blue": "#001F3F",
            "Steel blue": "#4682B4",
            "Blue Grey": "#7393B3",
            Black: "#000000",
            Purple: "#800080",
            Pink: "#FFC0CB",
            Green: "#008000",
            "Emerald Green": "#50C878",
            Silver: "#C0C0C0",
            "Silver Platinum": "#E5E4E2",
            "Silver Black": "#A9A9A9",
            Gray: "#808080",
            "Space Gray": "#6E6E6E",
            "Charcoal Gray": "#36454F",
            "Moonstone Gray": "#979AA0",
            "Titanium Gray": "#757575",
            Yellow: "#FFD700",
            "Copper Gold": "#B87333",
            Starlight: "#F5EFE6",
        };
        return colorMap[color] || "#D3D3D3"; // Mặc định là màu xám nhạt nếu không có trong danh sách
    };


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
                currentPage, setCurrentPage, itemsPerPage, isMobile, getColorCode
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextProvider