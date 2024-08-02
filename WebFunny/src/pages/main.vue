<script setup>
import { SettingsOutline, BookmarksOutline,ApertureOutline,BonfireOutline } from '@vicons/ionicons5'
</script>

<template>
  <div class="min-h-screen bg-gray-100 grid grid-cols-12">
    <Header class="col-span-12" />
    <navBar class="col-span-2" />
    <main class="col-span-10 flex flex-wrap justify-between p-1 overflow-auto min-h-[200px] mt-1.5">
      <div class="rounded-xs w-10 h-13 bg-rice mt-1" v-for="i in 9" :key="'large' + i">
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
        <div class="rounded-cs flex justify-between mx-[3px] my-1 bg-white h-[30px]">

          </div>
        <div class="rounded-cs flex-col mx-[3px] my-1 bg-white h-[30px]">
          <n-progress
              type="dashboard"
              style="width: 90px; margin-left: 20px; margin-top: 15px;"
              gap-position="bottom"
              color="#fdad45"
              :stroke-width="6"
              :percentage="80"
            >
              <div style="text-align: center; font-size: 15px; margin-top: 25px; width: 40px;">
                <n-icon size="40" color="#fdad45">
              <ApertureOutline />
            </n-icon>
                健康
              </div>
            </n-progress>
        </div>
        <div class="rounded-cs flex-col mx-[3px] my-1 bg-white h-[30px]">
          <n-progress
              type="dashboard"
              style="width: 90px; margin-left: 20px; margin-top: 15px;"
              gap-position="bottom"
              color="#fe6860"
              :stroke-width="6"
              :percentage="80"
            >
              <div style="text-align: center; font-size: 15px; margin-top: 25px; width: 40px;">
                <n-icon size="40" color="#fe6860">
              <BonfireOutline />
            </n-icon>
                性能
              </div>
            </n-progress>
        </div>
      </div>
    </main>
  </div>
</template>
