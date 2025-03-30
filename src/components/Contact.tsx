
import React, { useRef, useEffect } from "react";
import Map from "./Map";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const Contact: React.FC = () => {
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
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="section-heading mb-4">Contact</h2>
          <div className="h-0.5 w-24 bg-accent mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-serif text-3xl mb-6">Contact Us</h3>
              <div className="flex flex-col space-y-6">
                <div className="flex items-start">
                  <div className="bg-restaurant-100 p-3 rounded-full mr-4">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <a 
                      href="tel:4356498284" 
                      className="text-accent hover:underline"
                    >
                      435.649.8284
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-restaurant-100 p-3 rounded-full mr-4">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <address className="not-italic">
                      317 Main Street<br/>
                      Park City, UT, 84060
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-restaurant-100 p-3 rounded-full mr-4">
                    <Clock className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Hours</h4>
                    <p className="mb-1">Open 8AM-4pm and 5-9pm</p>
                    <p className="text-sm text-muted-foreground">
                      HOURS VARY SEASONALLY
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-restaurant-100 p-3 rounded-full mr-4">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a 
                      href="mailto:info@eatingestablishment.com" 
                      className="text-accent hover:underline"
                    >
                      info@eatingestablishment.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
