import { message } from 'antd';
import React, { createContext, useEffect, useState } from 'react'

// Tạo context
export const DataContext = createContext();
const ContextProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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
    const addToCart = (product, selectedColor = "") => {
        const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user

        if (!user) {
            return message.warning("Bạn cần đăng nhập để mua hàng!");
        }

        // Kiểm tra dữ liệu trước khi xử lý
        //console.log("🎨 product.availableColors ban đầu:", product.availableColors, "| Kiểu dữ liệu:", typeof product.availableColors);
        if (!Array.isArray(product.availableColors)) {
            console.warn("⚠️ product.availableColors không phải mảng! Kiểm tra dữ liệu.");
        }

        setCart((prevCart) => {
            //console.log("🛒 Giỏ hàng trước khi thêm:", prevCart);
            //console.log("product.availableColors khi thêm vào giỏ hàng:", product.availableColors);

            const isExist = prevCart.find((item) => item.id === product.id && item.color === selectedColor);

            if (isExist) {
                message.info("Sản phẩm này đã có trong giỏ hàng!");
                return prevCart;
            }

            // Fix: Dùng `availableColors` thay vì `color`
            const newCartItem = {
                ...product,
                color: selectedColor || product.availableColors[0], // Lấy màu đầu tiên nếu chưa có
                availableColors: product.availableColors, // Lưu danh sách tất cả màu
                cartQuantity: 1, // Thêm số lượng mặc định khi thêm vào giỏ hàng
            };
            //console.log("color đã chọn của sản phẩm mới trong giỏ hàng:", newCartItem.color);
            //console.log("availableColors của sản phẩm mới trong giỏ hàng:", newCartItem.availableColors);

            const newCart = [...prevCart, newCartItem];
            message.success("Đã thêm vào giỏ hàng!");

            return newCart; //set cart
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
    const updateCartItemColor = (id, newColor) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, color: newColor } : item
            )
        );
    };
    const updateCartQuantity = (productId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, cartQuantity: newQuantity } : item
            )
        );
    };

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
            Orange: "#FFA500", // 🟠 Thêm màu cam
            White: "#FFFFFF", // ⚪ Thêm màu trắng
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
                isModalOpen, setIsModalOpen, isOpen, setIsOpen, handleOpenModal, setIsAuthenticated,
                handleCloseModal, isAuthenticated, user, setUser, addToCart, cart, updateCartItemColor,
                updateCartQuantity, removeFromCart, currentPage, setCurrentPage, itemsPerPage, isMobile,
                getColorCode
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextProvider