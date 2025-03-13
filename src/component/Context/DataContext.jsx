import { message } from 'antd';
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

    // State giỏ hàng
    const [cart, setCart] = useState([]);
    const addToCart = (product) => {
        const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user

        if (!user) {
            return message.warning("Bạn cần đăng nhập để mua hàng!");
        }

        setCart((prevCart) => {
            //console.log("📌 Giỏ hàng trước khi thêm:", prevCart);
            const isExist = prevCart.find((item) => item.id === product.id); //check trùng lặp
            if (isExist) {
                message.info("Sản phẩm đã có trong giỏ hàng!");
                return prevCart;
            }

            // Gán màu mặc định nếu sản phẩm chưa có màu
            const defaultColor = "Black"; // hoặc lấy từ danh sách có sẵn
            const productWithColor = { ...product, color: product.color || defaultColor };
            //console.log("✅ Sản phẩm thêm vào giỏ hàng:", productWithColor);

            const newCart = [...prevCart, productWithColor];
            //console.log("🛒 Giỏ hàng sau khi thêm:", newCart);

            return newCart;
        });
    };

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
            "Space Grey": "#6E6E6E",
            "Charcoal Grey": "#36454F",
            "Moonstone Grey": "#979AA0",
            "Titanium Grey": "#757575",
            Yellow: "#FFD700",
            "Copper Gold": "#B87333",
            Starlight: "#F5EFE6",
        };
        return colorMap[color] || "#D3D3D3"; // Mặc định là màu xám nhạt nếu không có trong danh sách
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
                handleCloseModal, isAuthenticated, user, setUser, addToCart, cart,
                currentPage, setCurrentPage, itemsPerPage, isMobile, getColorCode
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextProvider