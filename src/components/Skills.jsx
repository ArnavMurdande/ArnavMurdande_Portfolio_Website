import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import SectionBackground from './SectionBackground.jsx';
import VariableProximity from './VariableProximity.jsx';
import { 
  SiJavascript, SiPython, SiTypescript, SiNodedotjs, SiExpress, SiDjango, SiFlask,
  SiLangchain, SiHuggingface, SiTensorflow, SiPytorch,
  SiDocker, SiKubernetes, SiGit, SiGithub,
  SiPostgresql, SiMongodb, SiMysql, SiSupabase,
  SiLinux, SiVercel, SiRender
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';

const skills = [
  { 
    category: "LANGUAGES", 
    items: [
      { name: "JavaScript", icon: SiJavascript, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E" },
      { name: "Python", icon: SiPython, link: "https://www.python.org/", color: "#3776AB" },
      { name: "TypeScript", icon: SiTypescript, link: "https://www.typescriptlang.org/", color: "#3178C6" },
      { name: "Java", icon: FaJava, link: "https://www.java.com/", color: "#007396" },
    ]
  },
  { 
    category: "BACKEND", 
    items: [
      { name: "Node.js", icon: SiNodedotjs, link: "https://nodejs.org/", color: "#68A063" },
      { name: "Express", icon: SiExpress, link: "https://expressjs.com/", color: "#ffffff" },
      { name: "Django", icon: SiDjango, link: "https://www.djangoproject.com/", color: "#ffffff" },
      { name: "Flask", icon: SiFlask, link: "https://flask.palletsprojects.com/", color: "#ffffff" },
    ]
  },
  { 
    category: "AI / ML", 
    items: [
      { name: "LangChain", icon: SiLangchain, link: "https://langchain.com/", color: "#ffffff" },
      { name: "Hugging Face", icon: SiHuggingface, link: "https://huggingface.co/", color: "#FFD21E" },
      { name: "TensorFlow", icon: SiTensorflow, link: "https://www.tensorflow.org/", color: "#FF6F00" },
      { name: "Pytorch", icon: SiPytorch, link: "https://pytorch.org/", color: "#EE4C2C" }
    ]
  },
  { 
    category: "DEVOPS", 
    items: [
      { name: "Docker", icon: SiDocker, link: "https://www.docker.com/", color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, link: "https://kubernetes.io/", color: "#326CE5" },
      { name: "Git", icon: SiGit, link: "https://git-scm.com/", color: "#F05032" },
      { name: "GitHub", icon: SiGithub, link: "https://github.com/", color: "#ffffff" }
    ]
  },
  { 
    category: "DATABASES", 
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, link: "https://www.postgresql.org/", color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, link: "https://www.mongodb.com/", color: "#47A248" },
      { name: "MySQL", icon: SiMysql, link: "https://www.mysql.com/", color: "#4479A1" },
      { name: "Supabase", icon: SiSupabase, link: "https://supabase.com/", color: "#3ECF8E" }
    ]
  },
  { 
    category: "CLOUD", 
    items: [
      { name: "AWS", icon: FaAws, link: "https://aws.amazon.com/", color: "#FF9900" },
      { name: "Linux", icon: SiLinux, link: "https://www.linux.org/", color: "#FCC624" },
      { name: "Vercel", icon: SiVercel, link: "https://vercel.com/", color: "#ffffff" },
      { name: "Render", icon: SiRender, link: "https://render.com/", color: "#46E3B7" }
    ]
  },
];

const SkillGroup = ({ skillGroup, index }) => {
  const [ref, isVisible] = useReveal(0.05);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
      className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
    >
      <h3 className="text-xl font-bold font-[Poppins] mb-6 text-gray-200 border-b border-white/10 pb-2 inline-block">
        {skillGroup.category}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {skillGroup.items.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group p-2 hover:bg-white/5 rounded-lg transition-all duration-300 hover:-translate-y-1"
            title={item.name}
          >
            <div className="w-10 h-10 relative flex items-center justify-center">
                <item.icon 
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{ 
                        color: item.color,
                        filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.1))'
                    }}
                />
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-gray-400 group-hover:text-white transition-colors text-center truncate w-full">
                {item.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [titleRef, titleVisible] = useReveal(0.1);
  const containerRef = useRef(null);

  return (
    <SectionBackground
      opacity={0.25}
      color1="#FF9FFC"
      color2="#5227FF"
      color3="#B19EEF"
    >
      <section className="w-full py-20 px-4 md:px-10 text-white">
        <div className="max-w-6xl mx-auto">
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
              className="inline-block text-4xl md:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 cursor-default"
              style={{ position: 'relative' }}
            >
              <VariableProximity
                label={'SKILLS'}
                className={'variable-proximity-demo'}
                fromFontVariationSettings="'wght' 700, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {skills.map((skillGroup, index) => (
              <SkillGroup key={index} skillGroup={skillGroup} index={index} />
            ))}
          </div>
        </div>
      </section>
    </SectionBackground>
  );
};

export default Skills;
