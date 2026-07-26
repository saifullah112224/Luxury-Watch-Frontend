import silverWatch from "../../assets/images/watches/silver-watch.jpg";
import blackWatch from "../../assets/images/watches/black-watch.jpg";
import smartWatch from "../../assets/images/watches/smart-watch.jpg";
import sportsWatch from "../../assets/images/watches/sports-watch.jpg";

const collections = [
  {
    title: "Luxury",
    image: silverWatch,
  },
  {
    title: "Smart",
    image: smartWatch,
  },
  {
    title: "Sports",
    image: sportsWatch,
  },
  {
    title: "Classic",
    image: blackWatch,
  },
];

function FeaturedCollections() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-14">
          Featured Collections
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {collections.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl overflow-hidden hover:scale-105 duration-300 shadow-lg hover:shadow-yellow-500/30"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-6 text-center">

                <h3 className="text-2xl font-bold text-yellow-400">
                  {item.title}
                </h3>

                <button className="mt-4 border border-yellow-400 px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-black duration-300">
                  Explore
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedCollections;