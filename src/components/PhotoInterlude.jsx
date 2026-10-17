import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// A full-bleed photo band between major sections: a breath in the journey,
// and the connective tissue a flat stack of cards doesn't give you. Images
// on this site are graded as one shoot, so this sits comfortably between
// unrelated sections without feeling like a stock interruption.
const PhotoInterlude = ({ src, caption, align = 'left', filter, fit = 'cover', scrim = 'default', layout = 'band', blend = 'normal' }) => {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    if (layout === 'split') {
        const imageSide = align === 'left' ? 'left' : 'right';
        return (
            <section
                ref={ref}
                style={{
                    position: 'relative',
                    height: '64vh',
                    minHeight: '420px',
                    overflow: 'hidden',
                }}
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '-6%',
                        bottom: '-6%',
                        [imageSide]: 0,
                        width: '58%',
                        y: reduceMotion ? 0 : y,
                    }}
                >
                    <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: imageSide === 'left' ? 'left top' : 'right top',
                            filter: filter || 'contrast(0.9)',
                            mixBlendMode: blend,
                        }}
                    />
                </motion.div>
                <div className="grain-overlay" />

                <div
                    className="container"
                    style={{
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: imageSide === 'left' ? 'flex-end' : 'flex-start',
                    }}
                >
                    <motion.p
                        initial={reduceMotion ? false : { opacity: 0, x: imageSide === 'left' ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                            color: 'var(--text-color)',
                            maxWidth: '380px',
                            textAlign: imageSide === 'left' ? 'right' : 'left',
                        }}
                    >
                        {caption}
                    </motion.p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={ref}
            style={{
                position: 'relative',
                height: '56vh',
                minHeight: '340px',
                overflow: 'hidden',
            }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    inset: '-6% 0',
                    y: reduceMotion ? 0 : y,
                }}
            >
                <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: fit,
                        objectPosition: 'center 30%',
                        filter: filter || 'none',
                    }}
                />
            </motion.div>

            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        scrim === 'light'
                            ? align === 'left'
                                ? 'linear-gradient(to top right, rgba(10,10,10,0.85) 0%, transparent 30%)'
                                : 'linear-gradient(to top left, rgba(10,10,10,0.85) 0%, transparent 30%)'
                            : align === 'left'
                                ? 'linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.25) 45%, transparent 70%)'
                                : 'linear-gradient(270deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.25) 45%, transparent 70%)',
                }}
            />
            <div className="grain-overlay" />

            <div
                className="container"
                style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
                    paddingBottom: '2.5rem',
                }}
            >
                <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                        color: 'var(--text-color)',
                        maxWidth: '420px',
                        textAlign: align === 'left' ? 'left' : 'right',
                    }}
                >
                    {caption}
                </motion.p>
            </div>
        </section>
    );
};

export default PhotoInterlude;
