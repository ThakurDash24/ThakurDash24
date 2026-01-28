import { useEffect, useState, useRef } from 'react';

const LoadingScreen = ({ onComplete, onFadeOutStart, allComponentsLoaded }) => {
    const [isFading, setIsFading] = useState(false);
    const hasStartedFading = useRef(false);

    useEffect(() => {
        // Only start fading when all components are loaded
        if (allComponentsLoaded && !hasStartedFading.current) {
            hasStartedFading.current = true;

            // Add a small delay for visual polish
            setTimeout(() => {
                setIsFading(true);
                if (onFadeOutStart) onFadeOutStart();

                setTimeout(() => {
                    onComplete();
                }, 1000); // Wait for fade out animation
            }, 500); // Small delay after loading for smoother feel
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
                    Welcome to the portfolio
                </div>
                <div className="loading-text">
                    TDash
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
