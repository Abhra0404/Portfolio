import { ArrowUpRight, CalendarDays, Clock3, Eye, Search } from "lucide-react";
import Link from "next/link";

const BLOG_POSTS = [
  {
    slug: "infinite-context-budget",
    title: "Designing UI Systems That Scale",
    excerpt:
      "Practical memory architecture patterns for AI products that need long-session coherence without runaway token costs.",
    date: "Feb 1, 2026",
    readTime: "6 min read",
    views: 12,
    tag: "AI Systems",
    image:
      "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.04) 35%, rgba(255,255,255,0.02) 100%)",
  },
  {
    slug: "compliance-dna",
    title: "Compliance DNA",
    excerpt:
      "A graph-first method to trace regulation to implementation so legal intent survives real engineering constraints.",
    date: "Jan 9, 2026",
    readTime: "5 min read",
    views: 7,
    tag: "Architecture",
    image:
      "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(3,7,18,0.4) 40%, rgba(255,255,255,0.02) 100%)",
  },
  {
    slug: "nexora-human-layer",
    title: "Nexora",
    excerpt:
      "Designing software for team cognition: workflows, trust loops, and interfaces that support real collaboration under pressure.",
    date: "Jan 9, 2026",
    readTime: "7 min read",
    views: 10,
    tag: "Product",
    image:
      "linear-gradient(135deg, rgba(45,212,191,0.12), rgba(16,185,129,0.06) 45%, rgba(255,255,255,0.02) 100%)",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-x-clip">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-14">
        <Link
          href="/"
          className="relative z-30 inline-flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors font-mono text-xs tracking-widest uppercase"
        >
          Back to Home <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-2xl border border-emerald-500/20 bg-zinc-950/45 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-6 py-6 sm:px-8 sm:py-7 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-300 mb-3">
              Coming Soon
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
              The blog is under construction.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg mx-auto">
              The layout is ready, but the articles and final interactions are still being prepared. Check back soon for full write-ups and case notes.
            </p>
          </div>
        </div>

        <div className="blur-[3px] opacity-45 select-none pointer-events-none">
        <header className="mt-8 sm:mt-10 mb-8 sm:mb-10">

          <h1 className="inline-block text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-100 leading-none">
            BLOG
          </h1>

          <div className="mt-2 w-40 sm:w-48">
            <svg viewBox="0 0 160 12" className="w-full h-3" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 8 C24 2, 44 10, 64 7 C86 4, 106 10, 126 7 C140 5, 150 7, 158 6" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <p className="mt-5 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Thoughts on AI systems, frontend architecture, and building intelligent products with rigor.
          </p>
        </header>

        <section className="mb-8 sm:mb-10">
          <div className="rounded-2xl border border-emerald-500/25 bg-zinc-950/80 backdrop-blur p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full bg-zinc-900/70 border border-white/8 rounded-lg py-2.5 pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 lg:w-auto">
                <button className="px-3 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/12 text-emerald-300 font-mono text-[11px] tracking-widest uppercase">
                  All Posts
                </button>
                <button className="px-3 py-2 rounded-lg border border-white/12 bg-zinc-900/70 text-zinc-400 hover:text-zinc-200 transition-colors font-mono text-[11px] tracking-widest uppercase">
                  Newest
                </button>
                <button className="px-3 py-2 rounded-lg border border-white/12 bg-zinc-900/70 text-zinc-400 hover:text-zinc-200 transition-colors font-mono text-[11px] tracking-widest uppercase">
                  Popular
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/85 backdrop-blur-sm hover:border-emerald-500/30 transition-colors"
            >
              <div className="h-44 border-b border-white/8 relative" style={{ background: post.image }}>
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="absolute bottom-3 left-3 px-2 py-1 rounded border border-emerald-500/35 bg-[#050505]/75 text-emerald-300 font-mono text-[10px] tracking-widest uppercase">
                  {post.tag}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views}
                  </span>
                </div>

                <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-3 leading-tight">
                  {post.title}
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-5 min-h-20">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-dashed border-white/12">
                  <span className="inline-flex items-center gap-1.5 text-zinc-500 text-xs font-mono uppercase tracking-wider">
                    <Clock3 className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors font-mono text-xs tracking-widest uppercase"
                  >
                    Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
        </div>
      </div>
    </main>
  );
}
