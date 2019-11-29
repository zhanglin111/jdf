<template>
  <div>
    <jdf-return></jdf-return>
    <br />
    <br />
    <div v-html="html"></div>
    <!-- <iframe
      src="http://localhost:3002/static/94460cb061f17bab26874b88c0369687/sco01/index.html"
      ref="iframe"
      allowfullscreen="true"
      frameborder="0"
    ></iframe> -->
  </div>
</template>
<script>
import back from "@/components/return";
export default {
  data() {
    return {
      src: "",
      html: "",
      scoId: "", //scorm单元的ID
      resId: "", //资源ID
      attempt: "" //尝试次数
    };
  },
  beforeMount() {
    let parentDomain = window.location.hostname;
    console.log("domain", parentDomain); //localhost
    document.domain = parentDomain;
    if (window.orientation == 90 || window.orientation == -90) {
      console.log("横屏状态！");
    } else if (window.orientation == 0 || window.orientation == 180) {
      console.log("竖屏状态！");
    }
    // window.addEventListener("orientationchange", res => {
    //   if (window.orientation == 90 || window.orientation == -90) {
    //     console.log("横屏状态！");
    //     window.orientation = 'landscape';
    //   } else if (window.orientation == 0 || window.orientation == 180) {
    //     console.log("竖屏状态！");
    //     window.orientation = 'portrait';
    //   }
    //   //   this.$router.push({ path: "/空vue的路由地址" });
    //   console.log(res);
    // });
  },
  created() {
    this.axios
      .get(
        "http://localhost:3002/static/94460cb061f17bab26874b88c0369687/sco01/index.html"
      )
      .then(res => {
        // console.log(res.data)
        this.html = res.data;
      });
    // iframe的window对象
    // this.$refs.iframe.window.document.domain = "boe.com";
    this.src = decodeURIComponent(this.$route.params.src);
    console.log(this.src);
    this.resId = this.$route.params.resId;
    this.attempt = this.$route.params.attempt;
    //获取scoId
    this.scoId = this.$route.params.scoId;
    // this.axios
    //   .post("/scorm/record-data", {
    //     resId: this.resId,
    //     scoId: this.scoId,
    //     attempt: this.attempt
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     // 获取到拦截器中返回的错误信息
    //     this.$toast.show(error);
    //   });
  },
  components: {
    "jdf-return": back
  }
};
</script>
<style scoped>
</style>