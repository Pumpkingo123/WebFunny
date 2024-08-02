<script setup>
import Chart from 'chart.js/auto'

const range = ref([118313526e4, Date.now()]);

onMounted(() => {
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
  <body>
  <div class=" grid grid-cols-12 h-full">
    <Header class="col-span-12" />
    <navBar class="col-span-2" />
    <main class="col-span-10 flex bg-gray-100 justify-between overflow-auto h-full pt-1.5 min-h-[200px]">
      <div class="mx-0.5 w-full">
        <errorBar />
          <div class="h-15 w-full bg-white">
            <div class="w-full flex justify-between">
              <div class="w-5 ml-[5px]">时间范围</div>
              <div class="w-10  mr-1">
                <n-date-picker v-model:value="range" type="daterange" clearable />
              </div>
            </div>
             <div style="height: 100%; width: 100%; background-color: white">
            <canvas id="myChart" style="height: 100%; width: 100%"></canvas>
          </div>
          </div>
        <div class="mt-[3px] w-full flex justify-between space-x-1">
          <div class="bg-white rounded-xs h-4 flex-grow">
          </div>
          <div class="bg-white rounded-xs h-4 flex-grow"></div>
        </div>
      </div>
    </main>
  </div>
</body>
</template>



