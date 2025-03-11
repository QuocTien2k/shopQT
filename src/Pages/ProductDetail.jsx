import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../component/Button";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(""); // Màu được chọn

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setSelectedColor(res.data.color[0]); // Mặc định chọn màu đầu tiên
            })
            .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
    }, [id]);

    if (!product) return <p>Đang tải...</p>;

    return (
        <div className="p-6 bg-white">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <img src={product.image} alt={product.name} className="w-[300px] h-[300px] object-cover" />
            <p className="text-gray-500">{product.desc}</p>
            <p className="text-red-500 text-lg font-semibold">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
            </p>

            {/* Chọn màu sắc */}
            <div className="mt-4">
                <p className="text-sm font-semibold">Màu sắc:</p>
                <div className="flex gap-2 mt-2">
                    {product.color.map((color, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 border rounded-md text-sm ${selectedColor === color ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => setSelectedColor(color)}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            {/* Nút bấm */}
            <div className="flex gap-4 mt-4">
                <Button label="Mua ngay" variant="primary" />
                <Button
                    label="Thêm vào giỏ hàng"
                    variant="normal"
                    customStyle={{ background: "#28a745", color: "white" }}
                    onClick={() => console.log(`Thêm vào giỏ hàng: ${product.name} - Màu: ${selectedColor}`)}
                />
            </div>
        </div>
    );
};

export default ProductDetail;
