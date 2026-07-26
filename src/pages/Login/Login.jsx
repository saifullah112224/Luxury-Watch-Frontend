import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../supabaseClient";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (!existingUser) {
    await supabase.from("users").insert([
      {
        auth_id: user.id,
        full_name: user.user_metadata.full_name || "",
        email: user.email,
        role: "customer",
      },
    ]);
  }

  alert("Login Successful!");

  navigate("/");
};

  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen flex items-center justify-center px-6 pt-28 pb-20">

        <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl border border-yellow-500/20 p-10">

          <h1 className="text-4xl font-bold text-center text-yellow-400 mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Sign in to your TimeLuxe account
          </p>

          <form
            className="space-y-5"
            onSubmit={handleLogin}
          >

            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                required
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
                  placeholder="Enter your password"
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 pr-16 text-white focus:outline-none focus:border-yellow-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2 text-gray-300">

                <input type="checkbox" />

                Remember Me

              </label>

              <button
                type="button"
                className="text-yellow-400 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition"
            >
              Login
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-400">

              Don't have an account?

            </p>

            <Link
              to="/signup"
              className="inline-block mt-3 bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition px-6 py-3 rounded-lg font-semibold"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Login;