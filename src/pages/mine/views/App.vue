<template>
    <div>
        <section class="topInfo">
            <div class="img">
                <div class="imgin">
                    <img src="~images/icon_avatar.png" alt="" v-if="!info.head_url">
                    <img :src="info.head_url" alt="" v-else>
                </div>
            </div>
            <dl>
                <dt>Hi,{{info.nick_name}}</dt>
                <dd><img src="~images/icon_phone.png" alt=""> {{info.mobile}}</dd>
            </dl>
            <div class="verify">已验证</div>
        </section>
        <section class="infoList" v-show="roleType==1 || roleType==3 || roleType==5">
            <div class="circleBox">
                <!-- 销售员或者门店负责人 -->
                <ul v-if="roleType == 1 || roleType == 3">
                    <li v-for="item in info.store">
                        <span>{{item.district_name}}</span><span>{{item.store_name}}</span>
                    </li>
                    <li><span>{{roleName}}</span><span>{{info.real_name}}</span></li>
                </ul>
                <ul v-else-if="roleType==5">
                    <li v-for="item in info.district_name">
                        {{item.district_name}}
                    </li>
                    <li><span>{{roleName}}</span><span>{{info.real_name}}</span></li>
                </ul>
            </div>
        </section>
        <section class="goBank" @click="gotoUrl" v-show="roleType==1 || roleType==3 || roleType==5 || roleType==8">
            <dl>
                <dt>{{goName}} </dt>
                <dd><img src="~images/arrow.png" alt=""></dd>
            </dl>
        </section>
    </div>
</template>

<script>
    import {
        Toast
    } from "mint-ui";
    import {
        getUrl
    } from '@/method/util'
    export default {
        name: 'mine',
        components: {},
        data() {
            return {
                info: {
                    user_id: '',
                    nick_name: '',
                    head_url: '',
                    real_name: '',
                    mobile: '',
                    district_name: [],
                    store: [{
                        store_name: '',
                        district_name: '',
                    }]
                },
                roleType: '', //角色类型
                roleName: '',
                goName: '',
                info_url: '/fenqi/v1/api/user/info', //用户基本信息获取
            }
        },
        created() {
            this.getInfoStart()
        },
        methods: {
            //获取信息
            getInfoStart: function() {
                this.$ajax_axios.ajax_get(this, this.info_url, '', (data_return) => {
                    //根据身份增加提示
                    this.roleType = data_return.data.base.role_type;
                    if (this.roleType == 1) {
                        this.goName = '我的销售记录';
                        this.roleName = '门店销售员';
                    } else if (this.roleType == 3) {
                        this.goName = '门店销售记录';
                        this.roleName = '门店管理人';
                    } else if (this.roleType == 5) {
                        this.goName = '大区销售情况';
                        this.roleName = '大区负责人';
                    } else if (this.roleType == 8) {
                        this.goName = '我的分期订单';
                    }
                    //信息展示
                    this.info.user_id = data_return.data.base.user_id;
                    this.info.nick_name = data_return.data.base.nick_name;
                    this.info.real_name = data_return.data.base.real_name;
                    this.info.head_url = data_return.data.base.head_url;
                    this.info.mobile = data_return.data.base.mobile;
                    if (this.roleType == 5) {
                        this.info.district_name = data_return.data.info;
                    } else {
                        this.info.district_name.push(data_return.data.info[0]);
                    }
                    this.info.store = data_return.data.info
                    // console.log(this.info.store)
                })
            },
            //跳转
            gotoUrl: function() {
                if (this.roleType == 1) {
                    goUrl = getUrl('salesrecord.html#/salesrecord')
                } else if (this.roleType == 3) {
                    goUrl = getUrl('sales.html#/store')
                } else if (this.roleType == 5) {
                    goUrl = getUrl('sales.html#/district')
                } else if (this.roleType == 8) {
                    goUrl = getUrl('mine.html#/usercenter')
                }
                window.location.href = goUrl
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    @import "~css/mine";
</style>
