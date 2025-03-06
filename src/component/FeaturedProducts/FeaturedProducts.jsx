import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";


const FeaturedProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
    }, []);

    return (
        <div className="container mt-4 mx-auto">
            <h2>Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 mt-6">
                {products.slice(0, 9).map((product) => (
                    <Card
                        key={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        discount={product.discount}
                        rating={product.rating}
                        quantity={product.quantity}
                        onBuy={() => console.log("Mua", product.name)}
                        onDetail={() => console.log("Chi tiết", product.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProduct;
