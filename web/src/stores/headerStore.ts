import { defineStore } from 'pinia'

interface HeaderState {
  activeRoute: string | null
}

export const useHeaderStore = defineStore('header', {
  state: (): HeaderState => ({
    activeRoute: sessionStorage.getItem('activeRoute') || 'home'
  }),
  actions: {
    setActiveKey(key: string): void {
      this.activeRoute = key
      sessionStorage.setItem('activeRoute', key)
    }
  }
})