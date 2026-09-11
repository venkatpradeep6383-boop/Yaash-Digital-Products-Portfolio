import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Process",
  description: "A practical six-stage process for planning, designing, building, and launching digital products.",
};

const stages = [
  ["Discovery", "Understand the business, the people involved, and where the current workflow creates friction."],
  ["Product planning", "Turn the problem into a focused scope, connected modules, and clear user journeys."],
  ["Design", "Shape the interface, information hierarchy, and interaction system around daily use."],
  ["Development", "Build the working product in small, reviewable parts while keeping the system connected."],
  ["Testing", "Validate the important workflows, responsive behaviour, edge cases, and operational details."],
  ["Deployment", "Launch the production application, complete final checks, and prepare the next iteration."],
];

export default function ProcessPage() {
  return <main className="info-page process-page"><section className="info-hero"><p className="info-kicker">METHOD / SIX STAGES</p><h1>From friction<br />to finished product.</h1><p className="info-lead">A connected process keeps every design and engineering decision tied to the business workflow it needs to improve.</p></section><section className="process-list" aria-label="Project process">{stages.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h2>{name}</h2><p>{description}</p></article>)}</section><section className="process-cta"><p>Have a system worth building?</p><h2>Let&apos;s turn it into<br />a working product.</h2><Link href="/#contact">Start a conversation <span aria-hidden="true">↗</span></Link></section></main>;
}
