import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "../Clock/Clock";
//import { FaFire } from "react-icons/fa";

const FeaturedProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
    }, []);

    // Lọc sản phẩm có rating > 4.0 và lấy tối đa 16 sản phẩm
    const featuredProducts = products.filter(p => p.rating > 4.0).slice(0, 15);

    // Cấu hình cho react-slick
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Hiển thị 4 card mỗi slide
        slidesToScroll: 5, // Cuộn 4 sản phẩm mỗi lần
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
    };

    return (
        <div className="background-white container rounded-t pt-4">
            <div className="mt-3 flex items-center justify-between">
                <h2 className="mb-3 font-bold text-[16px] flex items-center gap-1">
                    Sản phẩm nổi bật
                    <img src="https://media1.tenor.com/m/bH5qXUAuk4kAAAAd/fire.gif" alt="Fire" className="w-6 h-6 animate-pulse" />
                </h2>
                <Clock />
            </div>


            <div className="w-full max-w-[1060px] mx-auto mt-4 bg-slide">
                <Slider {...settings}>
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="p-2">
                            <Card
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                discount={product.discount}
                                rating={product.rating}
                                quantity={product.quantity}
                                onBuy={() => console.log("Mua", product.name)}
                                onDetail={() => console.log("Chi tiết", product.name)}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default FeaturedProduct;


{/* <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 mt-6">
    {products.map((product) => (
        <Card
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            discount={product.discount}
            rating={product.rating}
            quantity={product.quantity}
            onBuy={() => console.log("Mua", product.name)}
            onDetail={() => console.log("Chi tiết", product.name)}
        />
    ))}
</div> */}
