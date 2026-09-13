import { Bell, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useTranslation } from "react-i18next";

function Navbar() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const { t } = useTranslation("navbar");

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav
      className="
        fixed left-60 right-0 top-0 z-40
        flex h-24 items-center justify-between
        border-b border-[#E5E7EB]
        bg-white/95
        px-8
        backdrop-blur-sm
        transition-colors duration-300

        dark:border-gray-700
        dark:bg-[#111827]/95
      "
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            bg-[#17233C]
            text-xl font-bold
            text-[#E89A5B]
            shadow-sm
          "
        >
          L
        </div>

        <div>
          <h1
            className="
              text-xl font-bold leading-tight
              text-[#17233C]
              dark:text-white
            "
          >
            {t("dashboard")}
          </h1>

          <p
            className="
              mt-0.5 text-sm
              text-[#7B8190]
              dark:text-gray-400
            "
          >
            {t("adminPanel")}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          aria-label={t("notifications")}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            border border-[#E5E7EB]
            bg-white
            text-[#17233C]
            shadow-sm
            transition
            hover:border-[#E89A5B]
            hover:text-[#E89A5B]

            dark:border-gray-700
            dark:bg-[#17233C]
            dark:text-white
          "
        >
          <span className="relative">
            <Bell size={20} />

            <span
              className="
                absolute -right-1 -top-1
                h-2 w-2
                rounded-full
                bg-[#E89A5B]
              "
            />
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label="Toggle theme"
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            border border-[#E5E7EB]
            bg-white
            text-[#17233C]
            shadow-sm
            transition
            hover:border-[#E89A5B]
            hover:text-[#E89A5B]

            dark:border-gray-700
            dark:bg-[#17233C]
            dark:text-white
          "
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Divider */}
        <div
          className="
            mx-1 h-8 w-px
            bg-[#E5E7EB]
            dark:bg-gray-700
          "
        />

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-[#60708F]
              font-semibold
              text-white
            "
          >
            A
          </div>

          <div className="hidden xl:block">
            <p
              className="
                text-sm font-semibold leading-tight
                text-[#17233C]
                dark:text-white
              "
            >
              {t("admin")}
            </p>

            <p
              className="
                mt-0.5 text-xs
                text-[#7B8190]
                dark:text-gray-400
              "
            >
              {t("administrator")}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex items-center gap-2
            rounded-lg
            bg-[#17233C]
            px-4 py-2.5
            text-sm font-medium
            text-white
            transition
            hover:bg-[#60708F]

            dark:bg-[#E89A5B]
            dark:text-[#17233C]
            dark:hover:bg-[#d88748]
          "
        >
          <LogOut size={17} />
          {t("logout")}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;