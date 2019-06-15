//封装sessionStorage
export const storage = {
    get(key) {
        if (key == null || typeof key !== "string") {
            return ""
        }
        try {
            return JSON.parse(sessionStorage.getItem(key)) || "";
        } catch (e) {
            return sessionStorage.getItem(key) || ""
        }
    },
    set(key, value) {
        if (value == null) {
            return sessionStorage.removeItem(key);
        }
        sessionStorage.setItem(key, JSON.stringify(value));
        return value;
    },
    remove(key){
        console.log(key)
        return sessionStorage.removeItem(key);
    }

};

//封装isPC
export function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


/**
 * 将数值四舍五入后格式化.
 *
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
export function formatNumber(num, cent, isThousand) {
    if (typeof num == 'string') {
        num = num.replace(/\$|\,/g, '');
    }
    //num = num.toString().replace(/\$|\,/g, '');

    // 检查传入数值为数值类型
    if (isNaN(num))
        num = "0";

    // 获取符号(正/负数)
    let sign = (num == (num = Math.abs(num)));

    num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
    let cents = num % Math.pow(10, cent); // 求出小数位数值
    num = Math.floor(num / Math.pow(10, cent)).toString(); // 求出整数位数值
    cents = cents.toString(); // 把小数位转换成字符串,以便求小数位长度

    // 补足小数位到指定的位数
    while (cents.length < cent)
        cents = "0" + cents;

    if (isThousand) {
        // 对整数部分进行千分位格式化.
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }

    if (cent > 0)
        return (((sign) ? '' : '-') + num + '.' + cents);
    else
        return (((sign) ? '' : '-') + num);
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//设置cookie
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

String.prototype.bool = function() {
    return (/^true$/i).test(this);
};
