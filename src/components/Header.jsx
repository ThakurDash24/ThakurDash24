import React, { useState, useEffect, useRef, useCallback } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const sectionsRef = useRef({});

    // Scroll-based section detection (fallback for mobile)
    const updateActiveByScroll = useCallback(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        let currentSection = 'home';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        setActiveSection(currentSection);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            // Also update active section on scroll (mobile fallback)
            updateActiveByScroll();
        };

        // IntersectionObserver for desktop (more precise)
        const observerOptions = {
            threshold: [0, 0.1, 0.2, 0.3, 0.5],
            rootMargin: "0px 0px -20% 0px" // More lenient for mobile
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

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check
        updateActiveByScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [updateActiveByScroll]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Research', href: '#research' },
        { name: 'Resume', href: '#resume' },
        { name: 'Contact', href: '#contact' },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // ... existing scroll logic ...

    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking a link
    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close mobile menu

        const sectionId = href.substring(1);
        setActiveSection(sectionId);

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

                {/* Hamburger Button */}
                <button
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle Navigation"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <nav className={`nav-menu-container ${isMenuOpen ? 'active' : ''}`}>
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
