"use client";

import Image from "next/image";
import { useState } from "react";

const previews = [
  { name: "Dealup CRM", category: "SALES, SIMPLIFIED", image: "/images/dealup-desktop-overview.png", mobile: "/images/dealup-mobile-overview.png" },
  { name: "DK Website", category: "CRAFT, SHOWCASED", image: "/images/dk-site-desktop-01.png", mobile: "/images/dk-site-mobile-01.png" },
  { name: "DK Detailing", category: "OPERATIONS, ORGANIZED", image: "/images/dk-pos-desktop-dashboard.png", mobile: "/images/dk-pos-mobile-dashboard.jpeg" },
];

export function ProductOpening() {
  const [selected, setSelected] = useState(0);
  const preview = previews[selected];
  return <section id="intro" className="product-opening">
    <div className="opening-topline"><span><i /> INDEPENDENT DIGITAL PRODUCT STUDIO</span><span>IDEA → IMPACT</span></div>
    <div className="opening-layout">
      <div className="opening-copy"><p className="opening-eyebrow">GOOD SOFTWARE STARTS WITH A REAL PROBLEM.</p><h1>I turn business<br />problems into<br /><em>working software.</em></h1><p className="opening-description">Less friction. Clearer decisions. Better business.<br />Custom CRM, POS and digital experiences built around the way you work.</p><div className="opening-actions"><a href="#work">Explore the work <span>↗</span></a><a href="#contact">Let&apos;s build something <span>→</span></a></div><div className="opening-signature"><span>YAASH</span><p>DIGITAL PRODUCTS<br />BUILT FOR REAL BUSINESS.</p></div></div>
      <div className="opening-product"><div className="opening-product-label"><span>FROM A ROUGH IDEA</span><i /><span>TO A WORKING PRODUCT</span></div><div className="opening-devices" key={preview.image}><div className="opening-macbook"><Image className="opening-macbook-hardware" src="/images/laptop-frame-realistic.png" alt="MacBook device frame" fill priority sizes="(max-width: 820px) 90vw, 52vw" /><div className="opening-macbook-display"><Image src={preview.image} alt={`${preview.name} desktop view on MacBook`} fill priority sizes="(max-width: 820px) 65vw, 36vw" /></div></div><div className="opening-iphone"><span className="opening-phone-button opening-phone-power" /><span className="opening-phone-button opening-phone-volume" /><div className={`opening-iphone-display${selected === 2 ? " opening-pos-phone" : ""}`}><Image src={preview.mobile} alt={`${preview.name} mobile view on iPhone`} fill sizes="(max-width: 820px) 24vw, 14vw" priority /><span className="opening-dynamic-island" aria-hidden="true"><i /></span><span className="opening-home-indicator" aria-hidden="true" /></div></div><span className="opening-device-note">DESKTOP + MOBILE. ONE CONNECTED EXPERIENCE.</span></div><div className="opening-caption"><div><span>SELECTED PRODUCT / 0{selected + 1}</span><h2>{preview.name}</h2></div><p>{preview.category}</p></div><div className="opening-tabs" aria-label="Product previews">{previews.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.name}<i>↗</i></button>)}</div></div>
    </div><div className="opening-bottom"><span>THOUGHTFULLY DESIGNED. PURPOSEFULLY BUILT.</span><a href="#work">SCROLL TO DISCOVER ↓</a></div>
  </section>;
}


