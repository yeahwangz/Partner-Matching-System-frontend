import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8090/api'
})

//允许请求携带凭据，如cookie
myAxios.defaults.withCredentials = true

//请求发起前处理
myAxios.interceptors.request.use(function (config) {
    console.log('将开始发送请求',config);
    return config;
}, function (error) {
    return Promise.reject(error);
})

//响应接收后处理
myAxios.interceptors.response.use(function (response) {
    console.log('相应接收完成',response);
    return response;
}, function (error) {
    return Promise.reject(error);
})

export default myAxios;