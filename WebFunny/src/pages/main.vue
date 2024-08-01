<script setup>
import { SettingsOutline, BookmarksOutline } from '@vicons/ionicons5'
</script>

<template>
  <div class="min-h-screen bg-gray-100 grid grid-cols-12">
    <Header class="col-span-12" />
    <navBar class="col-span-2" />
    <main class="col-span-10 flex flex-wrap justify-between p-1 overflow-auto min-h-[200px] mt-1.5">
      <div class="rounded-xs w-10 h-9 bg-white mt-1" v-for="i in 9" :key="'large' + i">
        <div class="w-full flex justify-between h-1.5 mb-[3px]">
          <div class="ml-[3px] w-2 mt-1 items-center"></div>
          <div class="mr-[3px] w-[15px] mt-1 flex justify-between items-center">
            <n-icon size="20" color="#828594">
              <BookmarksOutline />
            </n-icon>
            <n-icon size="20" color="#828594">
              <SettingsOutline />
            </n-icon>
          </div>
        </div>
        <div
          v-for="i in 3"
          :key="i"
          class="rounded-cs flex-col mx-[3px] my-1 bg-gray-100 h-[20px]"
        ></div>
      </div>
    </main>
  </div>
</template>
