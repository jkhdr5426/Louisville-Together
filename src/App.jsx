import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p>Welcome to Louisville Together!</p>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p>About our community resources website.</p>
    </div>
  );
}

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
