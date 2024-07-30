<script setup>
import { useMenuStore } from '../stores/menuStore.js';
import { useRoute } from 'vue-router';
import categoryConfig from '../../config.js';
import router from '../router/index.js';

const menuStore = useMenuStore();
const route = useRoute();

const handleMenuSelect = (key) => {
  const findRouteByKey = (key, items) => {
    for (const item of items) {
      if (item.key === key && item.route) {
        return item.route;
      }
      if (item.children) {
        const route = findRouteByKey(key, item.children);
        if (route) {
          return route;
        }
      }
    }
    return null;
  };

  const routePath = findRouteByKey(key, categoryConfig);
  if (routePath) {
    router.push(routePath);
    menuStore.setActiveItem(key); 
  }
};
</script>

<template>
  <n-layout>
    <n-layout-sider :native-scrollbar="false">
      <n-menu class="w-[62px] fixed top-1.5 h-full" :options="categoryConfig" @update:value="handleMenuSelect" :value="menuStore.activeItem" />
    </n-layout-sider>
  </n-layout>
</template>
