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
    const [showSkipIntro, setShowSkipIntro] = useState(false);
    const [showNarrativeText, setShowNarrativeText] = useState(false);
    const [showHiddenText, setShowHiddenText] = useState(false);

    const bootSequence = [
        "Initializing environment…",
        "Loading interface modules…",
        "Optimizing user experience…",
        "Preparing story chapters…"
    ];

    // Scene 0.1 - Show Skip Intro button after 2.5 seconds
    useEffect(() => {
        if (stage === "idle") {
            const skipTimer = setTimeout(() => {
                setShowSkipIntro(true);
            }, 2500);
            return () => clearTimeout(skipTimer);
        }
    }, [stage]);

    // Scene 0.1 - Show narrative text after 4 seconds
    useEffect(() => {
        if (stage === "idle") {
            const narrativeTimer = setTimeout(() => {
                setShowNarrativeText(true);
            }, 4000);
            return () => clearTimeout(narrativeTimer);
        }
    }, [stage]);

    // Scene 0.1 - Show hidden text after 12 seconds
    useEffect(() => {
        if (stage === "idle") {
            const hiddenTimer = setTimeout(() => {
                setShowHiddenText(true);
            }, 12000);
            return () => clearTimeout(hiddenTimer);
        }
    }, [stage]);
    // Handle skip intro
    const handleSkipIntro = () => {
        setStage("transition");
    };

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
                {/* Scene 0.1 - Idle State (Landing Frame) - NETFLIX CINEMATIC */}
                {stage === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ 
                            scale: 0.98, 
                            opacity: 0,
                            transition: { duration: 0.2 }
                        }}
                        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
                        onClick={() => setStage("transition")}
                    >
                        {/* Atmospheric Background Layers */}
                        
                        {/* Cinematic gradient base - darker */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                background: "linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)"
                            }}
                        />

                        {/* Film grain effect */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2'/%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
                                opacity: 0.03
                            }}
                            animate={{
                                opacity: [0.03, 0.05, 0.03]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Slow scan lines drifting upward */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, transparent 2px, transparent 4px)"
                            }}
                            animate={{
                                backgroundPosition: ["0 0", "0 -20px"]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Ultra-slow parallax zoom */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                scale: [1, 1.03, 1]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Main content - centered */}
                        <motion.div
                            className="relative z-10 text-center space-y-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* SYSTEM READY */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                                className="text-xs text-zinc-400 tracking-[0.3em] uppercase font-mono"
                            >
                                System Ready
                            </motion.div>

                            {/* Divider line - drawn from center outward with glow */}
                            <motion.div
                                className="flex justify-center items-center gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.9 }}
                            >
                                <motion.div
                                    className="h-[1px] w-20 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "5rem", opacity: 0.6 }}
                                    transition={{ delay: 1.6, duration: 0.8 }}
                                    style={{
                                        boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)"
                                    }}
                                />
                                <motion.div
                                    className="w-20 h-[1px] bg-gradient-to-l from-transparent via-emerald-400 to-transparent"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "5rem", opacity: 0.6 }}
                                    transition={{ delay: 1.6, duration: 0.8 }}
                                    style={{
                                        boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)"
                                    }}
                                />
                            </motion.div>

                            {/* Main Prompt with enhanced styling */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.3, duration: 0.7 }}
                                className="space-y-3"
                            >
                                <motion.div 
                                    className="text-3xl text-white font-mono tracking-wider font-bold"
                                    style={{
                                        textShadow: "0 0 20px rgba(16, 185, 129, 0.3)"
                                    }}
                                    animate={{
                                        textShadow: [
                                            "0 0 20px rgba(16, 185, 129, 0.3)",
                                            "0 0 30px rgba(16, 185, 129, 0.5)",
                                            "0 0 20px rgba(16, 185, 129, 0.3)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    Press Enter to Start
                                </motion.div>
                                <IntelligentCursor />
                            </motion.div>

                            {/* Supporting text - adds narrative weight */}
                            <motion.div
                                className="space-y-2 pt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0 }}
                            >
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ delay: 2.6, duration: 0.8 }}
                                    className="text-sm text-zinc-300 font-mono"
                                >
                                    An interactive portfolio.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ delay: 2.9, duration: 0.8 }}
                                    className="text-sm text-zinc-300 font-mono"
                                >
                                    Told as a story.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ delay: 3.2, duration: 0.8 }}
                                    className="text-sm text-zinc-300 font-mono"
                                >
                                    Built with intention.
                                </motion.p>
                            </motion.div>

                            {/* Narrative paragraph - appears after 4 seconds */}
                            {showNarrativeText && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 0.7, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="pt-12 max-w-2xl mx-auto space-y-3"
                                >
                                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                                        This is not a résumé.
                                    </p>
                                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                                        This is not a list of skills.
                                    </p>
                                    <p className="text-xs text-zinc-300 leading-relaxed font-light pt-2">
                                        It's a story about how I think,
                                        <br />
                                        how I build,
                                        <br />
                                        and how I turn ideas into systems.
                                    </p>
                                </motion.div>
                            )}

                            {/* Hidden text - appears after 12 seconds */}
                            {showHiddenText && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 0.6, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 1 }}
                                    className="pt-8"
                                >
                                    <motion.p
                                        animate={{ y: [0, -20] }}
                                        transition={{ delay: 2, duration: 3 }}
                                        className="text-xs text-zinc-300 font-mono"
                                    >
                                        Good stories reward patience.
                                    </motion.p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Netflix-style Skip Intro button - bottom right */}
                        {showSkipIntro && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                onClick={handleSkipIntro}
                                className="absolute bottom-8 right-8 z-20 flex items-center gap-2 text-xs text-zinc-200 hover:text-white font-mono tracking-wider transition-colors"
                            >
                                <motion.span
                                    animate={{ scaleX: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    ⏭
                                </motion.span>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "auto" }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden whitespace-nowrap"
                                >
                                    Skip Intro
                                </motion.span>
                            </motion.button>
                        )}
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

/**
 * IntelligentCursor - Living cursor behavior
 * Blinks normally for 3-4s → Pauses → Types "▍" → Deletes → Returns to idle blinking
 */
function IntelligentCursor() {
    const [phase, setPhase] = useState<"blink" | "pause" | "type" | "delete">("blink");
    const [displayChar, setDisplayChar] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout;

        switch (phase) {
            case "blink":
                // Blink normally for 3-4 seconds
                timer = setTimeout(() => setPhase("pause"), 3500);
                break;
            case "pause":
                // Pause for 500ms
                timer = setTimeout(() => setPhase("type"), 500);
                break;
            case "type":
                // Type the cursor character, then move to delete
                setDisplayChar("▍");
                timer = setTimeout(() => setPhase("delete"), 800);
                break;
            case "delete":
                // Delete the character
                setDisplayChar("");
                timer = setTimeout(() => setPhase("blink"), 300);
                break;
        }

        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <motion.span
            className="inline-block ml-2 text-white font-mono text-xl"
            animate={{ opacity: phase === "blink" ? [1, 0, 1] : 1 }}
            transition={{
                duration: phase === "blink" ? 1.4 : 0.1,
                repeat: phase === "blink" ? Infinity : 0,
                times: phase === "blink" ? [0, 0.5, 1] : undefined
            }}
        >
            {displayChar || "▍"}
        </motion.span>
    );
}
