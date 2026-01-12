import React, { useState, useEffect, useRef } from 'react';
import Section from '../components/Section';

const About = () => {
    const [inView, setInView] = useState(false);
    const imgRef = useRef(null);

    // Intersection Observer for scroll effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                threshold: 0.4, // Trigger when 40% of the image is visible
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <Section id="about">
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                }}
            >
                {/* Text Section */}
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                        About Me
                    </h2>

                    <div
                        style={{
                            width: '60px',
                            height: '2px',
                            background: 'var(--accent-gold)',
                            marginBottom: '1.5rem',
                        }}
                    />

                    <p
                        style={{
                            fontSize: '1.05rem',
                            color: 'var(--text-muted)',
                            marginBottom: '0.9rem',
                        }}
                    >
                        I am <strong>Thakur Asutosh Dash</strong>, a Computer Science
                        undergraduate with a strong academic foundation and a
                        disciplined management background. Alongside academics,
                        I have actively contributed as a club member, organized
                        technical and academic events, and mentored students as a
                        student mentor.
                    </p>

                    <p
                        style={{
                            fontSize: '1.05rem',
                            color: 'var(--text-muted)',
                            marginBottom: '0.9rem',
                        }}
                    >
                        I am <strong>Thakur Asutosh Dash</strong>, a <strong>Computer Science undergraduate</strong> with a <strong>strong academic record</strong> and a <strong>disciplined, systems-oriented mindset</strong>. Beyond academics, I’ve been actively involved in <strong>technical clubs</strong>, <strong>event organization</strong>, and <strong>student mentoring</strong>—experiences that strengthened my <strong>leadership</strong>, <strong>clear communication</strong>, and <strong>ownership of outcomes</strong>.
                    </p>

                    <p
                        style={{
                            fontSize: '1.05rem',
                            color: 'var(--text-muted)',
                            marginBottom: 0,
                        }}
                    >
                        My core interests lie in <strong>Data Science</strong>, <strong>Machine Learning</strong>, and <strong>intelligent system design</strong>, where I emphasize <strong>thinking clearly before writing code</strong>. I’m driven by understanding <strong>why projects fail early</strong>—often due to <strong>poor data and system design decisions</strong>. I value <strong>fundamentals</strong>, <strong>continuous growth</strong>, and <strong>engineering discipline</strong>, with a focus on turning <strong>complex ideas into reliable, real-world impact</strong>.
                    </p>
                </div>

                {/* Image Section */}
                <div style={{ textAlign: 'center' }}>
                    <div
                        className="glass"
                        style={{
                            padding: '2.2rem',
                            borderRadius: '4px',
                        }}
                    >
                        <div
                            style={{
                                overflow: 'hidden',
                                borderRadius: '4px',
                            }}
                        >
                            <img
                                ref={imgRef}
                                src="/assets/profile.jpg"
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '360px',
                                    objectFit: 'cover',
                                    objectPosition: 'center 22%',
                                    filter: inView ? 'grayscale(0%)' : 'grayscale(100%)',
                                    transform: inView ? 'scale(1.05)' : 'scale(1)',
                                    transition:
                                        'transform 3.5s ease, filter 3.5s ease',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
