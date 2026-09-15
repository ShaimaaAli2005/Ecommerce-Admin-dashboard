import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import adminOrderService from '../../services/adminOrderService';

const Orders = () => {
  const { t, i18n } = useTranslation('orders');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const isArabic = i18n.language === 'ar';

  const loadOrders = async (pageNumber = page, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');

      const response = await adminOrderService.getAllOrders({
        page: pageNumber,
      });

      console.log('ADMIN ORDERS RESPONSE:', response);

      const ordersData = Array.isArray(response?.orders)
        ? response.orders
        : Array.isArray(response)
        ? response
        : [];

      setOrders(ordersData);

      setCurrentPage(response?.currentPage || pageNumber);
      setTotalPages(response?.totalPages || 1);
      setTotalOrders(response?.total || ordersData.length);
    } catch (err) {
      console.error('Error loading admin orders:', err);

      setError(
        err.response?.data?.message ||
          t('loadError', 'Failed to load orders')
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrders(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingOrderId(orderId);
      setError('');

      await adminOrderService.updateOrderStatus(orderId, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);

      setError(
        err.response?.data?.message ||
          t('updateError', 'Failed to update order status')
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleRefresh = () => {
    loadOrders(page, true);
  };

  if (loading) {
    return (
      <div
        dir={isArabic ? 'rtl' : 'ltr'}
        className="flex justify-center items-center min-h-[400px]"
      >
        <p>{t('loading', 'Loading orders...')}</p>
      </div>
    );
  }

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">
            {t('title', 'Orders')}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {t('totalOrders', 'Total orders')}: {totalOrders}
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
        >
          {refreshing
            ? t('refreshing', 'Refreshing...')
            : t('refresh', 'Refresh')}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-600">
          {error}
        </div>
      )}

      {/* Empty Orders */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {t('empty', 'No orders found.')}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-5 bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
                  <div>
                    <h2 className="font-semibold">
                      {t('orderId', 'Order ID')} #{order._id}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString(
                            isArabic ? 'ar-EG' : 'en-US'
                          )
                        : ''}
                    </p>
                  </div>

                  {/* Status */}
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    disabled={updatingOrderId === order._id}
                    className="px-3 py-2 border rounded-lg bg-white disabled:opacity-50"
                  >
                    <option value="pending">
                      {t('pending', 'Pending')}
                    </option>

                    <option value="confirmed">
                      {t('confirmed', 'Confirmed')}
                    </option>

                    <option value="processing">
                      {t('processing', 'Processing')}
                    </option>

                    <option value="shipped">
                      {t('shipped', 'Shipped')}
                    </option>

                    <option value="delivered">
                      {t('delivered', 'Delivered')}
                    </option>

                    <option value="cancelled">
                      {t('cancelled', 'Cancelled')}
                    </option>
                  </select>
                </div>

                {/* Customer */}
                {(order.user || order.customer) && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">
                      {t('customer', 'Customer')}:{' '}
                      {order.user?.name ||
                        order.customer?.name ||
                        order.user?.email ||
                        order.customer?.email ||
                        '-'}
                    </p>
                  </div>
                )}

                {/* Order Items */}
                {Array.isArray(order.items) &&
                  order.items.length > 0 && (
                    <div className="mb-5 space-y-3">
                      {order.items.map((item, index) => {
                        const image =
                          item?.image ||
                          item?.product?.images?.[0]?.url;

                        return (
                          <div
                            key={item._id || index}
                            className="flex items-center gap-4 border-b pb-3"
                          >
                            {image && (
                              <img
                                src={image}
                                alt={
                                  item.name ||
                                  item.product?.name ||
                                  t('product', 'Product')
                                }
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}

                            <div className="flex-1">
                              <p className="font-medium">
                                {item.name ||
                                  item.product?.name ||
                                  t('product', 'Product')}
                              </p>

                              <p className="text-sm text-gray-500">
                                {t('quantity', 'Quantity')}:{' '}
                                {item.quantity}
                              </p>
                            </div>

                            <p className="font-medium">
                              EGP{' '}
                              {Number(
                                item.price || 0
                              ).toFixed(2)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                {/* Order Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>
                      {t('subtotal', 'Subtotal')}:
                    </span>

                    <span>
                      EGP{' '}
                      {Number(
                        order.subtotal || 0
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      {t('shipping', 'Shipping')}:
                    </span>

                    <span>
                      EGP{' '}
                      {Number(
                        order.shippingFee || 0
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      {t('tax', 'Tax')}:
                    </span>

                    <span>
                      EGP{' '}
                      {Number(
                        order.tax || 0
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>
                      {t('total', 'Total')}:
                    </span>

                    <span>
                      EGP{' '}
                      {Number(
                        order.totalPrice || 0
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <button
                onClick={() =>
                  handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('previous', 'Previous')}
              </button>

              <span className="px-4 py-2">
                {t('page', 'Page')} {currentPage}{' '}
                {t('of', 'of')} {totalPages}
              </span>

              <button
                onClick={() =>
                  handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('next', 'Next')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;