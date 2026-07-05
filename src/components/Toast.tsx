"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Toast() {
  const { toast, clearToast } = useAppStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    info: <Info className="h-5 w-5 text-brand-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-[60] flex max-w-sm -translate-x-1/2 items-start gap-3 rounded-xl border bg-white px-4 py-3 shadow-xl transition-all",
        toast.type === "error" && "border-red-100",
        toast.type === "success" && "border-green-100",
        toast.type === "info" && "border-brand-100"
      )}
      role="status"
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-slate-700">{toast.message}</p>
      <button
        onClick={clearToast}
        className="shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600"
        aria-label="关闭提示"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
