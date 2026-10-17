import React from 'react';
import Section from '../components/Section';
import { supportsFineHover } from '../lib/utils';

const skills = [
    {
        category: 'Programming Languages',
        items: [
            { name: 'Python', current: true },
            { name: 'MySQL' },
            { name: 'C / C++ / Java' },
            { name: 'HTML / CSS / JavaScript' },
        ],
    },
    {
        category: 'Frameworks & ML Stack',
        items: [
            { name: 'LangChain', current: true },
            { name: 'LangGraph', current: true },
            { name: 'TensorFlow' },
            { name: 'Scikit-learn' },
            { name: 'Hugging Face' },
        ],
    },
    {
        category: 'Backend & Infrastructure',
        items: [
            { name: 'AWS', current: true },
            { name: 'FastAPI', current: true },
            { name: 'Flask' },
        ],
    },
    {
        category: 'Tools & Data Stack',
        items: [
            { name: 'Docker',current: true },
            { name: 'Ollama',current: true },
            { name: 'Pandas / NumPy' },
            { name: 'GitHub' },
            { name: 'SQL / MySQL' },
        ],
    },
];

const Skills = () => {
    return (
        <Section id="skills">
            <h2
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '3rem',
                    textAlign: 'center',
                }}
            >
                Skills
            </h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                }}
            >
                {skills.map((group) => {
                    // Move CURRENT items to top
                    const sortedItems = [
                        ...group.items.filter((i) => i.current),
                        ...group.items.filter((i) => !i.current),
                    ];

                    return (
                        <div
                            key={group.category}
                            className="glass"
                            style={{
                                padding: '2rem',
                                borderRadius: '6px',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                            }}
                            onMouseMove={(e) => {
                                if (!supportsFineHover()) return;
                                const rect =
                                    e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;

                                e.currentTarget.style.background = `radial-gradient(
                                    600px circle at ${x}px ${y}px,
                                    rgba(255,255,255,0.08),
                                    transparent 40%
                                )`;
                            }}
                            onMouseEnter={(e) => {
                                if (!supportsFineHover()) return;
                                e.currentTarget.style.transform =
                                    'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                if (!supportsFineHover()) return;
                                e.currentTarget.style.transform =
                                    'translateY(0)';
                                e.currentTarget.style.background = 'none';
                            }}
                        >
                            <h3
                                style={{
                                    color: 'var(--accent-gold)',
                                    marginBottom: '1.2rem',
                                }}
                            >
                                {group.category}
                            </h3>

                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.6rem',
                                }}
                            >
                                {sortedItems.map((item) => (
                                    <li
                                        key={item.name}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            fontSize: '0.95rem',
                                            color: 'var(--text-muted)',
                                        }}
                                    >
                                        <span>{item.name}</span>

                                        {item.current && (
                                            <span
                                                className="badge-pulse"
                                                style={{
                                                    fontSize: '0.65rem',
                                                    letterSpacing: '0.06em',
                                                    padding:
                                                        '0.15rem 0.45rem',
                                                    borderRadius: '999px',
                                                    color: '#fff',
                                                    background:
                                                        'rgba(255,255,255,0.15)',
                                                }}
                                            >
                                                CURRENT
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};

export default Skills;
