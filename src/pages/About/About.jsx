import {
  FaGem,
  FaShippingFast,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function About() {
  return (
    <>
      <Navbar />

      <section className="bg-black text-white pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* Hero */}

          <div className="text-center mb-20">

            <h1 className="text-6xl font-bold text-yellow-400 mb-6">
              About TimeLuxe
            </h1>

            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-9">
              Discover timeless elegance with premium luxury,
              smart, and sports watches crafted for every
              occasion.
            </p>

          </div>

          {/* About */}

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">

            <div>

              <h2 className="text-4xl font-bold text-yellow-400 mb-6">
                Who We Are
              </h2>

              <p className="text-gray-300 leading-8 text-lg">
                TimeLuxe is a premium online watch store dedicated
                to providing high-quality luxury, smart, and sports
                watches from trusted brands around the world.
              </p>

              <p className="text-gray-300 leading-8 text-lg mt-6">
                Every watch is carefully selected to ensure
                exceptional craftsmanship, modern design,
                durability, and long-lasting performance.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-10 border border-yellow-500/20">

              <h3 className="text-3xl font-bold text-yellow-400 mb-6">
                Our Story
              </h3>

              <p className="text-gray-300 leading-8">
                Founded with a passion for precision and elegance,
                TimeLuxe was created to make premium watches
                accessible to everyone who appreciates timeless
                style. We combine luxury, affordability, and
                outstanding customer service to provide an
                exceptional shopping experience.
              </p>

            </div>

          </div>

          {/* Features */}

          <h2 className="text-4xl text-center font-bold text-yellow-400 mb-14">
            Why Choose TimeLuxe
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mb-24">

            <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 duration-300 border border-yellow-500/20">

              <FaGem className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Premium Quality
              </h3>

              <p className="text-gray-400">
                Carefully selected watches from trusted brands.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 duration-300 border border-yellow-500/20">

              <FaShippingFast className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Fast Shipping
              </h3>

              <p className="text-gray-400">
                Quick and secure delivery across the country.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 duration-300 border border-yellow-500/20">

              <FaLock className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Secure Payment
              </h3>

              <p className="text-gray-400">
                Safe checkout with trusted payment methods.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 duration-300 border border-yellow-500/20">

              <FaHeadset className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                24/7 Support
              </h3>

              <p className="text-gray-400">
                Friendly customer support whenever you need us.
              </p>

            </div>

          </div>

          {/* Mission & Vision */}

          <div className="grid md:grid-cols-2 gap-10 mb-24">

            <div className="bg-zinc-900 rounded-3xl p-10 border border-yellow-500/20">

              <h2 className="text-3xl font-bold text-yellow-400 mb-5">
                Our Mission
              </h2>

              <p className="text-gray-300 leading-8">
                To deliver premium-quality watches with exceptional
                craftsmanship while providing outstanding customer
                service and a trusted shopping experience.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-10 border border-yellow-500/20">

              <h2 className="text-3xl font-bold text-yellow-400 mb-5">
                Our Vision
              </h2>

              <p className="text-gray-300 leading-8">
                To become one of the most trusted online luxury
                watch destinations by offering innovation,
                reliability, and timeless elegance.
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-4 gap-8 mb-24">

            <div className="bg-zinc-900 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-yellow-400">
                5000+
              </h2>
              <p className="mt-3 text-gray-400">
                Happy Customers
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-yellow-400">
                150+
              </h2>
              <p className="mt-3 text-gray-400">
                Premium Watches
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-yellow-400">
                35+
              </h2>
              <p className="mt-3 text-gray-400">
                Top Brands
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-yellow-400">
                99%
              </h2>
              <p className="mt-3 text-gray-400">
                Customer Satisfaction
              </p>
            </div>

          </div>

          {/* CTA */}

          <div className="bg-zinc-900 rounded-3xl p-14 text-center border border-yellow-500/20">

            <h2 className="text-4xl font-bold text-yellow-400 mb-5">
              Find Your Perfect Watch Today
            </h2>

            <p className="text-gray-300 text-lg mb-8">
              Explore our premium collection and experience
              timeless elegance with TimeLuxe.
            </p>

            <a
              href="/shop"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-4 rounded-full transition"
            >
              Shop Now
            </a>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default About;