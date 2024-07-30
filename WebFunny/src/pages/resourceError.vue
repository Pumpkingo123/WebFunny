<template>
  <div class="min-h-screen bg-gray-100 grid grid-cols-12">
    <Header class="col-span-12" />
    <navBar class="col-span-2"/>
    <main class="col-span-10 flex flex-wrap justify-between p-1 overflow-auto min-h-[200px]">
      <div class="rounded-xs w-10 h-9 bg-white mt-1" v-for="i in 9" :key="'large' + i">
        <div class="w-full flex justify-between h-1">
          <span class="bg-black"></span>
        </div>
        <div class="">
        <div v-for="i in 3" :key="i" class="rounded-cs flex-col mx-[1px] bg-gray-100 mt-[1px] h-2.5"></div>
      </div>
      </div>
    </main>
  </div>
</template>

  <script setup>
  </script>

  <style scoped>
  </style>
