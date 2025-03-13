import { useContext } from "react";
import { Button, Image } from "antd";
import { DataContext } from "../component/Context/DataContext";
import { formatCurrency } from "../utils/helpers";

const ShoppingCart = () => {
    const { cart, removeFromCart, updateCartItemColor } = useContext(DataContext);

    return (
        <div className="shopping-cart bg-white">
            <h2>Giỏ hàng của bạn</h2>

            {cart.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            {/* Hình ảnh */}
                            <Image src={item.image} alt={item.name} width={80} />

                            {/* Thông tin sản phẩm */}
                            <div className="cart-info">
                                <h3>{item.name}</h3>
                                <p>Giá: {formatCurrency(item.price)}</p>
                                <p>Giảm giá: {item.discount}%</p>

                                {/* Màu sắc */}
                                <div className="color-options">
                                    <span>Màu: </span>
                                    {console.log("🖌️ availableColors của sản phẩm:", item.name, item.availableColors)}
                                    {(Array.isArray(item.availableColors) ? item.availableColors : []).map((color) => (
                                        <button
                                            key={color}
                                            className={`color-btn ${item.color === color ? "selected" : ""}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => updateCartItemColor(item.id, color)}
                                        />

                                    ))}
                                </div>
                            </div>

                            {/* Nút xóa */}
                            <Button danger onClick={() => removeFromCart(item.id)}>Xóa</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
