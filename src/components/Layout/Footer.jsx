import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900  text-gray-300 py-10 pt-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Logo + Description */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <img
              src="/logo.png" // replace with your actual logo path
              alt="MovieApp Logo"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-white">MovieApp</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your go-to platform for movies, shows, studios, and actors. Stream,
            explore, and enjoy entertainment anytime, anywhere.
          </p>
        </div>

        {/* Browse */}
        <div>
          <h3 className="text-white font-semibold mb-4">Browse</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/movies" className="hover:text-white">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/shows" className="hover:text-white">
                Shows
              </Link>
            </li>
            <li>
              <Link to="/platform" className="hover:text-white">
                Platform
              </Link>
            </li>
            <li>
              <Link to="/studio" className="hover:text-white">
                Studio
              </Link>
            </li>
            <li>
              <Link to="/actors" className="hover:text-white">
                Actors
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className="hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Aspire Hall Play. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
