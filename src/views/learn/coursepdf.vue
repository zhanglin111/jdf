<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>PDF
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
    this.id = this.$route.params.id;
    this.axios
      .post("/api/b1/mobile/course/play", { id: this.id })
      .then(res => {
        // this.src = res.data.data.list.url;
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
</style>

