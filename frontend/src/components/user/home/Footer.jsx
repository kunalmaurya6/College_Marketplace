import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const quickLinks = [
    { label: "Home", to: "." },
    { label: "Products", to: "." },
    { label: "Sell", to: "/seller" },
    { label: "Profile", to: "profile" },
  ];

  const categories = ["Electronics", "Fashion", "Books", "Home Decor"];
  const helpLinks = ["Campus safety", "Buyer guide", "Seller tips", "Support"];

  return (
    <footer className="w-full mt-14 border-t border-gray-200 bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-[1500px] px-4 py-14 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-white p-2 shadow-md shadow-gray-200">
                <img src={logo} alt="ApanaMart logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">ApanaMart</h2>
                <p className="text-base text-blue-600">Campus marketplace</p>
              </div>
            </div>

            <p className="max-w-sm text-lg leading-8 text-gray-600">
              Buy and sell books, gadgets, furniture, and daily essentials inside your campus
              with a student-friendly marketplace experience.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-base text-gray-700 shadow-sm">
                <i className="fa-solid fa-shield-halved mr-2 text-blue-500"></i>
                Safe deals
              </span>
              <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-base text-gray-700 shadow-sm">
                <i className="fa-solid fa-user-graduate mr-2 text-blue-500"></i>
                Student focused
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-lg text-gray-600">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <NavLink to={link.to} className="transition hover:text-blue-600">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Categories</h3>
            <ul className="space-y-3 text-lg text-gray-600">
              {categories.map((category) => (
                <li key={category} className="transition hover:text-blue-600">
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Help</h3>
            <ul className="space-y-3 text-lg text-gray-600">
              {helpLinks.map((link) => (
                <li key={link} className="transition hover:text-blue-600">
                  {link}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex gap-3">
              <span className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-600 shadow-sm transition hover:border-blue-500 hover:bg-blue-500 hover:text-white">
                <i className="fa-brands fa-facebook-f"></i>
              </span>
              <span className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-600 shadow-sm transition hover:border-blue-500 hover:bg-blue-500 hover:text-white">
                <i className="fa-brands fa-x-twitter"></i>
              </span>
              <span className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-600 shadow-sm transition hover:border-pink-500 hover:bg-pink-500 hover:text-white">
                <i className="fa-brands fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-6 text-base text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 xl:px-10">
          <p>© {new Date().getFullYear()} ApanaMart. All rights reserved.</p>
          <p>Built for simple, trusted campus buying and selling.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
