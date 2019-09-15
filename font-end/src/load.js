import axios from 'axios'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import router from './router'

let load;
function start() {
     //使用Element loading-start 方法
    load = Loading.service(
        {
            lock: true,
            text: '正在加载中',
            background: 'rgb(0,0,0)'
        }
    );
}
function end(){
     //使用Element loading-close 方法
    load.close();
}

// 请求
axios.interceptors.request.use(config=>{
    start();
    if(localStorage.UserToken){
        // 设置请求头
        config.headers.Authorization=localStorage.UserToken;
    }
    return config;
})

// 响应
axios.interceptors.response.use(response=>{
    end();
   
    return response;
},err=>{
    end();
     // 获取错误状态码，如果token过期返回401
     const {status}=err.response;
     if(status==401){
         Message.error('token已经失效，请重新登陆');
        localStorage.removeItem('UserToken'); 
        router.push('/login');
    }
     return Promise.reject(err);
})

export default axios;