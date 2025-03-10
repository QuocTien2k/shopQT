import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Card from "./Card/Card";
import NotProduct from "./Filter/NotProduct";

const ListProducts = ({ filteredBrands, filteredPrice }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // trạng thái loading khi đang call api

    useEffect(() => {
        console.log("ListProducts nhận props:", { filteredBrands, filteredPrice });
    }, [filteredBrands, filteredPrice]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                setProducts(response.data.slice(10, 20)); // Hiển thị 10 sản phẩm đầu tiên
            })
            .catch((error) => console.error("Lỗi khi fetch sản phẩm:", error))
            .finally(() => setLoading(false)); // Kết thúc loading
    }, []);


    //lọc sản phẩm theo thương hiệu
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesBrand = filteredBrands.length > 0 ? filteredBrands.includes(product.brand) : true;
            const matchesPrice = filteredPrice?.min !== undefined
                ? product.price >= filteredPrice.min && product.price <= filteredPrice.max
                : true;


            return matchesBrand && matchesPrice;
        });
    }, [products, filteredBrands, filteredPrice]);

    return (
        <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {loading ? (
                    <div className="col-span-full text-center">Đang tải sản phẩm...</div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
                    ))
                ) : (
                    <div className="col-span-full">
                        <NotProduct />
                    </div>
                )}
            </div>
        </div>
    );
};
export default ListProducts;
