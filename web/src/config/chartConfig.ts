import { ChartDataset } from 'chart.js'

export const defaultChartColors = {
  barCol2: '#2cdd96',
  barCol1: '#ff8639',
  lineCol2: '#58aefc',
  lineCol1: '#9596fc'
}

export const defaultChartLabels = {
  lineDes1: 'line1',
  lineDes2: 'line2',
  barDes1: 'bar1',
  barDes2: 'bar2'
}

export const defaultChartData = {
  lineData: [0, 0, 0, 0, 0],
  barData: [0, 0, 0, 0, 0]
}

export const createDataset = (
  type: 'line' | 'bar',
  label: string,
  data: number[],
  borderColor: string,
  backgroundColor: string,
  yAxisID: string | undefined
): ChartDataset<'line' | 'bar'> => ({
  type,
  label,
  borderColor,
  backgroundColor,
  data,
  borderDash: [0, 0],
  yAxisID
})

// 创建默认数据集
export const createDefaultDatasets = (
  yAxisIDLine: string | undefined,
  yAxisIDBar: string | undefined
): ChartDataset<'line' | 'bar'>[] => [
  createDataset(
    'line',
    defaultChartLabels.lineDes1,
    defaultChartData.lineData,
    defaultChartColors.lineCol1,
    defaultChartColors.lineCol1,
    yAxisIDLine
  ),
  createDataset(
    'bar',
    defaultChartLabels.barDes1,
    defaultChartData.barData,
    defaultChartColors.barCol1,
    defaultChartColors.barCol1,
    yAxisIDBar
  )
]