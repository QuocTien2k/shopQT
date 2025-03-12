import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import Card from "./Card/Card";
import NotProduct from "./Filter/NotProduct";
import { DataContext } from "./Context/DataContext";
import { Pagination } from "antd";

const ListProducts = ({ filteredBrands, filteredPrice, filterCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // trạng thái loading khi đang call api
    const { currentPage, setCurrentPage, itemsPerPage } = useContext(DataContext);

    useEffect(() => {
        //console.log("ListProducts nhận props:", { filteredBrands, filteredPrice, filterCategory });
    }, [filteredBrands, filteredPrice, filterCategory]);

    // call api
    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                setProducts(response.data);
                //setProducts(response.data.slice(10, 20)); // Hiển thị 10 sản phẩm đầu tiên
            })
            .catch((error) => console.error("Lỗi khi fetch sản phẩm:", error))
            .finally(() => setLoading(false)); // Kết thúc loading
    }, []);


    //lọc sản phẩm theo thương hiệu, giá, danh mục
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            //Nếu có giá trị thì lọc
            (!filteredBrands.length || filteredBrands.includes(product.brand)) &&
            (!filteredPrice?.min || (product.price >= filteredPrice.min && product.price <= filteredPrice.max)) &&
            (!filterCategory.length || filterCategory.includes(product.category))
        );
    }, [products, filteredBrands, filteredPrice, filterCategory]);


    //Xác định danh sách sản phẩm theo trang
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {loading ? (
                    <div className="col-span-full text-center">Đang tải sản phẩm...</div>
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div key={product.id} className="p-2">
                            <Card
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                discount={product.discount}
                                rating={product.rating}
                                quantity={product.quantity}
                                onBuy={() => console.log("Mua", product.name)}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">
                        <NotProduct />
                    </div>
                )}

                {/* Pagination */}
                <div className="col-span-full mt-4 flex justify-center">
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={filteredProducts.length}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};
export default ListProducts;
