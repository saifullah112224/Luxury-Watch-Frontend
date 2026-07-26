import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const reviews = [
  {
    id: 1,
    name: "James Wilson",
    review:
      "Amazing quality! The watch looks even better in person. Fast delivery and premium packaging.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    review:
      "Excellent customer service and a beautiful luxury watch. Highly recommended!",
  },
  {
    id: 3,
    name: "Michael Brown",
    review:
      "Very elegant design. The finishing and attention to detail are outstanding.",
  },
];

function CustomerReviews() {
  return (
    <section className="bg-[#111] py-24 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-4">
          Customer Reviews
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Trusted by luxury watch lovers around the world.
        </p>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/20 transition">
                
                <div className="text-yellow-400 text-2xl mb-4">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="text-gray-300 leading-7">
                  "{review.review}"
                </p>

                <h3 className="mt-8 text-xl font-bold text-yellow-400">
                  {review.name}
                </h3>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default CustomerReviews;