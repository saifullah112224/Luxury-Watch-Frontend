import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen text-white flex items-center justify-center px-6">

        <div className="bg-zinc-900 rounded-3xl p-12 text-center max-w-xl w-full shadow-2xl">

          <div className="text-7xl mb-6">
            ✅
          </div>

          <h1 className="text-5xl font-bold text-yellow-400 mb-6">
            Order Placed!
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Thank you for shopping with
            <span className="text-yellow-400 font-bold">
              {" "}TimeLuxe
            </span>
          </p>

          {order && (
            <>
              <div className="bg-black rounded-xl p-6 mb-8">

                <h2 className="text-xl font-bold mb-4">
                  Order Details
                </h2>

                <p className="mb-2">
                  <strong>Order ID:</strong> #{order.id}
                </p>

                <p className="mb-2">
                  <strong>Name:</strong> {order.customer_name}
                </p>

                <p className="mb-2">
                  <strong>Total:</strong> ${order.total}
                </p>

                <p>
                  <strong>Payment:</strong> {order.payment_method}
                </p>

              </div>
            </>
          )}

          <button
            onClick={() => navigate("/shop")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-4 rounded-xl transition"
          >
            Continue Shopping
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Success;