import { useState } from "react";

const FilterPrice = ({ onPriceChange }) => {
    const [selectedPrice, setSelectedPrice] = useState("");

    const priceRanges = [
        { label: "1 - 3 triệu", min: 1000000, max: 3000000 },
        { label: "3 - 5 triệu", min: 3000000, max: 5000000 },
        { label: "5 - 8 triệu", min: 5000000, max: 8000000 },
        { label: "Trên 8 triệu", min: 8000001, max: Infinity },
    ];

    const handleChange = (min, max) => {
        const value = `${min}-${max}`;
        setSelectedPrice(value);
        onPriceChange({ min, max }); // Gửi dữ liệu lên FilterProducts
    };

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Giá</h3>
            <div className="flex flex-col space-y-2">
                {priceRanges.map((range, index) => {
                    const value = `${range.min}-${range.max}`;
                    return (
                        <label key={index} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                value={value}
                                checked={selectedPrice === value} // So sánh để xác định radio nào đang được chọn
                                onChange={() => handleChange(range.min, range.max)}
                                className="accent-blue-500"
                            />
                            <span>{range.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default FilterPrice;
