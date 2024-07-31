import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  persist: true,
	state: () => ({
		activeItem: 'main',
	}),
	actions: {
		setActiveItem(item) {
			this.activeItem = item;
		},
	},
  getters: {
    getActiveItem(state) {
        return this.activeItem;
    }
},
});
