"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, CheckCircle, AlertCircle } from "lucide-react";

export default function ChapterContact() {
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
        <section className="h-screen w-full flex flex-col justify-center max-w-4xl mx-auto px-6 md:px-12 pointer-events-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                    exit: { opacity: 0, transition: { duration: 0.5 } }
                }}
                className="w-full bg-zinc-900/30 border border-zinc-800 p-8 md:p-12 rounded-lg relative overflow-hidden"
            >
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-size-[100%_2px,3px_100%] opacity-20"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-full">
                        <Terminal className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <motion.h2
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="text-2xl font-bold text-white tracking-wide"
                        >
                            ESTABLISH CONNECTION
                        </motion.h2>
                        <motion.p
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="text-zinc-500 font-mono text-xs mt-1"
                        >
                            SECURE CHANNEL :: OPEN
                        </motion.p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <label className="block text-xs font-mono text-emerald-500/80 mb-2 uppercase tracking-widest">
                            &gt; Identify Identity
                        </label>
                        <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
                            placeholder="Enter Name..."
                        />
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <label className="block text-xs font-mono text-emerald-500/80 mb-2 uppercase tracking-widest">
                            &gt; Signal Frequency (Email)
                        </label>
                        <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
                            placeholder="user@example.com..."
                        />
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                        <label className="block text-xs font-mono text-emerald-500/80 mb-2 uppercase tracking-widest">
                            &gt; Payload (Message)
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono resize-none"
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
                            className="bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-600/30 hover:text-emerald-300 px-8 py-3 flex items-center gap-3 transition-all uppercase tracking-widest font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                </form>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center mt-12 mb-8"
            >
                <div className="flex justify-center gap-8 text-zinc-600 font-mono text-xs">
                    <a href="https://github.com/Abhra0404" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">GITHUB</a>
                    <a href="https://linkedin.com/in/abhra0404" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">LINKEDIN</a>
                    <a href="mailto:aforabhra@gmail.com" className="hover:text-emerald-500 transition-colors">EMAIL</a>
                </div>
            </motion.div>
        </section>
    );
}
