
import React, { useState, useRef, useEffect } from "react";

interface MenuItem {
  name: string;
  price: string;
  description?: string;
  subcategory?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    title: "HOUSE SPECIALTIES",
    items: [
      {
        name: "3 EGG OMELETTE",
        price: "$18.00",
        description: "SERVED WITH BREAKFAST POTATOES AND TOAST WITH YOUR CHOICE OF 3 INGREDIENTS: BELL PEPPER, SPINACH, KALE, ONIONS, MUSHROOMS, TOMATO, HAM, BACON, CHEDDAR, SWISS, FETA"
      },
      {
        name: "2 EGG BREAKFAST",
        price: "$15.00",
        description: "2 EGGS ANY STYLE WITH BREAKFAST POTATOES AND TOAST"
      },
      {
        name: "LOADED BAKED POTATO OMELETTE",
        price: "$17.00",
        description: "3 EGGS, BACON, CHEDDAR, FRIED POTATOES, SOUR CREAM, SCALLIONS WITH MIXED GREEN SIDE SALAD WITH GRANDMAS DRESSING AND TOAST"
      },
      {
        name: "CORNED BEEF HASH AND EGGS SKILLET",
        price: "$19.00",
        description: "2 EGGS ANY STYLE, CHOPPED CORNED BEEF, FRIED ONIONS WITH BREAKFAST POTATOES"
      },
      {
        name: "BREAKFAST SANDWICH",
        price: "$17.00",
        description: "1 EGG ANY STYLE, BRIOCHE BUN, GARLIC AIOLI, CHEESE, CHOICE OF HAM OR BACON WITH BREAKFAST POTATOES"
      }
    ]
  },
  {
    title: "PANCAKES & FRENCH TOAST",
    items: [
      {
        name: "BUTTERMILK PANCAKES",
        price: "$14.00",
        subcategory: "Short Stack (2)"
      },
      {
        name: "BUTTERMILK PANCAKES",
        price: "$15.00",
        subcategory: "Tall Stack (3)"
      },
      {
        name: "FRENCH TOAST",
        price: "$15.00",
        description: "SERVED WITH LEMON CURD IMPORTED FROM PORTUGAL"
      }
    ]
  },
  {
    title: "LIGHT BREAKFAST",
    items: [
      {
        name: "FRUIT CUP",
        price: "$8.00",
        description: "CUP OF THE VERY FINEST FRESH FRUIT"
      },
      {
        name: "FRUIT BOWL",
        price: "$12.00",
        description: "BOWL OF THE VERY FINEST FRESH FRUIT"
      },
      {
        name: "AVOCADO TOAST",
        price: "$16.00",
        description: "BREAD PROVIDED BY RED BICYCLE BREADWORKS AND COMES WITH AVOCADO SPREAD, OLIVE OIL, KOSHER SALT, CRACKED BLACK PEPPER"
      }
    ]
  },
  {
    title: "SIDE ORDERS",
    items: [
      { name: "HAM", price: "$5.50" },
      { name: "BACON", price: "$5.50" },
      { name: "BREAKFAST POTATOES", price: "$5.50" },
      { name: "ONE EGG", price: "$3.00" },
      { name: "TOAST", price: "$4.00" },
      { name: "ENGLISH MUFFIN", price: "$4.00" },
      { name: "CHIPS & SALSA", price: "$5.00" },
      { name: "FRIES", price: "$6.00" },
      { name: "OLIVES", price: "$6.00" },
      { name: "SMOKED SALMON", price: "$6.00" }
    ]
  }
];

const MenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("BREAKFAST");
  const sectionRef = useRef<HTMLElement>(null);

  const tabs = ["BREAKFAST", "LUNCH & DINNER", "KIDS"];

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
    <section
      id="menus"
      ref={sectionRef}
      className="section-padding bg-restaurant-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-restaurant-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-restaurant-300 rounded-full opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="section-heading mb-4">Menus</h2>
          <div className="h-0.5 w-24 bg-accent mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            FOOD MENUS
          </p>
        </div>

        {/* Menu tabs */}
        <div className="flex justify-center mb-12 reveal">
          <div className="inline-flex bg-white p-1 rounded-lg shadow">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab
                    ? "bg-accent text-white shadow-sm"
                    : "hover:bg-accent/10"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Menu content */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12 reveal" style={{ transitionDelay: "200ms" }}>
          {activeTab === "BREAKFAST" && (
            <div className="space-y-12">
              <p className="text-center text-sm mb-8">
                SERVED WITH: BUTTER CHIPS, POWDERED SUGAR, WHIPPED CREAM & SYRUP
              </p>

              {menuData.map((category, index) => (
                <div key={index} className="menu-category">
                  <h3 className="font-serif text-2xl mb-6 pb-2 border-b border-restaurant-200">
                    {category.title}
                  </h3>
                  <div className="space-y-6">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="menu-item">
                        <div className="menu-item-header">
                          <div className="menu-item-name">
                            {item.name}
                            {item.subcategory && (
                              <span className="text-sm text-muted-foreground ml-2">
                                ({item.subcategory})
                              </span>
                            )}
                          </div>
                          <div className="menu-item-price">{item.price}</div>
                        </div>
                        {item.description && (
                          <div className="menu-item-description">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="border-t border-restaurant-200 pt-6 mt-10 text-center text-muted-foreground">
                <p>*ADD $1 EACH FOR EXTRAS</p>
                <p>*ADD $4 FOR HAM OR BACON</p>
                <p>*ADD $4 FOR FRUIT</p>
                <p>*ADD $7 FOR FRODY'S SWEET OR SPICY SAUSAGE</p>
              </div>
            </div>
          )}

          {activeTab === "LUNCH & DINNER" && (
            <div className="flex items-center justify-center h-64">
              <p className="text-lg text-muted-foreground">
                Please visit us to see our current lunch & dinner menu options.
              </p>
            </div>
          )}

          {activeTab === "KIDS" && (
            <div className="flex items-center justify-center h-64">
              <p className="text-lg text-muted-foreground">
                Please visit us to see our kids menu options.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
