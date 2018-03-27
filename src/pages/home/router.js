import VueRouter from "vue-router";
import App from "./views/App.vue";
import Vue from "vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/app"
    },
    {
        name: "app", // 首页
        path: "/app",
        component: App
    }
];
export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});