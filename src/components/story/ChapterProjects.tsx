"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight, MoveRight, MoveLeft } from "lucide-react";

interface ChapterProjectsProps {
    onNext: () => void;
    onPrevious?: () => void;
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
        title: "CryptoX - Crypto Education Platform",
        role: "Full-Stack Developer",
        problem: "Crypto education is fragmented across YouTube, Reddit, and Discord. New learners have no structured path and fall victim to scams.",
        challenge: "Building an engaging learning platform with real-time market data, interactive quizzes, and a secure knowledge base.",
        result: "Created a comprehensive crypto education platform with 200+ lessons, 98% learner success rate, serving 50k+ active users learning blockchain safely.",
        stack: ["React", "Javascript", "Tailwind CSS", "CoinGecko API"],
        link: "https://crypto-x-virid.vercel.app/",
        github: "https://github.com/Abhra0404/CryptoX"
    },
    {
        id: "p2",
        episode: "EPISODE 02",
        title: "Kaizen - Student Productivity Dashboard",
        role: "Full-Stack Developer",
        problem: "Students juggle multiple tracking apps (habit trackers, project managers, goal setters). Information scattered, motivation lost.",
        challenge: "Designing a minimalist dashboard that consolidates DSA progress, project management, habit tracking, and semester goals without overwhelming users.",
        result: "Built a unified productivity platform loved by students. Features streak-based habit tracking, DSA visualizations, and project management—all in one clean interface.",
        stack: ["React", "TypeScript", "Charts.js", "Tailwind CSS"],
        link: "https://kaizen-phi-five.vercel.app/",
        github: "https://github.com/Abhra0404/Kaizen"
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

export default function ChapterProjects({ onNext, onPrevious }: ChapterProjectsProps) {
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
                        className="text-emerald-400 font-mono text-sm tracking-wider"
                    >
                        CHAPTER 3: PROJECTS THAT SLAP
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="group relative border-b border-emerald-900/30 hover:border-emerald-500/50 transition-colors pb-8 cursor-pointer"
                            onClick={() => setActiveProject(project)}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                                <span className="font-mono text-xs text-zinc-500 group-hover:text-emerald-400 transition-colors">
                                    {project.episode}
                                </span>
                                <div className="flex-1 md:ml-12">
                                    <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-200 group-hover:text-white transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-zinc-400 mt-2 font-mono text-sm">{project.role}</p>
                                </div>
                                <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all opacity-0 group-hover:opacity-100" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="mt-16 flex justify-between items-center"
                >
                    {onPrevious && (
                        <button
                            onClick={onPrevious}
                            className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                        >
                            <MoveLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                            <span className="font-mono text-sm tracking-widest uppercase border-b border-emerald-500/30 pb-1 group-hover:border-emerald-400 transition-all">
                                Previous: Skills Unlocked
                            </span>
                        </button>
                    )}
                    <button
                        onClick={onNext}
                        className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer ml-auto"
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
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900/50 backdrop-blur border border-emerald-500/20 w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl"
                            style={{
                                boxShadow: "0 0 50px rgba(16, 185, 129, 0.1)"
                            }}
                        >
                            <div className="p-8 border-b border-emerald-500/10 flex justify-between items-start bg-black/40">
                                <div>
                                    <span className="text-emerald-400 font-mono text-xs tracking-widest block mb-2">{activeProject.episode}</span>
                                    <h2 className="text-3xl font-bold text-white">{activeProject.title}</h2>
                                    <div className="flex gap-2 mt-4">
                                        {activeProject.stack.map(tech => (
                                            <span key={tech} className="px-2 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded font-mono border border-emerald-500/20">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => setActiveProject(null)} className="text-zinc-500 hover:text-emerald-400 transition-colors">
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
                                        <h4 className="text-emerald-400/80 text-sm font-bold uppercase tracking-wider">The Result</h4>
                                        <p className="text-white text-sm leading-relaxed">{activeProject.result}</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-emerald-500/10 flex gap-4">
                                    {activeProject.github && (
                                        <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors">
                                            <Github className="w-5 h-5" />
                                            <span className="text-sm font-bold">View Source</span>
                                        </a>
                                    )}
                                    {activeProject.link && (
                                        <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors">
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
