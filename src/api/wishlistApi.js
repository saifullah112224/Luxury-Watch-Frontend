import { supabase } from "../supabaseClient";

export const addToWishlist = async (product) => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first.");
    return;
  }

  console.log("Product:", product);

  const { data: existing } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .maybeSingle();

  if (existing) {
    alert("Already in wishlist ❤️");
    return;
  }

  const { error } = await supabase
    .from("wishlist")
    .insert({
      user_id: user.id,
      product_id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });

  if (error) {
    console.error(error);
    throw error;
  }

  alert("Added to Wishlist ❤️");
};

export const removeFromWishlist = async (productId) => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) {
    console.error(error);
    throw error;
  }
};

export const getWishlist = async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
};