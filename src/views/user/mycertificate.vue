<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>我的证书
      </div>
      <div class="citem imooc-flex" v-for="(item,index) in certlist" :key="index">
        <div class="icon">
          <img :src="item.cover[0].url" :onerror="src" />
        </div>
        <div class="info imooc-flex imooc-flex-column imooc-flex-around">
          <div class="title hide-text-2" @click="show(item.url)">{{item.title}}</div>
          <div class="intro hide-text-2"></div>
          <div class="people cr-basic fz-small">
            <span>{{item.date}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      certlist: [],
      src: this.$static("/static/images/noimg.jpg")
    };
  },
  components: {
    "jdf-return": back
  },
  methods: {
    show(url) {
      this.$router.push({ name: "cershow", params: { url: url } });
    }
  },
  created() {
    this.axios
      .post("/api/b1/mobile/user/my-cert")
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.certlist = res.data.data.list;
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
.user {
  border-bottom: 1px solid #eff3f6;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
}
.citem:first-of-type {
  margin-top: 6rem;
}
.citem {
  height: 7rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
  border-bottom: 1px solid #ccc;
  .title {
    padding-left: 0.5rem;
  }
  span {
    color: #53565d;
    margin: 0 0.5rem;
    padding: 0.2rem 0.4rem;
  }
  .icon {
    margin-left: 1rem;
    img {
      height: 100%;
      width: 6rem;
      border-radius: 1rem;
    }
  }
  .info {
    flex: 1;
    .title {
      word-break: break-all;
    }
  }
}
</style>

