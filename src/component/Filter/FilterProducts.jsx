import React from 'react'
import FilterBrand from './FilterBrand'

const FilterProducts = ({ onFilterChange }) => {

    // Nhận dữ liệu từ FilterBrand và gửi lên ListProducts
    const handleBrandFilterChange = (brands) => {
        //console.log(brands);
        onFilterChange(brands); // Gửi danh sách brand lên ListProducts
    };
    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>

            {/* Lọc theo thương hiệu */}
            <FilterBrand onFilterChange={handleBrandFilterChange} />

            {/* Lọc theo giá */}
            {/* {<FilterPrice />} */}
        </div>
    )
}

export default FilterProducts