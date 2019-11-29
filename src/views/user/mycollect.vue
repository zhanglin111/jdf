<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>我的收藏
      </div>
      <div class="citem imooc-flex" v-for="(item,index) in favlist" :key="index">
        <div class="icon">
          <img :src="item.cover[0].url" />
        </div>
        <div class="info imooc-flex imooc-flex-column imooc-flex-around">
          <div class="title hide-text-2">{{item.title}}</div>
          <div class="intro hide-text-2"></div>
          <div class="people cr-basic fz-small" style="text-align: right;
    padding-right: 1rem;">
            <span @click="cancel(item.id,item.type)">取消收藏</span>
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
      favlist: []
    };
  },
  components: {
    "jdf-return": back
  },
  methods: {
    //初始化收藏
    initdata() {
      this.axios
        .post("/api/b1/mobile/user/my-fav")
        .then(res => {
          if (res.data.code == "0") {
            console.log(res);
            this.favlist = res.data.data.list;
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    //取消收藏
    cancel(id, type) {
      this.axios
        .post("/api/b1/mobile/fav/del", {
          id,
          type
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$toast.show("取消收藏成功！");
            this.initdata();
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
  created() {
    this.initdata();
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
    color: red;
    margin: 0 0.5rem;
    padding: 0.2rem 0.4rem;
  }
  .icon {
    margin-left: 1rem;
    img {
      height: 5.1rem;
      width: 7.5rem;
      border-radius: 0.5rem;
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

