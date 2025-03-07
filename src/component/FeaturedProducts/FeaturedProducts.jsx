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
        axios.get("http://192.168.100.11:5000/products")
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
        slidesToShow: 6, // Hiển thị 4 card mỗi slide
        slidesToScroll: 6, // Cuộn 4 sản phẩm mỗi lần
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // Tablet
                settings: {
                    slidesToShow: 4, // Hiển thị 3 card
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 768, // Mobile lớn (iPhone Pro, Pixel, etc.)
                settings: {
                    slidesToShow: 2, // Hiển thị 2 card
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480, // Mobile nhỏ
                settings: {
                    slidesToShow: 1, // Hiển thị 1 card
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px"
                }
            }
        ]
    };

    return (
        <div className="background-white container rounded-t pt-4">
            <div className="mt-3 flex flex-col items-center md:flex-row md:items-center md:justify-between">
                <h2 className="mb-3 font-bold text-[16px] flex items-center gap-1 sm:text-[14px]">
                    Sản phẩm nổi bật
                    <img src="https://media1.tenor.com/m/bH5qXUAuk4kAAAAd/fire.gif" alt="Fire" className="w-6 h-6 sm:w-4 sm:h-4 animate-pulse" />
                </h2>
                <Clock />
            </div>

            <div className="mx-auto bg-slide mt-4 overflow-hidden p-6">
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
