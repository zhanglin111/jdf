<template>
  <div>
    <p>
      <input class="content" placeholder="请输入评论内容" type="text" v-model="content" />
    </p>
    <p>
      <span class="btn" @click="addcomment()">提交评论</span>
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
  props: ["id", "type"],
  methods: {
    addcomment() {
      if (!this.content) {
        this.$toast.show("请输入评论内容");
        return false;
      }
      //根据传递过来的参数进行赋值
      // let id = "4225E4C3-D210-1B8E-A18C-BD8D4C16E718";
      // let type = "online-course";
      this.axios
        .post("/api/b1/mobile/comment/submit", {
          id: this.id,
          type: this.type,
          content: this.content
        })
        .then(res => {
          console.log(res.data.code);
          if (res.data.code == 0) {
            this.$toast.show("提交成功");
            //提交成功
            this.content = ""; //清空文本框内容
            this.$emit("fun", false); //调用父组件方法，隐藏发布提问组件
            //更新评论列表数据
          } else {
            this.$toast.show(res.data.message);
            return false;
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
  float: right;
  margin-right: 5%;
}
.content {
  margin-top: 2rem;
  border: 1px solid #ccc;
  margin-left: 5%;
  width: 90%;
  height: 10rem;
}
</style>

