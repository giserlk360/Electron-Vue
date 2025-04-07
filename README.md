# Electron Vue Element 脚手架

这是一个基于 Electron + Vue3 + TypeScript + Element Plus 的脚手架项目。

## 特性

- ⚡️ Electron 28+
- 🖖 Vue 3 + TypeScript + Vite
- 🔥 Element Plus UI 组件库
- 📊 ECharts 图表集成
- 🌗 支持深色/浅色主题切换
- 📦 开箱即用的项目结构
- 🛠️ 集成常用工具函数
- 📱 响应式设计支持

## 项目结构

```
electron-vue-element/
├── .editorconfig                # 编辑器配置
├── .eslintignore                # ESLint 忽略配置
├── .eslintrc.cjs                # ESLint 配置
├── .gitignore                   # Git 忽略配置
├── .npmrc                       # NPM 配置
├── .prettierignore              # Prettier 忽略配置
├── .prettierrc.yaml             # Prettier 配置
├── electron-builder.yml         # Electron Builder 配置
├── electron.vite.config.ts      # Electron Vite 配置
├── package.json                 # 项目依赖
├── tsconfig.json                # TypeScript 配置
├── tsconfig.node.json           # Node TypeScript 配置
├── tsconfig.web.json            # Web TypeScript 配置
├── resources/                   # 应用资源(图标等)
└── src/                         # 源代码
    ├── main/                    # 主进程
    │   └── index.ts             # 主进程入口
    ├── preload/                 # 预加载脚本
    │   ├── index.d.ts           # 类型定义
    │   └── index.ts             # 预加载脚本入口
    └── renderer/                # 渲染进程
        ├── index.html           # HTML 模板
        └── src/                 # 渲染进程源码
            ├── assets/          # 静态资源
            ├── components/      # 公共组件
            │   ├── layout/      # 布局相关组件 
            ├── router/          # 路由配置
            ├── types/           # 类型定义
            ├── utils/           # 工具函数
            ├── views/           # 页面视图
            │   ├── examples/    # 示例页面
            ├── App.vue          # 根组件
            ├── env.d.ts         # 环境类型定义
            ├── main.ts          # 渲染进程入口
            └── router.ts        # 路由配置入口
```

## 快速开始

### 安装依赖

```bash
# 使用npm
npm install

# 或使用pnpm
pnpm install
```

### 开发模式

```bash
# 使用npm
npm run dev

# 或使用pnpm
pnpm dev
```

### 打包应用

```bash
# 通用打包
npm run build

# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## 扩展指南

### 添加新页面

1. 在 `src/renderer/src/views` 中创建新的 Vue 组件
2. 在 `src/renderer/src/router/index.ts` 中添加新的路由配置

### 添加新组件

在 `src/renderer/src/components` 目录下创建您的自定义组件。

### 使用 Element Plus

项目已集成 Element Plus，您可以直接在模板中使用 Element Plus 组件：

```html
<el-button type="primary">主要按钮</el-button>
<el-table :data="tableData">
  <!-- 表格内容 -->
</el-table>
```

### 使用主题

这个脚手架提供了深色模式和浅色模式的支持，您可以通过以下方式切换主题：

```ts
import { setTheme, getTheme } from '../utils/theme'

// 获取当前主题
const currentTheme = getTheme() // 'dark' | 'light'

// 设置主题
setTheme('dark') // 或 'light'
```

### Electron API

您可以通过 `window.api` 访问预加载的 Electron API：

```ts
// 示例: 获取应用版本
const version = window.api.getVersion()
```

## 示例页面

项目包含以下示例页面，可供参考：

1. **表格示例** - 展示使用 Element Plus 表格组件的高级用法
2. **表单示例** - 展示表单验证、复杂表单元素的使用
3. **图表示例** - 展示 ECharts 图表的集成和使用

## 贡献指南

欢迎提交 Issue 或 Pull Request 来完善这个项目。

## 作者

**李康** - GIS工程师 / 前端工程师 / Electron爱好者

- Email: likangdream@gmail.com
- GitHub: [GitHub主页](https://github.com/giserlk360)

## 许可证

MIT 