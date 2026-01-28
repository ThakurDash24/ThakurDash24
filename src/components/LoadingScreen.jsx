import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete, onFadeOutStart }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Start fading out after a short delay to ensure the user sees the text
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
            if (onFadeOutStart) onFadeOutStart(); // Trigger content animation
        }, 2500); // Display for 2.5 seconds

        // Notify parent that animation is complete after the fade transition
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3500); // 2.5s display + 1s fade

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

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
