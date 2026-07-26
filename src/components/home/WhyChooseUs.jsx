import {
  FaShieldAlt,
  FaShippingFast,
  FaGem,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaGem size={40} />,
    title: "Premium Quality",
    description:
      "Every watch is crafted with exceptional precision and luxury materials.",
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "2 Years Warranty",
    description:
      "All TimeLuxe watches include an international warranty for peace of mind.",
  },
  {
    icon: <FaShippingFast size={40} />,
    title: "Free Worldwide Shipping",
    description:
      "Fast, secure, and insured delivery to your doorstep.",
  },
  {
    icon: <FaHeadset size={40} />,
    title: "24/7 Customer Support",
    description:
      "Our support team is always available to help you with your order.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-4">
          Why Choose TimeLuxe
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          We deliver premium luxury watches with trusted service, secure
          shopping, and worldwide delivery.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 transition duration-300 hover:shadow-xl hover:shadow-yellow-500/20"
            >
              <div className="text-yellow-400 flex justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;