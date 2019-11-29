<template>
  <header class="header">
    <nav class="nav imooc-flex imooc-flex-between">
      <div class="info imooc-flex">
        <!-- 详情 -->
        <div class="btn return-btn mr-10" @click="$router.back()" v-if="!isIndex">
          <span class="icon-return"></span>
        </div>
        <div class="title" v-if="!isIndex">{{ title }}</div>
        <!-- 主页 -->
        <div class="logo">
          <input
            type="text"
            @click="toSearch"
            style="color:#f6b9a6"
            placeholder="热门搜索关键词"
            class="search"
            :value="searchword"
          />
        </div>
      </div>
      <ul class="menu-list imooc-flex" v-if="isIndex">
        <!-- 进入到课程更多页面 -->
        <li class="menu-item">
          <router-link to="/index/course">
            <span class="icon-more"></span>
          </router-link>
        </li>
        <!-- 外链 -->
        <li class="menu-item">
          <span class="icon-open"></span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
// import tab from "@/components/tab";
export default {
  props: ["title", "searchword"],
  computed: {
    isIndex() {
      return /home/.test(this.$route.path);
      // return /index/.test(this.$route.path);
    }
  },
  methods: {
    toSearch() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #e2441f;
  .search {
    border-radius: 5rem;
    background-color: #d03614;
    text-align: center;
  }
  input {
    padding-left: 2rem;
    border: 1px solid #f0522e;
    height: 2.8rem;
    width: 20rem;
    box-sizing: border-box;
  }
  input::-webkit-input-placeholder {
    color: #f6b9a6;
  }
  .nav {
    padding: 1.2rem 1.5rem;
    .logo {
      width: 7rem;
    }
    .return-btn {
      width: 2rem;
      padding-top: 0.5rem;
    }
    .menu-item {
      margin-left: 1rem;
      font-size: 1.5rem;
      color: #666;
      .icon-more {
        display: block;
        width: 1.5rem;
        height: 1.7rem;
        background-image: url("/static/icon/h-2.png");
        background-size: cover;
        margin-top: 0.3rem;
      }
      .icon-open {
        display: block;
        width: 1.9rem;
        height: 1.7rem;
        background-size: cover;
        margin-top: 0.3rem;
        background-image: url("/static/icon/h-1.png");
      }
    }
  }
}
</style>
