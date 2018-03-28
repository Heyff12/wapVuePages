// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
//立即绑定
var bind_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        "role_type|1": [1, 3, 5, 6, 7, 8], //// 角色类型 销售人员=1，门店管理人员=3，大区负责人=5，合作商=6，放款方=7，借款人=8
        redirect_url: "http://192.168.0.165:9091/mine.html" // 跳转到某个地址
    }
};
Mock.mock(/fenqi\/v1\/api\/user\/bind/, "post", bind_info);