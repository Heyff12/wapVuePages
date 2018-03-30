import "lib-flexible";
import FastClick from "fastclick"; //解决300ms延迟
import Vue from "vue";
import router from "./router.js"; //路由
import App from "./app.vue"; //模板
//隐藏右上角导航---------------------------------------------------------------------------------------------
import '@/method/hidemenu'
//引入组建
// import "mint-ui/lib/style.css";
// import { Toast, Indicator } from "mint-ui";
// Vue.use(Toast);
// Vue.use(Indicator);
// Vue.component(Toast.name, Toast);
// Vue.component(Indicator.name, Indicator);


window.FastClick = FastClick;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
});