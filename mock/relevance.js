// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
//激活页面，验证码检查,和用户类型检查
var fitment_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        "status|1": [1, 2, 3, 4], // 用户状态 1:未绑定手机号 2:已绑定手机号，未激活 3:已绑定手机号并激活 4:已注销
        "role_type|1": [1, 3, 5, 6, 7, 8], // 角色类型 销售人员=1，门店管理人员=3，大区负责人=5，合作商=6，放款方=7，借款人=8
        redirect_url: Random.url() // 报错的时候不会出现在这个字段
    }
};
Mock.mock(/fenqi\/v1\/api\/fitment\/bind/, "get", fitment_info);