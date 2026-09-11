export type Project = {
  number: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  theme: "violet" | "amber" | "red" | "blue";
};

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;
const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;
const configuredWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "916380556785";

export const site = {
  brand: "YAASH DIGITAL PRODUCTS",
  title: "Business Software & Digital Product Builder",
  description: "Practical digital products for growing businesses — CRM, POS, websites and custom applications.",
  url: configuredUrl,
};

export const contact = {
  email: configuredEmail,
  whatsappNumber: configuredWhatsApp,
  whatsappMessage: "Hi Yaash, I’d like to make an enquiry.\n\nPlease help me with:\n1. A new website\n2. CRM or POS software\n3. Billing / business automation\n4. An existing project or support\n\nMy requirement: ",
  get whatsappHref() {
    return this.whatsappNumber
      ? `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`
      : null;
  },
};

export const projects: Project[] = [
  {
    number: "01", slug: "dealup-crm", name: "DEALUP CRM",
    category: "Sales CRM / Pipeline / Analytics",
    summary: "A focused sales workspace that turns scattered leads, follow-ups and deal activity into one visible pipeline.",
    problem: "Sales teams need one place to manage leads, opportunities, follow-ups and performance.",
    solution: "A structured CRM designed to make the sales pipeline visible and actionable.",
    features: ["Dashboard", "Sales pipeline", "Leads", "Deals", "Activities", "Follow-ups", "Revenue tracking", "Analytics"],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL"], theme: "violet",
  },
  {
    number: "02", slug: "drip-clothing-pos", name: "DRIP CLOTHING POS",
    category: "Retail POS / Inventory / Billing / Barcode",
    summary: "A retail operating system connecting barcode billing, purchases, customer records and live inventory.",
    problem: "Retail operations become fragile when billing, stock and purchase records live in separate tools.",
    solution: "One transaction-led system where every sale updates the records the business depends on.",
    features: ["Billing POS", "Barcode", "Inventory", "GST", "Customers", "Suppliers", "Purchases", "Returns", "Sales history"],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL"], theme: "amber",
  },
  {
    number: "03", slug: "dk-detailing-pos", name: "DK DETAILING POS",
    category: "Automotive Billing / Business Management",
    summary: "A composed business cockpit for vehicle records, service billing, payments and operational reporting.",
    problem: "Automotive service businesses need customer, vehicle and service information to stay connected through billing.",
    solution: "A tailored management system built around the complete detailing workflow.",
    features: ["Billing", "Customer management", "Vehicle information", "Services", "Payment records", "Reports", "Business dashboard"],
    technologies: ["React", "TypeScript", "PostgreSQL"], theme: "red",
  },
  {
    number: "04", slug: "dk-detailing-website", name: "DK DETAILING WEBSITE",
    category: "Premium Automotive Website / CMS / SEO",
    summary: "A premium, responsive digital presence engineered to present services clearly and convert interest into enquiries.",
    problem: "A specialist detailing studio needs a digital presence that communicates the same care as the physical service.",
    solution: "A fast, editorial website system designed for discovery, trust and straightforward content management.",
    features: ["Responsive design", "Service pages", "Gallery", "CMS", "Enquiries", "SEO architecture", "Maps", "Performance"],
    technologies: ["Next.js", "TypeScript", "Vercel"], theme: "blue",
  },
  {
    number: "05", slug: "track-grow", name: "TRACK GROW",
    category: "Field Workforce Management Platform",
    summary: "A live operating picture for field teams, attendance, visits, routes and reporting.",
    problem: "Growing field teams need a reliable way to understand attendance, visits and daily movement without fragmented updates.",
    solution: "A field workforce platform that brings live activity, route history and reporting into one operational view.",
    features: ["Live tracking", "Attendance", "Visits", "Routes", "Reports"],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL"], theme: "blue",
  },
];

export const services = [
  ["BUSINESS WEBSITES", 25000], ["POS & BILLING SYSTEMS", 30000], ["CRM SOFTWARE", 40000],
  ["E-COMMERCE", 45000], ["CUSTOM BUSINESS SOFTWARE", 50000],
] as const;

export const pricing = {
  productBase: { "Business Website": 25000, POS: 30000, CRM: 40000, "E-commerce": 45000, "Custom Software": 50000 },
  featureCost: 3500,
  complexity: { Simple: 1, Business: 1.28, Advanced: 1.65 },
  rangeSpread: 0.22,
};

export const technologies = ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Neon", "Vercel", "Git"];
