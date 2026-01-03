import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 z-50 flex justify-between items-center">
        <div className="font-bold text-xl">Louisville Together</div>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
