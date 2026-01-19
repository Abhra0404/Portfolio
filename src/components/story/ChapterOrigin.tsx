"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MoveRight, MoveLeft, Brain, Wrench, Rocket } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface ChapterOriginProps {
    onNext: () => void;
    onPrevious?: () => void;
}

export default function ChapterOrigin({ onNext, onPrevious }: ChapterOriginProps) {
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);

    const identityStatements = [
        "I build interfaces.",
        "I think in systems.",
        "I care how things feel."
    ];

    const philosophyCards = [
        {
            icon: Brain,
            title: "How I Think",
            subtitle: "Problem-solving philosophy",
            description: "I don't start with components — I start with intent. Every interface is a system of states, constraints, and decisions.",
            points: [
                "What problem is the user actually trying to solve?",
                "What happens when things go wrong?",
                "Which decisions should the system make automatically?"
            ],
            conclusion: "I believe clarity is the result of deep thinking, not fewer features."
        },
        {
            icon: Wrench,
            title: "How I Build",
            subtitle: "Execution & craftsmanship",
            description: "I design flows before screens and structure before styling. My focus is on predictability, readability, and scale.",
            points: [
                "Component systems that grow without breaking",
                "State that is explicit, not magical",
                "Animations that guide attention, not distract it",
                "Performance that's felt, not just measured"
            ],
            conclusion: "I optimize for the developer who will read this code next — sometimes that developer is future-me."
        },
        {
            icon: Rocket,
            title: "How I Ship",
            subtitle: "Delivery & iteration",
            description: "Shipping is not the end — it's feedback. I ship early to learn fast, then refine with intention.",
            points: [
                "Release with a clear goal",
                "Observe real usage",
                "Remove friction",
                "Improve what actually matters"
            ],
            conclusion: "Polish comes from iteration, not perfection."
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
                                onHoverStart={() => setHoveredLine(index)}
                                onHoverEnd={() => setHoveredLine(null)}
                                className="cursor-default overflow-hidden relative"
                            >
                                <motion.h2
                                    animate={{ 
                                        x: hoveredLine === index ? 6 : 0 
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="text-4xl md:text-6xl font-light text-white/90 tracking-tight relative"
                                >
                                    {statement.split('').map((char, charIndex) => (
                                        <motion.span
                                            key={charIndex}
                                            initial={{ 
                                                opacity: 0,
                                                y: 20,
                                                filter: "blur(10px)"
                                            }}
                                            animate={{ 
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)"
                                            }}
                                            transition={{
                                                delay: index * 0.5 + charIndex * 0.03,
                                                duration: 0.4,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            className="inline-block"
                                            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.h2>
                                
                                {/* Animated underline */}
                                <motion.div
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ 
                                        scaleX: hoveredLine === index ? 1 : 0,
                                        opacity: hoveredLine === index ? 1 : 0
                                    }}
                                    transition={{ 
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="h-0.5 bg-white mt-2 origin-left w-3/4"
                                    style={{
                                        boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                                    }}
                                />
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

                    {/* Right: Elegant Code Visualization */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="relative hidden md:flex items-center justify-center min-h-96"
                    >
                        {/* Ambient glow */}
                        <motion.div 
                            className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-cyan-500/5 rounded-2xl blur-2xl"
                            animate={{
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        
                        {/* Code window mockup */}
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="relative bg-zinc-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-6 max-w-lg shadow-2xl"
                            style={{
                                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(16, 185, 129, 0.1)"
                            }}
                        >
                            {/* Window controls */}
                            <div className="flex gap-2 mb-4 pb-4 border-b border-emerald-500/10">
                                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            </div>
                            
                            {/* Code lines with syntax highlighting */}
                            <div className="font-mono text-sm space-y-2">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1, duration: 0.4 }}
                                    className="flex gap-3"
                                >
                                    <span className="text-zinc-600">1</span>
                                    <span className="text-purple-400">const</span>
                                    <span className="text-blue-300">developer</span>
                                    <span className="text-zinc-400">=</span>
                                    <span className="text-yellow-300">{`{`}</span>
                                </motion.div>
                                
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2, duration: 0.4 }}
                                    className="flex gap-3 pl-6"
                                >
                                    <span className="text-zinc-600">2</span>
                                    <span className="text-blue-300">name:</span>
                                    <span className="text-green-300">&quot;Abhra Jaiswal&quot;</span>
                                    <span className="text-zinc-400">,</span>
                                </motion.div>


                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4, duration: 0.4 }}
                                    className="flex gap-3 pl-6"
                                >
                                    <span className="text-zinc-600">3</span>
                                    <span className="text-blue-300">mindset:</span>
                                    <span className="text-green-300">&quot;Learn → Build → Iterate&quot;</span>
                                    <span className="text-zinc-400">,</span>
                                </motion.div>
                                
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.6, duration: 0.4 }}
                                    className="flex gap-3 pl-6"
                                >
                                    <span className="text-zinc-600">4</span>
                                    <span className="text-blue-300">status:</span>
                                    <span className="text-green-300">&quot;Shipping&quot;</span>
                                </motion.div>
                                
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.8, duration: 0.4 }}
                                    className="flex gap-3"
                                >
                                    <span className="text-zinc-600">5</span>
                                    <span className="text-yellow-300">{`}`}</span>
                                    <span className="text-zinc-400">;</span>
                                </motion.div>
                            </div>
                            
                            {/* Cursor blink */}
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-emerald-400 ml-1 mt-2"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scene 1.3 - Philosophy Snapshot */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="grid md:grid-cols-3 gap-8 mt-12 md:mt-16"
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
                            className="p-8 bg-zinc-900/30 backdrop-blur border border-emerald-500/20 rounded-lg group hover:border-emerald-400/50 transition-colors"
                            style={{
                                boxShadow: "0 0 20px rgba(16, 185, 129, 0.05)"
                            }}
                        >
                            <motion.div
                                animate={{ 
                                    boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" 
                                }}
                                whileHover={{
                                    boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.3)"
                                }}
                                transition={{ duration: 0.3 }}
                                className="rounded-lg space-y-4"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <card.icon className="w-6 h-6 text-emerald-400" />
                                    <h3 className="text-2xl font-semibold text-white">
                                        {card.title}
                                    </h3>
                                </div>
                                <p className="text-emerald-400 text-xs font-mono uppercase tracking-wider">
                                    {card.subtitle}
                                </p>
                                <p className="text-zinc-300 leading-relaxed text-sm">
                                    {card.description}
                                </p>
                                
                                <ul className="space-y-2 mt-4">
                                    {card.points.map((point, i) => (
                                        <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
                                            <span className="text-emerald-500 mt-1">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <p className="text-zinc-500 text-sm italic mt-4 pt-4 border-t border-emerald-500/10">
                                    {card.conclusion}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Navigation buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.6 }}
                    className="mt-20 flex justify-between items-center"
                >
                    {onPrevious && (
                        <button
                            onClick={onPrevious}
                            className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                        >
                            <MoveLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                            <span className="font-mono text-sm tracking-widest uppercase border-b border-emerald-500/30 pb-1 group-hover:border-emerald-400 transition-all">
                                Intro
                            </span>
                        </button>
                    )}
                    <button
                        onClick={onNext}
                        className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer ml-auto"
                    >
                        <span className="font-mono text-sm tracking-widest uppercase border-b border-emerald-500/30 pb-1 group-hover:border-emerald-400 transition-all">
                            Next: Skills Unlocked
                        </span>
                        <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
