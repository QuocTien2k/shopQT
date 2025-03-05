import { useState, useCallback } from "react";
import { Input, Select, message } from "antd";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        fullname: "",
        sex: "",
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
            const updatedData = { ...prev, [field]: value };
            if (field === "firstname" || field === "lastname") {
                updatedData.fullname = `${updatedData.lastname} ${updatedData.firstname}`.trim();
            }
            return updatedData;
        });
    }, []);

    // Hàm validate từng trường
    const validateField = (field, value) => {
        let error = "";
        switch (field) {
            case "firstname":
                if (!value.match(/^[A-Za-zÀ-ỹ]{2,}$/)) {
                    error = "Tên phải có ít nhất 2 ký tự và không chứa số";
                }
                break;
            case "lastname":
                if (!value.match(/^[A-Za-zÀ-ỹ\s]{4,25}$/)) {
                    error = "Họ phải có từ 4-25 ký tự và không chứa số";
                }
                break;
            case "phone":
                if (!value.match(/^0\d{9}$/)) {
                    error = "Số điện thoại không hợp lệ";
                }
                break;
            case "password":
                if (!value || value.length < 6) {
                    error = "Mật khẩu phải có ít nhất 6 ký tự";
                }
                break;
            case "confirmPassword":
                if (value !== formData.password) {
                    error = "Mật khẩu nhập lại không khớp";
                }
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    // Xử lý đăng ký
    const handleSubmit = async () => {
        // Kiểm tra có lỗi hay không
        if (Object.values(errors).some((err) => err)) {
            message.error("Vui lòng kiểm tra lại thông tin!");
            return;
        }

        try {
            const checkRes = await fetch("http://localhost:5000/users");
            const users = await checkRes.json();

            //kiểm tra Email
            const isEmailExist = users.some((user) => user.email === formData.email);

            //kiểm tra số điện thoại
            const isPhoneExist = users.some((user) => user.phone === formData.phone);

            if (isEmailExist) {
                message.error("Email đã tồn tại!");
                return;
            }

            if (isPhoneExist) {
                message.error("Số điện thoại đã tồn tại!");
                return;
            }

            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    fullname: formData.fullname,
                    sex: formData.sex,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    image: formData.image
                }),
            });

            if (!res.ok) throw new Error("Đăng ký thất bại!");

            message.success("Đăng ký thành công!");
            setTimeout(() => {
                navigate("/login")
            }, 1500)
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center box-shadow signup-bg">
            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">Đăng Ký</h2>
                <div className="mb-3">
                    <label>Họ và tên lót</label>
                    <Input
                        value={formData.lastname}
                        onChange={(e) => updateField("lastname", e.target.value)}
                        onBlur={(e) => validateField("lastname", e.target.value)}
                        status={errors.lastname ? "error" : ""}
                    />
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                </div>

                <div className="mb-3">
                    <label>Tên</label>
                    <Input
                        value={formData.firstname}
                        onChange={(e) => updateField("firstname", e.target.value)}
                        onBlur={(e) => validateField("firstname", e.target.value)}
                        status={errors.firstname ? "error" : ""}
                    />
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                </div>

                <div className="mb-3">
                    <label>Họ và Tên</label>
                    <Input value={formData.fullname} disabled />
                </div>

                <div className="mb-3">
                    <label>Giới tính</label>
                    <Select
                        className="w-full"
                        value={formData.sex}
                        onChange={(value) => updateField("sex", value)}
                    >
                        <Option value="Male">Nam</Option>
                        <Option value="Female">Nữ</Option>
                    </Select>
                </div>

                <div className="mb-3">
                    <label>Số điện thoại</label>
                    <Input
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        onBlur={(e) => validateField("phone", e.target.value)}
                        status={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <Input
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Mật khẩu</label>
                    <Input.Password
                        value={formData.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        onBlur={(e) => validateField("password", e.target.value)}
                        status={errors.password ? "error" : ""}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="mb-3">
                    <label>Nhập lại mật khẩu</label>
                    <Input.Password
                        value={formData.confirmPassword}
                        onChange={(e) => updateField("confirmPassword", e.target.value)}
                        onBlur={(e) => validateField("confirmPassword", e.target.value)}
                        status={errors.confirmPassword ? "error" : ""}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>

                <div className="flex justify-center">
                    <Button
                        label="Đăng ký"
                        onClick={handleSubmit}
                        variant="primary"
                        buttonWidth="100%"
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
