"use client";

import { create } from "zustand";
import { emptyResume, sampleResume } from "./default-resume";
import {
  getStoredActivation,
  getStoredResume,
  getStoredTemplate,
  isActivationValid,
  setStoredActivation,
  setStoredResume,
  setStoredTemplate,
} from "./storage";
import type { ActivationInfo, ResumeData, TemplateId } from "./types";
import { TEMPLATES } from "./types";

export type ToastType = "success" | "info" | "error";

interface Toast {
  message: string;
  type: ToastType;
}

interface AppState {
  resume: ResumeData;
  templateId: TemplateId;
  activation: ActivationInfo | null;
  isPremium: boolean;
  hydrated: boolean;
  showActivateModal: boolean;
  toast: Toast | null;

  hydrate: () => void;
  setResume: (resume: ResumeData) => void;
  updateBasic: (basic: Partial<ResumeData["basic"]>) => void;
  setTemplate: (id: TemplateId) => boolean;
  setActivation: (info: ActivationInfo) => void;
  setShowActivateModal: (show: boolean) => void;
  loadSampleResume: () => void;
  resetResume: () => void;
  persistResume: () => void;
  showToast: (message: string, type?: ToastType) => void;
  clearToast: () => void;
}

function resolveTemplateId(
  stored: TemplateId,
  isPremium: boolean
): TemplateId {
  const meta = TEMPLATES.find((t) => t.id === stored);
  if (!isPremium && meta?.premium) return "classic";
  return stored;
}

export const useAppStore = create<AppState>((set, get) => ({
  resume: emptyResume,
  templateId: "classic",
  activation: null,
  isPremium: false,
  hydrated: false,
  showActivateModal: false,
  toast: null,

  hydrate: () => {
    const stored = getStoredResume();
    const activation = getStoredActivation();
    const isPremium = isActivationValid(activation);
    const storedTemplate = (getStoredTemplate() as TemplateId) || "classic";
    const templateId = resolveTemplateId(storedTemplate, isPremium);

    if (templateId !== storedTemplate) {
      setStoredTemplate(templateId);
    }

    set({
      resume: stored ? (JSON.parse(stored) as ResumeData) : emptyResume,
      templateId,
      activation,
      isPremium,
      hydrated: true,
    });
  },

  setResume: (resume) => {
    set({ resume });
    get().persistResume();
  },

  updateBasic: (basic) => {
    const resume = { ...get().resume, basic: { ...get().resume.basic, ...basic } };
    set({ resume });
    get().persistResume();
  },

  setTemplate: (id) => {
    const meta = TEMPLATES.find((t) => t.id === id);
    if (meta?.premium && !get().isPremium) {
      set({ showActivateModal: true });
      get().showToast("该模板需激活会员后使用", "info");
      return false;
    }
    set({ templateId: id });
    setStoredTemplate(id);
    return true;
  },

  setActivation: (info) => {
    setStoredActivation(info);
    set({
      activation: info,
      isPremium: isActivationValid(info),
      showActivateModal: false,
    });
  },

  setShowActivateModal: (show) => set({ showActivateModal: show }),

  loadSampleResume: () => {
    set({ resume: sampleResume });
    get().persistResume();
    get().showToast("已填入示例数据，请替换为你的真实信息", "info");
  },

  resetResume: () => {
    set({ resume: emptyResume });
    get().persistResume();
    get().showToast("已清空，可以从头填写", "success");
  },

  persistResume: () => {
    setStoredResume(JSON.stringify(get().resume));
  },

  showToast: (message, type = "success") => {
    set({ toast: { message, type } });
    setTimeout(() => {
      if (get().toast?.message === message) {
        set({ toast: null });
      }
    }, 3500);
  },

  clearToast: () => set({ toast: null }),
}));
