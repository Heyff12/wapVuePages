<template>
    <div>
        <section class="defaultForm" v-show="!if_mobile">
            <dl class="hang" :class="{error_data:regErr.mobile}">
                <dt></dt>
                <dd>
                    <input class="text" type="number" value="" placeholder="请填写绑定销售身份的手机号" v-model="reg.mobile" @blur="yanzheng_common('mobile','test_phone','')" />
                </dd>
            </dl>
            <dl class="hang" :class="{error_data:regErr.verify_code}">
                <dt></dt>
                <dd>
                    <input type="number" name="" value="" class="text text_shot2 t_l" placeholder="请输入验证码" v-model="reg.verify_code" @blur="check_captcha" />
                    <p class="entycode">
                        <span class="get_entycode" @click="getCode" v-show="time_sec<=0">获取验证码</span>
                        <span class="show_entycode" @click="getCode2" v-show="time_sec>0"><i class="i_normal">{{time_sec}}</i>秒后重发</span>
                    </p>
                </dd>
            </dl>
        </section>
        <section class="defaultForm" v-show="if_mobile">
            <dl class="hang showdt">
                <dt>手机号：</dt>
                <dd>
                    <input class="text" type="number" value="" placeholder="" v-model="mobile" readonly="readonly" />
                </dd>
            </dl>
        </section>
        <section class="info" v-show="has_info">
            <div class="bg"></div>
            <ul>
                <li>
                    <dl>
                        <dt>真实姓名</dt>
                        <dd>{{info.real_name}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>省份证号码</dt>
                        <dd>{{info.idnumber}}</dd>
                    </dl>
                </li>
                <li v-for="item in info.district_name">
                    <dl>
                        <dt>所在大区</dt>
                        <dd>{{item.district_name}}</dd>
                    </dl>
                </li>
                <template v-for="item in info.store">        
                                <li v-show="role_type==1 || role_type==3">
                                    <dl>
                                        <dt>所在门店</dt>
                                        <dd>{{item.store_name}}</dd>
                                    </dl>
                                </li>
                                <li v-show="role_type==1 || role_type==3">
                                    <dl>
                                        <dt>门店地址</dt>
                                        <dd>{{item.address}}</dd>
                                    </dl>
                                </li>
</template>
            </ul>
            <p class="note">温馨提示：只需提交以上信息，点击【激活】系统会自动绑定并 激活您的账户，若对信息有疑问请及时致电：4000-360-280.
            </p>
        </section>
        <section class="btn">
            <span @click="get_reg" v-if="has_info">激活</span>
            <span class="disa" v-else>激活</span>
        </section>
    </div>
</template>

<script>
    import {
        Toast,
        MessageBox
    } from "mint-ui";
    import yanzheng from '@/method/yanzheng'
    import wx from 'weixin-js-sdk'
    export default {
        name: 'activate',
        components: {},
        data() {
            return {
                reg: {
                    mobile: '', //12344444444
                    verify_code: '', //4444444
                },
                regErr: {
                    mobile: false,
                    verify_code: false,
                },
                info: {
                    real_name: '',
                    idnumber: '',
                    district_name: [],
                    store: [{
                        store_name: '',
                        address: '',
                    }]
                },
                role_type: '', //角色类型
                mobile: '', //获取得电话
                if_mobile: false, //是否获取到电话
                has_info: false, //信息是否展示
                reg_url: '/reg', //注册
                captcha_url: '/fenqi/v1/api/tools/send', //获取验证码
                check_url: '/fenqi/v1/api/user/check/info', //核对验证码
                info_url: '/fenqi/v1/api/user/info', //用户基本信息获取
                active_url: '/fenqi/v1/api/user/active', //用户激活
                time_sec: 0, //倒计时    
            }
        },
        created() {
            this.getInfoStart();            
        },
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
            //验证验证码
            check_captcha: function() {
                console.log('blur');
                //验证输入内容
                this.yanzheng_common('mobile', 'test_phone', '');
                this.yanzheng_common('verify_code', 'test_anycode', '^[\\d]{6}$');
                //遍历查看是否有错误
                for (let key in this.regErr) {
                    if (this.regErr[key] == true) {
                        return false;
                    }
                }
                //提交请求----
                this.$ajax_axios.ajax_post(this, this.check_url, this.reg, (data_return) => {
                    this.getInfo()
                })
    
            },
            //获取信息
            getInfo: function() {
                this.$ajax_axios.ajax_get(this, this.info_url, '', (data_return) => {
                    console.log(data_return.data)
                    //根据身份增加提示
                    let roleName = '';
                    let roleType = data_return.data.base.role_type;
                    if (roleType == 1) {
                        roleName = '门店销售员'
                    } else if (roleType == 3) {
                        roleName = '门店管理人'
                    } else if (roleType == 5) {
                        roleName = '大区负责人'
                    }
                    //信息展示
                    this.info.real_name = data_return.data.base.real_name;
                    this.info.idnumber = data_return.data.base.idnumber;
                    if (roleType == 5) {
                        this.info.district_name = data_return.data.info;
                    } else {
                        this.info.district_name.push(data_return.data.info[0]);
                    }
                    this.info.store = data_return.data.info
                    //保存角色类型 和 手机号
                    this.mobile = data_return.data.base.mobile;
                    this.role_type = data_return.data.base.role_type;
                    this.has_info = true;
                    if (data_return.data.base.status == 3) {
                        MessageBox.alert('您的销售账户已激活！').then(action => {
                            wx.closeWindow();
                        });
                        return false;
                    }
                    let messageVal = '已匹配您为[' + roleName + ']，请确认信息后激活账户'
                    MessageBox.alert(messageVal);
                })
            },
            //获取信息
            getInfoStart: function() {
                this.$ajax_axios.ajax_get(this, this.info_url, '', (data_return) => {
                    console.log(data_return.data)
                    if (data_return.data.base.mobile) {
                        this.if_mobile = true; //第一次获取到了
                        //根据身份增加提示
                        let roleName = '';
                        let roleType = data_return.data.base.role_type;
                        if (roleType == 1) {
                            roleName = '门店销售员'
                        } else if (roleType == 3) {
                            roleName = '门店管理人'
                        } else if (roleType == 5) {
                            roleName = '大区负责人'
                        }
                        //信息展示
                        this.info.real_name = data_return.data.base.real_name;
                        this.info.idnumber = data_return.data.base.idnumber;
                        if (roleType == 5) {
                            this.info.district_name = data_return.data.info;
                        } else {
                            this.info.district_name.push(data_return.data.info[0]);
                        }
                        this.info.store = data_return.data.info
                        //保存角色类型 和 手机号
                        this.mobile = data_return.data.base.mobile;
                        this.role_type = data_return.data.base.role_type;
                        this.has_info = true;
                        if (data_return.data.base.status == 3) {
                            MessageBox.alert('您的销售账户已激活！').then(action => {
                                // window.opener=null;
                                // window.close();
                                wx.closeWindow();
                            });
                            return false;
                        }
                        let messageVal = '已匹配您为[' + roleName + ']，请确认信息后激活账户'
                        MessageBox.alert(messageVal);
                    }
                })
            },
            //提交注册
            get_reg: function() {
                // console.log(this.reg);
                // //验证输入内容
                // this.yanzheng_common('mobile', 'test_phone', '');
                // //遍历查看是否有错误
                // for (let key in this.regErr) {
                //     if (this.regErr[key] == true) {
                //         return false;
                //     }
                // }
                //提交请求----
                this.$ajax_axios.ajax_post(this, this.active_url, {
                    'mobile': this.mobile.toString(),
                    'role_type': this.role_type.toString()
                }, (data_return) => {
                    // window.location.href = data_return.data.redirect_url;
                })
            },
            //获取验证码
            getCode: function() {
                let _this = this;
                //验证手机号的正误
                this.yanzheng_common('mobile', 'test_phone', '', () => {
                    this.time_sec = 60; //重置倒计时时间
                    let interval = window.setInterval(function() {
                        if ((_this.time_sec--) <= 0) {
                            window.clearInterval(interval);
                        }
                    }, 1000);
                    //提交请求----
                    this.$ajax_axios.ajax_post(this, this.captcha_url, {
                        mobile: this.reg.mobile
                    }, (data_return) => {
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
    @import "~css/activate";
</style>
