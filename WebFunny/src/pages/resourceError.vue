<template>
  <div class="bg-gray-100 grid grid-cols-12 h-full">
    <Header class="col-span-12" />
    <navBar class="col-span-2"/>
    <main class="col-span-10 flex flex-wrap justify-between overflow-auto min-h-[200px] mt-1.5">
      <div class="mt-0.5 mx-0.5 w-full">
          <jsErrorBar />
          <div class="h-8 w-full bg-white">
          </div>
          <div class="h-full w-full flex mt-0.5 justify-between space-x-1">
            <div class="bg-white rounded-xs h-4 flex-grow"></div>
            <div class="bg-white rounded-xs h-4 flex-grow"></div>
          </div>
      </div>
    </main>
  </div>
</template>

  <script setup>

  </script>

<style scoped>

  </style>
