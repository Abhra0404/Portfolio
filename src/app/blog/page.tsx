"use client";

import { ArrowUpRight, CalendarDays, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const BLOG_POSTS = [
  {
    slug: "ride-booking-system-design",
    title: "Behind the Scenes of Ride Booking: A System Design Deep Dive",
    excerpt:
      "Ever wondered what happens when you tap 'Book Ride'? Explore the distributed architecture powering modern ride-hailing platforms like Uber and Rapido.",
    date: "Mar 19, 2026",
    publishedAt: "2026-03-19",
    views: 24,
    tag: "System Design",
    image: "/blog.jpeg",
  },
];

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"all" | "newest" | "popular">("all");

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let posts = [...BLOG_POSTS];

    if (normalizedQuery) {
      posts = posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.excerpt.toLowerCase().includes(normalizedQuery) ||
          post.tag.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (sortBy === "newest") {
      posts.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    }

    if (sortBy === "popular") {
      posts.sort((a, b) => b.views - a.views);
    }

    return posts;
  }, [query, sortBy]);

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

        <div>
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
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-zinc-900/70 border border-white/8 rounded-lg py-2.5 pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 lg:w-auto">
                <button
                  onClick={() => setSortBy("all")}
                  className={`px-3 py-2 rounded-lg border font-mono text-[11px] tracking-widest uppercase transition-colors ${
                    sortBy === "all"
                      ? "border-emerald-500/30 bg-emerald-500/12 text-emerald-300"
                      : "border-white/12 bg-zinc-900/70 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  All Posts
                </button>
                <button
                  onClick={() => setSortBy("newest")}
                  className={`px-3 py-2 rounded-lg border font-mono text-[11px] tracking-widest uppercase transition-colors ${
                    sortBy === "newest"
                      ? "border-emerald-500/30 bg-emerald-500/12 text-emerald-300"
                      : "border-white/12 bg-zinc-900/70 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Newest
                </button>
                
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {visiblePosts.map((post) => (
            <Link
              key={post.title}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-[18px] border border-white/15 bg-[#060606] text-zinc-100 shadow-[0_14px_28px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_22px_36px_rgba(0,0,0,0.45)]"
            >
              <article>
                <div className="relative h-48 sm:h-52 border-b border-white/10 bg-[#0d0d0d]">
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md border border-emerald-400/40 bg-black/70 text-zinc-100 font-mono text-[10px] tracking-widest uppercase">
                    {post.tag}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-500">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-zinc-900 px-2.5 py-1 text-zinc-300">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    
                  </div>

                  <h2 className="mb-3 text-[1.55rem] sm:text-[1.7rem] font-semibold text-zinc-100 tracking-tight leading-[1.1] group-hover:underline underline-offset-4 transition-colors">
                    {post.title}
                  </h2>

                  <p className="mb-4 min-h-16 text-sm leading-relaxed text-zinc-400">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-dashed border-white/12 pt-3">
                    <span className="font-mono text-xs tracking-widest uppercase text-zinc-200 transition-colors group-hover:underline underline-offset-4">
                      Read Article
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>

        {visiblePosts.length === 0 && (
          <div className="mt-8 rounded-xl border border-white/10 bg-zinc-950/70 p-6 text-center">
            <p className="text-zinc-300 font-medium">No posts found.</p>
            <p className="text-zinc-500 text-sm mt-1">Try a different keyword or switch the filter.</p>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}
