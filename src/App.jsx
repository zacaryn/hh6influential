// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Services from "./components/Services";
import NotFound from "./components/NotFound";
import "./App.css"; // Global styles

function App() {
  const location = useLocation();
  const siteUrl = "https://hh6influential.com";

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#002a6e" />
        
        {/* Default meta tags (can be overridden by PageHead) */}
        <meta name="description" content="At Household Six Influential, we provide various services for your online presence, such as social media management, website development, and graphic design. Veteran-owned and operated." />
        <meta name="author" content="HH6 Influential" />
        
        {/* Default OG tags that can be overridden by PageHead */}
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/assets/images/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Favicon - these are global for all pages */}
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png" />
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
