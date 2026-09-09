import {
  LayoutDashboard,
  Users,
  Package,
  Plus,
  ClipboardList,
  ShoppingCart,
  Settings,
} from "lucide-react";

import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const links = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      icon: Users,
    },
    {
      name: "Products",
      icon: Package,
    },
    {
      name: "Add Product",
      icon: Plus,
    },
    {
      name: "Orders",
      icon: ClipboardList,
    },
    {
      name: "Carts",
      icon: ShoppingCart,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200 px-5 py-8 flex flex-col">

     
      <div className="mb-8">
        <p className="text-xs tracking-[5px] text-gray-400 mb-2">
          COMMERCE
        </p>

        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Panel
        </h1>
      </div>

     
      <nav className="flex flex-col gap-2">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <button
              key={link.name}
              onClick={() => setActive(link.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left transition-all duration-200
                ${
                  active === link.name
                    ? "bg-slate-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Icon size={21} strokeWidth={1.8} />

              <span className="font-medium">
                {link.name}
              </span>
            </button>
          );
        })}

      </nav>

      
      <div className="mt-auto">
        <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 p-5 text-white">

          <p className="text-xs tracking-[4px] mb-3 opacity-80">
            LIVE
          </p>

          <p className="font-medium leading-6">
            Connected to the E-commerce API
          </p>

        </div>
      </div>

    </aside>
  );
}

export default Sidebar;