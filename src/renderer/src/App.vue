<template>
    <router-view></router-view>
</template>

<script setup></script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: 'PingFang SC', Arial, sans-serif;
    background-color: var(--app-background);
    transition: background-color 0.3s;
}

#app {
    height: 100vh;
    width: 100%;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: var(--card-background);
}

::-webkit-scrollbar-thumb {
    background: var(--el-border-color);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #409eff;
}

.el-card {
    --el-card-bg-color: var(--card-background) !important;
    transition: background-color 0.3s;
}

/* 全局过渡效果 */
* {
    transition:
        color 0.3s,
        background-color 0.3s,
        border-color 0.3s;
}
</style>