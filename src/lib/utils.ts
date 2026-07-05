import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function formatDateRange(
  start: string,
  end: string,
  current?: boolean
): string {
  if (!start && !end) return "";
  const startPart = start || "—";
  const endPart = current ? "至今" : end || "—";
  return `${startPart} — ${endPart}`;
}
