import http from './http'

function getJsData(startDate: string, endDate: string, scope) {
  return http.get(
    `/wfMonitor/getJavascriptErrorInfoListByDay?startDate=${startDate}&endDate=${endDate}&scope=${scope}&webMonitorId=1`
  )
}

function getJsErrorCountListByHour(params) {
  return http.post(`/wfMonitor/getJsErrorCountListByHour`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getJsErrorSortInfo(params){
  return http.post(`/wfMonitor/getJsErrorSortInfo`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

export { getJsData, getJsErrorCountListByHour, getJsErrorSortInfo }
