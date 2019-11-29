<template>
  <div>
    <!--  -->
    <ul class="questiontype" v-if="questionlist">
      <span @click="changedata(1)" :class="type==1?'cur':''">全部</span>
      <span @click="changedata(2)" :class="type==2?'cur':''">我的</span>
      <li :key="index" v-for="(item,index) in questionlist">
        <span @click="changeisanswer()">{{item.question}}</span>
        <span :key="index" v-for="(answer,index) in item.answerList">{{answer.content}}</span>
        <div v-if="isanswer">
          <jdf-addanswer :questionid="item.id"></jdf-addanswer>
        </div>
      </li>
    </ul>
    <span class="addquestion" @click="addquestion">+</span>
    <jdf-addquestion
      v-on:fun="changeaddstatus"
      v-if="addstatus"
      :id="course.id"
      :type="course.type"
    ></jdf-addquestion>
  </div>
</template>
<script>
import addquestion from "./addquestion";
import addanswer from "./addanswer";
export default {
  data() {
    return {
      addstatus: false, //是否显示发布提问组件
      isanswer: false,
      type: 1, //负责全部和我的 （1全部，2我的）
      questionlist: this.course.questionList
    };
  },
  props: ["course"],
  components: {
    "jdf-addquestion": addquestion,
    "jdf-addanswer": addanswer
  },
  methods: {
    //隐藏/显示 切换回答问题内容
    changeisanswer() {
      this.isanswer = this.isanswer ? false : true;
    },
    //切换全部问答和我的问答
    changedata(type) {
      this.type = type;
      if (type == 1) {
        this.questionlist = this.course.questionlist;
      } else {
        this.questionlist = this.course.myQuestionList;
      }
    },
    //发布提问
    addquestion() {
      this.addstatus = true;
    },
    //子组件回调，发布成功后隐藏发布提问组件
    changeaddstatus(status) {
      this.addstatus = status;
    }
  }
};
</script>
<style lang="scss" scoped>
.questions li {
  line-height: 2rem;
  border-bottom: 1px solid #d9dde1;
  margin: 1.5rem 1rem;
}
.questions li span {
  display: block;
}
.questions li span:first-child {
  color: #71777d;
}
.questions li span:last-child {
  color: #d9dde1;
}
.questiontype {
  margin: 2rem 0;
  width: 20rem;
  text-align: center;
}
.questiontype span {
  display: inline-block;
  width: 5rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 2rem;
  text-align: center;
}
.questiontype .cur {
  background-color: rgb(209, 236, 246);
} 
.addquestion {
  display: block;
  width: 4rem;
  font-size: 4rem;
  text-align: center;
  height: 4rem;
  line-height: 4rem;
  border-radius: 50%;
  background-color: #3558b4;
  color: #fff;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>

