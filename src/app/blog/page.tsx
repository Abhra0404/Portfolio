import { ArrowUpRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BLOG_POSTS = [
  {
    slug: "ride-booking-system-design",
    title: "Behind the Scenes of Ride Booking: A System Design Deep Dive",
    excerpt:
      "Ever wondered what happens when you tap 'Book Ride'? Explore the distributed architecture powering modern ride-hailing platforms like Uber and Rapido.",
    date: "Mar 19, 2026",
    publishedAt: "2026-03-19",
    views: 0,
    tag: "System Design",
    image: "/blog.jpeg",
  },
  {
    slug: "rag-system-design",
    title: "RAG: A System Design Perspective (Not a Buzzword)",
    excerpt:
      "Stop treating RAG as a prompt engineering trick. From a system design standpoint, it's a distributed data pipeline problem wrapped in an LLM interface.",
    date: "Mar 30, 2026",
    publishedAt: "2026-03-30",
    views: 0,
    tag: "System Design",
    image: "/blog2.png",
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

        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {BLOG_POSTS.map((post) => (
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

        </div>
      </div>
    </main>
  );
}
