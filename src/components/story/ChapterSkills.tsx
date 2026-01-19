"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LockOpen, Code, Palette, Zap, Wrench, MoveRight, MoveLeft } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface ChapterSkillsProps {
    onNext: () => void;
    onPrevious?: () => void;
}

interface SkillModule {
    id: string;
    title: string;
    icon: typeof Code;
    skills: string[];
    color: string;
}

const skillModules: SkillModule[] = [
    {
        id: "frontend",
        title: "Frontend",
        icon: Code,
        skills: PORTFOLIO_DATA.skills.frontend,
        color: "emerald"
    },
    {
        id: "backend",
        title: "Backend",
        icon: Wrench,
        skills: PORTFOLIO_DATA.skills.backend,
        color: "purple"
    },
    {
        id: "tools",
        title: "Tooling",
        icon: Zap,
        skills: PORTFOLIO_DATA.skills.tools,
        color: "pink"
    },
    {
        id: "design",
        title: "UI/UX",
        icon: Palette,
        skills: ["Figma", "Design Systems", "Motion Design", "Accessibility"],
        color: "blue"
    }
];

export default function ChapterSkills({ onNext, onPrevious }: ChapterSkillsProps) {
    const [unlocked, setUnlocked] = useState(false);

    // Scene 2.1 - Auto-trigger unlock animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setUnlocked(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);


    return (
        <section className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 py-20">
            <div className="max-w-6xl mx-auto w-full">
                {/* Scene 2.1 - Unlock Animation */}
                {!unlocked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center min-h-[60vh]"
                    >
                        {/* Central unlock pulse with emerald glow */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                                scale: [0.8, 1.4, 1],
                                opacity: [0, 1, 0.8]
                            }}
                            transition={{
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="relative"
                        >
                            <motion.div
                                className="absolute inset-0 bg-emerald-500/30 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            />
                            <motion.div
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(16, 185, 129, 0.3)",
                                        "0 0 25px rgba(16, 185, 129, 0.6)",
                                        "0 0 10px rgba(16, 185, 129, 0.3)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            >
                                <Lock className="w-24 h-24 text-emerald-400 relative z-10" />
                            </motion.div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-zinc-500 font-mono text-sm tracking-wider"
                        >
                            UNLOCKING CAPABILITIES...
                        </motion.p>
                    </motion.div>
                )}

                {/* Scene 2.2 - Skill Modules View */}
                <AnimatePresence>
                    {unlocked && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-emerald-400 font-mono text-sm tracking-wider mb-8"
                            >
                                CHAPTER 2: SKILLS UNLOCKED
                            </motion.p>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight"
                            >
                                Capabilities earned, not claimed.
                            </motion.h2>

                            {/* Skill tiles grid */}
                            <div className="grid md:grid-cols-2 gap-6 mb-16">
                                {skillModules.map((module, index) => {
                                    const Icon = module.icon;

                                    return (
                                        <motion.div
                                            key={module.id}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ 
                                                opacity: 1, 
                                                scale: 1 
                                            }}
                                            transition={{
                                                delay: 0.2 + (index * 0.15),
                                                duration: 0.5,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            className="relative"
                                        >
                                            {/* Soft glow burst on unlock */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ 
                                                    opacity: [0.8, 0],
                                                    scale: [0.8, 1.5]
                                                }}
                                                transition={{
                                                    delay: 0.2 + (index * 0.15),
                                                    duration: 0.8
                                                }}
                                                className={`absolute inset-0 bg-${module.color}-500/30 rounded-lg blur-xl`}
                                            />

                                            <motion.div
                                                whileHover={{ y: -4 }}
                                                transition={{ duration: 0.2 }}
                                                className={`relative bg-zinc-900/30 backdrop-blur border border-emerald-500/20 rounded-lg p-6 cursor-default hover:border-emerald-400/50 transition-colors overflow-hidden`}
                                                style={{
                                                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.05)"
                                                }}
                                            >
                                                {/* Accent border animation with emerald glow */}
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    whileHover={{ scaleX: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-emerald-400 to-transparent origin-left"
                                                    style={{
                                                        boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)"
                                                    }}
                                                />

                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                                                        <Icon className="w-6 h-6 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <LockOpen className="w-5 h-5 text-emerald-400/60" />
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-semibold text-white mb-2">
                                                    {module.title}
                                                </h3>

                                                <p className="text-zinc-400 text-sm mb-4">
                                                    {module.skills.length} capabilities unlocked
                                                </p>

                                                {/* Accordion content - smooth height animation */}
                                                <div className="overflow-visible">
                                                    <div className="pt-4 border-t border-zinc-800 mt-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {module.skills.map((skill, i) => (
                                                                <motion.span
                                                                    key={skill}
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: i * 0.05 }}
                                                                    className="px-3 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-full border border-emerald-500/20"
                                                                    style={{
                                                                        boxShadow: "0 0 8px rgba(16, 185, 129, 0.2)"
                                                                    }}
                                                                >
                                                                    {skill}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Scene 2.3 - Growth Indicator */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="bg-linear-to-r from-zinc-900/50 to-transparent border-l-2 border-emerald-500/50 p-8 rounded-lg mb-16"
                            >
                                <h3 className="text-lg font-semibold text-emerald-500 mb-4 flex items-center gap-3">
                                    <span>Currently Learning</span>
                                    {/* Animated dotted line */}
                                    <motion.div
                                        className="flex-1 h-px relative overflow-hidden"
                                    >
                                        <motion.div
                                            className="absolute inset-0 border-t-2 border-dotted border-emerald-500/30"
                                            animate={{
                                                x: [0, 20, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                    </motion.div>
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Artifiial Intelligence", "Machine Learning", "DevOps", "Data Structures", "Algorithms"].map((item, i) => (
                                        <motion.span
                                            key={item}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1 + (i * 0.1) }}
                                            className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg"
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Navigation buttons */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex justify-between items-center"
                            >
                                {onPrevious && (
                                    <button
                                        onClick={onPrevious}
                                        className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                                    >
                                        <MoveLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                                        <span className="font-mono text-sm tracking-widest uppercase border-b border-emerald-500/30 pb-1 group-hover:border-emerald-400 transition-all">
                                            Previous: Origin
                                        </span>
                                    </button>
                                )}
                                <button
                                    onClick={onNext}
                                    className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer ml-auto"
                                >
                                    <span className="font-mono text-sm tracking-widest uppercase border-b border-emerald-500/30 pb-1 group-hover:border-emerald-400 transition-all">
                                        Next: Projects That Slap
                                    </span>
                                    <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
