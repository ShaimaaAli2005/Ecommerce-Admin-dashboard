import { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../api/cartApi";

function CartsList() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCart();

      setCart(data);
    } catch (error) {
      console.error("Get cart error:", error);
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (item) => {
    try {
      const updatedCart = await updateCartItem(
        item.product,
        item.quantity + 1
      );

      setCart(updatedCart);
    } catch (error) {
      console.error("Update cart error:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;

    try {
      const updatedCart = await updateCartItem(
        item.product,
        item.quantity - 1
      );

      setCart(updatedCart);
    } catch (error) {
      console.error("Update cart error:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId);

      setCart(updatedCart);
    } catch (error) {
      console.error("Remove cart item error:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      const updatedCart = await clearCart();

      setCart(updatedCart);
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

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

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Shopping Cart
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            Your cart is empty.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-1 text-gray-500">
            {cart.itemCount} items
          </p>
        </div>

        <button
          onClick={handleClearCart}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
       
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold">
                  {item.name}
                </h2>

                <p className="mt-1 text-gray-500">
                  ${item.price}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="h-8 w-8 rounded border"
                  >
                    -
                  </button>

                  <span className="min-w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleIncrease(item)}
                    className="h-8 w-8 rounded border"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.product)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>


        <div className="h-fit rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-5 text-xl font-semibold">
            Cart Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Items
              </span>

              <span>{cart.itemCount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span>${cart.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Discount
              </span>

              <span className="text-green-600">
                -${cart.discountAmount}
              </span>
            </div>

            {cart.coupon && (
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Coupon
                </span>

                <span>{cart.coupon}</span>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cart.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartsList;