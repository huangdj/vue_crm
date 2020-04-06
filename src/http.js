//#创建http.js文件
import axios from 'axios'
import router from '@/router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://crm.holyzq.com';

// http request 拦截器
axios.interceptors.request.use(

    config => { //将所有的axios的header里加上token_type和access_token
        config.headers.Authorization = `${localStorage.token_type} ${localStorage.access_token}`;
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 401 清除token信息并跳转到登录页面
        if (error.response.status == 401) {
            // alert('您还没有登录，请先登录')
            router.replace({    //如果失败，跳转到登录页面
                name: 'Login'
            })
        }
        return Promise.reject(error.response.data)
    });

export default axios;
