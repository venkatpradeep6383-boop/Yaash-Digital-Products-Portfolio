"use client";

import { useEffect, useRef, useState } from "react";
import { audioEngine } from "@/lib/audio-engine-reference-v2";

export function SoundControl() {
  const [enabled, setEnabled] = useState(false);
  const lastY = useRef(0), lastTime = useRef(0), velocity = useRef(0), frame = useRef(0);
  const lastTouchY = useRef(0);
  useEffect(() => {
    const initializeState = window.requestAnimationFrame(() => setEnabled(audioEngine.isEnabled())); lastY.current = window.scrollY; lastTime.current = performance.now();
    const scroll = () => { const now = performance.now(), elapsed = Math.max(16, now - lastTime.current), delta = window.scrollY - lastY.current; velocity.current = velocity.current * .58 + (delta / elapsed) * 1000 * .42; lastY.current = window.scrollY; lastTime.current = now; };
    const wheel = (event: WheelEvent) => { velocity.current = velocity.current * .5 + event.deltaY * 18; };
    const touchStart = (event: TouchEvent) => { lastTouchY.current = event.touches[0]?.clientY ?? 0; };
    const touchMove = (event: TouchEvent) => { const y = event.touches[0]?.clientY ?? lastTouchY.current; velocity.current = velocity.current * .6 + (lastTouchY.current - y) * 13; lastTouchY.current = y; };
    const tick = () => { velocity.current *= .88; audioEngine.setScrollVelocity(velocity.current); frame.current = requestAnimationFrame(tick); };
    const click = (event: PointerEvent) => { const target = event.target as HTMLElement; if (target.closest(".project-progress")) return; if (target.closest("a,button,[role='button']")) audioEngine.click(); };
    const visibility = () => audioEngine.visibility(document.hidden);
    window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("wheel", wheel, { passive: true }); window.addEventListener("touchstart", touchStart, { passive: true }); window.addEventListener("touchmove", touchMove, { passive: true }); document.addEventListener("pointerdown", click); document.addEventListener("visibilitychange", visibility); frame.current = requestAnimationFrame(tick);
    return () => { window.cancelAnimationFrame(initializeState); window.removeEventListener("scroll", scroll); window.removeEventListener("wheel", wheel); window.removeEventListener("touchstart", touchStart); window.removeEventListener("touchmove", touchMove); document.removeEventListener("pointerdown", click); document.removeEventListener("visibilitychange", visibility); cancelAnimationFrame(frame.current); };
  }, []);
  const toggle = () => { const next = audioEngine.toggle(); setEnabled(next); if (next) audioEngine.click(); };
  return <button className="sound-control" type="button" onClick={toggle} aria-pressed={enabled} aria-label={`Turn sound ${enabled ? "off" : "on"}`}><span>SOUND</span><b>{enabled ? "ON" : "OFF"}</b></button>;
}
