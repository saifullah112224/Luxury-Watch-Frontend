import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../supabaseClient";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (data) {
      setForm({
        full_name: data.full_name || "",
        phone: data.phone || "",
        address: data.address || "",
        email: data.email || "",
      });
    }

    setLoading(false);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function saveProfile(e) {
    e.preventDefault();

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("users")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        address: form.address,
      })
      .eq("auth_id", user.id);

    setSaving(false);

    alert("Profile Updated Successfully!");

    navigate("/profile");
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-black min-h-screen pt-40 text-center text-yellow-400 text-2xl">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen pt-36 pb-20 px-6">

        <div className="max-w-2xl mx-auto bg-zinc-900 rounded-3xl border border-yellow-500/20 shadow-2xl p-10">

          <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
            Edit Profile
          </h1>

          <form
            onSubmit={saveProfile}
            className="space-y-6"
          >

            <div>
              <label className="block text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                disabled
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <button
              disabled={saving}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default EditProfile;