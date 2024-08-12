<template>
    <div class="h-12 w-full flex items-center pl-8 text-xl flex justify-between">
      核心数据-健康
      <div class="mr-5"><n-date-picker v-model:value="timestamp" type="date" /></div>
    </div>
    <div class="h-40 mx-4 mt-4 bg-white rounded-lg">

    </div>
    <div class="h-50 mx-4 mt-4 bg-white rounded-lg">

</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const timestamp = ref(1723135260000);

</script>