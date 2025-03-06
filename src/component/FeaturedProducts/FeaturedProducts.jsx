import { useEffect, useState } from "react";
import { Carousel, Card, Rate, Spin } from "antd";
import axios from "axios";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/products");
                const filtered = data.filter((p) => p.rating >= 4.0); // Lọc sản phẩm rating >= 4.0
                setProducts(filtered);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">🔥 Sản phẩm nổi bật</h2>
            <Carousel autoplay autoplaySpeed={3000} dots>
                {products.map((product) => (
                    <div key={product.id} className="p-4">
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={product.image} className="h-60 object-cover" />}
                        >
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.price.toLocaleString()}đ</p>
                            <Rate allowHalf disabled defaultValue={product.rating} />
                        </Card>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default FeaturedProducts;
