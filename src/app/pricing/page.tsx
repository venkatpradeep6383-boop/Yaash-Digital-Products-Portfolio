import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Starting prices for websites, business systems, and custom software projects.",
};

const packages = [
  { name: "Starter", price: "₹25K", description: "For a focused website or a lightweight business tool with a clear scope.", includes: ["Focused project scope", "Responsive interface", "Essential integrations", "Launch support"] },
  { name: "Business", price: "₹40K", description: "For database-backed products such as CRM, POS, dashboards, and internal workflows.", includes: ["Product planning", "Multiple connected modules", "Database and user flows", "Testing and deployment"], featured: true },
  { name: "Custom", price: "₹60K", description: "For advanced platforms with several roles, integrations, and complex operations.", includes: ["Custom product architecture", "Advanced workflows", "Third-party integrations", "Phased delivery plan"] },
];

export default function PricingPage() {
  return <main className="info-page pricing-page">
    <section className="info-hero"><p className="info-kicker">ENGAGEMENT / PRICING</p><h1>A clear place<br />to start.</h1><p className="info-lead">Every product is scoped around the real workflow it needs to improve. These starting points make the first conversation simpler.</p></section>
    <section className="pricing-grid" aria-label="Pricing options">{packages.map((item, index) => <article className={item.featured ? "pricing-package featured" : "pricing-package"} key={item.name}><div className="package-top"><span>0{index + 1}</span>{item.featured && <strong>POPULAR</strong>}</div><p>{item.name}</p><h2><small>Starting at</small>{item.price}</h2><p className="package-description">{item.description}</p><ul>{item.includes.map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href="/#contact">Discuss this option <span aria-hidden="true">↗</span></Link></article>)}</section>
    <section className="info-note"><p>Final pricing depends on modules, integrations, complexity, and support requirements.</p><Link href="/process">See how projects are delivered →</Link></section>
  </main>;
}
