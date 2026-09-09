import { Bell, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-60 right-0 h-24 bg-white border-b border-[#E5E7EB] px-8 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="w-11 h-11 rounded-xl bg-[#17233C] border-[#E89A5B] flex items-center justify-center text-[#E89A5B] font-bold text-xl">
          L
        </div>

        <div>
          <h1 className="text-xl font-bold text-[#17233C]">
            LUMA Dashboard
          </h1>

          <p className="text-sm text-[#7B8190]">
            E-Commerce Admin Panel
          </p>
        </div>

      </div>

      <div className="flex items-center gap-4">

       
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow">
          <div className="relative">
            <Bell
              size={21}
              className="text-[#17233C] hover:text-[#E89A5B] transition"
            />

            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E89A5B] rounded-full"></span>
          </div>
        </div>

      
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow">
          <Moon
            size={20}
            className="text-[#17233C] hover:text-[#E89A5B] transition"
          />
        </div>

     
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-[#60708F] text-white flex items-center justify-center font-semibold">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-[#17233C]">
              ADMIN
            </p>

            <p className="text-xs text-[#7B8190]">
              Administrator
            </p>
          </div>

        </div>

        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#17233C] hover:bg-[#60708F] text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;