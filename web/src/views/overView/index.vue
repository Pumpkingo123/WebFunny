<template>
	<div class="ml-60 bg-gray-100">
		
	</div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from "vue";

onBeforeMount(() => {
  console.log('Component is about to mount');
});

onMounted(() => {
  console.log('overView');
});
</script>