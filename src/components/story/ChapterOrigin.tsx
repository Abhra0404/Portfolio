"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface ChapterOriginProps {
    onNext: () => void;
}

export default function ChapterOrigin({ onNext }: ChapterOriginProps) {
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);

    const identityStatements = [
        "I build interfaces.",
        "I think in systems.",
        "I care how things feel."
    ];

    const philosophyCards = [
        {
            title: "Focus",
            description: "Building products that matter, not just features that ship."
        },
        {
            title: "Mindset",
            description: "Every design decision is an engineering constraint. Every constraint is creative fuel."
        },
        {
            title: "What I value",
            description: "Performance, clarity, and the invisible details that make experiences feel right."
        }
    ];

    return (
        <section className="min-h-screen w-full flex flex-col justify-center px-8 md:px-16 py-20">
            <div className="max-w-7xl mx-auto w-full">
                {/* Scene 1.2 - Identity Reveal */}
                <div className="grid md:grid-cols-2 gap-16 mb-32">
                    {/* Left: Identity statements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {identityStatements.map((statement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: index * 0.3,
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1] // easeOutExpo
                                }}
                                onHoverStart={() => setHoveredLine(index)}
                                onHoverEnd={() => setHoveredLine(null)}
                                className="cursor-default"
                            >
                                <motion.h2
                                    animate={{ 
                                        x: hoveredLine === index ? 6 : 0 
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="text-4xl md:text-6xl font-light text-white/90 tracking-tight"
                                >
                                    {statement}
                                </motion.h2>
                            </motion.div>
                        ))}
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="pt-8"
                        >
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                {PORTFOLIO_DATA.profile.bio}
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right: Abstract UI grid / soft glow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="relative hidden md:flex items-center justify-center"
                    >
                        <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="grid grid-cols-4 gap-2">
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 0.3, scale: 1 }}
                                        transition={{
                                            delay: 0.8 + (i * 0.05),
                                            duration: 0.4
                                        }}
                                        className="w-12 h-12 border border-emerald-500/20 rounded-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scene 1.3 - Philosophy Snapshot */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {philosophyCards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ 
                                opacity: 0, 
                                x: index % 2 === 0 ? -40 : 40 
                            }}
                            animate={{ 
                                opacity: 1, 
                                x: 0 
                            }}
                            transition={{
                                delay: 1.8 + (index * 0.2),
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1] // easeOutExpo
                            }}
                            whileHover={{ 
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                            className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg group hover:border-emerald-500/30 transition-colors"
                        >
                            <motion.div
                                animate={{ 
                                    boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" 
                                }}
                                whileHover={{
                                    boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.2)"
                                }}
                                transition={{ duration: 0.3 }}
                                className="rounded-lg"
                            >
                                <h3 className="text-xl font-semibold text-emerald-500 mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Continue button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.6 }}
                    className="mt-20 flex justify-center"
                >
                    <button
                        onClick={onNext}
                        className="group px-8 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg transition-all"
                    >
                        <span className="text-emerald-500 font-mono tracking-wider">
                            Continue → Skills Unlocked
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
