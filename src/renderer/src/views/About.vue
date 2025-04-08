<template>
    <div class="about-container">
        <div class="about-card">
            <div class="card-header">
                <h1 class="title">关于项目</h1>
                <div class="version">v{{ version }}</div>
            </div>

            <div class="card-content">
                <div class="app-info">
                    <img src="../assets/logo.png" alt="Logo" class="logo" />
                    <h2 class="app-name">Electron Vue Element</h2>
                    <p class="app-desc">基于Electron、Vue 3和Element Plus构建的现代桌面应用框架</p>
                </div>

                <el-divider>技术栈</el-divider>

                <div class="tech-stack">
                    <el-row :gutter="20">
                        <el-col :xs="12" :sm="8" :md="6" v-for="(tech, index) in techList" :key="index">
                            <div class="tech-item">
                                <el-icon class="tech-icon">
                                    <component :is="tech.icon"></component>
                                </el-icon>
                                <div class="tech-info">
                                    <div class="tech-name">{{ tech.name }}</div>
                                    <div class="tech-version">{{ tech.version }}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <el-divider>作者信息</el-divider>

                <div class="author-info">
                    <el-avatar :size="64" class="author-avatar">李</el-avatar>
                    <div class="author-details">
                        <h3 class="author-name">李康</h3>
                        <p class="author-bio">GIS工程师/ 前端工程师 / Electron爱好者</p>
                        <div class="author-links">
                            <el-link type="primary" href="https://github.com/giserlk360" target="_blank">
                                <el-icon>
                                    <Platform />
                                </el-icon> GitHub
                            </el-link>
                            <el-link type="success" href="https://giserlk.top/resume" target="_blank">
                                <el-icon>
                                    <Link />
                                </el-icon> 个人简历
                            </el-link>
                        </div>
                    </div>
                </div>

                <el-divider>联系方式</el-divider>

                <div class="contact-info">
                    <div class="contact-item">
                        <el-icon>
                            <Message />
                        </el-icon>
                        <span>likangdream@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <el-icon>
                            <Phone />
                        </el-icon>
                        <span>+86 15755080835</span>
                    </div>
                </div>

                <div class="copyright">
                    版权所有 © {{ new Date().getFullYear() }} 李康. 保留所有权利.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
    Link,
    Message,
    Phone,
    Platform
} from '@element-plus/icons-vue'

const version = ref('')

// 技术栈列表
const techList = [
    { name: 'Electron', version: 'v28.2.0', icon: 'Monitor' },
    { name: 'Vue', version: 'v3.4.15', icon: 'Sunny' },
    { name: 'Element Plus', version: 'v2.8.8', icon: 'Grid' },
    { name: 'TypeScript', version: 'v5.3.3', icon: 'Collection' },
    { name: 'ECharts', version: 'v5.4.3', icon: 'Histogram' },
]

onMounted(() => {
    // 获取版本号
    if (window.api) {
        version.value = window.api.getVersion()
    }
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables.scss' as vars;

.about-container {
    padding: vars.$spacing-md;
    @include vars.flex-center;
}

.about-card {
    max-width: 800px;
    width: 100%;
    background-color: vars.$card-bg;
    border-radius: vars.$border-radius-lg;
    box-shadow: vars.$box-shadow;
    overflow: hidden;
}

.card-header {
    padding: vars.$spacing-md;
    @include vars.flex-between;
    border-bottom: 1px solid vars.$border-color;
}

.title {
    font-size: 24px;
    color: vars.$text-primary;
    margin: 0;
}

.version {
    font-size: vars.$font-size-small;
    color: vars.$text-secondary;
    padding: 4px 8px;
    background-color: var(--el-color-primary-light-9);
    border-radius: vars.$border-radius-sm;
}

.card-content {
    padding: vars.$spacing-md;
}

.app-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: vars.$spacing-md;
}

.logo {
    height: 60px;
    margin-bottom: vars.$spacing-md;
}

.app-name {
    font-size: vars.$font-size-large;
    font-weight: 600;
    color: vars.$text-primary;
    margin: vars.$spacing-xs 0;
}

.app-desc {
    color: vars.$text-secondary;
    text-align: center;
}

.tech-stack {
    margin: vars.$spacing-md 0;
}

.tech-item {
    display: flex;
    align-items: center;
    padding: vars.$spacing-sm;
    margin-bottom: vars.$spacing-sm;
    background-color: vars.$hover-bg;
    border-radius: vars.$border-radius-md;
    @include vars.transition;

    &:hover {
        transform: translateY(-2px);
        box-shadow: vars.$box-shadow-hover;
    }
}

.tech-icon {
    font-size: 24px;
    color: vars.$primary-color;
    margin-right: vars.$spacing-sm;
}

.tech-name {
    font-weight: 500;
    color: vars.$text-primary;
}

.tech-version {
    font-size: vars.$font-size-small;
    color: vars.$text-secondary;
}

.author-info {
    display: flex;
    align-items: center;
    margin: vars.$spacing-md 0;
}

.author-avatar {
    background-color: vars.$primary-color;
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-right: vars.$spacing-md;
}

.author-name {
    font-size: vars.$font-size-medium;
    font-weight: 600;
    color: vars.$text-primary;
    margin: 0 0 vars.$spacing-xs 0;
}

.author-bio {
    color: vars.$text-secondary;
    margin: 0 0 vars.$spacing-sm 0;
}

.author-links {
    display: flex;
    gap: vars.$spacing-md;
}

.contact-info {
    margin: vars.$spacing-md 0;
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: vars.$spacing-sm;
    color: vars.$text-primary;

    .el-icon {
        margin-right: vars.$spacing-sm;
        color: vars.$primary-color;
    }
}

.copyright {
    text-align: center;
    margin-top: vars.$spacing-xl;
    color: vars.$text-secondary;
    font-size: vars.$font-size-small;
}
</style>