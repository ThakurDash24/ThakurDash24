import React, { useRef, useEffect } from 'react';
import Section from '../components/Section';


const projects = [
    {
        title: 'AGENTIO - Blog Writing Agent',
        description:
            'Inspired by a CampusX build, I engineered a local LLM blog agent that runs end-to-end: Ollama + Docker on WSL2, backend orchestration, frontend delivery, and Tavily search for fresh context. It scrapes, structures, and outputs ready-to-post Markdown with prompt tuning, temperature control, and model selection lessons learned from real failures.',
        tags: ['Ollama', 'Docker', 'WSL2', 'Agentic AI'],
        link: 'https://blog-writing-agent.vercel.app/',
        github: 'https://github.com/ThakurDash24/Blog-Writing-Agent',
        latest: true,
    },
    {
        title: 'Resumyzer - AI Resume Analyzer',
        description:
            'Job seekers often struggle to know if their resumes are ATS-friendly. I built Resumyzer, an AI-powered analyzer that evaluates resumes in real-time, highlights gaps, and delivers actionable feedback to help candidates optimize with confidence.',
        tags: ['React + TS', 'FastAPI', 'Supabase'],
        link: 'https://resumyzer24.vercel.app',
        github: 'https://github.com/ThakurDash24/Resumyzer',
    },
    {
        title: 'SMS Spam Classifier',
        description:
            'With financial fraud rising through deceptive SMS, I built a robust TF-IDF machine learning pipeline to detect spam in real-time. Deployed via REST APIs with a Streamlit UI, this solution acts as a first line of defense for banking and financial communications.',
        tags: ['Python', 'Scikit-learn', 'NLP'],
        link: 'https://sms-spam-classifier-24.onrender.com',
        github: 'https://github.com/ThakurDash24/SMS_SPAM_CLASSIFIER_RENDER_DEPLOYED',
    },
    {
        title: 'EV Charging Chatbot',
        description:
            'EV users often face a lack of instant support. To bridge this gap, I developed a GenAI-powered chatbot backend using FastAPI. This system delivers secure, scalable APIs and integrates pre-built AI services to provide seamless, conversational assistance.',
        tags: ['FastAPI', 'GenAI', 'Backend'],
        link: 'https://unicharge-chatbot-24.onrender.com',
        github: 'https://github.com/ThakurDash24/UniCharge_Contibutor/tree/main/ml-engine/models/ChatBot',
    },
    {
        title: 'Personalised EV Wallet Backend',
        description:
            'Unpredictable charging costs can be a barrier for EV adoption. I created a backend system leveraging machine learning to forecast monthly energy expenses, empowering users with personalized financial insights and predictable budgeting.',
        tags: ['Machine Learning', 'Forecasting', 'Data Analysis'],
        link: 'https://unicharge-wallet-24.onrender.com',
        github: 'https://github.com/ThakurDash24/UniCharge_Contibutor/tree/main/ml-engine/models/Personalised_Wallet',
    },
];

const Projects = () => {
    const scrollRef = useRef(null);
    // Duplicate projects 3 times to create a seamless infinite loop effect
    // Set 1: Pre-buffer, Set 2: Active, Set 3: Post-buffer
    const infiniteProjects = [...projects, ...projects, ...projects];

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // Initialize scroll position to the start of the second set (middle)
        // This allows immediate scrolling to the left
        const initializeScroll = () => {
            const oneSetWidth = el.scrollWidth / 3;
            if (el.scrollLeft === 0) {
                el.scrollLeft = oneSetWidth;
            }
        };

        // We use a small timeout to ensure DOM is fully rendered and scrollWidth is accurate
        setTimeout(initializeScroll, 100);

        const handleScroll = () => {
            const oneSetWidth = el.scrollWidth / 3;

            // If we scroll past the end of Set 2 (into Set 3), jump back to end of Set 1 (start of Set 2)
            if (el.scrollLeft >= oneSetWidth * 2) {
                el.scrollLeft = oneSetWidth;
            }
            // If we scroll past the start of Set 2 (into Set 1), jump forward to start of Set 3 (end of Set 2)
            // Actually, simpler: if we reach 0, jump to oneSetWidth.
            else if (el.scrollLeft <= 0) {
                el.scrollLeft = oneSetWidth;
            }
        };

        el.addEventListener('scroll', handleScroll);

        return () => {
            el.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to handle card click for scrolling
    const handleCardClick = (e, link) => {
        if (e.target.closest('a') || e.target.closest('.project-title') || e.target.closest('.project-link')) {
            return;
        }

        e.currentTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -432, behavior: 'smooth' }); // Card width + gap
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 432, behavior: 'smooth' }); // Card width + gap
        }
    };

    return (
        <Section id="projects">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                Projects
            </h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '3rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    letterSpacing: '0.05em',
                    opacity: 0.9,
                    animation: 'luxuriousPulse 4s ease-in-out infinite',
                }}
            >
                <div>Slide to explore</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                    (Hover the title to Experience)
                </div>
            </div>

            {/* Container for scroll area + buttons */}
            <div style={{ position: 'relative', width: '100%' }}>

                <div
                    className="projects-scroll-container hide-scrollbar"
                    ref={scrollRef}
                >
                    {infiniteProjects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className="glass project-card"
                            onClick={(e) => handleCardClick(e, project.link)}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;

                                e.currentTarget.style.background = `radial-gradient(
                                    600px circle at ${x}px ${y}px,
                                    rgba(255,255,255,0.08),
                                    transparent 40%
                                )`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '';
                            }}
                        >
                            {/* Project Title (Live Link) */}
                            <h3
                                className="project-title"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
                                onClick={() => window.open(project.link, '_blank')}
                            >
                                {project.title}
                                {project.latest && (
                                    <span
                                        style={{
                                            fontSize: '0.65rem',
                                            letterSpacing: '0.06em',
                                            padding: '0.15rem 0.45rem',
                                            borderRadius: '999px',
                                            color: '#fff',
                                            background: 'rgba(255,255,255,0.15)',
                                            animation: 'focusPulse 1.6s ease-in-out infinite',
                                            whiteSpace: 'nowrap',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        LATEST
                                    </span>
                                )}
                            </h3>

                            <p className="project-description">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="project-tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="project-tag">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* GitHub Link */}
                            <div className="project-link-container">
                                <span
                                    className="project-link"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(project.github, '_blank');
                                    }}
                                >
                                    View on GitHub →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows Container - Perfectly Centered via Flexbox */}
                <div className="carousel-controls">
                    {/* Left Glass Arrow */}
                    <button
                        className="glass-arrow-btn"
                        onClick={scrollLeft}
                        aria-label="Scroll Left"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {/* Right Glass Arrow */}
                    <button
                        className="glass-arrow-btn"
                        onClick={scrollRight}
                        aria-label="Scroll Right"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <style>
                {`
                @keyframes luxuriousPulse {
                    0%, 100% { 
                        opacity: 0.5; 
                        color: var(--text-muted);
                    }
                    50% { 
                        opacity: 1; 
                        color: var(--accent-gold);
                    }
                }
                @keyframes focusPulse {
                    0% { opacity: 0.35; }
                    50% { opacity: 1; }
                    100% { opacity: 0.35; }
                }
                `}
            </style>
        </Section>
    );
};

export default Projects;
