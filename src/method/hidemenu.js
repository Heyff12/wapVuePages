// function onBridgeReady() {
//     WeixinJSBridge.call("hideOptionMenu");
//     WeixinJSBridge.call("hideToolbar");
// }

// if (typeof WeixinJSBridge == "undefined") {
//     if (document.addEventListener) {
//         document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
//     } else if (document.attachEvent) {
//         document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
//         document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
//     }
// } else {
//     onBridgeReady();
// }
import wx from "weixin-js-sdk"
// wx.hideAllNonBaseMenuItem();
wx.hideMenuItems({
    menuList: [
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            "menuItem:copyUrl",
            "menuItem:originPage",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari",
            "menuItem:share:email"
        ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
});
wx.checkJsApi({
    jsApiList: ["chooseImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        alert(res)
    }
});