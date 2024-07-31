import axios from 'axios';

function createAxiosInstance(config = {}) {
  // 设置默认配置并与传入的配置合并
  const defaultConfig = {
    baseURL: 'https://mockapi.local',
    headers: {
      'Content-type': 'application/json'
    },
    timeout: 5000,
    validateStatus: false,
    // withCredentials: true
  };

  const finalConfig = { ...defaultConfig, ...config };
  const http = axios.create(finalConfig);

  http.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    response => {
      if (response.status === 200) {
        return response.data;
      }
      return response; // 返回完整的响应对象，如果需要处理其他状态
    },
    error => {
      console.log('error', error);
      // 对响应错误做处理
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
      }
      return Promise.reject(error);
    },
  );

  return http;
}

// 使用默认配置
const http = createAxiosInstance();
export default http;