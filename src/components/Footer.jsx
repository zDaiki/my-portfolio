import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/zDaiki', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/bishal-maharjan-376b11300/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/bishal__maharjan/', label: 'Twitter' },
    { icon: <FaEnvelope />, url: '#', label: 'Email' }
  ];

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get navbar height to offset scrolling position
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* About Column */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Bishal Maharjan</h3>
            <p className="text-gray-300 mb-4">
              Frontend developer passionate about creating user-friendly and visually appealing web apps.
              Always exploring new technologies and approaches to deliver the best user experiences.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xl"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.toLowerCase());
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <span className="mr-2">→</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
            <p className="text-gray-300 mb-2">Have a project in mind? Let's talk!</p>
            <p className="text-gray-300 mb-2">
              <span className="font-medium text-blue-400">Email:</span> mrznbishal@gmail.com
            </p>
            <p className="text-gray-300 mb-6">
              <span className="font-medium text-blue-400">Based in:</span> Kathmandu, Nepal
            </p>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Bishal Maharjan. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Designed & Developed  by Bishal Maharjan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;