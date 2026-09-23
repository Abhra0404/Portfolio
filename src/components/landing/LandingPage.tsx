"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    ArrowUpRight,
    CalendarDays,
    Clock3,
    Code2,
    Layers,
    Zap,
    Terminal,
    Menu,
    Copy,
    Check,
    ArrowRight,
    Globe,
    MapPin,
    Send,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import Image from "next/image";

/* ─────────────────────────── Interactive Mouse Spotlight Hook ─────────────────────────── */

function useMouseSpotlight() {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty("--mouse-x", `${x}px`);
        containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return { containerRef, handleMouseMove };
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function SectionLabel({ children, rightLine = false }: { children: React.ReactNode; rightLine?: boolean }) {
    return (
        <span className="inline-flex items-center gap-2.5 text-zinc-400 font-mono text-[11px] tracking-[0.25em] uppercase mb-4">
            <span className="w-4 h-px bg-white/30" />
            <span className="text-white font-medium">{children}</span>
            {rightLine && <span className="w-4 h-px bg-white/30" />}
        </span>
    );
}

/* ─────────────────────────── nav ─────────────────────────── */

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Blog", href: "#blog" },
    ];

    return (
        <header className="synaptrove-navbar sticky top-0 z-50 w-full">
            <div className={`synaptrove-navbar-wrapper ${scrolled ? "is-scrolled" : ""}`}>
                <motion.nav
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className={`synaptrove-navbar-inner ${scrolled ? "is-scrolled" : ""}`}
                >
                    <a href="#" className="synaptrove-navbar-brand" data-nav-item>
                        <span className="synaptrove-navbar-icon-tile">
                            <Terminal className="synaptrove-navbar-icon" aria-hidden="true" />
                        </span>
                        <span className="synaptrove-navbar-wordmark">abhra.dev</span>
                    </a>

                    <div className="synaptrove-navbar-actions" data-nav-item>
                        <div className="synaptrove-navbar-links">
                            {links.map((link) => (
                                <a key={link.name} href={link.href} className="synaptrove-navbar-link">
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        <a
                            href="#contact"
                            className="synaptrove-navbar-github"
                            aria-label="Contact"
                        >
                            <ArrowUpRight aria-hidden="true" />
                        </a>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="synaptrove-navbar-menu"
                            aria-label="Open menu"
                            aria-expanded={mobileOpen}
                        >
                            <Menu aria-hidden="true" />
                        </button>
                    </div>
                </motion.nav>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="synaptrove-mobile-nav md:hidden"
                    >
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="synaptrove-mobile-nav-link"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setMobileOpen(false)}
                            className="synaptrove-mobile-nav-link synaptrove-mobile-nav-cta"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

/* ─────────────────────────── hero ─────────────────────────── */

function Hero() {
    const { containerRef, handleMouseMove } = useMouseSpotlight();

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="monochrome-spotlight relative min-h-[calc(100vh-72px)] flex flex-col justify-center pt-0 pb-12 px-4 sm:px-6 md:px-12 overflow-hidden"
        >
            <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-20 items-center relative z-10">
                <div className="flex flex-col items-start text-left">
                    <motion.p
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hero-kicker"
                    >
                        Abhra Jaiswal / engineer in public
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mt-5 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[0.98]"
                    >
                        Software with
                        <br />
                        <span className="text-silver-accent">a pulse.</span>
                    </motion.h1>

                    {/* Mission Bio */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-10 font-normal"
                    >
                        I design the invisible machinery behind ambitious products: resilient systems, intelligent interfaces, and AI that earns its place in the room.
                    </motion.p>

                    {/* Interactive Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
                    >
                        <a href="#projects" className="hero-primary-action group">
                            Enter the work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <span className="hero-scroll-note">Scroll to inspect the machine ↓</span>
                    </motion.div>

                    <div className="hero-signal-line" aria-hidden="true">
                        <span>FULL STACK</span><i /> <span>SYSTEMS</span><i /> <span>AI</span><i /> <span>BUILD / BREAK / REPEAT</span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
                >
                    <div className="hero-portrait-frame relative aspect-square overflow-hidden border border-white/20 bg-zinc-900 p-2 sm:p-3">
                        <Image
                            src="/bead-pattern.png"
                            alt="Pixel-art portrait of Abhra Jaiswal"
                            fill
                            priority
                            sizes="(max-width: 1024px) 80vw, 42vw"
                            className="object-cover object-center pixel-art-image"
                        />
                        <div className="absolute left-4 top-4 border-l-2 border-t-2 border-white/60 w-8 h-8 pointer-events-none" />
                        <div className="absolute right-4 bottom-4 border-r-2 border-b-2 border-white/60 w-8 h-8 pointer-events-none" />
                    </div>
                    <div className="absolute -left-3 sm:-left-6 top-8 px-2.5 py-1 bg-white text-black font-mono text-[10px] uppercase tracking-widest border border-black/10">
                        avatar.exe / online
                    </div>
                    <div className="absolute -right-2 sm:-right-5 bottom-8 px-2.5 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-widest border border-white/20">
                        16-bit / 2026
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────── about & interactive terminal ─────────────────────────── */

const TERMINAL_SNIPPETS: Record<string, { filename: string; language: string; code: string }> = {
    engineer: {
        filename: "Engineer.ts",
        language: "typescript",
        code: `interface SystemEngineer {
    name: "Abhra Jaiswal";
    discipline: "Full Stack & Distributed Systems";
    specializations: [
        "High-Concurrency Backends",
        "Multi-Modal Deep Learning",
        "Agentic RAG Workflows"
    ];
    status: "Designing & Shipping Production Systems";
    metrics: {
        uptimeTarget: 0.9999;
        codeCraft: "Intent-First";
    };
}`,
    },
    concurrency: {
        filename: "ReservationLock.sql",
        language: "sql",
        code: `-- Concurrency-Safe Seat Hold with Row Locking
BEGIN;
SELECT seat_id, status 
FROM event_seats 
WHERE seat_id = $1 AND event_id = $2
FOR UPDATE;

UPDATE event_seats 
SET status = 'HELD', held_until = NOW() + INTERVAL '10 minutes'
WHERE seat_id = $1;

INSERT INTO transactional_outbox (event_type, payload)
VALUES ('SEAT_HELD', json_build_object('seatId', $1));
COMMIT;`,
    },
    graphrag: {
        filename: "MultiHopReasoning.py",
        language: "python",
        code: `def execute_hybrid_retrieval(query: str) -> GroundedAnswer:
    # 1. Dense Semantic Vector Search via Qdrant
    vector_evidence = qdrant_client.search(collection="docs", query=query)
    
    # 2. Multi-Hop Graph Traversal via Neo4j Cypher
    graph_evidence = neo4j_session.run(
        "MATCH (c:Concept)-[r:CORRELATES]->(t:Target) RETURN r"
    )
    
    # 3. Topological Fusion & Evidence Synthesis
    return synthesize_with_citations(vector_evidence, graph_evidence)`,
    },
};

function About() {
    const [activeSnippet, setActiveSnippet] = useState<"engineer" | "concurrency" | "graphrag">("engineer");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(TERMINAL_SNIPPETS[activeSnippet].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="about" className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            <FadeUp>
                <SectionLabel>About &bull; Technical Philosophy</SectionLabel>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                    Architected for reliability.
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-12">
                    I treat software engineering as an exact craft: analyzing edge cases before writing code,
                    ensuring transaction integrity under load, and designing systems that remain predictable at scale.
                </p>
            </FadeUp>

            {/* Interactive Terminal / Code Workbench */}
            <FadeUp delay={0.1}>
                <div className="warm-panel rounded-2xl border border-white/12 bg-[#09090b] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-14">
                    {/* Terminal Tab Bar */}
                    <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/[0.02]">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="ml-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                                System Inspector
                            </span>
                        </div>

                        {/* Snippet Switcher Tabs */}
                        <div className="flex items-center gap-1 font-mono text-xs">
                            {(["engineer", "concurrency", "graphrag"] as const).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveSnippet(key)}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        activeSnippet === key
                                            ? "bg-white/10 text-white font-semibold"
                                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                                    }`}
                                >
                                    {TERMINAL_SNIPPETS[key].filename}
                                </button>
                            ))}

                            <button
                                onClick={handleCopy}
                                className="ml-2 p-1.5 rounded-md border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                                title="Copy snippet"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </div>

                    {/* Code Display Area */}
                    <div className="p-5 sm:p-7 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-x-auto bg-[#050505]">
                        <pre>
                            <code>{TERMINAL_SNIPPETS[activeSnippet].code}</code>
                        </pre>
                    </div>

                    {/* Terminal Footer Info */}
                    <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/8 bg-white/[0.015] font-mono text-[11px] text-zinc-500">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" /> UTF-8
                        </span>
                        <span>{TERMINAL_SNIPPETS[activeSnippet].language.toUpperCase()}</span>
                    </div>
                </div>
            </FadeUp>

            {/* Philosophy Triad Cards */}
            <div id="philosophy" className="grid sm:grid-cols-3 gap-5">
                {[
                    {
                        icon: Code2,
                        number: "01",
                        title: "How I Think",
                        tag: "Architecture First",
                        desc: "I analyze failure modes and concurrency constraints before writing a single line. Every component must justify its necessity.",
                    },
                    {
                        icon: Layers,
                        number: "02",
                        title: "How I Build",
                        tag: "Predictable State",
                        desc: "Explicit contracts, atomic database transactions, robust typing, and decoupled queues over implicit magic.",
                    },
                    {
                        icon: Zap,
                        number: "03",
                        title: "How I Ship",
                        tag: "Measured Velocity",
                        desc: "Shipping verified systems with observability, automated load testing, and clean instrumentation to track real impact.",
                    },
                ].map((item, i) => (
                    <FadeUp key={item.number} delay={i * 0.1}>
                        <div className="monochrome-glass-card rounded-xl p-5 sm:p-6 h-full flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-xs text-zinc-500">{item.number}</span>
                                    <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/4 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white tracking-tight mb-1">{item.title}</h3>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-3">{item.tag}</p>
                                <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">{item.desc}</p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-white/6 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                                <span>Discipline</span>
                                <span className="text-zinc-400 group-hover:text-white transition-colors">&rarr;</span>
                            </div>
                        </div>
                    </FadeUp>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────── skills ─────────────────────────── */

const SKILL_CATEGORIES = [
    { id: "web", label: "Web & Full Stack", short: "WEB" },
    { id: "devops", label: "DevOps & Systems", short: "OPS" },
    { id: "ai", label: "AI & Machine Learning", short: "AI" },
    { id: "core", label: "Core Fundamentals", short: "CORE" },
] as const;

type SkillCategory = (typeof SKILL_CATEGORIES)[number]["id"];

const SKILLS_DATA: Record<SkillCategory, string[]> = {
    web: PORTFOLIO_DATA.skills.webDevelopment,
    devops: PORTFOLIO_DATA.skills.devops,
    ai: PORTFOLIO_DATA.skills.aiMl,
    core: PORTFOLIO_DATA.skills.others,
};

const SKILL_MARKS: Record<string, string> = {
    React: "R",
    "Next.js": "N",
    TypeScript: "TS",
    "Tailwind CSS": "TW",
    "Node.js": "N",
    ExpressJS: "EX",
    MongoDB: "M",
    PostgreSQL: "PG",
    Supabase: "SB",
    AWS: "AWS",
    Linux: "LX",
    Docker: "DK",
    Kubernetes: "K8S",
    "CI/CD": "CI",
    "Github Actions": "GA",
    Prometheus: "PM",
    Grafana: "GF",
    "Data Analytics": "DA",
    "Machine Learning": "ML",
    "Deep Learning": "DL",
    TensorFlow: "TF",
    GenAI: "GAI",
    LLMs: "LLM",
    LangChain: "LC",
    LangGraph: "LG",
    "Agentic AI": "AI",
    DSA: "DS",
    Git: "G",
    GitHub: "GH",
    OOPs: "OO",
    DBMS: "DB",
    Deployment: "DEP",
    "System Design": "SD",
};

function Skills() {
    return (
        <section id="skills" className="skills-wall py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            <FadeUp className="mb-12">
                <SectionLabel>Competencies &bull; Technical Stack</SectionLabel>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                    The tools behind the work.
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                    A monochrome map of the languages, platforms, and ideas I use to turn ambitious systems into dependable products.
                </p>
            </FadeUp>

            <div className="skills-wall-grid">
                {SKILL_CATEGORIES.map((category, categoryIndex) => (
                    <FadeUp key={category.id} delay={categoryIndex * 0.08} className="skills-cluster">
                        <div className="skills-cluster-heading">
                            <span className="skills-cluster-index">0{categoryIndex + 1}</span>
                            <div>
                                <span className="skills-cluster-short">{category.short}</span>
                                <h3>{category.label}</h3>
                            </div>
                            <span className="skills-cluster-count">{SKILLS_DATA[category.id].length} tools</span>
                        </div>
                        <div className="skills-logo-grid">
                            {SKILLS_DATA[category.id].map((skill) => (
                                <div className="skill-logo-item" key={skill} tabIndex={0}>
                                    <span className="skill-logo-mark" aria-hidden="true">{SKILL_MARKS[skill]}</span>
                                    <span className="skill-logo-name">{skill}</span>
                                    <span className="skill-logo-arrow" aria-hidden="true">&nearr;</span>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────── projects ─────────────────────────── */

type ProjectCategory = "all" | "systems" | "ai" | "fullstack";

interface ProjectItem {
    id: string;
    num: string;
    badge: string;
    category: "systems" | "ai" | "fullstack";
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    stack: string[];
    highlights: string[];
    link: string;
    github: string;
}

const PROJECTS: ProjectItem[] = [
    {
        id: "p1",
        num: "01",
        badge: "Backend & Systems",
        category: "systems",
        title: "High-Traffic Ticket Reservation System",
        subtitle: "Concurrency-Safe Booking Engine",
        desc: "A production-oriented reservation backend built to handle high concurrency and sudden spikes while maintaining strict inventory consistency.",
        image: "",
        stack: ["Node.js", "Express", "PostgreSQL", "Redis", "BullMQ", "Drizzle ORM", "Docker", "Prometheus"],
        highlights: [
            "Prevents double-booking under extreme contention via PostgreSQL row-level locks and transactional isolation.",
            "Redis seat availability caching with cache-stampede protection, improving p95 latency by ~36%.",
            "Implemented the Transactional Outbox pattern with BullMQ delayed queues for automated 10-minute hold expiration.",
            "Engineered with Prometheus observability, structured request tracing, and validated under 1,000+ VU k6 load tests.",
        ],
        link: "",
        github: "https://github.com/Abhra0404/High-Traffic-Ticket-Reservation-System",
    },
    {
        id: "p2",
        num: "02",
        badge: "Distributed Compute",
        category: "systems",
        title: "Distributed Job Processing Platform",
        subtitle: "Asynchronous Workload Infrastructure",
        desc: "A distributed job orchestration platform for submitting, scheduling, executing, and monitoring computational tasks across independent worker pools.",
        image: "",
        stack: ["Node.js", "TypeScript", "Express", "PostgreSQL", "Redis", "BullMQ", "Drizzle ORM", "Docker"],
        highlights: [
            "Decouples API ingress from background execution using Redis-backed BullMQ queues and persistent PostgreSQL state.",
            "Supports horizontal worker scaling across compute workloads (matrices, primes, fibonacci) with graceful shutdown.",
            "End-to-end job lifecycle tracking with pagination, status queries, queued job cancellation, and runtime Zod validation.",
            "Containerized multi-service infrastructure with automated health and dependency readiness probes.",
        ],
        link: "",
        github: "https://github.com/Abhra0404/Distributed-Job-Processing-Platform",
    },
    {
        id: "p3",
        num: "03",
        badge: "Medical AI & Vision",
        category: "ai",
        title: "Multimodal 3D Brain Tumor MRI Segmentation",
        subtitle: "Deep Learning Volumetric Segmentation",
        desc: "3D brain tumor MRI segmentation using multimodal T1, T1-contrast, T2, and T2-FLAIR scans with PyTorch and MONAI, built on the BraTS-GLI dataset.",
        image: "/brain.png",
        stack: ["Python", "PyTorch", "MONAI", "NumPy", "Nibabel", "BraTS-GLI", "Matplotlib"],
        highlights: [
            "Trained and benchmarked 2D, 2.5D, and 3D U-Net architectures for voxel-level glioma sub-region segmentation.",
            "Achieved 0.8508 tumor-slice Dice and 0.9277 pixel Dice with a strict patient-level split preventing data leakage.",
            "Engineered 3D volumetric preprocessing: skull-stripped NIfTI ingestion, intensity normalization, and tumor-aware cropping.",
            "Shipped an interactive slice prediction visualization dashboard hosted on GitHub Pages.",
        ],
        link: "https://abhra0404.github.io/Multimodal-3D-Brain-Tumor-MRI-Segmentation/",
        github: "https://github.com/Abhra0404/Multimodal-3D-Brain-Tumor-MRI-Segmentation",
    },
    {
        id: "p4",
        num: "04",
        badge: "Agentic AI",
        category: "ai",
        title: "Axiom",
        subtitle: "Autonomous AI Research & Verification System",
        desc: "An autonomous AI research system that plans investigations, gathers and evaluates sources, extracts evidence, analyzes claim relationships, and synthesizes structured reports.",
        image: "",
        stack: ["Python", "FastAPI", "LangChain", "LLMs", "Multi-Agent", "Vector Search", "Docker"],
        highlights: [
            "Multi-stage research pipeline orchestrating query planning, source search, and automated claim extraction.",
            "Analyzes claim relationships across sources to identify duplicate, supporting, and contradictory arguments.",
            "Critic agent feedback loop detecting knowledge gaps and triggering targeted follow-up search before report synthesis.",
            "Source ranking engine combining relevance (70%) with publisher authority and quality scoring (30%).",
        ],
        link: "",
        github: "https://github.com/Abhra0404/Axiom--Autonomous-AI-Research-System",
    },
    {
        id: "p5",
        num: "05",
        badge: "Full Stack & EdTech",
        category: "fullstack",
        title: "Epoch",
        subtitle: "Developer AI/ML Learning Platform",
        desc: "A developer-focused AI/ML learning platform connecting structured notes, learning roadmaps, interactive experimentation, interview prep, and research.",
        image: "/epoch.png",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Prisma", "PostgreSQL", "Vercel"],
        highlights: [
            "Curated curriculum progressing from mathematical intuition to deep learning, transformers, and research papers.",
            "Role-based learning roadmaps (ML Engineer, LLM Engineer, AI Researcher, MLOps) with concept prerequisites.",
            "Interactive browser playground for hands-on algorithm experimentation, hyperparameter tuning, and model visualization.",
            "Full-stack Next.js web application with a minimal dark developer aesthetic, deployed on Vercel.",
        ],
        link: "https://epoch-learn.vercel.app",
        github: "https://github.com/Abhra0404/Epoch",
    },
    {
        id: "p6",
        num: "06",
        badge: "Graph AI & RAG",
        category: "ai",
        title: "GraphRAG",
        subtitle: "Multi-Hop Knowledge Reasoning Engine",
        desc: "A hybrid Retrieval-Augmented Generation system combining semantic vector retrieval, Neo4j knowledge graphs, and multi-hop reasoning for grounded answers.",
        image: "",
        stack: ["Python", "FastAPI", "Neo4j", "Qdrant", "Ollama", "PostgreSQL", "PyMuPDF", "Docker"],
        highlights: [
            "Combines Qdrant vector search with Neo4j graph traversal for hybrid semantic and topological evidence retrieval.",
            "Achieved 99% exact-path recall on multi-hop benchmarks compared with 51% for vanilla vector RAG baselines.",
            "Automated entity and relationship extraction from technical documents with source citation provenance using local LLMs.",
            "Containerized multi-database stack (PostgreSQL, Neo4j, Qdrant) accessible through high-performance FastAPI endpoints.",
        ],
        link: "",
        github: "https://github.com/Abhra0404/GraphRAG--Multi-Hop-Knowledge-Reasoning-Engine",
    },
];

const PROJECT_FILTERS: { id: ProjectCategory; label: string }[] = [
    { id: "all", label: "All Projects (6)" },
    { id: "systems", label: "Systems & Backend (2)" },
    { id: "ai", label: "AI & Deep Learning (3)" },
    { id: "fullstack", label: "Full Stack (1)" },
];

function Projects() {
    const [filter, setFilter] = useState<ProjectCategory>("all");

    const filteredProjects = useMemo(() => {
        if (filter === "all") return PROJECTS;
        return PROJECTS.filter((p) => p.category === filter);
    }, [filter]);

    return (
        <section id="projects" className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            <FadeUp className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <SectionLabel>Selected Work &bull; Production Systems</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
                        Featured engineering.
                    </h2>
                </div>
                <a
                    href="https://github.com/Abhra0404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-wider"
                >
                    <Github className="w-4 h-4" /> All Repositories on GitHub &rarr;
                </a>
            </FadeUp>

            {/* Interactive Project Filter Tabs */}
            <FadeUp delay={0.1} className="mb-8 flex flex-wrap gap-2">
                {PROJECT_FILTERS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all ${
                            filter === tab.id
                                ? "bg-white text-black font-semibold shadow-md"
                                : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/25"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </FadeUp>

            {/* Projects Grid */}
            <motion.div layout className="grid md:grid-cols-2 gap-5 sm:gap-6">
                <AnimatePresence>
                    {filteredProjects.map((p, i) => (
                        <motion.div
                            key={p.id}
                            layout
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            whileHover={{ y: -4 }}
                            className="warm-panel group flex flex-col h-full rounded-2xl border border-white/10 hover:border-white/25 bg-[#09090b]/80 hover:bg-[#0c0c0e] overflow-hidden transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                        >
                            {/* Project Image / Tech Preview Header */}
                            <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 flex-shrink-0 border-b border-white/6">
                                {p.image ? (
                                    <Image
                                        src={p.image}
                                        alt={`${p.title} preview`}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-105 group-hover:grayscale-0"
                                    />
                                ) : (
                                    <div className="w-full h-full relative flex flex-col justify-between p-4 bg-zinc-900">
                                        {/* Top window dots & badge */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 opacity-40">
                                                <span className="w-2 h-2 rounded-full bg-white/40" />
                                                <span className="w-2 h-2 rounded-full bg-white/40" />
                                                <span className="w-2 h-2 rounded-full bg-white/40" />
                                            </div>
                                            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-white/8 bg-white/3 text-zinc-300">
                                                {p.num} &bull; {p.badge}
                                            </span>
                                        </div>

                                        {/* Center icon & project title */}
                                        <div className="my-auto py-2 flex flex-col items-center justify-center text-center px-4">
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2 border border-white/10 bg-white/4 transition-transform group-hover:scale-110 duration-300 text-white">
                                                <Terminal className="w-4 h-4" />
                                            </div>
                                            <span className="text-white font-bold text-sm sm:text-base tracking-tight line-clamp-1">{p.title}</span>
                                            <span className="text-zinc-500 font-mono text-[11px] mt-0.5 line-clamp-1">{p.subtitle}</span>
                                        </div>

                                        {/* Bottom bar indicator */}
                                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                github.com/Abhra0404
                                            </span>
                                            <span className="opacity-60">{p.stack[0]} &bull; {p.stack[1]}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="flex flex-col flex-1 p-5 sm:p-6">
                                {/* Title */}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                                        {p.title}
                                    </h3>
                                    <span className="font-mono text-xs text-zinc-500 flex-shrink-0">{p.num}</span>
                                </div>
                                <p className="font-medium text-xs font-mono text-zinc-400 mb-4">{p.subtitle}</p>

                                {/* Highlights as bullet points */}
                                <ul className="space-y-2 mb-5 flex-1">
                                    {p.highlights.map((point) => (
                                        <li key={point} className="flex items-start gap-2.5 text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0 bg-white/60" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {p.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 bg-white/[0.04] border border-white/8 text-zinc-300 text-[10px] font-mono rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4 pt-3.5 border-t border-white/8 text-xs font-medium">
                                    {p.link && (
                                        <a
                                            href={p.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors"
                                        >
                                            Live Demo <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                    {p.github && (
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                                        >
                                            GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

/* ─────────────────────────── medium notes ─────────────────────────── */

const BLOG_POSTS = [
    {
        title: "Behind the Scenes of Ride Booking: A System Design Deep Dive",
        excerpt: "What happens after you tap Book Ride? A practical look at the distributed architecture behind modern ride-hailing systems.",
        date: "Mar 19, 2026",
        tag: "System Design",
        image: "/blog1.jpeg",
    },
    {
        title: "RAG: A System Design Perspective (Not a Buzzword)",
        excerpt: "RAG is more than prompt engineering. It is a distributed data pipeline problem wrapped in an LLM interface.",
        date: "Mar 30, 2026",
        tag: "AI Systems",
        image: "/blog2.png",
    },
];

function BlogSection() {
    const mediumProfile = "https://medium.com/@abhra0404";

    return (
        <section id="blog" className="blog-section py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            <FadeUp className="blog-section-heading">
                <div>
                    <SectionLabel>Notes &bull; Medium</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">Ideas in public.</h2>
                    <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
                        Field notes on systems, AI, and the engineering decisions hiding underneath polished products.
                    </p>
                </div>
                <a href={mediumProfile} target="_blank" rel="noopener noreferrer" className="blog-medium-link">
                    Read on Medium <ArrowUpRight />
                </a>
            </FadeUp>

            <div className="blog-post-grid">
                {BLOG_POSTS.map((post, index) => (
                    <FadeUp key={post.title} delay={index * 0.1}>
                        <a href={mediumProfile} target="_blank" rel="noopener noreferrer" className="blog-post-card">
                            <div className="blog-post-image">
                                <Image src={post.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                                <span className="blog-post-tag">{post.tag}</span>
                            </div>
                            <div className="blog-post-body">
                                <div className="blog-post-date"><CalendarDays /> {post.date}</div>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <span className="blog-post-read">Read article <ArrowUpRight /></span>
                            </div>
                        </a>
                    </FadeUp>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────── contact & interactive matrix ─────────────────────────── */

function Contact() {
    const [copied, setCopied] = useState(false);
    const email = PORTFOLIO_DATA.profile.email;

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        { name: "GitHub", href: PORTFOLIO_DATA.profile.github, icon: Github, handle: "Abhra0404" },
        { name: "LinkedIn", href: PORTFOLIO_DATA.profile.linkedin, icon: Linkedin, handle: "in/abhra0404" },
        { name: "X / Twitter", href: PORTFOLIO_DATA.profile.x, icon: Globe, handle: "@Abhra0404" },
    ];

    return (
        <section id="contact" className="contact-section py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            <div className="contact-layout">
                <FadeUp className="contact-intro">
                    <SectionLabel>Open Channel &bull; Let&apos;s Talk</SectionLabel>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter mb-5">
                        Have a hard problem?
                        <br />
                        <span className="text-silver-accent">Send it over.</span>
                    </h2>
                    <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
                        I&apos;m open to thoughtful engineering work, ambitious products, and conversations about systems that need to scale without losing their soul.
                    </p>
                    <div className="contact-meta-row">
                        <span><MapPin /> India / UTC+5:30</span>
                        <span><Clock3 /> Replies within 24h</span>
                    </div>
                </FadeUp>

                <FadeUp delay={0.1} className="contact-action-panel">
                    <span className="contact-panel-label">PRIMARY INBOUND</span>
                    <Mail className="contact-panel-icon" aria-hidden="true" />
                    <a href={`mailto:${email}`} className="contact-email">{email}</a>
                    <div className="contact-action-row">
                        <a href={`mailto:${email}`} className="contact-send-button">
                            Start a conversation <Send />
                        </a>
                        <button onClick={handleCopy} className="contact-copy-button" aria-label="Copy email address">
                            {copied ? <Check /> : <Copy />}
                        </button>
                    </div>
                    <span className="contact-copy-status" aria-live="polite">{copied ? "Email copied to clipboard" : "Or copy the address"}</span>
                </FadeUp>
            </div>

            <FadeUp delay={0.2} className="contact-links">
                <span className="contact-links-label">Elsewhere on the network</span>
                <div className="contact-links-list">
                    {socialLinks.map((item) => (
                        <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                            <item.icon aria-hidden="true" />
                            <span>{item.name}</span>
                            <small>{item.handle}</small>
                            <ArrowUpRight className="contact-link-arrow" aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </FadeUp>
        </section>
    );
}

/* ─────────────────────────── footer ─────────────────────────── */

function Footer() {
    return (
        <footer className="py-12 px-4 sm:px-6 md:px-12 border-t border-white/8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>ABHRA JAISWAL &bull; {new Date().getFullYear()}</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors"
                >
                    BACK TO TOP &uarr;
                </a>
            </div>
        </footer>
    );
}

/* ─────────────────────────── landing page root ─────────────────────────── */

export default function LandingPage() {
    return (
        <div className="warm-page min-h-screen bg-[#f3f3f0] text-[#252525] relative selection:bg-[#252525] selection:text-[#f3f3f0]">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <BlogSection />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
