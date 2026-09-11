import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  title: { default: site.title, template: `%s | ${site.title}` },
  description: site.description,
  openGraph: { title: site.title, description: "I turn business problems into working software.", type: "website", ...(site.url ? { url: site.url } : {}) },
  twitter: { card: "summary_large_image", title: site.title, description: "I turn business problems into working software." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}</body></html>;
}
