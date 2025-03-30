
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Reservation from "../components/Reservation";
import Contact from "../components/Contact";
import MenuSection from "../components/MenuSection";
import Footer from "../components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("restaurant");

  useEffect(() => {
    // Intersection Observer to update active section on scroll
    const sections = ["restaurant", "about", "gallery", "reservations", "contact", "menus"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-60px 0px -40% 0px",
      threshold: 0
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    // Script to handle reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
    
    return () => {
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      
      revealElements.forEach(element => {
        revealObserver.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <About />
      <Gallery />
      <Reservation />
      <Contact />
      <MenuSection />
      <Footer />
    </div>
  );
};

export default Index;
