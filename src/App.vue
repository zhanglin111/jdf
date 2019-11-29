<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <jdf-toast></jdf-toast>
  </div>
</template>

<script>
import toast from "@/components/toast.vue";
export default {
  name: "App",
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let userInfo = this.$storage.get("userInfo") || null;
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
      }else{
        
      }
      this.$store.commit("set_userInfo", userInfo);
      console.log(this.$store.state.userInfo);
    }
  },
  components: {
    "jdf-toast": toast
  }
};
</script>

<style lang="scss">
@import "@/public/stylesheets/main.scss";
</style>

