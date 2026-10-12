"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { audioEngine } from "@/lib/audio-engine-reference-v2";
import dynamic from "next/dynamic";

const BrandLaunchScene = dynamic(() => import("./brand-launch-scene").then(module => module.BrandLaunchScene), { ssr: false, loading: () => null });

export function BrandLaunch() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [config] = useState(() => {
    if (typeof window === "undefined") return { replay: true, reduced: false, compact: false, hasSoundChoice: false };
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    return { replay: new URLSearchParams(location.search).has("intro") || nav?.type === "reload" || !sessionStorage.getItem("ydp-intro-seen"), reduced: matchMedia("(prefers-reduced-motion: reduce)").matches, compact: matchMedia("(max-width: 820px)").matches, hasSoundChoice: sessionStorage.getItem("ydp-sound") !== null };
  });
  const [visible, setVisible] = useState(config.replay);
  const [phase, setPhase] = useState(config.reduced ? 8 : 0);
  const [portal, setPortal] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const entered = true;
  const ignoreSceneEvent = useCallback(() => {}, []);

  const finish = useCallback(() => {
    sessionStorage.setItem("ydp-intro-seen", "1");
    document.body.classList.remove("brand-launch-active");
    document.documentElement.classList.remove("brand-launch-active");
    document.body.classList.add("brand-launch-reveal", "homepage-ready");
    window.scrollTo(0, 0);
    gsap.set(".intro-sequence", { clearProps: "opacity,transform,scale,clipPath" });
    setVisible(false);
    window.setTimeout(() => document.body.classList.remove("brand-launch-reveal"), 1100);
  }, []);

  useEffect(() => {
    if (!visible || !entered) return;
    document.body.classList.add("brand-launch-active");
    document.documentElement.classList.add("brand-launch-active");
    if (config.reduced) { const id = window.setTimeout(finish, 3400); return () => window.clearTimeout(id); }
    const tl = gsap.timeline();
    const times = [0,1.2,2.4,3.6,5,6.5,7.5,7.5,9.5];
    times.forEach((time, index) => tl.call(() => setPhase(index + 1), [], time));
    tl.call(() => setPortal(true), [], times[8]).call(finish, [], 10);
    const skip = window.setTimeout(() => setCanSkip(true), 1500);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { tl.kill(); finish(); } };
    window.addEventListener("keydown", escape);
    return () => { tl.kill(); window.clearTimeout(skip); window.removeEventListener("keydown", escape); document.body.classList.remove("brand-launch-active"); document.documentElement.classList.remove("brand-launch-active"); };
  }, [config.compact, config.reduced, entered, finish, visible]);

  useEffect(() => { if (!entered || !audioEngine.isEnabled()) return; if (phase === 1) audioEngine.ambience(); if (phase === 6) audioEngine.reveal(); if (phase === 7) audioEngine.impact(); if (phase === 9) audioEngine.portal(); }, [entered, phase]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || config.compact || config.reduced) return;
    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - .5) * 2;
      const y = (event.clientY / window.innerHeight - .5) * 2;
      root.style.setProperty("--intro-x", `${x * 1.5}deg`);
      root.style.setProperty("--intro-y", `${y * -1.2}deg`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [config.compact, config.reduced]);

  if (!visible) return null;
  return <div ref={rootRef} className={`brand-launch spatial-launch phase-${phase} ${portal ? "is-portal" : ""}`} role="dialog" aria-label="Yaash Digital Products introduction" aria-modal="true">
    <div className="spatial-light" aria-hidden="true"/>
    <div className="brand-launch-canvas" aria-hidden="true"><BrandLaunchScene compact={config.compact} onPhase={ignoreSceneEvent} onPortal={ignoreSceneEvent} onComplete={ignoreSceneEvent}/></div>
    <div className="spatial-title"><strong>YAASH</strong><span>DIGITAL PRODUCTS</span></div>
    {canSkip && <button className="brand-launch-skip" type="button" onClick={finish}>SKIP INTRO <span>→</span></button>}
  </div>;
}
