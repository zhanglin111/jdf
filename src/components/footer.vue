<template>
  <header class="footer">
    <jdf-tab :tablist="tablist"></jdf-tab>
  </header>
</template>

<script>
import tab from "@/components/tab";
export default {
  props: ["title"],
  data() {
    return {
      tablist: [
        {
          content: "首页",
          url: "/index/home",
          icon:"icon-1"
        },
        {
          content: "我的学习",
          url: "/learn/main",
          icon:"icon-2"
        },
        {
          content: "我的",
          url: "/user",
          icon:"icon-3"
        }
      ]
    };
  },
  components: {
    "jdf-tab": tab
  }
};
</script>

<style lang="scss" scoped>
.footer {
  border-top:1px solid #ccc;
  background-color: #ffffff;
  height: 5.4rem;
  line-height: 5.4rem;
}
</style>
