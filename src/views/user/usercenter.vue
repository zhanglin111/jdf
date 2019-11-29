<template>
  <transition name="slideright">
    <div class="user my-c imooc-container">
      <div class="pages">
        <div class="box pl15 pr15">
          <img
            class="userheard"
            onerror="javascript:this.src='/static/images/noPhotoimg.jpg';"
            :src="userinfo.avatar"
          />
          <div class="info">
            <p>{{ userinfo.name }}</p>
            <p class="gray">学习时长 {{ userinfo.learningDuration }}</p>
          </div>
        </div>
        <div class="line"></div>
        <div class="list ">
          <div class="box2 pl15 pr15">
            <span class="icon-user icon-sc"></span>
            <router-link to="myfav" style="color: #000; font-size: 0.75rem;">我的收藏</router-link>
          </div>
          <div class="box2 pl15 pr15">
            <span class="icon-user icon-xx"></span>
            <router-link to="learnrecord" style="color: #000;font-size: 0.75rem;">学习记录</router-link>
          </div>
          <div class="box2 pl15 pr15">
            <span class="icon-user icon-order"></span>
            <router-link to="order" style="color: #000;font-size: 0.75rem;">我的订单</router-link>
          </div>
          <div class="box2 pl15 pr15" style="border-bottom: none">
            <span class="icon-user icon-zs"></span>
            <router-link to="certificate" style="color: #000;font-size: 0.75rem;">我的证书</router-link>
          </div>
        </div>
        <div class="line"></div>
        <div class="list">
          <div class="box2 pl15 pr15">
            <span class="icon-user icon-setting"></span>
            <router-link to="info" style="color: #000;font-size: 0.75rem;">设置</router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {
        name: "",
        gender: "",
        avatar: "",
        company: "",
        email: "",
        learningDuration: ""
      }
    };
  },
  created() {
    this.axios
      .post("/api/b1/mobile/user/base")
      .then(res => {
        if (res.data.code == "0") {
          console.log(res.data.data.list);
          this.userinfo = res.data.data.list;
        } else {
          this.$toast.show(res.data.message);
        }
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
      });
  }
};
</script>

<style lang="scss" scoped>
  .line{
    width: 100%;
    height: 0.65rem;
    background: #eff3f6;
  }
  .my-c{
    padding: 1.5rem 0;
  }
  .pl15{
    padding-left: 1.5rem;
  }
  .pr15{
    padding-right: 1.5rem;
  }
.pages {
  padding-bottom: 1.5rem;
}
.box {
  width: 100%;
  padding-left:1.5rem 2.15rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  
}
.box .userheard {
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50%;
  float: left;
}
.box .info {
  float: left;
  margin-top: 1rem;
  margin-left: 1rem;
  line-height: 2rem;
}
.box .info .gray {
  color: #888;
  font-size: 0.6rem;
}
.list {
  width: 100%;
  background-color: #fff;
  padding-left: 0.6rem;
}
.list .box2 {
  height: 5rem;
  line-height: 5rem;
  color: #2b333b;
  font-size: 0.9rem;
  border-bottom: 1px solid #eaedee;
  display: flex;
  align-items: center;
}
.list .box2 img {
  margin: 0 0.7rem;
  vertical-align: text-bottom;
}
img {
  border-style: none;
  max-width: 100%;
  height: auto;
  -ms-interpolation-mode: bicubic;
  display: inline-block;
  vertical-align: middle;
}
.list .box2 .url-tips {
  display: inline-block;
  float: right;
  padding-right: 0.7rem;
  font-size: 0.6rem;
  color: #ff0000;
}
.icon-user {
  display: block;
  width: 2rem;
  height: 2rem;
  float: left;
  margin-right: 1.4rem;
  background-size: 1.8rem 1.8rem;
  background-repeat: no-repeat;
}
.icon-order {
  background-image: url("/static/icon/icon-order.png") ;
   background-size: 1.4rem  1.6rem;
   margin-top: 0.3rem;
}
.icon-setting {
  background-image: url("/static/icon/icon-setting.png");
   background-size: 1.6rem  1.6rem;
   margin-top: 0.3rem;
}
.icon-xx {
  background-image: url("/static/icon/icon-xx.png");
  background-size: 1.5rem  1.2rem;
   margin-top: 0.8rem;
  
}
.icon-zs {
  background-image: url("/static/icon/icon-zs.png");
   background-size: 1.5rem  1.6rem;
   margin-top: 0.3rem;
}
.icon-sc {
  background-image: url("/static/icon/icon-sc.png");
}
.info p{
	font-size:1.5rem ;
	font-weight: bold;
}
</style>

