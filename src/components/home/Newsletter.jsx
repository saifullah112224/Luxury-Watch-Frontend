function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-black via-zinc-900 to-black py-24">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold text-yellow-400">
          Stay Updated
        </h2>

        <p className="text-gray-400 mt-6 text-lg">
          Subscribe to receive exclusive offers, new arrivals, and luxury watch
          updates.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-96 px-5 py-4 rounded-full bg-zinc-900 border border-yellow-500 text-white outline-none focus:border-yellow-400"
          />

          <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;