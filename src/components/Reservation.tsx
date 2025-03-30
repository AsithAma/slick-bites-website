
import React, { useState, useEffect, useRef } from "react";
import { Calendar, Clock, User, Phone, CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reservation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      toast({
        title: "Reservation Request Submitted",
        description: "We'll contact you shortly to confirm your reservation.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        specialRequests: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section
      id="reservations"
      ref={sectionRef}
      className="section-padding bg-restaurant-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-restaurant-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-restaurant-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h2 className="section-heading mb-4">Reservations</h2>
            <div className="h-0.5 w-24 bg-accent mb-8"></div>
            <h3 className="font-serif text-3xl mb-4">MAKE A RESERVATION</h3>
            <p className="text-lg mb-8">
              Click below or call <a href="tel:4356498284" className="text-accent hover:underline">435.649.8284</a> for dinner reservations only please.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <CalendarCheck size={32} className="text-accent mr-3" />
                <h4 className="font-serif text-xl">Book Your Table</h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <User className="absolute top-3 left-3 text-muted-foreground" size={16} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute top-3 left-3 text-muted-foreground" size={16} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <Calendar className="absolute top-3 left-3 text-muted-foreground" size={16} />
                    <input
                      type="date"
                      name="date"
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute top-3 left-3 text-muted-foreground" size={16} />
                    <select
                      name="time"
                      className="w-full pl-10 pr-4 py-3 rounded-md border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition appearance-none"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">Number of Guests</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`flex-1 py-2 border ${
                          formData.guests === num
                            ? "bg-accent text-white border-accent"
                            : "border-border hover:bg-accent/10"
                        } ${num === 1 ? "rounded-l-md" : ""} ${
                          num === 8 ? "rounded-r-md" : ""
                        } transition-colors`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, guests: num }))
                        }
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    rows={3}
                    className="w-full px-4 py-3 rounded-md border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                    placeholder="Allergies, special occasions, etc."
                    value={formData.specialRequests}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Book Table"
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <div className="overflow-hidden rounded-lg shadow-xl h-full min-h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="The Eating Establishment dining area"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
