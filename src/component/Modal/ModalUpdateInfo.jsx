import { useContext, useState } from "react";
import { Modal, Input, Form, message } from "antd";
import Button from "../Button";
import { DataContext } from "../Context/DataContext";

const ModalUpdateInfo = ({ open, onClose }) => {
    const { setUser } = useContext(DataContext)
    const user = JSON.parse(localStorage.getItem("user")) || {}; //lấy thông tin từ localStorage
    const initialData = {
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        fullname: user.fullname || "",
        phone: user.phone || "",
        email: user.email || "",
        password: user.password || "",
        confirmPassword: ""
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    // Cập nhật field nhưng không gây re-render toàn bộ form
    const updateField = (field, value) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };

            // Cập nhật fullname nếu lastname hoặc firstname thay đổi
            if (field === "lastname" || field === "firstname") {
                newData.fullname = `${newData.lastname} ${newData.firstname}`;
            }

            return newData;
        });

        validateField(field, value);
    };


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

    const handleSave = async () => {
        try {
            const updatedData = { ...formData };

            // Kiểm tra nếu có thay đổi thì mới cập nhật
            if (!updatedData.fullname || !updatedData.phone || !updatedData.email) {
                message.error("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            // Lấy ID user hiện tại từ localStorage
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                message.error("Không tìm thấy thông tin người dùng!");
                return;
            }

            // Gửi request cập nhật thông tin
            const res = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: "PUT", // Cập nhật dữ liệu user
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error("Cập nhật thất bại!");
            // Cập nhật lại localStorage với thông tin mới
            localStorage.setItem("user", JSON.stringify(updatedData));

            message.success("Cập nhật thành công!");
            setUser(updatedData); //Cập nhật lại state user

            console.log("Dữ liệu cập nhật:", updatedData);
            onClose();

        } catch (error) {
            console.error(error);
            message.error("Có lỗi xảy ra khi cập nhật!");
        }
    };

    const handleCancel = () => {
        setFormData(initialData);
        setErrors({});
        onClose();
    };

    return (
        <Modal
            title="Cập nhật thông tin"
            open={open}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div className="max-h-[80vh] overflow-y-auto p-4">
                <Form layout="vertical">
                    {/* Họ & Tên trên cùng một hàng */}
                    <div className="grid grid-cols-2 gap-2">
                        <Form.Item label="Họ">
                            <Input
                                name="lastname"
                                value={formData.lastname}
                                onChange={(e) => updateField("lastname", e.target.value)}
                                onBlur={(e) => validateField("lastname", e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Tên">
                            <Input
                                name="firstname"
                                value={formData.firstname}
                                onChange={(e) => updateField("firstname", e.target.value)}
                                onBlur={(e) => validateField("firstname", e.target.value)}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item label="Họ và tên">
                        <Input name="fullname" value={formData.fullname} disabled />
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        <Input name="phone" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} onBlur={(e) => validateField("phone", e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input name="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} onBlur={(e) => validateField("email", e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Mật khẩu">
                        <Input.Password name="password" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Nhập lại mật khẩu">
                        <Input.Password name="confirmPassword" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} onBlur={(e) => validateField("confirmPassword", e.target.value)} />
                    </Form.Item>

                    {/* Nút hành động */}
                    <div className="flex justify-end gap-2">
                        <Button label="Hủy" onClick={handleCancel} variant="normal" />
                        <Button label="Lưu" onClick={handleSave} variant="primary" disabled={Object.values(errors).some(err => err)} />
                    </div>
                </Form>
            </div>
        </Modal>

    );
};

export default ModalUpdateInfo;
