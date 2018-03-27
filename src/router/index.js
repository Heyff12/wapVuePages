import Vue from 'vue'
import Router from 'vue-router'

const login = () =>
    import ("@/pages/login")
const home = () =>
    import ("@/pages/home")
const partner_region = () =>
    import ("@/pages/partner/region"); //合作商信息管理--大区责任人信息
const partner_excel = () =>
    import ("@/pages/partner/excel"); //合作商信息管理--批量导入EXCEL模板
const partner_manager = () =>
    import ("@/pages/partner/manager"); //合作商信息管理--门店管理人信息
const partner_sales = () =>
    import ("@/pages/partner/sales"); //合作商信息管理--门店销售员信息

Vue.use(Router)

export default new Router({
    routes: [
        //首页
        {
            path: "/",
            name: "home",
            component: home,
            redirect: { name: "partner_excel" }
        },
        //登录页
        { path: "/login", name: "login", meta: { auth: false }, component: login },
        //合作商信息管理
        {
            path: "/partner_excel",
            name: "partner_excel",
            component: partner_excel
        },
        {
            path: "/partner_region",
            name: "partner_region",
            component: partner_region
        },
        {
            path: "/partner_manager",
            name: "partner_manager",
            component: partner_manager
        },
        {
            path: "/partner_sales",
            name: "partner_sales",
            component: partner_sales
        }
    ]
});