"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cinematicProjects } from "@/data/cinematic-projects";
import { contact } from "@/data/site";
import { ProjectScene } from "./project-scene";
import { MagneticLink } from "./magnetic-link";
import { BrandLaunch } from "./brand-launch";

const AmbientCanvas = dynamic(() => import("./ambient-canvas").then((module) => module.AmbientCanvas), { ssr: false });

export function CinematicPortfolio() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = matchMedia("(max-width: 820px)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: compact ? 0.75 : 1.1, smoothWheel: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    const context = gsap.context(() => {
      gsap.fromTo(".intro-line > span", { yPercent: 120 }, { yPercent: 0, stagger: .12, duration: 1.2, ease: "power4.out", delay: .2 });
      gsap.to(".intro-sequence", { opacity: 0, scale: .94, scrollTrigger: { trigger: ".cinematic-intro", start: "top top", end: "bottom 35%", scrub: true } });
      if (!compact) document.querySelectorAll<HTMLElement>(".project-scene").forEach((scene) => {
        const screen = scene.querySelector(".device-stage");
        const copy = scene.querySelector(".scene-copy");
        const timeline = gsap.timeline({ scrollTrigger: { trigger: scene, start: "top top", end: "+=160%", scrub: 1, pin: true, anticipatePin: 1 } });
        timeline
          .fromTo(copy, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: .32 })
          .fromTo(screen, { scale: .68, rotateX: 10, y: 100 }, { scale: 1, rotateX: 0, y: 0, duration: .62 }, 0);
      });
    });
    const observers = cinematicProjects.map((project, index) => ScrollTrigger.create({ trigger: `#${project.slug}`, start: "top center", end: "bottom center", onToggle: ({ isActive }) => { if (isActive) setActive(index); } }));
    ScrollTrigger.refresh();
    return () => { observers.forEach((observer) => observer.kill()); context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return <main className="cinematic-site">
    <BrandLaunch />
    <aside className="project-progress" aria-label="Project progress">{cinematicProjects.map((project, index) => <a className={active === index ? "active" : ""} href={`#${project.slug}`} key={project.slug}><span>{project.number}</span>{project.short}</a>)}</aside>
    <section id="intro" className="cinematic-intro"><AmbientCanvas/><div className="intro-sequence"><h1><span className="intro-line"><span>BUILDING DIGITAL PRODUCTS</span></span><span className="intro-line"><span>FOR REAL BUSINESSES</span></span></h1><div className="intro-meta"><span>WEBSITES</span><span>BUSINESS SYSTEMS</span><span>CRM & POS</span></div></div><a className="scroll-signal" href="#work">ENTER THE WORK <i>↓</i></a></section>
    <div id="work" className="project-journey">{cinematicProjects.map((project) => <ProjectScene project={project} key={project.slug}/>)}</div>
    <section id="about" className="final-statement"><p>THE PRACTICE</p><h2>I BUILD DIGITAL SYSTEMS<br/>THAT SOLVE <em>REAL BUSINESS PROBLEMS.</em></h2><div><div className="final-actions"><MagneticLink href="#work">View my work</MagneticLink><MagneticLink href="#contact" inverted>Let&apos;s work together</MagneticLink></div></div></section>
    <footer id="contact" className="cinematic-footer"><p>HAVE A SYSTEM WORTH BUILDING?</p><a href={`mailto:${contact.email ?? "venkatpradeep6383@gmail.com"}`}>{contact.email ?? "venkatpradeep6383@gmail.com"}</a>{contact.whatsappHref && <a className="whatsapp-contact" href={contact.whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6 0-.2 0-.4-.1-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.9.7.8.3 1.6.2 2.2.1.6-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.3-.6-.5Z"/></svg><span>WhatsApp: +91 63805 56785</span><b>CHAT NOW →</b></a>}<div><span>YAASH DIGITAL PRODUCTS © 2026</span><a href="#intro">BACK TO TOP ↑</a></div></footer>
  </main>;
}
