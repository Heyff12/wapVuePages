import Vue from "vue";
//引入路径
import VueRouter from "vue-router";
Vue.use(VueRouter);


//引入模板
import App from "./views/App.vue";
// import register from "./views/register.vue";
// const App = () =>
//     import ("./views/App.vue");
// const register = () =>
//     import ("./views/register.vue");


const routes = [{
        path: "/",
        redirect: "/activate"
    },
    {
        name: "activate",
        path: "/activate",
        component: App
    }
    // {
    //     name: "register",
    //     path: "/register",
    //     component: register
    // }
];
export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});