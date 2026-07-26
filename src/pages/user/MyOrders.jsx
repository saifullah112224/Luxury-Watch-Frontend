import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../supabaseClient";
import { getUserOrders } from "../../api/orderApi";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      const res = await getUserOrders(user.id);
      console.log("Orders API Response:", res.data);
      setOrders(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 text-center mb-12">
            My Orders
          </h1>

          {orders.length === 0 ? (

            <div className="bg-zinc-900 rounded-3xl p-12 text-center">

              <h2 className="text-3xl text-white mb-4">
                No Orders Yet
              </h2>

              <p className="text-gray-400">
                Your purchased watches will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-8">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/20"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-2xl text-yellow-400 font-bold">
                        Order #{order.id}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        {new Date(order.created_at).toLocaleString()}
                      </p>

                      <p className="text-gray-400 mt-2">
                        Tracking No : {order.tracking_number}
                      </p>

                      {order.estimated_delivery && (
                        <p className="text-yellow-400 mt-2">
                          Expected Delivery :{" "}
                          {new Date(
                            order.estimated_delivery
                          ).toLocaleDateString()}
                        </p>
                      )}

                    </div>

                    <div className="text-right">

                      <h2 className="text-3xl font-bold text-white">
                        ${order.total}
                      </h2>

                      <span className="inline-block mt-3 bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                        {order.status}
                      </span>

                      <p className="text-green-400 mt-3">
                        {order.payment_method}
                      </p>

                    </div>

                  </div>

                  <hr className="my-8 border-zinc-700" />

                  <div className="space-y-4">

                    {order.order_items.map((item) => (

                      <div
                        key={item.product_id}
                        className="flex justify-between items-center bg-black rounded-2xl p-5"
                      >

                        <div className="flex items-center gap-5">

                          <img
                            src={item.products?.image}
                            alt={item.products?.name}
                            className="w-24 h-24 rounded-xl object-cover"
                          />

                          <div>

                            <h3 className="text-white text-xl font-bold">
                              {item.products?.name}
                            </h3>

                            <p className="text-gray-400 mt-2">
                              Quantity : {item.quantity}
                            </p>

                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-yellow-400 text-xl">
                            ${item.price}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                  <div className="mt-8 flex justify-end">

                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold">
                      Track Order
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      <Footer />

    </>
  );
}

export default MyOrders;