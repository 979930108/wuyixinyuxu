import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "简历工坊 - 专业在线简历制作工具",
  description:
    "精美简历模板，实时预览，一键导出 PDF。专为求职者打造的专业简历制作工具。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
