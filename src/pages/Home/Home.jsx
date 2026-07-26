import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import FeaturedCollections from "../../components/home/FeaturedCollections";
import BestSellers from "../../components/home/BestSellers";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import CustomerReviews from "../../components/home/CustomerReviews";
import Newsletter from "../../components/home/Newsletter";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <WhyChooseUs />
      <CustomerReviews />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;