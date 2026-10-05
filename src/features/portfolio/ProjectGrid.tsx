import React from 'react';
import { Project } from '../../types';
import { projectData } from '../../data/portfolioData';

export const ProjectGrid: React.FC = () => {
  return (
    <section id="work" className="py-20 lg:py-28 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto border-t border-[#1f1e1a]">
      <div className="mb-14">
        <span className="text-[#a99775] text-[11px] tracking-[0.28em] uppercase font-sans font-medium mb-3 block">
          04. SELECTED WORK
        </span>
        <h2 className="text-3xl lg:text-4xl font-serif text-[#dfd6c5] uppercase tracking-[0.08em] mb-4 font-normal">
          FEATURED PROJECTS
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-[#cba864] to-transparent mb-6"></div>
        <p className="text-[#867d71] max-w-md text-xs sm:text-sm leading-relaxed font-sans font-normal">
          Selected projects built with precision, intent, and attention to every detail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project: Project) => (
          <div 
            key={project.id} 
            className="group cursor-pointer flex flex-col h-full bg-[#0d0d0c] border border-[#1f1e1a] hover:border-[#cba864]/40 transition-all duration-500 overflow-hidden shadow-xl"
          >
            <div className="relative h-60 overflow-hidden w-full bg-[#080808]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out filter sepia-[0.25] contrast-[1.05]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-transparent to-transparent opacity-90"></div>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col flex-grow relative">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-[9px] uppercase tracking-[0.2em] text-[#a99775] border border-[#3e3422] px-2 py-0.5 font-sans">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-serif text-[#dfd6c5] tracking-wider mb-3 uppercase group-hover:text-[#edd6a3] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-[#867d71] leading-relaxed mb-6 flex-grow font-sans font-normal">
                {project.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-[#1f1e1a] flex items-center text-[11px] tracking-[0.24em] text-[#cfb682] group-hover:text-[#fff] transition-colors uppercase font-medium">
                VIEW PROJECT 
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300 font-normal">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a href="#work" className="inline-flex items-center text-[11px] tracking-[0.26em] uppercase text-[#cfb682] hover:text-[#fff] transition-all pb-1.5 border-b border-[#5e4d2d] hover:border-[#cfb682] font-medium">
          VIEW ALL PROJECTS <span className="ml-2.5 font-normal">→</span>
        </a>
      </div>
    </section>
  );
};

