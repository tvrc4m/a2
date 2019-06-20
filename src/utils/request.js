import axios from 'axios'
import Qs from 'qs'
import router from '../router'
// import store from '@/store'
import Message from 'vue-multiple-message'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // request timeout
    // withCredentials: true,
    // crossDomain: true,
    transformRequest: [function (data) {
        if(data instanceof FormData){
            return data
        }else{
            data = Qs.stringify(data);
            return data;
        }
    }],
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    // config.headers['authkey'] = localStorage.getItem("authKey")
    // config.headers['sessionid'] = localStorage.getItem("sessionId")
    if(config.data instanceof FormData){
        config.headers['Content-Type'] = "multipart/form-data;charset=UTF-8"
    }
    // store.commit('SET_LOADING', true)
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        // store.commit('SET_LOADING', false)
        const res = response.data;

        if(res.errno == 101){
            Message({
                message: res.errmsg,
                type: 'error',
                duration: 5 * 1000
            });
            router.push("/login")
        } else if (res.errno != 0) {
            Message({
                message: res.errmsg,
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject('error');
        } else {
            return response.data.data;
        }
    },
    error => {
        // store.commit('SET_LOADING', false)
        console.log('err' + error) // for debug
        Message({
            message: error.errmsg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default service
