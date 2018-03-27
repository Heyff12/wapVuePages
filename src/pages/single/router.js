import Vue from "vue";
//引入路径
import VueRouter from "vue-router";
Vue.use(VueRouter);


//引入模板
import App from "./views/App.vue";


const routes = [{
        path: "/",
        redirect: "/about"
    },
    {
        name: "about", // 关于我们
        path: "/about",
        component: App
    }
];
export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});