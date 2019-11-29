<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="true"></jdf-return>评估
      </div>
      <!-- <div>{{ evaluation.title }}</div>
      <div>{{ evaluation.desc }}</div>
      <div>{{ evaluation.startTime }}~{{ evaluation.endTime }}</div>-->
      <div style="margin-bootom:4rem">
        <div class="exam" :key="index" v-for="(item,index) in evaluation.questionList">
          <h3>{{gettype(item.type,1)}}:{{ item.title }}</h3>
          <p>
            <span :key="option.id" v-for="option in item.optionList">
              <input
                style="appearance:block"
                :type="gettype(item.type,2)"
                :name="item.id"
                :value="option.id"
                @click="setquestionList(item.id,option.id,item.type)"
              />
              {{ option.name }}
            </span>
          </p>
        </div>
      </div>
      <div class="footerbtn" v-if="this.evaluation.questionList.length>0">
        <span @click="submitevaluation()">提交</span>
      </div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      evaluation: {}, //评测对象
      questionList: {}, //存放答题记录
      id: "" //评估ID
    };
  },
  components: {
    "jdf-return": back
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name == "evaluation") {
          this.initevaluation();
        }
      }
    }
  },
  created() {
    this.initevaluation();
  },
  methods: {
    //初始化
    initevaluation() {
      //测试评测ID
      this.id = this.$route.params.id;
      this.axios
        .post("/api/b1/mobile/evaluation/index", {
          id: this.id
        })
        .then(res => {
          if (res.data.code == "0") {
            this.evaluation = res.data.data.list;
            if (res.data.data.list.questionList.length == 0) {
              this.$toast.show("试题为空");
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
    //记录选项:试题ID，选项ID，题型
    setquestionList(questionid, optionid, type) {
      let status = 0;
      //点击选项，先判断列表中是否存在，如果答题记录存在，则追加（因为有多选题的情况）
      console.log(this.questionList.hasOwnProperty(questionid));
      if (this.questionList.hasOwnProperty(questionid)) {
        let obj = this.questionList[questionid];
        //如是单选题则更改原来选项ID的答题记录
        if (type == 0) {
          obj.optionList[0] = {
            id: optionid
          };
        } else {
          //如果为多选题则追加选项
          //判断如果之前勾选过，则进行反选操作
          for (let index in obj.optionList) {
            if (obj.optionList[index].id == optionid) {
              obj.optionList.splice(obj.optionList[index], 1);
              status = 1;
            }
          }
          if (status == 0) {
            obj.optionList.push({
              id: optionid
            });
          }
        }
      } else {
        //答题记录不存在，创建一条新数据
        this.questionList[questionid] = {
          id: questionid,
          optionList: [
            {
              id: optionid
            }
          ]
        };
      }
      console.log(this.questionList);
    },
    //提交评测
    submitevaluation() {
      // let id = "1F2799EF-99A2-6545-5300-BA1826927C2F"; //测试评估ID
      let courseId = "";
      let resId = "";
      this.axios
        .post("/api/b1/mobile/evaluation/submit", {
          id: this.id,
          courseId: courseId,
          resId: this.resId,
          questionList: Object.values(this.questionList)
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "0") {
            //提交成功，进入到信息提交页面
            this.$router.push({ name: "tipspage" });
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    gettype(type, inputtype) {
      //根据type返回题型（0：单选题，1：多选题，2：问答题，3：分页符，4：评估题；）
      if (inputtype == 1) {
        if (type == 0) {
          return "单选题";
        } else if (type == 1) {
          return "多选题";
        } else if (type == 2) {
          return "问答题";
        } else if (type == 4) {
          return "评估题";
        }
      } else {
        if (type == 0) {
          return "radio";
        } else if (type == 1) {
          return "check";
        } else if (type == 2) {
          return "area";
        } else if (type == 4) {
          return "area";
        }
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
.exam {
  h3 {
    // border-bottom: 1px solid #ccc;
    line-height: 3rem;
  }
  span {
    display: block;
    line-height: 3rem;
    margin-left: 1rem;
  }
}
.footerbtn {
  display: inline-block;
  width: 90%;
  height: 4rem;
  background-color: #0aa00a;
  color: #fff;
  margin-left: 5%;
  text-align: center;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  line-height: 4rem;
  font-size: 1.8rem;
}
</style>

