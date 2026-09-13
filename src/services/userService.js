import axiosInstance from '../api/axiosInstance';

export const userService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get('/users/all');
    return response.data;
  },

  addUser: async (userData) => {
    const response = await axiosInstance.post('/users/add', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  }
};

export default userService;