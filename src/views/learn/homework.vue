<template>
  <div id="wrapper">
    <div>
      <jdf-return white="white"></jdf-return>
    </div>
    <div id="middle" class="container">
      <section class="banner" :style="getimage()"></section>
      <menu class="learn-menu">
        <span class="cur">作业</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </menu>
      <div
        class="item imooc-flex imooc-container"
        :key="index"
        v-for="(item,index) in homework.submitList"
      >
        {{ homework.title }}
        {{ homework.desc }}
        <div class="info imooc-flex imooc-flex-column imooc-flex-between">
          <div class="name bold">{{ item.content }}</div>
          <div class="type cr-basic">{{ item.submitTime }}</div>
        </div>
      </div>

      <div style="margin-top:2rem">
        <jdf-addhomework :id="id"></jdf-addhomework>
      </div>
    </div>
  </div>
</template>
<script>
import back from "@/components/return";
import header from "@/components/header";
import addhomework from "./addhomework";
export default {
  data() {
    return {
      homework: [],
      id: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    // let id = "009B6D18-E509-61AE-6AA0-F4B84A5C080D";
    this.axios
      .post("/api/b1/mobile/homework/index", {
        id: this.id
      })
      .then(res => {
        if (res.data.code == "0") {
          this.homework = res.data.data.list;
          console.log(res);
        } else {
          this.$toast.show(res.data.message);
        }
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
      });
  },
  components: {
    "jdf-addhomework": addhomework,
    "jdf-return": back,
    "jdf-header": header
  },
  methods: {
    getimage() {
      return (
        "background-image: url('" +
        this.$staticurl +
        "/static/images/normal.png')"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.comment li {
  line-height: 2rem;
  border-bottom: 1px solid #d9dde1;
  margin: 1.5rem 1rem;
}
.comment li span {
  display: block;
}
.comment li span:first-child {
  color: #71777d;
}
.comment li span:last-child {
  color: #d9dde1;
}
.cur {
  color: red;
}
.banner:after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.98666667rem;
  z-index: 1;
}
.banner {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 15rem;
  padding-top: 0.90666667rem;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner .crumbs {
  position: absolute;
  top: 2rem;
  left: 0.42666667rem;
  line-height: 0.32rem;
  height: 0.32rem;
  font-size: 10px;
  color: #fff;
  letter-spacing: 0;
  z-index: 2;
}
.banner h2 {
  position: relative;
  font-size: 16px;
  width: 100%;
  line-height: 7rem;
  margin: 0 auto;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
  z-index: 2;
}
.learn-menu {
  height: 5rem;
  padding-top: 2rem;
  display: flex;

  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.learn-menu span.cur {
  color: #ff2d50;
  border-bottom: 1px solid #ff2d50;
}
[data-dpr="2"] .learn-menu span {
  font-size: 28px;
}
.learn-menu span {
  position: relative;
  flex: 1;
  font-size: 14px;
  line-height: 1.28rem;
  color: #71777d;
  letter-spacing: 0;
  text-align: center;
}
</style>

