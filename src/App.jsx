import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Signup from "./pages/Signup/Signup";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Success/Success";

import Profile from "./pages/Profile/Profile";

import EditProfile from "./pages/EditProfile/EditProfile";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import MyOrders from "./pages/user/MyOrders";

import AdminDashboard from "./pages/admin/AdminDashboard";

import ManageProducts from "./pages/admin/ManageProducts";

import ManageOrders from "./pages/admin/ManageOrders";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";

import { useEffect, useState } from "react";
import Loader from "./components/common/Loader";
import ManageUsers from "./pages/admin/ManageUsers";

import Analytics from "./pages/admin/Analytics";




function App() {

const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 6000); // Loader stays visible for 4.5 seconds

  return () => clearTimeout(timer);
}, []);

if (loading) {
  return <Loader />;
}

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/login" element={<Login />} />
<Route path="/cart" element={<Cart />} />
<Route path="/wishlist" element={<Wishlist />} />
<Route path="/product/:id" element={<ProductDetails />} />

<Route path="/profile" element={<Profile />} />

<Route path="/edit-profile" element={<EditProfile />} />

<Route path="/my-orders" element={<MyOrders />} />

<Route path="/admin" element={<AdminDashboard />} />

<Route
  path="/admin/products"
  element={<ManageProducts />}
/>

<Route
  path="/admin/orders"
  element={<ManageOrders />}
/>

 <Route
    path="/admin/users"
    element={<ManageUsers />}
  />

  <Route
  path="/admin/analytics"
  element={<Analytics />}
/>

<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
<Route path="/success" element={<Success />} />

<Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;