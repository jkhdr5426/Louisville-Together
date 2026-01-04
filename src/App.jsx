import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import Resources from "./pages/Resources"
import Map from "./pages/Map"
import About from "./pages/About"
import References from "./pages/References";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

function App() {
  return (
    <Router>
      <Navbar />
      
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
          <Route path="/references" element={<References />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
