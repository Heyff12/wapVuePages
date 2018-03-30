//处理1位01---取消区间选择，取消时间转化
function date_long(n) {
    if (n < 10) {
        return '0' + n;
    } else {
        return n;
    }
}
//验证手机号
let test_tel = (val, require, func, that) => {
        let reg = /^1[0-9]{10}$/;
        if (require || val.length > 0) {
            if (!reg.test(val)) {
                func('error');
            } else {
                func('success');
            }
        }
    }
    //验证任意字符
let test_any = (val, lablename, min, max, require, func, that) => {
        let errtips = '请输入' + lablename + '，长度在 ' + min + ' 到 ' + max + ' 个字符';
        let reg = new RegExp('^[\\S\\s]{' + min + ',' + max + '}$');
        if (require || val.length > 0) {
            if (!reg.test(val)) {
                func('error');
            } else {
                func('success');
            }
        }
    }
    //验证手机号
let test_phone = (val, require, regexp, srccess_func, error_func, that) => { //待验证的值，是否必填，验证规则，成功事件，失败事件，this传值
        let reg = /^1[0-9]{10}$/;
        if (regexp) {
            reg = new RegExp(regexp);
        }
        if (require || val.length > 0) {
            if (!reg.test(val)) {
                error_func();
            } else {
                srccess_func();
            }
        }
    }
    //验证任意字符
let test_anycode = (val, require, regexp, srccess_func, error_func, that) => {
        let reg = new RegExp(regexp);
        if (require || val.length > 0) {
            if (!reg.test(val)) {
                error_func();
            } else {
                srccess_func();
            }
        }
    }
    //验证是否相等
let test_equal = (val, static_val, srccess_func, error_func, that) => {
        if (val == static_val) {
            srccess_func();
        } else {
            error_func();
        }
    }
    //验证身份证号
let test_idNumber = (val, require, regexp, srccess_func, error_func, that) => {
        regexp = '^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$';
        let reg = new RegExp(regexp);
        if (require || val.length > 0) {
            if (!reg.test(val)) {
                error_func();
            } else {
                srccess_func();
            }
        }
    }
    //获取年月日时分秒
let get_datetime = (d) => {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date_long(date.getMonth() + 1);
    let day = date_long(date.getDate());
    let hour = date_long(date.getHours());
    let min = date_long(date.getMinutes());
    let sec = date_long(date.getSeconds());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}




// //验证手机号或邮箱
// let test_tel_email = function(require, type) {
//     var reg = [{
//         required: require,
//         pattern: /(^1[0-9]{10}$|^[a-zA-Z0-9_\-\'\.]+@[a-zA-Z0-9_]+(\.[a-z]+){1,2}$)/,
//         message: "请输入用户名（手机号码/邮箱）",
//         trigger: type
//     }];
//     return reg;
// };
// //渠道名称、渠道简称------------中文+英文大小写+数字+空白+()（）.-
// let test_qd_name = function(lablename, min, max, require, type) {
//     var reg = [{
//         required: require,
//         pattern: new RegExp(
//             "^[\u4e00-\u9fa5a-zA-Z0-9\\(\\)\\（\\）\\-\\.\\s]{" +
//             min +
//             "," +
//             max +
//             "}$"
//         ),
//         //pattern: eval('/^[\u4e00-\u9fa5a-zA-Z0-9\\(\\)\\（\\）\\-\\.]{' + min + ',' + max + '}$/'),
//         message: "请输入" + lablename + "，长度在 " + min + " 到 " + max + " 个字符",
//         trigger: type
//     }];
//     return reg;
// };
// //验证数字
// let test_number = function(lablename, min, max, require, type) {
//     var reg = [{
//         required: require,
//         pattern: new RegExp("^[0-9\\s]{" + min + "," + max + "}$"),
//         //pattern: eval('/^[\u4e00-\u9fa5a-zA-Z0-9\\(\\)\\（\\）\\-\\.]{' + min + ',' + max + '}$/'),
//         message: "请输入" + lablename + "，长度在 " + min + " 到 " + max + " 个字符",
//         trigger: type
//     }];
//     return reg;
// };
// //验证手机号和座机号
// let test_telephone = function(lablename, require, type) {
//     var reg = [{
//         required: require,
//         pattern: /(^(0\d{2,3}(-){0,1}){1}\d{7,8})(-\d{3,5}){0,1}$|^1[0-9]{10}$/,
//         message: "请填写" + lablename + "，手机号/座机号码均可",
//         trigger: type
//     }];
//     return reg;
// };
// //验证手机号
// let test_tel = function(lablename, require, type) {
//     var reg = [{
//         required: require,
//         pattern: /^1[0-9]{10}$/,
//         message: "请填写" + lablename,
//         trigger: type
//     }];
//     return reg;
// };
// //中文验证
// let test_chinese = function(lablename, min, max, require, type) {
//     var reg = [{
//         required: require,
//         pattern: new RegExp("^[\u4e00-\u9fa5]{" + min + "," + max + "}$"),
//         message: "请输入" +
//             lablename +
//             "(中文)，长度在 " +
//             min +
//             " 到 " +
//             max +
//             " 个字符",
//         trigger: type
//     }];
//     return reg;
// };
// //验证任意字符
// let test_any = function(lablename, min, max, require, type) {
//     var reg = [{
//         required: require,
//         pattern: new RegExp("^[\\S\\s]{" + min + "," + max + "}$"),
//         message: "请输入" + lablename + "，长度在 " + min + " 到 " + max + " 个字符",
//         trigger: type
//     }];
//     return reg;
// };
// //身份证号码
// let test_idnumber = function(lablename, require, type) {
//     var reg = [{ required: require, pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: "请输入" + lablename, trigger: type }];
//     return reg;
// };

// exports.test_tel_email = test_tel_email;
// exports.test_qd_name = test_qd_name;
// exports.test_number = test_number;
// exports.test_telephone = test_telephone;
// exports.test_tel = test_tel;
// exports.test_chinese = test_chinese;
// exports.test_any = test_any;
// exports.checkamt = checkamt;
// exports.checkamt_reg = checkamt_reg;
// exports.checkamt_need = checkamt_need;
// exports.check_fee = check_fee;
// exports.check_percent = check_percent;
// exports.floatToint = floatToint;
// exports.percentTofloat = percentTofloat;
// exports.checkamtYes = checkamtYes;
// exports.test_idnumber = test_idnumber;


exports.test_tel = test_tel;
exports.test_any = test_any;
exports.test_phone = test_phone;
exports.test_anycode = test_anycode;
exports.test_equal = test_equal;
exports.test_idNumber = test_idNumber;
exports.get_datetime = get_datetime;