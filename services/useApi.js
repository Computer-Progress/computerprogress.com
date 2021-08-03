import axios from 'axios';
import { useSelector } from 'react-redux'

export default () => {
    const user = useSelector(state => state.UserReducer)

    const api = axios.create({
      baseURL: 'https://computerprogress.xyz/api/v1/'
    });

    api.interceptors.request.use(async config => ({
      ...config,
      headers: {
        ...config.headers,
        Authorization: user.token
      }
    }));

    return api;
}

