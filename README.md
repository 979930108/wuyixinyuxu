# 简历工坊

专业在线简历制作工具，支持多模板实时预览、PDF 导出、激活码会员授权。适合部署到 Vercel，在闲鱼等平台售卖激活码。

## 功能

- **4 套精品模板**：经典商务（免费）、现代侧边栏、极简留白、专业结构化（会员）
- **实时预览**：编辑即所见
- **PDF 导出**：会员高清无水印导出 A4 PDF
- **激活码系统**：通过环境变量配置激活码，支持永久/限时会员
- **本地存储**：简历数据自动保存在浏览器，无需注册

## 快速开始

> 📖 **完整部署文档**（GitHub → Vercel → 域名 → 激活码，含问题排查）：[`docs/部署运维完整指南.md`](docs/部署运维完整指南.md)

```bash
npm install
cp .env.example .env.local
npm run dev
```

访问 http://localhost:3000

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在 **Settings → Environment Variables** 添加：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `ACTIVATION_SECRET` | 签名密钥，至少 16 位随机字符串 | `your-random-secret-key-32chars` |
| `ACTIVATION_CODES` | 激活码列表 | `CODE-A:lifetime,CODE-B:30` |

### 激活码格式

```
激活码:类型
```

- `lifetime` = 永久会员
- 数字 = 有效天数（如 `30` 表示 30 天）
- 多个激活码用英文逗号分隔

**示例：**

```
XIANYU-VIP-001:lifetime,XIANYU-30DAY-002:30,PROMO-7DAY:7
```

## 测试激活码（开发环境）

`.env.example` 中预置了测试码：

- `DEMO-2026-PRO` — 永久会员
- `TEST-7DAY-001` — 7 天会员
- `XIANYU-VIP-8888` — 永久会员

复制到 `.env.local` 后即可本地测试。

## 闲鱼售卖建议

**定价参考：**
- 体验版（7天）：9.9 元
- 月卡（30天）：19.9 元
- 永久会员：29.9～49.9 元

**商品描述要点：**
1. 说明是「在线简历工具网页版，非软件安装」
2. 购买后发送激活码 + 网站链接
3. 强调：4 模板、PDF 导出、无限次使用
4. 附 1～2 张效果截图

**生成激活码：**
在 Vercel 环境变量 `ACTIVATION_CODES` 中追加新码， redeploy 后生效。建议格式：`XIANYU-YYYYMMDD-XXXX:lifetime`

## 技术栈

- Next.js 14 + TypeScript
- Tailwind CSS
- Zustand（状态管理）
- html2canvas + jsPDF（PDF 导出）

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 落地页
│   ├── builder/page.tsx  # 简历编辑器
│   └── api/activate/     # 激活码验证 API
├── components/
│   ├── builder/          # 编辑器组件
│   └── resume/           # 简历模板
└── lib/                  # 工具、状态、类型
```
