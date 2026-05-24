import React from 'react';
import Section from '../components/Section';

const experiences = [
    {
        period: 'Jan 14, 2026 – Mar 24, 2026',
        role: 'MERN Stack Developer Intern',
        company: 'IIT Ropar',
        description:
            'This experience strengthened my perspective on problem solving, research-driven learning, and experience in MERN stack for development—which I truly believe is essential for being an AI Full Stack Developer.',
        recent: true,
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

const Experience = () => {
    return (
        <Section id="experience">
            <h2
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '4rem',
                    textAlign: 'center',
                }}
            >
                Professional Journey
            </h2>

            <div style={{ display: 'grid', gap: '3rem' }}>
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1.5fr 1fr',
                            gap: '3rem',
                            alignItems: 'center',
                        }}
                    >
                        {/* Experience Card */}
                        <div
                            className="glass"
                            style={{
                                padding: '2rem',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                transition:
                                    'transform 0.35s ease, box-shadow 0.35s ease',
                            }}
                            onMouseMove={(e) => {
                                const rect =
                                    e.currentTarget.getBoundingClientRect();
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
                                e.currentTarget.style.transform =
                                    'translateY(-6px)';
                                e.currentTarget.style.boxShadow =
                                    '0 18px 40px rgba(0,0,0,0.45)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.background = 'none';
                            }}
                        >
                            <span
                                style={{
                                    color: 'var(--accent-gold)',
                                    fontSize: '0.9rem',
                                }}
                            >
                                {exp.period}
                            </span>

                            <h3 style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                {exp.role}
                                {exp.recent && (
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
                                            textShadow: 'none'
                                        }}
                                    >
                                        RECENT
                                    </span>
                                )}
                            </h3>

                            <h4 style={{ color: 'var(--text-muted)' }}>
                                {exp.company}
                            </h4>

                            <p style={{ color: 'var(--text-muted)' }}>
                                {exp.description}
                            </p>

                            {/* LinkedIn Link moved here */}
                            <p
                                style={{
                                    marginTop: '1rem',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    width: 'fit-content',
                                    transition:
                                        'color 0.3s ease, transform 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color =
                                        'var(--text-color)';
                                    e.currentTarget.style.transform =
                                        'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color =
                                        'var(--text-muted)';
                                    e.currentTarget.style.transform =
                                        'translateX(0)';
                                }}
                                onClick={() =>
                                    window.open(
                                        exp.certificate.linkedin,
                                        '_blank'
                                    )
                                }
                            >
                                View Certificate on LinkedIn →
                            </p>
                        </div>

                        {/* Certificate */}
                        <div
                            className="glass"
                            style={{
                                padding: '1.5rem',
                                borderRadius: '6px',
                            }}
                        >
                            <div
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: '6px',
                                }}
                            >
                                <img
                                    src={exp.certificate.image}
                                    alt="Internship Certificate"
                                    style={{
                                        width: '100%',
                                        height: '220px',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform =
                                            'scale(1.03)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
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

export default Experience;
