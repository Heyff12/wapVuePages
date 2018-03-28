// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
//绑定手机号
require("./register");

//激活
require("./activate");

//分期关联用户跳转到析木h5
require("./relevance");

//销售订单
require("./sales");


Mock.setup({
    timeout: "200-600"
});

//获取验证码
var send_info = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
Mock.mock(/fenqi\/v1\/api\/tools\/send/, "post", send_info);


//用户基本信息获取
var info_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        base: {
            nick_name: Random.cname(), // 微信昵称
            "mobile|1": [/^1[0-9]{10}$/, ""], // 手机号
            "status|1": [1, 2, 3, 4], // 用户状态 1:未绑定手机号 2:已绑定手机号，未激活 3:已绑定手机号并激活 4:已注销
            "role_type|1": [1, 3, 5, 6, 7, 8], // 角色类型 销售人员=1，门店管理人员=3，大区负责人=5，合作商=6，放款方=7，借款人=8
            head_url: Random.image("200x100", "#02adea", "Hello"), // 微信头像
            idnumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, // 身份证号
            "user_id|+1": 123, // 用户id
            real_name: Random.cname() // 真实姓名
        },
        "info|1-3": [{
            district_name: Random.cword(4, 8), // 大区名称
            "role_name|1": ["大区负责人", "门店管理人员", "销售人员"], // 角色名称
            store_name: Random.cword(4, 8), // 门店名称
            address: Random.cword(16, 30) // 门店地址
        }]
    }
};
Mock.mock(/fenqi\/v1\/api\/user\/info/, "get", info_list);