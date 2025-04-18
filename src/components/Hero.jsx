import React from 'react';
import daiki from '../assets/daiki.jpg';

const Hero = () => {
  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              Hi, I'm <span className="text-primary">Bishal Maharjan</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 font-semibold mb-6">
              Frontend Developer
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              I craft responsive, engaging web experiences using modern tech stacks that help businesses achieve their digital goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition cursor-pointer"
              >
                View Work
              </button>
              <a 
                href="/bishal--Resume.pdf" 
                download="bishalResume.pdf"
                className="px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-md hover:bg-primary/70 transition"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center relative">
            {/* Glow background */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-primary to-secondary rounded-full blur-2xl opacity-30 animate-pulse -z-10" />
            
            {/* Profile Image */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[6px] border-white shadow-2xl">
              <img
                src={daiki}
                alt="Bishal Maharjan"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;