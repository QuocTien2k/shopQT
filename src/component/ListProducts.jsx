import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card/Card";
;

const ListProducts = ({ filteredBrands }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                setProducts(response.data.slice(0, 10)); // Hiển thị 10 sản phẩm đầu tiên
            })
            .catch((error) => console.error("Lỗi khi fetch sản phẩm:", error));
    }, []);

    //lọc sản phẩm theo thương hiệu
    const filteredProducts = filteredBrands.length > 0
        ? products.filter((product) => filteredBrands.includes(product.brand))
        : products;

    return (
        <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="p-2">
                        <Card
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            discount={product.discount}
                            rating={product.rating}
                            quantity={product.quantity}
                            onBuy={() => console.log("Mua", product.name)}
                            onDetail={() => console.log("Chi tiết", product.name)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProducts;
