import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Each word rises out of its own overflow-hidden mask rather than the whole
// line fading in together — used anywhere a heading should feel assembled.
// Driven by a single useInView on the wrapping span (rather than one
// whileInView observer per word) so it reliably fires even when the section
// is reached by a direct nav-anchor jump instead of a gradual scroll.
export const KineticWords = ({ text, delay = 0, style }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0 });
    const words = text.split(' ');

    return (
        <span ref={ref}>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
                >
                    <motion.span
                        style={{ display: 'inline-block', ...style }}
                        initial={{ y: '110%' }}
                        animate={{ y: isInView ? '0%' : '110%' }}
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
        </span>
    );
};
