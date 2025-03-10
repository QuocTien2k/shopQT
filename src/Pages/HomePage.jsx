import React, { useEffect, useState } from 'react'
import Banner from '../component/Banner/Banner';
import FeaturedProducts from '../component/FeaturedProducts/FeaturedProducts';
import FilterProducts from '../component/Filter/FilterProducts';
import ListProducts from '../component/ListProducts';

const HomePage = () => {
    const [filteredBrands, setFilteredBrands] = useState([]);
    //console.log("Đã nhận prop từ FilterProducts: ", filteredBrands);

    const [filteredPrice, setFilteredPrice] = useState([]);
    //console.log("Đã nhận prop từ FilterProducts: ", filteredPrice);

    const [filteredCategory, setFilteredCategory] = useState([]);
    //console.log("Đã nhận prop từ FilterCategory: ", filteredCategory);

    useEffect(() => {
        //console.log("HomePage nhận filteredPrice:", filteredPrice);
    }, [filteredPrice]);

    return (
        <>
            <Banner />
            <FeaturedProducts />
            <div className="grid grid-cols-12 gap-4 px-6 py-4 md:px-8 md:py-6">
                <div className="col-span-2">
                    <FilterProducts
                        onFilterChange={setFilteredBrands}
                        onFilterPrice={setFilteredPrice}
                        onCategoryChange={setFilteredCategory}
                    />
                </div>
                <div className="col-span-10">
                    {/*console.log("Truyền vào ListProducts:", { filteredBrands, filteredPrice, filteredCategory })*/}
                    <ListProducts
                        filteredBrands={filteredBrands}
                        filteredPrice={filteredPrice}
                        filterCategory={filteredCategory}
                    />
                </div>
            </div>
        </>

    );
};

export default HomePage