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

function getPvCountByHour(params) {
  return http.post(`/wfMonitor/getPvCountByHour`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getUvCountByHour(params) {
  return http.post(`/wfMonitor/getUvCountByHour`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getNewCustomerCountByHour(params) {
  return http.post(`/wfMonitor/getNewCustomerCountByHour`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getCusLeavePercentByHour(params) {
  return http.post(`/wfMonitor/getCusLeavePercentByHour`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

export {
  getOverData,
  getUvCountMonth,
  getPvCountByHour,
  getUvCountByHour,
  getNewCustomerCountByHour,
  getCusLeavePercentByHour
}
