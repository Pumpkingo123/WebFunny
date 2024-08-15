import http from './http'

class overView {
  getOverData(timeSize: number = 0, chooseUserTag: string = "", webMonitorId: string = "1") {
    const data = `timeSize=${timeSize}&chooseUserTag=${chooseUserTag}&webMonitorId=${webMonitorId}`
    return http.post(
      `/wfMonitor/getTodayFlowDataByTenMin`,
      data,
      {
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8'
        }
      }
    )
  }
}

// class overView {
//   getOverData(timeSize: number = 0, chooseUserTag: string = "", webMonitorId: string = "1") {
//     const data = {
//       timeSize,
//       chooseUserTag,
//       webMonitorId
//     }
//     return http.post(
//       `/wfMonitor/getTodayFlowDataByTenMin`,
//       data,
//     )
//   }
// }

export default overView
