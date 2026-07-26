import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";

import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { getAnalytics } from "../../api/analyticsApi";

function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {

      const res = await getAnalytics();

      setAnalytics(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  if (!analytics) {

    return (
      <>
        <Navbar />

        

        <div className="min-h-screen bg-black flex justify-center items-center text-white text-3xl">

          Loading Analytics...

        </div>

        <Footer />
      </>
    );

  }

  return (

    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28">

  <Link
    to="/admin"
    className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-xl font-bold transition"
  >
    ← Back to Dashboard
  </Link>

</div>

      <div className="min-h-screen bg-black text-white pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 text-center mb-12">

            Analytics Dashboard

          </h1>

          {/* Statistics */}

          <div className="grid md:grid-cols-4 gap-8">

            {/* Revenue */}

            <div className="bg-zinc-900 rounded-3xl p-8">

              <FaDollarSign className="text-yellow-400 text-5xl mb-4" />

              <p className="text-gray-400">
                Total Revenue
              </p>

              <h2 className="text-4xl font-bold">
                ${analytics.totalRevenue}
              </h2>

            </div>

            {/* Orders */}

            <div className="bg-zinc-900 rounded-3xl p-8">

              <FaShoppingCart className="text-yellow-400 text-5xl mb-4" />

              <p className="text-gray-400">
                Total Orders
              </p>

              <h2 className="text-4xl font-bold">
                {analytics.totalOrders}
              </h2>

            </div>

            {/* Users */}

            <div className="bg-zinc-900 rounded-3xl p-8">

              <FaUsers className="text-yellow-400 text-5xl mb-4" />

              <p className="text-gray-400">
                Total Users
              </p>

              <h2 className="text-4xl font-bold">
                {analytics.totalUsers}
              </h2>

            </div>

            {/* Products */}

            <div className="bg-zinc-900 rounded-3xl p-8">

              <FaBoxOpen className="text-yellow-400 text-5xl mb-4" />

              <p className="text-gray-400">
                Total Products
              </p>

              <h2 className="text-4xl font-bold">
                {analytics.totalProducts}
              </h2>

            </div>

          </div>

          {/* Order Status */}

          <div className="grid md:grid-cols-3 gap-8 mt-10">

            <div className="bg-zinc-900 rounded-3xl p-8">

              <FaTruck className="text-yellow-400 text-5xl mb-4" />

              <p className="text-gray-400">
                Processing Orders
              </p>

              <h2 className="text-4xl font-bold">

                {analytics.processingOrders}

              </h2>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">

              <FaCheckCircle className="text-green-400 text-5xl mb-4" />

              <p className="text-gray-400">
                Delivered Orders
              </p>

              <h2 className="text-4xl font-bold">

                {analytics.deliveredOrders}

              </h2>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">

              <FaTimesCircle className="text-red-400 text-5xl mb-4" />

              <p className="text-gray-400">
                Cancelled Orders
              </p>

              <h2 className="text-4xl font-bold">

                {analytics.cancelledOrders}

              </h2>

            </div>

          </div>
                    {/* Payment Statistics */}

          <div className="mt-12 bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">
              Payment Methods
            </h2>

            {Object.keys(analytics.paymentStats).length === 0 ? (

              <p className="text-gray-400">
                No Payment Data Found
              </p>

            ) : (

              <div className="grid md:grid-cols-3 gap-6">

                {Object.entries(analytics.paymentStats).map(
                  ([method, total]) => (

                    <div
                      key={method}
                      className="bg-black rounded-2xl p-6 border border-zinc-700"
                    >

                      <h3 className="text-xl font-bold">
                        {method}
                      </h3>

                      <p className="text-yellow-400 text-3xl mt-3">
                        {total}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* Low Stock Products */}

          <div className="mt-12 bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-yellow-400 mb-8">
              Low Stock Products
            </h2>

            {analytics.lowStockProducts.length === 0 ? (

              <p className="text-green-400">
                All Products Have Good Stock
              </p>

            ) : (

              <div className="space-y-5">

                {analytics.lowStockProducts.map((product) => (

                  <div
                    key={product.id}
                    className="flex justify-between items-center bg-black rounded-xl p-5"
                  >

                    <div className="flex items-center gap-5">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div>

                        <h3 className="text-xl font-bold">
                          {product.name}
                        </h3>

                        <p className="text-red-400">
                          Stock Left: {product.stock}
                        </p>

                      </div>

                    </div>

                    <span className="bg-red-600 px-4 py-2 rounded-full font-bold">
                      LOW STOCK
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

      <Footer />

    </>
  );

}

export default Analytics;