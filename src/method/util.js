//金额(分*****)-每三位整数位，判断是否 除以100，加一个逗号-有小数点时，才展示小数点
let crash_format = (val, currency) => {
        let value;
        //根据币种判断是否需要/100
        if (currency == 'JPY' || currency == 'IDR') {
            value = val;
        } else {
            value = (val / 100).toFixed(2);
        }
        if (value - 0 <= 0) {
            return 0;
        }
        //let arr = (value / 100).toString().split('.');
        let arr = value.toString().split('.');
        let val_z = arr[0]; //整数部分
        let val_f; //小数部分
        let val_f_str = '',
            val_z_str = '';
        //小数部分
        if (arr.length > 1 && arr[1] - 0 > 0) {
            val_f = arr[1].length == 1 ? arr[1] + '0' : arr[1];
        }
        if (val_f) {
            val_f_str = '.' + val_f;
        }
        //整数部分
        let len = val_z.length;
        if (len <= 3) {
            return val_z + val_f_str;
        }
        let arr_new = val_z.split('').reverse(); //翻转
        for (let i = 0; i < arr_new.length; i++) {
            val_z_str += arr_new[i] + ((i + 1) % 3 == 0 && (i + 1) != arr_new.length ? "," : "");
        }
        return val_z_str.split('').reverse().join('') + val_f_str;
    }
    //金额是否 /100 日元----目前主要用于： 图标数据生成时，（图表会自动将金额格式化）；从后台后去的金额用于输入框展示的时候
let crash_if_format = (val, currency) => {
        let value;
        //根据币种判断是否需要/100
        if (currency == 'JPY' || currency == 'IDR') {
            value = val;
        } else {
            value = (val / 100).toFixed(2);
        }
        return value;
    }
    //两位浮点数转化成整数——元——分
function floatToint(val) {
    let value = val.toString();
    if (value.length <= 0) {
        return '';
    }
    let val_f, val_flen, endVal;
    try {
        val_flen = value.split('.')[1].length;
        val_f = value.split('.')[1];
    } catch (e) {
        val_flen = 0;
    }
    if (val_flen == 0) {
        endVal = value + '00';
    } else if (val_flen == 1) {
        endVal = value.replace(/\./, '') + '0';
    } else if (val_flen == 2) {
        endVal = value.replace(/\./, '');
    } else {
        endVal = value.split('.')[0] + value.split('.')[1].substr(0, 2);
    }
    // console.log(endVal - 0);
    return endVal - 0
}
//金额是否 *100 日元----目前主要用于： 金额用于输入框提交的时候
let crash_enlarge_format = (val, currency) => {
    let value;
    //根据币种判断是否需要/100
    if (currency == 'JPY' || currency == 'IDR') {
        value = val;
    } else {
        // value = val * 100;
        value = floatToint(val);
    }
    return value;
}

//判断搜索项是否填写，填写则加入 请求的发送数据中
let searchPost = (val, key, data, if_select) => {
    if (val.length <= 0) return false;
    if (if_select) {
        data[key] = val
    } else {
        data[key] = val.replace(/\s/g, "")
    }
}

//判断修改项是否变化，变化则加入 请求的发送数据中
let mendPost = (val, key, data, originVal) => {
    if (val !== originVal) {
        data[key] = val
    }
}

//获取连接当中的指定 字段
let getParams = (key) => {
    let url = location.href;
    let key_len = url.split("?");
    if (key_len.length <= 1) {
        return false;
    }
    let params = key_len[1];
    let params_arr = params.split('&')
    let key_val;
    params_arr.forEach((item) => {
        let val = item.split('=')
        if (val[0] == key) {
            key_val = val[1]
            return false;
        }
    })
    return key_val;
}


exports.crash_format = crash_format
exports.crash_if_format = crash_if_format
exports.crash_enlarge_format = crash_enlarge_format
exports.searchPost = searchPost
exports.mendPost = mendPost
exports.getParams = getParams;