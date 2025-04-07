<template>
    <div class="not-found-container">
        <div class="content">
            <h1 class="error-code">404</h1>
            <p class="error-title">
                页面未找到
            </p>
            <p class="error-description">
                您访问的页面不存在或已被移除
            </p>
            <el-button type="primary" @click="goHome" class="btn-primary">
                返回首页
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}
</script>

<style scoped>
.not-found-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--app-background);
}

.content {
    text-align: center;
}

.error-code {
    font-size: 6rem;
    font-weight: 700;
    color: var(--el-color-primary);
}

.error-title {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--el-text-color-primary);
    margin-top: 1rem;
}

.error-description {
    color: var(--el-text-color-regular);
    margin-top: 0.5rem;
    margin-bottom: 2rem;
}
</style>