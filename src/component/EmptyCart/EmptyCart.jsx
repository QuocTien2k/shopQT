import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect } from "react";

import { DataContext } from "../Context/DataContext";
import Button from "../Button";

const EmptyCart = () => {
    const { isOpen, setIsOpen } = useContext(DataContext)
    const navigate = useNavigate()
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            setIsOpen(true);
        } else {
            setIsOpen(false); // Đảm bảo modal đóng nếu user đã có
        }
    }, []);
    return (
        <>
            {isOpen ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-semibold text-red-600">⚠ Bạn chưa đăng nhập!</h2>
                        <p className="mt-2">Vui lòng đăng nhập để mua hàng.</p>
                        <div className="flex justify-center mt-2">
                            <Button label="Đăng nhập" variant="primary" onClick={() => navigate("/login")} />

                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-screen flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
                    <FaShoppingCart className="text-gray-400 text-6xl mb-4" />
                    <p className="text-lg font-medium text-gray-600">Giỏ hàng của bạn đang trống.</p>
                    <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Quay lại mua hàng
                    </Link>
                </div>
            )}
        </>
    );
};

export default EmptyCart;
