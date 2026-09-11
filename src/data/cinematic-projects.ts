export type CinematicProject = {
  number: string;
  slug: string;
  short: string;
  name: string;
  category: string;
  description: string;
  screenshot?: string;
  website?: string;
  features: string[];
  stack: string[];
  tone: "ice" | "gold" | "violet" | "signal" | "cyan";
};

export const cinematicProjects: CinematicProject[] = [
  {
    number: "01", slug: "dk-detailing-website", short: "DK", name: "DK DETAILING",
    category: "Premium Automotive Website",
    description: "A precision-built digital presence designed to turn automotive craft into trust, discovery and enquiries.",
    screenshot: "/images/dk-site-desktop-01.png",
    features: ["Website", "CMS", "SEO", "Lead Generation"],
    stack: ["Next.js", "TypeScript", "Vercel"], tone: "ice",
  },
  {
    number: "02", slug: "dk-detailing-pos", short: "POS", name: "DK DETAILING POS",
    category: "Detailing Studio Operating System",
    description: "A connected workshop workspace for jobs, customers, services, billing and business reporting.",
    screenshot: "/images/dk-detailing-pos-dashboard.png",
    features: ["Billing", "Customers", "Services", "Expenses", "Reports"],
    stack: ["React", "TypeScript", "PostgreSQL"], tone: "gold",
  },
  {
    number: "03", slug: "drip-clothing-pos", short: "DRIP", name: "DRIP CLOTHING POS",
    category: "Retail Management System",
    description: "A transaction-led retail system connecting the counter, inventory, purchases and customer history.",
    screenshot: "/images/drip-clothing-pos-dashboard.png",
    features: ["Inventory", "Billing", "Purchases", "Returns", "Customers", "Reports"],
    stack: ["Next.js", "React", "PostgreSQL"], tone: "signal",
  },
  {
    number: "04", slug: "dealup-crm", short: "DEALUP", name: "DEALUP CRM",
    category: "Sales & Revenue Management Platform",
    description: "A focused sales environment that makes every lead, follow-up, deal and revenue target visible.",
    screenshot: "/images/dealup-crm-dashboard.png",
    features: ["CRM", "Pipeline", "Revenue", "Analytics", "Follow-ups"],
    stack: ["Next.js", "TypeScript", "PostgreSQL"], tone: "violet",
  },
  {
    number: "05", slug: "track-grow", short: "TRACK", name: "TRACK GROW",
    category: "Field Workforce Management Platform",
    description: "A live operating picture for field teams, attendance, visits, route activity and reporting.",
    features: ["Live Tracking", "Attendance", "Visits", "Routes", "Reports"],
    stack: ["Next.js", "React", "Maps", "PostgreSQL"], tone: "cyan",
  },
];
