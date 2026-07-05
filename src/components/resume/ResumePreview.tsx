"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClassicTemplate,
  MinimalTemplate,
  ModernTemplate,
  ProfessionalTemplate,
} from "@/components/resume/templates";
import type { ResumeData, TemplateId } from "@/lib/types";

interface ResumePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
  watermark?: boolean;
  id?: string;
  /** 预览区自适应缩放；导出时传 false 保证 PDF 清晰 */
  scaled?: boolean;
}

function ResumeContent({
  data,
  templateId,
  watermark,
}: {
  data: ResumeData;
  templateId: TemplateId;
  watermark: boolean;
}) {
  const props = { data, watermark };

  return (
    <>
      {templateId === "classic" && <ClassicTemplate {...props} />}
      {templateId === "modern" && <ModernTemplate {...props} />}
      {templateId === "minimal" && <MinimalTemplate {...props} />}
      {templateId === "professional" && <ProfessionalTemplate {...props} />}
    </>
  );
}

/** 自适应容器宽度缩放，并修正布局占位 */
function PreviewScaler({ children }: { children: React.ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);
  const [size, setSize] = useState({ width: 794, height: 1123 });

  useEffect(() => {
    const viewport = viewportRef.current;
    const inner = innerRef.current;
    if (!viewport || !inner) return;

    const update = () => {
      const page = inner.querySelector(".resume-page") as HTMLElement | null;
      if (!page) return;

      const naturalWidth = page.offsetWidth;
      const naturalHeight = page.offsetHeight;
      const available = viewport.clientWidth - 16;
      const nextScale = Math.min(1, Math.max(0.4, available / naturalWidth));

      setScale(nextScale);
      setSize({ width: naturalWidth, height: naturalHeight });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(viewport);

    const mo = new MutationObserver(update);
    mo.observe(inner, { childList: true, subtree: true, characterData: true });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [children]);

  return (
    <div ref={viewportRef} className="flex w-full justify-center py-2">
      <div
        className="overflow-hidden rounded-sm shadow-resume"
        style={{
          width: size.width * scale,
          height: size.height * scale,
        }}
      >
        <div
          ref={innerRef}
          className="preview-scaler-inner"
          style={{
            width: "210mm",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function ResumePreview({
  data,
  templateId,
  watermark = false,
  id = "resume-preview",
  scaled = true,
}: ResumePreviewProps) {
  const content = (
    <ResumeContent data={data} templateId={templateId} watermark={watermark} />
  );

  if (!scaled) {
    return <div id={id}>{content}</div>;
  }

  return (
    <div id={id}>
      <PreviewScaler>{content}</PreviewScaler>
    </div>
  );
}
