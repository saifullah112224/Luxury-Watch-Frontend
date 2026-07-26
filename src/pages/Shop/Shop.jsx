import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ShopProducts from "../../components/product/ShopProducts";

function Shop() {
  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen text-white pt-28">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-yellow-400 mb-10">
            Shop Watches
          </h1>

          <ShopProducts />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;