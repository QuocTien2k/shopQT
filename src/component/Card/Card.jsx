import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button from "../Button";


const Card = ({ name, image, price, discount, rating, quantity, onBuy, onDetail }) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);

    return (
        <div className="w-[180px] h-[345px] box-shadow border rounded-lg p-3 bg-white flex flex-col gap-1 overflow-hidden">
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
            <div className="flex items-center justify-between">
                <p className="text-red-500 font-semibold">{formattedPrice}</p>
                <span className="text-gray-500 text-xs">{discount}% OFF</span>
            </div>

            {/* Nút bấm */}
            <div className="mt-2 flex justify-center gap-2 text-[11px]">
                <Button label="Mua ngay" variant="primary" onClick={onBuy} />
                <Button label="Xem chi tiết" variant="normal" style={{ background: "green" }} onClick={onDetail} />
            </div>

            {/* Số lượng */}
            <div className="border-t mt-2 pt-2 text-gray-500 text-[12.5px]">
                Số lượng còn lại: {quantity}
            </div>
        </div>
    );
};

export default Card;
