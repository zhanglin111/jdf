<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>
      </div>
      <div class="exam">
        <p class="header">{{exam.title}}</p>
        <div class="info">
          <p class="title bold">考试信息</p>
          <p class="ml10">参考时间：<span class="c-888">{{exam.startTime}}至{{exam.endTime}}</span></p>
          <div class="ml10 fix">
            <p class="left">
              答题时间：<span class="c-888">{{exam.limitTime}}</span>
            </p>
            <p class="right" style="margin-right: 1rem">
              答题次数：<span class="c-888">{{exam.attemptNumber}}</span>
            </p>
          </div>
        </div>
        <div class="info notes">
          <p class="title bold">考试须知</p>
          <p class="c-888" style="padding: 1rem">{{exam.desc}}</p>
        </div>
        <div class="info record">
          <p class="title bold">考试记录</p>
          <p :key="record.id" v-for="record in exam.recordList" class="mt10" style="margin-left: 1rem">
            提交时间：<span class="c-888">{{record.submitTime}}</span>
            <br />
            答题时间：<span class="c-888">{{record.duration}}</span>
            <br />
            分数：<span class="c-888">{{record.score}}</span>
            <br />
            <span class="examview mt10" @click="examview(record.id)">查看试卷</span>
          </p>
        </div>
      </div>
      <div class="startbtn" @click="startexam()">开始考试</div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      exam: {},
      id: ""
    };
  },
  components: {
    "jdf-return": back
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name == "ksdetail") {
          this.initexam();
        }
      }
    }
  },
  created() {
    this.initexam();
  },
  methods: {
    //初始化数据
    initexam() {
      //测试考试ID
      this.id = this.$route.params.id;
      console.log("examdetail", this.id);
      // let id = "5C78AEFB-C461-71F0-28AD-009D2997B29D";
      this.axios
        .post("/api/b1/mobile/exam/index", {
          id: this.id
        })
        .then(res => {
          if (res.data.code == 0) {
            this.exam = res.data.data.list;
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    //开始考试
    startexam() {
      console.log(this.exam.title);
      if (this.exam.title == null) {
        this.$toast.show("考试数据异常！");
      } else {
        //首先请求生成试卷的接口，获取试卷ID
        this.axios
          .post("/api/b1/mobile/exam/create-paper", {
            id: this.id
          })
          .then(res => {
            if (res.data.code == "0") {
              console.log(res.data.data.list.paperId);
              //携带得到的试卷ID，进入到考试页面
              this.$router.push({
                name: "exam",
                params: { id: res.data.data.list.paperId }
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
    },
    //查看试卷
    examview(id) {
      //进入到考试结果页面
      this.$router.push({
        name: "result",
        params: { id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .c-888{
    color: #888 !important;
  }
.user {
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
  position: fixed;
  height: 5rem;
  top: 0;
  background: #fff;
  width: 100%;
}
.exam {
  margin-top: 14rem;
}
.header {
  height: 10rem;
  background-color: #3558b4;
  color: #fff;
  font-size: 2.2rem;
  line-height: 10rem;
  padding-left: 1rem;
  margin-top: 5rem;
}
.info:last-child {
  border-bottom: none;
  height: 100%;
  margin-bottom: 5rem;
}
.info {
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  border-bottom: 0.5rem solid #eff3f6;
  .title {
    border-bottom: 1px solid #e9e9e9;
    line-height: 4rem;
  }
  p {
    line-height: 3rem;
  }
}
.examview {
  background-color: #385dae;
  color: #fff;
  display: block;
  width: 8rem;
  border-radius: 0.5rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
}
.startbtn {
  position: fixed;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  background-color: #e30808;
  color: #fff;
  text-align: center;
  font-size: 2.2rem;
  bottom: 0;
}
</style>

