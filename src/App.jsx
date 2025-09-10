import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import TanyakNavbar from "./components/TanyakNavbar";
import AboutUs from "./components/AboutUs";
import HardwareCollections from "./components/HardwareCollections";


function App() {
  return (
    <Router>
      <TanyakNavbar />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/outlet" element={<AboutUs />} />
        <Route path="/collections" element={<HardwareCollections />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
