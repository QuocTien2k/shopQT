import { useState, useCallback } from "react";
import { Input, message, Radio } from "antd";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import API from "../api";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        fullname: "",
        sex: true,
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    });

    const [errors, setErrors] = useState({});

    // Cập nhật field nhưng không gây re-render toàn bộ form
    const updateField = useCallback((field, value) => {

        setFormData((prev) => {
            const updateData = { ...prev, [field]: value }; // updateData = field: value of formData
            if (field === "firstname" || field === "lastname") {
                updateData.fullname = `${updateData.firstname} ${updateData.lastname}`.trim();
            }
            return updateData;
        })

        setErrors((prev) => ({ ...prev, [field]: "" })) // khi đang update thì xóa bỏ lỗi cũ
    }, []);

    // Hàm validate từng trường
    const validateField = (field, value) => {
        let error = "";
        if (!value) {
            error = "Vui lòng nhập"
        } else {
            switch (field) {
                case "lastname":
                    if (!value.match(/^[A-Za-zÀ-ỹ]{2,}$/)) {
                        error = "Tên phải có 2 ký tự và không có số";
                    }
                    break;
                case "firstname":
                    if (!value.match(/^[A-Za-zÀ-ỹ\s]{4,25}$/)) {
                        error = "Họ và tên lót phải có từ 4-25 ký tự và không chứa số"
                    }
                    break;
                case "phone":
                    if (!value.match(/^0\d{9}$/)) {
                        error = "Số điện thoại không hợp lệ";
                    }
                    break;
                case "email":
                    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        error = "Email không hợp lệ!";
                    }
                    break;
                case "password":
                    if (value.length < 6) {
                        error = "Mật khẩu ít nhất 6 ký tự";
                    }
                    break;
                case "confirmPassword":
                    if (value !== formData.password) {
                        error = "Mật khẩu nhập lại không khớp";
                    }
                    break;
                default: break;
            }
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    }


    // Xử lý đăng ký
    const handleSubmit = async () => {
        setErrors({}) // reset mảng 

        const newErrors = {}; // tạo mảng lưu lỗi khi xảy ra

        //check lỗi ở các input
        Object.keys(formData).forEach((field) => {
            if (field !== "image") { // bỏ qua trường image
                const error = validateField(field, formData[field]); // gọi hàm check các field từ formData[filed]
                if (error) {
                    newErrors[field] = error;
                }
            }
        })
        setErrors(newErrors); // cập nhật state sau khi kiem tra

        //Nếu vẫn còn lỗi thông báo và return
        if (Object.keys(newErrors).length > 0) {
            message.error("Vui lòng kiểm tra lại thông tin!");
            console.error("Lỗi: ", errors);

            return;
        }

        // kiểm tra fullname 
        if (!formData.fullname.trim()) {
            updateField("fullname", `${formData.lastname} ${formData.firstname}`.trim());
        }

        console.log("Dữ liệu gửi đi:", formData);

        try {
            const checkRes = await API.get("/users");
            const users = checkRes.data;

            //kiểm tra Email
            const isEmailExist = users.some((user) => user.email === formData.email);
            if (isEmailExist) {
                message.error("Email đã tồn tại!");
                return;
            }

            //kiểm tra số điện thoại
            const isPhoneExist = users.some((user) => user.phone === formData.phone);
            if (isPhoneExist) {
                message.error("Số điện thoại đã tồn tại!");
                return;
            }

            try {
                const res = await API.post("/users", {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    fullname: formData.fullname,
                    sex: formData.sex,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    image: formData.image
                });

                console.log("Đăng ký thành công:", res.data);
            } catch (error) {
                console.error("Đăng ký thất bại!", error);
            }

            message.success("Đăng ký thành công");
            setTimeout(() => {
                navigate("/login")
            }, 1000)

        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center box-shadow signup-bg">
            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">Đăng Ký</h2>

                {/* Họ và tên lót */}
                <div className="mb-2">
                    <label>Họ và tên lót</label>
                    <Input
                        value={formData.firstname}
                        onBlur={(e) => validateField("firstname", e.target.value)}
                        onChange={(e) => updateField("firstname", e.target.value)}
                        status={errors.firstname ? "error" : ""}
                    />
                    <div className="h-5">
                        {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                    </div>
                </div>

                {/* Tên */}
                <div className="mb-2">
                    <label>Tên</label>
                    <Input
                        value={formData.lastname}
                        onBlur={(e) => validateField("lastname", e.target.value)}
                        onChange={(e) => updateField("lastname", e.target.value)}
                        status={errors.lastname ? "error" : ""}

                    />
                    <div className="h-5">
                        {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                    </div>

                </div>

                {/* Họ và tên */}
                <div className="mb-2">
                    <label>Họ và Tên</label>
                    <Input value={formData.fullname} disabled />
                </div>

                {/* Giới tính */}
                <div className="mb-2">
                    <label className="mr-2">Giới tính</label>
                    <Radio.Group
                        value={formData.sex}
                        onChange={(e) => updateField("sex", e.target.value)}
                    >
                        <Radio value={true}>Nam</Radio>
                        <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                    {/* Số điện thoại */}
                    <div>
                        <label>Số điện thoại</label>
                        <Input
                            value={formData.phone}
                            onBlur={(e) => validateField("phone", e.target.value)}
                            onChange={(e) => updateField("phone", e.target.value)}
                            status={errors.phone ? "error" : ""}
                        />
                        <div className="h-5">
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label>Email</label>
                        <Input
                            value={formData.email}
                            onBlur={(e) => validateField("email", e.target.value)}
                            onChange={(e) => updateField("email", e.target.value)}
                            status={errors.email ? "error" : ""}
                        />
                        <div className="h-5">
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                    {/* mật khẩu */}
                    <div className="">
                        <label>Mật khẩu</label>
                        <Input.Password
                            value={formData.password}
                            onBlur={(e) => validateField("password", e.target.value)}
                            onChange={(e) => updateField("password", e.target.value)}
                            status={errors.password ? "error" : ""}
                        />
                        <div className="h-5">
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="">
                        <label>Nhập lại mật khẩu</label>
                        <Input.Password
                            value={formData.confirmPassword}
                            onBlur={(e) => validateField("confirmPassword", e.target.value)}
                            onChange={(e) => updateField("confirmPassword", e.target.value)}
                            status={errors.confirmPassword ? "error" : ""}
                        />
                        <div className="h-5">
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                </div>

                {/* Nút submit */}
                <div className="flex justify-center">
                    <Button
                        onClick={handleSubmit}
                        variant="primary"
                        label="Đăng ký"
                    />
                </div>
                {/* Chuyển qua đăng nhập */}
                <p className="text-center mt-3 text-sm">
                    Chưa có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Đăng nhập ngay</span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
