import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<string, { title: string; date: string; readTime: string; summary: string }> = {
  "infinite-context-budget": {
    title: "Infinite Context on a Budget",
    date: "Feb 1, 2026",
    readTime: "6 min read",
    summary:
      "Practical memory architecture patterns for AI products that need long-session coherence without runaway token costs.",
  },
  "compliance-dna": {
    title: "Compliance DNA",
    date: "Jan 9, 2026",
    readTime: "5 min read",
    summary:
      "A graph-first method to trace regulation to implementation so legal intent survives real engineering constraints.",
  },
  "nexora-human-layer": {
    title: "Nexora",
    date: "Jan 9, 2026",
    readTime: "7 min read",
    summary:
      "Designing software for team cognition: workflows, trust loops, and interfaces that support real collaboration under pressure.",
  },
};

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 sm:px-6 md:px-12 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors font-mono text-xs tracking-widest uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>

        <article className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/80 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-5">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            {post.title}
          </h1>
          <p className="text-zinc-400 leading-relaxed">{post.summary}</p>
        </article>
      </div>
    </main>
  );
}
