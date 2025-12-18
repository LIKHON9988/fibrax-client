import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Footer from "../components/Shared/Footer/Footer";
import Header from "../components/Shared/Header/Header";

const DashboardLayout = () => {
  return (
    <div>
      <Header></Header>
      <div className="relative min-h-screen md:flex bg-gradient-to-br from-[#360550] via-[#380152] via-[#2a0140] to-[#000008]">
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1  md:ml-64">
          <div className="p-5 mt-24">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
