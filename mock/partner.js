// 使用 Mock
var Mock = require("mockjs");
var Random = Mock.Random;
//合作商信息管理----------------------------------------------------------------------
//大区责任人信息
var partner_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        district_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "district_info|50-80": [{
            partner_name: Random.cword(10),
            "district_id|+10": 456,
            district_name: Random.cword(10),
            name: Random.cname(),
            mobile: /^1[0-9]{10}$/,
            idnumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            "status|1": [2, 3, 4], //大区负责人激活状态 未激活=2， 已激活=3，注销=4
            update_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
        }]
    }
};
Mock.mock(/fenqi_mis\/v1\/api\/partner\/district\/list/, "get", partner_list);
//大区责任人信息--修改
var partner_edit = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
Mock.mock(
    /qudao_mis\/v1\/api\/partner\/district\/modify/,
    "post",
    partner_edit
);
//门店负责人信息
var manager_list = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {
        store_cnt: 200, // 商户数
        page: 1,
        page_size: 10,
        "store_info|50-80": [{
            partner_name: Random.cword(10),
            district_name: Random.cword(10),
            store_name: Random.cword(10),
            "store_id|+10": 456,
            store_address: Random.cword(10),
            name: Random.cname(),
            mobile: /^1[0-9]{10}$/,
            idnumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            "status|1": [2, 3, 4], //大区负责人激活状态 未激活=2， 已激活=3，注销=4
            update_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
        }]
    }
};
Mock.mock(/fenqi_mis\/v1\/api\/partner\/store_mgr\/list/, "get", manager_list);
//门店负责人信息--修改
var manager_edit = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
Mock.mock(
    /qudao_mis\/v1\/api\/partner\/store_mgr\/modify/,
    "post",
    manager_edit
);
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
//门店销售信息--修改
var sale_edit = {
    respcd: "0000",
    respmsg: "OK",
    resperr: "",
    data: {}
};
Mock.mock(/qudao_mis\/v1\/api\/partner\/opuser\/modify/, "post", sale_edit);