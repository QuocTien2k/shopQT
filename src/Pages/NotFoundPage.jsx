import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
                extra={
                    <div className="flex justify-center">
                        <Button
                            label="Quay về trang chủ"
                            variant="primary"
                            onClick={() => navigate("/")}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default NotFoundPage;
