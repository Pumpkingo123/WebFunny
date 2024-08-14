import http from './http'

class overView {
  getOverData(timeSize: number = 0, chooseUserTag: string = "", webMonitorId: string = "1") {
    const data = `timeSize=${timeSize}&chooseUserTag=${chooseUserTag}&webMonitorId=${webMonitorId}`
    return http.post(
      `/getTodayFlowDataByTenMin`,
      data,
      {
        headers: {
          'Content-Type': 'text/plain' // 指定 Content-Type 为 text/plain
        }
      }
    )
  }
}

export default overView
