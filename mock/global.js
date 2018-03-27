// 使用 Mock
var Mock = require("mockjs");
//合作商信息管理
require('./partner')
    //基本信息
var qd_info = {
    "respcd": "0000",
    "respmsg": "OK",
    "resperr": "",
    "data": {
        "name": "@word", // 名称
        "mobile": '12345678969',
    }
};
Mock.mock(/fenqi_mis\/v1\/api\/user\/info/, "get", qd_info);
//登陆
var login_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
Mock.mock(/fenqi_mis\/v1\/api\/user\/login/, "post", function() {
    SetCookie("sessionid", "yaya123344", 12);
    return login_info;
});
//登出
var logout_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
Mock.mock(/fenqi_mis\/v1\/api\/user\/logout/, "post", function() {
    deleteCookie("sessionid");
    return logout_info;
});

//删除cookie
function deleteCookie(username) {
    var date = new Date();
    // // 删除一个cookie，就是将其过期时间设定为一个过去的时间
    date.setTime(date.getTime() - 10000);
    document.cookie = username + "=v; expires=" + date.toGMTString();
}
//设置sessionid
function SetCookie(cookieName, cookieValue, nDays) {
    /**/
    /* 当前日期 */
    var today = new Date();
    /**/
    /* Cookie 过期时间 */
    var expire = new Date();
    /**/
    /* 如果未设置nDays参数或者nDays为0，取默认值 1 */
    if (nDays == null || nDays == 0) nDays = 1;
    /**/
    /* 计算Cookie过期时间 */
    expire.setTime(today.getTime() + nDays * 24 * 60 * 60 * 1000); //获取毫秒数
    /**/
    /* 设置Cookie值 */
    document.cookie =
        cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
    //alert(cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString());
}