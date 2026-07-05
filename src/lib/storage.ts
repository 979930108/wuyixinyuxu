import type { ActivationInfo } from "./types";

const STORAGE_KEY = "resume-pro-data";
const ACTIVATION_KEY = "resume-pro-activation";
const TEMPLATE_KEY = "resume-pro-template";

export function getStoredActivation(): ActivationInfo | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACTIVATION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ActivationInfo;
  } catch {
    return null;
  }
}

export function setStoredActivation(info: ActivationInfo): void {
  localStorage.setItem(ACTIVATION_KEY, JSON.stringify(info));
}

export function clearStoredActivation(): void {
  localStorage.removeItem(ACTIVATION_KEY);
}

export function isActivationValid(info: ActivationInfo | null): boolean {
  if (!info?.token) return false;
  if (info.plan === "lifetime") return true;
  if (!info.expiresAt) return false;
  return new Date(info.expiresAt) > new Date();
}

export function getStoredTemplate(): string {
  if (typeof window === "undefined") return "classic";
  return localStorage.getItem(TEMPLATE_KEY) || "classic";
}

export function setStoredTemplate(id: string): void {
  localStorage.setItem(TEMPLATE_KEY, id);
}

export function getStoredResume(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function setStoredResume(data: string): void {
  localStorage.setItem(STORAGE_KEY, data);
}

export function clearStoredResume(): void {
  localStorage.removeItem(STORAGE_KEY);
}
