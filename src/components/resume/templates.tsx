import type { ReactNode } from "react";
import type { ResumeData } from "@/lib/types";

interface TemplateProps {
  data: ResumeData;
  watermark?: boolean;
}

/** 与编辑区相同的模块容器 */
function PreviewBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-6 first:mt-0">
      <h2 className="mb-3 text-sm font-semibold text-slate-800">{title}</h2>
      {children}
    </section>
  );
}

/** 与编辑区相同的字段：标签在上、内容在下 */
function PreviewField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-all text-sm text-slate-900">{value?.trim() || "—"}</p>
    </div>
  );
}

/** 头部信息 — 与编辑区 2×2 网格完全一致 */
function HeaderInfoBlock({ basic }: { basic: ResumeData["basic"] }) {
  return (
    <PreviewBlock title="头部信息">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <PreviewField label="姓名" value={basic.name} fullWidth />
        <PreviewField label="手机号" value={basic.phone} />
        <PreviewField label="邮箱" value={basic.email} />
        <PreviewField label="所在地" value={basic.location} />
        <PreviewField label="个人网站" value={basic.website} />
      </div>
    </PreviewBlock>
  );
}

/** 模块标题 — 用于经历类条目内的小标题 */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-2 border-b border-slate-200 pb-1 text-xs font-semibold text-slate-600">
      {children}
    </h3>
  );
}

function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="rotate-[-30deg] text-[72px] font-bold text-slate-200/40 select-none">
        简历工坊 预览版
      </div>
    </div>
  );
}

function ResumeContent({ data }: { data: ResumeData }) {
  const { basic, experiences, educations, projects, skills } = data;

  return (
    <>
      <HeaderInfoBlock basic={basic} />

      <PreviewBlock title="求职意向">
        <p className="break-all text-sm text-slate-900">{basic.title?.trim() || "—"}</p>
      </PreviewBlock>

      <PreviewBlock title="个人简介">
        <p className="whitespace-pre-line break-all text-sm leading-relaxed text-slate-900">
          {basic.summary?.trim() || "—"}
        </p>
      </PreviewBlock>

      {experiences.length > 0 && (
        <PreviewBlock title="工作经历">
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <div key={exp.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                {experiences.length > 1 && <SectionTitle>经历 {i + 1}</SectionTitle>}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <PreviewField label="公司名称" value={exp.company} />
                  <PreviewField label="职位" value={exp.position} />
                  <PreviewField label="开始时间" value={exp.startDate} />
                  <PreviewField label="结束时间" value={exp.current ? "至今" : exp.endDate} />
                  <div className="col-span-2">
                    <PreviewField label="工作描述" value={exp.description} fullWidth />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PreviewBlock>
      )}

      {projects.length > 0 && (
        <PreviewBlock title="项目经历">
          <div className="space-y-5">
            {projects.map((proj, i) => (
              <div key={proj.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                {projects.length > 1 && <SectionTitle>项目 {i + 1}</SectionTitle>}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <PreviewField label="项目名称" value={proj.name} />
                  <PreviewField label="担任角色" value={proj.role} />
                  <PreviewField label="开始时间" value={proj.startDate} />
                  <PreviewField label="结束时间" value={proj.endDate} />
                  <PreviewField label="项目链接" value={proj.link} fullWidth />
                  <div className="col-span-2">
                    <PreviewField label="项目描述" value={proj.description} fullWidth />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PreviewBlock>
      )}

      {educations.length > 0 && (
        <PreviewBlock title="教育背景">
          <div className="space-y-5">
            {educations.map((edu, i) => (
              <div key={edu.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                {educations.length > 1 && <SectionTitle>教育 {i + 1}</SectionTitle>}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <PreviewField label="学校名称" value={edu.school} />
                  <PreviewField label="专业" value={edu.major} />
                  <PreviewField label="学历" value={edu.degree} />
                  <PreviewField label="开始时间" value={edu.startDate} />
                  <PreviewField label="结束时间" value={edu.endDate} />
                </div>
              </div>
            ))}
          </div>
        </PreviewBlock>
      )}

      {skills.length > 0 && (
        <PreviewBlock title="专业技能">
          <div className="space-y-1">
            {skills.map((skill, i) => (
              <p key={i} className="text-sm text-slate-900">
                {skill}
              </p>
            ))}
          </div>
        </PreviewBlock>
      )}
    </>
  );
}

export function ClassicTemplate({ data, watermark }: TemplateProps) {
  return (
    <div className="resume-page relative p-8 text-slate-800">
      {watermark && <Watermark />}
      <ResumeContent data={data} />
    </div>
  );
}

export function ModernTemplate({ data, watermark }: TemplateProps) {
  return (
    <div className="resume-page relative border-l-[6px] border-brand-700 p-8 text-slate-800">
      {watermark && <Watermark />}
      <ResumeContent data={data} />
    </div>
  );
}

export function MinimalTemplate({ data, watermark }: TemplateProps) {
  return (
    <div className="resume-page relative p-10 text-slate-800">
      {watermark && <Watermark />}
      <ResumeContent data={data} />
    </div>
  );
}

export function ProfessionalTemplate({ data, watermark }: TemplateProps) {
  return (
    <div className="resume-page relative border border-slate-300 p-8 text-slate-800">
      {watermark && <Watermark />}
      <ResumeContent data={data} />
    </div>
  );
}
