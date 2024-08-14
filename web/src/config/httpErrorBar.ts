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
      key: 'requestError',
      label: '接口请求报错'
    },
    {
      key: 'version',
      label: '版本分析'
    },
    {
      key: 'waitError',
      label: '待处理错误'
    }
  ]