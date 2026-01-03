function Home() {
  return (
    <div>
      {/* hero */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-[400px] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Louisville Together</h1>
        <p className="text-xl mb-6 max-w-xl">
          Find community resources, support networks, and local organizations all in one place.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition">
          Explore Resources
        </button>
      </div>

      {/* rest of home */}
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-bold mt-10 mb-4">Featured Resources</h2>
        <p>Resource cards will go here...</p>
      </div>
    </div>
  );
}

export default Home;
