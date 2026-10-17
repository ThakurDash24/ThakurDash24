import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Server, Database } from 'lucide-react';
import Section from '../components/Section';
import { KineticWords } from '../components/KineticText';
import { setGlowPosition } from '../lib/utils';

const groupVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 44, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const dividerVariants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -22 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const skills = [
    {
        category: 'Programming Languages',
        icon: Code2,
        items: [
            { name: 'Python', current: true },
            { name: 'MySQL' },
            { name: 'C / C++ / Java' },
            { name: 'HTML / CSS / JavaScript' },
        ],
    },
    {
        category: 'Frameworks & ML Stack',
        icon: BrainCircuit,
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
        icon: Server,
        items: [
            { name: 'AWS', current: true },
            { name: 'FastAPI', current: true },
            { name: 'Flask' },
        ],
    },
    {
        category: 'Tools & Data Stack',
        icon: Database,
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
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    margin: '-6rem 0',
                    padding: '6rem 0',
                }}
            >
                {/* True alpha transparency, so no blend-mode or fade-edge
                    trick is needed, the page background just shows through */}
                <img
                    src="/assets/textures/skills-circuit-v4.png"
                    alt=""
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.65,
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2
                        style={{
                            fontSize: '2.5rem',
                            marginBottom: '3rem',
                            textAlign: 'center',
                        }}
                    >
                        <KineticWords text="Skills" />
                    </h2>

            <motion.div
                variants={groupVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0 }}
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
                        <motion.div
                            key={group.category}
                            variants={cardVariants}
                            whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
                            onMouseMove={setGlowPosition}
                            className="glass glow-card"
                            style={{
                                padding: '2rem',
                                borderRadius: '6px',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                    background: 'rgba(197, 160, 89, 0.08)',
                                    border: '1px solid rgba(197, 160, 89, 0.3)',
                                    boxShadow: '0 0 16px rgba(197, 160, 89, 0.15)',
                                }}
                            >
                                <group.icon size={20} color="var(--accent-gold)" strokeWidth={1.75} />
                            </div>

                            <h3
                                style={{
                                    color: 'var(--accent-gold)',
                                    marginBottom: '0.6rem',
                                }}
                            >
                                {group.category}
                            </h3>

                            <motion.div
                                variants={dividerVariants}
                                style={{
                                    height: '2px',
                                    width: '32px',
                                    background: 'var(--accent-gold)',
                                    transformOrigin: 'left',
                                    marginBottom: '1.2rem',
                                }}
                            />

                            <motion.ul
                                variants={listVariants}
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
                                    <motion.li
                                        key={item.name}
                                        variants={itemVariants}
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
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    );
                })}
            </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default Skills;
