import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
  FaDollarSign,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../../api/orderApi";

function ManageOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {

      setLoading(true);

      const res = await getAllOrders();

      setOrders(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (o) => o.status === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  const filteredOrders = useMemo(() => {

    return orders.filter((order) => {

      const keyword = search.toLowerCase();

      const matchesSearch =
        order.customer_name?.toLowerCase().includes(keyword) ||
        order.email?.toLowerCase().includes(keyword) ||
        order.tracking_number?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All"
          ? true
          : order.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [orders, search, statusFilter]);

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

      <div className="min-h-screen bg-black pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-10">

            <h1 className="text-5xl font-bold text-yellow-400">
              Manage Orders
            </h1>

            <p className="text-gray-400 mt-3">
              View, update and manage customer orders.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-zinc-900 rounded-2xl p-6">

              <FaShoppingBag className="text-yellow-400 text-3xl mb-4" />

              <h2 className="text-4xl font-bold text-white">
                {totalOrders}
              </h2>

              <p className="text-gray-400 mt-2">
                Total Orders
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">

              <FaTruck className="text-blue-400 text-3xl mb-4" />

              <h2 className="text-4xl font-bold text-blue-400">
                {processingOrders}
              </h2>

              <p className="text-gray-400 mt-2">
                Processing
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">

              <FaCheckCircle className="text-green-400 text-3xl mb-4" />

              <h2 className="text-4xl font-bold text-green-400">
                {deliveredOrders}
              </h2>

              <p className="text-gray-400 mt-2">
                Delivered
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">

              <FaDollarSign className="text-yellow-400 text-3xl mb-4" />

              <h2 className="text-4xl font-bold text-yellow-400">
                ${totalRevenue}
              </h2>

              <p className="text-gray-400 mt-2">
                Revenue
              </p>

            </div>

          </div>

          <div className="flex flex-col md:flex-row gap-5 mb-8">

            <div className="relative flex-1">

              <FaSearch className="absolute left-5 top-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search Customer, Email or Tracking..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-900 rounded-xl py-4 pl-14 pr-5 text-white border border-zinc-700 focus:border-yellow-400 outline-none"
              />

            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-5 text-white"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

          </div>

          <div className="bg-zinc-900 rounded-2xl overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-yellow-400 text-black">

                  <tr>

                    <th className="p-5 text-left">
                      Order
                    </th>

                    <th className="p-5 text-left">
                      Customer
                    </th>

                    <th className="p-5 text-left">
                      Payment
                    </th>

                    <th className="p-5 text-left">
                      Total
                    </th>

                    <th className="p-5 text-left">
                      Status
                    </th>

                    <th className="p-5 text-left">
                      Tracking
                    </th>

                    <th className="p-5 text-left">
                      Delivery
                    </th>

                    <th className="p-5 text-left">
                      Date
                    </th>

                    <th className="p-5 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>

                      <td
                        colSpan="9"
                        className="text-center py-12 text-gray-400"
                      >
                        Loading Orders...
                      </td>

                    </tr>

                  ) : filteredOrders.length === 0 ? (

                    <tr>

                      <td
                        colSpan="9"
                        className="text-center py-12 text-gray-400"
                      >
                        No Orders Found
                      </td>

                    </tr>

                  ) : (

                    filteredOrders.map((order) => (

                      <tr
                        key={order.id}
                        className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                      >

                        <td className="p-5">

                          <h3 className="text-white font-bold">
                            #{order.id}
                          </h3>

                          <p className="text-gray-400 text-sm mt-1">
                            {order.email}
                          </p>

                        </td>

                        <td className="p-5">

                          <h3 className="text-white font-bold">
                            {order.customer_name}
                          </h3>

                          <p className="text-gray-400 text-sm">
                            {order.phone}
                          </p>

                          <p className="text-gray-500 text-sm">
                            {order.city}, {order.country}
                          </p>

                        </td>

                        <td className="p-5 text-white">

                          {order.payment_method}

                        </td>

                        <td className="p-5">

                          <span className="text-yellow-400 font-bold text-lg">
                            ${order.total}
                          </span>

                        </td>

                        <td className="p-5">

                          {order.status === "Pending" && (

                            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm">
                              Pending
                            </span>

                          )}

                          {order.status === "Processing" && (

                            <span className="bg-blue-600 px-4 py-2 rounded-full text-sm">
                              Processing
                            </span>

                          )}

                          {order.status === "Shipped" && (

                            <span className="bg-purple-600 px-4 py-2 rounded-full text-sm">
                              Shipped
                            </span>

                          )}

                          {order.status === "Delivered" && (

                            <span className="bg-green-600 px-4 py-2 rounded-full text-sm">
                              Delivered
                            </span>

                          )}

                          {order.status === "Cancelled" && (

                            <span className="bg-red-600 px-4 py-2 rounded-full text-sm">
                              Cancelled
                            </span>

                          )}

                        </td>

                        <td className="p-5">

                          <p className="text-white text-sm break-all">
                            {order.tracking_number || "-"}
                          </p>

                        </td>

                        <td className="p-5">

                          <span className="text-gray-300">
                            {order.estimated_delivery || "-"}
                          </span>

                        </td>

                        <td className="p-5">

                          <span className="text-gray-400 text-sm">
                            {new Date(
                              order.created_at
                            ).toLocaleString()}
                          </span>

                        </td>

                        <td className="p-5">

                          <div className="lex flex-col items-center gap-3">

                          </div>

                                                      <select
                              defaultValue={order.status}
                              onChange={(e) => {
                                order.status = e.target.value;
                              }}
                              className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2"
                            >
                              <option>Pending</option>
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>

                            <div className="flex gap-3">

  <button
    onClick={async () => {
      try {

        await updateOrder(order.id, {
          status: order.status,
          tracking_number: order.tracking_number,
          estimated_delivery: order.estimated_delivery,
        });

        alert("Order Updated Successfully");

        loadOrders();

      } catch (err) {

        console.log(err);

        alert("Unable to update order.");

      }
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
  >
    Update
  </button>

  <button
    onClick={async () => {

      const confirmDelete = window.confirm(
        "Delete this order?"
      );

      if (!confirmDelete) return;

      try {

        await deleteOrder(order.id);

        alert("Order Deleted Successfully");

        loadOrders();

      } catch (err) {

        console.log(err);

        alert("Unable to delete order.");

      }

    }}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold"
  >
    Delete
  </button>

</div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

                  </div>

      </div>

      <Footer />

    </>
  );
}

export default ManageOrders;