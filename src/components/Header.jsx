import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Scroll Spy Logic
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5, 0.7], // Multiple thresholds for better tracking
            rootMargin: "-10% 0px -45% 0px" // Focus on the top-center part of the screen
        };

        const observerCallback = (entries) => {
            // We only care about intersecting entries, but since multiple can intersect,
            // we should ideally track which one is *most* visible if we had access to all at once.
            // However, observer fires on changes.
            // A common robust way is to select the intersecting one with the highest ratio.

            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

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
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Update URL hash without jumping
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
