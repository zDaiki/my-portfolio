import React from 'react';
import {
  FaReact,
  FaAngular,
  FaPhp,
  FaDatabase,
  FaJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: 'React', icon: <FaReact className="text-blue-500 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
      { name: 'Angular', icon: <FaAngular className="text-red-600 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
      { name: 'JavaScript', icon: <FaJs className="text-yellow-500 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-600 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-600 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-500 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: 'PHP', icon: <FaPhp className="text-indigo-500 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
      { name: 'MySQL', icon: <FaDatabase className="text-yellow-600 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
    ]
  },
  {
    name: "Tools",
    skills: [
      { name: 'Git', icon: <FaGitAlt className="text-orange-500 text-5xl group-hover:scale-110 transition-transform duration-300" /> },
    ]
  }
];

const SkillCard = ({ skill }) => {
  return (
    <div 
      className="group flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        {skill.icon}
      </div>
      <span className="mt-4 font-medium text-gray-800">{skill.name}</span>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = React.useState("all");
  
  const filteredSkills = activeCategory === "all" 
    ? skillCategories.flatMap(category => category.skills)
    : skillCategories.find(category => category.name === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">My <span className='text-primary'>Skills</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">My professional toolkit includes these technologies that I've mastered over the years</p>
          
          <div className="flex justify-center mt-8 space-x-2">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Skills
            </button>
            {skillCategories.map(category => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category.name 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;