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

<style lang="scss" scoped>
@use '../../assets/styles/variables.scss' as vars;

.layout {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.sidebar {
    height: 100%;
    @include vars.transition(width);
    width: vars.$sidebar-width;
    background-color: vars.$card-bg;
    box-shadow: vars.$box-shadow-light;
    z-index: 10;

    &.collapsed {
        width: vars.$sidebar-collapsed-width;
    }
}

.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header {
    height: vars.$header-height;
    background-color: vars.$card-bg;
    box-shadow: vars.$box-shadow-light;
    @include vars.flex-between;
    padding: 0 vars.$spacing-md;
    z-index: 9;
}

.toggle-btn {
    cursor: pointer;
    font-size: vars.$font-size-large;
    color: vars.$text-regular;
}

.header-right {
    @include vars.flex-center;
    gap: vars.$spacing-md;
}

.theme-switch {
    margin-right: vars.$spacing-md;
}

.user-dropdown {
    @include vars.flex-center;
    cursor: pointer;
}

.username {
    margin-left: vars.$spacing-xs;
    color: vars.$text-primary;
}

.content {
    flex: 1;
    padding: vars.$spacing-md;
    overflow: auto;
    background-color: vars.$bg-color;
}
</style>