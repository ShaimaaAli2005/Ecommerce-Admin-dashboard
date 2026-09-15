import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import userService from '../../services/userService';

export const UsersPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith('ar');
  const ar = {'users.error_loading': 'فشل تحميل المستخدمين', 'users.added_successfully': 'تم إنشاء حساب المستخدم بنجاح', 'users.add_failed': 'فشل إنشاء المستخدم', 'users.updated_successfully': 'تم تحديث بيانات المستخدم بنجاح', 'users.update_failed': 'فشل تحديث بيانات المستخدم', 'users.role_updated_success': 'تم تحديث صلاحية المستخدم بنجاح', 'users.role_update_failed': 'فشل تحديث الصلاحية', 'users.deleted_successfully': 'تم حذف المستخدم بنجاح', 'users.delete_failed': 'فشل حذف المستخدم', 'users.header_badge': 'دليل المستخدمين والتحكم في الصلاحيات', 'users.title': 'إدارة المستخدمين', 'common.refresh': 'تحديث البيانات', 'users.add_user': 'مستخدم جديد', 'users.total_users': 'إجمالي الحسابات', 'users.administrators': 'المشرفون', 'users.customers': 'العملاء', 'users.verified_accounts': 'تم التحقق OTP', 'users.search_placeholder': 'البحث بالاسم أو البريد أو الهاتف...', 'users.showing': 'عرض', 'users.accounts': 'حسابات', 'users.table_view': 'جدول', 'users.grid_view': 'بطاقات', 'users.loading_data': 'جارٍ تحميل المستخدمين...', 'common.retry': 'إعادة الاتصال', 'users.no_match': 'لم يتم العثور على مستخدمين مطابقين', 'users.try_different_filter': 'جرّبي تعديل البحث أو فلتر الصلاحية.', 'users.table_user': 'بيانات المستخدم', 'users.table_phone': 'رقم الهاتف', 'users.table_role': 'صلاحية النظام', 'users.table_status': 'حالة التحقق', 'users.table_actions': 'الإجراءات', 'common.you': 'أنتِ', 'users.verified': 'تم التحقق', 'users.unverified': 'في انتظار OTP', 'common.view_details': 'عرض التفاصيل', 'common.edit': 'تعديل الملف الشخصي', 'users.change_role': 'تغيير الصلاحية', 'common.delete': 'حذف', 'users.phone': 'رقم الهاتف', 'common.view': 'التفاصيل', 'users.drawer_title': 'بيانات المستخدم', 'users.user_id': 'معرّف الحساب', 'users.addresses': 'العناوين المحفوظة', 'users.form_create_title': 'إنشاء حساب مستخدم', 'users.form_create_desc': 'الإنشاء المباشر يتجاوز التحقق عبر OTP.', 'users.username': 'اسم المستخدم', 'users.email': 'البريد الإلكتروني', 'users.password': 'كلمة المرور', 'common.cancel': 'إلغاء', 'users.create_btn': 'إنشاء المستخدم', 'users.edit_modal_title': 'تحديث بيانات الملف الشخصي', 'users.avatar_url': 'رابط صورة الحساب', 'common.save_changes': 'حفظ التغييرات', 'users.change_role_title': 'صلاحيات الوصول', 'users.change_role_confirm_desc': 'تحديد مستوى صلاحيات النظام لـ', 'users.apply': 'تطبيق الصلاحية', 'users.delete_dialog_title': 'حذف حساب المستخدم؟', 'users.delete_dialog_warning': 'هل أنتِ متأكدة من رغبتك في حذف', 'users.irreversible_action': 'لا يمكن التراجع عن هذه العملية.', 'common.confirm_delete': 'تأكيد الحذف', 'users.admin_role': 'مشرف', 'users.customer_role': 'عميل', 'users.users_label': 'مستخدم', 'users.staff_label': 'فريق', 'users.clients_label': 'عميل', 'users.active_label': 'نشط', 'users.none': 'لا يوجد', 'users.no_addresses': 'لا توجد عناوين محفوظة.'};
  const tx = (key, fallback) => (isRtl ? ar[key] || fallback : fallback);

  // Current logged in admin ID (To prevent self-deletion)
  const currentAdmin = useMemo(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  // State Management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Modals & Panels
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerUser, setDrawerUser] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Forms State
  const initialAddForm = { username: '', email: '', password: '', phone: '' };
  const [addForm, setAddForm] = useState(initialAddForm);
  const [editForm, setEditForm] = useState({ username: '', phone: '', avatar: '' });
  const [targetRole, setTargetRole] = useState('customer');

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Toast Notification Trigger
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // 1. Fetch Users (Swagger: GET /users/all)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getAllUsers();
      const payload = response?.data || response;
      
      if (Array.isArray(payload)) {
        setUsers(payload);
      } else if (Array.isArray(payload.users)) {
        setUsers(payload.users);
      } else if (Array.isArray(payload.data)) {
        setUsers(payload.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || tx('users.error_loading', 'Failed to load users');
      setError(errMsg);
      triggerToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Add New User (Swagger: POST /users/add)
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const response = await userService.addUser(addForm);
      const newUser = response?.data?.user || response?.user;

      if (newUser && typeof newUser === 'object' && !Array.isArray(newUser)) {
        setUsers((prev) => [newUser, ...prev]);
      } else {
        await fetchUsers();
      }

      setAddForm(initialAddForm);
      setShowAddModal(false);
      triggerToast(tx('users.added_successfully', 'User account created successfully'));
    } catch (err) {
      triggerToast(err.response?.data?.message || tx('users.add_failed', 'Failed to create user'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Edit User Profile (Swagger: PATCH /users/{id})
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
    });
    setIsEditOpen(true);
    setOpenDropdownId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      setActionLoading(true);
      const userId = selectedUser._id || selectedUser.id;
      const response = await userService.updateUser(userId, editForm);
      const updatedData = response?.data?.user || editForm;

      setUsers((prev) =>
        prev.map((u) => ((u._id || u.id) === userId ? { ...u, ...updatedData } : u))
      );

      if (drawerUser && (drawerUser._id === userId || drawerUser.id === userId)) {
        setDrawerUser((prev) => ({ ...prev, ...updatedData }));
      }

      setIsEditOpen(false);
      setSelectedUser(null);
      triggerToast(tx('users.updated_successfully', 'User updated successfully'));
    } catch (err) {
      triggerToast(err.response?.data?.message || tx('users.update_failed', 'Failed to update user'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Change Role (Swagger: PATCH /auth/change-role)
  const openRoleModal = (user) => {
    setSelectedUser(user);
    setTargetRole(user.role === 'admin' ? 'customer' : 'admin');
    setIsRoleModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleChangeRoleSubmit = async () => {
    if (!selectedUser) return;
    const userId = selectedUser._id || selectedUser.id;
    try {
      setActionLoading(true);
      await userService.changeRole({ userId, role: targetRole });
      
      setUsers((prev) =>
        prev.map((u) => ((u._id || u.id) === userId ? { ...u, role: targetRole } : u))
      );

      if (drawerUser && (drawerUser._id === userId || drawerUser.id === userId)) {
        setDrawerUser((prev) => ({ ...prev, role: targetRole }));
      }

      setIsRoleModalOpen(false);
      setSelectedUser(null);
      triggerToast(tx('users.role_updated_success', 'User role updated successfully'));
    } catch (err) {
      triggerToast(err.response?.data?.message || tx('users.role_update_failed', 'Failed to update role'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Delete User (Swagger: DELETE /users/{id})
  const confirmDelete = async () => {
    if (!userToDelete) return;
    const userId = userToDelete._id || userToDelete.id;
    try {
      setActionLoading(true);
      await userService.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
      if (drawerUser && (drawerUser._id === userId || drawerUser.id === userId)) {
        setDrawerUser(null);
      }
      setUserToDelete(null);
      triggerToast(tx('users.deleted_successfully', 'User deleted successfully'));
    } catch (err) {
      triggerToast(err.response?.data?.message || tx('users.delete_failed', 'Failed to delete user'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtering Logic
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.phone && u.phone.toLowerCase().includes(q));

      const matchRole =
        roleFilter === 'all'
          ? true
          : roleFilter === 'verified'
          ? u.isVerified
          : u.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Statistics
  const stats = useMemo(() => ({
    total: users.length,
    admins: users.filter((u) => u.role === 'admin').length,
    customers: users.filter((u) => u.role === 'customer' || !u.role).length,
    verified: users.filter((u) => u.isVerified).length,
  }), [users]);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="p-6 md:p-8 bg-[#F7F5F0] dark:bg-[#111827] min-h-screen text-[#17233C] dark:text-gray-100 transition-colors duration-300">
      
      {/* Toast Alert */}
      {toast.show && (
        <div
          className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold animate-in slide-in-from-bottom-5 duration-200 ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <i className={`fa-solid ${toast.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'} text-base`}></i>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E89A5B] animate-pulse"></span>
            <span className="text-[11px] font-black tracking-widest text-[#E89A5B] uppercase">
              {tx('users.header_badge', 'Directory & Access Control')}
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#17233C] dark:text-white tracking-tight mt-1">
            {tx('users.title', 'User Management')}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#1F2937] border border-slate-200 dark:border-gray-700 text-[#60708F] hover:text-[#17233C] dark:text-white hover:bg-slate-50 dark:hover:bg-[#374151] flex items-center justify-center transition-all shadow-sm disabled:opacity-50"
            title={tx('common.refresh', 'Refresh Data')}
          >
            <i className={`fa-solid fa-arrows-rotate ${loading ? 'fa-spin' : ''}`}></i>
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#17233C] hover:bg-[#203152] text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-[#17233C]/10 flex items-center gap-2"
          >
            <i className="fa-solid fa-plus text-xs text-[#E89A5B]"></i>
            <span>{tx('users.add_user', 'New User')}</span>
          </button>
        </div>
      </div>

      {/* Interactive KPI Cards (Click to Filter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* All Users */}
        <div
          onClick={() => setRoleFilter('all')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-white relative overflow-hidden group ${
            roleFilter === 'all'
              ? 'border-[#17233C] shadow-md ring-2 ring-[#17233C]/10'
              : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#60708F] uppercase tracking-wider">
              {tx('users.total_users', 'Total Accounts')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-gray-700 text-[#17233C] dark:text-white flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-[#17233C] dark:text-white">{stats.total}</h3>
            <span className="text-xs font-semibold text-slate-400 dark:text-gray-400">users</span>
          </div>
          {roleFilter === 'all' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#17233C]"></div>}
        </div>

        {/* Admins */}
        <div
          onClick={() => setRoleFilter('admin')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-white relative overflow-hidden group ${
            roleFilter === 'admin'
              ? 'border-[#E89A5B] shadow-md ring-2 ring-[#E89A5B]/20'
              : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#60708F] uppercase tracking-wider">
              {tx('users.administrators', 'Admins')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#E89A5B]/15 text-[#E89A5B] flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-[#E89A5B]">{stats.admins}</h3>
            <span className="text-xs font-semibold text-slate-400 dark:text-gray-400">staff</span>
          </div>
          {roleFilter === 'admin' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E89A5B]"></div>}
        </div>

        {/* Customers */}
        <div
          onClick={() => setRoleFilter('customer')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-white relative overflow-hidden group ${
            roleFilter === 'customer'
              ? 'border-[#60708F] shadow-md ring-2 ring-[#60708F]/20'
              : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#60708F] uppercase tracking-wider">
              {tx('users.customers', 'Customers')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-gray-700 text-[#60708F] flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-user-group"></i>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-[#60708F]">{stats.customers}</h3>
            <span className="text-xs font-semibold text-slate-400 dark:text-gray-400">clients</span>
          </div>
          {roleFilter === 'customer' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#60708F]"></div>}
        </div>

        {/* Verified Accounts */}
        <div
          onClick={() => setRoleFilter('verified')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 bg-white relative overflow-hidden group ${
            roleFilter === 'verified'
              ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#60708F] uppercase tracking-wider">
              {tx('users.verified_accounts', 'OTP Verified')}
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-emerald-600">{stats.verified}</h3>
            <span className="text-xs font-semibold text-slate-400 dark:text-gray-400">active</span>
          </div>
          {roleFilter === 'verified' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>}
        </div>
      </div>

      {/* Control Bar (Search & Views) */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-4 border border-slate-200 dark:border-gray-700 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <i className={`fa-solid fa-magnifying-glass absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 text-sm`}></i>
          <input
            type="text"
            placeholder={tx('users.search_placeholder', 'Filter by name, email, phone...')}
            className={`w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl ${isRtl ? 'pr-10 pl-9' : 'pl-10 pr-9'} py-2.5 text-sm text-[#17233C] dark:text-white placeholder-slate-400 dark:placeholder-gray-500 dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20 focus:border-[#17233C] transition-all`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600`}
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          )}
        </div>

        {/* View Toggle & Status Tag */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-semibold text-slate-400 dark:text-gray-400">
            {tx('users.showing', 'Showing')} <strong className="text-[#17233C] dark:text-white">{filteredUsers.length}</strong> {tx('users.accounts', 'accounts')}
          </span>

          <div className="flex items-center bg-[#F8F9FA] dark:bg-[#374151] p-1 rounded-xl border border-slate-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table' ? 'bg-white shadow-sm text-[#17233C] dark:text-white' : 'text-slate-400 hover:text-[#17233C] dark:text-white'
              }`}
            >
              <i className="fa-solid fa-list"></i>
              <span>{tx('users.table_view', 'Table')}</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-[#17233C] dark:text-white' : 'text-slate-400 hover:text-[#17233C] dark:text-white'
              }`}
            >
              <i className="fa-solid fa-border-all"></i>
              <span>{tx('users.grid_view', 'Cards')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading && users.length === 0 ? (
          <SkeletonLoader type="users" />
      ) : error ? (
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-slate-200 dark:border-gray-700 p-12 text-center text-rose-600 shadow-sm">
          <i className="fa-solid fa-triangle-exclamation text-3xl mb-2"></i>
          <p className="font-bold">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-5 py-2 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 text-[#17233C] dark:text-white rounded-xl text-xs font-bold"
          >
            {tx('common.retry', 'Retry Connection')}
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-slate-200 dark:border-gray-700 p-16 text-center text-slate-400 shadow-sm">
          <i className="fa-regular fa-folder-open text-4xl mb-3 text-slate-300 dark:text-gray-500"></i>
          <p className="font-bold text-base text-[#17233C] dark:text-white">{tx('users.no_match', 'No matching users found')}</p>
          <p className="text-xs mt-1 text-slate-400 dark:text-gray-400">{tx('users.try_different_filter', 'Try adjusting your search query or role filter.')}</p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse ${isRtl ? "text-right" : "text-left"}`}>
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-700 text-[11px] font-extrabold text-[#60708F] uppercase tracking-wider bg-[#F8F9FA] dark:bg-[#374151]/70">
                  <th className="py-4 px-6">{tx('users.table_user', 'User Profile')}</th>
                  <th className="py-4 px-6">{tx('users.table_phone', 'Phone Number')}</th>
                  <th className="py-4 px-6">{tx('users.table_role', 'System Role')}</th>
                  <th className="py-4 px-6">{tx('users.table_status', 'OTP Verification')}</th>
                  <th className="py-4 px-6 text-right">{tx('users.table_actions', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-700 text-sm">
                {filteredUsers.map((u) => {
                  const userName = u.username || 'User';
                  const userId = u._id || u.id;
                  const isSelf = currentAdmin && (currentAdmin._id === userId || currentAdmin.id === userId);
                  const isDropdownOpen = openDropdownId === userId;

                  return (
                    <tr key={userId} className="hover:bg-[#F8F9FA] dark:bg-[#374151]/60 transition-colors group">
                      {/* User Info (Clickable for Drawer) */}
                      <td className="py-4 px-6">
                        <div
                          onClick={() => setDrawerUser(u)}
                          className="flex items-center gap-3.5 cursor-pointer w-fit"
                        >
                          <div className="relative">
                            <img
                              src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                              alt={userName}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-gray-700 bg-[#F8F9FA] dark:bg-[#374151]"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40';
                              }}
                            />
                            {u.isVerified && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-[#17233C] dark:text-white group-hover:text-[#E89A5B] transition-colors leading-tight">
                                {userName}
                              </span>
                              {isSelf && (
                                <span className="text-[9px] bg-slate-100 dark:bg-gray-700 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">
                                  {tx('common.you', 'You')}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-[#60708F] block">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-6 font-semibold text-xs text-[#17233C] dark:text-white">
                        {u.phone || <span className="text-slate-300 dark:text-gray-500 font-normal italic">—</span>}
                      </td>

                      {/* Role Pill */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black capitalize ${
                            u.role === 'admin'
                              ? 'bg-[#E89A5B]/15 text-[#E89A5B]'
                              : 'bg-[#60708F]/15 text-[#60708F]'
                          }`}
                        >
                          <i className={`fa-solid ${u.role === 'admin' ? 'fa-shield-halved' : 'fa-user'} text-[10px]`}></i>
                          {u.role === 'admin' ? tx('users.admin_role', 'Admin') : tx('users.customer_role', 'Customer')}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {u.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {tx('users.verified', 'Verified')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            {tx('users.unverified', 'Pending OTP')}
                          </span>
                        )}
                      </td>

                      {/* Modern Dropdown Actions */}
                      <td className="py-4 px-6 text-right relative">
                        <div className="inline-block" ref={isDropdownOpen ? dropdownRef : null}>
                          <button
                            onClick={() => setOpenDropdownId(isDropdownOpen ? null : userId)}
                            className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-[#374151] text-slate-500 flex items-center justify-center transition-colors"
                          >
                            <i className="fa-solid fa-ellipsis-vertical text-sm"></i>
                          </button>

                          {isDropdownOpen && (
                            <div
                              className={`absolute ${isRtl ? 'left-6' : 'right-6'} top-12 z-30 w-44 bg-white dark:bg-[#1F2937] border border-slate-200 dark:border-gray-700 rounded-2xl shadow-xl py-2 text-xs font-bold text-[#17233C] dark:text-white animate-in fade-in zoom-in-95 duration-100`}
                            >
                              <button
                                onClick={() => {
                                  setDrawerUser(u);
                                  setOpenDropdownId(null);
                                }}
                                className="w-full px-4 py-2 hover:bg-slate-50 dark:hover:bg-[#374151] flex items-center gap-2.5 text-slate-600 dark:text-gray-300"
                              >
                                <i className="fa-solid fa-eye text-[#60708F]"></i>
                                {tx('common.view_details', 'View Details')}
                              </button>

                              <button
                                onClick={() => openEditModal(u)}
                                className="w-full px-4 py-2 hover:bg-slate-50 dark:hover:bg-[#374151] flex items-center gap-2.5 text-slate-600 dark:text-gray-300"
                              >
                                <i className="fa-solid fa-pen text-[#60708F]"></i>
                                {tx('common.edit', 'Edit Profile')}
                              </button>

                              <button
                                onClick={() => openRoleModal(u)}
                                disabled={isSelf}
                                className="w-full px-4 py-2 hover:bg-slate-50 dark:hover:bg-[#374151] flex items-center gap-2.5 text-[#E89A5B] disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <i className="fa-solid fa-user-gear"></i>
                                {tx('users.change_role', 'Change Role')}
                              </button>

                              <div className="my-1 border-t border-slate-100 dark:border-gray-700"></div>

                              <button
                                onClick={() => {
                                  setUserToDelete(u);
                                  setOpenDropdownId(null);
                                }}
                                disabled={isSelf}
                                className="w-full px-4 py-2 hover:bg-rose-50 flex items-center gap-2.5 text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <i className="fa-solid fa-trash"></i>
                                {tx('common.delete', 'Delete User')}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUsers.map((u) => {
            const userName = u.username || 'User';
            const userId = u._id || u.id;
            const isSelf = currentAdmin && (currentAdmin._id === userId || currentAdmin.id === userId);

            return (
              <div
                key={userId}
                className="bg-white dark:bg-[#1F2937] rounded-2xl border border-slate-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                          alt={userName}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-gray-700 bg-[#F8F9FA] dark:bg-[#374151]"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/48';
                          }}
                        />
                        {u.isVerified && (
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-base text-[#17233C] dark:text-white">{userName}</h4>
                          {isSelf && (
                            <span className="text-[9px] bg-slate-100 dark:bg-gray-700 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">
                              {tx('common.you', 'You')}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#60708F]">{u.email}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black capitalize ${
                        u.role === 'admin' ? 'bg-[#E89A5B]/15 text-[#E89A5B]' : 'bg-[#60708F]/15 text-[#60708F]'
                      }`}
                    >
                      {u.role === 'admin' ? tx('users.admin_role', 'Admin') : tx('users.customer_role', 'Customer')}
                    </span>
                  </div>

                  <div className="py-3 border-t border-b border-slate-100 dark:border-gray-700 flex items-center justify-between text-xs text-slate-500 my-2">
                    <span>{tx('users.phone', 'Phone')}:</span>
                    <strong className="text-[#17233C] dark:text-white">{u.phone || '—'}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-2">
                  <button
                    onClick={() => setDrawerUser(u)}
                    className="flex-1 py-2 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 text-[#17233C] dark:text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    {tx('common.view', 'Details')}
                  </button>
                  <button
                    onClick={() => openRoleModal(u)}
                    disabled={isSelf}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-gray-700 text-[#E89A5B] hover:bg-[#E89A5B]/10 flex items-center justify-center transition-colors disabled:opacity-30"
                    title={tx('users.change_role', 'Change Role')}
                  >
                    <i className="fa-solid fa-user-gear text-xs"></i>
                  </button>
                  <button
                    onClick={() => openEditModal(u)}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-gray-700 text-[#60708F] hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-[#374151] flex items-center justify-center transition-colors"
                    title={tx('common.edit', 'Edit')}
                  >
                    <i className="fa-solid fa-pen text-xs"></i>
                  </button>
                  <button
                    onClick={() => setUserToDelete(u)}
                    disabled={isSelf}
                    className="w-9 h-9 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors disabled:opacity-30"
                    title={tx('common.delete', 'Delete')}
                  >
                    <i className="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Slide-over Profile Drawer */}
      {drawerUser && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#17233C]/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className={`bg-white dark:bg-[#1F2937] w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between ${isRtl ? "border-r" : "border-l"} border-slate-200 dark:border-gray-700`}>
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-gray-700">
                <span className="text-xs font-black uppercase text-[#E89A5B] tracking-wider">
                  {tx('users.drawer_title', 'USER PROFILE INSIGHTS')}
                </span>
                <button
                  onClick={() => setDrawerUser(null)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-[#374151] text-slate-400 hover:text-[#17233C] dark:text-white flex items-center justify-center"
                >
                  <i className="fa-solid fa-xmark text-base"></i>
                </button>
              </div>

              <div className="text-center mb-6">
                <img
                  src={drawerUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${drawerUser.username}`}
                  alt={drawerUser.username}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#E89A5B]/40 p-1 mb-3"
                />
                <h3 className="text-xl font-black text-[#17233C] dark:text-white">{drawerUser.username}</h3>
                <p className="text-xs text-[#60708F]">{drawerUser.email}</p>
                <div className="mt-2 flex justify-center gap-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-gray-700 rounded-full text-xs font-bold text-[#17233C] dark:text-white capitalize">
                    {drawerUser.role === 'admin' ? tx('users.admin_role', 'Admin') : tx('users.customer_role', 'Customer')}
                  </span>
                  {drawerUser.isVerified && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                      {tx('users.verified', 'Verified Account')}
                    </span>
                  )}
                </div>
              </div>

              {/* Data Blocks */}
              <div className="space-y-4 text-xs">
                <div className="bg-[#F8F9FA] dark:bg-[#374151] p-4 rounded-xl">
                  <span className="text-[#60708F] font-bold block mb-1">{tx('users.user_id', 'Account ID')}</span>
                  <code className="text-[#17233C] dark:text-white font-mono select-all text-[11px]">{drawerUser._id || drawerUser.id}</code>
                </div>

                <div className="bg-[#F8F9FA] dark:bg-[#374151] p-4 rounded-xl flex justify-between">
                  <span className="text-[#60708F] font-bold">{tx('users.phone', 'Phone Contact')}</span>
                  <strong className="text-[#17233C] dark:text-white">{drawerUser.phone || tx('users.none', 'None')}</strong>
                </div>

                <div className="bg-[#F8F9FA] dark:bg-[#374151] p-4 rounded-xl">
                  <span className="text-[#60708F] font-bold block mb-2">{tx('users.addresses', 'Saved Addresses')}</span>
                  {Array.isArray(drawerUser.addresses) && drawerUser.addresses.length > 0 ? (
                    drawerUser.addresses.map((addr, idx) => (
                      <div key={idx} className="p-2.5 bg-white dark:bg-[#1F2937] rounded-lg border border-slate-200 dark:border-gray-700 mb-2">
                        <p className="font-bold text-[#17233C] dark:text-white">{addr.city}, {addr.country}</p>
                        <p className="text-slate-500 text-[11px]">{addr.street}, {addr.building} ({addr.postalCode})</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 italic">{tx('users.no_addresses', 'No saved addresses on file.')}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-gray-700 flex gap-2">
              <button
                onClick={() => {
                  openEditModal(drawerUser);
                }}
                className="flex-1 py-2.5 bg-[#17233C] text-white rounded-xl text-xs font-bold hover:bg-[#203152] transition-colors"
              >
                {tx('common.edit', 'Edit Profile')}
              </button>
              <button
                onClick={() => {
                  openRoleModal(drawerUser);
                }}
                className="px-4 py-2.5 border border-[#E89A5B] text-[#E89A5B] hover:bg-[#E89A5B]/10 rounded-xl text-xs font-bold transition-colors"
              >
                {tx('users.change_role', 'Role')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create User (POST /users/add) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#17233C]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#17233C] text-[#E89A5B] flex items-center justify-center text-sm shadow-sm">
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#17233C] dark:text-white">
                    {tx('users.form_create_title', 'Create User Account')}
                  </h3>
                  <p className="text-xs text-[#60708F]">
                    {tx('users.form_create_desc', 'Direct creation bypasses OTP authentication.')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-gray-200"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  {tx('users.username', 'Username')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ahmed_dev"
                  className="w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20"
                  value={addForm.username}
                  onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  {tx('users.email', 'Email Address')} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                    {tx('users.password', 'Password')} *
                  </label>
                  <input
                    type="password"
                    required
                    minLength="6"
                    placeholder="Min. 6 characters"
                    className="w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20"
                    value={addForm.password}
                    onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                    {tx('users.phone', 'Phone Number')}
                  </label>
                  <input
                    type="text"
                    placeholder="+966..."
                    className="w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20"
                    value={addForm.phone}
                    onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/3 py-2.5 border border-slate-200 dark:border-gray-700 bg-white dark:bg-[#374151] text-[#60708F] dark:text-gray-200 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-[#374151]"
                >
                  {tx('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-2/3 py-2.5 bg-[#17233C] hover:bg-[#203152] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
                  {tx('users.create_btn', 'Create User')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit User (PATCH /users/{id}) */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-[#17233C]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-gray-700">
              <h3 className="text-lg font-black text-[#17233C] dark:text-white">
                {tx('users.edit_modal_title', 'Update Profile Details')}
              </h3>
              <button
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedUser(null);
                }}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-gray-200"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  {tx('users.username', 'Username')}
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  {tx('users.phone', 'Phone Contact')}
                </label>
                <input
                  type="text"
                  className="w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  {tx('users.avatar_url', 'Avatar Image URL')}
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full bg-[#F8F9FA] dark:bg-[#374151] border border-slate-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white dark:focus:bg-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/20"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedUser(null);
                  }}
                  className="w-1/3 py-2.5 border border-slate-200 dark:border-gray-700 bg-white dark:bg-[#374151] text-[#60708F] dark:text-gray-200 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-[#374151]"
                >
                  {tx('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-2/3 py-2.5 bg-[#17233C] hover:bg-[#203152] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-save"></i>}
                  {tx('common.save_changes', 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Change Role (PATCH /auth/change-role) */}
      {isRoleModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-[#17233C]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-[#E89A5B]/15 text-[#E89A5B] flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <h3 className="text-lg font-black text-[#17233C] dark:text-white mb-1">
              {tx('users.change_role_title', 'Access Role Permission')}
            </h3>
            <p className="text-xs text-[#60708F] mb-4">
              {tx('users.change_role_confirm_desc', 'Set system permission level for')}: <strong>{selectedUser.username}</strong>
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setTargetRole('customer')}
                className={`py-3 px-4 rounded-xl border text-xs font-black flex items-center justify-center gap-2 transition-all ${
                  targetRole === 'customer'
                    ? 'border-[#17233C] bg-[#17233C] text-white shadow-sm'
                    : 'border-slate-200 dark:border-gray-700 text-[#60708F] hover:bg-slate-50 dark:hover:bg-[#374151]'
                }`}
              >
                <i className="fa-solid fa-user"></i>
                Customer
              </button>
              <button
                type="button"
                onClick={() => setTargetRole('admin')}
                className={`py-3 px-4 rounded-xl border text-xs font-black flex items-center justify-center gap-2 transition-all ${
                  targetRole === 'admin'
                    ? 'border-[#E89A5B] bg-[#E89A5B] text-white shadow-sm'
                    : 'border-slate-200 dark:border-gray-700 text-[#60708F] hover:bg-slate-50 dark:hover:bg-[#374151]'
                }`}
              >
                <i className="fa-solid fa-shield-halved"></i>
                Admin
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsRoleModalOpen(false);
                  setSelectedUser(null);
                }}
                className="w-1/2 py-2.5 border border-slate-200 dark:border-gray-700 bg-white dark:bg-[#374151] text-[#60708F] dark:text-gray-200 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-[#374151]"
              >
                {tx('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleChangeRoleSubmit}
                className="w-1/2 py-2.5 bg-[#17233C] hover:bg-[#203152] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {actionLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
                {tx('users.apply', 'Apply Role')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation (DELETE /users/{id}) */}
      {userToDelete && (
        <div className="fixed inset-0 bg-[#17233C]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 className="text-lg font-black text-[#17233C] dark:text-white mb-1">
              {tx('users.delete_dialog_title', 'Delete User Account?')}
            </h3>
            <p className="text-xs text-[#60708F] mb-6 leading-relaxed">
              {tx('users.delete_dialog_warning', 'Are you sure you want to permanently delete')}{' '}
              <strong className="text-[#17233C] dark:text-white">{userToDelete.username || userToDelete.email}</strong>?{' '}
              {tx('users.irreversible_action', 'This operation cannot be undone.')}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="w-1/2 py-2.5 border border-slate-200 dark:border-gray-700 bg-white dark:bg-[#374151] text-[#60708F] dark:text-gray-200 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-[#374151]"
              >
                {tx('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={confirmDelete}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {actionLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-trash"></i>}
                {tx('common.confirm_delete', 'Confirm Delete')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersPage;