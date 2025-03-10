import React, { createContext, useState } from 'react'

// Tạo context
export const DataContext = createContext();
const ContextProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // State cho Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Số sản phẩm trên mỗi trang

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
                currentPage, setCurrentPage, itemsPerPage
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextProvider