import { useContext } from "react";
import { DataContext } from "../component/Context/DataContext"
import { Image, Button, Tooltip } from "antd";
import { formatCurrency } from "../utils/helpers"

const ShoppingCart = () => {
    const { cart, removeFromCart, updateCartItemColor, updateCartQuantity, getColorCode } = useContext(DataContext);

    return (
        cart.length === 0 ? (
            <div className="bg-white text-lg">
                <p>Giỏ hàng của bạn đang trống.</p>
            </div>
        ) : (
            <div className="bg-white">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">

                            <th className="border border-gray-300 px-2 py-2 w-20">Hình ảnh</th>
                            <th className="border border-gray-300 px-2 py-2 w-1/4">
                                Tên sản phẩm
                            </th>
                            <th className="border border-gray-300 px-2 py-2 w-20">Màu sắc</th>
                            <th className="border border-gray-300 px-2 py-2 w-24">Giá</th>
                            <th className="border border-gray-300 px-2 py-2 w-20">Số lượng</th>
                            <th className="border border-gray-300 px-2 py-2 w-24">Thành tiền</th>
                            <th className="border border-gray-300 px-2 py-2 w-12">Xóa</th>
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
                                    <Button danger onClick={() => removeFromCart(item.id)}>X</Button>
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
            </div>
        )
    )
};

export default ShoppingCart;
