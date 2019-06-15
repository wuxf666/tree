/**
 * @desc a toast plugin for mobile
 */
import messageBoxComponent from './index.vue'
import Vue from 'vue';

/**
 * @param {Object} option messageBox配置项
 * option = {
 *     errorTip: '错误', //错误文本
 *     btnTxt: '我知道了' , //btn文案
 *     title: '提示',
 *  isShowClose:true,//是否显示右上角的关闭按钮 默认显示
 * }
 */
function MessageBox(option = {}) {
    const defaultOption = {
        btnTxt: "我知道了",
        errorTip: "未知错误",
        isShowClose:true,
    };
    const opt = Object.assign(defaultOption, option);
    const messageBoxController = Vue.extend(messageBoxComponent);
    const instance = new messageBoxController().$mount(document.createElement("div"));
    document.body.appendChild(instance.$el);
    instance.errorTip = opt.errorTip;
    instance.btnTxt = opt.btnTxt;
    instance.title = opt.title;
    instance.isShowClose = opt.isShowClose;
    instance.show = true;

    return new Promise(function (resolve, reject) {
        instance.forword = function (type) {
            document.body.removeChild(instance.$el);
            resolve(type)
        }
    })
}

export default MessageBox
