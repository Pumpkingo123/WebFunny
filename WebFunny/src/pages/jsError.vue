<script setup>
import Chart from 'chart.js/auto'

const range = ref([118313526e4, Date.now()]);

onMounted(() => {
  console.log("Chart mounting");
  const overView = document.getElementById('myChart').getContext('2d')
  const myChart = new Chart(overView, {
    data: {
      labels: [
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01',
        '08-01'
      ],
      datasets: [
        {
          type: 'line',
          label: 'js error rate',
          borderColor: '#2cdd96',
          backgroundColor: '#2cdd96',
          lineTension: 0.4,
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        },
        {
          type: 'line',
          label: 'Customized error rate',
          borderColor: '#ff8639',
          backgroundColor: '#ff8639',
          lineTension: 0.4,
          data: [2, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12],
        },
        {
          type: 'bar',
          label: 'js error',
          data: [2, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12],
          backgroundColor: '#59aefc',
          stack: 'combined'
        },
        {
          type: 'bar',
          label: 'Customized error',
          data: [2, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12],
          backgroundColor: '#7a79ff',
          stack: 'combined'
        }
      ]
    },
    options: {
      scales: {
        x: {
          stacked: true // x轴堆叠
        },
        y: {
          stacked: true // y轴堆叠
        }
      },
      legend: {
        display: false,
      },
      maintainAspectRatio: false, // 不维持原始宽高比
      responsive: true // 图表是响应式的
    }
  })
})
</script>

<template>
  <div class="bg-gray-100 grid grid-cols-12 h-full">
    <Header class="col-span-12" />
    <navBar class="col-span-2" />
    <main class="col-span-10 flex flex-wrap justify-between overflow-auto min-h-[200px] mt-1.5">
      <div class="mt-0.5 mx-0.5 w-full">
        <errorBar />
        <div>
          <div class="h-8 w-full bg-white">
            <div class="h-1.5  w-full flex justify-between">
              <span class="w-5 h-1.5 ml-[5px]">时间范围</span>
              <span class="w-10 h-1.5  mr-1">
                <n-date-picker v-model:value="range" type="daterange" clearable />
              </span>
            </div>
             <div style="height: 30vh; width: 100%; background-color: white">
            <canvas id="myChart" style="height: 100%; width: 100%"></canvas>
          </div>
          </div>
        </div>
        <!-- <div class="h-full w-full flex mt-0.5 justify-between space-x-1">
          <div class="bg-white rounded-xs h-4 flex-grow"></div>
          <div class="bg-white rounded-xs h-4 flex-grow"></div>
        </div> -->
      </div>
    </main>
  </div>
</template>
