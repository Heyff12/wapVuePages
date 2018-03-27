import "lib-flexible";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import FastClick from "fastclick"; //解决300ms延迟
import router from "./router.js"; //路由
import App from "./views/App.vue"; //模板
// import "mint-ui/lib/style.css";
//引入组建
// import { Toast, Indicator } from "mint-ui";
// Vue.use(Toast);
// Vue.use(Indicator);
// Vue.component(Toast.name, Toast);
// Vue.component(Indicator.name, Indicator);


window.FastClick = FastClick;
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
});