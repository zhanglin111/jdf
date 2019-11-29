<template>
  <div>
    <p>
      回答：
      <input class="content" placeholder="请输入回答" type="text" v-model="content" />
    </p>
    <p>
      <span class="btn" @click="addanswer()">提交回答</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  props: ["questionid"],
  methods: {
    //回答问题
    addanswer() {
      if (!this.content) {
        this.$toast.show("请输入回答内容");
        return false;
      }
      this.axios
        .post("/api/b1/mobile/question/submit-answer", {
          id: this.questionid,
          content: this.content
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  display: block;
  width: 8rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: #00a218;
  color: #fff;
  margin-top: 2rem;
}
.content {
  border: 1px solid #ccc;
  width: 70%;
  height: 10rem;
}
</style>

