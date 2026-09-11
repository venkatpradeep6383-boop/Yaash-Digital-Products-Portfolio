"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";

const BrandLaunchScene = dynamic(() => import("./brand-launch-scene").then((module) => module.BrandLaunchScene), {
  ssr: false,
  loading: () => null,
});

export function BrandLaunch() {
  const [config] = useState(() => {
    if (typeof window === "undefined") return { replay: true, reduced: false, compact: false };
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    return {
      replay: navigation?.type === "reload" || !sessionStorage.getItem("ydp-intro-seen"),
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      compact: matchMedia("(max-width: 820px)").matches,
    };
  });
  const [visible, setVisible] = useState(config.replay);
  const [phase, setPhase] = useState(config.reduced ? 4 : 0);
  const [portal, setPortal] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const handlePhase = useCallback((next: number) => setPhase(next), []);
  const handlePortal = useCallback(() => setPortal(true), []);

  const finish = useCallback(() => {
    sessionStorage.setItem("ydp-intro-seen", "1");
    document.body.classList.remove("brand-launch-active");
    document.documentElement.classList.remove("brand-launch-active");
    document.body.classList.add("brand-launch-reveal");
    document.body.classList.add("homepage-ready");
    window.scrollTo(0, 0);
    gsap.set(".intro-sequence", { clearProps: "opacity,transform,scale,clipPath" });
    setVisible(false);
    window.setTimeout(() => document.body.classList.remove("brand-launch-reveal"), 1100);
  }, []);

  useEffect(() => {
    if (!config.replay) return;
    document.body.classList.add("brand-launch-active");
    document.documentElement.classList.add("brand-launch-active");
    if (config.reduced) {
      const reducedTimer = window.setTimeout(finish, 900);
      return () => window.clearTimeout(reducedTimer);
    }
    const skipTimer = window.setTimeout(() => setCanSkip(true), 1500);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", escape);
    return () => { window.clearTimeout(skipTimer); window.removeEventListener("keydown", escape); document.body.classList.remove("brand-launch-active"); document.documentElement.classList.remove("brand-launch-active"); };
  }, [config, finish]);

  if (!visible) return null;
  return <div className={`brand-launch ${portal ? "is-portal" : ""}`} role="dialog" aria-label="Yaash Digital Products introduction" aria-modal="true">
    <div className={`brand-launch-halo phase-${phase}`} aria-hidden="true" />
    <div className="brand-launch-canvas">{!config.reduced && <BrandLaunchScene compact={config.compact} onPhase={handlePhase} onPortal={handlePortal} onComplete={finish}/>}</div>
    <div className={`brand-launch-words phase-${phase}`} aria-hidden="true"><span>YAASH</span><span>DIGITAL</span><span>PRODUCTS</span></div>
    <div className={`brand-launch-lockup phase-${phase}`}><strong className="brand-launch-static-mark">YDP</strong><span>YAASH DIGITAL PRODUCTS</span><small>IDEAS <i/> PRODUCTS <i/> REAL IMPACT</small></div>
    {canSkip && <button className="brand-launch-skip" type="button" onClick={finish}>SKIP INTRO <span>→</span></button>}
  </div>;
}
