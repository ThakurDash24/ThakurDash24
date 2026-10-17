import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Footer = () => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.footer
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'relative',
                marginTop: '6rem',
                padding: '2.5rem 1rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
            }}
        >
            <div className="footer-glow" />

            {/* Identity */}
            <p
                style={{
                    position: 'relative',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.8rem',
                }}
            >
                © 2025 Thakur Dash — Data Science & ML Engineer
            </p>

            {/* Location */}
            <p
                style={{
                    position: 'relative',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: '1.2rem',
                }}
            >
                Bhubaneswar, Odisha, India
            </p>

            {/* Contact Info */}
            <p
                style={{
                    position: 'relative',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '1.8rem',
                }}
            >
                <a href="mailto:thkrdash@gmail.com" className="footer-link" style={contactStyle}>
                    thkrdash@gmail.com
                </a>
            </p>

            {/* Social Links */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                }}
            >
                <a
                    href="https://www.linkedin.com/in/thakur-asutosh-dash-a6965922a/"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                    style={iconStyle}
                >
                    LinkedIn
                </a>

                <a
                    href="https://github.com/ThakurDash24"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                    style={iconStyle}
                >
                    GitHub
                </a>

                <a
                    href="https://x.com/MrThakurDash"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                    style={iconStyle}
                >
                    X
                </a>
            </div>

            {/* Subtle Signature */}
            <p
                style={{
                    position: 'relative',
                    marginTop: '1.5rem',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.35)',
                }}
            >
                Building intelligent systems.
            </p>
        </motion.footer>
    );
};

const iconStyle = {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    textDecoration: 'none',
};

const contactStyle = {
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
};

export default Footer;
