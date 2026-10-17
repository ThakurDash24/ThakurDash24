import { useEffect, useState } from 'react';

// Shared, rAF-throttled global scroll progress (0-1), so every "world" layer
// reacts to the same single scroll listener instead of each mounting its own.
export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let rafId = null;

        const handleScroll = () => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
                rafId = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return progress;
};
