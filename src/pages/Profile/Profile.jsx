import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../supabaseClient";

import { Link } from "react-router-dom";

function Profile() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setUserData(data);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black pt-32 pb-20 px-6">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-5xl font-bold text-yellow-400 mb-10 text-center">
            My Profile
          </h1>

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl shadow-2xl p-10">

            {!userData ? (

              <div className="text-center text-gray-400 text-xl">
                Loading...
              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-8">

                <div>
                  <label className="text-gray-400">
                    Full Name
                  </label>

                  <div className="mt-2 bg-black rounded-xl p-4 text-white border border-zinc-700">
                    {userData.full_name}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">
                    Email
                  </label>

                  <div className="mt-2 bg-black rounded-xl p-4 text-white border border-zinc-700">
                    {userData.email}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">
                    Phone
                  </label>

                  <div className="mt-2 bg-black rounded-xl p-4 text-white border border-zinc-700">
                    {userData.phone || "Not Added"}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">
                    Address
                  </label>

                  <div className="mt-2 bg-black rounded-xl p-4 text-white border border-zinc-700">
                    {userData.address || "Not Added"}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">
                    Role
                  </label>

                  <div className="mt-2 bg-black rounded-xl p-4 text-yellow-400 border border-zinc-700 capitalize">
                    {userData.role}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400">
                    Joined
                  </label>

                  <div className="mt-2 bg-black rounded-xl p-4 text-white border border-zinc-700">
                    {new Date(userData.created_at).toLocaleDateString()}
                  </div>
                </div>

<div className="md:col-span-2 flex justify-center gap-4 mt-8">

  <Link
    to="/edit-profile"
    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl transition duration-300"
  >
    Edit Profile
  </Link>

  <Link
    to="/my-orders"
    className="bg-zinc-800 hover:bg-zinc-700 border border-yellow-400 text-yellow-400 font-bold px-8 py-3 rounded-xl transition duration-300"
  >
    My Orders
  </Link>

</div>



              </div>

            )}

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Profile;