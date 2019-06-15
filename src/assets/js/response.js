import { getData } from "../encrypt/api";
const domainName = 'http://backend.tree.com/rest'
// const domainName = 'http://backend.360tryst.com/rest'
//用户登录
export function login(params = {}) {
    const url = domainName + "/users/login";
    return getData(url, params);
}
//获取节点树
export function getTree(params = {}) {
    const url = domainName + "/index/nodes";
    return getData(url, params);
}
//获取等级
export function getLevel(params = {}) {
    const url = domainName + "/index/levels";
    return getData(url, params);
}
//获取题目
export function getQues(params = {}) {
    const url = domainName + "/question/index";
    return getData(url, params);
}
//提交答案
export function getpoint(params = {}) {
    const url = domainName + "/question/answer";
    return getData(url, params);
}


