// 禁用默认菜单
export const setupGlobalEventHandlers = () => {
  const disableDefaultMenu = (e: KeyboardEvent | MouseEvent) => {
    if (e instanceof KeyboardEvent && e.altKey) {
      e.preventDefault()
    }
    if (e instanceof MouseEvent && e.type === 'contextmenu') {
      e.preventDefault()
    }
  }

  window.addEventListener('keydown', disableDefaultMenu)
  window.addEventListener('contextmenu', disableDefaultMenu)

  // 返回清理函数
  return () => {
    window.removeEventListener('keydown', disableDefaultMenu)
    window.removeEventListener('contextmenu', disableDefaultMenu)
  }
}
