<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>考试结果页面
      </div>
      <div class="examinfo">
        <p class="time">
          <span>交卷时间：{{result.submitTime}}</span>
          <span>用时：{{result.duration}}分</span>
        </p>
        <div>
          <p class="score">{{result.score}}分</p>
          <p>正确率{{result.rightRate}}%</p>
          <p style="line-height:8rem">答对{{result.rightInfo}}</p>
        </div>
      </div>
      <div class="examcard" v-if="result.isShowAnswer==1">
        <h3>答题板</h3>
        <ul>
          <li
            :class="item.isRight==1?'right':'error'"
            :key="item.questionUserId"
            v-for="(item,index) in result.questionList"
          >{{index+1}}</li>
        </ul>
      </div>

      <div class="footerbtn" v-if="result.isShowParse==1">
        <span @click="analisy(0)">全部解析</span>
        <span @click="analisy(1)">错题解析</span>
      </div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      id: "", //试卷ID
      result: {} //考试结果
    };
  },
  components: {
    "jdf-return": back
  },
  created() {
    this.id = this.$route.params.id;
    this.axios
      .post("/api/b1/mobile/exam/result", {
        paperId: this.id
      })
      .then(res => {
        if (res.data.code == "0") {
          console.log(res.data.data.list);
          this.result = res.data.data.list;
        } else {
           this.$toast.show(res.data.message);
        }
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
      });
  },
  methods: {
    //进入到试题解析页面 isWrongParse:0：全部解析 1：错题解析
    analisy(isWrongParse) {
      this.$router.push({
        name: "examanalisy",
        params: { id: this.id, isWrongParse: isWrongParse }
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
.examinfo {
  text-align: center;
  padding: 1rem;
  background: linear-gradient(left, #caafb8, #3572ab);
  height: 17rem;
  color: #fff;
  .time {
    display: flex;
    justify-content: space-between;
  }
  span {
    display: block;
    line-height: 3rem;
    margin-left: 1rem;
  }
  .score {
    font-size: 4rem;
    margin-top: 2rem;
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
  .right {
    background-color: #d60c0c;
  }
  .error {
    background-color: #0480f2;
  }
}
.footerbtn {
  position: fixed;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  background-color: #0480f2;
  color: #fff;
  bottom: 0;
  display: flex;
  span {
    display: block;
    line-height: 5rem;
    height: 5rem;
    width: 50%;
    flex-direction: column;
  }
}
</style>

