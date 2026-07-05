import Link from "next/link";
import {
  CheckCircle2,
  Crown,
  Download,
  FileText,
  Layout,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "4 套精品模板",
    desc: "经典商务、现代侧边栏、极简留白、专业结构化，覆盖各行业求职场景",
  },
  {
    icon: Zap,
    title: "实时预览",
    desc: "左侧编辑、右侧即时呈现，改一个字立刻看到效果",
  },
  {
    icon: Download,
    title: "高清 PDF 导出",
    desc: "会员一键导出 A4 尺寸 PDF，直接投递 HR，无水印",
  },
  {
    icon: Sparkles,
    title: "激活码解锁",
    desc: "闲鱼购买激活码，输入即可解锁全部模板与导出功能",
  },
];

const steps = [
  { num: "01", title: "填写信息", desc: "按模块填写个人、工作、项目、教育经历" },
  { num: "02", title: "选择模板", desc: "挑选最适合你的行业和岗位风格" },
  { num: "03", title: "导出投递", desc: "导出 PDF，直接用于求职申请" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">简历工坊</span>
          </div>
          <Link href="/builder" className="btn-primary">
            开始制作
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white px-4 py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm text-brand-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            专业求职简历 · 在线制作 · 一键导出
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            10 分钟做出
            <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
              {" "}专业简历
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            精美模板 + 实时预览 + PDF 导出。专为求职者设计，无需 Word 排版，
            填表即可生成可直接投递的专业简历。
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/builder" className="btn-primary px-8 py-3 text-base">
              免费开始制作
            </Link>
            <Link href="/builder?activate=1" className="btn-secondary px-8 py-3 text-base">
              <Crown className="h-4 w-4 text-accent" />
              输入激活码
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              免费试用经典模板
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              数据本地保存
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              无需注册登录
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">为什么选择简历工坊</h2>
            <p className="mt-3 text-slate-600">好工具，让求职更高效</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                  <f.icon className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">三步完成专业简历</h2>
            <p className="mt-3 text-slate-400">简单直观，上手即用</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold">
                  {s.num}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-brand-50 p-8 text-center sm:p-12">
            <Crown className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">会员权益</h2>
            <p className="mt-2 text-slate-600">闲鱼购买激活码，解锁全部功能</p>

            <div className="mt-6 flex flex-col items-center gap-8">
              <ul className="space-y-2 text-left text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  全部 4 套精美简历模板
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  高清 PDF 导出，无水印
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  无限次编辑与导出
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  数据浏览器本地自动保存
                </li>
              </ul>

              <Link href="/builder?activate=1" className="btn-accent px-8 py-3">
                立即开始 · 输入激活码
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
        <p>© 2026 简历工坊 · 专业在线简历制作工具</p>
      </footer>
    </div>
  );
}
