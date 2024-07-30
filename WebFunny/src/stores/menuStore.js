import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    activeItem: 'main', 
  }),
  actions: {
    setActiveItem(item) {
      this.activeItem = item;
    }
  }
});