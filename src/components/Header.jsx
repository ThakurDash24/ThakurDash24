import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const sectionsRef = useRef({});

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Scroll Spy Logic - Tracks visibility ratios and selects the most visible section
        const observerOptions = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            rootMargin: "-10% 0px -40% 0px"
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                sectionsRef.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
            });

            // Find section with highest visibility ratio
            let maxRatio = 0;
            let maxId = 'home';

            for (const [id, ratio] of Object.entries(sectionsRef.current)) {
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    maxId = id;
                }
            }

            if (maxRatio > 0.05) {
                setActiveSection(maxId);
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section[id]');

        sections.forEach((section) => {
            observer.observe(section);
            sectionsRef.current[section.id] = 0;
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Research', href: '#research' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const sectionId = href.substring(1);
        setActiveSection(sectionId); // Immediate visual feedback

        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            history.pushState(null, null, href);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="#" className="logo">
                    ThakurDash<span>.</span>
                </a>

                <nav>
                    <ul className="nav-menu">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={`nav-link ${isActive ? 'active' : ''}`}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
