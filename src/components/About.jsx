import React from 'react';
import daikiii from '../assets/daiki2.jpg';
import daikiiii from '../assets/daiki3.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Who am <span className="text-primary">I</span>?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              I'm a passionate frontend developer focused on building user-friendly and visually appealing web apps. I bring ideas to life through clean, efficient, and scalable code.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              I specialize in modern, responsive, and interactive web applications using <span className="font-medium text-primary">React, HTML, CSS, and JavaScript</span>. I'm obsessed with clean code, performance, and delivering seamless user experiences.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-72 h-96">
              {/* Background decorative element */}
              <div className="absolute w-full h-full bg-gradient-to-tr from-primary/30 to-secondary/20 rounded-xl -top-4 -left-4 z-0" />
              
              {/* First image */}
              <img
                src={daikiii}
                alt="About Me - Portrait"
                className="absolute z-10 w-full h-full object-cover rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105"
              />
              
              {/* Second image with offset positioning */}
              <div className="absolute -right-16 -bottom-8 w-3/4 h-3/4 z-20">
                <div className="w-full h-full p-1 bg-white rounded-xl shadow-lg">
                  <img
                    src={daikiiii}
                    alt="About Me - Casual"
                    className="w-full h-full object-cover rounded-lg transform transition-all duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;