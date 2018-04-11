<template>
    <div>
        <section class="topInfo">
            <div class="img">
                <div class="imgin"><img src="~images/icon_avatar.png" alt=""></div>
            </div>
            <dl>
                <dt>你好，亲</dt>
                <dd>你还未绑定手机号</dd>
            </dl>
        </section>
        <section class="defaultForm">
            <dl class="hang" :class="{error_data:regErr.mobile}">
                <dt></dt>
                <dd>
                    <input class="text" type="number" value="" placeholder="请输入手机号" v-model="reg.mobile" @blur="yanzheng_common('mobile','test_phone','')" />
                </dd>
            </dl>
            <dl class="hang" :class="{error_data:regErr.verify_code}">
                <dt></dt>
                <dd>
                    <input type="number" name="" value="" class="text text_shot2 t_l" placeholder="请输入手机收到的验证码" v-model="reg.verify_code" @blur="yanzheng_common('verify_code','test_anycode','^[\\d]{6}$')" />
                    <p class="entycode">
                        <span class="get_entycode" @click="getCode" v-show="time_sec<=0">获取验证码</span>
                        <span class="show_entycode" @click="getCode2" v-show="time_sec>0"><i class="i_normal">{{time_sec}}</i>秒后重发</span>
                    </p>
                </dd>
            </dl>
            <dl class="hang note">
                <dt></dt>
                <dd>
                    温馨提示：如长时间未获取短信，请重新获取验证码
                </dd>
            </dl>
        </section>
        <section class="info">
            <mt-switch v-model="if_agree"></mt-switch><a :href="protocolUrl" @click="saveReg">我已阅读并同意好近分期<span class="orange decoration">《平台服务协议》</span></a>
        </section>
        <section class="btn">
            <span @click="get_reg">立即绑定</span>
        </section>
    </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import yanzheng from "@/method/yanzheng";
import { getParams, getUrl } from "@/method/util";
export default {
  name: "register",
  components: {},
  data() {
    return {
      reg: {
        mobile: localStorage.mobile ? localStorage.mobile : "", //12344444444
        verify_code: localStorage.verify_code ? localStorage.verify_code : "", //4444444
        redirect_url: decodeURIComponent(getParams("redirect_url"))
      },
      regErr: {
        mobile: false,
        verify_code: false
      },
      if_agree: localStorage.if_agree ? Boolean(localStorage.if_agree) : false,
      bind_url: "/fenqi/v1/api/user/bind", //用户绑定手机号
      captcha_url: "/fenqi/v1/api/tools/send", //获取验证码
      time_sec: 0, //倒计时
      protocolUrl: ""
    };
  },
  created() {
    this.protocolUrl = getUrl("single.html#/protocol");
    //检测csid
    this.$ajax_axios.ajax_check(this,location.href)
  },
  methods: {
    //验证通用
    yanzheng_common: function(
      val,
      reg_func,
      test_reg,
      success_func,
      error_func
    ) {
      yanzheng[reg_func](
        this.reg[val],
        true,
        test_reg,
        () => {
          this.regErr[val] = false;
          if (success_func) {
            success_func();
          }
        },
        () => {
          this.regErr[val] = true;
          if (error_func) {
            error_func();
          }
        },
        this
      );
    },
    //提交注册
    get_reg: function() {
      // console.log(this.reg);
      //验证输入内容
      this.yanzheng_common("mobile", "test_phone", "");
      this.yanzheng_common("verify_code", "test_anycode", "^[\\d]{6}$");
      //遍历查看是否有错误
      for (let key in this.regErr) {
        if (this.regErr[key] == true) {
          return false;
        }
      }
      //验证连接是否存在
      if (!this.reg.redirect_url) {
        Toast("缺少参数，请重新操作");
        return false;
      }
      //验证是否阅读
      if (!this.if_agree) {
        Toast("请阅读并同意好近分期《平台服务协议》");
        return false;
      }
      //提交请求----
      this.$ajax_axios.ajax_post(this, this.bind_url, this.reg, data_return => {
        // console.log(data_return)
        // console.log(data_return.role_type)
        // console.log(data_return.role_type == '1')
        this.clearReg(); //清空localstorage的保存数据
        if (
          data_return.data.role_type == 1 ||
          data_return.data.role_type == 3 ||
          data_return.data.role_type == 5
        ) {
          MessageBox.alert("匹配您为指定销售，请前往销售信息页面激活账户").then(
            action => {
              window.location.href = data_return.data.redirect_url;
            }
          );
        } else {
          window.location.href = data_return.data.redirect_url;
        }
      });
    },
    //获取验证码
    getCode: function() {
      let _this = this;
      //验证手机号的正误
      this.yanzheng_common("mobile", "test_phone", "", () => {
        this.time_sec = 60; //重置倒计时时间
        let interval = window.setInterval(function() {
          if (_this.time_sec-- <= 0) {
            window.clearInterval(interval);
          }
        }, 1000);
        //提交请求----
        this.$ajax_axios.ajax_post(
          this,
          this.captcha_url,
          {
            mobile: this.reg.mobile,
            check: 1
          },
          data_return => {
            Toast("短信发送成功，请注意查收");
          },
          () => {
            window.clearInterval(interval); //停止倒计时
            this.time_sec = 0; //恢复倒计时时间为0，让 获取验证码 按钮恢复可点
          },
          () => {
            window.clearInterval(interval); //停止倒计时
            this.time_sec = 0; //恢复倒计时时间为0，让 获取验证码 按钮恢复可点
          }
        );
      });
    },
    getCode2: function() {
      if (this.time_sec > 0) {
        Toast("60s后重新获取");
      }
    },
    //保存输入内容
    saveReg() {
      localStorage.mobile = this.reg.mobile;
      localStorage.verify_code = this.reg.verify_code;
      localStorage.if_agree = true;
    },
    //清空保存内容
    clearReg() {
      localStorage.mobile = "";
      localStorage.verify_code = "";
      localStorage.if_agree = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import "~css/form";
@import "~css/register";
</style>
