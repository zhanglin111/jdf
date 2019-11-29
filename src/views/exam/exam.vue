<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="true"></jdf-return>考试页面
      </div>
      <div class="total" v-if="questionlist.length>0">{{index+1}}/{{resultlist.questionList.length}}</div>
      <div class="exam" v-if="questionlist.length>0">
        <h3>{{questionlist[index].sequence}}.{{questionlist[index].questionType}}:{{questionlist[index].title}}</h3>
        <p>
          <span :key="option.optionUserId" v-for="option in questionlist[index].optionList">
            <input
              @click="checkoption(option,index,questionlist[index].questionUserId,questionlist[index].questionType)"
              style="appearance:block"
              name="group"
              :checked="option.isChecked==1?true:false"
              :type="gettype(questionlist[index].questionType)"
            />
            {{option.title}}
          </span>
        </p>
      </div>

      <div class="footerbtn" v-if="questionlist.length>0">
        <span @click="prev()">上一题</span>
        <span @click="checkexam()">提交</span>
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
      questionlist: [],
      paperId: "",
      question: {}, //试题对象
      resultlist: {}, //答题记录
      index: 0 //当前题索引
    };
  },
  components: {
    "jdf-return": back
  },
  created() {
    this.paperId = this.$route.params.id;
    this.axios
      .post("/api/b1/mobile/exam/question", {
        paperId: this.paperId
      })
      .then(res => {
        if (res.data.code == "0") {
          console.log("exam", res);
          if (res.data.data.list.questionList.length > 0) {
            this.question = res.data.data.list;
            this.questionlist = res.data.data.list.questionList;
            this.initresultlist();
          } else {
            this.$toast.show("暂无试题！");
          }
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
    //初始化答题记录数据
    initresultlist() {
      this.resultlist = {
        paperId: this.$route.params.id,
        questionList: []
      };
      let answerlist = [];
      this.questionlist.forEach(question => {
        question.optionList.forEach(option => {
          if (option.isChecked == "1") {
            answerlist.push({ content: option.optionUserId });
          }
        });
        this.resultlist.questionList.push({
          questionUserId: question.questionUserId,
          answerList: answerlist
        });
        answerlist = [];
      });
      console.log(this.resultlist);
    },
    //点击选项记录选择ID到答题记录
    checkoption(option, index, questionUserId, questionType) {
      let isflag = true;
      if (questionType == "单选题" || questionType == "判断题") {
        this.resultlist.questionList[index].answerList[0] = {
          content: option.optionUserId
        };
        //调用接口保存选项记录
        this.saveoption(option.optionUserId, questionUserId, "1");
        //改变本地数据记录
        this.changeoptionstatus(index, option.optionUserId, questionType);
      } else if (questionType == "多选题") {
        if (this.resultlist.questionList[index].answerList.length == 0) {
          this.resultlist.questionList[index].answerList[0] = {
            content: option.optionUserId
          };
          //调用接口保存选项记录
          this.saveoption(option.optionUserId, questionUserId, "1");
          //改变本地数据记录
          this.changeoptionstatus(index, option.optionUserId, questionType);
        }
        console.log(this.questionlist);
        this.resultlist.questionList[index].answerList.forEach(answer => {
          if (answer.content == "") {
            if (isflag) {
              this.resultlist.questionList[index].answerList[0] = {
                content: option.optionUserId
              };
              //调用接口保存选项记录
              this.saveoption(option.optionUserId, questionUserId, "1");
              //改变本地数据记录
              this.changeoptionstatus(index, option.optionUserId, questionType);
              console.log("-------------------");
            }
            isflag = false;
          } else if (answer.content == option.optionUserId) {
            if (isflag) {
              this.resultlist.questionList[index].answerList.splice(answer, 1);
              //调用接口保存选项记录
              this.saveoption(option.optionUserId, questionUserId, "0");
              //改变本地数据记录
              this.changeoptionstatus(index, option.optionUserId, questionType);
            }
            isflag = false;
          } else {
            if (isflag) {
              this.resultlist.questionList[index].answerList.push({
                content: option.optionUserId
              });
              //调用接口保存选项记录
              this.saveoption(option.optionUserId, questionUserId, "1");
              //改变本地数据记录
              this.changeoptionstatus(index, option.optionUserId, questionType);
            }
            isflag = false;
          }
        });
      }
    },
    //检查试卷
    checkexam() {
      this.$router.push({
        name: "checkexam",
        params: { resultlist: this.resultlist }
      });
    },
    //记录用户选项
    saveoption(optionUserId, questionUserId, isChecked) {
      this.axios
        .post("/api/b1/mobile/exam/temp-save", {
          paperId: this.paperId,
          resultId: this.question.resultId,
          questionUserId: questionUserId,
          optionUserId: optionUserId,
          isChecked: isChecked
        })
        .then(res => {
          if (res.data.code != "0") {
            this.$toast.show(res.data.message);
            // window.location.href = "/login";
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    //改变本地选项状态
    changeoptionstatus(index, optionUserId, questionType) {
      console.log("--------------", questionType);
      if (questionType == "单选题" || questionType == "判断题") {
        this.questionlist[index].optionList.forEach(item => {
          item.isChecked = "0";
          if (item.optionUserId == optionUserId) {
            item.isChecked = "1";
          }
        });
      } else if (questionType == "多选题") {
        this.questionlist[index].optionList.forEach(item => {
          console.log(item.optionUserId, optionUserId);
          if (item.optionUserId == optionUserId) {
            console.log(item.isChecked, item.isChecked == "1");
            item.isChecked = item.isChecked == "1" ? "0" : "1";
            console.log(item.isChecked);
          }
        });
      }
      console.log(this.questionlist);
    },
    //上一题
    prev() {
      this.index == 0 ? 0 : this.index--;
    },
    //下一题
    next() {
      this.index == this.questionlist.length - 1 ? this.index : this.index++;
    },
    //根据type返回input type（单选题/多选题/判断题）
    gettype(inputtype) {
      if (inputtype == "单选题") {
        return "radio";
      } else if (inputtype == "多选题") {
        return "checkbox";
      } else if (inputtype == "判断题") {
        return "radio";
      }
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
.exam {
  h3 {
    border-bottom: 1px solid #ccc;
    line-height: 3rem;
  }
  span {
    display: block;
    line-height: 3rem;
    margin-left: 1rem;
  }
}
.footerbtn {
  position: fixed;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  bottom: 0;
  display: flex;
  span {
    display: block;
    line-height: 3rem;
    height: 3rem;
    width: 10rem;
    flex-direction: column;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    margin: 0rem 2rem;
  }
}
</style>

