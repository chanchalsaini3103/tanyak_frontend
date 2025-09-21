import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import TanyakNavbar from "./components/TanyakNavbar";
import AboutUs from "./components/AboutUs";
import HardwareCollections from "./components/HardwareCollections";
import OurCraft from "./components/OurCraft";
import Gallery from "./components/Gallery";
import Wishlist from "./components/Wishlist";
import OffersPage from "./components/OffersPage";


function App() {
  return (
    <Router>
      <TanyakNavbar />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/outlet" element={<AboutUs />} />
        <Route path="/blog" element={<Gallery />} />
        <Route path="/shop" element={<HardwareCollections />} />
        <Route path="/our-craft" element={<OurCraft />} />
        <Route path="/collections" element={<HardwareCollections />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/offers" element={<OffersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
