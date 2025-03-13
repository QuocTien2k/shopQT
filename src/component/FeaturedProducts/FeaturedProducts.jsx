import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "../Clock/Clock";
//import { FaFire } from "react-icons/fa";
import Fire from "../../assets/fire.gif"
import Loading from "../Loading/Loading";

const FeaturedProduct = ({ filterType = "featured", currentBrand = "", title = "", showClock = true }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); //Quản lý loading tại đây

    // call api
    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then((res) => {
                setProducts(res.data)
                setLoading(false);  // ✅ Khi có dữ liệu, tắt loading
            })
            .catch((err) => {
                console.error("Lỗi khi lấy sản phẩm:", err)
                setLoading(false);  // ✅ Dù lỗi cũng phải tắt loading
            });
    }, []);

    let filteredProducts = [];

    if (filterType === "featured") {
        filteredProducts = products.filter(p => p.rating > 4.0).slice(5, 19);
    } else if (filterType === "sameBrand" && currentBrand) {
        filteredProducts = products.filter(p => p.brand === currentBrand && p.rating > 3.0);
    }

    // Cấu hình cho react-slick
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Hiển thị 5 card mỗi slide
        slidesToScroll: 4, // Cuộn 4 sản phẩm mỗi lần
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
                breakpoint: 820, // iPad Air (fix bóp layout)
                settings: {
                    slidesToShow: 3, // Hiển thị 3 card thay vì 5
                    slidesToScroll: 3,
                    centerMode: true,
                    centerPadding: "20px",
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
        <div className="background-white container rounded-md pt-4">
            <div className="mt-3 flex flex-col items-center md:flex-row md:items-center md:justify-between">
                <h2 className="mb-3 font-bold text-[16px] flex items-center gap-1 md:text-[24px]">
                    Sản phẩm {title}
                    <img src={Fire} alt="Fire" className="w-4 h-4 md:w-7 md:h-7 animate-pulse" />
                </h2>
                {/* Hiển thị clock */}
                {showClock && (<Clock />)}
            </div>

            <div className="mx-auto bg-slide mt-4 overflow-hidden p-6">
                {loading ? (
                    <div className="col-span-full">
                        <Loading tip="Đang tải sản phẩm..." />
                    </div>
                ) : (
                    <Slider {...settings}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="p-2">
                                <Card
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    discount={product.discount}
                                    rating={product.rating}
                                    quantity={product.quantity}
                                    color={product.color}
                                />
                            </div>
                        ))}
                    </Slider>
                )}
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
