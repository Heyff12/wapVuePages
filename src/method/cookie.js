//获取cookie
function GetCookie(cookieName) {
  var strCookie = document.cookie;
  // 将多cookie切割为多个名/值对
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    // 遍历cookie数组，处理每个cookie对
    var arr = arrCookie[i].split("=");
    // 找到名称为cookieName的cookie，并返回它的值
    if (arr[0] == cookieName)
      return arr[1];
  }
  return "";
}
//删除cookie
function deleteCookie(username) {
  var date = new Date();
  // // 删除一个cookie，就是将其过期时间设定为一个过去的时间
  date.setTime(date.getTime() - 10000);
  document.cookie = username + "=v; expires=" + date.toGMTString();
}
// /**/**
// * 设置Cookie （通用函数）
// * @param {string} cookieName Cookie 名称
// * @param {string} cookieValue Cookie 值
// * @param {string} nDays Cookie 过期天数

function SetCookie(cookieName, cookieValue, nDays) {
  /**/
  /* 当前日期 */
  var today = new Date();
  /**/
  /* Cookie 过期时间 */
  var expire = new Date();
  /**/
  /* 如果未设置nDays参数或者nDays为0，取默认值 1 */
  if (nDays == null || nDays == 0)
    nDays = 1;
  /**/
  /* 计算Cookie过期时间 */
  expire.setTime(today.getTime() + nDays * 24 * 60 * 60 * 1000); //获取毫秒数      
  /**/
  /* 设置Cookie值 */
  document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString() + ";path=/";
  //alert(cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString());
}
exports.GetCookie = GetCookie
exports.deleteCookie = deleteCookie
exports.SetCookie = SetCookie