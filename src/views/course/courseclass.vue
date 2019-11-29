<template>
  <div class="course">
    <!-- 头部 -->
    <jdf-header title style="background-color:#e2441f"></jdf-header>
    <div
      class="citem imooc-flex"
      @click="tocourse(item.cateId)"
      :key="index"
      v-for="(item,index) in CateList"
    >
      <div class="info imooc-flex imooc-flex-column imooc-flex-around">
        <div class="title hide-text-2">{{item.cateName}}</div>
        <div class="intro hide-text-2"></div>
        <div class="people cr-basic fz-small">
          <!-- <span v-for="tag in item.taglist" :key="tag.keyword">{{tag.keyword}}</span> -->
          <span>{{item.courseNum}}门</span>
        </div>
      </div>
      <div class="icon">
        {{item.cover[0].url}}
        <img :src="item.cover[0].url" />
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
export default {
  data() {
    return {
      CateList: []
    };
  },
  components: {
    "jdf-header": header
  },
  created() {
    this.axios
      .post("/index/cate-list")
      .then(res => {
        // console.log(res.data.data.list.dataList);
        if (res.data.code == "0") {
          this.CateList = res.data.data.list.dataList;
        } else {
          this.$toast.show(res.data.message);
        }
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
      });
  },
  methods: {
    tocourse(id) {
      //根据分类ID，进入对应的课程列表
      this.$router.push({ name: "course", params: { id, issearch: true } });
    }
  }
};
</script>


<style lang="scss" scoped>
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
    border: 1px solid #ccc;
    margin: 0 0.5rem;
    padding: 0.2rem 0.4rem;
  }
  .icon {
    margin-right: 1rem;
    img {
      height: 100%;
      width: 6rem;
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

