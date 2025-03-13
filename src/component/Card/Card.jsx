import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";


const Card = ({ id, name, image, price, discount, rating, quantity, color }) => {
    const navigate = useNavigate();

    //xử lý Click mua hàng
    const { addToCart } = useContext(DataContext);
    const handleAddToCartOnCard = () => {
        if (!color || color.length === 0) return; // Đảm bảo có màu trước khi thêm
        addToCart({
            id,
            name,
            image,
            price,
            discount,
            rating,
            quantity,
            color, // Tất cả màu của sản phẩm
        }, color[0]); // Mặc định chọn màu đầu tiên
    };

    const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);

    return (
        <div className="w-full h-[345px] box-shadow border rounded-lg p-3 bg-white flex flex-col gap-1 overflow-hidden">
            {/* Hình ảnh */}
            <div className="w-full h-[130px] flex justify-center">
                <img src={image} alt={name} className="w-full h-full object-cover rounded-md" />
            </div>

            {/* Tên sản phẩm */}
            <p className="mt-4 mb-0 text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">
                {name}
            </p>

            {/* Rating */}
            <div className="flex items-center my-1">
                {[...Array(5)].map((_, i) =>
                    i < Math.round(rating) ? (
                        <AiFillStar key={i} className="text-yellow-400" />
                    ) : (
                        <AiOutlineStar key={i} className="text-gray-300" />
                    )
                )}
            </div>

            {/* Giá và discount */}
            <div className="flex items-center justify-between text-[12px] md:text-[14px] sm:text-[8px]">
                <p className="text-red-500 font-semibold">{formattedPrice}</p>
                {discount > 0 && (
                    <span className="text-gray-500 text-xs">
                        <strong>-</strong> {discount}% OFF
                    </span>
                )}
            </div>

            {/* Nút bấm */}
            <div className="mt-2 flex justify-center gap-2 text-[11px]">
                <Button label="Mua ngay" variant="primary" onClick={handleAddToCartOnCard} />
                <Button
                    label="Chi tiết"
                    variant="normal"
                    customStyle={{ background: "#28a745", color: "white" }}
                    onClick={() => navigate(`/product/${id}`)} />
            </div>

            {/* Số lượng */}
            <div className="border-t mt-2 pt-2 text-gray-500 text-[12.5px]">
                Số lượng còn lại: {quantity}
            </div>
        </div>
    );
};

export default Card;
