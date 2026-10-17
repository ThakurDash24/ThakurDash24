import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    useReducedMotion,
} from 'framer-motion';

// Each word rises out of its own mask rather than the whole line fading in —
// the kinetic reveal that pairs with the photo resolving out of the dark.
const KineticWords = ({ text, delay = 0, style }) => {
    const words = text.split(' ');
    return (
        <>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
                >
                    <motion.span
                        style={{ display: 'inline-block', ...style }}
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                            delay: delay + i * 0.06,
                        }}
                    >
                        {word}
                        {i < words.length - 1 ? ' ' : ''}
                    </motion.span>
                </span>
            ))}
        </>
    );
};

const Home = () => {
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // Scroll drift: the backdrop and subject travel at different rates as the
    // visitor leaves the hero, so the exit itself carries depth.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const backdropScrollY = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const subjectScrollY = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);

    // Cursor parallax: bounded, damped, disabled under reduced motion.
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springX = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.6 });
    const springY = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.6 });

    const backdropX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
    const backdropY = useTransform(springY, [-0.5, 0.5], [-6, 6]);
    const subjectX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
    const subjectY = useTransform(springY, [-0.5, 0.5], [-14, 14]);

    const handlePointerMove = (e) => {
        if (reduceMotion) return;
        const rect = sectionRef.current.getBoundingClientRect();
        pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handlePointerLeave = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <section
            id="home"
            ref={sectionRef}
            className="section"
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            style={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 0,
                paddingBottom: 0,
            }}
        >
            {/* Background plane: generated atmosphere, drifts slowest */}
            <motion.div
                style={{ position: 'absolute', inset: 0, y: reduceMotion ? 0 : backdropScrollY, opacity: heroOpacity }}
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: '-4%',
                        x: reduceMotion ? 0 : backdropX,
                        y: reduceMotion ? 0 : backdropY,
                    }}
                >
                    <img
                        src="/assets/hero/backdrop.webp"
                        alt=""
                        aria-hidden="true"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </motion.div>
            </motion.div>

            {/* Subject plane: screen-blended onto the near-black backdrop, no
                alpha cutout needed since both sit on the same near-black */}
            <motion.div
                style={{ position: 'absolute', inset: 0, y: reduceMotion ? 0 : subjectScrollY, opacity: heroOpacity }}
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: '-6%',
                        x: reduceMotion ? 0 : subjectX,
                        y: reduceMotion ? 0 : subjectY,
                    }}
                    initial={reduceMotion ? false : { filter: 'brightness(0.15) blur(10px)', scale: 1.06 }}
                    animate={{ filter: 'brightness(1) blur(0px)', scale: 1 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                    <img
                        src="/assets/hero/subject.webp"
                        alt=""
                        aria-hidden="true"
                        className="hero-subject-img"
                        style={{ width: '100%', height: '100%' }}
                    />
                </motion.div>
            </motion.div>

            <div className="grain-overlay" />

            {/* Scrim only behind the text block, never the full frame */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(100deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 38%, rgba(10,10,10,0.08) 62%, transparent 78%)',
                }}
            />

            <motion.div className="container" style={{ position: 'relative', zIndex: 1, opacity: heroOpacity }}>
                <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    style={{
                        color: 'var(--accent-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                    }}
                >
                    AI/ML Engineer Practitioner
                </motion.p>

                <h1
                    style={{
                        fontSize: 'clamp(3.3rem, 8vw, 6.3rem)',
                        lineHeight: 1.05,
                        marginBottom: '1.6rem',
                        maxWidth: '780px',
                    }}
                >
                    <KineticWords text="Most Decisions" delay={0.55} />
                    <br />
                    <KineticWords
                        text="Fail"
                        delay={0.75}
                        style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)', opacity: 0.9 }}
                    />{' '}
                    <KineticWords text="Before the First Line of Code." delay={0.82} />
                </h1>

                <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.25 }}
                    style={{
                        maxWidth: '620px',
                        fontSize: '1.05rem',
                        color: 'var(--text-muted)',
                        marginBottom: '3rem',
                        fontStyle: 'italic',
                    }}
                >
                    I build systems that decide better.
                </motion.p>

                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.4 }}
                    style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
                >
                    <a
                        href="https://portfolio-agent-inky.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                            border: '1px solid var(--accent-gold)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem 2rem',
                            minWidth: '180px',
                        }}
                    >
                        <span style={{ position: 'relative', zIndex: 1, letterSpacing: '1px' }}>Try My AI Agent →</span>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
                                animation: 'shine 3s infinite',
                                willChange: 'transform',
                            }}
                        />
                        <style>
                            {`
                            @keyframes shine {
                                0% { transform: translateX(-100%); }
                                20% { transform: translateX(100%); }
                                100% { transform: translateX(100%); }
                            }
                            `}
                        </style>
                    </a>

                    <a href="#contact" className="btn btn-secondary">
                        Contact Me
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Home;
