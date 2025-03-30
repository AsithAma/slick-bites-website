
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="restaurant"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Parallax effect with inline style */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ transform: `translateY(${offset}px)` }}
      ></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in">
          The Eating Establishment
        </h1>
        <div className="h-0.5 w-24 bg-accent mx-auto mb-6 animate-scale-in"></div>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
          A Park City institution since 1972, serving classic comfort food with a modern twist
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          <a
            href="#reservations"
            className="btn-primary uppercase tracking-wider"
          >
            Make a Reservation
          </a>
          <a
            href="#menus"
            className="btn-outline uppercase tracking-wider"
          >
            View Our Menus
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10">
        <ChevronDown 
          size={36} 
          className="text-white/80 hover:text-white transition-colors" 
          onClick={handleScrollDown}
        />
      </div>
    </section>
  );
};

export default Hero;
