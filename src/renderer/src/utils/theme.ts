// 主题类型
export type Theme = "dark" | "light";

import { eventBus } from "./eventBus";

// 主题变量映射
const themeVariables = {
  dark: {
    "--el-bg-color": "#141414",
    "--el-bg-color-overlay": "#1d1e1f",
    "--el-text-color-primary": "#ffffff",
    "--el-text-color-regular": "#909399",
    "--el-border-color": "#333333",
    "--el-color-primary": "#409eff",
    "--el-color-primary-light-3": "#3375b9",
    "--el-color-primary-light-5": "#2a598a",
    "--el-color-primary-light-7": "#213d5b",
    "--el-color-primary-light-8": "#1d3043",
    "--el-color-primary-light-9": "#18222c",
    "--el-color-primary-dark-2": "#66b1ff",
    "--el-overlay-color": "rgba(0, 0, 0, 0.8)",
    "--el-mask-color": "rgba(0, 0, 0, 0.8)",
    "--el-box-shadow": "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    "--app-background": "#141414",
    "--card-background": "#1a1a1a",
    "--hover-background": "#242424",
  },
  light: {
    "--el-bg-color": "#ffffff",
    "--el-bg-color-overlay": "#ffffff",
    "--el-text-color-primary": "#303133",
    "--el-text-color-regular": "#606266",
    "--el-border-color": "#dcdfe6",
    "--el-color-primary": "#409eff",
    "--el-color-primary-light-3": "#79bbff",
    "--el-color-primary-light-5": "#a0cfff",
    "--el-color-primary-light-7": "#c6e2ff",
    "--el-color-primary-light-8": "#d9ecff",
    "--el-color-primary-light-9": "#ecf5ff",
    "--el-color-primary-dark-2": "#337ecc",
    "--el-overlay-color": "rgba(0, 0, 0, 0.8)",
    "--el-mask-color": "rgba(0, 0, 0, 0.8)",
    "--el-box-shadow": "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    "--app-background": "#f5f7fa",
    "--card-background": "#ffffff",
    "--hover-background": "#f5f7fa",
  },
};

// 设置主题
export function setTheme(theme: Theme): void {
  // 保存主题设置到本地存储
  localStorage.setItem("theme", theme);

  // 设置 Element Plus 主题
  document.documentElement.setAttribute("data-theme", theme);

  // 应用主题变量
  const variables = themeVariables[theme];
  Object.entries(variables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });

  // 设置 body 背景色
  document.body.style.backgroundColor = variables["--app-background"];

  // 通知其他组件主题已更改
  eventBus.emit("theme-change", theme);
}

// 获取当前主题
export function getTheme(): Theme {
  return (localStorage.getItem("theme") as Theme) || "light";
}

// 初始化主题
export function initTheme(): void {
  setTheme(getTheme());
}
