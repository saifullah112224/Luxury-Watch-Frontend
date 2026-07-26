import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaHeadset,
  FaShippingFast,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="bg-black text-white pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="text-center mb-20">

            <h1 className="text-6xl font-bold text-yellow-400 mb-6">
              Contact TimeLuxe
            </h1>

            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              We'd love to hear from you. Whether you have a question,
              need support, or want to know more about our watches,
              our team is always ready to help.
            </p>

          </div>

          {/* Contact Info */}

          <div className="grid md:grid-cols-4 gap-8 mb-20">

            <div className="bg-zinc-900 rounded-3xl p-8 text-center border border-yellow-500/20">

              <FaMapMarkerAlt className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Address
              </h3>

              <p className="text-gray-400">
                Wah Cantt,
                Pakistan
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center border border-yellow-500/20">

              <FaPhoneAlt className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Phone
              </h3>

              <p className="text-gray-400">
                +92 311 0157169
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center border border-yellow-500/20">

              <FaEnvelope className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Email
              </h3>

              <p className="text-gray-400">
                support@timeluxe.com
              </p>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 text-center border border-yellow-500/20">

              <FaClock className="text-yellow-400 text-5xl mx-auto mb-5" />

              <h3 className="text-2xl font-bold mb-3">
                Hours
              </h3>

              <p className="text-gray-400">
                Mon - Sat
                <br />
                9:00 AM - 8:00 PM
              </p>

            </div>

          </div>

          {/* Contact Form */}

          <div className="grid md:grid-cols-2 gap-16 mb-24">

            <div>

              <h2 className="text-4xl font-bold text-yellow-400 mb-8">
                Send Us a Message
              </h2>

              <form className="space-y-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-yellow-500 outline-none"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-yellow-500 outline-none"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-yellow-500 outline-none"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-yellow-500 outline-none"
                />

                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-full font-bold transition"
                >
                  Send Message
                </button>

              </form>

            </div>

            {/* Support */}

            <div className="bg-zinc-900 rounded-3xl p-10 border border-yellow-500/20">

              <h2 className="text-4xl font-bold text-yellow-400 mb-8">
                Why Contact Us?
              </h2>

              <div className="space-y-8">

                <div className="flex gap-5">

                  <FaHeadset className="text-yellow-400 text-3xl mt-1" />

                  <div>

                    <h3 className="text-xl font-bold">
                      Friendly Support
                    </h3>

                    <p className="text-gray-400">
                      Our customer service team is always ready to help.
                    </p>

                  </div>

                </div>

                <div className="flex gap-5">

                  <FaShippingFast className="text-yellow-400 text-3xl mt-1" />

                  <div>

                    <h3 className="text-xl font-bold">
                      Shipping Assistance
                    </h3>

                    <p className="text-gray-400">
                      Track your orders and delivery status easily.
                    </p>

                  </div>

                </div>

                <div className="flex gap-5">

                  <FaUndoAlt className="text-yellow-400 text-3xl mt-1" />

                  <div>

                    <h3 className="text-xl font-bold">
                      Returns
                    </h3>

                    <p className="text-gray-400">
                      Hassle-free return and replacement support.
                    </p>

                  </div>

                </div>

                <div className="flex gap-5">

                  <FaShieldAlt className="text-yellow-400 text-3xl mt-1" />

                  <div>

                    <h3 className="text-xl font-bold">
                      Secure Shopping
                    </h3>

                    <p className="text-gray-400">
                      Your personal information is always protected.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* FAQ */}

          <div className="bg-zinc-900 rounded-3xl p-12 border border-yellow-500/20">

            <h2 className="text-4xl font-bold text-yellow-400 mb-10 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">

              <div>
                <h3 className="text-xl font-bold">
                  How long does shipping take?
                </h3>

                <p className="text-gray-400 mt-2">
                  Orders are usually delivered within 3–7 business days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Can I return a product?
                </h3>

                <p className="text-gray-400 mt-2">
                  Yes. We offer an easy return policy for eligible products.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Are your watches authentic?
                </h3>

                <p className="text-gray-400 mt-2">
                  Yes. Every watch sold by TimeLuxe is carefully selected
                  and quality checked.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;