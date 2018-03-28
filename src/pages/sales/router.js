import Vue from "vue";
//引入路径
import VueRouter from "vue-router";
Vue.use(VueRouter);


//引入模板
import store from "./views/store.vue";
import district from "./views/district.vue";


const routes = [{
        path: "/",
        redirect: "/store"
    },
    {
        name: "store",
        path: "/store",
        component: store
    },
    {
        name: "district",
        path: "/district",
        component: district
    }
];
export default new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});