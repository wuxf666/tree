import axios from 'axios'
import qs from 'qs'
//请求发起前的拦截器  对数据加密
axios.interceptors.request.use(
    config => {
        console.log("未加密数据：", config.data);
        let data = config.data;
       let str = typeof data === 'string' ? data : qs.stringify(data);
        config.data = str;
        return config
    },
    err => {
        return Promise.reject(err);
    }
);
//请求返回的拦截器  解密返回的数据
axios.interceptors.response.use(
    response => {
        // if (typeof response.data === 'string') {
        //     response.data = (typeof decryptAesData === "string") ? JSON.parse(decryptAesData) : decryptAesData;
        // }
        console.log(response.data)
        return response;
    },
    error => {
        //这里我们把错误信息扶正，后面就不需要写catch了
        return Promise.resolve(error)
    }
);
export default axios
