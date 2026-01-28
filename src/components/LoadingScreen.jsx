import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete, onFadeOutStart }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            // Wait a bit more to ensure smooth transition
            setTimeout(() => {
                setIsFading(true);
                if (onFadeOutStart) onFadeOutStart();

                setTimeout(() => {
                    onComplete();
                }, 1000); // Wait for fade out animation
            }, 2500); // Minimum display time
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
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
