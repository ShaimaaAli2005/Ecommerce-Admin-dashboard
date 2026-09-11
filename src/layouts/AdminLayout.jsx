import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function AdminLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-[#F7F5F0]
        text-[#1F2937]
        transition-colors duration-300

        dark:bg-[#111827]
        dark:text-white
      "
    >
      <Navbar />

      <Sidebar />

      <main
        className="
          ml-60
          min-h-screen
          p-6
          pt-24
          transition-colors duration-300

          dark:bg-[#111827]
          dark:text-white
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;