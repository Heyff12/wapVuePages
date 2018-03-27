import "lib-flexible";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import FastClick from "fastclick"; //解决300ms延迟
import router from "./router.js";
import App from "./views/App.vue";

window.FastClick = FastClick;

Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
});