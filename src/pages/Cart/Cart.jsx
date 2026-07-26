import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { supabase } from "../../supabaseClient";
import {
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
} from "../../api/cartApi";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

const fetchCart = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCart([]);
      return;
    }

    const res = await getCart(user.id);

    setCart(res.data);

  } catch (err) {
    console.error(err);
  }
};

  // Step 27 - Increase Quantity
  const handleIncrease = async (id) => {
    try {
      await increaseQuantity(id);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Step 28 - Decrease Quantity
  const handleDecrease = async (id) => {
    try {
      await decreaseQuantity(id);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Step 29 - Remove Item
  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Remove this item from your cart?"
    );

    if (!confirmDelete) return;

    try {
      await removeCartItem(id);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Step 30 - Calculate Totals
  const subtotal = cart.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 20 : 0;

  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen text-white pt-28">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 mb-10">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900 p-6 rounded-xl mb-5 flex items-center gap-6"
                >
                  <img
                    src={item.products.image}
                    alt={item.products.name}
                    className="w-36 h-36 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {item.products.name}
                    </h2>

                    <p className="text-yellow-400 text-xl mt-2">
                      ${item.products.price}
                    </p>

                    <p className="mt-3">
                      Quantity: {item.quantity}
                    </p>

                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg"
                      >
                        -
                      </button>

                      <span className="text-lg font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="mt-4 bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2 rounded-lg"
                    >
                      🗑 Remove
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-yellow-400 text-2xl font-bold">
                      ${(item.products.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Cart Summary */}

              <div className="bg-zinc-900 rounded-xl p-8 mt-10">

                <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between text-xl mb-4">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xl mb-4">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <hr className="border-zinc-700 my-5" />

                <div className="flex justify-between text-3xl font-bold text-yellow-400">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex gap-4 mt-8">

                  <button
                    onClick={() => navigate("/shop")}
                    className="flex-1 border border-yellow-400 text-yellow-400 py-4 rounded-xl hover:bg-yellow-400 hover:text-black transition"
                  >
                    ← Continue Shopping
                  </button>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition"
                  >
                    Proceed to Checkout →
                  </button>

                </div>

              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;