import "lib-flexible";
import Vue from "vue";
import FastClick from "fastclick"; //解决300ms延迟
import router from "./router.js"; //路由
import App from "./app.vue"; //模板
import filter from "@/filter/"; //过滤函数
//ajax请求通用---------------------------------------------------------------------------------------------
import ajax_axios from "../../method/ajax_axios";
Vue.prototype.$ajax_axios = ajax_axios; //设置ajax请求全局变量

//模拟数据---------------------------------------------------------------------------------------------
// import "../../../mock/global";


window.FastClick = FastClick;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
});