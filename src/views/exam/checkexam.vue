<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="true"></jdf-return>检查试卷
      </div>
      <div class="exam">
        <div class="examcard">
          <h3>答题卡</h3>
          <ul>
            <li
              :class="item.answerList[0].content==''?'':'cur'"
              :key="index"
              v-for="(item,index) in resultlist.questionList"
            >{{index+1}}</li>
          </ul>
        </div>
      </div>
      <div class="result">
        <span class="cur"></span>已答
        <span></span>未答
      </div>
      <div class="footerbtn">
        <span @click="submitexam()">提交</span>
      </div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      resultlist: {}
    };
  },
  components: {
    "jdf-return": back
  },
  created() {
    this.resultlist = this.$route.params.resultlist;
  },
  methods: {
    //试卷提交
    submitexam() {
      this.axios
        .post("/api/b1/mobile/exam/submit", {
          paperId: this.resultlist.paperId,
          questionList: this.resultlist.questionList
        })
        .then(res => {
          if (res.data.code == 0) {
            //试卷提交成功后，进入到试卷结果
            this.$router.push({
              name: "result",
              params: { id: this.resultlist.paperId }
            });
          } else {
            this.$toast.show(res.data.message);
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
.user {
  border-bottom: 1px solid #eff3f6;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
}
.exam {
  span {
    display: block;
    line-height: 3rem;
    margin-left: 1rem;
  }
}
.examcard {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  li {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    background-color: #ccc;
    border-radius: 50%;
    text-align: center;
    margin: 1rem;
    color: #fff;
  }
}
.result {
  display: flex;
  align-items: center;
}
.cur {
  background-color: #d60c0c !important;
}
.result span {
  display: block;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  background-color: #ccc;
  border-radius: 50%;
  text-align: center;
  margin: 1rem;
  color: #fff;
}
.footerbtn {
  position: fixed;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  background-color: #3558b4;
  color: #fff;
  bottom: 0;
  display: flex;
  span {
    display: block;
    line-height: 4rem;
    height: 4rem;
    width: 100%;
    font-size: 1.8rem;
    flex-direction: column;
  }
}
</style>

