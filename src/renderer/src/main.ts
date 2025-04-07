import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import { initTheme } from './utils/theme'
import { setupGlobalEventHandlers } from './utils/globalUtils'

// 初始化主题
initTheme()

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 设置全局事件处理
setupGlobalEventHandlers()

app.use(ElementPlus)
app.use(router)
app.mount('#app')
