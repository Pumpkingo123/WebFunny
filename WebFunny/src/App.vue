<template>
	<n-config-provider :theme-overrides="themeOverrides" class="h-full">
	  <router-view></router-view>
	</n-config-provider>
  </template>
  
  <script setup>
	import themeOverrides from '../theme'
  </script>
