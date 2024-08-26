import http from './http';

function getLocationDataForMap(params) {
    return http.post(`/wfMonitor/getLocationDataForMap`, params, {
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    })
  }

export { getLocationDataForMap }