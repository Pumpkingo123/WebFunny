import http from './http'

function getJsData(startDate: string, endDate: string, scope) {
  return http.get(
    `/wfMonitor/getJavascriptErrorInfoListByDay?startDate=${startDate}&endDate=${endDate}&scope=${scope}&webMonitorId=1`
  )
}
function getHttpData(startDate: string, endDate: string, scope) {
  return http.get(
    `/wfMonitor/getHttpErrorCountByDay?startDate=${startDate}&endDate=${endDate}&scope=${scope}&webMonitorId=1`
  )
}

export { getJsData, getHttpData }
