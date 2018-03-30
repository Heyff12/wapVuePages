import "lib-flexible";
import FastClick from "fastclick"; //解决300ms延迟
import Vue from "vue";
import router from "./router.js"; //路由
import App from "./views/App.vue"; //模板
//引入模板---------------------------------------------------------------------------------------------
import { Switch } from "mint-ui";
Vue.component(Switch.name, Switch);


//隐藏右上角导航---------------------------------------------------------------------------------------------
import '@/method/hidemenu'
//ajax请求通用---------------------------------------------------------------------------------------------
import ajax_axios from "../../method/ajax_axios"
Vue.prototype.$ajax_axios = ajax_axios //设置ajax请求全局变量

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