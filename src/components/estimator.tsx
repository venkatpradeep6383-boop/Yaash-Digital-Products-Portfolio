"use client";

import { useMemo, useState } from "react";
import { pricing } from "@/data/site";

const products = Object.keys(pricing.productBase) as (keyof typeof pricing.productBase)[];
const features = ["Authentication", "Admin Dashboard", "User Roles", "Customer Management", "Inventory", "Billing", "Reports", "Analytics", "WhatsApp Integration", "Payment Gateway", "Email/SMS", "Mobile/PWA", "File Uploads", "Advanced Permissions"];
const complexities = Object.keys(pricing.complexity) as (keyof typeof pricing.complexity)[];
const stepNames = ["Product type", "Features", "Complexity"];
const defaults = { product: "Business Website", complexity: "Business" } as const;
const money = (n: number) => `₹${Math.round(n / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function Estimator() {
  const [product, setProduct] = useState<(typeof products)[number]>(defaults.product);
  const [selected, setSelected] = useState<string[]>([]);
  const [complexity, setComplexity] = useState<(typeof complexities)[number]>(defaults.complexity);
  const [step, setStep] = useState(1);
  const range = useMemo(() => {
    const low = (pricing.productBase[product] + selected.length * pricing.featureCost) * pricing.complexity[complexity];
    return [money(low), money(low * (1 + pricing.rangeSpread))];
  }, [product, selected, complexity]);
  const toggle = (feature: string) => setSelected((current) => current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature]);
  const reset = () => { setProduct(defaults.product); setSelected([]); setComplexity(defaults.complexity); setStep(1); };

  return <section className="estimator section" aria-labelledby="estimator-title">
    <div className="section-intro"><p className="eyebrow">PROJECT ESTIMATOR / 03 STEPS</p><h2 id="estimator-title">What would you<br/>like to build?</h2></div>
    <div className="estimate-shell">
      <div className="steps" aria-label="Estimator steps">{[1, 2, 3].map((number) => <button key={number} onClick={() => setStep(number)} className={step === number ? "active" : ""} aria-current={step === number ? "step" : undefined}>0{number}<span>{stepNames[number - 1]}</span></button>)}</div>
      <div className="step-content" key={step}>
        {step === 1 ? <><h3>Select a product type</h3><div className="choice-grid">{products.map((item) => <button className={item === product ? "selected" : ""} aria-pressed={item === product} onClick={() => setProduct(item)} key={item}>{item}</button>)}</div></> : null}
        {step === 2 ? <><h3>Select useful features</h3><div className="feature-grid">{features.map((feature) => <button className={selected.includes(feature) ? "selected" : ""} aria-pressed={selected.includes(feature)} onClick={() => toggle(feature)} key={feature}>{feature}<span aria-hidden="true">{selected.includes(feature) ? "×" : "+"}</span></button>)}</div></> : null}
        {step === 3 ? <><h3>Choose complexity</h3><div className="choice-grid three">{complexities.map((item) => <button className={item === complexity ? "selected" : ""} aria-pressed={item === complexity} onClick={() => setComplexity(item)} key={item}>{item}</button>)}</div></> : null}
        <div className="step-nav"><button disabled={step === 1} onClick={() => setStep((current) => current - 1)}>Previous</button><button type="button" onClick={reset}>Reset</button><button disabled={step === 3} onClick={() => setStep((current) => current + 1)}>Next step →</button></div>
      </div>
      <aside className="estimate-result" aria-live="polite"><span>ESTIMATED INVESTMENT</span><strong>{range[0]} <i>—</i> {range[1]}</strong><p>Indicative estimate based on selected requirements. Final quotation follows requirement analysis.</p><a href="#contact">GET DETAILED QUOTE →</a></aside>
    </div>
  </section>;
}
