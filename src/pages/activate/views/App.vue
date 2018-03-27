<template>
    <div>
        <section class="defaultForm">
            <dl class="hang" :class="{error_data:regErr.tel}">
                <dt></dt>
                <dd>
                    <input class="text" type="text" value="" placeholder="请填写绑定销售身份的手机号" v-model="reg.tel" @blur="yanzheng_common('tel','test_phone','')" />
                </dd>
            </dl>
            <dl class="hang" :class="{error_data:regErr.captcha}">
                <dt></dt>
                <dd>
                    <input type="text" name="" value="" class="text text_shot2 t_l" placeholder="请输入验证码" v-model="reg.captcha" @blur="yanzheng_common('captcha','test_anycode','^[\\d]{6}$')" />
                    <p class="entycode">
                        <span class="get_entycode" @click="getCode" v-show="time_sec<=0">获取验证码</span>
                        <span class="show_entycode" @click="getCode2" v-show="time_sec>0"><i class="i_normal">{{time_sec}}</i>秒后重发</span>
                    </p>
                </dd>
            </dl>
        </section>
        <section class="info">
            <div class="bg"></div>
            <ul>
                <li>
                    <dl>
                        <dt>真实姓名</dt>
                        <dd>王读音</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>省份证号码</dt>
                        <dd>400888111111112236</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>所在大区</dt>
                        <dd>西南大区</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>所在门店</dt>
                        <dd>程度一点</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>门店地址</dt>
                        <dd>北京市朝阳区望京SOHO T3 A座17层</dd>
                    </dl>
                </li>
            </ul>
            <p class="note">温馨提示：只需提交以上信息，点击【激活】系统会自动绑定并 激活您的账户，若对信息有疑问请及时致电：010-880XXXX.
            </p>
        </section>
        <section class="btn">
            <span @click="get_reg">激活</span>
        </section>
    </div>
</template>

<script>
    import {
        Toast,
        Indicator
    } from "mint-ui";
    import yanzheng from '@/method/yanzheng'
    export default {
        name: 'activate',
        components: {},
        data() {
            return {
                reg: {
                    tel: '', //12344444444
                    captcha: '', //4444444
                },
                regErr: {
                    tel: false,
                    captcha: false,
                },
                captcha: '', //ajax获取的验证码
                reg_url: '/reg', //注册
                captcha_url: '/fenqi/v1/api/tools/send', //验证码
                time_sec: 0, //倒计时    
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
                console.log(this.reg);
                //验证输入内容
                this.yanzheng_common('tel', 'test_phone', '');
                this.yanzheng_common('captcha', 'test_anycode', '^[\\d]{6}$', () => {
                    //矫正输入的验证码是否一致
                    if (this.captcha != this.reg.captcha) {
                        this.regErr.captcha = true;
                    }
                });
                //遍历查看是否有错误
                for (let key in this.regErr) {
                    if (this.regErr[key] == true) {
                        return false;
                    }
                }
                //提交请求----
                this.$ajax_axios.ajax_post(this, this.reg_url, {
                    'reg': this.reg
                }, (data_return) => {
                    this.$router.replace({
                        path: '/login'
                    })
                })
            },
            //获取验证码
            getCode: function() {
                let _this = this;
                //验证手机号的正误
                this.yanzheng_common('tel', 'test_phone', '', () => {
                    this.time_sec = 60; //重置倒计时时间
                    let interval = window.setInterval(function() {
                        if ((_this.time_sec--) <= 0) {
                            window.clearInterval(interval);
                        }
                    }, 1000);
                    //提交请求----
                    this.$ajax_axios.ajax_post(this, this.captcha_url, this.reg.tel, (data_return) => {
                        this.captcha = data_return.data.captcha; //返回验证码-原数
                    })
                });
            },
            getCode2: function() {
                if (this.time_sec > 0) {
                    Toast('60s后重新获取');
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    @import "../../../css/form";
    .info {
        width: 100%;
        padding: 0 @padding;
        font-size: @font_size;
        box-sizing: border-box;
        margin: 55px 0 65px;
        .bg {
            width: 100%;
            height: 35px;
            background: @color;
            border-radius: 15px 15px 0 0;
        }
        ul {
            width: 100%;
            padding: 0 @padding;
            box-sizing: border-box;
            background: white;
            li {
                height: 100px;
                line-height: 100px;
                box-sizing: border-box;
                dl {
                    width: 100%;
                    border-top: 1px dotted @border_color;
                    dt {
                        width: 26%;
                        box-sizing: border-box;
                        float: left;
                        padding-left: 5px;
                        color: @grey;
                    }
                    dd {
                        width: 74%;
                        box-sizing: border-box;
                        float: right;
                        text-align: left;
                        padding-right: @padding;
                    }
                    .clearfix
                }
                &:nth-child(1) {
                    dl {
                        border: 0;
                    }
                }
            }
        }
        .note {
            width: 100%;
            padding: 30px 5px;
            box-sizing: border-box;
            color: @grey;
            font-size: 22px;
        }
    }
</style>
