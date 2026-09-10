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
    <nav className="fixed left-60 right-0 top-0 z-40 flex h-24 items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-8 backdrop-blur-sm">
      
   
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17233C] text-xl font-bold text-[#E89A5B] shadow-sm">
          L
        </div>

        <div>
          <h1 className="text-xl font-bold leading-tight text-[#17233C]">
            LUMA Dashboard
          </h1>

          <p className="mt-0.5 text-sm text-[#7B8190]">
            E-Commerce Admin Panel
          </p>
        </div>
      </div>

    
      <div className="flex items-center gap-3">

     
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#17233C] shadow-sm transition hover:border-[#E89A5B] hover:text-[#E89A5B]"
        >
          <span className="relative">
            <Bell size={20} />

            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#E89A5B]" />
          </span>
        </button>

        {/* Theme */}
        <button
          type="button"
          aria-label="Toggle theme"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#17233C] shadow-sm transition hover:border-[#E89A5B] hover:text-[#E89A5B]"
        >
          <Moon size={19} />
        </button>

        <div className="mx-1 h-8 w-px bg-[#E5E7EB]" />

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#60708F] font-semibold text-white">
            A
          </div>

          <div className="hidden xl:block">
            <p className="text-sm font-semibold leading-tight text-[#17233C]">
              ADMIN
            </p>

            <p className="mt-0.5 text-xs text-[#7B8190]">
              Administrator
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-[#17233C] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#60708F]"
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;