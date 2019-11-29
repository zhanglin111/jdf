<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>试题解析
      </div>
      <div class="total">{{index+1}}/{{resultlist.questionList.length}}</div>
      <div class="result">
        <p
          class="title"
        >({{gettype(resultlist.questionList[index].questionType)}}){{resultlist.questionList[index].title}}{{resultlist.questionList[index].questionScore}}</p>
        <p
          class="option"
          :key="option.optionUserId"
          v-for="(option,opindex) in resultlist.questionList[index].optionList"
        >
          <span
            :class="checkright(opindex+1,resultlist.questionList[index].rightAnswer)"
          >{{getoption(opindex+1+",")}}</span>
          {{option.title}}
        </p>
        <div class="parse">
          <p>你的答案：{{getoption(resultlist.questionList[index].userAnswer)}}</p>
          <p>正确答案：{{getoption(resultlist.questionList[index].rightAnswer)}}</p>
          <p>解析：{{resultlist.questionList[index].parse}}</p>
        </div>
      </div>
      <div class="footerbtn">
        <span @click="prev()">上一题</span>
        <span @click="next()">下一题</span>
      </div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      resultlist: {}, //提交试题结果
      index: 0 //当前题索引
    };
  },
  components: {
    "jdf-return": back
  },
  created() {
    //查询试题解析 isWrongParse 0：全部解析 1：错题解析
    this.axios
      .post("/api/b1/mobile/exam/question-parse", {
        paperId: this.$route.params.id,
        isWrongParse: this.$route.params.isWrongParse
      })
      .then(res => {
        console.log(res);
        if (res.data.code == "0") {
          this.resultlist = res.data.data.list;
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
    //根据type返回input type（单选题/多选题/判断题）
    gettype(inputtype) {
      if (inputtype == "0") {
        return "单选题";
      } else if (inputtype == "1") {
        return "多选题";
      } else if (inputtype == "3") {
        return "判断题";
      }
    },
    //根据数字，返回ABCDE
    getoption(optionnumber) {
      let result = "";
      optionnumber.split(",").forEach(item => {
        if (item == "1") {
          result += "A,";
        } else if (item == "2") {
          result += "B,";
        } else if (item == "3") {
          result += "C,";
        } else if (item == "4") {
          result += "D,";
        } else if (item == "5") {
          result += "E,";
        } else if (item == "6") {
          result += "F,";
        }
      });
      return result.substring(0, result.lastIndexOf(","));
    },
    //判断当前选项是否在正确答案里
    checkright(opindex, answerlist) {
      let classname = "";
      answerlist.split(",").forEach(item => {
        if (opindex == item) {
          classname = "cur";
        }
      });
      return classname;
    },
    //上一题
    prev() {
      this.index == 0 ? 0 : this.index--;
    },
    //下一题
    next() {
      this.index == this.resultlist.questionList.length - 1
        ? this.index
        : this.index++;
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
.total {
  height: 3rem;
  line-height: 3rem;
  font-size: 1.5rem;
  background-color: #f1f1f1;
  color: #333333;
  text-align: center;
}
.result {
  padding: 0rem 1rem;
  font-size: 1.5rem;
  .title {
    color: #888888;
    line-height: 3rem;
  }
  .option {
    color: #494949;
    line-height: 3rem;
    span {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 50%;
      text-align: center;
      color: #0480f2;
      border: 1px solid #0480f2;
      margin-right: 1rem;
    }
  }
  .parse {
    color: #494949;
    margin-top: 2rem;
  }
  .cur {
    background-color: #0480f2;
    color: #fff !important;
  }
}

.footerbtn {
  position: fixed;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  color: #323232;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  span {
    display: block;
    line-height: 3rem;
    height: 3rem;
    border: 1px solid #323232;
    width: 10rem;
    border-radius: 0.5rem;
  }
}
</style>

