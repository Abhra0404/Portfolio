"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [stage, setStage] = useState<"idle" | "transition" | "boot">("idle");
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [currentBootLine, setCurrentBootLine] = useState(0);

    const bootSequence = [
        "Initializing environment…",
        "Loading interface modules…",
        "Optimizing user experience…",
        "Preparing story chapters…"
    ];

    // Scene 0.1 & 0.2 - Handle Enter key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && stage === "idle") {
                setStage("transition");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [stage]);

    // Scene 0.2 - Transition to boot after scanline effect
    useEffect(() => {
        if (stage === "transition") {
            const timer = setTimeout(() => {
                setStage("boot");
            }, 200); // 80ms scanline + 120ms buffer
            return () => clearTimeout(timer);
        }
    }, [stage]);

    // Scene 0.3 - Boot sequence with typewriter effect
    useEffect(() => {
        if (stage === "boot" && currentBootLine < bootSequence.length) {
            const timer = setTimeout(() => {
                setBootLines(prev => [...prev, bootSequence[currentBootLine]]);
                setCurrentBootLine(currentBootLine + 1);
            }, 600); // Delay between lines
            return () => clearTimeout(timer);
        } else if (stage === "boot" && currentBootLine >= bootSequence.length) {
            // After last line, pause then zoom and complete
            const timer = setTimeout(() => {
                onComplete();
            }, 1200); // 500ms pause + 700ms zoom transition
            return () => clearTimeout(timer);
        }
    }, [stage, currentBootLine, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-black">
            <AnimatePresence mode="wait">
                {/* Scene 0.1 - Idle State (Landing Frame) */}
                {stage === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ 
                            scale: 0.9, 
                            opacity: 0.8,
                            transition: { duration: 0.15 }
                        }}
                        className="text-center cursor-pointer"
                        onClick={() => setStage("transition")}
                    >
                        <div className="relative">
                            <p className="text-zinc-400 font-mono text-lg tracking-wider">
                                Press Enter to Start
                            </p>
                            {/* Blinking cursor */}
                            <motion.span
                                className="inline-block ml-1 text-zinc-400 font-mono"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ 
                                    duration: 1.4, 
                                    repeat: Infinity,
                                    times: [0, 0.5, 1]
                                }}
                            >
                                ▍
                            </motion.span>
                        </div>
                    </motion.div>
                )}

                {/* Scene 0.2 - Enter Pressed (Transition with scanline) */}
                {stage === "transition" && (
                    <motion.div
                        key="transition"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.08 }}
                        className="absolute inset-0 bg-white/10"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 2px, transparent 4px)",
                        }}
                    />
                )}

                {/* Scene 0.3 - Boot Log Sequence */}
                {stage === "boot" && (
                    <motion.div
                        key="boot"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ 
                            opacity: 1, 
                            scale: currentBootLine >= bootSequence.length ? 1.05 : 1 
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            scale: { duration: 0.7, delay: 0.5 }
                        }}
                        className="font-mono text-sm text-emerald-500/90 space-y-3"
                    >
                        {bootLines.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TypewriterText text={line} speed={35} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TypewriterText({ text, speed = 50 }: { text: string; speed?: number }) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setDisplayed(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{displayed}</span>;
}
