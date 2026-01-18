export const PORTFOLIO_DATA = {
    profile: {
        name: "Abhra",
        role: "Full Stack Engineer",
        id: "ABHRA.0404",
        bio: "I don't just write code; I design systems. Every pixel, animation, and logic flow is a deliberate engineering decision. My focus is on building scalable, performant, and user-centric solutions that bridge the gap between design and engineering.",
        status: "OPEN FOR HIRE",
        location: "India",
        email: "aforabhra@gmail.com",
        github: "https://github.com/Abhra0404",
        linkedin: "https://linkedin.com/in/abhra0404"
    },
    experience: [
        {
            company: "Tech Corp",
            role: "Senior Frontend Engineer",
            period: "2023 - PRESENT",
            description: "Leading the frontend architecture for the core product. Migrated legacy SPA to Next.js App Router, improving LCP by 40%."
        },
        {
            company: "Startup Inc",
            role: "Full Stack Developer",
            period: "2021 - 2023",
            description: "Built and scaled the MVP to 10k users. Implemented real-time collaboration features using WebSockets and Redis."
        },
        {
            company: "Freelance",
            role: "Web Developer",
            period: "2020 - 2021",
            description: "Delivered high-performance websites for various clients. Specialized in animation-heavy interactions and headless CMS integrations."
        }
    ],
    projects: [
        {
            title: "Portfolio.OS",
            description: "A system-themed portfolio website treated as a product. Built with React Server Components, Tailwind v4, and framer-motion for a high-performance, immersive experience.",
            stack: ["Next.js 16", "Tailwind CSS", "Framer Motion", "TypeScript"],
            status: "LIVE",
            link: "#",
            metrics: "100/100 Lighthouse Score"
        },
        {
            title: "E-Commerce Engine",
            description: "A headless, edge-optimized commerce engine designed for global scale. Features include optimistic UI updates, edge caching, and AI-driven recommendations.",
            stack: ["Next.js", "Redis", "PostgreSQL", "Stripe"],
            status: "DEV",
            link: "#",
            metrics: "<50ms API Latency"
        },
        {
            title: "AI Task Agent",
            description: "Autonomous developer agent capable of understanding codebase context and executing complex refactors. Integrates with GitHub API for PR automation.",
            stack: ["Python", "LangChain", "OpenAI", "Docker"],
            status: "DEV",
            link: "#",
            metrics: "Automates 30% of chore tasks"
        },
        {
            title: "Design System CLI",
            description: "Command-line tool to scaffold enterprise-grade design systems. Generates tokens, components, and documentation from a simple configuration file.",
            stack: ["Rust", "Clap", "Cargo"],
            status: "LIVE",
            link: "#",
            metrics: "Used by 5+ teams"
        }
    ],
    skills: {
        frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
        backend: ["Node.js", "PostgreSQL", "Redis", "Serverless", "System Design"],
        tools: ["Git", "Docker", "Turborepo", "Figma", "AWS", "Vercel"]
    }
};
