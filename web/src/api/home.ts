import http from './http'

class homeInfo {
  getDetailData(timeSize: number = 0, webMonitorId: string) {
    const data = {
      timeSize,
      webMonitorId
    }
    return http.post(`/wfMonitor/getErrorInfo`, data)
  }
  getProjectInfoListInRealTime(
    appStatus: string = '0',
    appType: string = 'all',
    env: string = 'all',
    searchName: string = '',
    sortType: string = 'uvDesc',
    teamId: string = 'all',
    webMonitorId: string = '1'
  ) {
    const data = {
      appStatus,
      appType,
      env,
      searchName,
      sortType,
      teamId,
      webMonitorId
    }
    return http.post(`/wfMonitor/project/getProjectInfoListInRealTime`, data)
  }
  getAliveCusInRealTime(
    webMonitorIdList: string[] = [
      'webfunny_120',
      'webfunny_121',
      'webfunny_122',
      'webfunny_123',
      'webfunny_124',
      'webfunny_125',
      'webfunny_126',
      'webfunny_127',
      'webfunny_128'
    ],
    webMonitorId: string = '1'
  ) {
    const data = {
      webMonitorIdList,
      webMonitorId
    }
    return http.post(`/wfMonitor/getAliveCusInRealTime`, data)
  }
  getProjectInfoInRealTime(webMonitorId:string){
    return http.get(`/wfMonitor/project/getProjectInfoInRealTime?webMonitorId=${webMonitorId}`)
  }
}

export default new homeInfo()
