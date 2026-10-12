"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cinematicProjects } from "@/data/cinematic-projects";
import { contact } from "@/data/site";
import { ProjectScene } from "./project-scene";
import { MagneticLink } from "./magnetic-link";
import { ProductOpening } from "./product-opening";
import { audioEngine } from "@/lib/audio-engine-reference-v2";



export function CinematicPortfolio() {
  const [active, setActive] = useState(0);
  const previousActive = useRef(0);
  useEffect(() => { if (active !== previousActive.current) { audioEngine.project(active > previousActive.current ? 1 : -1); previousActive.current = active; } }, [active]);
  function navigateToProject(event: React.MouseEvent<HTMLAnchorElement>, index: number) {
    if (matchMedia("(max-width: 820px), (prefers-reduced-motion: reduce)").matches) return;
    const workTrigger = ScrollTrigger.getAll().find((trigger) => (trigger.trigger as HTMLElement | undefined)?.classList.contains("project-journey"));
    if (!workTrigger) return;
    event.preventDefault();
    const progress = index / (cinematicProjects.length - 1);
    window.scrollTo({ top: workTrigger.start + (workTrigger.end - workTrigger.start) * progress, behavior: "smooth" });
  }
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
      {
        const scenes = gsap.utils.toArray<HTMLElement>(".project-scene");
        const master = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".project-journey", start: "top top", end: `+=${scenes.length * 125}%`, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: () => {
              const position = Math.max(0, (master.time() - .45) / 1.15);
              const index = Math.min(scenes.length - 1, Math.round(position));
              setActive(index);
              scenes.forEach((scene, sceneIndex) => scene.classList.toggle("is-active", sceneIndex === index));
              document.documentElement.style.setProperty("--active-project-progress", String(position - Math.floor(position)));
            },
          },
        });
        gsap.set(scenes, { position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" });
        gsap.set(scenes[0], { opacity: 1, pointerEvents: "auto" });
        gsap.set(scenes[0].querySelectorAll(".scene-title-word > span"), { yPercent: 0 });
        const firstVisual = scenes[0].querySelectorAll(".device-shell, .track-placeholder");
        const dkCamera = scenes[0].querySelector(".dk-camera");
        const dkFragments = scenes[0].querySelectorAll(".dk-fragment");
        const firstCopy = scenes[0].querySelector(".scene-copy");
        master
          .fromTo(firstVisual, { xPercent: 8, z: -420, scale: .72, rotateX: 5, rotateY: 8, opacity: .2 }, { xPercent: 0, z: 0, scale: 1, rotateX: 0, rotateY: 0, opacity: 1, duration: .42, ease: "power3.out" }, 0)
          .to(firstCopy, { xPercent: -4, scale: .93, opacity: .7, duration: .2 }, .34)
          .to(dkFragments, { autoAlpha: 1, x: (index) => [-8, 12, 18, -12][index], y: (index) => [-6, -12, 9, 14][index], z: (index) => [70, 105, 135, 165][index], rotateX: (index) => [0, -1.5, 1.5, 2][index], rotateY: (index) => [-1, 2, -2, 1.5][index], stagger: .025, duration: .18, ease: "power2.out" }, .48)
          .to(dkCamera, { xPercent: -1.5, rotateY: -1.5, duration: .15 }, .64)
          .to(dkFragments, { autoAlpha: 0, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, stagger: { each: .018, from: "end" }, duration: .17, ease: "power2.inOut" }, .77)
          .to(dkCamera, { xPercent: 0, rotateY: 0, duration: .16 }, .79);
        const exits = [
          { xPercent: -42, yPercent: 0, rotateX: 0, rotateY: -9 },
          { xPercent: 38, yPercent: 3, rotateX: 0, rotateY: 8 },
          { xPercent: 0, yPercent: -38, rotateX: 8, rotateY: 0 },
          { xPercent: -40, yPercent: 0, rotateX: 0, rotateY: -10 },
        ];
        scenes.forEach((scene, index) => {
          if (index === scenes.length - 1) return;
          const next = scenes[index + 1];
          const currentVisual = scene.querySelectorAll(".device-shell, .track-placeholder");
          const nextVisual = next.querySelectorAll(".device-shell, .track-placeholder");
          const currentSupports = scene.querySelectorAll(".support-rail > *");
          const nextSecondary = next.querySelector(".support-rail > :first-child");
          const nextDetail = next.querySelector(".support-rail > :nth-child(2)");
          const currentCopy = scene.querySelector(".scene-copy");
          const nextCopy = next.querySelector(".scene-copy");
          const nextWords = next.querySelectorAll(".scene-title-word > span");
          const posFragments = next.querySelectorAll(".pos-fragment");
          const posCamera = next.querySelector(".pos-camera");
          const isPosPrototype = next.classList.contains("project-dk-detailing-pos");
          const direction = index % 2 === 0 ? -1 : 1;
          const exit = exits[index];
          const at = 1 + index * 1.15;
          master
            .set(next, { zIndex: index + 2, pointerEvents: "auto" }, at)
            .fromTo(next, { opacity: 0 }, { opacity: 1, duration: .9 }, at)
            .to(currentSupports, { x: -90, z: -140, opacity: 0, stagger: .035, duration: .32 }, at)
            .to(currentVisual, { ...exit, z: -360, scale: .7, opacity: isPosPrototype ? 0 : .12, duration: isPosPrototype ? .38 : .88 }, at + (isPosPrototype ? .02 : .08))
            .to(currentCopy, { xPercent: direction * 28, scale: .84, opacity: 0, duration: .54 }, at)
            .fromTo(nextVisual, { xPercent: direction * -13, yPercent: 3, z: -360, scale: .76, rotateX: 3, rotateY: direction * -8, opacity: isPosPrototype ? 0 : .18 }, { xPercent: 0, yPercent: 0, z: 0, scale: 1, rotateX: 0, rotateY: 0, opacity: 1, duration: isPosPrototype ? .5 : .9, ease: "power3.out" }, at + (isPosPrototype ? .32 : .16))
            .fromTo(nextSecondary, { x: -90, z: -140, scale: .86, opacity: 0 }, { x: 0, z: -70, scale: 1, opacity: 1, duration: .36 }, at + .4)
            .fromTo(nextDetail, { y: 42, z: -190, scale: .74, opacity: 0 }, { y: 0, z: -115, scale: 1, opacity: 1, duration: .3 }, at + .58)
            .fromTo(nextCopy, { xPercent: direction * -18, scale: 1, opacity: 0 }, { xPercent: 0, scale: 1, opacity: 1, duration: .48 }, at + .18)
            .fromTo(nextWords, { yPercent: 115 }, { yPercent: 0, stagger: .035, duration: .4, ease: "power3.out" }, at + .2)
            .to(nextCopy, { xPercent: direction * 6, scale: .9, opacity: .62, duration: .28 }, at + .68)
            .set(scene, { opacity: 0, pointerEvents: "none" }, at + .92);
          if (isPosPrototype) {
            master
              .to(posFragments, { autoAlpha: 1, x: (fragmentIndex) => [-5, 11, 18, -12][fragmentIndex], y: (fragmentIndex) => [-5, -12, 7, 14][fragmentIndex], z: (fragmentIndex) => [45, 85, 125, 165][fragmentIndex], rotateX: (fragmentIndex) => [0, -1, 1.5, 2][fragmentIndex], rotateY: (fragmentIndex) => [-1, 1.5, -2, 2][fragmentIndex], stagger: .025, duration: .17, ease: "power2.out" }, at + .78)
              .to(posCamera, { xPercent: -1.5, rotateY: -2, rotateX: .8, duration: .14 }, at + .91)
              .to(posFragments, { autoAlpha: 0, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, stagger: { each: .015, from: "end" }, duration: .14, ease: "power2.inOut" }, at + 1)
              .to(posCamera, { xPercent: 0, rotateY: 0, rotateX: 0, duration: .1 }, at + 1.03);
          }
        });
      }
      gsap.timeline({ scrollTrigger: { trigger: ".final-statement", start: "top 75%", end: "bottom top", scrub: true } })
        .to(".final-statement", { backgroundColor: "#292c31", color: "#f2efe8", ease: "none" }, 0)
        .to(".final-statement > p, .practice-capabilities", { color: "#c5c7c8", borderColor: "#55595f", ease: "none" }, 0);
      const pointer = (event: PointerEvent) => {
        const x = (event.clientX / innerWidth - .5) * 2;
        const y = (event.clientY / innerHeight - .5) * 2;
        gsap.to(".project-scene.is-active .device-tilt", { rotateY: x * 1.8, rotateX: y * -1.4, duration: 1.1, overwrite: "auto", ease: "power2.out" });
        gsap.to(".project-scene.is-active > .support-rail", { x: x * -7, y: y * -5, rotateY: x * -.8, duration: 1.35, overwrite: "auto", ease: "power2.out" });
        gsap.to(".project-scene.is-active .dk-depth-fragments", { x: x * 4, y: y * 3, duration: 1.25, overwrite: "auto", ease: "power2.out" });
        gsap.to(".project-scene.is-active .pos-depth-fragments", { x: x * 4, y: y * 3, duration: 1.25, overwrite: "auto", ease: "power2.out" });
        gsap.to(".cinematic-intro .ambient-canvas", { x: x * 14, y: y * 10, duration: 1.5, overwrite: "auto" });
      };
      window.addEventListener("pointermove", pointer, { passive: true });
      return () => window.removeEventListener("pointermove", pointer);
    });
    const observers: ScrollTrigger[] = [];
    ScrollTrigger.refresh();
    return () => { observers.forEach((observer) => observer.kill()); context.revert(); document.documentElement.style.removeProperty("--active-project-progress"); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return <main className="cinematic-site">

    <aside className="project-progress" aria-label="Project progress">{cinematicProjects.map((project, index) => <a className={active === index ? "active" : ""} href={`#${project.slug}`} onClick={(event) => navigateToProject(event, index)} key={project.slug}><span>{project.number}</span><i aria-hidden="true"/><b>{project.short}</b></a>)}</aside>
    <ProductOpening />
    <div id="work" className="project-journey">{cinematicProjects.map((project) => <ProjectScene project={project} key={project.slug}/>)}</div>
    <section id="about" className="final-statement"><p>THE PRACTICE / DIGITAL PRODUCT BUILDER</p><h2><span>I DON&apos;T JUST</span><span>BUILD WEBSITES.</span><span>I BUILD SYSTEMS</span><span><em>BUSINESSES ACTUALLY USE.</em></span></h2><div className="practice-capabilities" aria-label="Capabilities"><span>WEBSITES</span><span>CRM</span><span>POS</span><span>BUSINESS SYSTEMS</span><span>AUTOMATION</span></div><div><div className="final-actions"><MagneticLink href="#work">View my work</MagneticLink><MagneticLink href="#contact" inverted>Let&apos;s work together</MagneticLink></div></div></section>
    <footer id="contact" className="cinematic-footer"><p><span>HAVE A</span><span>SYSTEM</span><span>WORTH</span><span>BUILDING?</span></p>{contact.whatsappHref && <a className="whatsapp-contact" href={contact.whatsappHref} target="_blank" rel="noreferrer" aria-label="Start a WhatsApp conversation"><span className="whatsapp-signal" aria-hidden="true"><i/><i/><i/><svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6 0-.2 0-.4-.1-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.9.7.8.3 1.6.2 2.2.1.6-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.2-.3-.3-.6-.5Z"/></svg></span><span className="whatsapp-copy"><small>AVAILABLE FOR NEW PROJECTS</small><strong>Build something useful with us</strong><em>Start a conversation directly on WhatsApp</em></span><b><span>OPEN WHATSAPP</span>↗</b></a>}<div><span>YAASH DIGITAL PRODUCTS © 2026</span><a href="#intro">BACK TO TOP ↑</a></div></footer>
  </main>;
}
