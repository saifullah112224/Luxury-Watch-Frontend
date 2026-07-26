import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getCart } from "../../api/cartApi";
import { placeOrder } from "../../api/orderApi";
import { supabase } from "../../supabaseClient";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
    payment_method: "Cash on Delivery",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 20 : 0;

  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first.");
    return;
  }

  try {
    const res = await placeOrder({
      user_id: user.id,
      ...form,
      total,
    });

    alert("Order Placed Successfully");

    navigate("/success", {
      state: {
        order: res.data,
      },
    });

  } catch (err) {
  console.log("Axios Error:", err);
  console.log("Response:", err.response);
  console.log("Backend:", err.response?.data);

  alert("Failed to place order.");
}
};

  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen text-white pt-28 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 mb-10">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT */}

            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900 rounded-xl p-8"
            >

              <h2 className="text-3xl font-bold mb-8">
                Customer Information
              </h2>

              <input
                name="customer_name"
                placeholder="Full Name"
                className="w-full p-4 rounded bg-black mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded bg-black mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                className="w-full p-4 rounded bg-black mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="address"
                placeholder="Address"
                className="w-full p-4 rounded bg-black mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="city"
                placeholder="City"
                className="w-full p-4 rounded bg-black mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="postal_code"
                placeholder="Postal Code"
                className="w-full p-4 rounded bg-black mb-4"
                onChange={handleChange}
                required
              />

              <input
                name="country"
                placeholder="Country"
                className="w-full p-4 rounded bg-black mb-6"
                onChange={handleChange}
                required
              />

              <h3 className="text-xl font-bold mb-3">
                Payment Method
              </h3>

              <select
                name="payment_method"
                onChange={handleChange}
                className="w-full p-4 rounded bg-black mb-8"
              >
                <option>Cash on Delivery</option>
                <option>Credit Card</option>
                <option>JazzCash</option>
                <option>EasyPaisa</option>
              </select>

              <button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl"
              >
                Place Order
              </button>

            </form>

            {/* RIGHT */}

            <div className="bg-zinc-900 rounded-xl p-8">

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between mb-4"
                >
                  <span>
                    {item.products.name} × {item.quantity}
                  </span>

                  <span>
                    $
                    {(item.products.price * item.quantity).toFixed(2)}
                  </span>
                </div>

              ))}

              <hr className="my-6 border-zinc-700" />

              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <hr className="my-6 border-zinc-700" />

              <div className="flex justify-between text-3xl font-bold text-yellow-400">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Checkout;