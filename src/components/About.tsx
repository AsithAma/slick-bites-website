
import React, { useEffect, useRef } from "react";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="reveal">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                <span className="text-accent">LOCATED IN PARK CITY,</span>
              </h2>
              <h3 className="font-serif text-3xl md:text-4xl font-medium mb-8">
                THE EATING ESTABLISHMENT IS A LOCAL INSTITUTION
              </h3>
              <p className="text-muted-foreground mb-6">
                Photos by David Newkirk
              </p>
              <div className="h-0.5 w-24 bg-accent mb-8"></div>
              <p className="text-lg mb-6">
                Opened in 1972, The Eating Establishment has been a beloved diner to three generations of locals and visitors to Park City. In 2017 it was purchased by a small group of local yahoos and spruced up a bit. And by spruced up we mean we added a bar.
              </p>
              <p className="text-lg mb-6">
                Under the guidance of chef Brendan Kawakami, the menu preserves the original spirit of a 'breakfast all day' restaurant while adding a few new comfort food elements to round out the day (and night). By adding the bar we've been able to bring the craft cocktails of Bar X and as much of the beer list as we could fit from Beer Bar (our sister businesses in Salt Lake City) up the mountain for you all to, hopefully, enjoy. Dig in, drink up!
              </p>
              <p className="text-lg font-medium">
                Open 8AM-4pm and 5-9pm
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                PRICES SUBJECT TO CHANGE | HOURS VARY SEASONALLY
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative reveal" style={{ transitionDelay: "200ms" }}>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent rounded-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Inside The Eating Establishment"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="relative reveal" style={{ transitionDelay: "400ms" }}>
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Food at The Eating Establishment"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="relative reveal" style={{ transitionDelay: "600ms" }}>
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Dining area at The Eating Establishment"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
