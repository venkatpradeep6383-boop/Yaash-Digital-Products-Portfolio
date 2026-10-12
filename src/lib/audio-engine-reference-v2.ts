"use client";

type Bus = "scroll" | "click" | "swipe";

class ReferenceV2AudioEngine {
  private context?: AudioContext;
  private master?: GainNode;
  private buses = new Map<Bus, GainNode>();
  private scrollTexture?: AudioBuffer;
  private clickTexture?: AudioBuffer;
  private swipeTexture?: AudioBuffer;
  private scrollGain?: GainNode;
  private enabled = false;
  private lastClick = 0;
  private lastSwipe = 0;
  private scrolling = false;

  constructor() { if (typeof window !== "undefined") this.enabled = sessionStorage.getItem("ydp-sound") === "on"; }
  isEnabled() { return this.enabled; }
  async enable() { this.enabled = true; sessionStorage.setItem("ydp-sound", "on"); this.initialize(); await this.context?.resume(); this.click(); }
  disable() { this.enabled = false; sessionStorage.setItem("ydp-sound", "off"); if (this.context && this.master) this.master.gain.setTargetAtTime(0, this.context.currentTime, .018); }
  toggle() { return this.enabled ? (this.disable(), false) : (void this.enable(), true); }

  private initialize() {
    if (this.context) { this.master?.gain.setTargetAtTime(this.enabled ? .72 : 0, this.context.currentTime, .018); return; }
    const context = new AudioContext(); this.context = context; this.master = context.createGain(); this.master.gain.value = this.enabled ? .72 : 0; this.master.connect(context.destination);
    const levels: Record<Bus, number> = { scroll: .26, click: .34, swipe: .3 };
    (Object.keys(levels) as Bus[]).forEach(name => { const gain = context.createGain(); gain.gain.value = levels[name]; gain.connect(this.master!); this.buses.set(name, gain); });
    this.scrollTexture = this.makeTexture(.42, "scroll"); this.clickTexture = this.makeTexture(.052, "click"); this.swipeTexture = this.makeTexture(.46, "swipe");
    const source = context.createBufferSource(); source.buffer = this.scrollTexture; source.loop = true; this.scrollGain = context.createGain(); this.scrollGain.gain.value = 0; source.connect(this.scrollGain).connect(this.buses.get("scroll")!); source.start();
    if (process.env.NODE_ENV !== "production") console.info("[YDP AUDIO] engine version: reference-v2");
  }

  private makeTexture(seconds: number, mode: Bus) {
    const context = this.context!, length = Math.max(1, Math.floor(context.sampleRate * seconds)), buffer = context.createBuffer(1, length, context.sampleRate), pcm = buffer.getChannelData(0); let seed = mode === "scroll" ? 1741 : mode === "click" ? 3253 : 4817, previous = 0;
    for (let i = 0; i < length; i++) { seed = seed * 48271 % 2147483647; const white = seed / 1073741823.5 - 1; const dry = white - previous * .82; previous = white; const time = i / context.sampleRate; const grain = mode === "scroll" ? (Math.sin(time * 157) > .72 ? .18 : .035) : Math.exp(-time * (mode === "click" ? 92 : 10)); const transient = mode === "click" ? Math.exp(-time * 145) : mode === "swipe" ? (.24 + Math.sin(Math.PI * Math.min(1, time / seconds)) * .42) : 1; pcm[i] = dry * grain * transient * .34; }
    return buffer;
  }

  private play(buffer: AudioBuffer | undefined, bus: Bus, volume: number, rate = 1) { if (!this.enabled || !buffer) return; this.initialize(); const context = this.context!, now = context.currentTime, source = context.createBufferSource(), gain = context.createGain(); source.buffer = buffer; source.playbackRate.value = Math.min(1.04, Math.max(.96, rate)); gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(volume, now + .012); gain.gain.exponentialRampToValueAtTime(.0001, now + buffer.duration); source.connect(gain).connect(this.buses.get(bus)!); source.start(now); }
  ambience() {}
  reveal() { this.swipe(.98); }
  impact() { this.click(); }
  portal() { this.swipe(1.02); }
  project(direction = 1) { this.swipe(direction > 0 ? 1.02 : .98); }
  click() { const stamp = performance.now(); if (stamp - this.lastClick < 105) return; this.lastClick = stamp; this.play(this.clickTexture, "click", .3); if (process.env.NODE_ENV !== "production") console.info("[YDP AUDIO] click texture"); }
  private swipe(rate: number) { const stamp = performance.now(); if (stamp - this.lastSwipe < 220) return; this.lastSwipe = stamp; this.play(this.swipeTexture, "swipe", .2, rate); if (process.env.NODE_ENV !== "production") console.info("[YDP AUDIO] swipe texture"); }
  setScrollVelocity(velocity: number) { if (!this.enabled || !this.context || !this.scrollGain) return; const amount = Math.min(Math.abs(velocity) / 2100, 1), now = this.context.currentTime; this.scrollGain.gain.setTargetAtTime(amount * .15, now, amount > .012 ? .018 : .085); if (amount > .06 && !this.scrolling) { this.scrolling = true; if (process.env.NODE_ENV !== "production") console.info("[YDP AUDIO] scroll texture active"); } else if (amount < .012) this.scrolling = false; }
  visibility(hidden: boolean) { if (!this.context || !this.master) return; this.master.gain.setTargetAtTime(hidden || !this.enabled ? 0 : .72, this.context.currentTime, hidden ? .035 : .1); }
}

export const audioEngine = new ReferenceV2AudioEngine();
