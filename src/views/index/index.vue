<template>
  <div class="index haspadding">
    <!-- 头部 -->
    <jdf-header></jdf-header>
    <!-- 子路由视图 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
     <!-- 底部 -->
    <jdf-footer></jdf-footer>
  </div>
</template>

<script>
import header from "@/components/header";
import footer from "@/components/footer";
export default {
  components: {
    "jdf-header": header,
    "jdf-footer": footer
  }
};
</script>

<style lang="scss" scoped>
.index {
  min-height: 100vh;
  padding-top: 6rem;
  &.haspadding {
    padding-bottom: 5rem;
  }
}
</style>



