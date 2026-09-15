import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock,
  DollarSign,
  TrendingUp,
  Package,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../../components/loader/SkeletonLoader";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith("ar");
  const ar = {'dashboard.loading': 'جارٍ تحميل لوحة تحكم LUMA...', 'dashboard.badge': 'نظرة عامة على إدارة LUMA', 'dashboard.title': 'حالة التجارة في الوقت الفعلي', 'dashboard.description': 'تابعي متجرك بوضوح مع مؤشرات API مباشرة.', 'dashboard.total_orders': 'إجمالي الطلبات', 'dashboard.all_orders': 'كل الطلبات المستلمة', 'dashboard.pending_orders': 'الطلبات المعلقة', 'dashboard.awaiting_action': 'في انتظار الإجراء', 'dashboard.revenue': 'الإيرادات', 'dashboard.gross_revenue': 'إجمالي الإيرادات', 'dashboard.this_month': 'هذا الشهر', 'dashboard.monthly_target': 'هدف المبيعات الشهري', 'dashboard.top_product': 'أفضل منتج', 'dashboard.units_sold': '76 وحدة مباعة', 'dashboard.users': 'المستخدمون', 'dashboard.registered_customers': 'العملاء المسجلون', 'dashboard.pending': 'معلق', 'dashboard.processing': 'قيد المعالجة', 'dashboard.confirmed': 'مؤكد', 'dashboard.shipped': 'تم الشحن', 'dashboard.delivered': 'تم التسليم', 'dashboard.cancelled': 'ملغي', 'dashboard.product_1': '76 وحدة مباعة • $4,560.00', 'dashboard.product_2': '51 وحدة مباعة • $4,029.00', 'dashboard.product_3': '34 وحدة مباعة • $4,726.00', 'dashboard.product_4': '31 وحدة مباعة • $3,100.00', 'dashboard.product_5': '21 وحدة مباعة • $1,050.00', 'dashboard.order_status': 'حالة الطلبات', 'dashboard.fulfillment': 'تفاصيل تنفيذ الطلبات مباشرة', 'dashboard.updated_api': 'محدّث من API', 'dashboard.top_products': 'أفضل المنتجات', 'dashboard.best_sellers': 'الأكثر مبيعًا', 'dashboard.recent_orders': 'أحدث الطلبات', 'dashboard.latest_activity': 'أحدث نشاط للعملاء', 'dashboard.delivered_status': 'تم التسليم', 'dashboard.confirmed_status': 'مؤكد'};
  const tx = (key, fallback) => (isRtl ? ar[key] || fallback : fallback);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader type="page" />;
   }
  const stats = [
    {
      title: tx("dashboard.total_orders", "Total Orders"),
      value: "175",
      subtitle: tx("dashboard.all_orders", "All orders received"),
      icon: ShoppingBag,
    },
    {
      title: tx("dashboard.pending_orders", "Pending Orders"),
      value: "10",
      subtitle: tx("dashboard.awaiting_action", "Awaiting action"),
      icon: Clock,
    },
    {
      title: tx("dashboard.revenue", "Revenue"),
      value: "$124,917.08",
      subtitle: tx("dashboard.gross_revenue", "Total gross revenue"),
      icon: DollarSign,
    },
    {
      title: tx("dashboard.this_month", "This Month"),
      value: "$3,911.40",
      subtitle: tx("dashboard.monthly_target", "Monthly sales target"),
      icon: TrendingUp,
    },
    {
      title: tx("dashboard.top_product", "Top Product"),
      value: "iPhone 17 Pro Max",
      subtitle: tx("dashboard.units_sold", "76 units sold"),
      icon: Package,
      longValue: true,
    },
    {
      title: tx("dashboard.users", "Users"),
      value: "20",
      subtitle: tx("dashboard.registered_customers", "Registered customers"),
      icon: Users,
    },
  ];

  const statuses = [
    {
      label: tx("dashboard.pending", "PENDING"),
      count: 10,
      style: "text-[#E89A5B] bg-[#E89A5B]/10 border-[#E89A5B]/20",
    },
    {
      label: tx("dashboard.processing", "PROCESSING"),
      count: 11,
      style:
        "text-[#60708F] dark:text-gray-300 bg-[#60708F]/10 border-[#60708F]/20",
    },
    {
      label: tx("dashboard.confirmed", "CONFIRMED"),
      count: 19,
      style:
        "text-[#17233C] dark:text-blue-200 bg-[#17233C]/10 border-[#17233C]/20",
    },
    {
      label: tx("dashboard.shipped", "SHIPPED"),
      count: 31,
      style:
        "text-[#2C3E50] dark:text-gray-300 bg-[#2C3E50]/10 border-[#2C3E50]/20",
    },
    {
      label: tx("dashboard.delivered", "DELIVERED"),
      count: 48,
      style:
        "text-[#2E7D32] dark:text-green-300 bg-[#2E7D32]/10 border-[#2E7D32]/20",
    },
    {
      label: tx("dashboard.cancelled", "CANCELLED"),
      count: 53,
      style: "text-[#C95C5C] bg-[#C95C5C]/10 border-[#C95C5C]/20",
    },
  ];

  const bestSellers = [
    {
      name: "iPhone 17 Pro Max Orange",
      details: tx("dashboard.product_1", "76 units sold • $4,560.00"),
    },
    {
      name: "Modern Floor Lamp",
      details: tx("dashboard.product_2", "51 units sold • $4,029.00"),
    },
    {
      name: "Air Fryer XL",
      details: tx("dashboard.product_3", "34 units sold • $4,726.00"),
    },
    {
      name: "Nike Men's Air Max Shoes",
      details: tx("dashboard.product_4", "31 units sold • $3,100.00"),
    },
    {
      name: "CeraVe Moisturizing Cream",
      details: tx("dashboard.product_5", "21 units sold • $1,050.00"),
    },
  ];

  const recentOrders = [
    {
      name: "CUSTOMER",
      item: "gqdfdggf",
      date: "Sep 8, 2026",
      status: "Confirmed",
      price: "$190.22",
    },
    {
      name: "ADMIN ✔️",
      item: "iPhone 17 Pro Max Orange",
      date: "Sep 8, 2026",
      status: "Delivered",
      price: "$3,498.40",
    },
    {
      name: "yousuf",
      item: "shirt",
      date: "Sep 8, 2026",
      status: "Delivered",
      price: "$243.80",
    },
    {
      name: "Customer",
      item: "iPhone 17 Pro Max Orange",
      date: "Sep 6, 2026",
      status: "Confirmed",
      price: "$1,710.00",
    },
    {
      name: "Customer",
      item: "iPhone 18",
      date: "Sep 6, 2026",
      status: "Delivered",
      price: "$72.00",
    },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#F8F9FA] dark:bg-[#111827] p-6 md:p-8 space-y-8 font-sans text-[#17233C] dark:text-gray-100 transition-colors duration-300 ${
        isRtl ? "text-right" : "text-left"
      }`}
    >
      {/* HEADER */}
      <div className="space-y-1">
        <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
          <span className="w-2 h-2 rounded-full bg-[#E89A5B] animate-pulse" />
          <span className="text-[11px] font-black tracking-widest text-[#E89A5B] uppercase">
            {tx("dashboard.badge", "LUMA ADMIN OVERVIEW")}
          </span>
        </div>

        <h1 className="text-3xl font-black text-[#17233C] dark:text-white tracking-tight font-['Poppins'] mt-1">
          {tx("dashboard.title", "Real-time commerce health")}
        </h1>

        <p className="text-sm text-[#60708F] dark:text-gray-400">
          {t(
            "dashboard.description",
            "Monitor your storefront with AI-style clarity and live API metrics."
          )}
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="group relative bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-slate-200/80 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-start justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#17233C] via-[#E89A5B] to-[#17233C] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-1 pr-4 pt-1">
                <span className="text-xs font-medium text-[#60708F] dark:text-gray-400">
                  {card.title}
                </span>

                <div
                  className={`font-black text-[#17233C] dark:text-white font-['Poppins'] ${
                    card.longValue ? "text-base leading-snug" : "text-2xl"
                  }`}
                >
                  {card.value}
                </div>

                <p className="text-[11px] text-slate-400 dark:text-gray-500">
                  {card.subtitle}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#374151] text-[#17233C] dark:text-gray-200 border border-slate-200 dark:border-gray-600 group-hover:bg-[#E89A5B] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* STATUS + BEST SELLERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ORDER STATUS */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1F2937] rounded-2xl p-6 border border-slate-200/80 dark:border-gray-700 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-700 pb-3 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#60708F] dark:text-gray-400 uppercase">
                {tx("dashboard.order_status", "ORDER STATUS")}
              </span>

              <h2 className="text-lg font-black text-[#17233C] dark:text-white font-['Poppins']">
                {tx("dashboard.fulfillment", "Live fulfillment breakdown")}
              </h2>
            </div>

            <span className="text-xs text-[#E89A5B] bg-[#E89A5B]/10 px-3 py-1 rounded-full font-semibold border border-[#E89A5B]/20 whitespace-nowrap">
              {tx("dashboard.updated_api", "Updated from API")}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
            {statuses.map((status, index) => (
              <div
                key={index}
                className={`${status.style} p-4 rounded-xl border hover:shadow-md transition-all duration-200 cursor-pointer`}
              >
                <span className="text-[11px] font-bold tracking-wider opacity-80 block mb-1">
                  {status.label}
                </span>

                <span className="text-2xl font-extrabold font-['Poppins']">
                  {status.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BEST SELLERS */}
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-6 border border-slate-200/80 dark:border-gray-700 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#60708F] dark:text-gray-400 uppercase">
              {tx("dashboard.top_products", "TOP PRODUCTS")}
            </span>

            <h2 className="text-lg font-black text-[#17233C] dark:text-white font-['Poppins']">
              {tx("dashboard.best_sellers", "Best sellers")}
            </h2>
          </div>

          <div className="space-y-3 pt-1">
            {bestSellers.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8F9FA] dark:hover:bg-[#374151] transition-colors duration-150 cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#17233C]/5 dark:bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-[#17233C]/10 dark:border-gray-600 text-[#17233C] dark:text-gray-200">
                  <Package className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[#17233C] dark:text-white truncate">
                    {product.name}
                  </h4>

                  <p className="text-[11px] text-[#60708F] dark:text-gray-400">
                    {product.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-6 border border-slate-200/80 dark:border-gray-700 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#60708F] dark:text-gray-400 uppercase">
            {tx("dashboard.recent_orders", "RECENT ORDERS")}
          </span>

          <h2 className="text-lg font-black text-[#17233C] dark:text-white font-['Poppins']">
            {tx("dashboard.latest_activity", "Latest customer activity")}
          </h2>
        </div>

        <div className="space-y-2 pt-1">
          {recentOrders.map((order, index) => {
            const delivered = order.status === "Delivered";

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-[#F8F9FA] dark:hover:bg-[#374151] transition-colors duration-150 border border-transparent hover:border-slate-200 dark:hover:border-gray-600"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="text-sm font-semibold text-[#17233C] dark:text-white">
                    {order.name}
                  </div>

                  <div className="text-xs text-[#60708F] dark:text-gray-400 truncate">
                    {order.item} • {order.date}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      delivered
                        ? "bg-[#2E7D32]/10 text-[#2E7D32] dark:text-green-300"
                        : "bg-[#E89A5B]/15 text-[#E89A5B]"
                    }`}
                  >
                    {delivered
                      ? tx("dashboard.delivered_status", "Delivered")
                      : tx("dashboard.confirmed_status", "Confirmed")}
                  </span>

                  <span className="text-sm font-bold text-[#17233C] dark:text-white min-w-[70px] text-right font-['Poppins']">
                    {order.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
