import { supabase } from "../supabaseClient";

export const uploadProductImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  console.log("UPLOAD DATA:", data);
  console.log("UPLOAD ERROR:", error);

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  console.log("PUBLIC URL:", publicUrl);

  return publicUrl.publicUrl;
};