import axios from 'axios';
import { store } from '../redux/store';
import { message } from 'antd';

const customApi = axios.create({
    timeout: 5000
})
const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}`,
    timeout: 5000
});
api.interceptors.request.use(function (config) {
    const state = store.getState();
    config.headers.token = state?.loginRegister?.token || "";
    return config;
}, function (error) {
    message.error(error)
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    if (response.status === 200 && response.data?.status_code === 0) {
        message.success(response.data?.status_msg);
        return response.data;
    }
    else if (response.status === 401) {
        message.error("登录已过期，请重新登录");
        store.dispatch({ type: "LOGOUT" });
        return Promise.reject("登录已过期，请重新登录");
    } else {
        message.error(response.data?.status_msg);
        return Promise.reject(response.data?.status_msg);
    }
}, function (error) {
    message.error(error)
    return Promise.reject(error);
});

export default api;
export { customApi }