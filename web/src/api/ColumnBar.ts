import http from './http'

class ColumnBar {
  getJsData(startDate: string, endDate: string, scope) {
    return http.get(
      `/wfMonitor/getJavascriptErrorInfoListByDay?startDate=${startDate}&endDate=${endDate}&scope=${scope}&webMonitorId=1`
    )
  }
  getHttpData(startDate: string, endDate: string, scope) {
    return http.get(
      `/wfMonitor/getHttpErrorCountByDay?startDate=${startDate}&endDate=${endDate}&scope=${scope}&webMonitorId=1`
    )
  }
}

export default ColumnBar
