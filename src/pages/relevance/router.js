import VueRouter from "vue-router";
import App from "./views/App.vue";
import Vue from "vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/relevance"
    },
    {
        name: "relevance", // 首页
        path: "/relevance",
        component: App
    }
];
export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});