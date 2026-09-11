"use client";
import { useEffect, useState } from "react";

export function Intro() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem("studio-intro");
    if (!seen && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("studio-intro", "1");
      const showTimer = setTimeout(() => setVisible(true), 0);
      const hideTimer = setTimeout(() => setVisible(false), 3000);
      return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }
  }, []);
  if (!visible) return null;
  return <div className="intro" aria-hidden="true"><div className="intro-lines"><span>Designing systems.</span><span>Solving workflows.</span><span>Building products.</span><strong>04 PRODUCTS.</strong></div></div>;
}
