import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import silverWatch from "../../assets/images/watches/silver-watch.jpg";
import blackWatch from "../../assets/images/watches/black-watch.jpg";
import smartWatch from "../../assets/images/watches/smart-watch.jpg";
import sportsWatch from "../../assets/images/watches/sports-watch.jpg";

const watches = [
  {
    id: 1,
    name: "Silver Elite",
    price: "$799",
    image: silverWatch,
  },
  {
    id: 2,
    name: "Black Diamond",
    price: "$999",
    image: blackWatch,
  },
  {
    id: 3,
    name: "Smart Pro X",
    price: "$499",
    image: smartWatch,
  },
  {
    id: 4,
    name: "Sport Master",
    price: "$599",
    image: sportsWatch,
  },
];

function BestSellers() {
  return (
    <section className="bg-[#0a0a0a] py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-14">
          Best Sellers
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {watches.map((watch) => (
            <div
              key={watch.id}
              className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 duration-300 shadow-lg hover:shadow-yellow-500/40"
            >

              <div className="relative">

                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-72 object-cover"
                />

                <button className="absolute top-4 right-4 bg-black/60 p-3 rounded-full hover:bg-yellow-400 hover:text-black duration-300">
                  <FaHeart />
                </button>

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {watch.name}
                </h3>

                <div className="flex text-yellow-400 mt-3">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p className="text-yellow-400 text-2xl mt-4 font-bold">
                  {watch.price}
                </p>

                <button className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-300 duration-300 flex justify-center items-center gap-2">
                  <FaShoppingCart />
                  Add To Cart
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default BestSellers;