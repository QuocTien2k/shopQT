import { useContext } from "react";
import { DataContext } from "../component/Context/DataContext"
import { formatCurrency } from "../utils/helpers"
import { CloseOutlined } from "@ant-design/icons";
import Button from "../component/Button"
const CartCardMobile = () => {
    const { cart, removeFromCart, updateCartItemColor, getColorCode, updateCartQuantity } = useContext(DataContext);

    return (

        <div className="md:hidden flex flex-col gap-4">
            {cart.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg shadow-md bg-white">
                    {/* Hình ảnh */}
                    <div className="flex justify-center items-center">
                        <img src={item.image} alt={item.name} className="w-20 h-28 object-cover rounded-lg" />
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="mt-2">
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <p className="text-gray-600">Giá: {formatCurrency(item.price)}</p>
                        {item.discount > 0 && <p className="text-red-500">Giảm giá: {item.discount}%</p>}
                    </div>

                    {/* Màu sắc */}
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm">Màu:</span>
                        {item.availableColors?.map((color) => (
                            <button
                                key={color}
                                className={`w-5 h-5 rounded-full border-2 ${item.color === color ? "shadow-lg shadow-gray-800 scale-110" : ""
                                    }`}
                                style={{ backgroundColor: getColorCode(color) }}
                                onClick={() => updateCartItemColor(item.id, color)}
                            />
                        ))}
                    </div>

                    {/* Chọn số lượng */}
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm">Số lượng:</span>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-2 py-1 border rounded-md"
                                onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                                disabled={item.cartQuantity <= 1}
                            >
                                -
                            </button>
                            <span className="w-6 text-center">{item.cartQuantity}</span>
                            <button
                                className="px-2 py-1 border rounded-md"
                                onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                                disabled={item.cartQuantity >= item.quantity}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Thành tiền */}
                    <p className="mt-2 font-semibold">Thành tiền: {formatCurrency(item.price * item.cartQuantity)}</p>

                    {/* Nút xóa */}
                    <div className="mt-2 mx-auto">
                        <Button
                            label="Xóa"
                            variant="normal"
                            onClick={() => removeFromCart(item.id)}
                            customStyle={{ background: "rgb(239, 68, 68)", color: "white" }}
                        />
                    </div>
                </div>
            ))}
            <div className="mt-3 px-4 py-2 text-center font-bold">
                <p>Tổng tiền: {formatCurrency(cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0))}</p>
            </div>
        </div>
    );
};

export default CartCardMobile;
