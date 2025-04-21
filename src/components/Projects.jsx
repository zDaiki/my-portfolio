import React from 'react';
import todo from '../assets/todo.png'
import weather from '../assets/weather.png'
import product from '../assets/product.png'
import bookstore from '../assets/bookstore.png'
import movie from '../assets/Movie.png'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'To-Do App',
      image: todo,
      description: 'A dynamic task management app leveraging React hooks (useState, useEffect) for seamless state management.',
      technologies: ['React', 'javaScript', 'CSS'],
      link: 'https://daiki-todo-app.netlify.app/',
    },
    {
      id: 2,
      title: 'E-commerce Product Catalog',
      image: product,
      description: 'An interactive product browsing system with real-time cart updates and responsive UI.',
      technologies: ['React', 'javaScript', 'Tailwindcss'],
      link: 'https://daiki-product-catalog.netlify.app/',
    },
    {
      id: 3,
      title: 'React Weather App',
      image: weather,
      description: 'Integrated an external API to fetch real-time weather data, enhancing user experience with modern UI/UX design.',
      technologies: ['React', 'javaScript', 'Tailwind CSS'],
      link: 'https://daiki-weather-app.netlify.app/',
    },
    {
      id: 4,
      title: 'Movie Website',
      image: movie,
      description: 'A movie discovery platform built with React and Tailwind CSS, offering a smooth, user-friendly experience. From new releases to top-rated films and hidden gems, find everything in one place!',
      technologies: ['React', 'javaScript', 'Tailwind CSS'],
      link: 'https://daikimovies.netlify.app/',
    },
    {
      id: 5,
      title: 'Book Recommendation System',
      image: bookstore,
      description: 'Book Recommendation System is a web-based application designed to help users discover books based on their preferences and interests. It analyzes key attributes such as book descriptions, authors, and genres to suggest similar titles, enhancing the users reading experience.',
      technologies: ['Php', 'HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/zDaiki/bookstore',
    }
  ];
  
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Here are some of my recent works showcasing my skills and expertise in frontend development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="p-6 w-full">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-full py-3 bg-primary text-white font-medium rounded-lg text-center transition-all hover:bg-primary/90"
                    >
                      View Demo
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-600 mb-5 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;