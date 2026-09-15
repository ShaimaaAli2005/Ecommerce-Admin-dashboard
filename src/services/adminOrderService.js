import axiosInstance from '../api/axiosInstance';

const adminOrderService = {
  // Get all orders
  getAllOrders: async (params = {}) => {
    const response = await axiosInstance.get('/orders/admin', { params });
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await axiosInstance.get(`/orders/admin/${id}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await axiosInstance.patch(
      `/orders/admin/${id}/status`,
      {
        status,
      }
    );
    return response.data;
  },
};

export default adminOrderService;

