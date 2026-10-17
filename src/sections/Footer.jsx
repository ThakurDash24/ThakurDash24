import React from 'react';

const Footer = () => {
    return (
        <footer
            style={{
                marginTop: '6rem',
                padding: '2.5rem 1rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* Identity */}
            <p
                style={{
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
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: '1.8rem',
                }}
            >
                <a
                    href="mailto:thkrdash@gmail.com"
                    style={contactStyle}
                >
                    thkrdash@gmail.com
                </a>

                {/* Optional phone — enable if needed */}
                {/*
                <span style={{ margin: '0 0.6rem' }}>·</span>
                <a
                    href="tel:+91XXXXXXXXXX"
                    style={contactStyle}
                >
                    +91-XXXXXXXXXX
                </a>
                */}
            </p>

            {/* Social Links */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                }}
            >
                <a
                    href="https://www.linkedin.com/in/thakur-asutosh-dash-a6965922a/"
                    target="_blank"
                    rel="noreferrer"
                    style={iconStyle}
                >
                    LinkedIn
                </a>

                <a
                    href="https://github.com/ThakurDash24"
                    target="_blank"
                    rel="noreferrer"
                    style={iconStyle}
                >
                    GitHub
                </a>

                <a
                    href="https://x.com/MrThakurDash"
                    target="_blank"
                    rel="noreferrer"
                    style={iconStyle}
                >
                    X
                </a>
            </div>

            {/* Subtle Signature */}
            <p
                style={{
                    marginTop: '1.5rem',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.35)',
                }}
            >
                Building intelligent systems.
            </p>
        </footer>
    );
};

const iconStyle = {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'transform 0.3s ease, color 0.3s ease',
};

const contactStyle = {
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
};

export default Footer;
