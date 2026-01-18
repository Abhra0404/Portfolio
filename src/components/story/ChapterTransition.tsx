"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface ChapterTransitionProps {
    chapterNumber: string;
    title: string;
    subtext?: string;
    onComplete: () => void;
}

export default function ChapterTransition({
    chapterNumber,
    title,
    subtext,
    onComplete
}: ChapterTransitionProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000); // ~1.2s for animations + 800ms hold time
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-black z-50">
            {/* Scene 1.1 - Chapter Title Card */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
            >
                {/* Chapter number - slides up from bottom */}
                <motion.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1] // easeOutExpo
                    }}
                    className="font-mono text-emerald-500/80 text-xs tracking-[0.3em] uppercase mb-4"
                >
                    {chapterNumber}
                </motion.span>

                {/* Title - slides up from bottom */}
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        duration: 0.6,
                        delay: 0.15,
                        ease: [0.16, 1, 0.3, 1] // easeOutExpo
                    }}
                    className="text-6xl md:text-8xl font-bold text-white tracking-tighter text-center mb-6"
                >
                    {title}
                </motion.h1>

                {/* Thin horizontal line animates left → right */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "12rem" }}
                    transition={{ 
                        duration: 0.6,
                        delay: 0.4,
                        ease: "easeInOut"
                    }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                />

                {/* Subtext */}
                {subtext && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                        className="text-zinc-600 text-sm tracking-[0.5em] uppercase mt-6"
                    >
                        {subtext}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
