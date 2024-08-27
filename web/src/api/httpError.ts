import http from './http'

function getHttpErrorCountByDay(startDate: string, endDate: string, scope) {
  return http.get(
    `/wfMonitor/getHttpErrorCountByDay?startDate=${startDate}&endDate=${endDate}&scope=${scope}&webMonitorId=1`
  )
}

function getStatusListGroupByErrorCode(params) {
  return http.post(`/wfMonitor/getStatusListGroupByErrorCode`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

export { getHttpErrorCountByDay, getStatusListGroupByErrorCode }