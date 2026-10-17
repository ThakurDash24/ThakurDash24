import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import emailjs from '@emailjs/browser';
import { supportsFineHover } from '../lib/utils';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    // Initialize EmailJS once
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
            <div
                className="glass"
                style={{
                    maxWidth: '640px',
                    margin: '0 auto',
                    padding: '3.5rem',
                    borderRadius: '6px',
                }}
                onMouseMove={(e) => {
                    if (!supportsFineHover()) return;
                    const rect = e.currentTarget.getBoundingClientRect();
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
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.transition = 'transform 0.3s ease';
                }}
                onMouseLeave={(e) => {
                    if (!supportsFineHover()) return;
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    Get in Touch
                </h2>

                <p
                    style={{
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        marginBottom: '3rem',
                    }}
                >
                    Have a project, idea, or collaboration in mind?
                    Leave a message — I’ll get back to you.
                </p>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        style={inputStyle}
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        style={inputStyle}
                    />

                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                        }
                        style={{ ...inputStyle, resize: 'vertical' }}
                    />

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="send-message-btn"
                        style={{
                            padding: '1rem',
                            background:
                                status === 'success'
                                    ? '#10b981'
                                    : status === 'error'
                                        ? '#ef4444'
                                        : 'var(--text-color)',
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

                <div
                    style={{
                        marginTop: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1.5rem',
                    }}
                >
                    <a
                        href="https://www.linkedin.com/in/thakur-asutosh-dash-a6965922a/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        style={socialIconStyle}
                        onMouseEnter={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                            e.currentTarget.style.color = 'var(--accent-gold)';
                            e.currentTarget.style.borderColor = 'rgba(255,215,0,0.6)';
                            e.currentTarget.style.boxShadow =
                                '0 0 20px rgba(255,215,0,0.25), 0 0 40px rgba(255,215,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M4.98 3.5C3.33 3.5 2 4.83 2 6.48c0 1.65 1.33 2.98 2.98 2.98 1.64 0 2.97-1.33 2.97-2.98C7.95 4.83 6.62 3.5 4.98 3.5zM2.4 21.5h5.16V9H2.4v12.5zM9.6 9h4.95v1.71h.07c.69-1.24 2.37-2.55 4.88-2.55 5.22 0 6.18 3.44 6.18 7.92v5.42h-5.16v-4.8c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.84 1.25-1.84 2.54v4.89H9.6V9z" />
                        </svg>
                    </a>

                    <a
                        href="https://github.com/ThakurDash24"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        style={socialIconStyle}
                        onMouseEnter={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                            e.currentTarget.style.color = 'var(--accent-gold)';
                            e.currentTarget.style.borderColor = 'rgba(255,215,0,0.6)';
                            e.currentTarget.style.boxShadow =
                                '0 0 20px rgba(255,215,0,0.25), 0 0 40px rgba(255,215,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            if (!supportsFineHover()) return;
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.12-1.49-1.12-1.49-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.13-4.56-5.04 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 7.07c.85 0 1.71.12 2.51.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.92-2.35 4.78-4.58 5.03.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.22C22 6.58 17.52 2 12 2z" />
                        </svg>
                    </a>
                </div>
            </div>

            <style>
                {`
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
};

const socialIconStyle = {
    width: '44px',
    height: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.85)',
    background: 'rgba(255,255,255,0.04)',
    textDecoration: 'none',
    transition: 'transform 0.25s ease, color 0.25s ease, border-color 0.25s ease',
};

export default Contact;
