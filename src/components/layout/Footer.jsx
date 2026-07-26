import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">
            TimeLuxe
          </h2>

          <p className="mt-4 text-gray-400">
            Premium luxury watches crafted for elegance, precision, and timeless
            style.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">
            Customer Support
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>FAQs</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">
            Follow Us
          </h3>

          <div className="flex gap-5 text-2xl">
            <FaFacebook className="hover:text-yellow-400 cursor-pointer" />
            <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
            <FaYoutube className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>

      </div>

      <div className="border-t border-yellow-500/20 mt-12 pt-6 text-center text-gray-500">
        © 2026 TimeLuxe. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;