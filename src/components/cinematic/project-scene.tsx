"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { CinematicProject } from "@/data/cinematic-projects";
import { MagneticLink } from "./magnetic-link";

export function ProjectScene({ project }: { project: CinematicProject }) {
  const isDk = project.slug === "dk-detailing-website";
  const isDkPos = project.slug === "dk-detailing-pos";
  const supportImages = project.layers?.slice(0, 2) ?? (project.screenshot ? [project.screenshot, project.screenshot] : []);
  return <section id={project.slug} className={`project-scene project-${project.slug} tone-${project.tone}`} data-project={project.number}>
    <span className="scene-watermark" aria-hidden="true">{project.number}</span>
    <div className="scene-coordinates" aria-hidden="true"><span>YDP / 2026</span><span>COIMBATORE / INDIA</span></div>
    <div className="scene-atmosphere" aria-hidden="true"><i /><i /><i /></div>
    <div className="scene-copy">
      <p className="scene-index"><span>{project.number}</span> / 06 — SELECTED SYSTEM</p>
      <h2>{project.name.split(" ").map((word) => <span className="scene-title-word" key={word}><span>{word}</span></span>)}</h2>
      <p className="scene-category">{project.category}</p>
      <p className="scene-description">{project.description}</p>
      <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      <div className="scene-actions"><MagneticLink href={`/work/${project.slug}`}>View project</MagneticLink>{project.website && <MagneticLink href={project.website} inverted>Visit website</MagneticLink>}</div>
    </div>
    {!isDk && !isDkPos && <div className="support-rail" aria-hidden="true">
      {supportImages.map((layer, index) => <div className={`interface-layer layer-${index + 1} ${project.layers ? "" : "is-crop"}`} key={`${layer}-${index}`}><Image src={layer} alt="" fill sizes="24vw" /><span>{project.slug === "dk-detailing-website" ? (index === 0 ? "MOBILE / DETAIL VIEW" : "SERVICE / ENQUIRY") : (project.features[index] ?? project.category)}</span></div>)}
      {!project.screenshot && <><div className="tracking-support status-panel"><small>FIELD STATUS</small><strong>28</strong><span>ACTIVE / DEMO</span></div><div className="tracking-support activity-panel"><small>LIVE ACTIVITY</small><i/><i/><i/><span>ROUTE SIGNAL</span></div></>}
    </div>}
    <div className={`device-stage project-reveal-stage dk-reveal-stage ${project.screenshot ? "" : "map-stage"}`}>
      <div className="device-glow" />
      <div className="device-depth-plane plane-a" aria-hidden="true" />
      <div className="device-depth-plane plane-b" aria-hidden="true" />
      <span className="dk-stage-number" aria-hidden="true">{project.number}</span><div className="dk-stage-labels" aria-hidden="true"><span>DIGITAL PRODUCT</span><span>LIVE SYSTEM / {project.number}</span></div>
      <div className="ui-annotations" aria-hidden="true">{project.features.slice(0, 3).map((feature, index) => <span className={`annotation-${index + 1}`} key={feature}><i />{feature}</span>)}</div>
      {project.screenshot ? <div className={`device-tilt ${isDk ? "dk-camera" : ""} ${isDkPos ? "pos-camera" : ""}`}><div className={`device-shell ${isDk ? "dk-product-object" : ""} ${isDkPos ? "pos-product-object" : ""}`}><div className="device-bar"><span/><span/><span/><b>{project.name}</b></div><div className={`device-screen screen-${project.slug}`}><Image src={project.screenshot} alt={`${project.name} product interface`} fill sizes="(max-width: 900px) 94vw, 66vw" />{isDk && <div className="dk-depth-fragments" aria-hidden="true"><i className="dk-fragment dk-fragment-nav"/><i className="dk-fragment dk-fragment-hero"/><i className="dk-fragment dk-fragment-service"/><i className="dk-fragment dk-fragment-detail"/></div>}{isDkPos && <div className="pos-depth-fragments" aria-hidden="true"><i className="pos-fragment pos-fragment-nav"/><i className="pos-fragment pos-fragment-kpi"/><i className="pos-fragment pos-fragment-customer"/><i className="pos-fragment pos-fragment-billing"/></div>}</div><div className="device-base" /></div></div> : <div className="device-tilt"><div className="track-placeholder"><div className="map-grid"/><span className="route route-a"/><span className="route route-b"/><i/><i/><i/><div><small>LIVE FIELD SIGNAL · DEMO VISUALIZATION</small><strong>TRACK GROW</strong><p>28 ACTIVE <b>04 IDLE</b> 02 OFFLINE</p></div></div></div>}
      <div className="feature-orbit" aria-hidden="true">{project.features.slice(0, 5).map((feature, index) => <span style={{ "--i": index } as CSSProperties} key={feature}>{feature}</span>)}</div>
    </div>
  </section>;
}
