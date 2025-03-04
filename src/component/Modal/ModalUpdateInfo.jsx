import { useState } from "react";
import { Modal, Input, Form } from "antd";
import Button from "../Button";

const ModalUpdateInfo = ({ open, onClose }) => {
    const initialData = {
        fullname: "Nguyễn Văn A",
        phone: "0123456789",
        email: "nguyenvana@gmail.com",
        password: "123456",
        confirmPassword: ""
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";
        if (!value.trim()) {
            error = "Vui lòng không để trống trường này.";
        } else {
            if (name === "phone" && !/^\d{10}$/.test(value)) {
                error = "Số điện thoại không hợp lệ.";
            }
            if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Email không hợp lệ.";
            }
            if (name === "confirmPassword" && value !== formData.password) {
                error = "Mật khẩu nhập lại không khớp.";
            }
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật giá trị chỉ khi thực sự thay đổi
        setFormData((prev) => (prev[name] !== value ? { ...prev, [name]: value } : prev));

        // Chỉ cập nhật lỗi nếu đã có lỗi trước đó
        if (errors[name]) validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleSave = () => {
        const updatedData = { ...formData };
        console.log("Dữ liệu cập nhật:", updatedData);
        onClose();
    };

    const handleCancel = () => {
        setFormData(initialData);
        setErrors({});
        onClose();
    };

    return (
        <Modal title="Cập nhật thông tin" open={open} onCancel={handleCancel} footer={null}>
            <Form layout="vertical">
                <Form.Item label="Họ và tên" validateStatus={errors.fullname ? "error" : ""} help={errors.fullname}>
                    <Input name="fullname" value={formData.fullname} onChange={handleChange} onBlur={handleBlur} />
                </Form.Item>
                <Form.Item label="Số điện thoại" validateStatus={errors.phone ? "error" : ""} help={errors.phone}>
                    <Input name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} />
                </Form.Item>
                <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email}>
                    <Input name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input.Password name="password" value={formData.password} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Nhập lại mật khẩu" validateStatus={errors.confirmPassword ? "error" : ""} help={errors.confirmPassword}>
                    <Input.Password name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                </Form.Item>
                <div className="flex justify-end gap-2">
                    <Button label="Hủy" onClick={handleCancel} variant="normal" />
                    <Button label="Lưu" onClick={handleSave} variant="primary" disabled={Object.values(errors).some(err => err)} />
                </div>
            </Form>
        </Modal>
    );
};

export default ModalUpdateInfo;
