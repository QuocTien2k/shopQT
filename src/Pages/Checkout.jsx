import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "../component/Button";
import Title from "../component/Title/Title";
import { AiOutlineTruck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../component/Context/DataContext";
import EmptyCart from "../component/EmptyCart/EmptyCart";
import API from "../api";

const CheckoutForm = () => {
    const navigate = useNavigate();
    const { isOpen, setIsOpen, removeFromCart } = useContext(DataContext)

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        addressDetail: "",
        note: "",
    });

    const [errors, setErrors] = useState({});

    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const delivery = 30000;

    //k.tra có thông tin từ cart và user không?
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("checkoutData"));
        const userData = localStorage.getItem("user");

        if (!userData) {
            localStorage.removeItem("checkoutData"); // Xóa luôn giỏ hàng
            setIsOpen(true); // Nếu chưa đăng nhập, mở modal
            return;
        }

        if (!storedData) {
            // Nếu không có sản phẩm để checkout, điều hướng về cart
            setIsOpen(true);
        }
    }, [setIsOpen]);

    // Get checkoutData từ localStorage
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || { cart: [], totalAmount: 0 };

    // Tính toán lại totalAmount (lấy từ checkoutData)
    const totalAmount = checkoutData.totalAmount;
    const finalTotal = totalAmount - (selectedDiscount?.amount || 0) + delivery;

    // Fetch danh sách mã giảm giá từ API
    useEffect(() => {
        API.get("/discounts")
            .then((res) => {
                setDiscounts(res.data);
            })
            .catch((err) => console.error("Lỗi khi fetch discount:", err));
    }, []);
    // console.log("CheckoutData:", checkoutData);
    // console.log("Total Amount:", totalAmount);
    // console.log("Selected Discount:", selectedDiscount);

    //khi component mount lấy fulllname-phone từ localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setFormData((prev) => ({
                ...prev,
                fullname: storedUser.fullname || "",
                phone: storedUser.phone || "",
            }));
        }
    }, []);

    // Fetch tỉnh/thành
    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/?depth=1").then((res) => {
            setProvinces(res.data);
        });
    }, []);

    // Fetch quận/huyện khi chọn tỉnh
    useEffect(() => {
        if (!selectedProvince) return;
        axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`).then((res) => {
            setDistricts(res.data.districts);
            setWards([]);
            setSelectedDistrict("");
            setSelectedWard("");
        });
    }, [selectedProvince]);

    // Fetch phường/xã khi chọn quận
    useEffect(() => {
        if (!selectedDistrict) return;
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`).then((res) => {
            setWards(res.data.wards);
            setSelectedWard("");
        });
    }, [selectedDistrict]);

    //Validate form
    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullname.trim()) {
            newErrors.fullname = "Vui lòng nhập họ và tên";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        if (!selectedProvince) {
            newErrors.province = "Vui lòng chọn tỉnh/thành";
        }

        if (!selectedDistrict) {
            newErrors.district = "Vui lòng chọn quận/huyện";
        }

        if (!selectedWard) {
            newErrors.ward = "Vui lòng chọn phường/xã";
        }

        if (!formData.addressDetail.trim()) {
            newErrors.addressDetail = "Vui lòng nhập địa chỉ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về `true` nếu không có lỗi
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        //ép kiểu string lấy tên thay vì mã của tỉnh thành/quận-huyện/phường-xã
        const provinceName = provinces.find((p) => String(p.code) === String(selectedProvince))?.name || "";
        const districtName = districts.find((d) => String(d.code) === String(selectedDistrict))?.name || "";
        const wardName = wards.find((w) => String(w.code) === String(selectedWard))?.name || "";

        const finalData = {
            ...formData,
            province: provinceName,
            district: districtName,
            ward: wardName,
            cart: checkoutData.cart, // Lưu toàn bộ danh sách sản phẩm
            totalAmount: finalTotal, // Tổng tiền cuối cùng (đã tính giảm giá & phí ship)
            createdAt: new Date().toISOString(), // Lưu timestamp đặt hàng
        };

        console.log("Dữ liệu form:", finalData);

        // Lưu trạng thái đặt hàng vào localStorage trước khi chuyển trang
        localStorage.setItem("orderSuccess", "true");

        navigate('/'); // Chuyển về trang chủ ngay

        setTimeout(() => {
            localStorage.removeItem("checkoutData"); // Xóa dữ liệu checkout
            setSelectedProvince("");
            setSelectedDistrict("");
            setSelectedWard("");
            setFormData({
                fullname: "",
                phone: "",
                addressDetail: "",
                note: "",
            });

            //Xóa sản phẩm trong giỏ hàng (DataContext)
            checkoutData.cart.forEach(product => removeFromCart(product.id));
        }, 2000);

    };

    return (
        <>
            {isOpen ? (
                <EmptyCart />
            ) : (
                <div className="pt-[70px] md:pt-[90px]">
                    <div className="bg-white px-6 py-3 mb-3">
                        {/* Title */}
                        <Title text="Đặt hàng" />

                        {/*Form */}
                        <div className="grid md:grid-cols-12 gap-4 p-4 mx-auto">
                            <div className="md:col-span-6 shadow-gradient p-6 rounded-md">
                                {/* Infor */}
                                <div className="flex justify-between gap-4">
                                    <div className="flex-1">
                                        <label className="block font-medium">Họ và tên</label>
                                        <input
                                            type="text"
                                            placeholder="Nhập họ và tên"
                                            value={formData.fullname}
                                            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                            className="w-full border outline-none p-2 rounded-md"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label className="block font-medium">Số điện thoại</label>
                                        <input
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full border outline-none p-2 rounded-md"
                                        />
                                        <div className="min-h-[16px] text-red-500 text-sm">
                                            {errors.phone && <p>{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Tỉnh/Thành - Quận/Huyện - Phường/Xã */}
                                <div className="flex justify-between gap-4 mt-3">
                                    {/* Tỉnh/Thành */}
                                    <div className="flex-1">
                                        <label className="block font-medium">Tỉnh/Thành</label>
                                        <select
                                            className="w-full border p-2 rounded-md cursor-pointer"
                                            value={selectedProvince}
                                            onChange={(e) => {
                                                setSelectedProvince(e.target.value);
                                                setSelectedDistrict(""); // Reset quận/huyện
                                                setSelectedWard(""); // Reset phường/xã
                                            }}
                                        >
                                            <option value="">Chọn tỉnh/thành</option>
                                            {provinces.map((prov) => (
                                                <option key={prov.code} value={prov.code}>{prov.name}</option>
                                            ))}
                                        </select>
                                        <div className="min-h-[16px] text-red-500 text-sm">
                                            {errors.province && <p>{errors.province}</p>}
                                        </div>
                                    </div>

                                    {/* Quận/Huyện */}
                                    <div className="flex-1">
                                        <label className="block font-medium">Quận/Huyện</label>
                                        <select
                                            value={selectedDistrict}
                                            onChange={(e) => {
                                                setSelectedDistrict(e.target.value);
                                                setSelectedWard(""); // Reset phường/xã
                                            }}
                                            disabled={!selectedProvince} // Chỉ cho chọn khi đã có tỉnh/thành
                                            className={`w-full border p-2 rounded-md ${!selectedProvince ? "cursor-not-allowed" : "cursor-pointer"}`}
                                        >
                                            <option value="">Chọn quận/huyện</option>
                                            {districts.map((dist) => (
                                                <option key={dist.code} value={dist.code}>{dist.name}</option>
                                            ))}
                                        </select>
                                        <div className="min-h-[16px] text-red-500 text-sm">
                                            {errors.district && <p>{errors.district}</p>}
                                        </div>
                                    </div>

                                    {/* Phường/Xã */}
                                    <div className="flex-1">
                                        <label className="block font-medium">Phường/Xã</label>
                                        <select
                                            value={selectedWard}
                                            onChange={(e) => setSelectedWard(e.target.value)}
                                            disabled={!selectedDistrict} // Chỉ cho chọn khi đã có quận/huyện
                                            className={`w-full border p-2 rounded-md ${!selectedDistrict ? "cursor-not-allowed" : "cursor-pointer"}`}
                                        >
                                            <option value="">Chọn phường/xã</option>
                                            {wards.map((ward) => (
                                                <option key={ward.code} value={ward.code}>{ward.name}</option>
                                            ))}
                                        </select>
                                        <div className="min-h-[16px] text-red-500 text-sm">
                                            {errors.ward && <p>{errors.ward}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Địa chỉ cụ thể */}
                                <div className="mt-4">
                                    <label className="block font-medium mb-1">Địa chỉ</label>
                                    <input
                                        type="text"
                                        placeholder="Số nhà, tên đường"
                                        value={formData.addressDetail}
                                        onChange={(e) =>
                                            setFormData({ ...formData, addressDetail: e.target.value })
                                        }
                                        className="w-full border outline-none p-2 rounded-md"
                                    />
                                    <div className="min-h-[16px] text-red-500 text-sm">
                                        {errors.addressDetail && <p>{errors.addressDetail}</p>}
                                    </div>
                                </div>

                                {/* Ghi chú */}
                                <div className="mt-4">
                                    <label className="block font-medium mb-1">Ghi chú</label>
                                    <textarea
                                        placeholder="Nhập ghi chú (nếu có)"
                                        value={formData.note}
                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                        className="w-full border p-2 rounded-md h-24 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-6 shadow-gradient p-6 rounded-md">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-3">Thông tin sản phẩm</h2>

                                    {/* Danh sách sản phẩm */}
                                    <div className="max-h-60 overflow-y-auto space-y-3">
                                        {checkoutData.cart.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between border-b pb-2">
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-600">Màu: {item.color}</p>
                                                    <p className="text-sm">Số lượng: {item.cartQuantity}</p>
                                                </div>
                                                <p className="font-semibold">{item.totalPrice.toLocaleString()}đ</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Phí vận chuyển */}
                                    <div className="flex items-center justify-between border-t py-3">
                                        <div className="flex items-center gap-2">
                                            <AiOutlineTruck className="w-5 h-5 text-blue-500" />
                                            <p>Phí vận chuyển:</p>
                                        </div>
                                        <p className="font-semibold">{delivery.toLocaleString()}đ</p>
                                    </div>

                                    {/* Chọn mã giảm phí vận chuyển */}
                                    <div className="mt-3">
                                        <p className="font-medium mb-1">Mã giảm phí vận chuyển</p>
                                        <select
                                            className="border p-2 w-full rounded-md cursor-pointer"
                                            value={selectedDiscount ? selectedDiscount.id : ""}
                                            onChange={(e) => {
                                                const selectedId = Number(e.target.value);
                                                console.log("Selected ID:", selectedId);
                                                const discount = discounts.find(d => Number(d.id) === selectedId);
                                                console.log("Found Discount:", discount);

                                                if (discount) {
                                                    setSelectedDiscount(discount); // Luôn set discount, không kiểm tra minOrderAmount ở đây
                                                } else {
                                                    setSelectedDiscount(null);
                                                }
                                            }}
                                        >
                                            <option value="">Chọn mã giảm</option>
                                            {discounts.map((d) => (
                                                <option
                                                    key={d.id}
                                                    value={d.id}
                                                    disabled={totalAmount < d.minOrderAmount}
                                                    className={totalAmount < d.minOrderAmount ? "cursor-not-allowed opacity-50 line-through" : "cursor-pointer"}
                                                >
                                                    {totalAmount < d.minOrderAmount ? `🚫 ${d.name} (${d.amount.toLocaleString()}đ) 🚫` : `${d.name} (${d.amount.toLocaleString()}đ)`}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    {/* Tổng tiền thanh toán */}
                                    <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                        <p>Tổng thanh toán:</p>
                                        <p>{finalTotal.toLocaleString()}đ</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Button */}
                        <div className="flex justify-center">
                            <Button label="Đặt hàng" variant="primary" onClick={() => handleSubmit()} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
