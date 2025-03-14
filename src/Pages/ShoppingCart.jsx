import { useContext } from "react";
import { DataContext } from "../component/Context/DataContext"
import { Image, Tooltip } from "antd";
import { formatCurrency } from "../utils/helpers"
import CartCardMobile from "./CartCardMobile";
import Button from "../component/Button";

const ShoppingCart = () => {
    const { cart, removeFromCart, updateCartItemColor, updateCartQuantity, getColorCode } = useContext(DataContext);

    return (
        cart.length === 0 ? (
            <div className="bg-white text-lg">
                <p>Giỏ hàng của bạn đang trống.</p>
            </div>
        ) : (
            <div className="background-white container mt-3 p-4 rounded-lg">
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
                                            <button onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}>-</button>
                                            <span className="mx-2">{item.cartQuantity}</span>
                                            <button onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}>+</button>
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">{formatCurrency(item.price * item.cartQuantity)}</td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        <Button
                                            label="Xóa"
                                            variant="normal"
                                            onClick={() => removeFromCart(item.id)}
                                            customStyle={{ background: "rgb(239, 68, 68)", color: "white" }}
                                        />
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
                    <div className="flex justify-center mt-2">
                        <Button label="Thanh toán" variant="primary" />
                    </div>
                </div>
                {/* Card cho màn hình < 768px */}
                <CartCardMobile />
            </div>
        )
    )
};

export default ShoppingCart;
