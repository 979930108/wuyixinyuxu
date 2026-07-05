"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ActivationInfo } from "@/lib/types";

export function ActivateModal() {
  const { showActivateModal, setShowActivateModal, setActivation, showToast } =
    useAppStore();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (showActivateModal) {
      setCode("");
      setError("");
      setSuccess("");
      setLoading(false);
    }
  }, [showActivateModal]);

  useEffect(() => {
    if (!showActivateModal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowActivateModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showActivateModal, setShowActivateModal]);

  if (!showActivateModal) return null;

  const handleClose = () => setShowActivateModal(false);

  const handleActivate = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const json = (await res.json()) as {
        success: boolean;
        message: string;
        data?: ActivationInfo;
      };

      if (!json.success || !json.data) {
        setError(json.message || "激活失败");
        return;
      }

      setSuccess(json.message);
      setTimeout(() => {
        setActivation(json.data!);
        showToast(json.message, "success");
      }, 1200);
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="activate-title"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="关闭"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 id="activate-title" className="text-lg font-bold text-slate-900">
              激活会员
            </h2>
            <p className="text-sm text-slate-500">输入闲鱼购买的激活码解锁全部功能</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              激活码
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="例如：XIANYU-VIP-8888"
              className="input-field font-mono uppercase tracking-wider"
              onKeyDown={(e) => e.key === "Enter" && !loading && handleActivate()}
              autoFocus
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600">
              {success}
            </p>
          )}

          <button
            onClick={handleActivate}
            disabled={loading || !code.trim() || !!success}
            className="btn-accent w-full disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                验证中...
              </>
            ) : success ? (
              "激活成功 ✓"
            ) : (
              "立即激活"
            )}
          </button>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-700">会员权益</p>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            <li>✓ 全部 4 套精美简历模板</li>
            <li>✓ 高清 PDF 导出（无水印）</li>
            <li>✓ 数据本地自动保存</li>
            <li>✓ 无限次编辑与导出</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
