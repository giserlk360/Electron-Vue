<template>
    <div class="layout">
        <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
            <AppMenu :is-collapse="isCollapsed" />
        </div>
        <div class="main">
            <header class="header">
                <div class="toggle-btn" @click="toggleCollapse">
                    <el-icon v-if="isCollapsed">
                        <Expand />
                    </el-icon>
                    <el-icon v-else>
                        <Fold />
                    </el-icon>
                </div>
                <div class="header-right">
                    <el-switch v-model="isDarkTheme" inline-prompt active-text="深" inactive-text="浅"
                        @change="handleThemeChange" class="theme-switch" />
                    <el-dropdown trigger="click">
                        <span class="user-dropdown">
                            <el-avatar> {{ userInfo.key }} </el-avatar>
                            <span class="username"> {{ userInfo.name }} </span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>个人信息</el-dropdown-item>
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </header>
            <main class="content">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import AppMenu from './AppMenu.vue'
import { getTheme, setTheme, type Theme } from '../../utils/theme'
import { eventBus } from '../../utils/eventBus'

const isCollapsed = ref(false)
const isDarkTheme = ref(getTheme() === 'dark')

const userInfo = ref({
    name: '用户名',
    key: 'user',
    avatar: '../../assets/avator.png',
})


// 监听主题变化事件
const handleThemeChangeEvent = (theme: Theme) => {
    isDarkTheme.value = theme === 'dark'
}

// 在组件挂载时添加事件监听
onMounted(() => {
    eventBus.on('theme-change', handleThemeChangeEvent)
})

// 在组件卸载时移除事件监听
onUnmounted(() => {
    eventBus.off('theme-change', handleThemeChangeEvent)
})

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}

const handleThemeChange = () => {
    const newTheme: Theme = isDarkTheme.value ? 'dark' : 'light'
    setTheme(newTheme)
}
</script>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.sidebar {
    height: 100%;
    transition: width 0.3s;
    width: 200px;
    background-color: var(--card-background);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    z-index: 10;
}

.sidebar.collapsed {
    width: 64px;
}

.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header {
    height: 60px;
    background-color: var(--card-background);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 9;
}

.toggle-btn {
    cursor: pointer;
    font-size: 20px;
    color: var(--el-text-color-regular);
}

.header-right {
    display: flex;
    align-items: center;
    gap: 16px;
}

.theme-switch {
    margin-right: 16px;
}

.user-dropdown {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.username {
    margin-left: 8px;
    color: var(--el-text-color-primary);
}

.content {
    flex: 1;
    padding: 20px;
    overflow: auto;
    background-color: var(--app-background);
}
</style>