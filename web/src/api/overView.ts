import http from './http'

function getOverData(params) {
  return http.post(`/wfMonitor/getTodayFlowDataByTenMin`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getUvCountMonth(params) {
  return http.post(`/wfMonitor/uvCountForMonth`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

export { getOverData, getUvCountMonth }
