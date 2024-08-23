import http from './http'

function getPageLoadOverviewSimple(params) {
  return http.post(`/wfMonitor/getPageLoadOverviewSimple`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getPerfDataForUrlByDaySimple(params) {
  return http.post(`/wfMonitor/getPerfDataForUrlByDaySimple`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getPerfInfoByNetWork(params) {
  return http.post(`/wfMonitor/getPerfInfoByNetWork`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getHttpLoadTimeForAll(params) {
  return http.post(`/wfMonitor/getHttpLoadTimeForAll`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getHttpLoadTimePercentSimple(params) {
  return http.post(`/wfMonitor/getHttpLoadTimePercentSimple`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

function getHttpLoadTimeListByUrl(params) {
  return http.post(`/wfMonitor/getHttpLoadTimeListByUrl`, params, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

export {
  getPageLoadOverviewSimple,
  getPerfDataForUrlByDaySimple,
  getPerfInfoByNetWork,
  getHttpLoadTimeForAll,
  getHttpLoadTimePercentSimple,
  getHttpLoadTimeListByUrl
}
