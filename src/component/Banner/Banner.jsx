import { Carousel } from "antd";
import { Typewriter } from "react-simple-typewriter";
import { AiOutlineTruck } from "react-icons/ai";

const bannerImages = [
    "https://down-bs-vn.img.susercontent.com/vn-11134210-7ra0g-m6qp708w2usn65.webp",
    "https://cf.shopee.vn/file/vn-11134258-7ra0g-m6p891pt4vafba",
    "https://cf.shopee.vn/file/vn-11134258-7ra0g-m6p8n1vle7ug45",
];

const Banner = () => {
    return (
        <div className="mt-4 mb-4 rounded-sm max-h-[480px] sm:max-h-[340px] md:max-h-[410px] max-w-5xl mx-auto overflow-hidden">
            {/* Slideshow */}
            <Carousel autoplay effect="fade">
                {bannerImages.map((img, index) => (
                    <div key={index} className="flex justify-center ">
                        <img
                            src={img}
                            alt={`Banner ${index}`}
                            className="w-full h-[350px] object-contain "
                            style={{ backgroundSize: "100% 100%" }}
                        />
                    </div>
                ))}
            </Carousel>

            {/* Overlay nội dung */}
            <div className="inset-0 flex justify-center items-center text-black">
                <p className="text-xl flex items-center gap-2 p-3 rounded-md">
                    <Typewriter
                        words={["Miễn phí Ship có QT"]}
                        loop={true} // Lặp vô hạn
                        cursor
                        cursorStyle="|"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={5000} // Giữ chữ trong 5s trước khi xóa
                    />
                    <AiOutlineTruck className="text-2xl" />
                </p>
            </div>
        </div>
    );
};

export default Banner;
