import { Spin } from "antd";

const Loading = ({ size = "large", tip = "Đang tải dữ liệu..." }) => {
    return (
        <div className="flex justify-center items-center h-40">
            <Spin size={size} tip={tip} />
        </div>
    );
};

export default Loading;
