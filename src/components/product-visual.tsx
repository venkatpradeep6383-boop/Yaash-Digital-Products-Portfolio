"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import type { Project } from "@/data/site";

export function ProductVisual({ project, large = false }: { project: Project; large?: boolean }) {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const swipeStart = useRef<number | null>(null);
  const mobileSwipeStart = useRef<number | null>(null);

  if (project.slug === "dealup-crm") {
    const desktopFrames = [
      ["/images/dealup-desktop-overview.png", "Overview", "Executive performance"],
      ["/images/dealup-desktop-pipeline.png", "Sales pipeline", "Opportunity control"],
      ["/images/dealup-desktop-leaderboard.png", "Leaderboard", "Team performance"],
      ["/images/dealup-desktop-costs.png", "Cost centre", "Financial clarity"],
    ] as const;
    const mobileFrames = [
      ["/images/dealup-mobile-overview.png", "Mobile overview"],
      ["/images/dealup-mobile-pipeline.png", "Mobile sales pipeline"],
      ["/images/dealup-mobile-leaderboard.png", "Mobile leaderboard"],
      ["/images/dealup-mobile-costs.png", "Mobile cost centre"],
    ] as const;

    return <div className={`product-ui dk-site-showcase dealup-showcase ${large ? "large" : ""}`}>
      <div className="dk-showcase-intro"><div><span>SALES INTELLIGENCE / RESPONSIVE SYSTEM</span><h2>Business performance.<br/><em>Clear at every scale.</em></h2></div><p>Dense sales intelligence becomes a focused decision surface across desktop and mobile without losing the numbers that matter.</p></div>
      <section className="dk-desktop-carousel" aria-label="Dealup desktop screens"><div className="dk-carousel-viewport" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") setDesktopIndex((current) => (current - 1 + desktopFrames.length) % desktopFrames.length); if (event.key === "ArrowRight") setDesktopIndex((current) => (current + 1) % desktopFrames.length); }} onPointerDown={(event) => { swipeStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (swipeStart.current === null) return; const distance = event.clientX - swipeStart.current; if (Math.abs(distance) > 45) setDesktopIndex((current) => distance < 0 ? (current + 1) % desktopFrames.length : (current - 1 + desktopFrames.length) % desktopFrames.length); swipeStart.current = null; }}><div className="dk-carousel-track" style={{ transform: `translateX(-${desktopIndex * 100}%)` }}>{desktopFrames.map(([src, label, note], index) => <figure className="dk-browser-frame" key={src} aria-hidden={desktopIndex !== index}><figcaption><span>0{index + 1}</span><b>{label}</b><i>{note}</i></figcaption><div className="dk-laptop-mockup"><div className="dk-laptop-screen"><Image src={src} alt={`Dealup CRM — ${label}`} fill sizes="(max-width: 900px) 67vw, 53vw" priority={index === 0} /></div><Image className="dk-laptop-hardware" src="/images/laptop-frame-realistic.png" alt="" fill sizes="(max-width: 900px) 94vw, 74vw" priority aria-hidden="true" /><span className="dk-live-tag">DEALUP</span></div></figure>)}</div></div><div className="dk-carousel-controls"><button type="button" aria-label="Show previous desktop screen" onClick={() => setDesktopIndex((current) => (current - 1 + desktopFrames.length) % desktopFrames.length)}>←</button><div className="dk-carousel-dots" aria-label={`Screen ${desktopIndex + 1} of ${desktopFrames.length}`}>{desktopFrames.map(([, label], index) => <button type="button" key={label} className={desktopIndex === index ? "active" : ""} aria-label={`Show ${label}`} aria-current={desktopIndex === index ? "true" : undefined} onClick={() => setDesktopIndex(index)} />)}</div><button type="button" aria-label="Show next desktop screen" onClick={() => setDesktopIndex((current) => (current + 1) % desktopFrames.length)}>→</button></div></section>
      <section className="dk-mobile-row" aria-label="Dealup mobile screens"><div className="dk-mobile-copy"><span>02 / MOBILE INTELLIGENCE</span><h3>Complex data.<br/><em>Quietly organized.</em></h3><p>Wide dashboards and tables become structured cards, swipeable summaries, and thumb-friendly actions while preserving the original hierarchy.</p><div className="dk-mobile-features"><span>Overview</span><span>Pipeline</span><span>Leaderboard</span><span>Costs</span></div><div className="dk-mobile-progress"><b>0{mobileIndex + 1}</b><i><span style={{ width: `${((mobileIndex + 1) / mobileFrames.length) * 100}%` }} /></i><small>0{mobileFrames.length}</small></div></div><div className="dk-mobile-stage"><div className="dk-phone-glow"/><div className="dk-phone-viewer dealup-phone-viewer" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") setMobileIndex((current) => (current - 1 + mobileFrames.length) % mobileFrames.length); if (event.key === "ArrowRight") setMobileIndex((current) => (current + 1) % mobileFrames.length); }} onPointerDown={(event) => { mobileSwipeStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (mobileSwipeStart.current === null) return; const distance = event.clientX - mobileSwipeStart.current; if (Math.abs(distance) > 35) setMobileIndex((current) => distance < 0 ? (current + 1) % mobileFrames.length : (current - 1 + mobileFrames.length) % mobileFrames.length); mobileSwipeStart.current = null; }}><div className="dk-phone-track" style={{ transform: `translateX(-${mobileIndex * 100}%)` }}>{mobileFrames.map(([src, label]) => <figure className="dk-phone-frame dealup-phone-frame" key={src}><div><Image src={src} alt={`Dealup CRM — ${label}`} fill sizes="(max-width: 700px) 78vw, 360px" /></div></figure>)}</div></div><p className="dk-drag-hint">← Drag to explore →</p><div className="dk-mobile-controls"><button type="button" aria-label="Previous mobile screen" onClick={() => setMobileIndex((current) => (current - 1 + mobileFrames.length) % mobileFrames.length)}>←</button>{mobileFrames.map(([, label], index) => <button type="button" key={label} className={mobileIndex === index ? "active" : ""} aria-label={`Show ${label}`} onClick={() => setMobileIndex(index)} />)}<button type="button" aria-label="Next mobile screen" onClick={() => setMobileIndex((current) => (current + 1) % mobileFrames.length)}>→</button></div></div></section>
    </div>;
  }

  if (project.slug === "dk-detailing-pos") {
    const desktopFrames = [
      ["/images/dk-detailing-pos-dashboard.png", "POS checkout", "Front desk flow"],
      ["/images/dk-pos-desktop-dashboard.png", "Revenue dashboard", "Studio performance"],
      ["/images/dk-pos-desktop-jobs.png", "Live job board", "Workshop visibility"],
      ["/images/dk-pos-desktop-billing.png", "Invoice detail", "Billing and collection"],
    ] as const;
    const mobileFrames = [
      ["/images/dk-pos-mobile-dashboard.jpeg", "Operations dashboard"],
      ["/images/dk-pos-mobile-jobs.jpeg", "Live job board"],
      ["/images/dk-pos-mobile-billing.jpeg", "Invoice and payment detail"],
      ["/images/dk-pos-mobile-reminders.jpeg", "Service reminders"],
    ] as const;

    return <div className={`product-ui dk-site-showcase dk-pos-showcase ${large ? "large" : ""}`}>
      <div className="dk-showcase-intro"><div><span>STUDIO OS / OPERATIONS SYSTEM</span><h2>Every studio task.<br/><em>One operating view.</em></h2></div><p>Revenue, workshop progress, payments, and customer follow-ups move through one focused detailing workflow.</p></div>
      <section className="dk-desktop-carousel dk-pos-desktop" aria-label="DK Detailing POS desktop screens">
        <div className="dk-carousel-viewport" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") setDesktopIndex((current) => (current - 1 + desktopFrames.length) % desktopFrames.length); if (event.key === "ArrowRight") setDesktopIndex((current) => (current + 1) % desktopFrames.length); }} onPointerDown={(event) => { swipeStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (swipeStart.current === null) return; const distance = event.clientX - swipeStart.current; if (Math.abs(distance) > 45) setDesktopIndex((current) => distance < 0 ? (current + 1) % desktopFrames.length : (current - 1 + desktopFrames.length) % desktopFrames.length); swipeStart.current = null; }}>
          <div className="dk-carousel-track" style={{ transform: `translateX(-${desktopIndex * 100}%)` }}>{desktopFrames.map(([src, label, note], index) => <figure className="dk-browser-frame" key={src} aria-hidden={desktopIndex !== index}><figcaption><span>0{index + 1}</span><b>{label}</b><i>{note}</i></figcaption><div className="dk-laptop-mockup"><div className="dk-laptop-screen"><Image src={src} alt={`DK Detailing POS — ${label}`} fill sizes="(max-width: 900px) 67vw, 53vw" priority={index === 0} /></div><Image className="dk-laptop-hardware" src="/images/laptop-frame-realistic.png" alt="" fill sizes="(max-width: 900px) 94vw, 74vw" priority aria-hidden="true" /><span className="dk-live-tag">STUDIO OS</span></div></figure>)}</div>
        </div>
        <div className="dk-carousel-controls"><button type="button" aria-label="Show previous desktop screen" onClick={() => setDesktopIndex((current) => (current - 1 + desktopFrames.length) % desktopFrames.length)}>←</button><div className="dk-carousel-dots" aria-label={`Screen ${desktopIndex + 1} of ${desktopFrames.length}`}>{desktopFrames.map(([, label], index) => <button type="button" key={label} className={desktopIndex === index ? "active" : ""} aria-label={`Show ${label}`} aria-current={desktopIndex === index ? "true" : undefined} onClick={() => setDesktopIndex(index)} />)}</div><button type="button" aria-label="Show next desktop screen" onClick={() => setDesktopIndex((current) => (current + 1) % desktopFrames.length)}>→</button></div>
      </section>
      <section className="dk-mobile-row" aria-label="DK Detailing POS mobile screens"><div className="dk-mobile-copy"><span>02 / MOBILE OPERATIONS</span><h3>The studio,<br/><em>in your pocket.</em></h3><p>Four complete operational views, presented at their natural mobile height so every control and detail remains visible.</p><div className="dk-mobile-features"><span>Dashboard</span><span>Jobs</span><span>Billing</span><span>Reminders</span></div><div className="dk-mobile-progress"><b>0{mobileIndex + 1}</b><i><span style={{ width: `${((mobileIndex + 1) / mobileFrames.length) * 100}%` }} /></i><small>0{mobileFrames.length}</small></div></div><div className="dk-mobile-stage"><div className="dk-phone-glow"/><div className="dk-phone-viewer dk-pos-phone-viewer" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") setMobileIndex((current) => (current - 1 + mobileFrames.length) % mobileFrames.length); if (event.key === "ArrowRight") setMobileIndex((current) => (current + 1) % mobileFrames.length); }} onPointerDown={(event) => { mobileSwipeStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (mobileSwipeStart.current === null) return; const distance = event.clientX - mobileSwipeStart.current; if (Math.abs(distance) > 35) setMobileIndex((current) => distance < 0 ? (current + 1) % mobileFrames.length : (current - 1 + mobileFrames.length) % mobileFrames.length); mobileSwipeStart.current = null; }}><div className="dk-phone-track" style={{ transform: `translateX(-${mobileIndex * 100}%)` }}>{mobileFrames.map(([src, label]) => <figure className="dk-phone-frame dk-pos-phone-frame" key={src}><div><Image src={src} alt={`DK Detailing POS — ${label}`} fill sizes="(max-width: 700px) 78vw, 360px" /></div></figure>)}</div></div><p className="dk-drag-hint">← Drag to explore →</p><div className="dk-mobile-controls"><button type="button" aria-label="Previous mobile screen" onClick={() => setMobileIndex((current) => (current - 1 + mobileFrames.length) % mobileFrames.length)}>←</button>{mobileFrames.map(([, label], index) => <button type="button" key={label} className={mobileIndex === index ? "active" : ""} aria-label={`Show ${label}`} onClick={() => setMobileIndex(index)} />)}<button type="button" aria-label="Next mobile screen" onClick={() => setMobileIndex((current) => (current + 1) % mobileFrames.length)}>→</button></div></div></section>
    </div>;
  }

  if (project.slug === "dk-detailing-website") {
    const desktopFrames = [
      ["/images/dk-site-desktop-01.png", "Homepage hero", "Brand impact", "hero"],
      ["/images/dk-site-desktop-02.png", "Service discovery", "Clear pathways", "services"],
      ["/images/dk-car-comparison-full.jpg", "Transformation", "Interactive proof", "results"],
    ] as const;
    const mobileFrames = [
      ["/images/dk-site-mobile-01.png", "Mobile homepage"],
      ["/images/dk-site-mobile-02.png", "Mobile services"],
    ] as const;

    return <div className={`product-ui dk-site-showcase ${large ? "large" : ""}`}>
      <div className="dk-showcase-intro"><div><span>LIVE WEBSITE / RESPONSIVE SYSTEM</span><h2>Not a screenshot.<br/><em>A complete digital showroom.</em></h2></div><p>The experience moves from visual desire to service clarity, proof of craft, and a direct studio consultation.</p></div>
      <section className="dk-desktop-carousel" aria-label="Desktop website screens">
        <div
          className="dk-carousel-viewport"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setDesktopIndex((current) => (current - 1 + desktopFrames.length) % desktopFrames.length);
            if (event.key === "ArrowRight") setDesktopIndex((current) => (current + 1) % desktopFrames.length);
          }}
          onPointerDown={(event) => { swipeStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
          onPointerUp={(event) => {
            if (swipeStart.current === null) return;
            const distance = event.clientX - swipeStart.current;
            if (Math.abs(distance) > 45) setDesktopIndex((current) => distance < 0 ? (current + 1) % desktopFrames.length : (current - 1 + desktopFrames.length) % desktopFrames.length);
            swipeStart.current = null;
          }}
        >
          <div className="dk-carousel-track" style={{ transform: `translateX(-${desktopIndex * 100}%)` }}>
            {desktopFrames.map(([src, label, note, frame], index) => <figure className={`dk-browser-frame frame-${frame}`} key={src} aria-hidden={desktopIndex !== index}><figcaption><span>0{index + 1}</span><b>{label}</b><i>{note}</i></figcaption><div className="dk-laptop-mockup"><div className="dk-laptop-screen">{frame === "results" ? <div className="dk-comparison"><Image className="dk-comparison-after" src={src} alt="DK Detailing car after paint correction" fill sizes="(max-width: 900px) 67vw, 53vw" /><div className="dk-comparison-before" style={{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }}><Image src={src} alt="DK Detailing car before paint correction" fill sizes="(max-width: 900px) 67vw, 53vw" /></div><span className="dk-compare-label before">Before</span><span className="dk-compare-label after">After</span><span className="dk-compare-line" style={{ left: `${comparisonPosition}%` }}><i>‹ ›</i></span><input className="dk-compare-range" type="range" min="12" max="88" value={comparisonPosition} aria-label="Compare car before and after detailing" onChange={(event) => setComparisonPosition(Number(event.target.value))} onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} /></div> : <Image src={src} alt={`DK Detailing website — ${label}`} fill sizes="(max-width: 900px) 67vw, 53vw" priority={index === 0} />}</div><Image className="dk-laptop-hardware" src="/images/laptop-frame-realistic.png" alt="" fill sizes="(max-width: 900px) 94vw, 74vw" priority aria-hidden="true" /><span className="dk-live-tag">LIVE UI</span></div></figure>)}
          </div>
        </div>
        <div className="dk-carousel-controls">
          <button type="button" aria-label="Show previous desktop screen" onClick={() => setDesktopIndex((current) => (current - 1 + desktopFrames.length) % desktopFrames.length)}>←</button>
          <div className="dk-carousel-dots" aria-label={`Screen ${desktopIndex + 1} of ${desktopFrames.length}`}>{desktopFrames.map(([, label], index) => <button type="button" key={label} className={desktopIndex === index ? "active" : ""} aria-label={`Show ${label}`} aria-current={desktopIndex === index ? "true" : undefined} onClick={() => setDesktopIndex(index)} />)}</div>
          <button type="button" aria-label="Show next desktop screen" onClick={() => setDesktopIndex((current) => (current + 1) % desktopFrames.length)}>→</button>
        </div>
      </section>
      <section className="dk-mobile-row" aria-label="Mobile website screens"><div className="dk-mobile-copy"><span>02 / RESPONSIVE DETAIL</span><h3>Built for<br/><em>every screen.</em></h3><p>The same premium experience, reworked for touch—clear hierarchy, effortless navigation, and a direct path to the studio.</p><div className="dk-mobile-features"><span>Touch-first</span><span>Responsive type</span><span>Fast conversion</span></div><div className="dk-mobile-progress"><b>0{mobileIndex + 1}</b><i><span style={{ width: `${((mobileIndex + 1) / mobileFrames.length) * 100}%` }} /></i><small>0{mobileFrames.length}</small></div></div><div className="dk-mobile-stage"><div className="dk-phone-glow"/><div className="dk-phone-viewer" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") setMobileIndex((current) => (current - 1 + mobileFrames.length) % mobileFrames.length); if (event.key === "ArrowRight") setMobileIndex((current) => (current + 1) % mobileFrames.length); }} onPointerDown={(event) => { mobileSwipeStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (mobileSwipeStart.current === null) return; const distance = event.clientX - mobileSwipeStart.current; if (Math.abs(distance) > 35) setMobileIndex((current) => distance < 0 ? (current + 1) % mobileFrames.length : (current - 1 + mobileFrames.length) % mobileFrames.length); mobileSwipeStart.current = null; }}><div className="dk-phone-track" style={{ transform: `translateX(-${mobileIndex * 100}%)` }}>{mobileFrames.map(([src, label]) => <figure className="dk-phone-frame" key={src}><div><Image src={src} alt={`DK Detailing website — ${label}`} fill sizes="(max-width: 700px) 68vw, 310px" /></div></figure>)}</div></div><p className="dk-drag-hint">← Drag to explore →</p><div className="dk-mobile-controls"><button type="button" aria-label="Previous mobile screen" onClick={() => setMobileIndex((current) => (current - 1 + mobileFrames.length) % mobileFrames.length)}>←</button>{mobileFrames.map(([, label], index) => <button type="button" key={label} className={mobileIndex === index ? "active" : ""} aria-label={`Show ${label}`} onClick={() => setMobileIndex(index)} />)}<button type="button" aria-label="Next mobile screen" onClick={() => setMobileIndex((current) => (current + 1) % mobileFrames.length)}>→</button></div></div></section>
    </div>;
  }

  if (project.slug === "track-grow") {
    return <div className={`product-ui original-ui track-grow-fallback ${large ? "large" : ""}`}><span>TRACK GROW</span><small>Product interface coming soon</small></div>;
  }

  const projectImages: Partial<Record<Project["slug"], string>> = {
    "drip-clothing-pos": "/images/drip-clothing-pos-dashboard.png",
  };
  const imageSource = projectImages[project.slug] ?? "/images/original-software-showcase.png";

  return (
    <div className={`product-ui original-ui original-ui-${project.slug} ${large ? "large" : ""}`}>
      <Image
        className="original-product-image"
        src={imageSource}
        alt={`${project.name} original software interface`}
        fill
        sizes={large ? "(max-width: 900px) 100vw, 70vw" : "(max-width: 900px) 100vw, 50vw"}
      />
    </div>
  );
}
