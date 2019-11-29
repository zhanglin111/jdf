<template>
  <div :style="state==2?'background-color:#ebeef3':''" style="background: url('/static/images/login-bg.png');background-size: 100%;">
    <div class="user imooc-container" v-show="state == 1">
      <jdf-return white="gray"></jdf-return>注册
    </div>
    <div style="padding: 6rem 3rem 2rem;" v-show="state == 2">
      <img class="jdf-logo" src="/static/images/logo.png" />
    </div>
    <div class="login">
      <!-- <jdf-return></jdf-return> -->
      <!-- <div :class="state==1?'regtitle':'logintitle'">{{ title }}</div> -->

      <!-- 注册面板 -->
      <div class="form-wrapper register-wrapper register" v-show="state == 1">
        <div class="input-line">
          <span>账&nbsp;&nbsp;&nbsp;&nbsp;号</span>
          <input type="text" placeholder="账号" v-model="username" @keydown.enter="register" />
        </div>
        <div class="input-line">
          <span>手机号</span>
          <input
            type="text"
            placeholder="手机号"
            v-model="phone"
            pattern="\d*"
            @keydown.enter="register"
          />
        </div>
        <div class="input-line" style="position: relative">
          <span>验证码</span>
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="smscode"
            pattern="\d*"
            style="width:10rem"
            @keydown.enter="register"
          />
          <span class="register-btn"

            @click="sendcode"

          >获取验证码</span>
        </div>
        <div class="input-line">
          <span>密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
          <input type="text" placeholder="密码" v-model="password" @keydown.enter="register" />
        </div>
        <div class="input-line">
          <span>确认密码</span>
          <input type="text" placeholder="确认密码" v-model="confirmpwd" @keydown.enter="register" />
        </div>

        <div class="btn" @click="register">注册</div>
      </div>
      <!-- 登录面板 -->
      <div class="form-wrapper register-wrapper" style="margin: 0 1rem;" v-show="state == 2">
        <div class="input-line">
          <input type="text" placeholder="账号" v-model="username" @keydown.enter="login" />
        </div>
        <div class="input-line">
          <input type="password" placeholder="密码" v-model="password" @keydown.enter="login" />
        </div>
        <div class="input-line fix yzm-box" style="position: relative">
          <input type="text" placeholder="验证码" v-model="code" style="float:left;width:10rem" />
          <img class="yzm-pic" :src="'http://120.92.36.69/api/b1/mobile/code/show-img?v='+captchaVersionParam" />
          <span class="yzm-change-btn" @click="refreshCaptcha()">换一个</span>

        </div>
        <div class="btn " @click="login">登录</div>
      </div>

      <p class="forget text-center" v-show="state == 2">
        <span @click="state = 1">注册账号</span>
        <span @click="findpwd">密码找回</span>
      </p>
      <div class="footerbq" v-if="state==2">2019京东方版权大学所有</div>
      <p class="to-login text-center" v-show="state == 1" @click="state = 2">已有账号？去登录</p>
      <!--<p class="to-login text-center" v-show="state == 2" @click="state = 1">没有账号，去注册</p>-->
    </div>
  </div>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      openId: "",
      state: 2,
      phone: "18701505479",
      smscode: "",
      username: "10064511", //10181457
      password: "123456",
      confirmpwd: "123456",
      code: "", //登录验证码
      preg: /^[1][3,4,5,7,8][0-9]{9}$/,
      ereg: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
      captchaVersionParam:new Date().getTime(),
    };
  },
  methods: {
    findpwd() {
      this.$router.push({ name: "findpwd" });
    },
    sendcode() {
      //发送短信验证码
      this.axios
        .post(
          "/api/b1/mobile/code/send",
          JSON.stringify({
            account: this.phone
          })
        )
        .then(res => {
          //0表示成功
          if (res.data.code == 0) {
            this.$toast.show("已发送验证码到手机！");
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    register() {
      //注册方法
      if (!this.username) {
        this.$toast.show("请输入你的账号");
        return false;
      } else if (!this.phone) {
        this.$toast.show("请输入你的手机号");
        return false;
      } else if (!this.preg.test(this.phone)) {
        this.$toast.show("请输入正确的手机号");
        return false;
      } else if (!this.smscode) {
        this.$toast.show("请输入你的验证码");
        return false;
      } else if (!this.password) {
        this.$toast.show("请输入你的密码");
        return false;
      } else if (!this.confirmpwd) {
        this.$toast.show("请输入确认密码");
        return false;
      } else if (this.confirmpwd != this.password) {
        this.$toast.show("两次输入的密码不一致");
        return false;
      }
      this.axios
        .post(
          "/api/b1/mobile/user/reg",
          JSON.stringify({
            account: this.username,
            mobile: this.phone,
            password: this.password,
            confirmPassword: this.confirmpwd,
            verifyCode: this.smscode
          })
        )
        .then(res => {
          console.log(res);
          //0表示成功
          if (res.data.code == 0) {
            this.$toast.show("注册成功");
            window.location.href = "/login"; //注册成功后进入到登录
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    login() {
      //登录方法
      if (!this.username) {
        this.$toast.show("请输入你的账号");
        return false;
      } else if (!this.password) {
        this.$toast.show("请输入你的密码");
        return false;
      } else if (!this.code) {
        this.$toast.show("请输入验证码");
        return false;
      } else {
        //调用登录接口,将用户信息和返回的token进行存储
        this.axios
          .post(
            "/api/b1/mobile/user/login",
            JSON.stringify({
              account: this.username,
              password: this.password,
              verifyCode: this.code,
              openId: this.openId
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$toast.show("登录成功");
              this.setUserInfo(res.data.data.list.token);
            } else {
              this.$toast.show(res.data.message);
            }
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
          });
      }
    },
    setUserInfo(token) {
      let userInfo = {
        // id: 1,
        // username: this.username,
        token: token,
        openId: this.openId
      };
      this.$storage.set("userInfo", userInfo);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    //获取code
    GetWiXinCode: function() {
      if (this.getQueryVariable("oh") != "") {
        this.axios
          .post(
            "/api/b1/wechat/index/get-oauth2-url",
            JSON.stringify({
              redirectUrl: "http://120.92.36.69/login"
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              var url = res.data.data.list.oauth2Url;
              console.log("GetWiXinCode ", res.data.data.list.oauth2Url);
              window.location.href = url;
            } else {
              this.$toast.show(res.data.message);
            }
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
          });
      } else if (this.getQueryVariable("code") != "") {
        var codes = this.getQueryVariable("code");
        console.log("codes ", codes);
        this.axios
          .post(
            "/api/b1/wechat/index/get-openid",
            JSON.stringify({
              code: codes
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              var wxopenid = res.data.data.list.openid;
              this.openId = wxopenid;
              console.log("GetWiXinCode openid", wxopenid);
              this.CheckMianDeng(openid);
            } else {
              this.$toast.show(res.data.message);
            }
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
          });
      }
    },
    CheckMianDeng: function(wxopenId) {
      console.log("CheckMianDeng  wxopenId", wxopenId);
      this.axios
        .post(
          "/api/b1/wechat/index/login",
          JSON.stringify({
            openid: wxopenId
          })
        )
        .then(res => {
          console.log("CheckMianDeng", res);
          if (res.data.code == 0) {
            var token = res.data.data.list.token;
            console.log("GetWiXinCode CheckMianDeng", token);
            this.setUserInfo(res.data.data.list.token);
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    getQueryVariable: function(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return "";
    },
      refreshCaptcha(){
          this.captchaVersionParam = new Date().getTime();
      },
  },
  computed: {
    title() {
      return this.state == 1 ? "注册" : "BOE";
    }
  },
  components: {
    "jdf-return": back
  },
  created() {
    this.GetWiXinCode();
  }
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";

.user {
  border-bottom: 1px solid #eff3f6;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
}
.footerbq {

  margin-top: 5rem;
  text-align: center;
  width: 100%;
  color: #787876;
  font-size: 1.6rem;
}
.login {
  height: 80vh;
  overflow: hidden;
  .regtitle {
    font-size: 2.6rem;
    text-align: center;
  }
  .logintitle {
    font-size: 4.6rem;
    text-align: center;
    font-weight: 700;
    position: relative;
  }
  .logintitle:after {
    content: "";
    position: absolute;
    bottom: 0%;
    background: #494949;
    width: 15%;
    height: 10px;
    left: 41%;
  }
  .form-wrapper {
    border: 1px solid #fff;
    margin-top: 2rem;
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
    .input-line {
      border-bottom: 0.1rem solid #ebebeb;
      span {
        color: #3b3b3b;
      }
      input {
        width: 43%;
        padding: 1.5rem 0;
        caret-color: $main;
      }
    }
    .btn {
      width: 100%;
      text-align: center;
      color: #fff;
      height: 5rem;
      font-size: 1.8rem;
      line-height: 5rem;
      background-color: #3558b4;
      margin-top: 6rem;
      border-radius: 0.4rem;
      clear: both;
    }
  }
  .forget {
    color: #787878;
    display: flex;
    justify-content: space-between;
  }
  .forget,
  .to-login {
    font-size: 1.8rem;
    margin-top: 3rem;
    padding: 0 3rem;
  }
  .to-login {
    position: absolute;
    width: 100%;
    bottom: 4rem;
    left: 0;
  }
}

  .register{
    .input-line{
      border: none !important;
      display: flex;
      align-items: center;
      span{
        width: 5.5rem;
        text-align: right;
        margin-right: 2rem;
      }
      input{
        width: 65% !important;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .register-btn{
    position: absolute;
    width: 10rem !important;
    height: 3.5rem;
    line-height: 3.5rem;
    background-color:#3558b4;
    float: right;
    border-radius: .5rem;
    right: 0;
    text-align: center !important;
    color: #fff !important;
  }
  .jdf-logo{
    width: 25.25rem;
    height: 5.58rem;
  }
  .yzm-box{
    border: none !important;
    input{
      border-bottom: 1px solid #ebebeb;
    }
  }
  .yzm-pic{
    position: absolute;
    width:10rem;
    height:4rem;
    margin-top: 0.2rem;
    left: 10rem;

  }
  .yzm-change-btn{
    padding-left: 2rem;
    color:#3458b4 !important;
    font-size: 1.5rem;
    position: absolute;
    left: 21rem;
    top: 1.1rem;
    background: url("data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QONaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NWYwZGI4Y2QtNTFiOS04NTQwLWIyNzYtM2JkN2MwOTMwZGFiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ1MUVBQzVCMTExMjExRUE5MjRGQUVDMUE5MEJBQzdDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1MUVBQzVBMTExMjExRUE5MjRGQUVDMUE5MEJBQzdDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmM3ZmM2MDkxLWQxNTgtNDQ0Ny1hYzA4LTg0NzgwMWFhZjZlNiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmM5YmVhNzNmLWI1NDctMDM0NC1hYmMzLTllODA0ZDI1OTgzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0LCQsNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABkAGQMBEQACEQEDEQH/xACTAAACAwAAAAAAAAAAAAAAAAAICQUGBwEAAgMBAAAAAAAAAAAAAAAABQYCBAcDEAACAQMDAgIEDwEAAAAAAAABAgMEBQYAEgcRCCETMdIWVkFhIkKTs8N0lLQ1dTZ2FzcRAAEDAgIGBwcFAAAAAAAAAAEAAgMRBDEFIVFxgRJSQZGhsdEyBvBhEzMUNBVCYnLSFv/aAAwDAQACEQMRAD8AYdy/zfydm/JdTwD26LBBf7YpOcZ7OA0NtA6CWNGZZFTy9wV32s+87EUMOunHK8otba2F7feU+RnNq6+gYU0nQg91dyyS/BgxGJ1KHHZnyjNCLpVd0+W+1pHmmvQ1hhWX07VY3ASdAfDr1Hh834Ndf9Vag8Is2cGrR/Wih+KlxMzuLf4ods47p+fuG6fM+FslvtnyrLLcY6S28j0cqy1NJDIvVwwVVDzbSADKqyRt1Lb/AJJB2z9OZfmBju42uaw6Sw4E+GzQeiiozZjcW/FE4gnmRLe02Se8Fy/FzevoB9PHyjqCIfEdrKMq0Y7guP3a+X2xWmzWe8ZK0cmQXGijhglrXjLsrzsgG9usjHcfE9fHSrLPPKxrHucWtwBqabOpFGsjaSQACcferWwjqIWUOTHMhG+Nyp2sPSroQR8RB1WwK64od5+0rt3qp5qmp40pKipqHaWoqJayvd5Hc7mZmapJJJPUk6ON9S5i0UEppsb4Kicttz+jtPitQ/zLBPd2H6Sb19DvyE/N3Kx9PHqSHcG4uyXG6DEuaM44tumW8QJcC1yp6d/KM9PEPCWRQGdYC58GYBH2lN67gdbJeZjFM59pDMGT00e46tvaMaJOht3MDZXsJZX23JqVH3z9t8NigngvVxoHp4FWDGVtFQs8aooCxL5aGmHQDoAJems5f6PzIyULQf3cQpt5uxMQzi24cTsp7BZZi9z5L7tuWMTzqGgu/HPB3HdSayzzedJS1d3nDAkCSJl3mXYFfYSkablDl26kjcR22R2j4SWyXEgoekNG/V0V0k0NKKvG6W+la+hbG3tTH9IiOqn4b/AMU/r9D+VTVq6+4f8AyPeuUXyxsHckXXr/AL1L+5/a62CL7DclB/z96fhaP0m2fdIfq11jEvnO0pybgFI6gpL/2Q==") no-repeat left center;
    background-size: 1.6rem 1.6rem;
  }
</style>
