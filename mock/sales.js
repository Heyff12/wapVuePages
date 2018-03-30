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
        total_trade_amt: 1544098936760, //总的放款金额
        total_royalty_amt: 15678, // 总的分润金额
        "opuser_trade_infos|50-80": [{
            real_name: Random.cname(),
            lender_sysdtm: Random.datetime("yyyy-MM-dd HH:mm:ss"), // 放款时间
            "trade_amt|+250": 250000, //放款金额
            "trade_syssn|+1": 12334234234888, // 订单号
            "royalty_amt|+50": 2500 // 我的分润金额
        }]
    }
};
Mock.mock(/fenqi\/v1\/api\/trade\/opuser\/list/, "get", opuser_list);

//门店销售信息
var store_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        store_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "store_trade_infos|50-80": [{
            district_name: Random.cword(10), // 大区名称
            store_name: Random.cword(10), // 门店名称
            "store_total_amt|+250": 134445000, // 门店放款总金额
            "royalty_amt|+50": 166600, // 我的分润
        }]
    }
};
Mock.mock(/fenqi\/v1\/api\/trade\/store\/list/, "get", store_list);

//大区销售信息
var district_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        district_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "district_trade_infos|50-80": [{
            district_name: Random.cword(10, 30), // 大区名称
            "store_total_amt|+250": 15060770, // 门店放款总金额
            "royalty_amt|+50": 1566600 // 我的分润
        }]
    }
};
Mock.mock(/fenqi\/v1\/api\/trade\/district\/list/, "get", district_list);