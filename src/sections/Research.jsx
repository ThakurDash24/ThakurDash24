import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { KineticWords } from '../components/KineticText';
import { setGlowPosition } from '../lib/utils';

const researchAreas = [
    {
        title: 'Explainable AI',
        description: 'Building interpretable models and responsible ML workflows. I am currently studying SHP (Explainable AI paper) to better understand faithful explanations, attribution, and transparency in decision-making.',
        current: true,
    },
    {
        title: 'LLMs & RAG',
        description: 'Working on local LLM pulling and fine-tuning pipelines, plus advanced retrieval workflows like CRAG (Corrective RAG) to improve grounding, reduce hallucinations, and boost answer quality.',
        current: true,
    },
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
];

const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const Research = () => {
    return (
        <Section id="research">
            <h2
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                }}
            >
                <KineticWords text="Research & Exploration" />
            </h2>

            <p
                style={{
                    color: 'var(--text-muted)',
                    marginBottom: '3.5rem',
                    textAlign: 'center',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                Exploring modern machine learning and AI systems with a focus on
                building solutions that move beyond theory into real-world impact.
            </p>

            <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                }}
            >
                {researchAreas.map((item) => (
                    <motion.div
                        key={item.title}
                        variants={cardVariants}
                        whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
                        onMouseMove={setGlowPosition}
                        className="glass glow-card"
                        style={{ padding: '2.2rem', borderRadius: '6px' }}
                    >
                        <h3
                            style={{
                                color: 'var(--accent-gold)',
                                marginBottom: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                            }}
                        >
                            {item.title}
                            {item.current && (
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
                                    }}
                                >
                                    CURRENT
                                </span>
                            )}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

export default Research;
