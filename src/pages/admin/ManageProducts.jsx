import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { getBrands } from "../../api/brandApi";
import { getCategories } from "../../api/categoryApi";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

import { uploadProductImage } from "../../api/uploadApi";

import { Link } from "react-router-dom";

function ManageProducts() {

  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);
const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
  name: "",
  brand_id: "",
  category_id: "",
  description: "",
  price: "",
  stock: "",
  image: "",
});

  useEffect(() => {
    loadProducts();
        loadBrands();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();
      console.log("Products from API:", res.data);


      setProducts(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadBrands = async () => {
    try {
        const res = await getBrands();
        setBrands(res.data);
    } catch (err) {
        console.log(err);
    }
};

const loadCategories = async () => {
    try {
        const res = await getCategories();
        setCategories(res.data);
    } catch (err) {
        console.log(err);
    }
};

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const keyword = search.toLowerCase();

      return (
        product.name?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
      );

    });

  }, [products, search]);

  const totalProducts = products.length;

  const inStock = products.filter(
    (p) => Number(p.stock) > 10
  ).length;

  const lowStock = products.filter(
    (p) => Number(p.stock) > 0 && Number(p.stock) <= 10
  ).length;

  const outOfStock = products.filter(
    (p) => Number(p.stock) === 0
  ).length;

  const openAddModal = () => {

    setEditingProduct(null);

setForm({
    name: "",
    brand_id: "",
    category_id: "",
    description: "",
    price: "",
    stock: "",
    image: "",
});

    setShowModal(true);

  };

  const openEditModal = (product) => {

    setEditingProduct(product);

setForm({
    name: product.name || "",
    brand_id: product.brand_id || "",
    category_id: product.category_id || "",
    description: product.description || "",
    price: product.price || "",
    stock: product.stock || "",
    image: product.image || "",
});

    setShowModal(true);

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingProduct) {

      await updateProduct(editingProduct.id, form);

      alert("Product Updated Successfully");

    } else {

      await addProduct(form);

      alert("Product Added Successfully");

    }

    setShowModal(false);

    loadProducts();

  } catch (err) {

    console.log(err);

    alert("Something went wrong.");

  }
};

const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this product?"
  );

  if (!confirmDelete) return;

  try {

    await deleteProduct(id);

    alert("Product Deleted Successfully");

    loadProducts();

  } catch (err) {

    console.log(err);

    alert("Unable to delete product.");

  }

};

const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const imageUrl = await uploadProductImage(file);

    console.log("IMAGE URL:", imageUrl);

    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    alert("Image Uploaded Successfully");

  } catch (err) {
    console.log(err);
    alert("Image Upload Failed");
  }
};

return (
  <>
    <Navbar />

    <div className="max-w-7xl mx-auto px-6 pt-28">

  <Link
    to="/admin"
    className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-xl font-bold transition"
  >
    ← Back to Dashboard
  </Link>

</div>

      <div className="min-h-screen bg-black pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-5xl font-bold text-yellow-400">
                Manage Products
              </h1>

              <p className="text-gray-400 mt-3">
                Add, edit and manage luxury watches.
              </p>

            </div>

            <button
              onClick={openAddModal}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-7 py-4 rounded-xl font-bold flex items-center gap-3"
            >
              <FaPlus />

              Add Product

            </button>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-zinc-900 rounded-2xl p-6">

              <FaBoxOpen
                className="text-yellow-400 text-3xl mb-4"
              />

              <h2 className="text-4xl font-bold text-white">
                {totalProducts}
              </h2>

              <p className="text-gray-400 mt-2">
                Total Products
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">

              <h2 className="text-4xl font-bold text-green-400">
                {inStock}
              </h2>

              <p className="text-gray-400 mt-2">
                In Stock
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">

              <h2 className="text-4xl font-bold text-yellow-400">
                {lowStock}
              </h2>

              <p className="text-gray-400 mt-2">
                Low Stock
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">

              <h2 className="text-4xl font-bold text-red-500">
                {outOfStock}
              </h2>

              <p className="text-gray-400 mt-2">
                Out Of Stock
              </p>

            </div>

          </div>

          <div className="relative mb-8">

            <FaSearch
              className="absolute left-5 top-5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 rounded-xl py-4 pl-14 pr-5 text-white border border-zinc-700 focus:border-yellow-400 outline-none"
            />

          </div>

          <div className="bg-zinc-900 rounded-2xl overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-yellow-400 text-black">

                  <tr>

                    <th className="p-5 text-left">Image</th>

                    <th className="p-5 text-left">Product</th>

                    <th className="p-5 text-left">Brand</th>

                    <th className="p-5 text-left">Category</th>

                    <th className="p-5 text-left">Price</th>

                    <th className="p-5 text-left">Stock</th>

                    <th className="p-5 text-center">Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-12 text-gray-400"
                      >
                        Loading Products...
                      </td>

                    </tr>

                  ) : filteredProducts.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-12 text-gray-400"
                      >
                        No Products Found
                      </td>

                    </tr>

                  ) : (

                    filteredProducts.map((product) => (

                      <tr
                        key={product.id}
                        className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                      >

                        <td className="p-5">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />

                        </td>

                        <td className="p-5">

                          <h3 className="text-white font-bold text-lg">
                            {product.name}
                          </h3>

                          <p className="text-gray-400 text-sm mt-1">
                            ID : {product.id}
                          </p>

                        </td>

                        <td className="p-5 text-white">
                          {product.brand}
                        </td>

                        <td className="p-5 text-white">
                          {product.category}
                        </td>

                        <td className="p-5">

                          <span className="text-yellow-400 font-bold">
                            ${product.price}
                          </span>

                        </td>

                        <td className="p-5">

                          {product.stock > 10 ? (

                            <span className="bg-green-600 px-4 py-2 rounded-full text-sm">
                              {product.stock} In Stock
                            </span>

                          ) : product.stock > 0 ? (

                            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm">
                              {product.stock} Low
                            </span>

                          ) : (

                            <span className="bg-red-600 px-4 py-2 rounded-full text-sm">
                              Out
                            </span>

                          )}

                        </td>

                        <td className="p-5">

                          <div className="flex justify-center gap-3">

                            <button
                              onClick={() => openEditModal(product)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() => handleDelete(product.id)}
                              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-5">
                <div className="bg-zinc-900 w-full max-w-2xl  max-h-[90vh] overflow-y-auto rounded-3xl p-8 scrollbar-thin scrollbar-thumb-yellow-400">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-8">
                        {editingProduct ? "Edit Product" : "Add Product"}
                        </h2>
                        <form
                        onSubmit={handleSubmit}
                        className="space-y-5">
                            <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-black p-4 rounded-xl text-white"
                            />
<select
name="brand_id"
value={form.brand_id}
onChange={handleChange}
required
className="w-full bg-black p-4 rounded-xl text-white"
>
<option value="">Select Brand</option>

{brands.map((brand) => (
<option
key={brand.id}
value={brand.id}
>
{brand.name}
</option>
))}

</select>
                            <select
name="category_id"
value={form.category_id}
onChange={handleChange}
required
className="w-full bg-black p-4 rounded-xl text-white"
>
<option value="">Select Category</option>

{categories.map((category) => (
<option
key={category.id}
value={category.id}
>
{category.name}
</option>
))}

</select>
                            <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            className="w-full bg-black p-4 rounded-xl text-white"
                            />
                            <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={handleChange}
                            required
                            className="w-full bg-black p-4 rounded-xl text-white"
                            />
                           <div>

  <label className="block text-white mb-3">
    Upload Product Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full bg-black p-4 rounded-xl text-white"
  />

{form.image && (
  <div className="flex justify-center mt-5">
    <img
      src={form.image}
      alt="Preview"
      className="w-52 h-52 object-cover rounded-xl border-2 border-yellow-400 shadow-lg"
    />
  </div>
)}

</div>
                            <textarea
                            name="description"
                            placeholder="Description"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full bg-black p-4 rounded-xl text-white"
                            />
                            <div className="sticky bottom-0 bg-zinc-900 pt-5 flex gap-4">
                                <button
                                type="submit"
                                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl"
                                >
                                    {editingProduct ? "Update Product" : "Add Product"}
                                    </button>
                                    <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl"
                                    >
                                        Cancel
                                        </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </div>
        <Footer />
    </>
  );
}
export default ManageProducts;