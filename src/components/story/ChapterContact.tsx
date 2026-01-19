"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, CheckCircle, MoveLeft, Github, Linkedin, Mail, Clock, MapPin, Zap } from "lucide-react";

interface ChapterContactProps {
    onPrevious?: () => void;
}

export default function ChapterContact({ onPrevious }: ChapterContactProps = {}) {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        // Simulate network request
        setTimeout(() => {
            setStatus("success");
            setFormState({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <section className="min-h-screen w-full flex flex-col py-20 max-w-4xl mx-auto px-6 md:px-12 pointer-events-auto overflow-y-auto">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Let&apos;s Build Something
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                    Got an idea? Need a developer who thinks in systems and ships fast? 
                    Drop me a message. I&apos;m always open to interesting projects and collaborations.
                </p>
            </motion.div>

            {/* Status Cards */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/30 border border-emerald-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <div>
                        <p className="text-xs text-zinc-500 font-mono uppercase">Status</p>
                        <p className="text-sm text-emerald-400 font-semibold">Available for work</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/30 border border-emerald-500/20 rounded-lg">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <div>
                        <p className="text-xs text-zinc-500 font-mono uppercase">Response Time</p>
                        <p className="text-sm text-zinc-300 font-semibold">Within 24 hours</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/30 border border-emerald-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    <div>
                        <p className="text-xs text-zinc-500 font-mono uppercase">Location</p>
                        <p className="text-sm text-zinc-300 font-semibold">Remote / India</p>
                    </div>
                </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6 mb-8"
            >
                <a
                    href="https://github.com/Abhra0404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-emerald-500/30 hover:border-emerald-400/50 rounded-lg transition-all hover:bg-zinc-900/70"
                >
                    <Github className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                    <span className="text-zinc-400 group-hover:text-emerald-300 font-mono text-sm uppercase tracking-wider transition-colors">
                        GitHub
                    </span>
                </a>
                <a
                    href="https://linkedin.com/in/abhra0404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-emerald-500/30 hover:border-emerald-400/50 rounded-lg transition-all hover:bg-zinc-900/70"
                >
                    <Linkedin className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                    <span className="text-zinc-400 group-hover:text-emerald-300 font-mono text-sm uppercase tracking-wider transition-colors">
                        LinkedIn
                    </span>
                </a>
                <a
                    href="mailto:aforabhra@gmail.com"
                    className="group flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-emerald-500/30 hover:border-emerald-400/50 rounded-lg transition-all hover:bg-zinc-900/70"
                >
                    <Mail className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                    <span className="text-zinc-400 group-hover:text-emerald-300 font-mono text-sm uppercase tracking-wider transition-colors">
                        Email
                    </span>
                </a>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                    exit: { opacity: 0, transition: { duration: 0.5 } }
                }}
                className="w-full bg-zinc-900/20 backdrop-blur border border-emerald-500/20 p-8 md:p-12 rounded-lg relative overflow-hidden"
                style={{
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.05)"
                }}
            >
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,240,255,0.03),rgba(0,240,255,0.01),rgba(0,240,255,0.03))] z-10 bg-size-[100%_2px,3px_100%] opacity-20"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-zinc-900/50 border border-emerald-500/30 rounded-full">
                        <Terminal className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <motion.h2
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="text-2xl font-bold text-white tracking-wide"
                            style={{
                                textShadow: "0 0 20px rgba(16, 185, 129, 0.2)"
                            }}
                        >
                            ESTABLISH CONNECTION
                        </motion.h2>
                        <motion.p
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="text-emerald-400/80 font-mono text-xs mt-1"
                        >
                            SECURE CHANNEL :: OPEN
                        </motion.p>
                    </div>
                </div>

                {/* Description Text */}
                <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="mb-6 pb-6 border-b border-emerald-500/10"
                >
                    <p className="text-zinc-400 leading-relaxed">
                        Whether you&apos;re looking to collaborate on a project, need technical consultation, 
                        or just want to discuss ideas, I&apos;m here to help. Fill out the form below or reach 
                        out directly through any of the social links above.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <label className="block text-xs font-mono text-emerald-400/80 mb-2 uppercase tracking-widest">
                            &gt; Identify Identity
                        </label>
                        <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full bg-zinc-950/50 border border-emerald-500/30 p-4 text-zinc-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
                            placeholder="Enter Name..."
                        />
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <label className="block text-xs font-mono text-emerald-400/80 mb-2 uppercase tracking-widest">
                            &gt; Signal Frequency (Email)
                        </label>
                        <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full bg-zinc-950/50 border border-emerald-500/30 p-4 text-zinc-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
                            placeholder="user@example.com..."
                        />
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <label className="block text-xs font-mono text-emerald-400/80 mb-2 uppercase tracking-widest">
                            &gt; Payload (Message)
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            className="w-full bg-zinc-950/50 border border-emerald-500/30 p-4 text-zinc-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono resize-none"
                            placeholder="Construct query..."
                        />
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="flex justify-end pt-4"
                    >
                        <button
                            type="submit"
                            disabled={status === "sending" || status === "success"}
                            className="bg-cyan-600/20 border border-emerald-500/50 text-emerald-400 hover:bg-cyan-600/30 hover:text-emerald-300 px-8 py-3 flex items-center gap-3 transition-all uppercase tracking-widest font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)"
                            }}
                        >
                            {status === "idle" && (
                                <>
                                    <span>Transmit Payload</span>
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                            {status === "sending" && (
                                <span className="animate-pulse">Transmitting...</span>
                            )}
                            {status === "success" && (
                                <>
                                    <span>Transmission Complete</span>
                                    <CheckCircle className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Success Message */}
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg"
                        >
                            <p className="text-emerald-400 text-sm font-mono flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Message received! I&apos;ll get back to you within 24 hours.
                            </p>
                        </motion.div>
                    )}
                </form>

                {/* Additional Info */}
                <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="mt-8 pt-6 border-t border-emerald-500/10 relative z-20"
                >
                    <p className="text-zinc-500 text-xs font-mono mb-3 uppercase tracking-wider">
                        What I&apos;m interested in:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Full-stack Development", "System Design", "Performance Optimization", "Open Source", "Technical Consulting"].map((interest) => (
                            <span
                                key={interest}
                                className="px-3 py-1 bg-emerald-900/20 text-emerald-400 text-xs rounded-full border border-emerald-500/20 font-mono"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {onPrevious && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-12"
                >
                    <button
                        onClick={onPrevious}
                        className="group flex items-center gap-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                        <MoveLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        <span className="font-mono text-sm tracking-widest uppercase border-b border-emerald-500/30 pb-1 group-hover:border-emerald-400 transition-all">
                            Previous: Projects
                        </span>
                    </button>
                </motion.div>
            )}

        </section>
    );
}
