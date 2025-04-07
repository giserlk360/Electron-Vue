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
    Monitor,
    Grid,
    Sunny,
    Collection,
    Histogram,
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

<style scoped>
.about-container {
    padding: 20px;
    display: flex;
    justify-content: center;
}

.about-card {
    max-width: 800px;
    width: 100%;
    background-color: var(--card-background);
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.card-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color);
}

.title {
    font-size: 24px;
    color: var(--el-text-color-primary);
    margin: 0;
}

.version {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    padding: 4px 8px;
    background-color: var(--el-color-primary-light-9);
    border-radius: 4px;
}

.card-content {
    padding: 20px;
}

.app-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.logo {
    height: 60px;
    margin-bottom: 16px;
}

.app-name {
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 8px 0;
}

.app-desc {
    color: var(--el-text-color-secondary);
    text-align: center;
}

.tech-stack {
    margin: 20px 0;
}

.tech-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background-color: var(--hover-background);
    border-radius: 6px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.tech-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tech-icon {
    font-size: 24px;
    color: var(--el-color-primary);
    margin-right: 10px;
}

.tech-name {
    font-weight: 500;
    color: var(--el-text-color-primary);
}

.tech-version {
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

.author-info {
    display: flex;
    align-items: center;
    margin: 20px 0;
}

.author-avatar {
    background-color: var(--el-color-primary);
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-right: 20px;
}

.author-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0 0 8px 0;
}

.author-bio {
    color: var(--el-text-color-secondary);
    margin: 0 0 12px 0;
}

.author-links {
    display: flex;
    gap: 16px;
}

.contact-info {
    margin: 20px 0;
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: var(--el-text-color-primary);
}

.contact-item .el-icon {
    margin-right: 10px;
    color: var(--el-color-primary);
}

.copyright {
    text-align: center;
    margin-top: 30px;
    color: var(--el-text-color-secondary);
    font-size: 14px;
}
</style>