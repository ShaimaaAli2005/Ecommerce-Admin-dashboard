import axiosInstance from "./axiosInstance";

// Get current user's cart
export const getCart = async () => {
  const response = await axiosInstance.get("/carts");
  return response.data;
};

// Get all active carts for admin
export const getAdminCarts = async (page = 1, limit = 20) => {
  const response = await axiosInstance.get("/orders/admin/carts", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

// Add product to cart
export const addToCart = async (productId, quantity) => {
  const response = await axiosInstance.post("/carts/items", {
    productId,
    quantity,
  });

  return response.data;
};

// Update product quantity
export const updateCartItem = async (productId, quantity) => {
  const response = await axiosInstance.patch("/carts/items", {
    productId,
    quantity,
  });

  return response.data;
};

// Remove product from cart
export const removeCartItem = async (productId) => {
  const response = await axiosInstance.delete(
    `/carts/items/${productId}`
  );

  return response.data;
};

// Apply coupon
export const applyCoupon = async (code) => {
  const response = await axiosInstance.post("/carts/coupon", {
    code,
  });

  return response.data;
};

// Remove coupon
export const removeCoupon = async () => {
  const response = await axiosInstance.delete("/carts/coupon");

  return response.data;
};

// Clear cart
export const clearCart = async () => {
  const response = await axiosInstance.delete("/carts/clear");

  return response.data;
};