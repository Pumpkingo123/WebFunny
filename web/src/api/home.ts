import http from './http'

function getDetailData(params) {
  return http.post(`/wfMonitor/getErrorInfo`, params)
}

function getProjectInfoListInRealTime(params) {
  return http.post(`/wfMonitor/project/getProjectInfoListInRealTime`, params)
}

function getAliveCusInRealTime(params) {
  return http.post(`/wfMonitor/getAliveCusInRealTime`, params)
}

function getProjectInfoInRealTime(webMonitorId: string) {
  return http.get(`/wfMonitor/project/getProjectInfoInRealTime?webMonitorId=${webMonitorId}`)
}

export {
  getDetailData,
  getProjectInfoListInRealTime,
  getAliveCusInRealTime,
  getProjectInfoInRealTime
}
