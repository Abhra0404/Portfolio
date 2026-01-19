"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showCTA, setShowCTA] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowCTA(true), 3200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        const handleChange = () => setIsMobile(media.matches);
        handleChange();
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const intensity = isMobile ? 8 : 20;
                setMousePosition({ x: (x - 0.5) * intensity, y: (y - 0.5) * intensity });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);
    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 py-16 md:py-20 overflow-hidden relative grid-surface"
            style={{ backgroundColor: "#050505" }}
        >
            {/* Grid background overlay */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(0deg, transparent 23px, rgba(255, 255, 255, 0.08) 24px)",
                    backgroundSize: "100% 24px",
                    mixBlendMode: "screen",
                    opacity: isMobile ? 0.28 : 0.45
                }}
            />
            {/* Radial vignette */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)"
                }}
            />

            {/* Subtle animated grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "url('data:image/svg+xml,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" result=\"noise\"/></filter><rect width=\"200\" height=\"200\" fill=\"white\" filter=\"url(%23noise)\"/></svg>')",
                    animation: "grain 8s steps(10) infinite"
                }}
            />

            {/* Content */}
            <div className="max-w-3xl sm:max-w-4xl mx-auto w-full text-center relative z-10">
                {/* First line */}
                <motion.div
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    style={{ x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white/95 tracking-tight">
                        Most portfolios tell you
                        <br />
                        what someone knows.
                    </h1>
                </motion.div>

                {/* Second line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                    style={{ x: mousePosition.x * 0.25, y: mousePosition.y * 0.25 }}
                    className="mt-16 sm:mt-16 md:mt-14"
                >
                    <div className="relative inline-block">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white tracking-tight">
                            This one shows
                            <br />
                            how I think.
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-linear-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0 origin-center"
                            style={{ width: "80%" }}
                        />
                    </div>
                </motion.div>

                {/* Identity statements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 0.6 }}
                    className="mt-20 sm:mt-20 md:mt-22 space-y-10 sm:space-y-10 md:space-y-10"
                    style={{ x: mousePosition.x * 0.2, y: mousePosition.y * 0.2 }}
                >
                    {[
                        "I build interfaces.",
                        "I think in systems.",
                        "I care how things feel."
                    ].map((text, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 2.2 + (index * 0.4),
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            className={`text-xl md:text-2xl font-light leading-relaxed ${
                                index === 2 ? "text-white/95" : "text-white/75"
                            }`}
                        >
                            {text}
                        </motion.p>
                    ))}
                </motion.div>

                {/* Final line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.8, duration: 0.8, ease: "easeOut" }}
                    style={{ x: mousePosition.x * 0.15, y: mousePosition.y * 0.15 }}
                    className="mt-24 sm:mt-22 md:mt-24 text-xs sm:text-sm md:text-base tracking-widest uppercase text-white/70 font-light"
                >
                    The rest is just evidence.
                </motion.p>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={showCTA ? { opacity: 1 } : { opacity: 0 }}
                       transition={{ delay: 1.3, duration: 0.8 }}
                    onClick={onComplete}
                    aria-label="Scroll"
                    className="absolute bottom-12 sm:bottom-12 left-1/2 transform -translate-x-1/2 group cursor-pointer"
                >
                    <motion.div
                        whileHover={{ y: 2 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <span className="text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase">
                            Tap Here
                        </span>
                        <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-white/60 group-hover:text-white transition-colors"
                        >
                            ↓
                        </motion.div>
                    </motion.div>
                </motion.button>
            </div>

        </section>
    );
}
