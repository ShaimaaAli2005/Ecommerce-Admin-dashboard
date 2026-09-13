import {
  LayoutDashboard,
  Users,
  Package,
  Plus,
  ClipboardList,
  ShoppingCart,
  Settings,
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const { t } = useTranslation("sidebar");

  const links = [
    { key: "dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { key: "users", icon: Users, to: "/users" },
    { key: "products", icon: Package, to: "/products" },
    { key: "addProduct", icon: Plus, to: "/products/add" },
    { key: "orders", icon: ClipboardList, to: "/orders" },
    { key: "carts", icon: ShoppingCart, to: "/carts" },
    { key: "settings", icon: Settings, to: "/settings" },
  ];

  return (
    <aside
      className="
        fixed left-0 top-0 z-50 flex h-screen w-60 flex-col
        border-r border-[#E5E7EB]
        bg-white
        px-5 py-7
        transition-colors duration-300

        dark:border-gray-700
        dark:bg-[#111827]
      "
    >
      {/* Logo */}
      <div className="mb-8 px-1">
        <div className="mb-3 flex items-center gap-3">
          <div>
            <p
              className="
                text-lg font-bold leading-tight
                text-[#17233C]
                dark:text-white
              "
            >
              Commerce
            </p>

            <p
              className="
                text-[10px] font-medium uppercase tracking-[2px]
                text-[#7B8190]
                dark:text-gray-400
              "
            >
              Admin Panel
            </p>
          </div>
        </div>

        <div className="h-px bg-[#F7F5F0] dark:bg-gray-700" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1.5">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.key}
              to={link.to}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-[#17233C] text-white shadow-sm"
                    : "text-[#60708F] hover:bg-[#F7F5F0] hover:text-[#17233C] dark:text-gray-400 dark:hover:bg-[#17233C] dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={
                      isActive
                        ? "text-[#E89A5B]"
                        : "text-[#60708F] group-hover:text-[#E89A5B] dark:text-gray-400"
                    }
                  />

                  <span className="text-sm font-medium">
                    {t(link.key)}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* API Status */}
      <div
        className="
          mt-6 rounded-2xl
          border border-[#E5E7EB]
          bg-[#F7F5F0]
          p-4
          transition-colors duration-300

          dark:border-gray-700
          dark:bg-[#17233C]
        "
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#4F8A70]" />

          <span
            className="
              text-[10px] font-bold tracking-[2px]
              text-[#60708F]
              dark:text-gray-400
            "
          >
            LIVE
          </span>
        </div>

        <p
          className="
            text-xs font-medium leading-5
            text-[#17233C]
            dark:text-white
          "
        >
          Connected to the E-commerce API
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;