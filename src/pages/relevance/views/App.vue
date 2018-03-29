<template>
    <div>
        <section class="topInfo">
            <ul>
                <li>
                    <dl>
                        <dt><img src="~images/icon_fee.png" alt=""></dt>
                        <dd>低费率</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><img src="~images/icon_check.png" alt=""></dt>
                        <dd>15分钟审核</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><img src="~images/icon_pay.png" alt=""></dt>
                        <dd>灵活支付</dd>
                    </dl>
                </li>
            </ul>
            <p class="t_c">好近分期面向装修用户提供优质安心的分期服务<br/> 帮助用户解决资金压力，无负担装修您的家
            </p>
            <section class="defaultForm">
                <dl class="hang" :class="{error_data:regErr.mobile}">
                    <dt></dt>
                    <dd>
                        <input class="text" type="number" value="" placeholder="请填写销售人员手机号" v-model="reg.mobile" @blur="get_reg" />
                    </dd>
                </dl>
                <dl class="hang note">
                    <dt></dt>
                    <dd v-if="role_type==0 && status==0">
                        <i class="iconTip"><img src="~images/info.png" alt=""></i> 填写销售人员信息有助于后期进行跟进服务
                    </dd>
                    <dd class="red" v-else-if="role_type!=1">
                        <i class="iconTip"><img src="~images/info_error.png" alt=""></i> 无效销售人员，请检查是否输入正确
                    </dd>
                    <dd class="green" v-else-if="status==3">
                        <i class="iconTip"><img src="~images/info_success.png" alt=""></i> 有效销售人员
                    </dd>
                    <dd class="red" v-else-if="status==2">
                        <i class="iconTip"><img src="~images/info_error.png" alt=""></i> 此销售人员账户未激活
                    </dd>
                    <dd class="red" v-else>
                        <i class="iconTip"><img src="~images/info_error.png" alt=""></i> 无效销售人员，请检查是否输入正确
                    </dd>
                </dl>
            </section>
        </section>
        <section class="btn">
            <span @click="nextTo" v-if="role_type==1 && status==3">下一步</span>
            <span class="disa" v-else>下一步</span>
        </section>
    </div>
</template>

<script>
    import {
        Toast
    } from "mint-ui";
    import yanzheng from '@/method/yanzheng'
    export default {
        name: 'relevance',
        components: {},
        data() {
            return {
                reg: {
                    mobile: '', //12344444444
                },
                regErr: {
                    mobile: false,
                },
                bind_url: '/fenqi/v1/api/fitment/bind', //关联销售
                role_type: '0',
                status: '0', //是否是有效销售人员
                redirect_url: '', //跳转链接
            }
        },
        created() {},
        methods: {
            //验证通用
            yanzheng_common: function(val, reg_func, test_reg, success_func, error_func) {
                yanzheng[reg_func](this.reg[val], true, test_reg, () => {
                    this.regErr[val] = false;
                    if (success_func) {
                        success_func();
                    }
                }, () => {
                    this.regErr[val] = true;
                    if (error_func) {
                        error_func();
                    }
                }, this);
            },
            //提交注册
            get_reg: function() {
                //验证输入内容
                this.yanzheng_common('mobile', 'test_phone', '');
                //遍历查看是否有错误
                for (let key in this.regErr) {
                    if (this.regErr[key] == true) {
                        return false;
                    }
                }
                //提交请求----
                this.$ajax_axios.ajax_get(this, this.bind_url, this.reg, (data_return) => {
                    console.log(data_return.data);
                    this.role_type = data_return.data.role_type;
                    this.status = data_return.data.status;
                    this.redirect_url = data_return.data.redirect_url;
                    // window.location(data_return.redirect_url)
                }, (data_return) => {
                    this.reg.mobile = ''
                })
            },
            //点击下一步
            nextTo: function() {
                window.location.href = this.redirect_url
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    @import "~css/relevance";
</style>
