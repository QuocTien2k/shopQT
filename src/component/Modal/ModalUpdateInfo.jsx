import { useContext, useState } from "react";
import { Modal, Input, Form, message } from "antd";
import Button from "../Button";
import { DataContext } from "../Context/DataContext";

const ModalUpdateInfo = ({ open, onClose }) => {
    const { setUser } = useContext(DataContext)
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const user = JSON.parse(localStorage.getItem("user")) || {}; //lấy thông tin từ localStorage
    const initialData = {
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        fullname: user.fullname || "",
        phone: user.phone || "",
        email: user.email || "",
        password: user.password || "",
        confirmPassword: "",
        image: user.image || "",
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
                    error = "Tên ít nhất 2 ký tự và không chứa số";
                }
                break;
            case "lastname":
                if (!value.match(/^[A-Za-zÀ-ỹ\s]{4,25}$/)) {
                    error = "Họ và tên lót từ 4-25 ký tự,không chứa số";
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

    // Hàm kiểm tra file hợp lệ
    const validateFile = (file) => {
        if (!file) {
            return "";
        }

        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
        if (!validTypes) {
            return "Chỉ chấp nhận file jpeg, jpg, png, gif, webp";
        }

        if (file.size > 2 * 1024 * 1024) { // Giới hạn 2MB
            return "Ảnh không được vượt quá 2MB";
        }
        return "";
    };

    //Hàm chọn file
    const onSelectFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const errorMsg = validateFile(file);
        if (errorMsg) {
            setErrors((prev) => ({ ...prev, image: errorMsg })); // Lưu lỗi vào state chung
            return;
        }

        // Nếu hợp lệ, xóa lỗi và lưu ảnh mới
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.image;

            return newErrors;
        });

        setSelectedFile(file) // lưu file vào state

        // Hiển thị ảnh trước khi lưu (blob URL)
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
    }
    //console.log(preview)

    // Hàm chuyển file thành base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSave = async () => {
        try {
            const updatedData = { ...formData };

            // Kiểm tra nếu có thay đổi thì mới cập nhật
            if (!updatedData.fullname || !updatedData.phone || !updatedData.email) {
                message.error("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            // Kiểm tra lỗi trước khi gửi
            if (Object.values(errors).some(err => err)) {
                message.error("Vui lòng kiểm tra lại thông tin!");
                return;
            }

            // Lấy ID user hiện tại từ localStorage
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                message.error("Không tìm thấy thông tin người dùng!");
                return;
            }

            //kiểm tra email + sđt
            const checkRes = await fetch('http://localhost:5000/users');
            const users = await checkRes.json();

            const isEmailExist = users.some((u) => u.email === formData.email && u.id !== user.id);
            const isPhoneExist = users.some((u) => u.phone === formData.phone && u.id !== user.id);

            if (isEmailExist) {
                message.error("Email đã tồn tại");
                return;
            }
            if (isPhoneExist) {
                message.error("Số điện thoại đã tồn tại");
                return;
            }

            // Nếu có ảnh mới, chuyển thành base64 trước khi lưu
            if (selectedFile) {
                const base64 = await convertToBase64(selectedFile);
                updatedData.image = base64;
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
            setSelectedFile(null); // Reset ảnh sau khi lưu

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
                        <Form.Item label="Họ và tên lót">
                            <Input
                                name="lastname"
                                value={formData.lastname}
                                onChange={(e) => updateField("lastname", e.target.value)}
                                onBlur={(e) => validateField("lastname", e.target.value)}
                            />
                            <div className="h-3">
                                {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                            </div>
                        </Form.Item>
                        <Form.Item label="Tên">
                            <Input
                                name="firstname"
                                value={formData.firstname}
                                onChange={(e) => updateField("firstname", e.target.value)}
                                onBlur={(e) => validateField("firstname", e.target.value)}
                            />
                            <div className="h-3">
                                {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                            </div>
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
                        <div className="h-3">
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                    </Form.Item>
                    <Form.Item label="Mật khẩu">
                        <Input.Password name="password" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
                        <div className="h-3">
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                    </Form.Item>
                    <Form.Item label="Nhập lại mật khẩu">
                        <Input.Password name="confirmPassword" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} onBlur={(e) => validateField("confirmPassword", e.target.value)} />
                        <div className="h-3">
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                    </Form.Item>

                    {/* Ảnh đại diện */}
                    <Form.Item label="Ảnh đại diện" help={errors.image} validateStatus={errors.image ? "error" : ""}>
                        <div className={`flex items-center ${preview ? "justify-between" : "justify-start"} gap-6`}>
                            {/* Ảnh cũ */}
                            <div className="flex flex-col items-center">
                                <img
                                    src={formData.image || "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"}
                                    alt="Old Avatar"
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                            </div>

                            {preview && (
                                <div className="flex items-center">
                                    <img
                                        src="https://img.icons8.com/?size=100&id=fFqmaazlzntF&format=png&color=000000"
                                        alt="arrow-right"
                                        className="w-10 h-10 object-contain opacity-70"
                                    />
                                </div>
                            )}

                            {/* Ảnh mới (nếu có) */}
                            {preview && (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={preview}
                                        alt="New Avatar"
                                        className="w-24 h-24 rounded-full object-cover border"
                                    />
                                </div>
                            )}
                        </div>

                        {/*Nút avatar */}
                        <div className="flex items-center justify-start mt-3">
                            <label
                                htmlFor="upload-avatar"
                                className="mt-2 px-3 py-1 bg-orange-200 text-gray-700 text-sm rounded cursor-pointer hover:bg-orange-300"
                            >
                                Tải ảnh đại diện
                            </label>
                            <input
                                id="upload-avatar"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => onSelectFile(e)}
                            />
                        </div>
                    </Form.Item>

                    {/* Đường kẻ ngăn cách */}
                    <div className="border-t my-4"></div>

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
