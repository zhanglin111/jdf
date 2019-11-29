<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>证书预览
      </div>
      <iframe
        :src="src"
        width="100%"
        height="100%"
        style="min-height:700px"
        allowfullscreen="true"
        frameborder="0"
      ></iframe>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      src: ""
    };
  },
  components: {
    "jdf-return": back
  },
  created() {
    this.src =
      this.$route.params.url +
      "&token=" +
      JSON.parse(this.$storage.get("userInfo")).token;
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
</style>

