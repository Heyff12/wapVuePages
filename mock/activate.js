// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
//激活页面，验证码检查,和用户类型检查
var check_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
Mock.mock(/fenqi\/v1\/api\/user\/check\/info/, "post", check_info);