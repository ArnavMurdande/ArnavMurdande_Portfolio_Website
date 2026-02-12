import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import SectionBackground from './SectionBackground.jsx';
import VariableProximity from './VariableProximity.jsx';

const Certifications = () => {
    const certifications = [
        {
            title: "Google Data Analytics Professional Certificate",
            issuer: "Coursera",
            link: "https://www.coursera.org/account/accomplishments/professional-cert/WGIDFFLA0WR2",
            skills: "R, SQL, Data Visualization"
        },
        {
            title: "Google Advanced Data Analytics Professional Certificate",
            issuer: "Coursera",
            link: "https://www.coursera.org/account/accomplishments/professional-cert/HOJH6DL2J0R8",
            skills: "Python, Machine Learning, Statistics"
        },
        {
            title: "IBM Data Science Professional Certificate",
            issuer: "Coursera",
            link: "https://www.coursera.org/account/accomplishments/professional-cert/Q2QIMLTF26D0",
            skills: "Python, SQL, Data Analysis, Visualization, ML"
        },
        {
            title: "AWS Academy Graduate - Cloud Foundations",
            issuer: "Credly",
            link: "https://www.credly.com/badges/fa6a1737-6e7e-4a4c-bf73-3133118fb1f5/public_url",
            skills: "Cloud Concepts, Security, Architecture"
        },
        {
            title: "AWS Academy Graduate - Cloud Architecting",
            issuer: "Credly",
            link: "https://www.credly.com/badges/bdd541c8-9372-4c8b-ae9c-b212d5232e0f/print",
            skills: "AWS Services, Cloud Architecture, Deployment"
        },
        {
            title: "IBM Full Stack Software Developer Professional Certificate",
            issuer: "Coursera",
            link: "https://www.coursera.org/account/accomplishments/professional-cert/X23EPEI9HBPR",
            skills: "React, Node.js, Docker, Kubernetes, CI/CD"
        }
    ];

    const achievements = [
        {
            title: "Google Agentic AI Day - Finalist",
            description: "Top 50 of 1,200+ participants. Built GenAI application with API-driven architecture.",
            link: "https://certificate.hack2skill.com/user/aidayfinalist-1/2025H2S06AID-F01016"
        },
        {
            title: "Quasar 3.0 Hackathon",
            description: "Developed platform with automated testing, 95% code coverage, and CI/CD pipelines.",
            link: "#"
        }
    ];

    const [achTitleRef, achTitleVis] = useReveal(0.1);
    const [certTitleRef, certTitleVis] = useReveal(0.1);
    const achRef = useRef(null);
    const certRef = useRef(null);

    return (
        <SectionBackground
            opacity={0.25}
            color1="#a8e063"
            color2="#56ab2f"
            color3="#f7d794"
        >
            <section className="w-full py-20 px-4 md:px-10 text-white">
                <div className="max-w-6xl mx-auto">

                    {/* ACHIEVEMENTS */}
                    <div
                        ref={achTitleRef}
                        style={{
                            opacity: achTitleVis ? 1 : 0,
                            transform: achTitleVis ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'opacity 0.8s ease, transform 0.8s ease',
                        }}
                        className="mb-12 text-center"
                    >
                        <h2
                            ref={achRef}
                            className="inline-block text-4xl md:text-5xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 cursor-default"
                            style={{ position: 'relative' }}
                        >
                            <VariableProximity
                                label={'ACHIEVEMENTS'}
                                className={'variable-proximity-demo'}
                                fromFontVariationSettings="'wght' 700, 'opsz' 9"
                                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                containerRef={achRef}
                                radius={100}
                                falloff='linear'
                            />
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {achievements.map((ach, index) => (
                            <AchievementCard key={index} ach={ach} index={index} />
                        ))}
                    </div>

                    {/* CERTIFICATIONS */}
                    <div
                        ref={certTitleRef}
                        style={{
                            opacity: certTitleVis ? 1 : 0,
                            transform: certTitleVis ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'opacity 0.8s ease, transform 0.8s ease',
                        }}
                        className="mb-12 text-center"
                    >
                        <h2
                            ref={certRef}
                            className="inline-block text-4xl md:text-5xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 cursor-default"
                            style={{ position: 'relative' }}
                        >
                            <VariableProximity
                                label={'CERTIFICATIONS'}
                                className={'variable-proximity-demo'}
                                fromFontVariationSettings="'wght' 700, 'opsz' 9"
                                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                containerRef={certRef}
                                radius={100}
                                falloff='linear'
                            />
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <CertCard key={index} cert={cert} index={index} />
                        ))}
                    </div>

                </div>
            </section>
        </SectionBackground>
    );
};

const AchievementCard = ({ ach, index }) => {
    const [ref, isVisible] = useReveal(0.1);
    return (
        <a
            ref={ref}
            href={ach.link !== "#" ? ach.link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
            }}
            className={`block p-6 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-xl hover:bg-yellow-500/20 transition-colors duration-300 ${ach.link === "#" ? 'cursor-default' : 'cursor-pointer'}`}
        >
            <h3 className="text-xl font-bold font-[Poppins] text-yellow-500 mb-2">{ach.title}</h3>
            <p className="text-gray-300 font-light">{ach.description}</p>
        </a>
    );
};

const CertCard = ({ cert, index }) => {
    const [ref, isVisible] = useReveal(0.1);
    return (
        <a
            ref={ref}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
            }}
            className="block p-6 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors duration-300 group"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">{cert.issuer}</span>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
            <h3 className="text-lg font-bold font-[Poppins] text-white group-hover:text-emerald-300 transition-colors mb-2 min-h-[3.5rem]">
                {cert.title}
            </h3>
            <p className="text-sm text-gray-400 font-light">
                Skills: {cert.skills}
            </p>
        </a>
    );
};

export default Certifications;
