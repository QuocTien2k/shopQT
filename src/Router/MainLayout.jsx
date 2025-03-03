import { Outlet } from "react-router-dom";
import Header from "../component/layout/Header";


const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet /> {/* Nơi render các trang con */}
        </>
    );
};

export default MainLayout;
