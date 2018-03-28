<template>
  <div class="body_bg">
    <div class="band">
      <span>分期管理系统</span>
    </div>
    <div class="formbody">
      <p>用户登录</p>
      <el-form :model="login" :rules="login_rules" ref="login" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="username">
          <el-input v-model="login.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="login.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footerbg"></div>
    <!-- <load :visible="loading"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast> -->
  </div>
</template>

<script>
  // import load from '../../components/load'
  // import toast from '../../components/toast'
  import {
    test_tel_email,
    test_any
  } from '../../method/yanzheng'
  export default {
    name: "login",
    components: {
      // load,
      // toast
    },
    data() {
      return {
        // loading: false, //load是否显示
        // toastmsg: "", //toast提示文字
        // visible_toast: false, //toast是否显示
        login: {
          username: "",
          password: ""
        },
        login_rules: {
          username: test_tel_email(true, 'blur'),
          password: test_any('密码', 6, 20, true, 'blur')
        },
        login_url: "/fenqi_mis/v1/api/user/login" //登录地址
      };
    },
    created() {},
    methods: {
      // //监听toast是否可见的值得变化
      // onVisibleChange(val) {
      //   this.visible_toast = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      // },
      // //监听toast内容的值得变化
      // onMsgChange(val) {
      //   this.toastmsg = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      // },
      onSubmit() {
        let _this = this;
        this.$refs.login.validate(valid => {
          if (valid) {
            _this.login_post();
          } else {
            return false;
          }
        });
      },
      login_post() {
        let _this = this;
        this.$ajax_axios.ajax_post(this, this.login_url, _this.login, (data_return) => {
          _this.$store.commit('login');
          _this.$router.replace({
            path: '/'
          })
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  //登录页
  .body_bg {
    width: 100%;
    height: 100%;
    min-height: 500px;
    background: #fff8eb;
    overflow: hidden;
    position: relative;
    //z-index: -2;
    .footerbg {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: auto;
      min-height: 600px;
      background: url("../../img/bg.png") bottom center no-repeat #fff8eb;
      background-size: 100% auto;
      z-index: 1;
    }
    .band {
      width: auto;
      height: auto;
      max-width: 380px;
      max-height: 80px;
      box-sizing: border-box;
      margin: 0 auto;
      font-size: 36px;
      padding: 12px 30px;
      color: #ff8100;
      background: white;
      border-radius: 0 0 16px 16px;
      box-shadow: 0 4px 10px 0 rgba(255, 129, 0, 0.19);
      text-align: center;
      position: relative;
      z-index: 2;
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          background: url("../../img/square.png") center center no-repeat;
          background-size: 12px 12px;
          width: 12px;
          height: 12px;
          top: 20px;
          left: 20px;
        }
        &:after {
          content: "";
          position: absolute;
          background: url("../../img/square.png") center center no-repeat;
          background-size: 12px 12px;
          width: 12px;
          height: 12px;
          top: 20px;
          right: 20px;
        }
      }
    }
    .formbody {
      width: 320px;
      height: 230px;
      background: white;
      box-sizing: border-box;
      padding: 12px 25px 25px;
      //margin: 250px auto 450px;
      border-radius: 5px;
      position: fixed;
      z-index: 3;
      top: 50%;
      left: 50%;
      margin-left: -160px;
      margin-top: -130px;
      &:before {
        content: "";
        position: absolute;
        top: -20px;
        right: -60px;
        background: url("../../img/star.png") center center no-repeat;
        background-size: 30px 50px;
        width: 30px;
        height: 50px;
      }
      p {
        width: 100%;
        line-height: 35px;
        color: #ff8100;
        font-size: 22px;
        text-align: center;
        margin-bottom: 10px;
      }
      form {
        .el-form-item {
          margin-bottom: 18px;
        }
        .el-button--primary {
          width: 100%;
          color: #fff;
          background-color: #ff8100;
          border-color: #ff8100;
        }
      }
    }
  }
  
  
  /* 小屏幕（平板，大于等于 768px） */
  
  @media (min-width: 320px) {
    .formbody {
      margin: 100px auto 160px;
    }
  }
  
  
  /* 小屏幕（平板，大于等于 768px） */
  
  @media (min-width: 768px) {
    .formbody {
      margin: 220px auto 450px;
    }
  }
</style>
