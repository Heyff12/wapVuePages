import Vue from 'vue'
//过滤函数 
//分转成元--两位浮点数
Vue.filter('yuan', function(value) {
  return (value / 100).toFixed(2)
})
//分转成元--整数
Vue.filter('yuan_z', function(value) {
  return (value / 100).toFixed(0)
})
//整数转化成百分数
Vue.filter('percent_f', function(value) {
  return value + '%'
})
//银行账号（前6后4，中间*）
Vue.filter('hide_code', function(value) {
  if(value.length<=10){
    return value;
  }
  let before_val = value.substr(0, 6);
  let after_val = value.substr(-4);
  let mid = '********************'.substr(0, value.length - 10);
  return before_val + mid + after_val;
  // let reg = /^(\d{6})\d+(\d{4})$/;
  // return value.replace(reg, "$1******2");
})
//金额浮点数(元***.**)-每三位整数位，加一个逗号-有小数点时，才展示小数点
Vue.filter('crash_float_format', function(value) {
  if (value - 0 <= 0) {
    return 0;
  }
  let arr = value.split('.');
  let val_z = arr[0]; //整数部分
  let val_f; //小数部分
  let val_f_str = '',
    val_z_str = '';
  //小数部分
  if (arr.length > 1 && arr[1] - 0 > 0) {
    val_f = arr[1];
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
})
//金额整数(***)-每三位整数位，判断是否 除以100，所得值加一个逗号-有小数点时，才展示小数点
Vue.filter('crash_format', (val, currency) => {
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
  let arr = value.toString().split('.');
  let val_z = arr[0]; //整数部分
  let val_f; //小数部分
  let val_f_str = '',
    val_z_str = '';
  //小数部分
  if (arr.length > 1 && arr[1] - 0 > 0) {
    val_f = arr[1];
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
})
