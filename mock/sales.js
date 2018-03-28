// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;

// 销售订单列表查询
var opuser_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        opuser_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        total_trade_amt: 15678900000, //总的放款金额
        total_royalty_amt: 15678, // 总的分润金额
        "opuser_trade_infos|50-80": [{
            "real_name": Random.cname(),
            "lender_sysdtm": Random.datetime("yyyy-MM-dd HH:mm:ss"), // 放款时间
            "trade_amt|+250": 250000, //放款金额
            "trade_syssn|+1": 12334234234888, // 订单号
            "royalty_amt|+50": 2500 // 我的分润金额
        }]
    }
};
Mock.mock(/fenqi\/v1\/api\/trade\/opuser\/list/, "get", opuser_list);

//门店销售信息
var sale_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        opuser_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "opuser_info|50-80": [{
            store_name: Random.cword(10),
            name: Random.cname(),
            mobile: /^1[0-9]{10}$/,
            idnumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            "status|1": [2, 3, 4], //大区负责人激活状态 未激活=2， 已激活=3，注销=4
            update_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
        }]
    }
};
Mock.mock(/fenqi_mis\/v1\/api\/partner\/opuser\/list/, "get", sale_list);