import React, { useState } from 'react'
import Banner from '../component/Banner/Banner';
import FeaturedProducts from '../component/FeaturedProducts/FeaturedProducts';
import FilterProducts from '../component/Filter/FilterProducts';
import ListProducts from '../component/ListProducts';

const HomePage = () => {
    const [filteredBrands, setFilteredBrands] = useState([]);
    //console.log("Đã nhận prop từ FilterProducts: ", filteredBrands);
    return (
        <>
            <Banner />
            <FeaturedProducts />
            <div className="grid grid-cols-12 gap-4 px-6 py-4 md:px-8 md:py-6">
                <div className="col-span-3">
                    <FilterProducts onFilterChange={setFilteredBrands} />
                </div>
                <div className="col-span-9">
                    <ListProducts filteredBrands={filteredBrands} />
                </div>
            </div>
        </>

    );
};

export default HomePage