<template>
  <div>
    <div class="user imooc-container">
      <jdf-return white="gray"></jdf-return>修改密码
    </div>
    <div class="form-wrapper register-wrapper">
      <div class="input-line">
        <input type="password" placeholder="请输入旧密码" v-model="oldPassword" />
      </div>
      <div class="input-line">
        <input type="password" placeholder="新密码" v-model="newPassword" />
      </div>
      <div class="input-line">
        <input type="password" placeholder="确认密码" v-model="confirmPassword" />
      </div>
      <span class="btn" @click="update()">修改密码</span>
    </div>
  </div>
</template>
<script>
import back from "@/components/return";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  components: {
    "jdf-return": back
  },
  methods: {
    //修改密码
    update() {
      this.axios
        .post("/api/b1/mobile/user/update-password", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$toast.show("密码修改成功！");
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    }
  }
};
</script>
<style  lang="scss"  scoped>
.user {
  border-bottom: 1px solid #eff3f6;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
}
.form-wrapper {
  margin-top: 2rem;

  .input-line {
    margin-left: 5%;
    input {
      width: 85%;
      border-bottom: 0.1rem solid #ebebeb;
      padding: 2rem 0;
    }
  }
  .btn {
    width: 90%;
    text-align: center;
    color: #fff;
    height: 5rem;
    font-size: 1.8rem;
    line-height: 5rem;
    display: block;
    background-color: #3458b4;
    margin-top: 4rem;
    margin-left: 5%;
    border-radius: 0.4rem;
    clear: both;
  }
}
</style>