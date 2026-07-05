"use client";

import { useState, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { Education, Experience, Project, ResumeData } from "@/lib/types";
import { generateId } from "@/lib/utils";

function SectionHeader({
  title,
  onAdd,
  addLabel,
}: {
  title: string;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-brand-600 hover:bg-brand-50"
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel || "添加"}
        </button>
      )}
    </div>
  );
}

function ListItemEditor({
  onRemove,
  children,
}: {
  onRemove: () => void;
  children: ReactNode;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      {confirming ? (
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <span className="text-xs text-red-600">确认删除？</span>
          <button
            onClick={() => {
              onRemove();
              setConfirming(false);
            }}
            className="rounded bg-red-600 px-2 py-0.5 text-xs text-white hover:bg-red-700"
          >
            删除
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="rounded px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-200"
          >
            取消
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="absolute right-3 top-3 rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
          title="删除"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
      <div className="space-y-3 pr-8">{children}</div>
    </div>
  );
}

export function ResumeEditor() {
  const { resume, setResume } = useAppStore();

  const update = (partial: Partial<ResumeData>) => {
    setResume({ ...resume, ...partial });
  };

  const updateExperience = (id: string, partial: Partial<Experience>) => {
    update({
      experiences: resume.experiences.map((e) =>
        e.id === id ? { ...e, ...partial } : e
      ),
    });
  };

  const updateEducation = (id: string, partial: Partial<Education>) => {
    update({
      educations: resume.educations.map((e) =>
        e.id === id ? { ...e, ...partial } : e
      ),
    });
  };

  const updateProject = (id: string, partial: Partial<Project>) => {
    update({
      projects: resume.projects.map((p) =>
        p.id === id ? { ...p, ...partial } : p
      ),
    });
  };

  return (
    <div className="space-y-8">
      <section>
        <SectionHeader title="头部信息" />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-slate-500">姓名</label>
            <input
              className="input-field"
              placeholder="你的真实姓名"
              value={resume.basic.name}
              onChange={(e) =>
                update({ basic: { ...resume.basic, name: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">手机号</label>
            <input
              className="input-field"
              placeholder="138-0000-0000"
              value={resume.basic.phone}
              onChange={(e) =>
                update({ basic: { ...resume.basic, phone: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">邮箱</label>
            <input
              className="input-field"
              placeholder="name@email.com"
              value={resume.basic.email}
              onChange={(e) =>
                update({ basic: { ...resume.basic, email: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">所在地</label>
            <input
              className="input-field"
              placeholder="如：上海"
              value={resume.basic.location}
              onChange={(e) =>
                update({ basic: { ...resume.basic, location: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">个人网站</label>
            <input
              className="input-field"
              placeholder="github.com/xxx（选填）"
              value={resume.basic.website}
              onChange={(e) =>
                update({ basic: { ...resume.basic, website: e.target.value } })
              }
            />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="求职意向" />
        <input
          className="input-field"
          placeholder="如：高级前端工程师 / 产品经理"
          value={resume.basic.title}
          onChange={(e) =>
            update({ basic: { ...resume.basic, title: e.target.value } })
          }
        />
      </section>

      <section>
        <SectionHeader title="个人简介" />
        <textarea
          className="input-field min-h-[100px] resize-y"
          placeholder="简要介绍你的优势、经验和职业目标..."
          value={resume.basic.summary}
          onChange={(e) =>
            update({ basic: { ...resume.basic, summary: e.target.value } })
          }
        />
      </section>

      <section>
        <SectionHeader
          title="工作经历"
          addLabel="添加经历"
          onAdd={() =>
            update({
              experiences: [
                ...resume.experiences,
                {
                  id: generateId(),
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: "",
                },
              ],
            })
          }
        />
        <div className="space-y-4">
          {resume.experiences.map((exp) => (
            <ListItemEditor
              key={exp.id}
              onRemove={() =>
                update({
                  experiences: resume.experiences.filter((e) => e.id !== exp.id),
                })
              }
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="input-field"
                  placeholder="公司名称"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="职位"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="开始时间 如 2022-03"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                />
                <div className="flex gap-2">
                  <input
                    className="input-field flex-1"
                    placeholder="结束时间"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  />
                  <label className="flex shrink-0 items-center gap-1.5 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          current: e.target.checked,
                          endDate: e.target.checked ? "" : exp.endDate,
                        })
                      }
                    />
                    至今
                  </label>
                </div>
              </div>
              <textarea
                className="input-field min-h-[80px] resize-y"
                placeholder="工作内容和成果..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
              />
            </ListItemEditor>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="项目经历"
          addLabel="添加项目"
          onAdd={() =>
            update({
              projects: [
                ...resume.projects,
                {
                  id: generateId(),
                  name: "",
                  role: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  link: "",
                },
              ],
            })
          }
        />
        <div className="space-y-4">
          {resume.projects.map((proj) => (
            <ListItemEditor
              key={proj.id}
              onRemove={() =>
                update({
                  projects: resume.projects.filter((p) => p.id !== proj.id),
                })
              }
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="input-field"
                  placeholder="项目名称"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="担任角色"
                  value={proj.role}
                  onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="开始时间"
                  value={proj.startDate}
                  onChange={(e) => updateProject(proj.id, { startDate: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="结束时间"
                  value={proj.endDate}
                  onChange={(e) => updateProject(proj.id, { endDate: e.target.value })}
                />
                <input
                  className="input-field sm:col-span-2"
                  placeholder="项目链接（选填）"
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                />
              </div>
              <textarea
                className="input-field min-h-[80px] resize-y"
                placeholder="项目描述和你的贡献..."
                value={proj.description}
                onChange={(e) => updateProject(proj.id, { description: e.target.value })}
              />
            </ListItemEditor>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="教育背景"
          addLabel="添加教育"
          onAdd={() =>
            update({
              educations: [
                ...resume.educations,
                {
                  id: generateId(),
                  school: "",
                  degree: "",
                  major: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                },
              ],
            })
          }
        />
        <div className="space-y-4">
          {resume.educations.map((edu) => (
            <ListItemEditor
              key={edu.id}
              onRemove={() =>
                update({
                  educations: resume.educations.filter((e) => e.id !== edu.id),
                })
              }
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="input-field"
                  placeholder="学校名称"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="专业"
                  value={edu.major}
                  onChange={(e) => updateEducation(edu.id, { major: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="学历 如 本科"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                />
                <div className="flex gap-2">
                  <input
                    className="input-field"
                    placeholder="开始"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                  <input
                    className="input-field"
                    placeholder="结束"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
              </div>
            </ListItemEditor>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="专业技能" />
        <p className="mb-2 text-xs text-slate-400">每行填写一项技能</p>
        <textarea
          className="input-field min-h-[80px]"
          placeholder="每行一项技能，例如：&#10;JavaScript / TypeScript&#10;React / Next.js"
          value={resume.skills.join("\n")}
          onChange={(e) =>
            update({
              skills: e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </section>
    </div>
  );
}
