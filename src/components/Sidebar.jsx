import {
  LayoutDashboard,
  Users,
  Package,
  Plus,
  ClipboardList,
  ShoppingCart,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { name: "Users", icon: Users, to: "/users" },
    { name: "Products", icon: Package, to: "/products" },
    { name: "Add Product", icon: Plus, to: "/products/add" },
    { name: "Orders", icon: ClipboardList, to: "/orders" },
    { name: "Carts", icon: ShoppingCart, to: "/carts" },
    { name: "Settings", icon: Settings, to: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-[#E5E7EB] bg-white px-5 py-7">

      {/* Brand */}
      <div className="mb-8 px-1">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17233C] text-lg font-bold text-[#E89A5B] shadow-sm">
            L
          </div>

          <div>
            <p className="text-lg font-bold leading-tight text-[#17233C]">
              LUMA
            </p>

            <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#7B8190]">
              Admin Panel
            </p>
          </div>
        </div>

        <div className="h-px bg-[#F7F5F0]" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1.5">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-[#17233C] text-white shadow-sm"
                    : "text-[#60708F] hover:bg-[#F7F5F0] hover:text-[#17233C]"
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
                        : "text-[#60708F] group-hover:text-[#E89A5B]"
                    }
                  />

                  <span className="text-sm font-medium">
                    {link.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* API status */}
      <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F5F0] p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#4F8A70]" />

          <span className="text-[10px] font-bold tracking-[2px] text-[#60708F]">
            LIVE
          </span>
        </div>

        <p className="text-xs font-medium leading-5 text-[#17233C]">
          Connected to the E-commerce API
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;