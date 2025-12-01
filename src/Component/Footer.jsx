import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AiLogo from '../assets/ai logo.png'; // logo import

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10">
      {/* Grid layout: 1 column on mobile, 2-4 on larger screens */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <NavLink to="/" className="flex items-center gap-2 hover:scale-105 transition-transform" aria-label="AI MindPulse home">
            <img src={AiLogo} alt="AI Logo" className="w-10 h-10 object-contain" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 font-extrabold text-xl">
              AI MindPulse
            </span>
          </NavLink>
          <p className="text-gray-300 text-sm sm:text-base">
            Building delightful AI experiences with curated models, transparent datasets, and premium tooling.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h6 className="font-bold text-white mb-2">Navigate</h6>
          <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
            <li><NavLink to="/all-models" className="hover:text-cyan-400 transition-colors">All Models</NavLink></li>
            <li><NavLink to="/add-model" className="hover:text-cyan-400 transition-colors">Add Model</NavLink></li>
            <li><NavLink to="/purchase" className="hover:text-cyan-400 transition-colors">My Purchases</NavLink></li>
            <li><NavLink to="/mymodals" className="hover:text-cyan-400 transition-colors">My Model</NavLink></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h6 className="font-bold text-white mb-2">Support</h6>
          <ul className="space-y-1 text-gray-300 text-sm sm:text-base">
            <li><a href="mailto:support@example.com" className="hover:text-cyan-400 transition-colors">support@example.com</a></li>
            <li><NavLink to="/documentation" className="hover:text-cyan-400 transition-colors">Documentation</NavLink></li>
            <li><NavLink to="/community" className="hover:text-cyan-400 transition-colors">Community</NavLink></li>
          </ul>
        </div>

        {/* Social / Connect */}
        <div>
          <h6 className="font-bold text-white mb-2">Connect</h6>
          <div className="flex gap-4 mb-2">
            <a href="https://github.com/mca-programmer" target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-6 h-6 hover:text-cyan-400 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/md-musarraf-hosen/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-6 h-6 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 hover:text-sky-400 transition-colors" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            Stay in the loop. Design updates, release notes and inspiring AI stories.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-gray-400 text-sm text-center">
        © 2025 AI MindPulse. Crafted for modern model teams.
      </div>
    </footer>
  );
};

export default Footer;
