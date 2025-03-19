import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from 'antd';

const Search = () => {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch danh sách sản phẩm từ JSON Server
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            }
        };

        fetchProducts();
    }, []);

    //mount search = ""
    useEffect(() => {
        if (query.trim() === "") {
            setFilteredResults([]);
            setLoading(false);
            return;
        }

        setLoading(true); //mở loading khi nhập

        // Giả lập độ trễ tìm kiếm (300ms)
        const timer = setTimeout(() => {
            //lọc theo name, brand, desc
            const results = products.filter((product) =>
                [product.name, product.brand, product.desc]
                    .some(field => field.toLowerCase().includes(query.toLowerCase()))
            );

            setFilteredResults(results.slice(0, 8)); // Giới hạn kết quả hiển thị
            setLoading(false); // Tắt loading sau khi lọc xong
        }, 500); // 500ms để thấy loading

        return () => clearTimeout(timer); // Xóa timer nếu user nhập liên tục
    }, [query, products]);

    const handleSearch = () => {
        if (filteredResults.length > 0) {
            navigate(`/product/${filteredResults[0].id}`);
        }
    };

    const handleSelect = (id) => {
        navigate(`/product/${id}`);
        setQuery(""); // Xóa input sau khi chọn
        setFilteredResults([]);
    };

    return (
        <div style={{ position: "relative" }}>
            <Input.Search
                placeholder="Tìm kiếm sản phẩm..."
                enterButton
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSearch={handleSearch}
                loading={loading}
            />

            {filteredResults.length > 0 && (
                <div style={{
                    position: "absolute",
                    top: "140%",
                    left: 0,
                    width: "100%",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    zIndex: 1000
                }}>
                    {filteredResults.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleSelect(product.id)}
                            style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                borderBottom: "1px solid #eee"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            <img src={product.image} alt={product.name} style={{ width: 40, height: 40, marginRight: 10 }} />
                            <span>{product.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
