import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { addToCart } from "../../api/cartApi";

import { supabase } from "../../supabaseClient";

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../api/wishlistApi";

function ShopProducts() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();

      if (!data) {
        setWishlist([]);
        return;
      }

      setWishlist(data.map((item) => item.product_id));
    } catch (err) {
      console.error(err);
      setWishlist([]);
    }
  };

const handleAddToCart = async (product) => {
  try {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    await addToCart(product, user.id);

    alert("Added to cart!");

  } catch (err) {
    console.error(err);
  }
};

  const handleWishlist = async (product) => {
  try {
    if (wishlist.includes(product.id)) {

      await removeFromWishlist(product.id);

      setWishlist(
        wishlist.filter((id) => id !== product.id)
      );

    } else {

      await addToWishlist(product);

      setWishlist([
        ...wishlist,
        product.id,
      ]);

    }
  } catch (err) {
    console.error(err);
  }
};

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      console.log("Products:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <p className="text-white text-2xl mb-5">
        Total Products: {products.length}
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <div className="flex text-yellow-400 mt-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-yellow-400 text-2xl mt-4">
                ${product.price}
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-yellow-400 text-black py-3 rounded-full flex justify-center items-center gap-2"
                >
                  <FaShoppingCart />
                  Cart
                </button>

                <button
  onClick={() => handleWishlist(product)}
  className={`border p-4 rounded-full transition-all duration-300 hover:scale-110 ${
    wishlist.includes(product.id)
      ? "bg-red-500 border-red-500 text-white"
      : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
  }`}
>
  <FaHeart
    className={`transition-transform duration-300 ${
      wishlist.includes(product.id)
        ? "scale-125"
        : "scale-100"
    }`}
  />
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShopProducts;