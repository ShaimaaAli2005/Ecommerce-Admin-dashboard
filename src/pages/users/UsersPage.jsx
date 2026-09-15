import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle Add User Form
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Forms data
  const [addForm, setAddForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [editForm, setEditForm] = useState({
    username: '',
    phone: '',
    avatar: '',
  });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await userService.getAllUsers();
      const data = response?.data || response;

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to load users'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Add User
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await userService.addUser(addForm);

      const newUser =
        response?.data?.user ||
        response?.user ||
        response?.data;

      if (
        newUser &&
        typeof newUser === 'object' &&
        !Array.isArray(newUser)
      ) {
        setUsers((prevUsers) => [
          newUser,
          ...prevUsers,
        ]);
      } else {
        await fetchUsers();
      }

      setAddForm({
        username: '',
        email: '',
        password: '',
        phone: '',
      });

      setShowAddForm(false);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.message ||
        'Failed to add user'
      );
    } finally {
      setLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser(user);

    setEditForm({
      username: user.username || user.name || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
    });

    setIsEditOpen(true);
  };

  // Save Edit Changes
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    try {
      const userId =
        selectedUser._id || selectedUser.id;

      await userService.updateUser(
        userId,
        editForm
      );

      setIsEditOpen(false);
      setSelectedUser(null);

      fetchUsers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Failed to update user'
      );
    }
  };

  // Toggle Verification Status
  const handleToggleVerified = async (user) => {
    const userId = user._id || user.id;

    try {
      await userService.updateUser(userId, {
        isVerified: !user.isVerified,
      });

      fetchUsers();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Failed to update verification status'
      );
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this user?'
      )
    ) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        alert(
          err.response?.data?.message ||
          'Failed to delete user'
        );
      }
    }
  };

  // Search Filtering
  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    const username = (
      u.username ||
      u.name ||
      ''
    ).toLowerCase();

    const email = (
      u.email || ''
    ).toLowerCase();

    const phone = (
      u.phone || ''
    ).toLowerCase();

    return (
      username.includes(query) ||
      email.includes(query) ||
      phone.includes(query)
    );
  });

  // Dynamic Calculations
  const totalUsers = users.length;

  const adminCount = users.filter(
    (u) => u.role === 'admin'
  ).length;

  const customerCount = users.filter(
    (u) =>
      u.role === 'customer' ||
      !u.role ||
      u.role === 'user'
  ).length;

  const verifiedCount = users.filter(
    (u) => u.isVerified
  ).length;

  return (
    <div className="p-6 md:p-8 bg-[#F7F5F0] dark:bg-slate-950 min-h-screen text-[#17233C] dark:text-slate-100 font-sans">

      {/* Top Bar Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <span className="text-xs font-bold tracking-widest text-[#E89A5B] uppercase">
            USER MANAGEMENT
          </span>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#17233C] dark:text-white mt-1">
            Manage Users
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">

          {/* Search Box */}
          <div className="relative w-full sm:w-72">

            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>

            <input
              type="text"
              placeholder="Search users by name, email..."
              className="w-full bg-[#F7F5F0]/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#17233C] dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B] transition-all"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>

          {/* Add User Button */}
          <button
            onClick={() =>
              setShowAddForm(!showAddForm)
            }
            className="w-full sm:w-auto px-5 py-2.5 bg-[#17233C] hover:bg-[#60708F] text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#17233C]/10 flex items-center justify-center gap-2"
          >
            <i
              className={`fa-solid ${
                showAddForm
                  ? 'fa-minus'
                  : 'fa-user-plus'
              }`}
            ></i>

            <span>Add User</span>

            <i
              className={`fa-solid ${
                showAddForm
                  ? 'fa-chevron-up'
                  : 'fa-chevron-down'
              } text-xs ml-1`}
            ></i>
          </button>
        </div>
      </div>

      {/* Expandable Add User Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 border border-[#E89A5B]/30 rounded-2xl p-6 mb-6 relative shadow-sm transition-all animate-in fade-in duration-200">

          <button
            onClick={() =>
              setShowAddForm(false)
            }
            className="absolute top-4 right-4 text-slate-400 hover:text-[#17233C] dark:hover:text-white p-1"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-[#17233C] text-[#E89A5B] flex items-center justify-center text-lg shadow-sm">
              <i className="fa-solid fa-user-plus"></i>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#17233C] dark:text-white">
                Create New User
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fill in the details below to add a new user
              </p>
            </div>
          </div>

          <form onSubmit={handleAddSubmit}>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

              {/* Username */}
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  USERNAME *
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. john_doe"
                  className="w-full bg-[#F7F5F0]/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-[#17233C] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B]"
                  value={addForm.username}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      username: e.target.value,
                    })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  EMAIL *
                </label>

                <input
                  type="email"
                  required
                  placeholder="e.g. john@email.com"
                  className="w-full bg-[#F7F5F0]/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-[#17233C] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B]"
                  value={addForm.email}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  PASSWORD *
                </label>

                <input
                  type="password"
                  required
                  placeholder="Min. 6 characters"
                  className="w-full bg-[#F7F5F0]/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-[#17233C] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B]"
                  value={addForm.password}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  PHONE
                </label>

                <input
                  type="text"
                  placeholder="e.g. +1234567890"
                  className="w-full bg-[#F7F5F0]/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-[#17233C] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B]"
                  value={addForm.phone}
                  onChange={(e) =>
                    setAddForm({
                      ...addForm,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="flex justify-between items-center pt-2">

              <span className="text-xs text-slate-400">
                * Required fields
              </span>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setAddForm({
                      username: '',
                      email: '',
                      password: '',
                      phone: '',
                    })
                  }
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#F7F5F0] dark:hover:bg-slate-700 text-[#60708F] dark:text-slate-300 rounded-xl text-xs font-semibold transition-all"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#17233C] hover:bg-[#60708F] text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  Create User
                </button>

              </div>
            </div>

          </form>
        </div>
      )}

      {/* Dynamic 4 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total Users */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] dark:text-slate-400 mb-1">
              Total Users
            </p>

            <h3 className="text-3xl font-black text-[#17233C] dark:text-white">
              {totalUsers}
            </h3>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] dark:bg-slate-800 text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] dark:text-slate-400 mb-1">
              Admins
            </p>

            <h3 className="text-3xl font-black text-[#17233C] dark:text-white">
              {adminCount}
            </h3>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] dark:bg-slate-800 text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] dark:text-slate-400 mb-1">
              Customers
            </p>

            <h3 className="text-3xl font-black text-[#17233C] dark:text-white">
              {customerCount}
            </h3>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] dark:bg-slate-800 text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-user-group"></i>
          </div>
        </div>

        {/* Verified */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] dark:text-slate-400 mb-1">
              Verified
            </p>

            <h3 className="text-3xl font-black text-[#17233C] dark:text-white">
              {verifiedCount}
            </h3>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] dark:bg-slate-800 text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-user-check"></i>
          </div>
        </div>

      </div>

   {/* Users Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700 shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

          <div>
            <h2 className="text-lg font-bold text-[#17233C] dark:text-white">
              Users List
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>

          <div className="text-xs text-[#60708F] dark:text-slate-400 font-medium">
            {filteredUsers.length} Results
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">

            <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-[#E89A5B] rounded-full animate-spin"></div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Loading users...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="p-8 text-center">

            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 dark:bg-red-950/40 text-[#C95C5C] flex items-center justify-center text-xl mb-3">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h3 className="font-bold text-[#17233C] dark:text-white">
              Failed to load users
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {error}
            </p>

            <button
              onClick={fetchUsers}
              className="mt-4 px-5 py-2 bg-[#17233C] hover:bg-[#60708F] text-white rounded-xl text-sm font-semibold transition-all"
            >
              <i className="fa-solid fa-rotate-right mr-2"></i>
              Try Again
            </button>

          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="py-16 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F7F5F0] dark:bg-slate-800 text-[#60708F] dark:text-slate-400 flex items-center justify-center text-2xl mb-4">
              <i className="fa-solid fa-users-slash"></i>
            </div>

            <h3 className="font-bold text-[#17233C] dark:text-white">
              No users found
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try changing your search or add a new user.
            </p>

          </div>
        )}

        {/* Users Table */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="bg-[#F7F5F0]/60 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700">

                  <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#60708F] dark:text-slate-400">
                    User
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#60708F] dark:text-slate-400">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#60708F] dark:text-slate-400">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#60708F] dark:text-slate-400">
                    Role
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#60708F] dark:text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-[#60708F] dark:text-slate-400">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                {filteredUsers.map((user) => {

                  const userId =
                    user._id || user.id;

                  const username =
                    user.username ||
                    user.name ||
                    'Unknown User';

                  const avatar =
                    user.avatar ||
                    user.image ||
                    user.profilePicture ||
                    '';

                  return (
                    <tr
                      key={userId}
                      className="hover:bg-[#F7F5F0]/40 dark:hover:bg-slate-800/50 transition-colors"
                    >

                      {/* User */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          {avatar ? (
                            <img
                              src={avatar}
                              alt={username}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-[#17233C] text-[#E89A5B] flex items-center justify-center font-bold">
                              {username
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">

                            <p className="font-semibold text-sm text-[#17233C] dark:text-white truncate max-w-[180px]">
                              {username}
                            </p>

                            <p className="text-xs text-slate-400 mt-0.5">
                              ID: {userId}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Email */}
                      <td className="px-5 py-4">

                        <span className="text-sm text-[#60708F] dark:text-slate-300">
                          {user.email || '—'}
                        </span>

                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">

                        <span className="text-sm text-[#60708F] dark:text-slate-300">
                          {user.phone || '—'}
                        </span>

                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${
                            user.role === 'admin'
                              ? 'bg-[#17233C] text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-[#60708F] dark:text-slate-300'
                          }`}
                        >
                          {user.role || 'customer'}
                        </span>

                      </td>

                      {/* Verification Status */}
                      <td className="px-5 py-4">

                        <button
                          onClick={() =>
                            handleToggleVerified(user)
                          }
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            user.isVerified
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#4F8A70]'
                              : 'bg-red-50 dark:bg-red-950/40 text-[#C95C5C]'
                          }`}
                        >

                          <i
                            className={`fa-solid ${
                              user.isVerified
                                ? 'fa-circle-check'
                                : 'fa-circle-xmark'
                            }`}
                          ></i>

                          {user.isVerified
                            ? 'Verified'
                            : 'Unverified'}

                        </button>

                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">

                        <div className="flex justify-end items-center gap-2">

                          {/* Edit */}
                          <button
                            onClick={() =>
                              openEditModal(user)
                            }
                            title="Edit User"
                            className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 text-[#60708F] dark:text-slate-300 hover:bg-[#17233C] hover:text-white transition-all flex items-center justify-center"
                          >
                            <i className="fa-solid fa-pen-to-square text-xs"></i>
                          </button>

                          {/* Verify */}
                          <button
                            onClick={() =>
                              handleToggleVerified(user)
                            }
                            title={
                              user.isVerified
                                ? 'Unverify User'
                                : 'Verify User'
                            }
                            className={`w-9 h-9 rounded-lg transition-all flex items-center justify-center ${
                              user.isVerified
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#4F8A70] hover:bg-[#4F8A70] hover:text-white'
                                : 'bg-orange-50 dark:bg-orange-950/30 text-[#E89A5B] hover:bg-[#E89A5B] hover:text-white'
                            }`}
                          >
                            <i
                              className={`fa-solid ${
                                user.isVerified
                                  ? 'fa-user-check'
                                  : 'fa-user-clock'
                              } text-xs`}
                            ></i>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDelete(userId)
                            }
                            title="Delete User"
                            className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/30 text-[#C95C5C] hover:bg-[#C95C5C] hover:text-white transition-all flex items-center justify-center"
                          >
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>




   
     {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-[#17233C]/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-150">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-700">

              <h3 className="text-lg font-extrabold text-[#17233C] dark:text-white">
                Edit User
              </h3>

              <button
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedUser(null);
                }}
                className="text-slate-400 hover:text-[#17233C] dark:hover:text-white p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>

            </div>

            {/* Edit Form */}
            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col gap-4"
            >

              {/* Username */}
              <div>

                <label className="block text-[11px] font-bold text-[#60708F] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  USERNAME
                </label>

                <input
                  type="text"
                  required
                  className="w-full bg-[#F7F5F0]/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B]"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      username: e.target.value,
                    })
                  }
                />

              </div>

              {/* Phone */}
              <div>

                <label className="block text-[11px] font-bold text-[#60708F] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  PHONE
                </label>

                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full bg-[#F7F5F0]/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B]"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      phone: e.target.value,
                    })
                  }
                />

              </div>

              {/* Avatar URL */}
              <div>

                <label className="block text-[11px] font-bold text-[#60708F] dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  AVATAR URL
                </label>

                <input
                  type="text"
                  placeholder="Avatar URL"
                  className="w-full bg-[#F7F5F0]/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] dark:focus:border-[#E89A5B]"
                  value={editForm.avatar}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      avatar: e.target.value,
                    })
                  }
                />

              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-3">

                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedUser(null);
                  }}
                  className="w-1/3 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#F7F5F0] dark:hover:bg-slate-700 text-[#60708F] dark:text-slate-300 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#17233C] hover:bg-[#60708F] text-white rounded-xl text-sm font-bold shadow-md shadow-[#17233C]/10 transition-all"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default UsersPage;