// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //路由设置
import store from './store/' //状态管理参数
import ElementUI from "element-ui" //饿了吗主题
import "../theme/index.css" //饿了吗主题样式--自定义样式#ff8100--橙色系
import axios from "axios";
Vue.config.productionTip = false

//ajax请求通用---------------------------------------------------------------------------------------------
import ajax_axios from "./method/ajax_axios"
Vue.prototype.$ajax_axios = ajax_axios //设置ajax请求全局变量

//引入饿了吗主题---------------------------------------------------------------------------------------------
Vue.use(ElementUI)

//本地模拟数据-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
import '../mock/global'

//路由拦截，未登录返回登录页---------------------------------------------------------------------------------------------
router.beforeEach(({ meta, path }, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.sessionid) //true用户已登录， false用户未登录
        // console.log(auth);
        // console.log(store.state.sessionid);
        // console.log(isLogin);
    if (path == '/login') {
        store.commit('login_ify');
    } else {
        store.commit('login_ifn');
    }
    if (auth && !isLogin && path !== '/login') {
        store.commit('login_ify');
        return next({ path: '/login' })
    }
    next()
});
//请求响应拦截，未登录返回登录页---------------------------------------------------------------------------------------------
// axios.interceptors.response.use(data => {
//     if (data.body.respcd == 1001) {
//         router.replace({
//             path: "/login"
//         });
//         return false;
//     } else {
//         return data;
//     }
// });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})