interface BarItem {
  key: string
  label: string
}

export const barItems: BarItem[] = [
  {
    key: 'over',
    label: '概览'
  },
  {
    key: 'errorList',
    label: '错误列表'
  },
  {
    key: 'version',
    label: '版本分析'
  },
  {
    key: 'waitError',
    label: '待处理错误'
  },
  {
    key: 'dealOverview',
    label: '处理概览'
  }
]
