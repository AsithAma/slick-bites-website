
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-restaurant-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-xl mb-6">The Eating Establishment</h3>
            <p className="text-restaurant-200 mb-6">
              A Park City institution since 1972, serving classic comfort food with a modern twist.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-restaurant-800 hover:bg-accent text-white p-2.5 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-restaurant-800 hover:bg-accent text-white p-2.5 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-restaurant-800 hover:bg-accent text-white p-2.5 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-6">Open Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>8:00 AM - 9:00 PM</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-restaurant-300">
              Hours may vary seasonally
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="text-accent font-bold mr-2">Address:</span>
                <span className="text-restaurant-200">
                  317 Main Street, Park City, UT, 84060
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-accent font-bold mr-2">Phone:</span>
                <a
                  href="tel:4356498284"
                  className="text-restaurant-200 hover:text-white transition-colors"
                >
                  435.649.8284
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-accent font-bold mr-2">Email:</span>
                <a
                  href="mailto:info@eatingestablishment.com"
                  className="text-restaurant-200 hover:text-white transition-colors"
                >
                  info@eatingestablishment.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-restaurant-800 pt-8 text-center text-restaurant-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} The Eating Establishment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
