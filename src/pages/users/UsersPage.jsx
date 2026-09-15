import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import userService from "../../services/userService";

export const UsersPage = () => {
  const { i18n } = useTranslation();

  const isRtl = i18n.language?.startsWith("ar");

  const ar = {
    "users.error_loading": "فشل تحميل المستخدمين",
    "users.added_successfully": "تم إنشاء حساب المستخدم بنجاح",
    "users.add_failed": "فشل إنشاء المستخدم",
    "users.updated_successfully": "تم تحديث بيانات المستخدم بنجاح",
    "users.update_failed": "فشل تحديث بيانات المستخدم",
    "users.role_updated_success": "تم تحديث صلاحية المستخدم بنجاح",
    "users.role_update_failed": "فشل تحديث الصلاحية",
    "users.deleted_successfully": "تم حذف المستخدم بنجاح",
    "users.delete_failed": "فشل حذف المستخدم",
    "users.header_badge": "دليل المستخدمين والتحكم في الصلاحيات",
    "users.title": "إدارة المستخدمين",
    "common.refresh": "تحديث البيانات",
    "users.add_user": "مستخدم جديد",
    "users.total_users": "إجمالي الحسابات",
    "users.administrators": "المشرفون",
    "users.customers": "العملاء",
    "users.verified_accounts": "تم التحقق OTP",
    "users.search_placeholder": "البحث بالاسم أو البريد أو الهاتف...",
    "users.showing": "عرض",
    "users.accounts": "حسابات",
    "users.table_view": "جدول",
    "users.grid_view": "بطاقات",
    "users.loading_data": "جارٍ تحميل المستخدمين...",
    "common.retry": "إعادة الاتصال",
    "users.no_match": "لم يتم العثور على مستخدمين مطابقين",
    "users.try_different_filter": "جرّبي تعديل البحث أو فلتر الصلاحية.",
    "users.table_user": "بيانات المستخدم",
    "users.table_phone": "رقم الهاتف",
    "users.table_role": "صلاحية النظام",
    "users.table_status": "حالة التحقق",
    "users.table_actions": "الإجراءات",
    "common.you": "أنت",
    "users.verified": "تم التحقق",
    "users.unverified": "في انتظار OTP",
    "common.view_details": "عرض التفاصيل",
    "common.edit": "تعديل الملف الشخصي",
    "users.change_role": "تغيير الصلاحية",
    "common.delete": "حذف",
    "users.phone": "رقم الهاتف",
    "common.view": "التفاصيل",
    "users.drawer_title": "بيانات المستخدم",
    "users.user_id": "معرّف الحساب",
    "users.addresses": "العناوين المحفوظة",
    "users.form_create_title": "إنشاء حساب مستخدم",
    "users.form_create_desc":
      "الإنشاء المباشر يتجاوز التحقق عبر OTP.",
    "users.username": "اسم المستخدم",
    "users.email": "البريد الإلكتروني",
    "users.password": "كلمة المرور",
    "common.cancel": "إلغاء",
    "users.create_btn": "إنشاء المستخدم",
    "users.edit_modal_title": "تحديث بيانات الملف الشخصي",
    "users.avatar_url": "رابط صورة الحساب",
    "common.save_changes": "حفظ التغييرات",
    "users.change_role_title": "صلاحيات الوصول",
    "users.change_role_confirm_desc":
      "تحديد مستوى صلاحيات النظام لـ",
    "users.apply": "تطبيق الصلاحية",
    "users.delete_dialog_title": "حذف حساب المستخدم؟",
    "users.delete_dialog_warning":
      "هل أنت متأكد من رغبتك في حذف",
    "users.irreversible_action": "لا يمكن التراجع عن هذه العملية.",
    "common.confirm_delete": "تأكيد الحذف",
    "users.admin_role": "مشرف",
    "users.customer_role": "عميل",
    "users.users_label": "مستخدم",
    "users.staff_label": "فريق",
    "users.clients_label": "عميل",
    "users.active_label": "نشط",
    "users.none": "لا يوجد",
    "users.no_addresses": "لا توجد عناوين محفوظة.",
  };

  const tx = (key, fallback) =>
    isRtl ? ar[key] || fallback : fallback;

  // Current logged-in admin
  const currentAdmin = useMemo(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  // Users state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Search / filters
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerUser, setDrawerUser] = useState(null);

  // Dropdown
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Forms
  const initialAddForm = {
    username: "",
    email: "",
    password: "",
    phone: "",
  };

  const [addForm, setAddForm] = useState(initialAddForm);

  const [editForm, setEditForm] = useState({
    username: "",
    phone: "",
    avatar: "",
  });

  const [targetRole, setTargetRole] = useState("customer");

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // Toast
  const triggerToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 4000);
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userService.getUsers();

      const payload = response?.data || response;

      let usersData = [];

      if (Array.isArray(payload)) {
        usersData = payload;
      } else if (Array.isArray(payload?.users)) {
        usersData = payload.users;
      } else if (Array.isArray(payload?.data)) {
        usersData = payload.data;
      }

      setUsers(usersData);
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        tx(
          "users.error_loading",
          "Failed to load users"
        );

      setError(errMsg);

      triggerToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      setActionLoading(true);

      const response = await userService.addUser(addForm);

      const newUser =
        response?.data?.user ||
        response?.user ||
        response?.data;

      if (
        newUser &&
        typeof newUser === "object" &&
        !Array.isArray(newUser)
      ) {
        setUsers((prevUsers) => [
          newUser,
          ...prevUsers,
        ]);
      } else {
        await fetchUsers();
      }

      setAddForm(initialAddForm);
      setShowAddModal(false);

      triggerToast(
        tx(
          "users.added_successfully",
          "User account created successfully"
        )
      );
    } catch (err) {
      triggerToast(
        err.response?.data?.message ||
          tx(
            "users.add_failed",
            "Failed to create user"
          ),
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);

    setEditForm({
      username: user.username || "",
      phone: user.phone || "",
      avatar: user.avatar || "",
    });

    setIsEditOpen(true);
    setOpenDropdownId(null);
  };

  // Update user
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    const userId =
      selectedUser._id || selectedUser.id;

    try {
      setActionLoading(true);

      const response = await userService.updateUser(
        userId,
        editForm
      );

      const updatedUser =
        response?.data?.user ||
        response?.user ||
        response?.data;

      setUsers((prev) =>
        prev.map((user) =>
          (user._id || user.id) === userId
            ? {
                ...user,
                ...editForm,
                ...(updatedUser || {}),
              }
            : user
        )
      );

      setDrawerUser((prev) => {
        if (
          prev &&
          (prev._id || prev.id) === userId
        ) {
          return {
            ...prev,
            ...editForm,
            ...(updatedUser || {}),
          };
        }

        return prev;
      });

      setIsEditOpen(false);
      setSelectedUser(null);

      triggerToast(
        tx(
          "users.updated_successfully",
          "User updated successfully"
        )
      );
    } catch (err) {
      triggerToast(
        err.response?.data?.message ||
          tx(
            "users.update_failed",
            "Failed to update user"
          ),
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Open role modal
  const openRoleModal = (user) => {
    setSelectedUser(user);

    setTargetRole(
      user.role === "admin"
        ? "customer"
        : "admin"
    );

    setIsRoleModalOpen(true);
    setOpenDropdownId(null);
  };

  // Change role
  const handleChangeRoleSubmit = async () => {
    if (!selectedUser) return;

    const userId =
      selectedUser._id || selectedUser.id;

    try {
      setActionLoading(true);

      await userService.changeRole({
        userId,
        role: targetRole,
      });

      setUsers((prev) =>
        prev.map((user) =>
          (user._id || user.id) === userId
            ? {
                ...user,
                role: targetRole,
              }
            : user
        )
      );

      setDrawerUser((prev) => {
        if (
          prev &&
          (prev._id || prev.id) === userId
        ) {
          return {
            ...prev,
            role: targetRole,
          };
        }

        return prev;
      });

      setIsRoleModalOpen(false);
      setSelectedUser(null);

      triggerToast(
        tx(
          "users.role_updated_success",
          "User role updated successfully"
        )
      );
    } catch (err) {
      triggerToast(
        err.response?.data?.message ||
          tx(
            "users.role_update_failed",
            "Failed to update role"
          ),
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Delete user
  const confirmDelete = async () => {
    if (!userToDelete) return;

    const userId =
      userToDelete._id || userToDelete.id;

    try {
      setActionLoading(true);

      await userService.deleteUser(userId);

      setUsers((prev) =>
        prev.filter(
          (user) =>
            (user._id || user.id) !== userId
        )
      );

      if (
        drawerUser &&
        (drawerUser._id === userId ||
          drawerUser.id === userId)
      ) {
        setDrawerUser(null);
      }

      setUserToDelete(null);

      triggerToast(
        tx(
          "users.deleted_successfully",
          "User deleted successfully"
        )
      );
    } catch (err) {
      triggerToast(
        err.response?.data?.message ||
          tx(
            "users.delete_failed",
            "Failed to delete user"
          ),
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle verification
  const handleToggleVerified = async (user) => {
    const userId =
      user._id || user.id;

    try {
      setActionLoading(true);

      await userService.updateUser(userId, {
        isVerified: !user.isVerified,
      });

      setUsers((prev) =>
        prev.map((item) =>
          (item._id || item.id) === userId
            ? {
                ...item,
                isVerified: !item.isVerified,
              }
            : item
        )
      );

      triggerToast(
        !user.isVerified
          ? tx(
              "users.verified",
              "User verified successfully"
            )
          : tx(
              "users.unverified",
              "User verification removed"
            )
      );
    } catch (err) {
      triggerToast(
        err.response?.data?.message ||
          "Failed to update verification status",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

// Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const q = searchQuery.toLowerCase().trim();

      const matchSearch =
        !q ||
        (user.username &&
          user.username.toLowerCase().includes(q)) ||
        (user.email &&
          user.email.toLowerCase().includes(q)) ||
        (user.phone &&
          user.phone.toLowerCase().includes(q));

      const matchRole =
        roleFilter === "all"
          ? true
          : roleFilter === "verified"
          ? user.isVerified
          : user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Statistics
  const stats = useMemo(
    () => ({
      total: users.length,

      admins: users.filter(
        (user) => user.role === "admin"
      ).length,

      customers: users.filter(
        (user) =>
          user.role === "customer" || !user.role
      ).length,

      verified: users.filter(
        (user) => user.isVerified
      ).length,
    }),
    [users]
  );

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="p-6 md:p-8 bg-[#F7F5F0] dark:bg-[#111827] min-h-screen text-[#17233C] dark:text-gray-100 transition-colors duration-300"
    >
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-5 ${
            isRtl ? "left-5" : "right-5"
          } z-[100] px-5 py-3 rounded-xl shadow-xl text-white ${
            toast.type === "error"
              ? "bg-red-500"
              : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-6 border border-slate-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#17233C]/10 dark:bg-white/10 text-[#17233C] dark:text-gray-200 text-xs font-semibold mb-3">
              {tx(
                "users.header_badge",
                "User directory & permissions control"
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold">
              {tx(
                "users.title",
                "Users Management"
              )}
            </h1>

            <p className="text-sm text-slate-500 dark:text-gray-400 mt-2">
              {tx(
                "users.showing",
                "Showing"
              )}{" "}
              <span className="font-semibold">
                {filteredUsers.length}
              </span>{" "}
              {tx(
                "users.accounts",
                "accounts"
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchUsers}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 transition font-medium"
            >
              {tx(
                "common.refresh",
                "Refresh Data"
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#E89A5B] hover:bg-[#d9894b] text-white font-semibold transition shadow-sm"
            >
              +{" "}
              {tx(
                "users.add_user",
                "New User"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-slate-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            {tx(
              "users.total_users",
              "Total Users"
            )}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.total}
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-slate-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            {tx(
              "users.administrators",
              "Administrators"
            )}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.admins}
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-slate-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            {tx(
              "users.customers",
              "Customers"
            )}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.customers}
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-slate-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            {tx(
              "users.verified_accounts",
              "Verified Accounts"
            )}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.verified}
          </h2>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-4 border border-slate-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder={tx(
                "users.search_placeholder",
                "Search by name, email or phone..."
              )}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#17233C] dark:text-white outline-none focus:ring-2 focus:ring-[#E89A5B]/40"
            />
          </div>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none"
          >
            <option value="all">
              All Users
            </option>

            <option value="admin">
              {tx(
                "users.admin_role",
                "Admin"
              )}
            </option>

            <option value="customer">
              {tx(
                "users.customer_role",
                "Customer"
              )}
            </option>

            <option value="verified">
              {tx(
                "users.verified",
                "Verified"
              )}
            </option>
          </select>

          {/* View mode */}
          <div className="flex rounded-xl border border-slate-200 dark:border-gray-600 overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setViewMode("table")
              }
              className={`px-4 py-3 text-sm font-medium ${
                viewMode === "table"
                  ? "bg-[#17233C] text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              {tx(
                "users.table_view",
                "Table"
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setViewMode("grid")
              }
              className={`px-4 py-3 text-sm font-medium ${
                viewMode === "grid"
                  ? "bg-[#17233C] text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              {tx(
                "users.grid_view",
                "Cards"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-10 border border-slate-200 dark:border-gray-700 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#E89A5B] border-t-transparent rounded-full mx-auto mb-4" />

          <p className="text-slate-500 dark:text-gray-400">
            {tx(
              "users.loading_data",
              "Loading users..."
            )}
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchUsers}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            {tx(
              "common.retry",
              "Retry"
            )}
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        filteredUsers.length === 0 && (
          <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-10 border border-slate-200 dark:border-gray-700 text-center">
            <h3 className="font-bold text-lg mb-2">
              {tx(
                "users.no_match",
                "No matching users found"
              )}
            </h3>

            <p className="text-slate-500 dark:text-gray-400">
              {tx(
                "users.try_different_filter",
                "Try changing your search or role filter."
              )}
            </p>
          </div>
        )}

      {/* Users Table */}
      {!loading &&
        !error &&
        filteredUsers.length > 0 &&
        viewMode === "table" && (
          <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700">
                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      {tx(
                        "users.table_user",
                        "User"
                      )}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      {tx(
                        "users.table_phone",
                        "Phone"
                      )}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      {tx(
                        "users.table_role",
                        "Role"
                      )}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      {tx(
                        "users.table_status",
                        "Status"
                      )}
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      {tx(
                        "users.table_actions",
                        "Actions"
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const userId =
                      user._id || user.id;

                    return (
                      <tr
                        key={userId}
                        className="border-b border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800/70 transition"
                      >
                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-[#17233C] text-white flex items-center justify-center font-bold overflow-hidden">
                              {user.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.username}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                (
                                  user.username ||
                                  "U"
                                )
                                  .charAt(0)
                                  .toUpperCase()
                              )}
                            </div>

                            <div>
                              <p className="font-semibold">
                                {user.username ||
                                  "Unknown User"}
                              </p>

                              <p className="text-sm text-slate-500 dark:text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="px-5 py-4 text-sm">
                          {user.phone ||
                            tx(
                              "users.none",
                              "None"
                            )}
                        </td>

                        {/* Role */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            }`}
                          >
                            {user.role ===
                            "admin"
                              ? tx(
                                  "users.admin_role",
                                  "Admin"
                                )
                              : tx(
                                  "users.customer_role",
                                  "Customer"
                                )}
                          </span>
                        </td>

                        {/* Verification */}
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleVerified(
                                user
                              )
                            }
                            disabled={actionLoading}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.isVerified
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                            }`}
                          >
                            {user.isVerified
                              ? tx(
                                  "users.verified",
                                  "Verified"
                                )
                              : tx(
                                  "users.unverified",
                                  "Unverified"
                                )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setDrawerUser(user)
                              }
                              className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-sm"
                            >
                              {tx(
                                "common.view",
                                "View"
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(user)
                              }
                              className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-sm"
                            >
                              {tx(
                                "common.edit",
                                "Edit"
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openRoleModal(user)
                              }
                              className="px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-sm"
                            >
                              {tx(
                                "users.change_role",
                                "Role"
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setUserToDelete(
                                  user
                                )
                              }
                              className="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 text-sm"
                            >
                              {tx(
                                "common.delete",
                                "Delete"
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

{/* Users Grid */}
      {!loading &&
        !error &&
        filteredUsers.length > 0 &&
        viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredUsers.map((user) => {
              const userId = user._id || user.id;

              return (
                <div
                  key={userId}
                  className="bg-white dark:bg-[#1F2937] rounded-2xl p-5 border border-slate-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#17233C] text-white flex items-center justify-center font-bold overflow-hidden">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          (user.username || "U")
                            .charAt(0)
                            .toUpperCase()
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold">
                          {user.username ||
                            "Unknown User"}
                        </h3>

                        <p className="text-sm text-slate-500 dark:text-gray-400 break-all">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {user.role === "admin"
                        ? tx(
                            "users.admin_role",
                            "Admin"
                          )
                        : tx(
                            "users.customer_role",
                            "Customer"
                          )}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-gray-400">
                        {tx(
                          "users.phone",
                          "Phone"
                        )}
                      </span>

                      <span>
                        {user.phone ||
                          tx(
                            "users.none",
                            "None"
                          )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-gray-400">
                        {tx(
                          "users.table_status",
                          "Status"
                        )}
                      </span>

                      <span
                        className={
                          user.isVerified
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {user.isVerified
                          ? tx(
                              "users.verified",
                              "Verified"
                            )
                          : tx(
                              "users.unverified",
                              "Unverified"
                            )}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() =>
                        setDrawerUser(user)
                      }
                      className="flex-1 min-w-[90px] px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-sm hover:bg-slate-200 dark:hover:bg-gray-600"
                    >
                      {tx(
                        "common.view",
                        "View"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(user)
                      }
                      className="flex-1 min-w-[90px] px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-sm"
                    >
                      {tx(
                        "common.edit",
                        "Edit"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openRoleModal(user)
                      }
                      className="flex-1 min-w-[90px] px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-sm"
                    >
                      {tx(
                        "users.change_role",
                        "Role"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setUserToDelete(user)
                      }
                      className="flex-1 min-w-[90px] px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm"
                    >
                      {tx(
                        "common.delete",
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#17233C]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#1F2937] rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {tx(
                      "users.form_create_title",
                      "Create User Account"
                    )}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                    {tx(
                      "users.form_create_desc",
                      "Direct creation bypasses OTP verification."
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form
              onSubmit={handleAddSubmit}
              className="p-6 space-y-4"
            >
              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {tx(
                    "users.username",
                    "Username"
                  )}
                </label>

                <input
                  type="text"
                  required
                  value={addForm.username}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      username: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#E89A5B]/40"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {tx(
                    "users.email",
                    "Email Address"
                  )}
                </label>

                <input
                  type="email"
                  required
                  value={addForm.email}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#E89A5B]/40"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {tx(
                    "users.password",
                    "Password"
                  )}
                </label>

                <input
                  type="password"
                  required
                  minLength={6}
                  value={addForm.password}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#E89A5B]/40"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {tx(
                    "users.phone",
                    "Phone Number"
                  )}
                </label>

                <input
                  type="text"
                  value={addForm.phone}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-[#E89A5B]/40"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800"
                >
                  {tx(
                    "common.cancel",
                    "Cancel"
                  )}
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#E89A5B] text-white font-semibold hover:bg-[#d9894b] disabled:opacity-60"
                >
                  {actionLoading
                    ? "..."
                    : tx(
                        "users.create_btn",
                        "Create User"
                      )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-[#17233C]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#1F2937] rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700">
            <div className="p-6 border-b border-slate-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {tx(
                  "users.edit_modal_title",
                  "Update Profile"
                )}
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedUser(null);
                }}
                className="text-2xl text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleEditSubmit}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  {tx(
                    "users.username",
                    "Username"
                  )}
                </label>

                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      username: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {tx(
                    "users.phone",
                    "Phone Number"
                  )}
                </label>

                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {tx(
                    "users.avatar_url",
                    "Avatar URL"
                  )}
                </label>

                <input
                  type="text"
                  value={editForm.avatar}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      avatar: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600"
                >
                  {tx(
                    "common.cancel",
                    "Cancel"
                  )}
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#E89A5B] text-white font-semibold disabled:opacity-60"
                >
                  {actionLoading
                    ? "..."
                    : tx(
                        "common.save_changes",
                        "Save Changes"
                      )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {isRoleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-[#17233C]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1F2937] rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-2">
              {tx(
                "users.change_role_title",
                "Access Permissions"
              )}
            </h2>

            <p className="text-sm text-slate-500 dark:text-gray-400 mb-5">
              {tx(
                "users.change_role_confirm_desc",
                "Set system permission level for"
              )}{" "}
              <span className="font-semibold text-[#17233C] dark:text-white">
                {selectedUser.username}
              </span>
            </p>

            <select
              value={targetRole}
              onChange={(e) =>
                setTargetRole(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 mb-5"
            >
              <option value="admin">
                {tx(
                  "users.admin_role",
                  "Admin"
                )}
              </option>

              <option value="customer">
                {tx(
                  "users.customer_role",
                  "Customer"
                )}
              </option>
            </select>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsRoleModalOpen(false);
                  setSelectedUser(null);
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600"
              >
                {tx(
                  "common.cancel",
                  "Cancel"
                )}
              </button>

              <button
                type="button"
                onClick={handleChangeRoleSubmit}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 rounded-xl bg-[#17233C] text-white font-semibold disabled:opacity-60"
              >
                {actionLoading
                  ? "..."
                  : tx(
                      "users.apply",
                      "Apply Role"
                    )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-[#17233C]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1F2937] rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              {tx(
                "users.delete_dialog_title",
                "Delete User Account?"
              )}
            </h2>

            <p className="text-slate-600 dark:text-gray-300">
              {tx(
                "users.delete_dialog_warning",
                "Are you sure you want to delete"
              )}{" "}
              <span className="font-bold">
                {userToDelete.username}
              </span>
              ?
            </p>

            <p className="text-sm text-red-500 mt-3">
              {tx(
                "users.irreversible_action",
                "This action cannot be undone."
              )}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
              onClick={() =>
  setUserToDelete(null)
}
className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600"
>
  {tx(
    "common.cancel",
    "Cancel"
  )}
</button>

<button
  type="button"
  onClick={confirmDelete}
  disabled={actionLoading}
  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-60"
>
  {actionLoading
    ? "..."
    : tx(
        "common.confirm_delete",
        "Confirm Delete"
      )}
</button>
</div>
</div>
</div>
)}

{/* User Details Drawer */}
{drawerUser && (
  <div className="fixed inset-0 z-50">
    <div
      className="absolute inset-0 bg-[#17233C]/40 backdrop-blur-sm"
      onClick={() => setDrawerUser(null)}
    />

    <div
      className={`absolute top-0 ${
        isRtl ? "left-0" : "right-0"
      } h-full w-full max-w-md bg-white dark:bg-[#1F2937] shadow-2xl overflow-y-auto`}
    >
      {/* Drawer Header */}
      <div className="p-6 border-b border-slate-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {tx(
            "users.drawer_title",
            "User Details"
          )}
        </h2>

        <button
          type="button"
          onClick={() => setDrawerUser(null)}
          className="text-2xl text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Drawer Content */}
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-[#17233C] text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
            {drawerUser.avatar ? (
              <img
                src={drawerUser.avatar}
                alt={drawerUser.username}
                className="w-full h-full object-cover"
              />
            ) : (
              (
                drawerUser.username || "U"
              )
                .charAt(0)
                .toUpperCase()
            )}
          </div>

          <h3 className="text-xl font-bold mt-4">
            {drawerUser.username ||
              "Unknown User"}
          </h3>

          <p className="text-slate-500 dark:text-gray-400">
            {drawerUser.email}
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {/* User ID */}
          <div>
            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">
              {tx(
                "users.user_id",
                "User ID"
              )}
            </p>

            <p className="mt-1 break-all font-medium">
              {drawerUser._id ||
                drawerUser.id ||
                tx(
                  "users.none",
                  "None"
                )}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">
              {tx(
                "users.phone",
                "Phone"
              )}
            </p>

            <p className="mt-1 font-medium">
              {drawerUser.phone ||
                tx(
                  "users.none",
                  "None"
                )}
            </p>
          </div>

          {/* Role */}
          <div>
            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">
              {tx(
                "users.table_role",
                "Role"
              )}
            </p>

            <p className="mt-1 font-medium">
              {drawerUser.role === "admin"
                ? tx(
                    "users.admin_role",
                    "Admin"
                  )
                : tx(
                    "users.customer_role",
                    "Customer"
                  )}
            </p>
          </div>

          {/* Verification */}
          <div>
            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">
              {tx(
                "users.table_status",
                "Verification Status"
              )}
            </p>

            <p
              className={`mt-1 font-medium ${
                drawerUser.isVerified
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {drawerUser.isVerified
                ? tx(
                    "users.verified",
                    "Verified"
                  )
                : tx(
                    "users.unverified",
                    "Unverified"
                  )}
            </p>
          </div>

          {/* Addresses */}
          <div>
            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">
              {tx(
                "users.addresses",
                "Saved Addresses"
              )}
            </p>

            {drawerUser.addresses &&
            drawerUser.addresses.length > 0 ? (
              <div className="mt-2 space-y-2">
                {drawerUser.addresses.map(
                  (address, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-gray-800 text-sm"
                    >
                      {typeof address ===
                      "string"
                        ? address
                        : JSON.stringify(
                            address
                          )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                {tx(
                  "users.no_addresses",
                  "No saved addresses."
                )}
              </p>
            )}
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={() =>
              openEditModal(drawerUser)
            }
            className="flex-1 px-4 py-3 rounded-xl bg-[#E89A5B] text-white font-semibold"
          >
            {tx(
              "common.edit",
              "Edit"
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setUserToDelete(drawerUser);
              setDrawerUser(null);
            }}
            className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold"
          >
            {tx(
              "common.delete",
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UsersPage;





