import axios from 'axios';

const api = axios.create({
  baseURL: 'https://computerprogress.xyz/api/v1/'
})

// api.interceptors.request.use(async config => ({
//   ...config,
//   headers: {
//     ...config.headers,
//     Authorization: aqui a autorization
//   }
// }))

export default api
