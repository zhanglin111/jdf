<template>
  <div>
    <div class="user imooc-container">
      <jdf-return white="gray"></jdf-return>
      {{ title }}
    </div>
    <div class="login">
      <!-- 找回密码 -->
      <div class="form-wrapper register-wrapper" v-show="state == 2">
        <div class="input-line">
          <span>账&nbsp;&nbsp;&nbsp;&nbsp;号</span>
          <input
            type="text"
            placeholder="手机号"
            v-model="phone"
            pattern="\d*"
            @keydown.enter="register"
          />
        </div>
        <div class="input-line">
          <span>验证码</span>
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="smscode"
            pattern="\d*"
            @keydown.enter="register"
          />
          <span
            @click="sendcode"
            style="display: block;
    width: 10rem;
    color: rgb(255, 255, 255);
    text-align: center;
    height: 3.5rem;
    line-height: 3.5rem;
    background-color: #3558b4;
    float: right;
    border-radius: .5rem;"
          >获取验证码</span>
        </div>
        <div class="btn register-btn" @click="next()">下一步</div>
      </div>
      <!-- 修改密码 -->
      <div class="form-wrapper register-wrapper" v-show="state == 1">
        <div class="input-line">
          <span>新&nbsp;密&nbsp;码</span>
          <input type="password" placeholder="新密码" v-model="password" />
        </div>
        <div class="input-line">
          <span>确认密码</span>
          <input type="password" placeholder="确认密码" v-model="confirmpassword" />
        </div>
        <div class="btn register-btn" @click="update">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      state: 2,
      phone: "",
      smscode: "",
      username: "",
      password: "",
      confirmpassword: "",
      preg: /^[1][3,4,5,7,8][0-9]{9}$/,
      ereg: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    };
  },
  methods: {
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
          console.log(res);
          //0表示成功
          if (res.data.code == 0) {
            this.$toast.show("已发送验证码！");
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    //修改密码
    update() {
      if (!this.password) {
        this.$toast.show("请输入密码");
        return false;
      } else if (!this.confirmpassword) {
        this.$toast.show("请输入确认密码");
        return false;
      } else if (this.password != this.confirmpassword) {
        this.$toast.show("两次密码输入不一致");
        return false;
      } else {
        this.axios
          .post("/api/b1/mobile/user/reset-password", {
            account: this.phone,
            password: this.password,
            confirmPassword: this.confirmpassword,
            verifyCode: this.smscode
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$toast.show("密码重置成功！");
              setTimeout(() => {
                window.location.href = "/login";
              }, 1000);
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
    next() {
      if (!this.phone) {
        this.$toast.show("请输入你的手机号");
        return false;
      } else if (!this.preg.test(this.phone)) {
        this.$toast.show("请输入正确的手机号");
        return false;
      } else if (!this.smscode) {
        this.$toast.show("请输入你的验证码");
        return false;
      }
      this.state = 1; //进入下一步
    },
    setUserInfo() {
      let userInfo = {
        id: 1,
        username: this.username
      };
      this.$storage.set("userInfo", userInfo);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  },
  computed: {
    title() {
      return this.state == 1 ? "设置新密码" : "找回密码";
    }
  },
  components: {
    "jdf-return": back
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
.login {
  height: 100vh;
  padding: 0.5rem 3rem 2rem;
  overflow: hidden;
  .title {
    font-size: 2.6rem;
    text-align: center;
  }
  .form-wrapper {
    margin-top: 2rem;
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
      height: 4rem;
      line-height: 4rem;
      font-size: 1.8rem;
      background-color: #3558b4;
      margin-top: 4rem;
      border-radius: 0.4rem;
    }
  }
  .forget,
  .to-login {
    font-size: 1.8rem;
    margin-top: 3rem;
  }
  .to-login {
    position: absolute;
    width: 100%;
    bottom: 4rem;
    left: 0;
  }
}
</style>
