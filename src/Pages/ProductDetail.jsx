import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "../component/Button";
import { DataContext } from "../component/Context/DataContext";
import FeaturedProduct from "../component/FeaturedProducts/FeaturedProducts";
import Loading from "../component/Loading/Loading";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]); // Mặc định chọn màu đầu tiên
    const { getColorCode } = useContext(DataContext)
    const [loading, setLoading] = useState(true); // trạng thái loading khi đang call api

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setSelectedColor(res.data.color[0]);
                setSelectedImage(res.data.image);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy sản phẩm:", err);
            })
            .finally(() => {
                setLoading(false); // Đảm bảo luôn tắt loading
            });
    }, [id]);

    if (loading) return <Loading tip="Đang tải sản phẩm..." />; //Hiển thị loading

    if (!product) return <p className="text-center text-red-500">Sản phẩm không tồn tại!</p>; //Nếu lỗi AP

    return (
        <div className="p-6 bg-white">
            <div className="md:grid md:grid-cols-12 md:gap-4 flex flex-col gap-6">
                {/* Hình ảnh sản phẩm */}
                <div className="md:col-span-4 flex flex-col items-center">
                    {/* Ảnh chính */}
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-[350px] h-[350px] object-cover rounded-lg"
                    />

                    {/* Thumbnail */}
                    <div className="flex gap-2 mt-3">
                        {[product.image, product.image_sp_01, product.image_sp_02, product.image_sp_03]
                            .filter(img => img) // Loại bỏ ảnh bị thiếu
                            .map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    className={`w-16 h-16 object-cover cursor-pointer rounded-md border-2 transition
                        ${selectedImage === img ? "border-blue-500 shadow-md" : "border-transparent"}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                    </div>
                </div>

                {/* Đường kẻ */}
                <div className="md:col-span-1 flex justify-center my-4 md:my-0">
                    <div className="border border-gray-300 h-auto w-[1px] mx-2 hidden md:block"></div>
                    <div className="border border-gray-300 w-full h-[1px] my-2 block md:hidden"></div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="md:col-span-7">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 text-sm">⭐ {product.rating} / 5</p>
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
                                    className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? "shadow-md shadow-gray-500" : ""}`}
                                    style={{ backgroundColor: getColorCode(color) }}
                                    onClick={() => setSelectedColor(color)}
                                />
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
                    {/* Mô tả sản phẩm */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold">Mô tả sản phẩm</h2>
                        <p className="text-gray-600 text-sm">{product.desc}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <FeaturedProduct filterType="sameBrand" currentBrand={product.brand} title="tương tự" showClock={false} />
            </div>
        </div>
    );
};

export default ProductDetail;
