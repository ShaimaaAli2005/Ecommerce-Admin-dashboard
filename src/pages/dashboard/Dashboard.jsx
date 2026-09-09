import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Users 
} from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-14 h-14 border-4 border-[#E89A5B]/30 border-t-[#E89A5B] rounded-full animate-spin"></div>
          <span className="absolute text-xs font-bold tracking-widest text-[#17233C]">LUMA</span>
        </div>
        <p className="text-xs font-medium text-[#60708F]">Loading LUMA Dashboard...</p>
      </div>
    );
  }

  // 🟢 الجزء الثاني: كروت الإحصائيات الستة مع هويّة LUMA والخط المتدرج
  const statCards = [
    {
      title: "Total Orders",
      value: "175",
      subtitle: "All orders received",
      icon: ShoppingBag,
    },
    {
      title: "Pending Orders",
      value: "10",
      subtitle: "Awaiting action",
      icon: Clock,
    },
    {
      title: "Revenue",
      value: "$124,917.08",
      subtitle: "Total gross revenue",
      icon: DollarSign,
    },
    {
      title: "This Month",
      value: "$3,911.40",
      subtitle: "Monthly sales target",
      icon: TrendingUp,
    },
    {
      title: "Top Product",
      value: "iPhone 17 Pro Max",
      subtitle: "76 units sold",
      icon: Package,
      isTextValue: true,
    },
    {
      title: "Users",
      value: "20",
      subtitle: "Registered customers",
      icon: Users,
    },
  ];

  // 🟢 الجزء الثالث: حالة الطلبات بألوان هادئة متناسقة مع LUMA
  const orderStatuses = [
    { label: "PENDING", count: 10, color: "text-[#E89A5B] bg-[#E89A5B]/10 border-[#E89A5B]/20" },
    { label: "PROCESSING", count: 11, color: "text-[#60708F] bg-[#60708F]/10 border-[#60708F]/20" },
    { label: "CONFIRMED", count: 19, color: "text-[#17233C] bg-[#17233C]/10 border-[#17233C]/20" },
    { label: "SHIPPED", count: 31, color: "text-[#2C3E50] bg-[#2C3E50]/10 border-[#2C3E50]/20" },
    { label: "DELIVERED", count: 48, color: "text-[#2E7D32] bg-[#2E7D32]/10 border-[#2E7D32]/20" },
    { label: "CANCELLED", count: 53, color: "text-[#C95C5C] bg-[#C95C5C]/10 border-[#C95C5C]/20" },
  ];

  // 🟢 الجزء الثالث: المنتجات الأكثر مبيعاً
  const bestSellers = [
    { name: "iPhone 17 Pro Max Orange", details: "76 units sold • $4,560.00" },
    { name: "Modern Floor Lamp", details: "51 units sold • $4,029.00" },
    { name: "Air Fryer XL", details: "34 units sold • $4,726.00" },
    { name: "Nike Men's Air Max Shoes", details: "31 units sold • $3,100.00" },
    { name: "CeraVe Moisturizing Cream", details: "21 units sold • $1,050.00" },
  ];

  // 🟢 الجزء الرابع: أحدث الطلبات
  const recentOrders = [
    { name: "CUSTOMER", item: "gqdfdggf", date: "Sep 8, 2026", status: "Confirmed", price: "$190.22" },
    { name: "ADMIN ✔️", item: "iPhone 17 Pro Max Orange", date: "Sep 8, 2026", status: "Delivered", price: "$3,498.40" },
    { name: "yousuf", item: "shirt", date: "Sep 8, 2026", status: "Delivered", price: "$243.80" },
    { name: "Customer", item: "iPhone 17 Pro Max Orange", date: "Sep 6, 2026", status: "Confirmed", price: "$1,710.00" },
    { name: "Customer", item: "iPhone 18", date: "Sep 6, 2026", status: "Delivered", price: "$72.00" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-6 space-y-8 font-sans text-[#1F2937]">
      
      {/* 🟢 الجزء الأول: الهيدر العلوية لماركة LUMA */}
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-widest text-[#E89A5B] uppercase">
        LUMA ADMIN OVERVIEW
        </span>
        <h1 className="text-2xl font-bold text-[#17233C] tracking-tight font-['Poppins']">
          Real-time commerce health
        </h1>
        <p className="text-sm text-[#60708F]">
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>
      </div>

      {/* 🟢 الجزء الثاني: الكروت الستة مع الخط العلوي المتدرج للومة وتأثير الهوفر العجيب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex items-start justify-between"
            >
              {/* ✨ الخط العلوي المتدرج بالذهبي والكحلي الخاص بهوية LUMA ✨ */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#17233C] via-[#E89A5B] to-[#17233C] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="space-y-1 pr-4 pt-1">
                <span className="text-xs font-medium text-[#60708F]">
                  {card.title}
                </span>
                <div className={`font-bold text-[#17233C] font-['Poppins'] ${card.isTextValue ? "text-base leading-snug" : "text-2xl"}`}>
                  {card.value}
                </div>
                <p className="text-[11px] text-[#7B8190]">{card.subtitle}</p>
              </div>

              {/* الأيقونة بحركة احترافية ولون متناسق مع هوية LUMA عند وقف الماوس */}
              <div className="p-3.5 rounded-xl bg-[#F7F5F0] text-[#17233C] border border-[#E5E7EB] group-hover:bg-[#E89A5B] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-out shrink-0 shadow-xs">
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 🟢 الجزء الثالث: التقسيم الثنائي (Live Fulfillment & Best Sellers) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* الشمال: حالة الطلبات */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#F7F5F0] pb-3">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#60708F] uppercase">
                ORDER STATUS
              </span>
              <h2 className="text-lg font-bold text-[#17233C] font-['Poppins']">
                Live fulfillment breakdown
              </h2>
            </div>
            <span className="text-xs text-[#E89A5B] bg-[#E89A5B]/10 px-3 py-1 rounded-full font-semibold border border-[#E89A5B]/20">
              Updated from API
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
            {orderStatuses.map((status, i) => (
              <div
                key={i}
                className={`${status.color} p-4 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer`}
              >
                <span className="text-[11px] font-bold tracking-wider opacity-80 block mb-1">
                  {status.label}
                </span>
                <span className="text-2xl font-extrabold font-['Poppins']">{status.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* اليمين: المنتجات الأكثر مبيعاً */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#60708F] uppercase">
              TOP PRODUCTS
            </span>
            <h2 className="text-lg font-bold text-[#17233C] font-['Poppins']">Best sellers</h2>
          </div>
          <div className="space-y-3 pt-1">
            {bestSellers.map((prod, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F5F0] transition-colors duration-150 cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#17233C]/5 rounded-lg flex items-center justify-center shrink-0 border border-[#17233C]/10 text-[#17233C]">
                  <Package className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[#17233C] truncate">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-[#60708F]">{prod.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🟢 الجزء الرابع: أحدث أداء للطلبات Recent Orders */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm space-y-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#60708F] uppercase">
            RECENT ORDERS
          </span>
          <h2 className="text-lg font-bold text-[#17233C] font-['Poppins']">
            Latest customer activity
          </h2>
        </div>

        <div className="space-y-2 pt-1">
          {recentOrders.map((order, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F7F5F0] transition-colors duration-150 border border-transparent hover:border-[#E5E7EB]"
            >
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-[#17233C]">
                  {order.name}
                </div>
                <div className="text-xs text-[#60708F]">
                  {order.item} • {order.date}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                      : "bg-[#E89A5B]/15 text-[#E89A5B]"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-sm font-bold text-[#17233C] min-w-[70px] text-right font-['Poppins']">
                  {order.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}