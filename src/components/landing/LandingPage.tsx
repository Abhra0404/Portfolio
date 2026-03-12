"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    ArrowUpRight,
    Code2,
    Layers,
    Zap,
    Terminal,
    ChevronDown,
    Send,
    MapPin,
    Clock,
    LockOpen,
    CheckCircle,
    Copy,
    Check,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

/* ─────────────────────────── git badge ─────────────────────────── */

function GitBadge() {
    const full = `git commit -m "building things that matter"`;
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i++;
            setDisplayed(full.slice(0, i));
            if (i >= full.length) clearInterval(id);
        }, 45);
        return () => clearInterval(id);
    }, []);

    const cmd = displayed.startsWith("git commit") ? "git commit" : "";
    const rest = displayed.slice(cmd.length);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-10 font-mono text-sm"
        >
            <span className="text-zinc-600">$</span>
            <span className="text-emerald-400">{cmd}</span>
            <span className="text-zinc-500">{rest}</span>
            {displayed.length < full.length && (
                <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                    className="w-0.5 h-4 bg-zinc-500 rounded-sm"
                />
            )}
        </motion.div>
    );
}

/* ─────────────────────────── helpers ─────────────────────────── */

function FadeUp({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function SectionLabel({ children, rightLine }: { children: React.ReactNode, rightLine?: boolean }) {
    return (
        <span className="inline-flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs tracking-[0.3em] uppercase mb-6">
            <span className="w-6 h-px bg-emerald-500" />
            {children}
            {rightLine && <span className="w-6 h-px bg-emerald-500" />}
        </span>
    );
}

/* ─────────────────────────── nav ─────────────────────────── */

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = ["About", "Skills", "Projects", "Contact"];

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-black/80 backdrop-blur-xl border-b border-white/8"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-2 group">
                    <div className="w-7 h-7 border border-emerald-500/60 rounded flex items-center justify-center group-hover:border-emerald-400 transition-colors">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">
                        abhra<span className="text-emerald-400">.dev</span>
                    </span>
                </a>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <li key={l}>
                            <a
                                href={`#${l.toLowerCase()}`}
                                className="font-mono text-xs tracking-widest uppercase text-zinc-400 hover:text-emerald-400 transition-colors"
                            >
                                {l}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href="#contact"
                    className="hidden md:flex items-center gap-2 px-4 py-2 border border-emerald-500/50 text-emerald-400 font-mono text-xs tracking-widest uppercase hover:bg-emerald-500/10 transition-all rounded"
                >
                    Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                    <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden bg-black/95 border-b border-white/10 px-6 pb-6 flex flex-col gap-4"
                >
                    {links.map((l) => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase()}`}
                            onClick={() => setMenuOpen(false)}
                            className="font-mono text-xs tracking-widest uppercase text-zinc-400 hover:text-emerald-400 transition-colors py-2 border-b border-white/5"
                        >
                            {l}
                        </a>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
}

/* ─────────────────────────── hero ─────────────────────────── */

function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 24,
                y: (e.clientY / window.innerHeight - 0.5) * 24,
            });
        };
        window.addEventListener("mousemove", handler);
        return () => window.removeEventListener("mousemove", handler);
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Animated background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Git badge */}
                <GitBadge />

                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ x: mousePos.x * 0.15, y: mousePos.y * 0.15 }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-tighter text-zinc-300 leading-none mb-4">
                        Abhra Jaiswal
                    </h1>
                </motion.div>

                {/* Role */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    style={{ x: mousePos.x * 0.1, y: mousePos.y * 0.1 }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white/70 tracking-tight">
                            Computer Science Engineer
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute -bottom-3 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-400/60 to-transparent origin-center"
                        />
                    </div>
                </motion.div>

                {/* Bio */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-12"
                >
                    I design systems, not just screens. Every pixel, animation, and logic flow is
                    a deliberate engineering decision.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
                >
                    <a
                        href="#projects"
                        className="group flex items-center gap-3 px-8 py-3.5 bg-emerald-500 text-black font-semibold text-sm tracking-wide hover:bg-emerald-400 transition-all rounded"
                        style={{ boxShadow: "0 0 30px rgba(16, 185, 129, 0.35)" }}
                    >
                        View My Work
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                        href="#contact"
                        className="flex items-center gap-3 px-8 py-3.5 border border-white/20 text-white/80 font-semibold text-sm tracking-wide hover:border-emerald-500/60 hover:text-emerald-400 transition-all rounded"
                    >
                        Get In Touch
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="font-mono text-xs text-white/30 tracking-widest uppercase">scroll</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-4 h-4 text-white/30" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Social links — fixed left */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute left-6 bottom-12 hidden lg:flex flex-col items-center gap-4"
            >
                {[
                    { href: PORTFOLIO_DATA.profile.github, icon: Github, label: "GitHub" },
                    { href: PORTFOLIO_DATA.profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: `mailto:${PORTFOLIO_DATA.profile.email}`, icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                        <Icon className="w-4.5 h-4.5" />
                    </a>
                ))}
                <div className="w-px h-16 bg-linear-to-b from-zinc-600 to-transparent mt-2" />
            </motion.div>
        </section>
    );
}

/* ─────────────────────────── about ─────────────────────────── */

function About() {
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);

    const identityStatements = [
        "I build interfaces.",
        "I think in systems.",
        "I care how things feel."
    ];

    const philosophyCards = [
        {
            icon: Code2,
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
            icon: Layers,
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
            icon: Zap,
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
        <section id="about" className="py-28 md:py-36 px-8 md:px-16 w-full flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <FadeUp className="mb-16">
                    <SectionLabel>About</SectionLabel>
                </FadeUp>

                {/* Scene 1.2 - Identity Reveal */}
                <div className="grid md:grid-cols-2 gap-16 mb-32">
                    {/* Left: Identity statements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
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
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)"
                                            }}
                                            viewport={{ once: true, margin: "-100px" }}
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
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
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
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
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
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="relative bg-zinc-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-6 max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(16,185,129,0.1)]"
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
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
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
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
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
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
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
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.6, duration: 0.4 }}
                                    className="flex gap-3 pl-6"
                                >
                                    <span className="text-zinc-600">4</span>
                                    <span className="text-blue-300">status:</span>
                                    <span className="text-green-300">&quot;Shipping&quot;</span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
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
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="grid md:grid-cols-3 gap-8 mt-12 md:mt-16"
                >
                    {philosophyCards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -40 : 40
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: 1.2 + (index * 0.2),
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                            className="p-8 bg-zinc-900/30 backdrop-blur border border-emerald-500/20 rounded-lg group hover:border-emerald-400/50 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.05)]"
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
            </div>
        </section>
    );
}

/* ─────────────────────────── skills ─────────────────────────── */

function Skills() {
    const categories = [
        { label: "Frontend", color: "emerald", icon: Code2, skills: PORTFOLIO_DATA.skills.frontend },
        { label: "Backend", color: "purple", icon: Layers, skills: PORTFOLIO_DATA.skills.backend },
        { label: "Tooling", color: "cyan", icon: Zap, skills: PORTFOLIO_DATA.skills.tools },
        {
            label: "Currently Learning",
            color: "pink",
            icon: Terminal,
            skills: ["AI", "Machine Learning", "DevOps", "Cloud Computing", "Data Structures", "Algorithms"],
        },
    ];

    const colorMap: Record<string, string> = {
        emerald: "border-emerald-500/25 bg-emerald-500/8 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.2)]",
        purple: "border-purple-500/25 bg-purple-500/8 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.2)]",
        cyan: "border-cyan-500/25 bg-cyan-500/8 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.2)]",
        pink: "border-pink-500/25 bg-pink-500/8 text-pink-300 shadow-[0_0_8px_rgba(236,72,153,0.2)]",
    };

    // Safelisting classes via explicit map so Tailwind compiler doesn't miss dynamically constructed ones
    const cardStyleMap: Record<string, { bg: string, text: string, hoverBorder: string, glow: string, accent: string }> = {
        emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", hoverBorder: "hover:border-emerald-400/50", glow: "rgba(16,185,129,0.5)", accent: "from-emerald-400" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", hoverBorder: "hover:border-purple-400/50", glow: "rgba(168,85,247,0.5)", accent: "from-purple-400" },
        cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", hoverBorder: "hover:border-cyan-400/50", glow: "rgba(6,182,212,0.5)", accent: "from-cyan-400" },
        pink: { bg: "bg-pink-500/10", text: "text-pink-400", hoverBorder: "hover:border-pink-400/50", glow: "rgba(236,72,153,0.5)", accent: "from-pink-400" },
    };

    return (
        <section id="skills" className="py-28 md:py-36 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <FadeUp className="mb-16">
                    <SectionLabel>Skills</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                        Capabilities earned,
                        {/* <br /> */}
                        <span className="text-zinc-500"> &nbsp;not claimed.</span>
                    </h2>
                </FadeUp>

                <div className="grid md:grid-cols-2 gap-6">
                    {categories.map((module, ci) => {
                        const Icon = module.icon;
                        const style = cardStyleMap[module.color];

                        return (
                            <FadeUp key={module.label} delay={ci * 0.1}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className={`relative bg-zinc-900/30 backdrop-blur border border-zinc-800 rounded-lg p-6 cursor-default ${style.hoverBorder} transition-colors overflow-hidden group`}
                                    style={{
                                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.03)"
                                    }}
                                >
                                    {/* Accent border animation */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${style.accent} to-transparent origin-left`}
                                        style={{
                                            boxShadow: `0 0 15px ${style.glow}`
                                        }}
                                    />

                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 ${style.bg} rounded-lg`}>
                                            <Icon className={`w-6 h-6 ${style.text}`} />
                                        </div>
                                        <div>
                                            <LockOpen className={`w-5 h-5 ${style.text} opacity-60`} />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-semibold text-white mb-2">
                                        {module.label}
                                    </h3>

                                    <p className="text-zinc-400 text-sm mb-4">
                                        {module.skills.length} capabilities unlocked
                                    </p>

                                    <div className="overflow-visible">
                                        <div className="pt-4 border-t border-zinc-800 mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {module.skills.map((skill, i) => (
                                                    <motion.span
                                                        key={skill}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: ci * 0.05 + i * 0.05, duration: 0.3 }}
                                                        className={`px-3 py-1 rounded-full border text-xs font-mono ${colorMap[module.color]}`}
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </FadeUp>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────── projects ─────────────────────────── */

const PROJECTS = [
    {
        id: "p1",
        num: "01",
        title: "CryptoX",
        subtitle: "Crypto Education Platform",
        desc: "A comprehensive crypto education platform with 200+ lessons, real-time market data, and interactive quizzes — serving 50k+ active users.",
        stack: ["React", "JavaScript", "Tailwind CSS", "CoinGecko API"],
        link: "https://crypto-x-virid.vercel.app/",
        github: "https://github.com/Abhra0404/CryptoX",
        accent: "emerald",
    },
    {
        id: "p2",
        num: "02",
        title: "Kaizen",
        subtitle: "Student Productivity Dashboard",
        desc: "A unified productivity hub for students. Streak-based habit tracking, DSA visualizations, and project management — all in one clean interface.",
        stack: ["React", "TypeScript", "Charts.js", "Tailwind CSS"],
        link: "https://kaizen-phi-five.vercel.app/",
        github: "https://github.com/Abhra0404/Kaizen",
        accent: "purple",
    },
    {
        id: "p3",
        num: "03",
        title: "This Portfolio",
        subtitle: "Story-driven Developer Portfolio",
        desc: "A Netflix-style interactive story portfolio with cinematic transitions, scroll-driven narrative, and 100/100 Lighthouse score.",
        stack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
        github: "https://github.com/Abhra0404/portfolio",
        accent: "cyan",
    },
];

const accentBorder: Record<string, string> = {
    emerald: "group-hover:border-emerald-500/50",
    purple: "group-hover:border-purple-500/50",
    cyan: "group-hover:border-cyan-500/50",
};
const accentText: Record<string, string> = {
    emerald: "text-emerald-400",
    purple: "text-purple-400",
    cyan: "text-cyan-400",
};
const accentGlow: Record<string, string> = {
    emerald: "rgba(16,185,129,0.08)",
    purple: "rgba(168,85,247,0.08)",
    cyan: "rgba(6,182,212,0.08)",
};

function Projects() {
    return (
        <section id="projects" className="py-28 md:py-36 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <FadeUp className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <SectionLabel>Projects</SectionLabel>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                            Things I&apos;ve shipped.
                        </h2>
                    </div>
                    <a
                        href="https://github.com/Abhra0404"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors font-mono text-sm"
                    >
                        <Github className="w-4 h-4" /> All on GitHub
                    </a>
                </FadeUp>

                <div className="grid md:grid-cols-3 gap-6">
                    {PROJECTS.map((p, i) => (
                        <FadeUp key={p.id} delay={i * 0.1}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.25 }}
                                className={`group relative h-full flex flex-col p-7 bg-zinc-900/30 border border-white/8 rounded-xl transition-all duration-300 overflow-hidden ${accentBorder[p.accent]}`}
                                style={{ boxShadow: `0 0 0 0 ${accentGlow[p.accent]}` }}
                                whileInView={{ boxShadow: `0 20px 60px -20px ${accentGlow[p.accent]}` }}
                                viewport={{ once: true }}
                            >
                                {/* number */}
                                <span className={`font-mono text-xs ${accentText[p.accent]} mb-4`}>
                                    {p.num}
                                </span>

                                <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{p.title}</h3>
                                <p className={`font-mono text-xs ${accentText[p.accent]} mb-4`}>{p.subtitle}</p>
                                <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-6">{p.desc}</p>

                                {/* Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {p.stack.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-0.5 bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-mono rounded"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4 pt-4 border-t border-white/6">
                                    {p.github && (
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-zinc-500 hover:text-emerald-400 transition-colors text-xs font-mono"
                                        >
                                            <Github className="w-3.5 h-3.5" /> Source
                                        </a>
                                    )}
                                    {p.link && (
                                        <a
                                            href={p.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-zinc-500 hover:text-emerald-400 transition-colors text-xs font-mono"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" /> Live
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────── contact ─────────────────────────── */

function Contact() {
    const [copied, setCopied] = useState(false);
    const email = PORTFOLIO_DATA.profile.email;

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-28 md:py-36 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
                <FadeUp className="mb-16 text-center">
                    <SectionLabel rightLine>Contact</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        Let&apos;s build something.
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        Got an idea? Need a developer who thinks in systems and ships fast?
                        I&apos;m open to interesting projects and collaborations.
                    </p>
                </FadeUp>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Info */}
                    <FadeUp delay={0.1} className="space-y-6">
                        {[
                            { icon: Zap, label: "Status", value: "Available for work", highlight: false },
                            { icon: Clock, label: "Response", value: "Within 24 hours", highlight: false },
                            { icon: MapPin, label: "Location", value: "Remote / India", highlight: false },
                        ].map(({ icon: Icon, label, value, highlight }) => (
                            <div
                                key={label}
                                className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-white/8 rounded-xl"
                            >
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <Icon className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">{label}</p>
                                    <p className={`text-sm font-semibold ${highlight ? "text-emerald-400" : "text-zinc-200"}`}>
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="flex gap-3 pt-2">
                            {[
                                { href: PORTFOLIO_DATA.profile.github, icon: Github, label: "GitHub" },
                                { href: PORTFOLIO_DATA.profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                            ].map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/40 border border-white/8 rounded-lg text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-sm font-mono"
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </a>
                            ))}
                            <a
                                href={PORTFOLIO_DATA.profile.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/40 border border-white/8 rounded-lg text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-sm font-mono"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                Instagram
                            </a>
                        </div>
                    </FadeUp>

                    {/* Note card */}
                    <FadeUp delay={0.15}>
                        <div
                            className="relative bg-zinc-900/30 border border-white/8 rounded-xl p-7 overflow-hidden"
                            style={{ boxShadow: "0 0 40px rgba(16,185,129,0.05)" }}
                        >
                            {/* Subtle top glow line */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />

                            <p className="text-zinc-300 text-lg leading-relaxed mb-7">
                                Currently accepting new challenges in{" "}
                                <span className="font-semibold text-white">Full Stack Development</span>,{" "}
                                <span className="font-semibold text-white">UI Engineering</span>, and{" "}
                                <span className="font-semibold text-white">Open Source</span>.
                            </p>

                            {/* Email row */}
                            <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-black/30 border border-white/8 rounded-lg mb-4 font-mono">
                                <div className="flex items-center gap-3 min-w-0">
                                    <Mail className="w-4 h-4 text-emerald-400/70 shrink-0" />
                                    <span className="text-zinc-400 text-sm truncate">{email}</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="shrink-0 p-1.5 rounded-md text-zinc-600 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                                    aria-label="Copy email"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* CTA */}
                            <a
                                href={`mailto:${email}`}
                                className="group flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 text-black font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-emerald-400 transition-colors"
                                style={{ boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
                            >
                                Send Message
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────── footer ─────────────────────────── */

function Footer() {
    return (
        <footer className="px-6 md:px-12 py-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-mono text-xs text-zinc-600">
                    © {new Date().getFullYear()} Abhra · Designed &amp; built with intent
                </p>
                <div className="flex items-center gap-1 font-mono text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 inline-block" />
                    All systems operational
                </div>
            </div>
        </footer>
    );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white relative">
            {/* Background grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="relative z-10">
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </div>
        </div>
    );
}
