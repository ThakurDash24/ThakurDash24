import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../components/Section';
import { KineticWords } from '../components/KineticText';

const About = () => {
    const [inView, setInView] = useState(false);
    const imgRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Intersection Observer for scroll effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                threshold: 0.4, // Trigger when 40% of the image is visible
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <Section id="about">
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                }}
            >
                {/* Text Section */}
                <div style={{ order: 2 }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                        <KineticWords text="About Me" />
                    </h2>

                    <div
                        className="section-divider"
                        style={{
                            width: '60px',
                            height: '2px',
                            background: 'var(--accent-gold)',
                            marginBottom: '1.5rem',
                        }}
                    />

                    <motion.p
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: '1.05rem',
                            color: 'var(--text-muted)',
                            marginBottom: '0.9rem',
                        }}
                    >
                        I am <strong>Thakur Asutosh Dash</strong>, a <strong>Computer Science undergraduate</strong> with a <strong>strong academic foundation</strong> and a <strong>systems-first way of thinking</strong>. My journey has been shaped not only by academics, but also by <strong>technical club involvement</strong>, <strong>event leadership</strong>, and <strong>student mentoring</strong>, experiences that trained me to think clearly, communicate precisely, and take ownership of results.
                    </motion.p>

                    <motion.p
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                        style={{
                            fontSize: '1.05rem',
                            color: 'var(--text-muted)',
                            marginBottom: 0,
                        }}
                    >
                        What draws me to <strong>Data Science</strong>, <strong>Machine Learning</strong>, and <strong>intelligent system design</strong> is the belief that most failures happen long before code is written. I focus on <strong>decision-making around data, design, and structure</strong>, because strong systems are built on clarity, not shortcuts. I value <strong>fundamentals</strong>, <strong>continuous growth</strong>, and <strong>engineering discipline</strong>, with a constant aim to convert <strong>complex ideas into dependable, real-world outcomes</strong>.
                    </motion.p>
                </div>

                {/* Image Section */}
                <div style={{ order: 1, textAlign: 'center' }}>
                    <div
                        className="glass"
                        style={{
                            padding: '2.2rem',
                            borderRadius: '4px',
                        }}
                    >
                        <div
                            style={{
                                overflow: 'hidden',
                                borderRadius: '4px',
                            }}
                        >
                            <img
                                ref={imgRef}
                                src="/assets/experience/speaking-closeup-1-graded.webp"
                                alt="Thakur Asutosh Dash, AI/ML Engineer"
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '360px',
                                    objectFit: 'cover',
                                    objectPosition: 'center 15%',
                                    filter: inView ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.85)',
                                    transform: inView ? 'scale(1.05)' : 'scale(1)',
                                    transition:
                                        'transform 3.5s ease, filter 3.5s ease',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
