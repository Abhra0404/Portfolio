"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight, MoveRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface ChapterProjectsProps {
    onNext: () => void;
}

interface Project {
    id: string;
    episode: string;
    title: string;
    role: string;
    problem: string;
    challenge: string;
    result: string;
    stack: string[];
    link?: string;
    github?: string;
}

const projects: Project[] = [
    {
        id: "p1",
        episode: "EPISODE 01",
        title: "Voice-Activated Drone Control",
        role: "Lead Systems Engineer",
        problem: "Drones are hard to fly manually during emergency response operations.",
        challenge: "Latency in voice-to-signal processing caused flight instability.",
        result: "Built a local LLM interface reducing latency to <200ms, enabling real-time voice command execution.",
        stack: ["Python", "Whisper", "C++", "React Native"],
        github: "https://github.com/Abhra0404"
    },
    {
        id: "p2",
        episode: "EPISODE 02",
        title: "Algorithmic Trading Engine",
        role: "Backend Architect",
        problem: "Retail trading platforms lack institutional-grade risk management.",
        challenge: "Handling concurrent websocket streams without blocking the event loop.",
        result: "Processed 50k+ signals/sec with 99.9% uptime using Rust-based workers and Node.js orchestrators.",
        stack: ["Node.js", "Rust", "Redis", "PostgreSQL"],
        github: "https://github.com/Abhra0404"
    },
    {
        id: "p3",
        episode: "EPISODE 03",
        title: "Portfolio Origin Story",
        role: "Creative Developer",
        problem: "Portfolios are boring lists of links.",
        challenge: "Balancing cinematic visuals with accessibility and performance.",
        result: "A Netflix-style interactive story (what you are seeing now) with 100/100 Lighthouse score.",
        stack: ["Next.js", "Framer Motion", "Tailwind"],
        github: "https://github.com/Abhra0404"
    }
];

export default function ChapterProjects({ onNext }: ChapterProjectsProps) {
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    return (
        <section className="h-screen w-full flex flex-col justify-center max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                    exit: { opacity: 0, transition: { duration: 0.5 } }
                }}
                className="w-full"
            >
                <div className="flex justify-between items-end mb-12">
                    <motion.p
                        variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                        className="text-emerald-500 font-mono text-sm tracking-wider"
                    >
                        CHAPTER 3: PROJECTS THAT SLAP
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="group relative border-b border-zinc-800 hover:border-emerald-500/50 transition-colors pb-8 cursor-pointer"
                            onClick={() => setActiveProject(project)}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                                <span className="font-mono text-xs text-zinc-600 group-hover:text-emerald-500 transition-colors">
                                    {project.episode}
                                </span>
                                <div className="flex-1 md:ml-12">
                                    <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-300 group-hover:text-white transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-zinc-500 mt-2 font-mono text-sm">{project.role}</p>
                                </div>
                                <ChevronRight className="w-6 h-6 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all opacity-0 group-hover:opacity-100" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="mt-16 flex justify-end"
                >
                    <button
                        onClick={onNext}
                        className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                        <span className="font-mono text-sm tracking-widest uppercase border-b border-emerald-500/30 pb-1 group-hover:border-emerald-400 transition-all">
                            Final Level: Contact
                        </span>
                        <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </motion.div>
            </motion.div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900 border border-zinc-700 w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-8 border-b border-zinc-800 flex justify-between items-start bg-zinc-950/50">
                                <div>
                                    <span className="text-emerald-500 font-mono text-xs tracking-widest block mb-2">{activeProject.episode}</span>
                                    <h2 className="text-3xl font-bold text-white">{activeProject.title}</h2>
                                    <div className="flex gap-2 mt-4">
                                        {activeProject.stack.map(tech => (
                                            <span key={tech} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded font-mono border border-zinc-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => setActiveProject(null)} className="text-zinc-500 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-400 text-sm font-bold uppercase tracking-wider">The Problem</h4>
                                        <p className="text-zinc-300 text-sm leading-relaxed">{activeProject.problem}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-400 text-sm font-bold uppercase tracking-wider">The Challenge</h4>
                                        <p className="text-zinc-300 text-sm leading-relaxed">{activeProject.challenge}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-emerald-500/80 text-sm font-bold uppercase tracking-wider">The Result</h4>
                                        <p className="text-white text-sm leading-relaxed">{activeProject.result}</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-zinc-800 flex gap-4">
                                    {activeProject.github && (
                                        <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                                            <Github className="w-5 h-5" />
                                            <span className="text-sm font-bold">View Source</span>
                                        </a>
                                    )}
                                    {activeProject.link && (
                                        <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                            <span className="text-sm font-bold">Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
