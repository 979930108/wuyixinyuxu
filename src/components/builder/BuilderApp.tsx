"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  Download,
  Eye,
  FileText,
  Lock,
  RotateCcw,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { ActivateModal } from "@/components/ActivateModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Toast } from "@/components/Toast";
import { ResumeEditor } from "@/components/builder/ResumeEditor";
import { TemplatePicker } from "@/components/builder/TemplatePicker";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { exportResumeToPdf } from "@/lib/pdf-export";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type TabId = "edit" | "template" | "preview";

export function BuilderApp() {
  const searchParams = useSearchParams();
  const {
    hydrate,
    hydrated,
    resume,
    templateId,
    isPremium,
    activation,
    setShowActivateModal,
    loadSampleResume,
    resetResume,
    showToast,
  } = useAppStore();

  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("edit");
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmLoadSample, setConfirmLoadSample] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (hydrated && searchParams.get("activate") === "1") {
      setShowActivateModal(true);
    }
  }, [hydrated, searchParams, setShowActivateModal]);

  const handleExport = async () => {
    const el = exportRef.current?.querySelector(".resume-page") as HTMLElement | null;
    if (!el) {
      showToast("导出失败，请刷新页面后重试", "error");
      return;
    }

    setExporting(true);
    try {
      const name = resume.basic.name || "我的简历";
      const withWatermark = !isPremium;
      await exportResumeToPdf(el, `${name}-简历.pdf`);

      if (withWatermark) {
        showToast("已导出带水印 PDF，激活会员可去除水印并使用全部模板", "info");
      } else {
        showToast("PDF 导出成功", "success");
      }
    } catch {
      showToast("导出失败，请稍后重试", "error");
    } finally {
      setExporting(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  const tabs: { id: TabId; label: string; mobileOnly?: boolean }[] = [
    { id: "edit", label: "编辑内容" },
    { id: "template", label: "选择模板" },
    { id: "preview", label: "预览", mobileOnly: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-brand-700"
              title="返回首页"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">首页</span>
            </Link>
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2 rounded-lg transition hover:opacity-80"
              title="返回首页"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="hidden font-bold text-slate-900 group-hover:text-brand-700 sm:inline">
                简历工坊
              </span>
            </Link>
            {isPremium ? (
              <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent-dark">
                <Crown className="h-3.5 w-3.5" />
                会员
              </span>
            ) : (
              <button
                onClick={() => setShowActivateModal(true)}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
              >
                <Sparkles className="h-3.5 w-3.5" />
                激活
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setConfirmLoadSample(true)}
              className="btn-secondary px-2.5 py-2 sm:px-4"
              title="填入示例"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">示例</span>
            </button>
            <button
              onClick={() => setConfirmReset(true)}
              className="btn-secondary px-2.5 py-2 sm:px-4"
              title="清空内容"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">清空</span>
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className={cn("btn-primary px-3 py-2 sm:px-5", !isPremium && "relative")}
            >
              {!isPremium && <Lock className="h-3.5 w-3.5 opacity-80" />}
              <Download className="h-4 w-4" />
              <span className="hidden xs:inline sm:inline">
                {exporting ? "导出中..." : isPremium ? "导出 PDF" : "导出(水印)"}
              </span>
              <span className="sm:hidden">{exporting ? "..." : "导出"}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
        <div className="border-r border-slate-200 bg-white">
          <div className="sticky top-[57px] z-10 flex border-b border-slate-200 bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium transition",
                  activeTab === tab.id
                    ? "border-b-2 border-brand-600 text-brand-600"
                    : "text-slate-500 hover:text-slate-700",
                  tab.mobileOnly && "lg:hidden"
                )}
              >
                {tab.id === "preview" && <Eye className="h-4 w-4" />}
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab !== "preview" && (
            <div className="max-h-[calc(100vh-57px)] overflow-y-auto p-4 sm:p-6">
              {activeTab === "edit" && (
                <>
                  {!resume.basic.name && (
                    <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50/50 p-4">
                      <p className="text-sm font-medium text-brand-800">开始制作你的简历</p>
                      <p className="mt-1 text-xs text-brand-600/80">
                        在下方填写个人信息，或点击顶部「示例」快速填入参考内容
                      </p>
                    </div>
                  )}
                  <ResumeEditor />
                </>
              )}
              {activeTab === "template" && (
                <div>
                  <p className="mb-4 text-sm text-slate-500">
                    选择适合你的行业和风格的简历模板
                    {!isPremium && (
                      <span className="ml-1 text-accent-dark">（VIP 模板需激活会员）</span>
                    )}
                  </p>
                  <TemplatePicker />
                </div>
              )}
            </div>
          )}

          {/* 移动端预览 Tab */}
          {activeTab === "preview" && (
            <div className="min-h-[calc(100vh-57px)] bg-slate-100 p-4 lg:hidden">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-700">简历预览</h2>
                {!isPremium && (
                  <span className="text-xs text-slate-400">预览含水印 · 导出亦带水印</span>
                )}
              </div>
              <div className="overflow-x-auto px-1 pb-4">
                <ResumePreview
                  data={resume}
                  templateId={templateId}
                  watermark={!isPremium}
                />
              </div>
            </div>
          )}
        </div>

        {/* 桌面端右侧预览 */}
        <div className="hidden bg-slate-100 lg:flex lg:flex-col lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)]">
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <h2 className="text-sm font-semibold text-slate-700">实时预览</h2>
            {!isPremium && (
              <span className="text-xs text-slate-400">预览含水印 · 导出亦带水印</span>
            )}
          </div>
          <div className="flex-1 overflow-auto px-6 pb-6">
            <ResumePreview
              data={resume}
              templateId={templateId}
              watermark={!isPremium}
            />
          </div>
        </div>
      </div>

      {/* 1:1 无缩放，与右侧预览同一套模板，专用于 PDF 导出 */}
      <div
        ref={exportRef}
        className="pointer-events-none fixed left-[-9999px] top-0"
        aria-hidden
      >
        <ResumePreview
          data={resume}
          templateId={templateId}
          watermark={!isPremium}
          scaled={false}
        />
      </div>

      <ActivateModal />
      <Toast />

      <ConfirmDialog
        open={confirmReset}
        title="清空简历内容？"
        message="将删除所有已填写的内容，此操作不可撤销。"
        confirmLabel="清空"
        danger
        onConfirm={() => {
          resetResume();
          setConfirmReset(false);
        }}
        onCancel={() => setConfirmReset(false)}
      />

      <ConfirmDialog
        open={confirmLoadSample}
        title="填入示例数据？"
        message="将用示例简历覆盖当前内容，你可以在此基础上修改为自己的信息。"
        confirmLabel="填入示例"
        onConfirm={() => {
          loadSampleResume();
          setConfirmLoadSample(false);
        }}
        onCancel={() => setConfirmLoadSample(false)}
      />

      {activation?.expiresAt && isPremium && (
        <div className="fixed bottom-20 right-4 z-30 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg lg:bottom-4">
          会员有效期至 {new Date(activation.expiresAt).toLocaleDateString("zh-CN")}
        </div>
      )}
    </>
  );
}
