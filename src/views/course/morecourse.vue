<template>
  <div class="path">
    <!-- 头部 -->
    <jdf-header :searchword="searchword" style="background-color:#e2441f"></jdf-header>
    <jdf-filter v-on:changeclass="changeclass"></jdf-filter>
    <!-- 课程列表 -->
    <ul class="class-list">
      <li
        class="class-item imooc-flex imooc-container"
        v-for="code in codelist"
        :key="code.id"
        @click="toClassDetail(code.id,code.type)"
      >
        <jdf-citem :course="code" width="10rem" height="7rem"></jdf-citem>
      </li>
    </ul>
  </div>
</template>

<script>
import filter from "@/components/filter";
import header from "@/components/header";
import citem from "@/components/citem";
export default {
  data() {
    return {
      curtype: "", //在线班、面授班、学习项目，默认为全部
      searchword: "", //搜索关键字
      codelist: [] //默认显示最新课程列表
    };
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name == "course") {
          this.getSearchData();
        }
      }
    }
  },
  created() {
    this.getSearchData();
  },
  methods: {
    getSearchData() {
      this.$loading.show(); // 显示loading
      if (this.$route.params.word != undefined) {
        //如果为搜索，则绑定搜索结果数据
        let word = this.$route.params.word;
        this.searchword = word;
        this.axios
          .post("/api/b1/mobile/search/list", {
            keyword: word,
            type: this.curtype
          })
          .then(res => {
            if (res.data.code == "0") {
              this.codelist = res.data.data.list.dataList;
            } else {
              this.$toast.show(res.data.message);
            }
            this.$loading.hide();
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
            this.$loading.hide();
          });
      } else {
        //类别ID为空，搜索关键字为空，则绑定最新课程列表数据
        this.axios
          .post("/api/b1/mobile/index/latest-list", {
            type: this.curtype,
            cateId: ""
          })
          .then(res => {
            if (res.data.code == "0") {
              this.codelist = res.data.data.list.dataList;
            } else {
              this.$toast.show(res.data.data.message);
            }
            this.$loading.hide();
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
            this.$loading.hide();
          });
      }
    },
    changeclass(index, curtype, cate) {
      this.$loading.show(); // 显示loading
      //切换数据源
      if (index == 0) {
        //最新课程
        this.axios
          .post("/api/b1/mobile/index/latest-list", {
            type: curtype,
            cateId: cate
          })
          .then(res => {
            if (res.data.code == "0") {
              this.codelist = res.data.data.list.dataList;
            } else {
              this.$toast.show(res.data.message);
            }
            this.$loading.hide();
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
            this.$loading.hide();
          });
      }
      if (index == 1) {
        //最热课程
        this.axios
          .post("/api/b1/mobile/index/hot-list", {
            type: curtype,
            cateId: cate
          })
          .then(res => {
            if (res.data.code == "0") {
              this.codelist = res.data.data.list.dataList;
            } else {
              this.$toast.show(res.data.message);
            }
            this.$loading.hide();
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
            this.$loading.hide();
          });
      }
    },
    //进入课程详情
    toClassDetail(id, type) {
      this.$router.push({ name: "cdetail", params: { id, type } });
    }
  },
  components: {
    "jdf-citem": citem,
    "jdf-header": header,
    "jdf-filter": filter
  }
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.tab {
  // background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 2rem 0 2rem;
  width: 80%;
  overflow-x: scroll;

  .tab-item {
    text-align: center;
    height: 3rem;
    width: 6rem;
    flex-shrink: 0;
    cursor: pointer;
    &.active {
      border-bottom: 0.2rem solid #ccc;
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: $main;
      }
    }
  }
}
.class-list {
  .class-item {
    padding: 0 1.5rem;
    /*border-bottom: 0.1rem solid #ebebeb;*/
    &:last-child {
      border: none;
    }
    .icon {
      width: 10rem;
      height: 7rem;
      margin-right: 1rem;
      img {
        height: 100%;
      }
    }
    .info {
      flex: 1;
      .title,
      .intro,
      .tips {
        margin-bottom: 0.5rem;
      }
    }
    &:active {
      background-color: #ebebeb;
    }
  }
}
</style>
