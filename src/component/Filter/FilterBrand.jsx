import { useEffect, useState } from "react";
import axios from "axios";

const FilterBrand = ({ onFilterChange }) => {
    const [brands, setBrands] = useState([]); // Lưu danh sách brand
    const [selectedBrands, setSelectedBrands] = useState([]); // Lưu brand đã chọn

    // Gọi API lấy danh sách sản phẩm
    useEffect(() => {
        axios.get("http://localhost:5000/products") // Fake API
            .then((response) => {
                const allProducts = response.data;
                const brandList = allProducts.map((product) => product.brand);
                const uniqueBrands = [...new Set(brandList)]; // Lọc brand trùng lặp
                setBrands(uniqueBrands);
            })
            .catch((error) => console.error("Lỗi khi lấy brands:", error));
    }, []);

    // Hàm xử lý khi chọn brand
    const handleBrandChange = (brand) => {
        let updatedBrands = [...selectedBrands];

        if (updatedBrands.includes(brand)) {
            updatedBrands = updatedBrands.filter((b) => b !== brand); // Bỏ chọn
        } else {
            updatedBrands.push(brand); // Chọn thêm
        }

        setSelectedBrands(updatedBrands);
        onFilterChange(updatedBrands); // Gửi danh sách brand đã chọn lên component cha
    };

    return (
        <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Thương hiệu</h3>
            {brands.map((brand) => (
                <div key={brand} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                    />
                    <label htmlFor={brand} className="cursor-pointer">{brand}</label>
                </div>
            ))}
        </div>
    );
};

export default FilterBrand;
