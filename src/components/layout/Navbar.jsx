import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { supabase } from "../../supabaseClient";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // Step 35.1
  const [user, setUser] = useState(null);

  // Step 35.3
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();

    setShowDropdown(false);

    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-yellow-400"
          >
            TimeLuxe
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-white">

            <Link
              to="/"
              className="hover:text-yellow-400 duration-300"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="hover:text-yellow-400 duration-300"
            >
              Shop
            </Link>

            <Link
              to="/about"
              className="hover:text-yellow-400 duration-300"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-yellow-400 duration-300"
            >
              Contact
            </Link>

            {/* NEW ADMIN LINK */}
            <Link
              to="/admin"
              className="hover:text-yellow-400 duration-300"
            >
              Admin
            </Link>

          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-6">

            <Link to="/wishlist">
              <FaHeart
                size={20}
                className="text-white hover:text-yellow-400 duration-300"
              />
            </Link>

            <Link to="/cart">
              <FaShoppingCart
                size={20}
                className="text-white hover:text-yellow-400 duration-300"
              />
            </Link>

            {user ? (

              <div className="relative">

                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300 duration-300"
                >
                  <FaUser size={18} />

                  <span>
                    {user.user_metadata?.full_name || user.email}
                  </span>

                  <FaChevronDown size={12} />
                </button>

                {showDropdown && (

                  <div className="absolute right-0 mt-4 w-56 rounded-xl bg-zinc-900 border border-yellow-500/20 shadow-2xl overflow-hidden">

                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-5 py-3 text-white hover:bg-yellow-400 hover:text-black transition"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/my-orders"
                      onClick={() => setShowDropdown(false)}
                      className="block px-5 py-3 text-white hover:bg-yellow-400 hover:text-black transition"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setShowDropdown(false)}
                      className="block px-5 py-3 text-white hover:bg-yellow-400 hover:text-black transition"
                    >
                      Wishlist
                    </Link>

                                        {/* NEW ADMIN DASHBOARD */}
                    <Link
                      to="/admin"
                      onClick={() => setShowDropdown(false)}
                      className="block px-5 py-3 text-white hover:bg-yellow-400 hover:text-black transition"
                    >
                      Admin Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-600 hover:text-white transition"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>

            ) : (

              <Link to="/login">
                <FaUser
                  size={20}
                  className="text-white hover:text-yellow-400 duration-300"
                />
              </Link>

            )}

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (

          <div className="md:hidden bg-black py-5">

            <div className="flex flex-col gap-5 text-white">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>

              {/* NEW ADMIN LINK */}
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setMenuOpen(false)}
                  >
                    Wishlist
                  </Link>

                  {/* NEW ADMIN DASHBOARD */}
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}

            </div>

          </div>

        )}

      </div>
    </header>
  );
}

export default Navbar;