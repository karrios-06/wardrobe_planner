import React from "react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`mt-12 py-6 border-t ${
        darkMode
          ? "border-gray-600 bg-gray-800 text-gray-300"
          : "border-gray-300 bg-indigo-50 text-gray-700"
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Wardrobe Final 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
