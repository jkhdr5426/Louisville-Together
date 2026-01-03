import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import Categories from "./components/Categories";
import FeaturedResources from "./components/FeaturedResources";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App font-sans text-gray-800">
     <Navbar />

      <Hero />

     <main className="max-w-7xl mx-auto px-4 mt-12 space-y-24">
        <SearchSection />

         <section id="categories">
          <h2 className="text-3xl font-bold text-center mb-6">
            Explore Resource Categories
          </h2>
          <Categories />
        </section>

        <section id="featured">
          <h2 className="text-3xl font-bold text-center mb-6">
            Featured Resources
          </h2>
          <FeaturedResources />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
