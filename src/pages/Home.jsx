// src/pages/Home.jsx
import React, { useLayoutEffect } from 'react';
import ColorBends from '../components/ColorBends.jsx';
import Experience from '../components/Experience.jsx';
import Projects from '../components/Projects.jsx';
import Skills from '../components/Skills.jsx';
import Education from '../components/Education.jsx';
import Certifications from '../components/Certifications.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/landing.css'; 

const Home = ({ previewOnly = false }) => {
  useLayoutEffect(() => {
    if (!previewOnly) {
      window.scrollTo(0, 0);
    }
  }, [previewOnly]);

  return (
    <main className={`w-full bg-[#050505] m-0 p-0 relative scroll-smooth ${previewOnly ? 'h-full' : 'min-h-screen'}`}>
      
      {/* GLOBAL FIXED BACKGROUND - Seamless across all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <ColorBends 
              colors={["#FF0000","#ebeb4dff", "#32e432ff", "#0000FF"]}
              rotation={0}        
              speed={0.2}         
              scale={1}           
              frequency={1}       
              warpStrength={1}    
              mouseInfluence={1}  
              parallax={0.5}        
              noise={0.1}           
              transparent={true} 
          />
      </div>

      {/* SECTION 1: INTRODUCTION */}
      <section id="introduction" className={`relative z-10 w-full m-0 p-0 flex flex-col justify-center ${previewOnly ? 'h-full' : 'min-h-screen'}`}>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 py-20">
               <h1
            className="text-7xl md:text-9xl lg:text-[10rem] xl:text-[10rem] leading-none transform scale-x-110 origin-center font-[Anton] text-white/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap select-none"
          >
            ARNAV
          </h1>

          <h1
            className="text-7xl md:text-9xl lg:text-[10rem] xl:text-[10rem] leading-none transform scale-x-110 origin-center font-[Anton] text-white/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap mb-8 select-none"
          >
            MURDANDE
          </h1>
              <div className="text-center max-w-2xl drop-shadow-lg">
                  <p className="font-[Poppins] text-lg md:text-xl text-white/80 font-light tracking-wide leading-relaxed">
                      AI & SOFTWARE ENGINEER
                  </p>
                  <div className="w-24 h-1 bg-white/50 mx-auto my-6 rounded-full backdrop-blur-sm"></div>
                  <p className="font-mono text-sm md:text-base text-white/60">
                      Building scalable full-stack architectures, agentic workflows, and
                      applied Generative AI systems. 
                  </p>
              </div>
              
              {/* Scroll Down Indicator - only if not preview */}
              {!previewOnly && (
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
          </div>
      </section>

      {/* Only render sections if NOT in preview mode */}
      {!previewOnly && (
        <div className="relative z-10 bg-black/60 backdrop-blur-md">
          {/* SECTION 2: EXPERIENCE */}
          <Experience />

          {/* SECTION 3: PROJECTS */}
          <Projects />

          {/* SECTION 4: SKILLS */}
          <Skills />

          {/* SECTION 5: EDUCATION */}
          <Education />

          {/* SECTION 6: CERTIFICATIONS & ACHIEVEMENTS */}
          <Certifications />

          {/* FOOTER */}
          <Footer />
        </div>
      )}

    </main>
  );
};

export default Home;