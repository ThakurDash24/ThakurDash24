import { useEffect, useState, useRef } from 'react';

const LoadingScreen = ({ onComplete, onFadeOutStart, allComponentsLoaded }) => {
    const [isFading, setIsFading] = useState(false);
    const hasStartedFading = useRef(false);
    const startTime = useRef(Date.now());
    const MIN_DURATION = 2500; // Minimum duration in ms

    useEffect(() => {
        // Only start fading when all components are loaded
        if (allComponentsLoaded && !hasStartedFading.current) {
            const elapsedTime = Date.now() - startTime.current;
            const remainingTime = Math.max(0, MIN_DURATION - elapsedTime);

            hasStartedFading.current = true;

            // Wait for remaining time + small buffer if needed
            setTimeout(() => {
                setIsFading(true);
                if (onFadeOutStart) onFadeOutStart();

                setTimeout(() => {
                    onComplete();
                }, 1000); // Wait for fade out animation
            }, remainingTime);
        }
    }, [allComponentsLoaded, onComplete, onFadeOutStart]);

    // Safety fallback: Force load after 10 seconds max
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (!hasStartedFading.current) {
                console.warn("Loading screen safety timeout triggered");
                hasStartedFading.current = true;
                setIsFading(true);
                if (onFadeOutStart) onFadeOutStart();
                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        }, 10000);

        return () => clearTimeout(safetyTimer);
    }, [onComplete, onFadeOutStart]);

    return (
        <div className={`loading-screen ${isFading ? 'fade-out' : ''}`}>
            <div className="loading-content">
                <div className="loading-subtitle">
                    Welcome to Portfolio
                </div>
                <div className="loading-text">
                    Thakur Dash
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
