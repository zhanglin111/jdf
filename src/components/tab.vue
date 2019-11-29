<template>
  <ul class="tab imooc-flex imooc-flex-between">
    <li
      class="tab-item"
      v-for="tab in tablist"
      :key="tab.id"
      :class="{'active': $route.path.indexOf(tab.url)!=-1}"
    >
      <router-link :to="tab.url">
        <span class="footer-icon" :class="getclass(tab.icon,$route.path.indexOf(tab.url))">{{ tab.content }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["tablist"],
  methods: {
    getclass(icon, path) {
      if (path != -1) {
        return icon + "cur";
      } else {
        return icon + "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.tab {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a{
    display: block;
    height: 3.55rem;
  }
  .icon {
    display: block;
    // width: 5rem;
    height: 2rem;
    background-size: 2rem 1.9rem;
    background-repeat: no-repeat;
    float: left;
    background-position: center;
    padding-top: 2.4rem;
  }
  .icon-1 {
    @extend .icon;
    background-image: url("../../static/icon/tab-1.png");
  }
  .icon-2 {
    @extend .icon;
    background-image: url("../../static/icon/tab-2.png");
    background-size: 1.6rem 1.8rem!important;
    
  }
  .icon-3 {
    @extend .icon;
    background-image: url("../../static/icon/tab-3.png");
  }
  .icon-1cur {
    @extend .icon;
    background-image: url("../../static/icon/tab-1-cur.png");
  }
  .icon-2cur {
    @extend .icon;
    background-image: url("../../static/icon/tab-2-cur.png");
     background-size: 1.6rem 1.8rem!important;
  }
  .icon-3cur {
    @extend .icon;
    background-image: url("../../static/icon/tab-3-cur.png");
  }
  .tab-item {
    text-align: center;
    cursor: pointer;
    &.active {
      color: #294189;
      a {
        color: #294189;
      }
    }
  }
}
</style>
