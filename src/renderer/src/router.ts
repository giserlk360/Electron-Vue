import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router/index'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // TODO: 在此处添加路由权限控制
  next()
})

export default router
