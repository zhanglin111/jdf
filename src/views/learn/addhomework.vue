<template>
  <div>
    <p class="info">
      <span>上传作业请在PC端进行</span>
    </p>
    <p>
      <input class="content" placeholder="请输入作业内容" type="text" v-model="content" />
    </p>
    <p>
      <span class="btn" @click="addhomework()">提交作业</span>
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
  props: ["id"],
  methods: {
    addhomework() {
      if (!this.content) {
        this.$toast.show("请输入作业内容");
        return false;
      }
      //根据传递过来的参数进行赋值
      this.axios
        .post("/api/b1/mobile/homework/submit", {
          id: this.id,
          content: this.content
        })
        .then(res => {
          if (res.data.data.code == "0") {
            this.content = "";
            this.$toast.show("作业提交成功！");
          } else {
            this.$toast.show(res.data.data.message);
          }
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
  margin-left: 68%;
}
.info {
  text-align: right;
  margin-right: 5%;
  color: rgb(182, 182, 182);
}
.content {
  border: 1px solid #ccc;
  width: 90%;
  height: 10rem;
  margin-left: 5%;
}
</style>

