import http from './http'

function getErrorInfo(params) {
  return http.post(`/wfMonitor/getErrorInfo`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getJsErrorCountByHour(timeSize: number, scope: number, webMonitorId: number) {
  return http.get(
    `/wfMonitor/getJsErrorCountByHour?timeSize=${timeSize}&scope=${scope}&webMonitorId=${webMonitorId}`
  )
}

function getHttpErrorCountByHour(timeSize: number, scope: number, webMonitorId: number) {
  return http.get(
    `/wfMonitor/getHttpErrorCountByHour?timeSize=${timeSize}&scope=${scope}&webMonitorId=${webMonitorId}`
  )
}

function getJavascriptConsoleErrorInfoListByHour(
  timeSize: number,
  scope: number,
  webMonitorId: number
) {
  return http.get(
    `/wfMonitor/getJavascriptConsoleErrorInfoListByHour?timeSize=${timeSize}&scope=${scope}&webMonitorId=${webMonitorId}`
  )
}

function getResourceErrorCountByHour(timeSize: number, scope: number, webMonitorId: number) {
  return http.get(
    `/wfMonitor/getResourceErrorCountByHour?timeSize=${timeSize}&scope=${scope}&webMonitorId=${webMonitorId}`
  )
}

export {
  getErrorInfo,
  getJsErrorCountByHour,
  getHttpErrorCountByHour,
  getJavascriptConsoleErrorInfoListByHour,
  getResourceErrorCountByHour
}
