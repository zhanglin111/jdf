<template>
  <div>
    <div class="user imooc-container">
      <jdf-return white="true"></jdf-return>评估
    </div>

    <div class="tipinfo">
      <span class="ok">OK</span>
      <p>您的评估已提交，感谢您的参与!</p>
      <span class="btn" @click="back">返回</span>
    </div>
  </div>
</template>

<script>
import back from "@/components/return";
export default {
  components: {
    "jdf-return": back
  },
  methods: {
    back() {
      window.location.href = "/index";
    }
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
.tipinfo {
  text-align: center;
  margin-bottom: 10rem;
}
.tipinfo .ok {
  width: 7rem;
  height: 7rem;
  line-height: 7rem;
  display: inline-block;
  margin: 5rem 0;
  font-size: 2rem;
  color: #fff;
  background-color: rgb(10, 160, 10);
  border-radius: 50%;
}
.tipinfo p {
  font-size: 1.8rem;
}
.tipinfo .btn {
  display: inline-block;
  width: 90%;
  height: 4rem;
  background-color: #0aa00a;
  color: #fff;
  left: 5%;
  right: 5%;
  text-align: center;
  position: fixed;
  border-radius: 0.2rem;
  bottom: 12rem;
  line-height: 4rem;
  font-size: 1.8rem;
}
</style>

