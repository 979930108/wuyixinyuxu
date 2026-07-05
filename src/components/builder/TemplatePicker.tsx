"use client";

import { Check, Crown, Lock } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { TEMPLATES, type TemplateId } from "@/lib/types";
import { cn } from "@/lib/utils";

const templateColors: Record<TemplateId, string> = {
  classic: "from-brand-600 to-brand-800",
  modern: "from-indigo-600 to-purple-800",
  minimal: "from-slate-500 to-slate-700",
  professional: "from-emerald-600 to-teal-800",
};

export function TemplatePicker() {
  const { templateId, setTemplate, isPremium } = useAppStore();

  const handleSelect = (id: TemplateId, premium: boolean) => {
    if (premium && !isPremium) {
      setTemplate(id);
      return;
    }
    setTemplate(id);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {TEMPLATES.map((tpl) => {
        const selected = templateId === tpl.id;
        const locked = tpl.premium && !isPremium;

        return (
          <button
            key={tpl.id}
            onClick={() => handleSelect(tpl.id, tpl.premium)}
            className={cn(
              "relative overflow-hidden rounded-xl border-2 p-3 text-left transition",
              selected
                ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/20"
                : "border-slate-200 bg-white hover:border-slate-300",
              locked && !selected && "opacity-90"
            )}
          >
            <div
              className={cn(
                "mb-2 flex h-20 items-end rounded-lg bg-gradient-to-br p-3",
                templateColors[tpl.id]
              )}
            >
              <div className="space-y-1">
                <div className="h-1.5 w-16 rounded bg-white/80" />
                <div className="h-1 w-12 rounded bg-white/50" />
                <div className="h-1 w-14 rounded bg-white/40" />
              </div>
            </div>
            <div className="flex items-start justify-between gap-1">
              <div>
                <p className="text-sm font-semibold text-slate-800">{tpl.name}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                  {tpl.description}
                </p>
                {locked && (
                  <p className="mt-1 text-xs text-accent-dark">点击解锁 →</p>
                )}
              </div>
              {selected && (
                <Check className="h-4 w-4 shrink-0 text-brand-600" />
              )}
            </div>
            {tpl.premium && (
              <span
                className={cn(
                  "absolute right-2 top-2 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold",
                  locked ? "bg-slate-800/80 text-white" : "bg-accent/90 text-white"
                )}
              >
                {locked ? (
                  <>
                    <Lock className="h-2.5 w-2.5" /> VIP
                  </>
                ) : (
                  <>
                    <Crown className="h-2.5 w-2.5" /> VIP
                  </>
                )}
              </span>
            )}
            {!tpl.premium && (
              <span className="absolute right-2 top-2 rounded-full bg-green-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                免费
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
