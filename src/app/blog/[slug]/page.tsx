import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

const POSTS: Record<string, { title: string; date: string; readTime: string; summary: string }> = {
  "ride-booking-system-design": {
    title: "Behind the Scenes of Ride Booking: A System Design Deep Dive",
    date: "Mar 19, 2026",
    readTime: "8 min read",
    summary:
      "Ever wondered what happens when you tap 'Book Ride'? Explore the distributed architecture powering modern ride-hailing platforms like Uber and Rapido.",
  },
  "rag-system-design": {
    title: "RAG: A System Design Perspective (Not a Buzzword)",
    date: "Mar 30, 2026",
    readTime: "10 min read",
    summary:
      "Stop treating RAG as a prompt engineering trick. From a system design standpoint, it's a distributed data pipeline problem wrapped in an LLM interface.",
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
    <main className="min-h-screen bg-[#050505] text-white relative overflow-x-clip">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 py-10 sm:py-14">
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
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            {post.title}
          </h1>
          {slug === "ride-booking-system-design" && (
            <div className="mt-10 space-y-8 text-zinc-300 leading-relaxed">
              <section>
                <p className="text-base mb-6">
                  Ever wondered what happens when you tap &quot;Book Ride&quot;? Let&apos;s explore the distributed architecture powering modern ride-hailing platforms like Uber and Rapido.
                </p>
              </section>

              <section>
                <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
                  <Image
                    src="/blog1.jpeg"
                    alt="Ride Booking System Architecture Diagram"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Request Flow Architecture</h2>
                <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto text-zinc-300">
                  <pre>{`Rider App → API Gateway → Load Balancer → Microservices Cluster
                ↓
         Kafka Event Stream → Driver Matching → Redis Cache
                ↓
         WebSocket Gateway → Real-time Location Updates`}</pre>
                </div>
                <p>
                  When you request a ride, your app hits the <strong className="text-emerald-300">API Gateway</strong>, which authenticates and routes requests to appropriate microservices. The <strong className="text-emerald-300">Fare Estimation Service</strong> calculates pricing by querying Google Maps API for distance/ETA and applying rate cards from PostgreSQL, including dynamic surge multipliers during high demand.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Core Service Interactions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left py-3 px-3 text-emerald-300 font-semibold">Service</th>
                        <th className="text-left py-3 px-3 text-emerald-300 font-semibold">Responsibility</th>
                        <th className="text-left py-3 px-3 text-emerald-300 font-semibold">Tech Stack</th>
                        <th className="text-left py-3 px-3 text-emerald-300 font-semibold">SLA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3 px-3 font-semibold text-zinc-100">Driver Matching</td>
                        <td className="py-3 px-3">Geo-proximity search</td>
                        <td className="py-3 px-3">Redis GeoSpatial + ZooKeeper</td>
                        <td className="py-3 px-3 text-blue-300">&lt;100ms</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3 px-3 font-semibold text-zinc-100">Location Tracking</td>
                        <td className="py-3 px-3">Real-time GPS streaming</td>
                        <td className="py-3 px-3">WebSocket + Kafka</td>
                        <td className="py-3 px-3 text-blue-300">&lt;2s latency</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3 px-3 font-semibold text-zinc-100">Trip Dispatch</td>
                        <td className="py-3 px-3">Driver assignment logic</td>
                        <td className="py-3 px-3">Flink Stream Processing</td>
                        <td className="py-3 px-3 text-blue-300">&lt;60s</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3 px-3 font-semibold text-zinc-100">Payment Service</td>
                        <td className="py-3 px-3">Transaction processing</td>
                        <td className="py-3 px-3">PostgreSQL + Payment Gateway</td>
                        <td className="py-3 px-3 text-blue-300">Idempotent</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-zinc-100">Notification</td>
                        <td className="py-3 px-3">Push alerts</td>
                        <td className="py-3 px-3">FCM/APNS + WebSocket</td>
                        <td className="py-3 px-3 text-blue-300">&lt;1s</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">The Critical Matching Flow</h2>
                <p className="mb-4">
                  When you book, the <strong className="text-emerald-300">Driver Matching Service</strong> executes a complex workflow:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                  <li><strong>Query Redis</strong> for available drivers within 5km using <code className="bg-zinc-900 px-2 py-1 rounded text-emerald-300 font-mono">GEORADIUS</code> command</li>
                  <li><strong>Rank drivers</strong> by proximity, ratings, and acceptance rate</li>
                  <li><strong>Acquire distributed lock</strong> via ZooKeeper to prevent double-booking</li>
                  <li><strong>Send ride offer</strong> to top 3 drivers sequentially (10s timeout each)</li>
                  <li><strong>Update state</strong> in PostgreSQL upon acceptance</li>
                </ol>
                <p className="text-sm text-zinc-400 italic border-l-2 border-emerald-500/30 pl-4">
                  Interactive Element: Visualize a live architecture diagram where you can click each service to see current metrics: active drivers in your zone, average matching time, Kafka throughput (events/sec), and Redis cache hit ratio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Real-Time Location Pipeline</h2>
                <p>
                  Drivers send GPS coordinates every 5-10 seconds via WebSocket. The <strong className="text-emerald-300">Location Update Service</strong> ingests these into Kafka, where stream processors update:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-3">
                  <li>Redis geospatial index (for matching)</li>
                  <li>PostgreSQL trip history (for audit)</li>
                  <li>Rider&apos;s app via WebSocket broadcast</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">CAP Theorem Trade-offs</h2>
                <p>
                  The system prioritizes <strong className="text-emerald-300">Availability</strong> for fare estimation and tracking (eventual consistency acceptable) but enforces <strong className="text-emerald-300">Strong Consistency</strong> for driver assignment using distributed locks—preventing the catastrophic scenario of double-booking a driver.
                </p>
                <p className="mt-4">
                  This architecture handles millions of concurrent users while maintaining sub-minute assignment latency through strategic caching, partitioning, and asynchronous event-driven design.
                </p>
              </section>

              <p className="text-sm text-zinc-500 italic pt-6 border-t border-zinc-800">
                The beauty of ride-booking systems lies in their elegant balance between consistency and performance, between user experience and infrastructure constraints.
              </p>
            </div>
          )}

          {slug === "rag-system-design" && (
            <div className="mt-10 space-y-8 text-zinc-300 leading-relaxed">
              <section>
                <p className="text-base mb-4">
                  Stop treating Retrieval-Augmented Generation (RAG) as a prompt engineering trick. From a system design standpoint, RAG is a <strong className="text-emerald-300">distributed data pipeline problem</strong> wrapped in an LLM interface. It is an architectural pattern designed to solve three specific engineering constraints: <strong className="text-emerald-300">context window limits</strong>, <strong className="text-emerald-300">data freshness</strong>, and <strong className="text-emerald-300">hallucination reduction</strong> by grounding generation in external truth.
                </p>
                <p className="text-base">
                  If you are designing a RAG system, you are not just building a chatbot; you are building a search engine with a generative frontend.
                </p>
              </section>

              <section>
                <div className="rounded-lg overflow-hidden border border-white/10 mb-8">
                  <Image
                    src="/blog2.png"
                    alt="RAG System Architecture Diagram"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">The High-Level Architecture</h2>
                <p className="mb-4">
                  A production-grade RAG system consists of two distinct, decoupled pipelines: the <strong className="text-emerald-300">Ingestion Pipeline</strong> (write-heavy, async) and the <strong className="text-emerald-300">Query Pipeline</strong> (read-heavy, low-latency).
                </p>
                <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto text-zinc-300">
                  <pre>{`[Data Sources] → [ETL/Chunking] → [Embedding Model] → [Vector DB]
                                            ↑
[User Query] → [Query Embedding] → [Retrieval] → [LLM Context] → [Response]`}</pre>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">1. The Ingestion Pipeline (The Hard Part)</h2>
                <p className="mb-4">
                  Most engineers focus on the query path, but the system&apos;s reliability depends on the ingestion pipeline. This is an asynchronous ETL process.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong className="text-zinc-100">Chunking Strategy:</strong> This is effectively <strong className="text-emerald-300">data sharding</strong>. You must decide on chunk size (tokens) and overlap. Too small, and you lose semantic context; too large, and you waste context window tokens on irrelevant noise.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Embedding Generation:</strong> This is a compute-intensive batch job. You cannot embed documents on the fly during the query path without incurring massive latency. These must be pre-computed and stored.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Data Consistency:</strong> What happens when a source document updates? You need a CDC (Change Data Capture) mechanism to invalidate old vector embeddings and re-index the new chunks. Without this, your system serves stale &quot;truth.&quot;
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">2. The Query Pipeline (Latency Optimization)</h2>
                <p className="mb-4">
                  The user-facing path has a strict latency budget (usually &lt;2 seconds).
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong className="text-zinc-100">Hybrid Search:</strong> Relying solely on vector similarity (k-NN) often fails on exact keyword matches (e.g., product IDs). A robust system combines <strong className="text-emerald-300">Dense Retrieval</strong> (vectors) with <strong className="text-emerald-300">Sparse Retrieval</strong> (BM25/keyword) and merges results.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Re-Ranking:</strong> Initial retrieval fetches top-k (e.g., 20) documents. A cross-encoder re-ranker then scores these 20 for relevance before passing the top-5 to the LLM. This adds latency but drastically improves precision.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Context Window Management:</strong> You are paying for every token sent to the LLM. The retrieval layer must filter aggressively to minimize cost and latency.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Key Design Trade-offs</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left py-3 px-3 text-emerald-300 font-semibold">Component</th>
                        <th className="text-left py-3 px-3 text-emerald-300 font-semibold">Decision</th>
                        <th className="text-left py-3 px-3 text-emerald-300 font-semibold">Trade-off</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3 px-3 font-semibold text-zinc-100">Vector DB</td>
                        <td className="py-3 px-3">Managed (Pinecone) vs. Self-hosted (Milvus/pgvector)</td>
                        <td className="py-3 px-3"><strong className="text-emerald-300">Ops Overhead vs. Cost/Control.</strong> Managed scales easier; self-hosted offers data sovereignty.</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-3 px-3 font-semibold text-zinc-100">Chunk Size</td>
                        <td className="py-3 px-3">Small (256 tokens) vs. Large (1024 tokens)</td>
                        <td className="py-3 px-3"><strong className="text-emerald-300">Precision vs. Context.</strong> Small chunks retrieve precise facts; large chunks provide better narrative flow.</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-zinc-100">Retrieval</td>
                        <td className="py-3 px-3">Top-K Fixed vs. Dynamic Threshold</td>
                        <td className="py-3 px-3"><strong className="text-emerald-300">Recall vs. Noise.</strong> Fixed K is simpler; dynamic threshold prevents feeding irrelevant docs to the LLM when no good match exists.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Failure Modes & Monitoring</h2>
                <p className="mb-4">A System Designer must plan for failure. RAG systems fail silently.</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong className="text-zinc-100">Retrieval Failure:</strong> The relevant doc exists but wasn&apos;t retrieved. <em className="text-zinc-400">Mitigation:</em> Monitor &quot;Recall@K&quot; metrics using a golden dataset.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Generation Failure:</strong> The LLM ignores the context. <em className="text-zinc-400">Mitigation:</em> Use prompt constraints and evaluate output faithfulness.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Latency Spikes:</strong> Embedding APIs or Vector DBs can throttle. <em className="text-zinc-400">Mitigation:</em> Implement caching for frequent queries and circuit breakers for external embedding calls.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Conclusion</h2>
                <p>
                  RAG is not magic; it is <strong className="text-emerald-300">Search + Summarization</strong>. By treating it as a data engineering challenge—focusing on indexing strategies, consistency models, and latency budgets—you move beyond the hype and build systems that are reliable, scalable, and maintainable.
                </p>
              </section>

              <p className="text-sm text-zinc-500 italic pt-6 border-t border-zinc-800">
                The key insight is treating RAG as a distributed systems problem, not an AI prompt trick—engineering rigor over hype.
              </p>
            </div>
          )}
        </article>
        </div>
      </div>
    </main>
  );
}
