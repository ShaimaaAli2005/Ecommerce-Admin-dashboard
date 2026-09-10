import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1F2937]">
      <Navbar />

      <Sidebar />

      <main className="ml-60 pt-24 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;