import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import silverWatch from "../../assets/images/watches/silver-watch.jpg";

function ProductDetails() {
  return (
    <div className="bg-black text-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

        {/* Product Image */}
        <div>
          <img
            src={silverWatch}
            alt="Watch"
            className="rounded-3xl w-full"
          />
        </div>

        {/* Product Info */}
        <div>

          <h1 className="text-5xl font-bold">
            Silver Elite
          </h1>

          <p className="text-yellow-400 text-3xl mt-6">
            $799
          </p>

          <p className="text-gray-400 mt-6 leading-8">
            Premium handcrafted luxury watch with sapphire glass,
            stainless steel body, and water resistance.
          </p>

          <div className="mt-8">
            <button className="bg-yellow-400 text-black px-10 py-4 rounded-full font-bold hover:bg-yellow-300">
              Add To Cart
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;