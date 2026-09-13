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
  const [addForm, setAddForm] = useState({ username: '', email: '', password: '', phone: '' });
  const [editForm, setEditForm] = useState({ username: '', phone: '', avatar: '' });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getAllUsers();
      // دعم مختلف أشكال الـ Response من الباك إيند
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
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Add User (تم التعديل لضمان العمل وإضافة المستخدم)
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userService.addUser(addForm);
      const newUser = response?.data?.user || response?.user || response?.data;
      
      // إذا رجع المستخدم الجديد نضيفه مباشرة للقائمة أو نعيد تحميل القائمة
      if (newUser && typeof newUser === 'object' && !Array.isArray(newUser)) {
        setUsers((prevUsers) => [newUser, ...prevUsers]);
      } else {
        await fetchUsers();
      }

      setAddForm({ username: '', email: '', password: '', phone: '' });
      setShowAddForm(false);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  // Open Edit Modal with selected user's data
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username || user.name || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
    });
    setIsEditOpen(true);
  };

  // Save Edit Changes via API
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const userId = selectedUser._id || selectedUser.id;
      await userService.updateUser(userId, editForm);
      setIsEditOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user');
    }
  };

  // Toggle Verification Status
  const handleToggleVerified = async (user) => {
    const userId = user._id || user.id;
    try {
      await userService.updateUser(userId, { isVerified: !user.isVerified });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update verification status');
    }
  };

  // Delete User via API
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  // Search Filtering (تفعيل الفلترة والبحث الفعلي)
  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const username = (u.username || u.name || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const phone = (u.phone || '').toLowerCase();

    return username.includes(query) || email.includes(query) || phone.includes(query);
  });

  // Dynamic Calculations
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const customerCount = users.filter((u) => u.role === 'customer' || !u.role || u.role === 'user').length;
  const verifiedCount = users.filter((u) => u.isVerified).length;

  return (
    <div className="p-6 md:p-8 bg-[#F7F5F0] min-h-screen text-[#17233C] font-sans">
      
      {/* Top Bar Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#E89A5B] uppercase">
            USER MANAGEMENT
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#17233C] mt-1">
            Manage Users
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Box - شغال ويعمل فلترة مباشرة */}
          <div className="relative w-full sm:w-72">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search users by name, email..."
              className="w-full bg-[#F7F5F0]/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#17233C] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Add User Toggle Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#17233C] hover:bg-[#60708F] text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#17233C]/10 flex items-center justify-center gap-2"
          >
            <i className={`fa-solid ${showAddForm ? 'fa-minus' : 'fa-user-plus'}`}></i>
            <span>Add User</span>
            <i className={`fa-solid ${showAddForm ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs ml-1`}></i>
          </button>
        </div>
      </div>

      {/* Expandable Add User Form */}
      {showAddForm && (
        <div className="bg-white border border-[#E89A5B]/30 rounded-2xl p-6 mb-6 relative shadow-sm transition-all animate-in fade-in duration-200">
          <button
            onClick={() => setShowAddForm(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-[#17233C] p-1"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#17233C] text-[#E89A5B] flex items-center justify-center text-lg shadow-sm">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17233C]">Create New User</h3>
              <p className="text-xs text-slate-500">Fill in the details below to add a new user</p>
            </div>
          </div>

          <form onSubmit={handleAddSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  USERNAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. john_doe"
                  className="w-full bg-[#F7F5F0]/60 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#17233C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C]"
                  value={addForm.username}
                  onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@email.com"
                  className="w-full bg-[#F7F5F0]/60 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#17233C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C]"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  PASSWORD *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min. 6 characters"
                  className="w-full bg-[#F7F5F0]/60 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#17233C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C]"
                  value={addForm.password}
                  onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  PHONE
                </label>
                <input
                  type="text"
                  placeholder="e.g. +1234567890"
                  className="w-full bg-[#F7F5F0]/60 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#17233C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C]"
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">* Required fields</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddForm({ username: '', email: '', password: '', phone: '' })}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-[#F7F5F0] text-[#60708F] rounded-xl text-xs font-semibold transition-all"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#17233C] hover:bg-[#60708F] text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <i className="fa-solid fa-user-plus"></i> Create User
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Dynamic 4 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] mb-1">Total Users</p>
            <h3 className="text-3xl font-black text-[#17233C]">{totalUsers}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] mb-1">Admins</p>
            <h3 className="text-3xl font-black text-[#17233C]">{adminCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] mb-1">Customers</p>
            <h3 className="text-3xl font-black text-[#17233C]">{customerCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-user-group"></i>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#60708F] mb-1">Verified</p>
            <h3 className="text-3xl font-black text-[#17233C]">{verifiedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] text-[#E89A5B] flex items-center justify-center text-xl shadow-inner">
            <i className="fa-solid fa-user-check"></i>
          </div>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="p-12 text-center text-[#60708F] font-medium flex items-center justify-center gap-3">
            <i className="fa-solid fa-circle-notch fa-spin text-xl text-[#E89A5B]"></i>
            <span>Loading users list...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-600 font-medium">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-[#60708F] uppercase tracking-wider bg-[#F7F5F0]/40">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Verified</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-slate-400">
                      No users match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const userName = u.username || u.name || 'User';
                    const userId = u._id || u.id;
                    return (
                      <tr key={userId} className="hover:bg-[#F7F5F0]/30 transition-colors">
                        {/* User Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={
                                u.avatar ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
                              }
                              alt={userName}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-[#F7F5F0]"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40';
                              }}
                            />
                            <div>
                              <span className="block font-bold text-[#17233C] leading-tight">
                                {userName}
                              </span>
                              <span className="text-xs text-slate-400">{u.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${
                              u.role === 'admin'
                                ? 'bg-[#E89A5B]/15 text-[#E89A5B]'
                                : 'bg-[#60708F]/15 text-[#60708F]'
                            }`}
                          >
                            {u.role || 'customer'}
                          </span>
                        </td>

                        {/* Verified Status */}
                        <td className="py-4 px-6">
                          {u.isVerified ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                              <i className="fa-solid fa-square-check text-emerald-500 text-sm"></i>
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                              <i className="fa-solid fa-xmark text-slate-400 text-sm"></i>
                              No
                            </span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Edit Button */}
                            <button
                              onClick={() => openEditModal(u)}
                              className="w-8 h-8 rounded-lg bg-[#60708F] hover:bg-[#17233C] text-white flex items-center justify-center text-xs transition-all shadow-sm"
                              title="Edit User"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>

                            {/* Security/Verify Toggle Button */}
                            <button
                              onClick={() => handleToggleVerified(u)}
                              className="w-8 h-8 rounded-lg bg-[#E89A5B] hover:bg-[#d48748] text-white flex items-center justify-center text-xs transition-all shadow-sm"
                              title="Toggle Verification Status"
                            >
                              <i className="fa-solid fa-shield"></i>
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(userId)}
                              className="w-8 h-8 rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-xs transition-all shadow-sm"
                              title="Delete User"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Edit User Modal Overlay */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-[#17233C]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-[#17233C]">Edit User</h3>
              <button
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedUser(null);
                }}
                className="text-slate-400 hover:text-[#17233C] p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  USERNAME
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#F7F5F0]/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C]"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  PHONE
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full bg-[#F7F5F0]/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C]"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#60708F] uppercase tracking-wider mb-1.5">
                  AVATAR URL
                </label>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  className="w-full bg-[#F7F5F0]/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#17233C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#60708F]/30 focus:border-[#17233C]"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                />
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedUser(null);
                  }}
                  className="w-1/3 py-2.5 border border-slate-200 bg-white hover:bg-[#F7F5F0] text-[#60708F] rounded-xl text-sm font-semibold transition-all"
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
