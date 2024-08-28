import http from './http'

function getResourceLoadInfoListByDay(params) {
  return http.post(`/wfMonitor/getResourceLoadInfoListByDay`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getResourceErrorCountByDay(webMonitorId){
  return http.get(`/wfMonitor/getResourceErrorCountByDay?webMonitorId=${webMonitorId}`)
}

export {
    getResourceLoadInfoListByDay,
    getResourceErrorCountByDay
}
