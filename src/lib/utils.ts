import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
