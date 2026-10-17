import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Section from '../components/Section';
import { supportsFineHover, setGlowPosition } from '../lib/utils';

const experiences = [
    {
        period: 'Oct 2026 – Present',
        role: 'AI Developer Intern',
        company: 'OrderArt',
        description:
            'Currently working as an AI Developer Intern at OrderArt, contributing to AI-driven tools built to empower restaurant operations.',
        recent: true,
        certificate: {
            logo: '/assets/logos/orderart.png',
            linkedin: 'https://lnkd.in/p/d6Hm7HHX',
        },
    },
    {
        period: 'Jan 14, 2026 – Mar 24, 2026',
        role: 'MERN Stack Developer Intern',
        company: 'IIT Ropar',
        description:
            'This experience strengthened my perspective on problem solving, research-driven learning, and experience in MERN stack for development—which I truly believe is essential for being an AI Full Stack Developer.',
        certificate: {
            image: '/assets/IIT_CERTIFICATE.jpg',
            linkedin:
                'https://www.linkedin.com/posts/thakur-asutosh-dash-a6965922a_nptel-iitropar-internship-share-7460947692689649664-Hox4/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADlnv7EB1aS-uldKnhxP0Eh1BxXc2iFQEr8',
        },
    },
    {
        period: 'Jun 2025 – Jul 2025',
        role: 'Data Science, ML & Deep Learning Intern',
        company: 'Syllogistek Systems Pvt. Ltd.',
        description:
            'Worked on end-to-end ML workflows including preprocessing, feature engineering, model training, evaluation, and visualization. Built clustering and regression models for production-oriented datasets.',
        certificate: {
            image: '/assets/certificate-2025.jpg.png',
            linkedin:
                'https://www.linkedin.com/feed/update/urn:li:activity:7349058405971488770/',
        },
    },
    {
        period: 'Jun 2024 – Jul 2024',
        role: 'Python Programming & Applications Intern',
        company: 'Syllogistek Systems Pvt. Ltd.',
        description:
            'Developed backend applications using Flask and SQLAlchemy. Built an Employee Management System with CRUD APIs, REST workflows, Git, and Postman.',
        certificate: {
            image: '/assets/certificate-2024.jpg.png',
            linkedin:
                'https://www.linkedin.com/feed/update/urn:li:activity:7226536777371545601/',
        },
    },
];

const TimelineItem = ({ exp, index }) => {
    const reduceMotion = useReducedMotion();
    const fromSide = index % 2 === 0 ? -32 : 32;

    return (
        <motion.div
            className="timeline-item"
            initial={reduceMotion ? false : { opacity: 0, x: fromSide }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.span
                className="timeline-dot"
                initial={reduceMotion ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
            />

            <div className="timeline-item-grid">
                <div
                    className="glass glow-card"
                    onMouseMove={setGlowPosition}
                    style={{ padding: '2rem', borderRadius: '6px' }}
                >
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem' }}>
                        {exp.period}
                    </span>

                    <h3 style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {exp.role}
                        {exp.recent && (
                            <span
                                className="badge-pulse"
                                style={{
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.06em',
                                    padding: '0.15rem 0.45rem',
                                    borderRadius: '999px',
                                    color: '#fff',
                                    background: 'rgba(255,255,255,0.15)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    whiteSpace: 'nowrap',
                                    textShadow: 'none',
                                }}
                            >
                                RECENT
                            </span>
                        )}
                    </h3>

                    <h4 style={{ color: 'var(--text-muted)' }}>{exp.company}</h4>

                    <p style={{ color: 'var(--text-muted)' }}>{exp.description}</p>

                    <p
                        style={{
                            marginTop: '1rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            width: 'fit-content',
                            transition: 'color 0.3s ease, transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.color = 'var(--text-color)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                        onClick={() => window.open(exp.certificate.linkedin, '_blank')}
                    >
                        {exp.certificate.logo ? 'View on LinkedIn →' : 'View Certificate on LinkedIn →'}
                    </p>
                </div>

                <div className="glass" style={{ padding: '1.5rem', borderRadius: '6px' }}>
                    {exp.certificate.logo ? (
                        <div
                            style={{
                                height: '220px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '6px',
                                background: '#fff',
                            }}
                        >
                            <img
                                src={exp.certificate.logo}
                                alt={`${exp.company} logo`}
                                loading="lazy"
                                style={{ maxWidth: '65%', maxHeight: '55%', objectFit: 'contain' }}
                            />
                        </div>
                    ) : (
                        <div style={{ overflow: 'hidden', borderRadius: '6px' }}>
                            <img
                                src={exp.certificate.image}
                                alt={`Internship completion certificate from ${exp.company}`}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '220px',
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease',
                                }}
                                onMouseEnter={(e) => {
                                    if (!supportsFineHover()) return;
                                    e.target.style.transform = 'scale(1.03)';
                                }}
                                onMouseLeave={(e) => {
                                    if (!supportsFineHover()) return;
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const trackRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start 75%', 'end 40%'],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const portraitY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

    return (
        <Section id="experience">
            <div className="experience-layout">
                <div className="experience-portrait-col">
                    <div className="experience-portrait-frame">
                        <motion.img
                            src="/assets/experience/speaking-closeup-2-graded.webp"
                            alt="Thakur Asutosh Dash presenting at a technical event"
                            loading="lazy"
                            style={{ y: reduceMotion ? 0 : portraitY, scale: 1.08 }}
                        />
                    </div>
                </div>

                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                        Professional Journey
                    </h2>

                    <div className="timeline-track-wrap" ref={trackRef}>
                        <div className="timeline-line-bg" />
                        <motion.div
                            className="timeline-line-fill"
                            style={{ scaleY: reduceMotion ? 1 : lineScale }}
                        />

                        {experiences.map((exp, index) => (
                            <TimelineItem key={exp.role} exp={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Experience;
