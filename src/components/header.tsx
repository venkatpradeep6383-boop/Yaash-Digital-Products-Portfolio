"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const links = [["Home", "/"], ["Work", "/#work"], ["Contact", "/#contact"], ["Pricing", "/pricing"], ["Process", "/process"], ["About", "/#about"]];
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="header"><Link href="/" className="brand"><Image className="header-brand-logo" src="/images/yaash-logo.png" alt="" width={72} height={38} priority /><span>{site.brand}</span></Link><nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Primary">{links.map(([label, href]) => { const active = href === "/" ? pathname === "/" : label === "Work" ? pathname.startsWith("/work/") : pathname === href; return <Link className={active ? "active" : ""} aria-current={active ? "page" : undefined} key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>; })}<Link href="/#contact" className="mobile-nav-cta" onClick={() => setOpen(false)}>Start a Project →</Link></nav><Link href="/#contact" className="header-cta">Start a Project <span>→</span></Link><button className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span/><span/></button></header>;
}
