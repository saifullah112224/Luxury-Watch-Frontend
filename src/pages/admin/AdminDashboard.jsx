import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getDashboard } from "../../api/adminApi";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) {
    alert("Please login as Admin.");
    navigate("/login");
    return;
  }

  loadDashboard();
}, [navigate]);
  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!dashboard) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">
          Loading Dashboard...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 text-center mb-14">
            Admin Dashboard
          </h1>

          <div className="flex justify-end mb-8">
  <button
    onClick={() => {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminEmail");
      navigate("/");
    }}
    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold"
  >
    Logout
  </button>
</div>

          {/* Admin Navigation */}

<div className="flex flex-wrap justify-center gap-5 mb-12">

  <Link
    to="/admin/products"
    className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold transition"
  >
    Manage Products
  </Link>

  <Link
    to="/admin/orders"
    className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-xl font-bold transition"
  >
    Manage Orders
  </Link>

  <Link
    to="/admin/users"
    className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-xl font-bold transition"
  >
    Manage Users
  </Link>

  <Link
    to="/admin/analytics"
    className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-xl font-bold transition"
  >
    Analytics
  </Link>

</div>

          {/* Statistics */}

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/20">
              <FaBoxOpen className="text-5xl text-yellow-400 mb-4" />
              <h2 className="text-gray-400">Products</h2>
              <p className="text-4xl font-bold">
                {dashboard.totalProducts}
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/20">
              <FaUsers className="text-5xl text-yellow-400 mb-4" />
              <h2 className="text-gray-400">Users</h2>
              <p className="text-4xl font-bold">
                {dashboard.totalUsers}
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/20">
              <FaShoppingCart className="text-5xl text-yellow-400 mb-4" />
              <h2 className="text-gray-400">Orders</h2>
              <p className="text-4xl font-bold">
                {dashboard.totalOrders}
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/20">
              <FaDollarSign className="text-5xl text-yellow-400 mb-4" />
              <h2 className="text-gray-400">Revenue</h2>
              <p className="text-4xl font-bold">
                ${dashboard.totalRevenue}
              </p>
            </div>

          </div>

          {/* Recent Orders */}

          <div className="mt-14 bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl text-yellow-400 font-bold mb-8">
              Recent Orders
            </h2>

            {dashboard.recentOrders.length === 0 ? (
              <p className="text-gray-400">
                No Orders Found
              </p>
            ) : (

              <div className="space-y-5">

                {dashboard.recentOrders.map((order) => (

                  <div
                    key={order.id}
                    className="flex justify-between bg-black rounded-xl p-5"
                  >
                    <div>

                      <h3 className="font-bold text-xl">
                        {order.customer_name}
                      </h3>

                      <p className="text-gray-400">
                        {new Date(order.created_at).toLocaleString()}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-yellow-400 text-2xl">
                        ${order.total}
                      </p>

                      <p className="text-green-400">
                        {order.status}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Latest Users */}

          <div className="mt-14 bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl text-yellow-400 font-bold mb-8">
              Latest Users
            </h2>

            {dashboard.latestUsers.length === 0 ? (
              <p className="text-gray-400">
                No Users Found
              </p>
            ) : (

              <div className="space-y-5">

                {dashboard.latestUsers.map((user) => (

                  <div
                    key={user.id}
                    className="flex justify-between bg-black rounded-xl p-5"
                  >
                    <div>

                      <h3 className="font-bold text-xl">
                        {user.full_name}
                      </h3>

                      <p className="text-gray-400">
                        {user.email}
                      </p>

                    </div>

                    <div className="text-yellow-400">

                      {new Date(user.created_at).toLocaleDateString()}

                    </div>

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

export default AdminDashboard;