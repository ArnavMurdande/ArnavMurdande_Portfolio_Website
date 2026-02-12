import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import SectionBackground from './SectionBackground.jsx';
import VariableProximity from './VariableProximity.jsx';

const Experience = () => {
  const experiences = [
    {
      company: "Eazy ERP Technologies Pvt. Ltd.",
      role: "DMS Support Intern",
      period: "Feb 2026 – Aug 2026",
      description: [
        "Delivered ERP/DMS technical support resolving issues, troubleshooting workflows, coordinating bug fixes.",
        "Trained users on platform features and improved adoption of inventory, document, and operational modules.",
        "Documented recurring issues and shared feedback to improve knowledge resources and usability."
      ]
    }
  ];

  const [titleRef, titleVisible] = useReveal(0.1);
  const containerRef = useRef(null);

  return (
    <SectionBackground 
      opacity={0.3} 
      color1="#9ee2ff" 
      color2="#5227FF" 
      color3="#dfa3f0"
    >
      <section className="w-full py-24 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div
            ref={titleRef}
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
            className="mb-16 text-center"
          >
            <h2
              ref={containerRef}
              className="inline-block text-4xl md:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 cursor-default"
            >
               <VariableProximity
                label={'EXPERIENCE'}
                className={'variable-proximity-demo'}
                fromFontVariationSettings="'wght' 700, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
            </h2>
          </div>

          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </section>
    </SectionBackground>
  );
};

const ExperienceCard = ({ exp, index }) => {
  const [ref, isVisible] = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease, transform 0.8s ease`,
      }}
      className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/10 transition-colors duration-500 group"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-[Poppins] text-white group-hover:text-teal-200 transition-colors">
            {exp.company}
          </h3>
          <p className="text-lg text-gray-300 italic font-light mt-1">{exp.role}</p>
        </div>
        <span className="font-mono text-sm text-gray-400 bg-white/10 px-4 py-2 rounded-full whitespace-nowrap self-start">
          {exp.period}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/10 mb-6"></div>

      {/* Description Points */}
      <div className="space-y-4">
        {exp.description.map((desc, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-400 mt-2 shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
            <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
