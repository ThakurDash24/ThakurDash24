import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let rafId = null;

        const handleScroll = () => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

                setScrollProgress(progress);
                rafId = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="scroll-progress-container">
                <div
                    className="scroll-progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
        </>
    );
};

export default ScrollProgress;
