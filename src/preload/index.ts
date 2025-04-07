import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import pkg from '../../package.json'

// Custom APIs for renderer
const api = {
  getVersion: () => pkg.version
  // TODO: 在此处添加您的自定义API
}

// 定义完整的electron API
const fullElectronAPI = {
  ...electronAPI,
  ipcRenderer
  // TODO: 在此处添加您需要暴露给渲染进程的 API
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', fullElectronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = fullElectronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
