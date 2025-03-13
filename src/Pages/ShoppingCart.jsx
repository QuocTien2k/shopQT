import { useContext } from "react";
import { Button, Image, InputNumber } from "antd";
import { DataContext } from "../component/Context/DataContext";
import { formatCurrency } from "../utils/helpers";

const ShoppingCart = () => {
    const { cart, removeFromCart, updateCartItemColor, getColorCode, updateCartItemQuantity } = useContext(DataContext);

    return (
        <div className="shopping-cart bg-white">
            <h2>Giỏ hàng của bạn</h2>

            {cart.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => {
                        const colors = Array.isArray(item.availableColors) ? item.availableColors : [];
                        console.log("🎨 Màu đã chọn của sản phẩm:", item.name, "| color:", item.color);
                        console.log("🎨 Danh sách availableColors:", item.availableColors);

                        return (
                            <div key={item.id} className="cart-item">
                                {/* Hình ảnh */}
                                <Image src={item.image} alt={item.name} width={80} />

                                {/* Thông tin sản phẩm */}
                                <div className="cart-info">
                                    <h3>{item.name}</h3>
                                    <p>Giá: {formatCurrency(item.price)}</p>
                                    <p>Giảm giá: {item.discount}%</p>

                                    {/* Màu sắc */}
                                    <div className="flex gap-2">
                                        <span>Màu: </span>
                                        {colors.map((color) => {
                                            console.log("🎨 Mã màu cho", color, "là:", getColorCode(color));
                                            return (
                                                <button
                                                    key={color}
                                                    className={`w-5 h-5 rounded-full border-2 ${item.color === color ? "shadow-lg shadow-gray-800 scale-110" : ""}`}
                                                    style={{ backgroundColor: getColorCode(color) }}
                                                    onClick={() => updateCartItemColor(item.id, color)}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Chọn số lượng */}
                                    <div className="mt-2 flex items-center gap-2">
                                        <span>Số lượng:</span>
                                        <InputNumber
                                            min={1}
                                            max={item.quantity} // Giới hạn số lượng theo kho
                                            value={item.cartQuantity} // Giá trị hiện tại
                                            onChange={(value) => updateCartItemQuantity(item.id, value)}
                                        />
                                    </div>
                                </div>

                                {/* Nút xóa */}
                                <Button danger onClick={() => removeFromCart(item.id)}>Xóa</Button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
