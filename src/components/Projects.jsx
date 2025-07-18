import React from 'react';
import todo from '../assets/todo.png'
import weather from '../assets/weather.png'
import product from '../assets/product.png'
import bookstore from '../assets/bookstore.png'
import movie from '../assets/Movie.png'
import Gym from '../assets/gym.png'
import expense from '../assets/expense.png'
import expensetracker from '../assets/expensetracker.png'
import ticket from '../assets/ticket.png'
import auth from '../assets/auth.png'


const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Movie-Ticket Booking Website',
      image: ticket,
      description: 'Movie Ticket booking made using MERN stack where user can login and book ticket along with seats and esewa payment integration',
      technologies: ['React', 'Expressjs', 'MongoDB', 'Nodejs' ],
      link: 'https://movie-show-zeta.vercel.app/',
    },
    {
      id: 2,
      title: 'Book Recommendation System',
      image: bookstore,
      description: 'Book Recommendation System is a web-based application designed to help users discover books based on their preferences and interests. It analyzes key attributes such as book descriptions, authors, and genres to suggest similar titles, enhancing the users reading experience.',
      technologies: ['Php', 'HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/zDaiki/bookstore',
    },
    {
      id: 3,
      title: 'Authentication System',
      image: auth,
      description: 'Authentication system using MERN stack where user can Register, login, verify email and receive emails and OTP.',
      technologies: ['React', 'Expressjs', 'MongoDB', 'Nodejs' ],
      link: 'https://mern-auth-theta-red.vercel.app/login',
    },
    {
      id: 4,
      title: 'Expense Tracker',
      image: expensetracker,
      description: 'Expense tracker to record and categorize your daily spending.Gain insights into your financial habits and take control of your budget effortlessly.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      link: 'https://zexpensetracker.netlify.app',
    },
    
    {
      id: 5,
      title: 'E-commerce Product Catalog',
      image: product,
      description: 'An interactive product browsing system with real-time cart updates and responsive UI.',
      technologies: ['React', 'javaScript', 'Tailwindcss'],
      link: 'https://daiki-product-catalog.netlify.app/',
    },
    {
      id: 6,
      title: 'React Weather App',
      image: weather,
      description: 'Integrated an external API to fetch real-time weather data, enhancing user experience with modern UI/UX design.',
      technologies: ['React', 'javaScript', 'Tailwind CSS'],
      link: 'https://daiki-weather-app.netlify.app/',
    },
    {
      id: 7,
      title: 'Movie Website',
      image: movie,
      description: 'A movie discovery platform built with React and Tailwind CSS, offering a smooth, user-friendly experience. From new releases to top-rated films and hidden gems, find everything in one place!',
      technologies: ['React', 'javaScript', 'Tailwind CSS'],
      link: 'https://daikimovies.netlify.app/',
    },
    
    {
      id: 8,
      title: 'Gym Website',
      image: Gym,
      description: 'BakiFitness is a responsive gym website built with PHP and MySQL, featuring dynamic pages for trainers, class schedules, pricing plans, and a secure admin panel. It includes a contact form, CRUD operations, and mobile-friendly design using Bootstrap.',
      technologies: ['Php', 'HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/zDaiki/gym-website',
    },
    {
      id: 9,
      title: 'To-Do App',
      image: todo,
      description: 'A dynamic task management app leveraging React hooks (useState, useEffect) for seamless state management.',
      technologies: ['React', 'javaScript', 'CSS'],
      link: 'https://daiki-todo-app.netlify.app/',
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