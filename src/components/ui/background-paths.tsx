"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";

function FloatingPaths({ position, active }: { position: number; active: boolean }) {
    const paths = Array.from({ length: 48 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(255,255,255,${0.05 + i * 0.02})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={active ? {
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        } : {}}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Welcome Devs",
    onComplete,
    onEnterStart
}: {
    title?: string;
    onComplete?: () => void;
    onEnterStart?: () => void;
}) {
    const [isEntering, setIsEntering] = useState(false);
    const words = title.split(" ");

    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        // Fetch real visitor count with a cache-buster so reloads always increase
        fetch(`https://api.counterapi.dev/v1/thakurdash24/portfolio_visits/up?_t=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                // Add an offset so it starts looking impressive
                const finalCount = (data.count || 0) + 1005;
                animate(count, finalCount, {
                    duration: 1.5,
                    delay: 0.5,
                    ease: "easeOut",
                });
            })
            .catch(() => {
                animate(count, 1005, {
                    duration: 1.5,
                    delay: 0.5,
                    ease: "easeOut",
                });
            });
    }, []);

    const handleEnter = () => {
        setIsEntering(true);
        if (onEnterStart) onEnterStart();

        // Wait for fade-out to finish (~0.8s) before navigation/unmounting
        setTimeout(() => {
            if (onComplete) {
                // If integrated conditionally in your parent component (preferred)
                onComplete();
            } else {
                // Fallback URL routing
                window.location.href = "/";
            }
        }, 800);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: isEntering ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <style>
                {`
                    @keyframes text-shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                    .shimmer-text {
                        background: linear-gradient(110deg, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 70%);
                        background-size: 200% 100%;
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                        animation: text-shimmer 8s linear infinite;
                    }
                `}
            </style>
            <div className="absolute inset-0 translate-y-[30vh]">
                <FloatingPaths position={1} active={!isEntering} />
                <FloatingPaths position={-1} active={!isEntering} />
            </div>

            <div
                className="relative z-10 w-full flex flex-col items-center justify-center px-4 md:px-6"
                style={{ marginTop: 'var(--intro-margin-top, -21vh)' }}
            >
                <style>
                    {`
                        @media (max-width: 639px) { :root { --intro-margin-top: -10vh; } }
                        @media (min-width: 640px) and (max-width: 767px) { :root { --intro-margin-top: -15vh; } }
                        @media (min-width: 768px) { :root { --intro-margin-top: -21vh; } }
                    `}
                </style>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-6xl flex flex-col items-center"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-bold mb-20 tracking-tighter flex flex-wrap justify-center gap-6 md:gap-10 shimmer-text">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    {/* Visitor Counter Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
                        className="flex flex-col items-center mb-8"
                        style={{ marginTop: '3rem' }}
                    >
                        <p className="text-white/60 text-sm sm:text-base md:text-lg tracking-[0.2em] text-center">
                            You are the <motion.span className="text-white font-medium">{rounded}</motion.span>th to arrive
                        </p>
                    </motion.div>

                    <div className="flex justify-center" style={{ marginTop: '40px' }}>
                        <button
                            onClick={handleEnter}
                            disabled={isEntering}
                            className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-500 hover:w-[180px] sm:hover:w-[240px] hover:bg-white/5 group cursor-pointer border border-white/20 hover:border-[#c5a059] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] disabled:pointer-events-none overflow-hidden"
                        >
                            {/* 1. The Icon (Scales down and disappears on hover) */}
                            <span className="absolute inset-0 transition-all duration-500 group-hover:scale-0 group-hover:opacity-0 flex items-center justify-center">
                                <span className="text-white/60 transition-colors text-2xl font-light">
                                    →
                                </span>
                            </span>

                            {/* 2. The Text (Scales up and appears on hover) */}
                            <span className="absolute text-white tracking-[0.2em] text-[10px] sm:text-xs font-bold transition-all duration-500 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap uppercase">
                                Enter to Portfolio
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
