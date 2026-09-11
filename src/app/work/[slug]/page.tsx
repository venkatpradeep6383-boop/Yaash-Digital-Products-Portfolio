import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, site } from "@/data/site";
import { ProductVisual } from "@/components/product-visual";
import { Arrow } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const p = projects.find((x) => x.slug === slug); return p ? { title: `${p.name} — Case Study`, description: p.summary, alternates: site.url ? { canonical: `/work/${p.slug}` } : undefined, openGraph: { title: `${p.name} — Case Study`, description: p.summary, type: "article", ...(site.url ? { url: `${site.url}/work/${p.slug}` } : {}) }, twitter: { card: "summary_large_image", title: `${p.name} — Case Study`, description: p.summary } } : {}; }
export default async function CaseStudy({ params }: Props) {
  const { slug } = await params; const p = projects.find((x) => x.slug === slug); if (!p) notFound();
  const next = projects[(projects.indexOf(p)+1)%projects.length];
  return <main className={`case-study theme-${p.theme}`}><section className="case-hero"><Link href="/#work" className="back">← ALL WORK</Link><p className="eyebrow">CASE STUDY / {p.number}</p><h1>{p.name}</h1><div className="case-meta"><span>{p.category}</span><p>{p.summary}</p></div><ProductVisual project={p} large/></section><section className="case-story section"><div><p className="eyebrow">01 / THE PROBLEM</p><h2>{p.problem}</h2></div><div><p className="eyebrow">02 / THE SOLUTION</p><h2>{p.solution}</h2></div></section><section className="feature-section section"><p className="eyebrow">PRODUCT SYSTEM / KEY MODULES</p><h2>Built as one<br/>connected workflow.</h2><div className="feature-list">{p.features.map((f,i) => <div key={f}><span>{String(i+1).padStart(2,"0")}</span><h3>{f}</h3></div>)}</div></section><section className="case-tech section"><p className="eyebrow">TECHNOLOGY</p>{p.technologies.map((t) => <span key={t}>{t}</span>)}</section><Link href={`/work/${next.slug}`} className="next-project"><span>NEXT CASE STUDY</span><h2>{next.name}</h2><Arrow diagonal/></Link></main>;
}
