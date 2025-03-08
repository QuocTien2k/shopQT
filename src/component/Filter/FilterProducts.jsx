import React from 'react'
import FilterBrand from './FilterBrand'
import FilterPrice from './FilterPrice';

const FilterProducts = ({ onFilterChange, onFilterPrice }) => {

    // Nhận dữ liệu từ FilterBrand và gửi lên ListProducts
    const handleBrandFilterChange = (brands) => {
        //console.log(brands);
        onFilterChange(brands); // Gửi danh sách brand lên ListProducts
    };

    const handlePriceChange = (priceRange) => {
        console.log(priceRange);
        onFilterPrice(priceRange); // Gửi lên ListProduct
    }
    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>

            {/* Lọc theo thương hiệu */}
            <FilterBrand onFilterChange={handleBrandFilterChange} />

            {/* Lọc theo giá */}
            <FilterPrice onPriceChange={handlePriceChange} />
        </div>
    )
}

export default FilterProducts