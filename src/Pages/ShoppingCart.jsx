import { useContext, useEffect } from "react";
import { DataContext } from "../component/Context/DataContext"
import { Image, message, Modal, Tooltip } from "antd";
import { formatCurrency } from "../utils/helpers"
import CartCardMobile from "./CartCardMobile";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../component/EmptyCart/EmptyCart";

const ShoppingCart = () => {
    const { cart, removeFromCart, updateCartItemColor, updateCartQuantity, getColorCode } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            localStorage.removeItem("checkoutData"); // Xóa dữ liệu thanh toán    
        }
    }, []);

    //Xử lý nút thanh toán
    const handleCheckout = () => {
        if (cart.length === 0) return;

        Modal.confirm({
            title: "Xác nhận thanh toán",
            content: "Bạn có chắc chắn muốn thanh toán giỏ hàng không?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk() {
                const checkoutData = {
                    cart: cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        color: item.color,
                        price: item.price,
                        cartQuantity: item.cartQuantity,
                        totalPrice: item.price * item.cartQuantity
                    })),
                    totalAmount: cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0)
                };

                localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
                message.success("Thanh toán thành công!");

                setTimeout(() => {
                    navigate('/checkout');
                }, 1000)
            }
        });
    };

    return (
        cart.length === 0 ? (
            <EmptyCart />
        ) : (
            <div className="shopping-cart-bg container mt-3 p-8 rounded-lg shadow-gradient">
                {/*Table for Screen >= 768px */}
                <div className="hidden md:block">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">

                                <th className="border border-gray-300 px-2 py-2" style={{ width: "10%" }}>Hình ảnh</th>
                                <th className="border border-gray-300 px-2 py-2 w-1/4">
                                    Tên sản phẩm
                                </th>
                                <th className="border border-gray-300 px-2 py-2" style={{ width: "10%" }}>Màu sắc</th>
                                <th className="border border-gray-300 px-2 py-2" style={{ width: "15%" }}>Giá</th>
                                <th className="border border-gray-300 px-2 py-2">Số lượng</th>
                                <th className="border border-gray-300 px-2 py-2" style={{ width: "15%" }}>Thành tiền</th>
                                <th className="border border-gray-300 px-2 py-2" style={{ width: "10%" }}>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id} className="text-center">
                                    <td className="border border-gray-300 px-2 py-2">
                                        <Image src={item.image} alt={item.name} width={50} height={50} />
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2 max-w-56 truncate">
                                        <Tooltip title={item.name} placement="top">
                                            {item.name}
                                        </Tooltip>
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2 w-20">
                                        {item.availableColors.map((color) => (
                                            <button
                                                key={color}
                                                className={`w-5 h-5 rounded-full border-2 ${item.color === color ? "shadow-lg scale-110" : ""}`}
                                                style={{ backgroundColor: getColorCode(color) }}
                                                onClick={() => updateCartItemColor(item.id, color)}
                                            />
                                        ))}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">{formatCurrency(item.price)}</td>
                                    <td className="border border-gray-300 px-2 py-2 w-20">
                                        <div className="flex justify-center items-center">
                                            <button
                                                onClick={() => item.cartQuantity > 1 && updateCartQuantity(item.id, item.cartQuantity - 1)}
                                                disabled={item.cartQuantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.cartQuantity}</span>
                                            <button
                                                onClick={() => item.cartQuantity < item.quantity && updateCartQuantity(item.id, item.cartQuantity + 1)}
                                                disabled={item.cartQuantity >= item.quantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">{formatCurrency(item.price * item.cartQuantity)}</td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        <div className="flex justify-center items-center">
                                            <Button
                                                label="Xóa"
                                                variant="normal"
                                                onClick={() => removeFromCart(item.id)}
                                                customStyle={{ background: "rgb(239, 68, 68)", color: "white" }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {/* Tổng tiền */}
                            <tr>
                                <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center font-bold">
                                    Tổng tiền: {formatCurrency(cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Nút thanh toán */}
                    <div className="flex justify-end mt-2">
                        <Button
                            label="Thanh toán"
                            variant="primary"
                            onClick={() => {
                                if (cart.length > 0) {
                                    handleCheckout();
                                };
                            }}
                        />
                    </div>
                </div>
                {/* Card cho màn hình < 768px */}
                <CartCardMobile />
            </div>
        )
    )
};

export default ShoppingCart;
