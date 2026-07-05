export type TemplateId = "classic" | "modern" | "minimal" | "professional";

export interface BasicInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  link: string;
}

export interface ResumeData {
  basic: BasicInfo;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: string[];
}

export interface ActivationInfo {
  code: string;
  plan: "lifetime" | "trial";
  expiresAt: string | null;
  activatedAt: string;
  token: string;
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  premium: boolean;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic",
    name: "经典商务",
    description: "传统稳重，适合金融、管理、行政类岗位",
    premium: false,
  },
  {
    id: "modern",
    name: "现代侧边栏",
    description: "设计感强，适合互联网、设计、产品岗位",
    premium: true,
  },
  {
    id: "minimal",
    name: "极简留白",
    description: "清爽简约，适合技术、研究、咨询岗位",
    premium: true,
  },
  {
    id: "professional",
    name: "专业结构化",
    description: "条理清晰，适合工程、医疗、教育岗位",
    premium: true,
  },
];
