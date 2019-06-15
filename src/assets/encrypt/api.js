import axios from './encryptYes'
import {Toast} from "mint-ui"

function checkStatus(response) {
    //如果http状态正常，则直接返回数据
    if (response && response.status === 200 || response.status === 304 || response.status === 400) {
        return response.data
        //这里，如果不需要除data外的其他数据，可以直接 return response.data 这样可以让后面的代码精简一些
    }

    //异常状态下，把错误信息返回
    //因为前面我们把错误扶正了，不然像404，500这样的错误是走不到这里的
    return {
        errno: "-404",
        error: response.statusText || "网络异常，请稍后再试",
        data: response.statusText || "网络异常，请稍后再试"
    }
}

function checkCode(response) {
    if(response.status !== '200'){
        Toast(response.error);
    }
    return response
}

/**
 * @param {String} url ajax请求地址
 * @param {Object} data ajax请求数据
 * @return Promise 返回Promise 可以链式调用
 */
export function getData(url, data = {}) {
    return axios({
        method: 'post',
        url: url,
        data: {
            ...data,
        },  //post请求的数据
        timeout: 30000,//超时间，单位毫秒
        dataType: "json"
    }).then(checkStatus).then(checkCode)
    
}
