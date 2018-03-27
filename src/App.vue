<template>
  <div id="app">
    <div class="manage_body" :class="{hide:login}">
      <div class="header" v-bind:class="{show_menu:is_showmenu}">
        <p class="show_menu" @click="is_showmenu=!is_showmenu"></p>
        <header>
          <div class="nav_menu_logo">
            <router-link :to="{ name: 'home' }">
              <img src="./img/logo.png" alt="分期管理系统"><br/> 分期管理系统
            </router-link>
          </div>
          <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="true" :router="true">
            <el-submenu index="1">
              <template slot="title"><i class="icon_left icon_manage_w"></i>合作商信息管理</template>
              <el-menu-item index="/partner_excel">批量导入EXCEL模板</el-menu-item>
              <el-menu-item index="/partner_region">大区责任人信息</el-menu-item>
              <el-menu-item index="/partner_manager">门店管理人信息</el-menu-item>
              <el-menu-item index="/partner_sales">门店销售员信息</el-menu-item>
            </el-submenu>
          </el-menu>
          <div class="clearfix"></div>
          <!-- <div class="head_foot">Copyright <span class="orange"> © 2018</span></div> -->
        </header>
      </div>
      <div class="main_main" :class="{'safariTable':ifSafari}">
        <div class="manage_head">
          <el-row :gutter="0">
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <div class="manage_head_l"></div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :offset="8">
              <div class="manage_head_r">
                <span v-on:click="quit_manage"><i class="icon_quit"></i>退出</span>
                <span>欢迎您,{{$store.state.username}}！</span>
                <!-- <span class="name_button">
                                    {{$store.state.qudao_name}}<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                                    <dl>
                                        <p class="arrow"><span></span></p>
                <dt>{{$store.state.qudao_name}}</dt>
                <dd><span @click="passdialog=true"><i class="icon_password"></i>修改密码</span></dd>
                </dl>
                </span> -->
              </div>
            </el-col>
          </el-row>
        </div>
       <router-view/>
      </div>
      <!-- <bounced :visible="passdialog" :newclass="big_bounced">
        <span slot="header">修改密码<i class="close"  @click="pass_reset"></i></span>
        <el-form :model="pass" :rules="passes_rules" ref="pass" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="old_password">
            <el-input v-model="pass.old_password" type="password" auto-complete="off" @blur="if_right"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password">
            <el-input v-model="pass.new_password" type="password" auto-complete="off" @blur="if_right"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="check_password">
            <el-input v-model="pass.check_password" type="password" auto-complete="off" @blur="if_right"></el-input>
          </el-form-item>
          <el-form-item label="">
            <span class="bounced_button bounced_sub" v-bind:class="{bounced_sub_right:if_right_class}" @click="mendpass">保存更改</span>
          </el-form-item>
        </el-form>
      </bounced>
      <bounced :visible="login_dialog" :newclass="big_bounced">
        <span slot="header">返回登录页</span>
        <p class="bounced_text">
          密码修改成功，请点击“确定”按钮进入登录页重新登陆!
        </p>
        <p slot="footer">
          <span class="bounced_button bounced_cancle" @click="tologin">确认</span>
        </p>
      </bounced> -->
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        is_showmenu: false, //点击显示导航
        ifSafari: false, //苹果浏览器，清楚th.gutter
        quit_url: '/fenqi_mis/v1/api/user/logout', //退出登录
        userInfo_url: '/fenqi_mis/v1/api/user/info', //获取用户信息
      }
    },
    computed: {
      login: function() {
        let if_login = this.$store.state.if_login;
        let name = this.$store.state.username;
        if (!if_login && !name) { //不在登录页，用户名不存在
          this.get_info(); //获取基础信息  
        }
        return this.$store.state.if_login
      }
    },
    created: function() {
      if (!/Chrome/g.test(navigator.userAgent) && /Safari/g.test(navigator.userAgent)) {
        this.ifSafari = true;
      }
    },
    methods: {
      //获取特定渠道的基本信息
      get_info: function() {
        var _this = this;
        this.$ajax_axios.ajax_get(this, this.userInfo_url, '', (data_return) => {
          this.$store.commit('s_username', data_return.data.name); //设置全局名字
        })
      },
      //退出
      quit_manage: function() {
        let _this = this;
        this.$ajax_axios.ajax_post(this, this.quit_url, '', (data_return) => {
          setTimeout(() => {
            this.$store.commit('s_username', ''); //设置全局名字--置空
            this.$store.commit('logout');
            this.$router.replace({
              path: '/login'
            })
          }, 0);
        })
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./css/common/const";
  body,
  p,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  form,
  fieldset,
  legend,
  input,
  select,
  textarea,
  button,
  th,
  td {
    margin: 0;
    padding: 0;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
  }
  
  ul,
  dl,
  ol {
    list-style: none;
  }
  
  img,
  fieldset,
  input[type="submit"] {
    border: 0 none;
  }
  
  img {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  button,
  input[type="button"] {
    cursor: pointer;
    border: 0 none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  textarea {
    word-wrap: break-word;
    resize: none;
  }
  
  
  /* word-wrap for opera, resize for webkit */
  
  menu {
    margin: 0;
    padding: 0;
  }
  
  body {
    //-webkit-user-select: none;
    -webkit-text-size-adjust: none;
    font-family: Arial, helvetica, "微软雅黑", "Microsoft Yahei", sans-serif;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; //色调调整
    //按钮色调调整
    .el-button--primary {
      color: #fff;
      background-color: @orange;
      border-color: @orange;
    }
    .el-button--default {
      color: @orange;
      background-color: white;
      border-color: @orange;
    } //调整日期框长度
    .el-date-editor.el-input {
      width: 100%;
      min-width: 193px;
    }
    // 输入成功的边框
    .el-form-item.is-success .el-input__inner,
    .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner,
    .el-form-item.is-success .el-textarea__inner:focus {
      border-color: @border_color;
    }
  }
  
  input[type="number"] {
    -webkit-user-select: text;
  }
  
  a,
  button,
  input,
  img {
    -webkit-touch-callout: none;
  }
  
  
  /* 1.ios 长按时不触发系统的菜单 2.禁止长按时下载图片 */
  
  input,
  select,
  textarea {
    outline: none;
  }
  
  a,
  button,
  input,
  textarea,
  span {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  a,
  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    color: @black;
    cursor: pointer;
  }
  
  @media all and (-webkit-transform-3d) {
    /* android4.0+ ios4+ 恢复按钮被点击时产生的效果 */
    a,
    button,
    input,
    textarea,
    span {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
  
  textarea {
    /* 消除ios内阴影 */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  a {
    text-decoration: none;
  }
  
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background-color: white;
    background-image: none;
    color: #000000;
  }
  
  section,
  div,
  dl,
  dt,
  dd,
  footer {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  
  /* ==================共用============================================================ */
  
  .t_c {
    text-align: center;
  }
  
  .t_r {
    text-align: right;
  }
  
  .mar_t20 {
    margin-top: 20px;
  }
  
  .mar_r6 {
    margin-right: 6px;
  }
  
  .fl {
    float: left;
  }
  
  .fr {
    float: right;
  }
  
  .clearfix {
    display: block;
    zoom: 1;
  }
  
  .clearfix:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
    overflow: hidden;
  }
  
  .clearfix_line {
    content: "";
    clear: both;
    overflow: hidden;
    width: 100%;
    height: 1px;
    background: @line_color;
  }
  
  .clearfix_liner {
    content: "";
    clear: both;
    overflow: hidden;
    width: 92%;
    margin: 0 auto;
    height: 1px;
    background: @line_color;
  }
  
  .clearfix_liner1 {
    content: "";
    clear: both;
    overflow: hidden;
    width: 100%;
    box-sizing: content-box;
    padding-right: 20px;
    margin: 0 auto;
    height: 0px;
    border-bottom: 1px dashed @line_color;
    margin-bottom: 22px;
  }
  
  .grey {
    color: @grey;
  }
  
  .black {
    color: @black;
  }
  
  .red {
    color: @red;
  }
  
  .orange {
    color: @orange;
  }

  .success {
    color:@success;
  }

  .warn {
    color:@warn;
  }

  .danger {
    color:@danger;
  }
  
  .border_red {
    color: @red;
  }
  
  i.i_normal {
    font-style: normal;
  }
  
  a.orange,
  a.orange:link,
  a.orange:visited,
  a.orange:hover {
    text-decoration: none;
    color: @orange;
    cursor: pointer;
  }
  
  body {
    background: @background_color;
    color: @black;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
  }
  
  //本页面
  .manage_body {
    width: 100%;
    position: relative;
    padding-left: 250px;
    div.header {
      width: 250px;
      margin: 0px;
      background: #2A2A2A;
      top: 0;
      left: 0;
      padding: 20px 0px 20px 0px;
      border-right: 0px solid @line_color;
      border-top: 0px solid @line_color;
      height: 100%;
      float: left;
      position: fixed;
      color: white;
      z-index: 12;
      display: block;
      overflow-y: auto;
      transition: all .5s;
      p.show_menu {
        width: 35px;
        height: 35px;
        position: fixed;
        left: 0px;
        top: 7px;
        background: url('./img/menub.png') center center no-repeat #2A2A2A;
        background-size: 20px auto;
        z-index: 12;
        display: none;
        transition: all .5s;
      }
      &.show_menu {
        left: 0;
        p.show_menu {
          display: block;
          left: 250px;
        }
      }
      .nav_menu_logo {
        text-align: center;
        margin: 0px 0px 10px;
        font-size: 16px;
        line-height: 50px;
        padding: 10px;
        img {
          width: 60px;
          height: auto;
          border-radius: 10px;
        }
        a {
          display: inline-block;
          color: white;
        }
      }
      .head_foot {
        position: absolute;
        bottom: 36px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        display: none;
      }
    }
    .main_main {
      margin: 0px 0 0 0px;
      padding: 0px 0;
      .manage_head {
        width: 100%;
        padding: 0 30px 0 10px;
        height: 50px;
        line-height: 50px;
        background: @orangebg_color;
        color: white;
        display: block;
        .manage_head_l {
          text-align: left;
          font-size: 18px;
          line-height: 50px;
          a {
            display: inline-block;
          }
          img {
            width: auto;
            height: 50px;
            margin: 0 10px 0 0px;
          }
        }
        .manage_head_r {
          text-align: right;
          line-height: 50px;
          span {
            margin-left: 40px;
            height: 50px;
            display: inline-block;
            float: right;
            .el-button span {
              margin-left: 0;
            }
            &.name_button {
              position: relative;
              display: inline-block;
              padding-right: 18px;
              box-sizing: border-box;
              .el-submenu__icon-arrow {
                right: 0;
                margin-top: -6px;
              }
            }
            dl {
              position: absolute;
              top: 70px;
              right: 0;
              display: none;
              background: @orange;
              width: 100%+20;
              min-width: 150px;
              z-index: 100;
              border-radius: 3px;
              box-shadow: 0px 1px 5px @grey;
              dt {
                height: 70px;
                line-height: 70px;
                text-align: center;
                padding: 0 20px;
                box-sizing: border-box;
              }
              dd {
                width: 100%;
                height: 45px;
                line-height: 45px;
                background: white;
                padding: 0 20px;
                box-sizing: border-box;
                color: @black;
                text-align: left;
                cursor: pointer;
                span {
                  margin: 0;
                  width: 100%;
                  display: inline-block;
                  height: 45px;
                  i {
                    width: 20px;
                    height: 20px;
                    padding-right: 8px;
                    display: inline-block;
                    position: relative;
                    &.icon_password {
                      background: url('./img/ic_Password@3x.png') left center no-repeat;
                      background-size: auto 20px;
                      top: 3px;
                    }
                  }
                }
                &:last-child {
                  border-radius: 0 0 3px 3px;
                }
                a {
                  &:hover {
                    color: @orange;
                  }
                }
                &:hover {
                  color: @orange;
                }
              }
              p.arrow {
                position: relative;
                width: 100%;
                height: 20px;
                margin-top: -20px;
                left: 0;
                span {
                  position: absolute;
                  width: 0px;
                  height: 0px;
                  border: 10px solid @orange;
                  border-color: transparent transparent @orange transparent;
                  top: 0;
                  right: 20px;
                }
              }
            }
            &:hover {
              .el-submenu__icon-arrow {
                transform: rotateZ(180deg);
              }
              dl {
                display: block;
              }
            }
          }
          &:after {
            content: '';
            clear: both;
            height: 0;
            line-height: 0;
            font-size: 0;
          }
        }
      }
      .right_head {
        width: 100%;
        height: 76px;
        line-height: 76px;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 24px;
        background: white;
        margin-bottom: 30px;
      }
      .home_body {
        width: 100%;
        box-sizing: border-box;
        padding: 0px 30px 0px;
      }
      .right_body {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px 20px;
        &:after {
          content: '';
          clear: both;
          line-height: 0px;
          height: 0px;
          font-size: 0px;
        }
        .right_body_inner {
          width: 100%;
          background: white;
          border-radius: 3px;
        }
      }
      &.safariTable {
        .right_body .el-table th.gutter {
          display: none;
        }
      }
    }
    &.hide {
      padding: 0;
      div.header {
        display: none;
      }
      .main_main {
        .manage_head {
          display: none;
        }
      }
    }
  }
  
  .icon_quit {
    width: 16px;
    height: 21px;
    display: inline-block;
    background: url('./img/quit.png') center center no-repeat;
    background-size: 16px auto;
    position: relative;
    top: 6px;
    margin-right: 6px;
  }
  
  //导航样式调整------elementUI特殊调整
  .header {
    .el-menu {
      background: none;
      color: white;
      a {
        color: white;
      }
      .el-submenu__title {
        color: white;
        /*padding-left: 0;*/
        &:hover {
          background: none;
        }
      }
      .el-menu-item {
        color: white;
        &:hover {
          background: none;
        }
        i.icon_left {
          margin-right: 6px;
          display: inline-block;
          width: 16px;
          height: 16px;
          position: relative;
          // &.icon_yester_w {
          //   background: url('./img/yester_iw.png') center center no-repeat;
          //   background-size: 16px auto;
          //   top: 2px;
          // }
        }
        &.is-active {
          background: #252424;
          position: relative;
          color: @orange;
          &:before {
            content: '';
            position: absolute;
            left: 0;
            width: 3px;
            height: 56px;
            background: @orangebg_color;
          }
          i.icon_left {
            // &.icon_yester_w {
            //   background: url('./img/yester_i.png') center center no-repeat;
            //   background-size: 16px auto;
            //   top: 2px;
            // }
          }
        }
        a {
          color: @orange;
        }
      }
      .el-submenu.is-opened .el-submenu__title {
        color: @orange;
      }
    }
    .el-submenu {
      .el-menu {
        background: none;
        a li.is-active {
          color: @orange;
        }
      }
      .el-menu-item {
        color: #8A8C92;
        &.is-active:before {
          content: '';
          position: absolute;
          left: 0;
          width: 3px;
          height: 50px;
          background: @orangebg_color;
        }
      }
      i.icon_left {
        margin-right: 6px;
        display: inline-block;
        width: 16px;
        height: 16px;
        position: relative;
        &.icon_manage_w {
          background: url('./img/ic_partner_w.png') center center no-repeat;
          background-size: 16px auto;
          top: -2px;
        }
      }
      &.is-opened {
        i.icon_left {
          &.icon_manage_w {
            background: url('./img/ic_partner.png') center center no-repeat;
            background-size: 16px auto;
            top: -2px;
          }
        }
      }
    }
  }
  
  
  /*自适应特殊设置-----------------------------------------------------------------------------------------------------------------------*/
  
  @media only screen and (min-width: 1450px) {
    header {
      width: 100%;
      height: auto;
      margin: 0px auto 0px;
      padding: 0px 0px;
    }
  }
  
  @media only screen and (max-width: 1450px) and (min-width: 768px) {
    header {
      width: 100%;
      height: auto;
      margin: 0 auto;
      padding: 10px 0px;
    }
    div.header {
      margin: 0px auto;
    }
  }
  
  @media only screen and (max-width: 768px) and (min-width: 500px) {
    header {
      width: 100%;
    }
    .manage_body div.header {
      margin: 0px auto;
      left: -250px;
      p.show_menu {
        display: block;
      }
    }
    .manage_body {
      padding-left: 0;
    }
  }
  
  @media only screen and (max-width: 500px) {
    .container {
      width: auto;
    }
    .manage_body div.header {
      margin: 0px auto;
      left: -250px;
      p.show_menu {
        display: block;
      }
    }
    .manage_body {
      padding-left: 0;
    }
    .home_body {
      padding: 0px 10px 0px;
    }
    .home_body_b {
      padding: 0px 10px 30px 10px;
    }
    .right_body {
      padding: 0 10px 20px;
    }
  }
  
  //*通用样式---------------------------------------------------------------------------------------------------------------------*/
  
  /*图片上传*/
  
  .el_pic {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    dd {
      display: inline-block;
      float: left;
      &.tips {
        color: @red;
        position: absolute;
        top: -15px;
        left: 34px;
        display: none;
      }
      &.ipload {
        width: 30%;
        min-width: 60px;
        background-color: @light_orange;
        border: 1px solid @element_bordercolor;
        position: relative;
        text-align: center;
        border-radius: 4px;
        top: 1px;
        left: 8px;
        input {
          width: 100%;
          height: 30px;
          background: 0 0;
          border: none;
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0
        }
        &.disa {
          background: @element_disacolor;
          color: #bbb;
          cursor: not-allowed;
        }
      }
      &.opload_img {
        width: 41px;
        height: 40px;
        border: 1px solid @element_bordercolor;
        border-radius: 3px;
        position: relative;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        img {
          width: 41px;
          height: auto;
          border-radius: 3px;
          position: relative;
          top: -1px;
          left: -1px;
        }
      }
    }
    &.error {
      dd.tips {
        display: block;
      }
      dd.ipload {
        color: @red;
      }
    }
    &:after {
      content: '';
      clear: both;
      height: 0;
      line-height: 0;
      font-size: 0;
    }
  }
  
  //*自定义组建样式---------------------左侧导航z-index:12------------------------------------------------------------------------------------------------*/

  
  //自定义弹框样式bounced------------------------z-index: 1020;
  .bounced_my {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1020;
    font-size: 14px;
    &:after {
      content: '';
      background: black;
      opacity: 0.8;
      position: fixed;
      width: 100%;
      height: 100%;
    }
    .bounced_my_body {
      position: absolute;
      z-index: 1021;
      width: 360px;
      padding: 0 0 0;
      background-color: white;
      border-radius: 3px;
      // top: 40%;
      // left: 50%;
      // margin-left: -180px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      header {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid @border_color;
        position: relative;
        display: none;
        i.close {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 40px;
          height: 40px;
          display: inline-block;
          background: url('./img/ic_close@3x.png') center center no-repeat;
          background-size: 40px auto;
        }
      }
      main {
        width: 100%;
        padding: 30px 35px 0;
        box-sizing: border-box;
      }
      footer {
        width: 100%;
        text-align: center;
        p {
          margin-top: 30px;
          padding-bottom: 35px;
        }
      } //弹框中单行文字
      .bounced_text {
        width: 100%;
        text-align: center;
        line-height: 24px;
        font-size: 16px;
        i {
          font-style: normal;
        }
      } //弹框中底部按钮
      .bounced_button {
        display: inline-block;
        padding: 0 10px;
        width: 110px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 0 10px 0 0;
        border-radius: 3px;
        color: white;
        cursor: pointer;
        &.bounced_sure {
          background-color: @grey_bg;
          &.bounced_sure_right {
            background-color: @orange;
          }
        }
        &.bounced_cancle {
          background-color: @orange;
        }
        &.bounced_sub {
          width: 160px;
          margin: 20px 0 0;
          background-color: @grey_bg;
          &.bounced_sub_right {
            background-color: @orange;
          }
        }
        &.single_button {
          margin: 0 0;
        }
      } //大弹框
      &.big_bounced {
        // width: auto;
        // min-width: 460px;
        // margin-left: -230px;
        // top: 30%;
        width: auto;
        min-width: 480px; //max-width: 600px;
        max-height: 100%;
        header {
          display: block;
        }
        main {
          max-height: 600px;
          overflow-y: auto;
          padding-bottom: 35px;
        }
      } //大弹框
      &.large_bounced {
        // width: 80%;
        // margin-left: 0;
        // left: 10%;
        // top: 10%;
        // height: 80%;
        width: 80%;
        max-height: 100%;
        header {
          display: block;
        }
        main {
          // height: 90%;
          // overflow-y: auto;
          max-height: 600px;
          overflow-y: auto;
          padding-bottom: 35px;
        }
      }
    }
  }
  
  //*elementUI样式调整---------------------------------------------------------------------------------------------------------------------*/
  //加载按钮
  .bigIcon {
    .el-loading-spinner{
      width:120px;
      left:50%;
      margin-left:-60px;
      height: 120px;
      border-radius: 10px;
      background:rgba(0, 0, 0, 0.6);
      padding-top: 23px;
      box-sizing: border-box;
    }
    .el-loading-spinner i{
      font-size:50px;
    }
  }
  //table边框火狐浏览器显示--兼容性处理
  table {
    border-collapse: separate; //保留边框
  }
  
  //隐藏日期插件的  清空 和 此刻 按钮____no_clear和no_now为自定义类
  .no_clear {
    .el-picker-panel__footer .el-picker-panel__link-btn {
      display: none;
    }
  }
  
  .no_now {
    .el-picker-panel__footer .el-picker-panel__link-btn {
      display: none;
    }
  }
  
  //列表搜索栏--时间输入框变短--0000-09
  .time_date_short .el-date-editor.el-input {
    width: 100%;
    min-width: 124px;
  }
  
  //交易明细--左侧标题 显示灰色
  .detail_page {
    .el-form-item__label {
      color: @grey;
    }
  }
  
  //新信息框样式
  .el-popover {
    max-width: 500px;
    &.popover_new {
      padding: 0;
      font-size: 14px;
      border-radius: 3px;
      p {
        width: 100%;
        height: 45px;
        text-align: center;
        line-height: 45px;
        color: white;
        background: @orange;
        border-radius: 3px 3px 0 0;
      }
      ul {
        width: 100%;
        padding: 10px 20px 10px;
        box-sizing: border-box;
        line-height: 30px;
        li {
          width: 100%;
        }
      }
      .popper__arrow {
        &::after {
          content: '';
          border-width: 10px;
        }
      }
      &[x-placement^="bottom"] .popper__arrow {
        top: -10px;
        border-bottom-color: @orange;
        border-width: 10px;
        border-top-width: 0;
        &::after {
          content: '';
          border-bottom-color: @orange;
          display: none;
        }
      }
      &[x-placement^="top"] .popper__arrow {
        bottom: -10px;
        border-width: 10px;
        border-bottom-width: 0;
        &::after {
          content: '';
          margin-left: -10px;
        }
      }
    }
  }
  
  //隐藏下拉菜单--商户列表--修改详情--支行无数据匹配
  .no_nomatch {
    .el-select-dropdown__empty {
      display: none;
    }
  }
  
  .el-radio__input.is-focus .el-radio__inner {
    background-color: @orange;
  }
</style>
