"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { CinematicProject } from "@/data/cinematic-projects";
import { MagneticLink } from "./magnetic-link";

export function ProjectScene({ project }: { project: CinematicProject }) {
  return <section id={project.slug} className={`project-scene tone-${project.tone}`} data-project={project.number}>
    <div className="scene-atmosphere" aria-hidden="true"><i /><i /><i /></div>
    <div className="scene-copy">
      <p className="scene-index"><span>{project.number}</span> / 05 — SELECTED SYSTEM</p>
      <h2>{project.name}</h2>
      <p className="scene-category">{project.category}</p>
      <p className="scene-description">{project.description}</p>
      <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      <div className="scene-actions"><MagneticLink href={`/work/${project.slug}`}>View project</MagneticLink>{project.website && <MagneticLink href={project.website} inverted>Visit website</MagneticLink>}</div>
    </div>
    <div className={`device-stage ${project.screenshot ? "" : "map-stage"}`}>
      <div className="device-glow" />
      {project.screenshot ? <div className="device-shell"><div className="device-bar"><span/><span/><span/><b>{project.name}</b></div><div className={`device-screen screen-${project.slug}`}><Image src={project.screenshot} alt={`${project.name} product interface`} fill sizes="(max-width: 900px) 94vw, 66vw" /></div><div className="device-base" /></div> : <div className="track-placeholder"><div className="map-grid"/><span className="route route-a"/><span className="route route-b"/><i/><i/><i/><div><small>LIVE FIELD SIGNAL</small><strong>TRACK GROW</strong><p>Product screenshot arriving soon</p></div></div>}
      <div className="feature-orbit" aria-hidden="true">{project.features.slice(0, 5).map((feature, index) => <span style={{ "--i": index } as CSSProperties} key={feature}>{feature}</span>)}</div>
    </div>
  </section>;
}
