import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FilterCategory = ({ onCategoryChange }) => {
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    //call api
    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                const allCategory = response.data; //lấy danh sách sản phẩm
                const categoryList = allCategory.map((product) => product.category);
                const uniqueCategory = [...new Set(categoryList)] // lọc danh mục trùng 
                setCategory(uniqueCategory);
            })
            .catch((error) => console.log("Lỗi khi lấy sản phẩm: ", error))
    }, [])

    //xử lý chọn danh mục
    const handleCategoryChange = (category) => {
        let updatedCategory = [...selectedCategory];

        if (updatedCategory.includes(category)) {
            updatedCategory = updatedCategory.filter((b) => b !== category); // Bỏ chọn
        } else {
            updatedCategory.push(category); // Chọn thêm
        }

        setSelectedCategory((prev) =>
            prev.includes(category) ? prev.filter((b) => b !== category) : [...prev, category]
        );

        onCategoryChange(updatedCategory); // Gửi danh sách brand đã chọn lên component cha
    }

    // Danh sách ánh xạ tên danh mục từ EN -> VI
    const categoryMap = {
        "Smartphone": "Điện thoại",
        "Tablet": "Máy tính bảng",
        "Laptop": "Laptop"
    };

    return (
        <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Danh mục</h3>
            {category.map((item) => (
                <div key={item} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id={item}
                        checked={selectedCategory.includes(item)}
                        onChange={() => handleCategoryChange(item)}
                    />
                    <label htmlFor={item} className="cursor-pointer">{categoryMap[item] || item}</label>
                </div>
            ))}
        </div>
    )
}

export default FilterCategory