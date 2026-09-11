"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="center-page"><p className="eyebrow">SYSTEM INTERRUPTION</p><h1>Something didn’t load.</h1><button className="button primary" onClick={reset}>Try again</button></main>;
}
