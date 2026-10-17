import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import Section from '../components/Section';
import { KineticWords } from '../components/KineticText';
import GlobeWireframe from '../components/GlobeWireframe';
import emailjs from '@emailjs/browser';
import { setGlowPosition } from '../lib/utils';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const CONTACT_LINKS = [
    { icon: Mail, label: 'thkrdash@gmail.com', href: 'mailto:thkrdash@gmail.com' },
    { icon: Linkedin, label: 'linkedin.com/in/thakur-asutosh-dash', href: 'https://www.linkedin.com/in/thakur-asutosh-dash-a6965922a/' },
    { icon: Github, label: 'github.com/ThakurDash24', href: 'https://github.com/ThakurDash24' },
];

const Contact = () => {
    const reduceMotion = useReducedMotion();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        emailjs.init(PUBLIC_KEY);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            }, PUBLIC_KEY)
            .then(
                (result) => {
                    console.log('Email sent:', result.text);
                    setStatus('success');
                    setFormData({ name: '', email: '', message: '' });
                },
                (error) => {
                    console.error('EmailJS error:', error);
                    setStatus('error');
                    alert(`Failed to send message: ${error.text || 'Unknown error'}`);
                }
            );
    };

    return (
        <Section id="contact">
            <h2 style={{ textAlign: 'center', marginBottom: '0.8rem', fontSize: '2.5rem' }}>
                <KineticWords text="Get in Touch" />
            </h2>
            <p
                style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    marginBottom: '3.5rem',
                    maxWidth: '500px',
                    marginInline: 'auto',
                }}
            >
                Have a project, idea, or collaboration in mind? Leave a message, I'll get back to you.
            </p>

            <div
                style={{
                    display: 'grid',
                    gap: '4rem',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    paddingInline: '2rem',
                }}
                className="contact-grid"
            >
                {/* Left: presence + globe + real links */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}
                >
                    <div style={{ position: 'relative', maxWidth: '100%', padding: '1.5rem' }}>
                        <GlobeWireframe autoRotateSpeed={0.2} />
                    </div>

                    <p
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontStyle: 'italic',
                            fontSize: '1.15rem',
                            color: 'var(--text-color)',
                            maxWidth: '340px',
                        }}
                    >
                        Open to opportunities, wherever they are.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="contact-link-row"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.9rem',
                                    width: 'fit-content',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.9rem',
                                }}
                            >
                                <span
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(197,160,89,0.08)',
                                        border: '1px solid rgba(197,160,89,0.25)',
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon size={16} color="var(--accent-gold)" strokeWidth={1.75} />
                                </span>
                                {label}
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Right: the real working form */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                    <div
                        className="glass glow-card"
                        onMouseMove={setGlowPosition}
                        style={{ padding: '2.5rem', borderRadius: '6px' }}
                    >
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="form-input"
                                style={inputStyle}
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="form-input"
                                style={inputStyle}
                            />
                            <textarea
                                rows="5"
                                placeholder="Your Message"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="form-input"
                                style={{ ...inputStyle, resize: 'vertical' }}
                            />
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="send-message-btn"
                                style={{
                                    padding: '1rem',
                                    background:
                                        status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : 'var(--text-color)',
                                    color: 'var(--bg-color)',
                                    border: 'none',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                {status === 'sending'
                                    ? 'Sending...'
                                    : status === 'success'
                                        ? 'Message Sent'
                                        : status === 'error'
                                            ? 'Failed. Try again'
                                            : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>

            <style>
                {`
                .contact-grid {
                    grid-template-columns: 1fr;
                }
                @media (min-width: 850px) {
                    .contact-grid {
                        grid-template-columns: 0.85fr 1fr;
                        align-items: start;
                    }
                }
                #contact {
                    max-width: 1600px;
                }
                .contact-link-row {
                    transition: color 0.3s ease, transform 0.3s ease;
                }
                @media (hover: hover) {
                    .contact-link-row:hover {
                        color: var(--text-color);
                        transform: translateX(4px);
                    }
                }
                @keyframes shinySweep {
                    0% { transform: translateX(-130%); opacity: 0; }
                    20% { opacity: 1; }
                    60% { opacity: 1; }
                    100% { transform: translateX(130%); opacity: 0; }
                }
                .send-message-btn {
                    position: relative;
                    overflow: hidden;
                }
                .send-message-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    transform: translateX(-130%);
                    opacity: 0;
                    background: linear-gradient(
                        110deg,
                        transparent 0%,
                        rgba(255, 215, 0, 0.5) 45%,
                        rgba(255, 215, 0, 0.9) 50%,
                        rgba(255, 215, 0, 0.5) 55%,
                        transparent 100%
                    );
                    pointer-events: none;
                }
                .send-message-btn:hover::after {
                    animation: shinySweep 0.9s ease-in-out;
                    opacity: 1;
                }
                `}
            </style>
        </Section>
    );
};

const inputStyle = {
    padding: '1rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-color)',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

export default Contact;
