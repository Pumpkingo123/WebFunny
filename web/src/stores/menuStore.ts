import { defineStore } from 'pinia'

interface MenuState {
  activeKey: string | null
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    activeKey: sessionStorage.getItem('activeKey') || 'overAll'
  }),
  actions: {
    setActiveKey(key: string): void {
      this.activeKey = key
      sessionStorage.setItem('activeKey', key)
    }
  }
})
