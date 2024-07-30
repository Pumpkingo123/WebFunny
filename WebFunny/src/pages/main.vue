<template>
    <div class="min-h-screen bg-gray-100 grid grid-cols-12">
      <header />
      <navBar />
      <main class="col-span-10 grid grid-cols-3 gap-4 p-4">
        <div class="bg-red-300 p-4" v-for="i in 12" :key="i">
          Content {{ i }}
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  // Vue 3 setup script
  </script>
  
  <style scoped>
  /* Scoped CSS (if needed) */
  </style>
  