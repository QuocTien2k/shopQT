import React, { useState, useContext } from "react";
import { DataContext } from "../component/Context/DataContext";
import { useNavigate } from "react-router-dom";
import { Input, message } from "antd";
import Button from "../component/Button";

const LoginPage = () => {
    const { setUser, setIsAuthenticated } = useContext(DataContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleBlur = (e) => {
        if (!e.target.value.trim()) {
            setErrors((prev) => ({ ...prev, [e.target.name]: "Vui lòng nhập" }));
        }
    };

    const handleSubmit = async (e) => {
        //console.log(e)
        e.preventDefault();
        setLoading(true);

        try {
            //Kiểm tra form
            if (!formData.identifier || !formData.password) {
                setErrors({
                    identifier: formData.indetifier ? "" : "Vui lòng nhập email hoặc số điện thoại!",
                    password: formData.password ? "" : "Vui lòng nhập mật khẩu"
                });
                setLoading(false);
                return;
            }

            const res = await fetch(`https://shopqt.onrender.com/users`);
            const users = await res.json();
            //console.log(users);

            //tìm user
            const user = users.find((u) => {
                return (
                    (u.email === formData.identifier || u.phone === formData.identifier) && u.password === formData.password
                )
            });
            //console.log(user);

            if (!user) {
                message.error("Email/SĐT hoặc mật khẩu không đúng!");
            } else {
                setUser(user); // lưu vào context
                setIsAuthenticated(true); // Đánh dấu đã đăng nhập
                localStorage.setItem("user", JSON.stringify(user)); // Lưu vào LocalStorage
                navigate("/"); // Chuyển về trang HomePage
            }
        } catch (error) {
            console.error("lỗi khi đăng nhập: ", error);
            message.error("Có lỗi xảy ra vui lòng thử lại!");
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 login-bg">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
                <h2 className="text-2xl font-semibold text-center mb-4">Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email hoặc SĐT */}
                    <label className="block font-medium">Email hoặc Số điện thoại:</label>
                    <Input
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`mt-1 ${errors.identifier && "border-red-500"}`}
                    />
                    <div className="h-3">
                        {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier}</p>}
                    </div>

                    {/* Mật khẩu */}
                    <label className="block font-medium mt-3">Mật khẩu:</label>
                    <Input.Password
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`mt-1 ${errors.password && "border-red-500"}`}
                    />
                    <div className="h-3">
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Button Đăng nhập */}
                    <div className="flex items-center justify-center mt-3">
                        <Button label="Đăng nhập" onClick={(e) => handleSubmit(e)} disabled={loading} className="w-full mt-4" />
                    </div>
                </form>

                {/* Chuyển qua đăng ký */}
                <p className="text-center mt-3 text-sm">
                    Chưa có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Đăng ký ngay</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
