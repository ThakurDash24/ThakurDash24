import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import emailjs from '@emailjs/browser';

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

    // ✅ Initialize EmailJS once
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
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.transition = 'transform 0.3s ease';
                }}
                onMouseLeave={(e) => {
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
            </div>
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

export default Contact;
