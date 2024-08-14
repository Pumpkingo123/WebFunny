import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 定义接口来扩展 AxiosRequestConfig
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  validateStatus?: (status: number) => boolean
}

function createAxiosInstance(config: CustomAxiosRequestConfig = {}): AxiosInstance {
  // 设置默认配置并与传入的配置合并
  const defaultConfig: CustomAxiosRequestConfig = {
    baseURL: 'https://www.webfunny.cn',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 5000,
    validateStatus: (status) => status >= 200 && status < 300 // 或其他逻辑
    // withCredentials: true
  }

  const finalConfig = { ...defaultConfig, ...config }
  const http = axios.create(finalConfig)

  // 请求拦截器
  http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers = config.headers || {} // 确保 headers 对象存在
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: any) => {
      // 对请求错误进行处理
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  http.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === 200) {
        return response.data
      }
      return response // 返回完整的响应对象，如果需要处理其他状态
    },
    (error: any) => {
      console.log('error', error)
      // 对响应错误进行处理
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      return Promise.reject(error)
    }
  )

  return http
}

// 使用默认配置
const http = createAxiosInstance()
export default http
