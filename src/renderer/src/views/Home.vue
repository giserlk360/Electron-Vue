<template>
    <div class="home-container">
        <div class="content-wrapper">
            <div class="gradient-background"></div>
            <div class="card-container">
                <div class="card-content">
                    <div class="header">
                        <h1 class="title">Electron Vue Element</h1>
                        <span class="version">v{{ version }}</span>
                    </div>
                    <div class="divider">
                        <div class="description">
                            <p>这是一个基于以下技术栈的脚手架：</p>
                            <ul class="feature-list">
                                <li>Electron - 跨平台桌面应用程序框架</li>
                                <li>Vue 3 - 渐进式 JavaScript 框架</li>
                                <li>TypeScript - 类型化的 JavaScript</li>
                                <li>Element Plus - 组件库</li>
                            </ul>
                            <p>
                                这个脚手架集成了深色/浅色主题切换、跨域处理、基础路由、工具函数等内容，可以快速开始您的项目开发。
                            </p>
                        </div>
                        <div class="theme-switch">
                            <div class="theme-control">
                                <span>主题切换:</span>
                                <el-switch v-model="isDarkTheme" active-text="深色" inactive-text="浅色"
                                    @change="handleThemeChange" />
                            </div>
                        </div>
                    </div>
                    <div class="button-container">
                        <el-button type="primary" class="btn-primary" @click="openDemo">查看示例</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTheme, setTheme, type Theme } from '../utils/theme'

const router = useRouter()
const version = ref('')
const isDarkTheme = ref(getTheme() === 'dark')

onMounted(() => {
    // 获取版本号
    if (window.api) {
        version.value = window.api.getVersion()
    }
})

const handleThemeChange = () => {
    const newTheme: Theme = isDarkTheme.value ? 'dark' : 'light'
    setTheme(newTheme)
}

const openDemo = () => {
    // 跳转到示例页面
    router.push('/examples/table')
}
</script>

<style scoped>
.home-container {
    min-height: 100vh;
    background-color: var(--app-background);
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.content-wrapper {
    position: relative;
    padding: 0.75rem 0;
    max-width: 36rem;
    margin: 0 auto;
}

.gradient-background {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, var(--el-color-primary), var(--el-color-primary-dark-2));
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: skewY(-6deg);
    border-radius: 1.5rem;
}

@media (min-width: 640px) {
    .gradient-background {
        transform: rotate(-6deg);
    }
}

.card-container {
    position: relative;
    padding: 2.5rem 1rem;
    background-color: var(--card-background);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
}

@media (min-width: 640px) {
    .card-container {
        padding: 5rem;
        border-radius: 1.5rem;
    }
}

.card-content {
    max-width: 28rem;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--el-text-color-primary);
}

.version {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--el-text-color-regular);
}

.divider {
    border-top: 1px solid var(--el-border-color);
}

.description {
    padding: 2rem 0;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--el-text-color-regular);
}

@media (min-width: 640px) {
    .description {
        font-size: 1.125rem;
    }
}

.description p {
    margin-bottom: 1rem;
}

.feature-list {
    list-style-type: disc;
    padding-left: 1.25rem;
}

.feature-list li {
    margin-bottom: 0.5rem;
}

.theme-switch {
    padding-top: 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 700;
}

@media (min-width: 640px) {
    .theme-switch {
        font-size: 1.125rem;
    }
}

.theme-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}
</style>