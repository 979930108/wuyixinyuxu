import type { ResumeData } from "./types";
import { generateId } from "./utils";

export const emptyResume: ResumeData = {
  basic: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  experiences: [],
  educations: [],
  projects: [],
  skills: [],
};

export const sampleResume: ResumeData = {
  basic: {
    name: "张明",
    title: "高级前端工程师",
    email: "zhangming@email.com",
    phone: "138-0000-0000",
    location: "上海",
    website: "github.com/zhangming",
    summary:
      "5年前端开发经验，精通 React/Vue 生态，具备从0到1搭建中后台与移动端 H5 的完整能力。注重代码质量与用户体验，有团队带教与跨部门协作经验。",
  },
  experiences: [
    {
      id: generateId(),
      company: "某互联网科技有限公司",
      position: "高级前端工程师",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description:
        "负责核心业务中台前端架构设计与开发，主导组件库建设，页面性能优化 40%。\n带领 3 人小组完成多个重点项目按期上线，与产品、设计紧密协作。",
    },
    {
      id: generateId(),
      company: "某软件有限公司",
      position: "前端工程师",
      startDate: "2019-07",
      endDate: "2022-02",
      current: false,
      description:
        "参与企业 SaaS 产品前端开发，使用 React + TypeScript 构建可复用业务模块。\n独立完成多个客户定制项目，获得年度优秀员工。",
    },
  ],
  educations: [
    {
      id: generateId(),
      school: "某某大学",
      degree: "本科",
      major: "计算机科学与技术",
      startDate: "2015-09",
      endDate: "2019-06",
      description: "主修课程：数据结构、操作系统、软件工程。获校级奖学金。",
    },
  ],
  projects: [
    {
      id: generateId(),
      name: "智能简历助手",
      role: "前端负责人",
      startDate: "2025-01",
      endDate: "2025-06",
      description:
        "基于 Next.js 的在线简历编辑平台，支持多模板实时预览与 PDF 导出，日活 5000+。",
      link: "resume.example.com",
    },
  ],
  skills: [
    "JavaScript / TypeScript",
    "React / Next.js / Vue",
    "Node.js",
    "Tailwind CSS",
    "Webpack / Vite",
    "Git / CI/CD",
  ],
};

/** @deprecated use emptyResume or sampleResume */
export const defaultResume = sampleResume;
