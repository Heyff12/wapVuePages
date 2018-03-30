import Vue from "vue";
//引入路径
import VueRouter from "vue-router";
Vue.use(VueRouter);


//引入模板
// import about from "./views/about.vue";
const about = () =>
    import ("./views/about.vue");
const protocol = () =>
    import ("./views/protocol.vue");

const routes = [{
        path: "/",
        redirect: "/about"
    },
    {
        name: "about", // 关于我们
        path: "/about",
        component: about
    },
    {
        name: "protocol", // 平台服务协议
        path: "/protocol",
        component: protocol
    }
];
export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});