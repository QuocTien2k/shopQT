import React, { useContext, useEffect, useState } from 'react'
import Banner from '../component/Banner/Banner';
import FeaturedProducts from '../component/FeaturedProducts/FeaturedProducts';
import FilterProducts from '../component/Filter/FilterProducts';
import FilterMobile from '../component/Filter/FilterMobile';
import ListProducts from '../component/ListProducts';
import { DataContext } from '../component/Context/DataContext';
import { message } from 'antd';

const HomePage = () => {
    //thông báo khi checkout thành công quay về HomePage
    useEffect(() => {
        const orderSuccess = localStorage.getItem("orderSuccess");
        if (orderSuccess) {
            message.success("🚀 Đặt hàng thành công! Cảm ơn bạn đã trải nghiệm Website", 2);
            localStorage.removeItem("orderSuccess"); // Xóa trạng thái sau khi hiển thị
        }
    }, []);
    const [filteredBrands, setFilteredBrands] = useState([]);
    //console.log("Đã nhận prop từ FilterProducts: ", filteredBrands);

    const [filteredPrice, setFilteredPrice] = useState([]);
    //console.log("Đã nhận prop từ FilterProducts: ", filteredPrice);

    const [filteredCategory, setFilteredCategory] = useState([]);
    //console.log("Đã nhận prop từ FilterCategory: ", filteredCategory);

    useEffect(() => {
        //console.log("HomePage nhận filteredPrice:", filteredPrice);
    }, [filteredPrice]);

    const { isMobile } = useContext(DataContext); // Lấy state từ DataContext

    return (
        <>
            <Banner />
            <FeaturedProducts filterType='featured' title='nổi bật' />
            {/* Filter and ListProduct */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 md:px-8 md:py-6">
                {/* Hiển thị bộ lọc trên màn hình lớn */}
                {!isMobile && (
                    <div className="col-span-2">
                        <FilterProducts
                            onFilterChange={setFilteredBrands}
                            onFilterPrice={setFilteredPrice}
                            onCategoryChange={setFilteredCategory}
                        />
                    </div>
                )}
                <div className="col-span-12 md:col-span-10">
                    {/*console.log("Truyền vào ListProducts:", { filteredBrands, filteredPrice, filteredCategory })*/}
                    {/* FilterMobile chỉ xuất hiện trên màn hình nhỏ */}
                    {isMobile && (
                        <div className="mb-4">
                            <FilterMobile
                                onFilterChange={setFilteredBrands}
                                onFilterPrice={setFilteredPrice}
                                onCategoryChange={setFilteredCategory}
                            />
                        </div>
                    )}
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