import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../supabaseClient";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { addToCart } from "../../api/cartApi";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
    } else {
      setWishlist(data || []);
    }

    setLoading(false);
  };

  const removeWishlist = async (id) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", id);

    if (!error) {
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await addToCart({
        id: item.product_id,
        name: item.name,
        price: item.price,
        image: item.image,
      });

      alert("Added to Cart!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold text-center text-yellow-400 mb-12">
            My Wishlist
          </h1>

          {loading ? (

            <div className="text-center text-2xl text-gray-400">
              Loading...
            </div>

          ) : wishlist.length === 0 ? (

            <div className="text-center">

              <FaHeart
                className="mx-auto text-yellow-400 mb-6"
                size={70}
              />

              <h2 className="text-3xl font-bold mb-4">
                Your Wishlist is Empty
              </h2>

              <p className="text-gray-400">
                Add luxury watches to your wishlist.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-4 gap-8">

              {wishlist.map((item) => (

                <div
                  key={item.id}
                  className="bg-zinc-900 rounded-3xl overflow-hidden border border-yellow-500/20 hover:scale-105 transition duration-300"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-yellow-400 text-2xl mt-3">
                      ${item.price}
                    </p>

                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-full flex justify-center items-center gap-2"
                      >
                        <FaShoppingCart />
                        Cart
                      </button>

                      <button
                        onClick={() => removeWishlist(item.id)}
                        className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-4 transition"
                      >
                        <FaTrash />
                      </button>

                    </div>

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

export default Wishlist;