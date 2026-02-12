import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import SectionBackground from './SectionBackground.jsx';
import VariableProximity from './VariableProximity.jsx';

const Education = () => {
    const [titleRef, titleVisible] = useReveal(0.1);
    const [cardRef, cardVisible] = useReveal(0.1);
    const containerRef = useRef(null);

    return (
        <SectionBackground
            opacity={0.25}
            color1="#f6d365"
            color2="#fda085"
            color3="#f093fb"
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
                            className="inline-block text-4xl md:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 cursor-default"
                            style={{ position: 'relative' }}
                        >
                            <VariableProximity
                                label={'EDUCATION'}
                                className={'variable-proximity-demo'}
                                fromFontVariationSettings="'wght' 700, 'opsz' 9"
                                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                containerRef={containerRef}
                                radius={100}
                                falloff='linear'
                            />
                        </h2>
                    </div>

                    <div
                        ref={cardRef}
                        style={{
                            opacity: cardVisible ? 1 : 0,
                            transform: cardVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
                        }}
                        className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/10 transition-colors duration-500 group"
                    >
                         {/* Top accent line */}
                        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent rounded-full"></div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold font-[Poppins] text-white group-hover:text-orange-200 transition-colors">
                                    Ramrao Adik Institute of Technology
                                </h3>
                                <p className="text-lg text-gray-300 italic font-light mt-1">B.Tech in Computer Engineering</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-mono text-sm text-gray-400 bg-white/10 px-4 py-2 rounded-full whitespace-nowrap">
                                    August 2026 (Expected)
                                </span>
                                <span className="font-mono text-xs text-gray-500">CGPA: 7.9 | SGPA: 8.89</span>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-white/10 mb-6"></div>

                        <div>
                            <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-widest text-orange-400">Relevant Coursework</h4>
                            <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
                                Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering, Artificial Intelligence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </SectionBackground>
    );
};

export default Education;
