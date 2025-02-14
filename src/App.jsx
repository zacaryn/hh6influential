// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Services from "./components/Services";
import "./App.css"; // Global styles

function App() {
  return (
    <div className="App">
      <Helmet 
        defaultTitle="HH6 Influential" 
        titleTemplate="%s | HH6 Influential"
      >
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
