<template>
  <transition name="slideright">
    <div>
      <!-- 子路由视图 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!-- 底部 -->
      <jdf-footer></jdf-footer>
    </div>
  </transition>
</template>

<script>
import footer from "@/components/footer";
export default {
  components: {
    "jdf-footer": footer
  }
};
</script>

<style lang="scss" scoped>

</style>

