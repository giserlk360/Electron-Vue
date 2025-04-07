import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getVersion: () => string
      // TODO: 添加您的自定义API类型
    }
  }
}
