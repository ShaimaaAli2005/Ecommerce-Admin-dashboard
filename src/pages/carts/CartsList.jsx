import { useEffect, useState } from "react";
import { getAdminCarts } from "../../api/cartApi";

function CartsList() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCarts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminCarts();

      setCarts(data.carts || []);
    } catch (error) {
      console.error("Get admin carts error:", error);
      setError("Failed to load carts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#111827] flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-14 h-14 border-4 border-[#E89A5B]/30 border-t-[#E89A5B] rounded-full animate-spin"></div>

          <span className="absolute text-xs font-bold tracking-widest text-[#17233C] dark:text-white">
            LUMA
          </span>
        </div>

        <p className="text-xs font-medium text-[#60708F] dark:text-gray-400">
          Loading LUMA Dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (carts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold dark:text-white">
          Shopping Carts
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            No active carts found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          Shopping Carts
        </h1>

        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {carts.length} active cart{carts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-6">
        {carts.map((cart) => (
          <div
            key={cart._id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Customer Information */}
            <div className="mb-5 border-b border-gray-200 pb-4 dark:border-gray-700">
              <h2 className="text-lg font-semibold dark:text-white">
                {cart.user?.username || "Unknown User"}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {cart.user?.email || "No email"}
              </p>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 dark:border-gray-700"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold dark:text-white">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      ${item.price}
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-[#E89A5B]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Items
                </p>

                <p className="font-semibold dark:text-white">
                  {cart.itemCount}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Subtotal
                </p>

                <p className="text-xl font-bold text-[#E89A5B]">
                  ${Number(cart.subtotal || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartsList;