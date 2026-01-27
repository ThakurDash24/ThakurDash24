import React, { useRef, useEffect } from 'react';
import Section from '../components/Section';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const researchAreas = [
    {
        title: 'Applied Machine Learning',
        description: 'Bridging theory and practice. I focus on the full lifecycle of ML systems—from feature engineering and model selection to rigorous evaluation—deploying scalable solutions that drive real-world impact.',
    },
    {
        title: 'Deep Learning Concepts',
        description: 'Unraveling neural architectures. My work spans the mathematics of backpropagation, CNNs for vision, and Sequence Models, building a deep understanding of how complex representations are learned.',
    },
    {
        title: 'NLP & Generative AI',
        description: 'Harnessing the power of Language Models. I design sophisticated conversational agents and generative workflows, mastering prompt engineering and Transformer mechanics to create context-aware systems.',
    },
    {
        title: 'Agentic AI',
        description: 'Pioneering autonomous systems. Leveraging LangChain, I build agents with memory, planning, and tool-use capabilities, enabling them to reason and execute complex, multi-step goals independently.',
        current: true,
    },
];

const Research = () => {
    const scrollRef = useRef(null);
    // Duplicate items to create a seamless infinite loop effect
    const infiniteResearch = [...researchAreas, ...researchAreas, ...researchAreas];

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // Initialize scroll position to the start of the second set (middle)
        const initializeScroll = () => {
            const oneSetWidth = el.scrollWidth / 3;
            if (el.scrollLeft === 0) {
                el.scrollLeft = oneSetWidth;
            }
        };

        setTimeout(initializeScroll, 100);

        const handleScroll = () => {
            const oneSetWidth = el.scrollWidth / 3;

            // Infinite loop logic
            if (el.scrollLeft >= oneSetWidth * 2) {
                el.scrollLeft = oneSetWidth;
            }
            else if (el.scrollLeft <= 0) {
                el.scrollLeft = oneSetWidth;
            }
        };

        el.addEventListener('scroll', handleScroll);

        return () => {
            el.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleCardClick = (e) => {
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
        <Section id="research">
            <h2
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '3rem',
                    textAlign: 'center',
                }}
            >
                Research & Exploration
            </h2>

            <p
                style={{
                    color: 'var(--text-muted)',
                    marginBottom: '3rem',
                    textAlign: 'center',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                Exploring modern machine learning and AI systems with a focus on
                building solutions that move beyond theory into real-world impact.
            </p>

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
                <div>Slide to know more</div>
            </div>

            {/* Scroll Container */}
            <div style={{ position: 'relative', width: '100%' }}>

                {/* Left Glass Arrow */}
                <button
                    className="glass-arrow-btn glass-arrow-left"
                    onClick={scrollLeft}
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={24} />
                </button>

                <div
                    className="projects-scroll-container hide-scrollbar"
                    ref={scrollRef}
                >
                    {infiniteResearch.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            className="glass project-card" // Reusing project-card for consistent sizing and styling
                            onClick={handleCardClick}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;

                                e.currentTarget.style.background =
                                    `radial-gradient(
                                        600px circle at ${x}px ${y}px,
                                        rgba(255,255,255,0.08),
                                        transparent 40%
                                    )`;
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow =
                                    '0 18px 40px rgba(0,0,0,0.45)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.background = 'none';
                            }}
                        >
                            <h3 style={{
                                color: 'var(--accent-gold)',
                                marginBottom: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                textShadow: '0 0 15px rgba(255, 215, 0, 0.25)'
                            }}>
                                {item.title}
                                {item.current && (
                                    <span
                                        style={{
                                            fontSize: '0.65rem',
                                            letterSpacing: '0.06em',
                                            padding: '0.15rem 0.45rem',
                                            borderRadius: '999px',
                                            color: '#fff',
                                            background: 'rgba(255,255,255,0.15)',
                                            animation: 'focusPulse 1.6s ease-in-out infinite',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            whiteSpace: 'nowrap',
                                            textShadow: 'none' // Prevent double glow on tag
                                        }}
                                    >
                                        CURRENT
                                    </span>
                                )}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right Glass Arrow */}
                <button
                    className="glass-arrow-btn glass-arrow-right"
                    onClick={scrollRight}
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Pulse animation for active focus */}
            <style>
                {`
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

export default Research;
