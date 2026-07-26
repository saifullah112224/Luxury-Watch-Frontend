import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../supabaseClient";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSignup = async (e) => {
  e.preventDefault();

  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        full_name: form.fullName,
      },
    },
  });

  if (error) {
    setLoading(false);
    alert(error.message);
    return;
  }

  if (data.user) {
    const { error: dbError } = await supabase
      .from("users")
      .insert([
        {
          auth_id: data.user.id,
          full_name: form.fullName,
          email: form.email,
          role: "customer",
        },
      ]);

    if (dbError) {
      console.error(dbError);
    }
  }

  setLoading(false);

  alert("Account created successfully!");

  navigate("/login");
};

  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen flex items-center justify-center px-6 pt-28 pb-20">

        <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl border border-yellow-500/20 p-10">

          <h1 className="text-4xl font-bold text-center text-yellow-400 mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Join TimeLuxe Luxury Watches
          </p>

          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            <div>
              <label className="block text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 pr-16 text-white focus:outline-none focus:border-yellow-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

          <div className="text-center mt-8">

            <p className="text-gray-400">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="inline-block mt-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-lg transition"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Signup;