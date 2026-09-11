"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function MagneticLink({ href, children, inverted = false }: { href: string; children: ReactNode; inverted?: boolean }) {
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .12}px, ${(event.clientY - box.top - box.height / 2) * .12}px)`;
  }
  return <Link href={href} className={`magnetic-link ${inverted ? "inverted" : ""}`} onMouseMove={move} onMouseLeave={(event) => { event.currentTarget.style.transform = ""; }}>{children}<span>↗</span></Link>;
}
