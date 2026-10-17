import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { MouseEvent } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Touch taps fire mouseenter/mouseleave too, which leaves hover-driven inline
// styles stuck mid-transform with no real "leave" event to undo them. Gate
// imperative hover handlers behind this instead of a static CSS media query,
// since it's checked live inside a JS event handler, not at stylesheet time.
export function supportsFineHover() {
  if (typeof window === "undefined" || !window.matchMedia) return true
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

// Drives .glow-card: writes the pointer position relative to the card's own
// box (not the viewport), so the spotlight/border-ring gradients stay
// correct even while the card is mid hover-transform (translateY etc).
export function setGlowPosition(e: MouseEvent<HTMLElement>) {
  if (!supportsFineHover()) return
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
}
