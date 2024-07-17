import { Outlet } from "react-router-dom";

const MainDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainDashboard;