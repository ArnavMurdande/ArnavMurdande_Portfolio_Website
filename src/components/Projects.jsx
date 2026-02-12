import React, { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import SectionBackground from "./SectionBackground.jsx";
import VariableProximity from "./VariableProximity.jsx";

const projects = [
  {
    title: "CodeWithMee",
    tech: "Java, Spring Boot, React,Gemini 3",
    description:
      "Built an agentic workflow integratingGemini 3 model for interactive coding queries and explanations. Designed automated reasoning steps, tool-use planning, and context-aware instruction generation. Integrated YouTube, IDE, and challenge modules with AI-powered personalized guidance.",
    link: "https://github.com/ArnavMurdande/CodeWithMee",
  },
  {
    title: "Academic Timetable Scheduler",
    tech: "Node.js, Express, PostgreSQL, React",
    description:
      "Built a conflict-free scheduling algorithm with a normalized relational schema for 500+ allocations. Optimized query performance using indexes and transaction-safe operations, reducing response time. Achieved 95% test coverage with automated CI pipelines and real-time resource tracking.",
    link: "https://github.com/ArnavMurdande/College-Timetable-System",
  },
  {
    title: "AI-Powered Resume Screening with RAG",
    tech: "Python, FastAPI, React, Supabase, Gemini",
    description:
      "Built an intelligent resume screening platform using RAG to semantically match candidates to jobs beyond keywords. Designed a PGvector + Gemini embedding pipeline for evidence-backed scoring, recruiter chat with grounded responses, and anomaly-safe retrieval. Deployed a scalable full-stack system with automated evaluation and rate-limit resilient APIs.",
    link: "https://github.com/ArnavMurdande/Resume-screener",
    liveLink: "https://resume-screener-tau.vercel.app",
  },
  {
    title: "Fraud Detection System with Synthetic Financial Transactions",
    tech: "Python, XGBoost, SHAP, Neo4j",
    description:
      "Built an end-to-end fraud detection pipeline using synthetic transaction data to simulate real-world attack patterns. Engineered time-aware behavioral features and trained a cost-sensitive XGBoost model achieving 0.98 ROC-AUC. Implemented SHAP-based explainability for regulatory transparency and added graph analytics to detect fraud rings and shared-device abuse. Designed a modular architecture for real-time scoring with feedback-driven retraining.",
    link: "https://github.com/ArnavMurdande/fraud-detection-system",
  },
];

const ProjectCard = ({ project, index }) => {
  const [ref, isVisible] = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`,
      }}
      className="project-card relative group bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Decorative Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"></div>

      <h3 className="text-2xl md:text-3xl font-bold font-[Poppins] mb-2 z-10 relative">
        {project.title}
      </h3>
      <p className="text-sm font-mono text-teal-300 mb-4 z-10 relative">
        {project.tech}
      </p>

      <div className="w-full h-[1px] bg-white/10 mb-4 z-10 relative"></div>

      <p className="text-gray-300 mb-6 font-light leading-relaxed z-10 relative text-sm md:text-base flex-grow">
        {project.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-3 z-10 relative">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/20 rounded-full text-xs font-mono hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            VIEW ON GITHUB
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-teal-500/20 border border-teal-400/30 rounded-full text-xs font-mono text-teal-300 hover:bg-teal-400 hover:text-black transition-colors inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            LIVE APP
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [titleRef, titleVisible] = useReveal(0.1);
  const containerRef = useRef(null);

  return (
    <SectionBackground
      opacity={0.25}
      color1="#5ee7df"
      color2="#b490ca"
      color3="#667eea"
    >
      <section className="w-full min-h-screen py-20 px-4 md:px-10 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            ref={titleRef}
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
            className="mb-12 text-center"
          >
            <h2
              ref={containerRef}
              className="inline-block text-4xl md:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 cursor-default"
              style={{ position: "relative" }}
            >
              <VariableProximity
                label={"PROJECTS"}
                className={"variable-proximity-demo"}
                fromFontVariationSettings="'wght' 700, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </SectionBackground>
  );
};

export default Projects;
