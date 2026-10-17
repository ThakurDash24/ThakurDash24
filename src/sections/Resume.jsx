import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../components/Section';
import { setGlowPosition } from '../lib/utils';

const Resume = () => {
    const reduceMotion = useReducedMotion();

    return (
        <Section id="resume">
            {/* Border pulse animation */}
            <style>
                {`
                @keyframes borderPulse {
                    0%, 100% {
                        box-shadow: 0 0 10px rgba(197,160,89,0.2);
                        border-color: rgba(197,160,89,0.6);
                    }
                    50% {
                        box-shadow: 0 0 18px rgba(197,160,89,0.35);
                        border-color: rgba(197,160,89,0.9);
                    }
                }
                `}
            </style>

            <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
            <div
                className="glass glow-card"
                onMouseMove={setGlowPosition}
                style={{
                    padding: '4rem',
                    textAlign: 'center',
                    borderRadius: '6px',
                    border: '1px solid var(--accent-gold)',
                    animation: 'borderPulse 2.5s ease-in-out 3',
                    animationFillMode: 'forwards',
                    overflow: 'hidden',
                }}
            >
                <h2
                    style={{
                        fontSize: '2rem',
                        marginBottom: '1.5rem',
                    }}
                >
                    Interested in my full background?
                </h2>

                <p
                    style={{
                        color: 'var(--text-muted)',
                        marginBottom: '2.5rem',
                        maxWidth: '600px',
                        marginInline: 'auto',
                    }}
                >
                    Download my concise resume for a quick overview, or explore
                    the extended version for a deeper look into my academic and
                    technical journey.
                </p>

                <div
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Resume */}
                    <button
                        onClick={() =>
                            window.open(
                                '/assets/Resume_ThakurDash.pdf',
                                '_blank'
                            )
                        }
                        style={{
                            padding: '1rem 2.2rem',
                            background: 'var(--accent-gold)',
                            color: 'var(--bg-color)',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition:
                                'transform 0.3s ease, opacity 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform =
                                'translateY(-2px)';
                            e.currentTarget.style.opacity = '0.9';
                        }}
                        onMouseLeave={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.opacity = '1';
                        }}
                    >
                        Download Resume (PDF)
                    </button>

                    {/* Extended CV */}
                    <button
                        onClick={() =>
                            window.open(
                                '/assets/CV_ThakurDash.pdf',
                                '_blank'
                            )
                        }
                        style={{
                            padding: '1rem 2.2rem',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            border: '1px solid var(--text-color)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition:
                                'transform 0.3s ease, opacity 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform =
                                'translateY(-2px)';
                            e.currentTarget.style.opacity = '0.85';
                        }}
                        onMouseLeave={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.opacity = '1';
                        }}
                    >
                        View Extended CV
                    </button>
                </div>
            </div>
            </motion.div>
        </Section>
    );
};

export default Resume;
