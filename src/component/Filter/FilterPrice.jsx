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
        setSelectedPrice(`${min}-${max}`);
        onPriceChange({ min, max }); // Gửi dữ liệu lên FilterProducts
    };

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Giá</h3>
            <div className="flex flex-col space-y-2">
                {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="price"
                            value={selectedPrice}
                            onChange={() => handleChange(range.min, range.max)}
                            className="accent-blue-500"
                        />
                        <span>{range.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterPrice;
