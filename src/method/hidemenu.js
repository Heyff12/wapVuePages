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
    menuList: ["share:appMessage", "share:timeline", "share:qq"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
});