import { motion } from "framer-motion";
import watchImage from "../../assets/images/watches/hero.png";

function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center pt-24">

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="uppercase tracking-[6px] text-yellow-400 mb-4">
            Premium Collection
          </p>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Luxury
            <br />
            Watches
          </h1>

          <p className="text-gray-400 mt-8 text-lg leading-8">
            Discover premium handcrafted watches that combine timeless elegance,
            precision engineering, and modern luxury.
          </p>

          <div className="flex gap-6 mt-10">

            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 duration-300">
              Shop Now
            </button>

            <button className="border border-yellow-400 px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-black duration-300">
              Explore
            </button>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="flex justify-center"
        >
          <img
            src={watchImage}
            alt="Luxury Watch"
            className="w-[500px] drop-shadow-[0_0_40px_rgba(255,215,0,0.5)]"
          />
        </motion.div>

      </div>

    </section>
  );
}

export default Hero;