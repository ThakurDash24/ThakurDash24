import React from 'react';

const Home = () => {
    return (
        <section
            id="home"
            className="section"
            style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
        >
            {/* Background */}
            {/* Background handled globally in App.jsx */}

            <div className="container">
                <p
                    style={{
                        color: 'var(--accent-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                    }}
                >
                    Aspiring Data Scientist
                </p>

                <h1
                    style={{
                        fontSize: 'clamp(3.3rem, 8vw, 6.3rem)',
                        lineHeight: 1.05,
                        marginBottom: '1.6rem',
                    }}
                >
                    Most Decisions <br />
                    <span
                        style={{
                            fontStyle: 'italic',
                            fontFamily: 'var(--font-heading)',
                            opacity: 0.9,
                        }}
                    >
                        Fail
                    </span>{' '}
                    Before the First Line of Code.
                </h1>

                <p
                    style={{
                        maxWidth: '620px',
                        fontSize: '1.05rem',
                        color: 'var(--text-muted)',
                        marginBottom: '3rem',
                        fontStyle: 'italic',
                    }}
                >
                    I build systems that decide better.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a
                        href="https://resumyzer24.vercel.app"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm("You are about to open 'Resumyzer' in a new tab. Continue?")) {
                                window.open("https://resumyzer24.vercel.app", "_blank");
                            }
                        }}
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
                            minWidth: '180px', // Ensure consistent width
                        }}
                    >
                        <span style={{ position: 'relative', zIndex: 1, letterSpacing: '1px' }}>Freshly Deployed</span>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
                                animation: 'shine 3s infinite',
                            }}
                        />
                        <style>
                            {`
                            @keyframes shine {
                                0% { left: -100%; }
                                20% { left: 100%; }
                                100% { left: 100%; }
                            }
                            `}
                        </style>
                    </a>

                    <a href="#contact" className="btn btn-secondary">
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Home;
