import React, { useState, useEffect, useRef } from 'react';

const sections = ['home', 'about', 'skills', 'projects', 'contact'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Handle closing on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle smooth scrolling for navigation links
  const scrollToSection = (sectionId) => {
    closeMenu();
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Get navbar height to offset scrolling position
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll events for highlighting active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add shadow when scrolled down
      setScrolled(currentScrollY > 20);

      // Close menu if open when scrolling
      if (isMenuOpen) closeMenu();

      // Update active section
      const scrollPosition = currentScrollY + 100; // Adding offset to account for navbar
      let activeFound = false;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          activeFound = true;
          break;
        }
      }
      
      // If no active section found (e.g., scrolled past last section)
      if (!activeFound && currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) {
        // We're at the bottom of the page, set the last section as active
        setActiveSection(sections[sections.length - 1]);
      } else if (!activeFound && sections.includes(activeSection)) {
        // When we've scrolled up past the first section
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, activeSection]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav 
      ref={navbarRef}
      className={`py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-filter ${
        scrolled
          ? 'bg-white bg-opacity-30 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-wide"
        >
          Daiki
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <div className="relative w-7 h-6">
            <span className={`absolute h-0.5 w-7 bg-gray-800 transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'rotate-45 top-3' : 'top-0'
            }`}></span>
            <span className={`absolute h-0.5 w-7 bg-gray-800 top-3 transition-all duration-200 ease-in-out ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute h-0.5 w-7 bg-gray-800 transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? '-rotate-45 top-3' : 'top-6'
            }`}></span>
          </div>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-10 items-center text-lg font-medium">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
              className={`relative group transition-colors duration-200 uppercase tracking-wide text-sm font-bold ${
                activeSection === section 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {section}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </a>
          ))}
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg transform transition-all duration-300 z-50 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col space-y-6 px-8 py-8 text-lg font-medium">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
                className={`transition-colors duration-200 uppercase tracking-wide text-base flex items-center ${
                  activeSection === section ? 'text-blue-600 font-bold' : 'text-gray-800 hover:text-blue-600'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full mr-2 transition-colors ${
                  activeSection === section ? 'bg-blue-600' : 'bg-transparent'
                }`}></span>
                {section}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;