<template>
    <el-menu :default-active="activeIndex" class="app-menu" :collapse="isCollapse" :router="true"
        :background-color="getMenuBackgroundColor()" :text-color="getMenuTextColor()"
        :active-text-color="getMenuActiveTextColor()">
        <div class="logo-container" :style="{ backgroundColor: getMenuBackgroundColor() }">
            <span class="logo-text" v-if="!isCollapse">Electron</span>
            <img src="../../assets/logo.png" alt="Logo" class="logo" v-if="!isCollapse" />
            <img src="../../assets/logo-small.png" alt="Logo" class="logo-small" v-else />
        </div>

        <el-menu-item index="/">
            <el-icon>
                <HomeFilled />
            </el-icon>
            <template #title>首页</template>
        </el-menu-item>

        <el-sub-menu index="examples">
            <template #title>
                <el-icon>
                    <Document />
                </el-icon>
                <span>示例页面</span>
            </template>
            <el-menu-item index="/examples/table">
                <el-icon>
                    <Grid />
                </el-icon>
                <span>表格示例</span>
            </el-menu-item>
            <el-menu-item index="/examples/form">
                <el-icon>
                    <EditPen />
                </el-icon>
                <span>表单示例</span>
            </el-menu-item>
            <el-menu-item index="/examples/chart">
                <el-icon>
                    <PieChart />
                </el-icon>
                <span>图表示例</span>
            </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/about">
            <el-icon>
                <InfoFilled />
            </el-icon>
            <template #title>关于</template>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    HomeFilled,
    Document,
    Grid,
    EditPen,
    PieChart,
    InfoFilled
} from '@element-plus/icons-vue'
import { getTheme, type Theme } from '../../utils/theme'
import { eventBus } from '../../utils/eventBus'

const props = defineProps({
    isCollapse: {
        type: Boolean,
        default: false
    }
})

const route = useRoute()

// 根据当前路由设置活动菜单项
const activeIndex = computed(() => {
    return route.path
})

// 存储当前主题
const currentTheme = ref<Theme>(getTheme())

// 监听主题变化
const handleThemeChange = (theme: Theme) => {
    currentTheme.value = theme
}

// 获取菜单背景色
const getMenuBackgroundColor = () => {
    return currentTheme.value === 'dark' ? '#1a1a1a' : '#ffffff'
}

// 获取菜单文本颜色
const getMenuTextColor = () => {
    return currentTheme.value === 'dark' ? '#909399' : '#606266'
}

// 获取菜单激活文本颜色
const getMenuActiveTextColor = () => {
    return '#409eff'
}

// 在组件挂载时添加事件监听
onMounted(() => {
    eventBus.on('theme-change', handleThemeChange)
})

// 在组件卸载时移除事件监听
onUnmounted(() => {
    eventBus.off('theme-change', handleThemeChange)
})
</script>

<style scoped>
.app-menu {
    height: 100%;
    border-right: 1px solid var(--el-border-color);
    transition: background-color 0.3s, border-color 0.3s;
}

.app-menu:not(.el-menu--collapse) {
    width: 200px;
}

.logo-container {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 20px;
    transition: background-color 0.3s;
}

.logo-text {
    font-size: 20px;
    font-weight: bold;
}

.logo {
    height: 40px;
}

.logo-small {
    height: 30px;
}
</style>