<template>
  <transition name="slideright">
    <div class="main">
      <div class="head">
        <div class="project" style="padding: 0 1.1rem;">
          <a style="margin: 0; font-size: 3.2rem;">项目</a>
          <div
            class=""
            style="border-bottom:1px solid #f5f5f5; margin:1.6rem  0.9rem 0;"
            :key="index"
            v-for="(project,index) in learnlist.projectList"
            @click="toCourseDetail(project.id,'project')"
          >
            <div class="coursetitle">{{project.title}}</div>
            <div class="citem imooc-flex">
              <div class="info imooc-flex imooc-flex-column imooc-flex-around">
                <div class="title hide-text-2">共{{project.taskNum}}门课</div>
                <div class="people cr-basic fz-small">
                  <span class="left">已完成{{project.completeProgress}}</span>
                  <span style="float:left;margin-left:1rem; background: #f5f5f5;" class="progress" >
                    <b class="wcprogress" :style="getprogresswidth(project.completeProgress)"></b>
                  </span>
                </div>
              </div>
              <div class="icon">
                <img :src="project.cover[0].url" :onerror="src" />
              </div>
            </div>
          </div>
        </div>
        <div class="exam" style="padding: 1.5rem;">
         <a style="margin: 0; font-size: 3.2rem;">考试</a>
          <div class="k-citem citem imooc-flex" :key="index" v-for="(exam,index) in learnlist.examList" style="margin:0 0.7rem;padding-bottom:.6rem; border-bottom: 1px solid #f4f5f6;">
            <div class="info imooc-flex imooc-flex-column imooc-flex-around" >
              <div class="coursetitle "  style="text-indent: 0.4rem;  width: 100%;">{{exam.title}}</div>
              <div class="title hide-text-2 nums" >考试次数 {{exam.limitTimes}}次 时长 {{exam.duration}}分钟</div>
              <div class="people cr-basic fz-small">
                <span>{{exam.startTime.substr(0,10)}} 至 {{exam.endTime.substr(0,10)}}</span>
              </div>
            </div>
            <div class="exambtn" >
              <span @click="toExamDetail(exam.id)" >参加考试</span>
            </div>
          </div>
        </div>
        <div class="course" style="padding: 1.5rem;">
          <a style="margin: 0; font-size: 3.2rem;">课程</a>
          <div :key="index" v-for="(course,index) in learnlist.courseList" style="margin:0 0.75rem;  padding:0  0 1.2rem;border-bottom:1px solid #f4f5f6">
            <div class="coursetitle">{{course.title}}</div>
            <div class="cc-citem citem imooc-flex mt10" @click="toCourseDetail(course.id,'online-course')">
              <div class="icon">
                <img
                  :src="course.cover[0].url"
                  onerror="javascript:this.src='/static/images/noimg.jpg';"
                />
              </div>
              <div class="info imooc-flex imooc-flex-column imooc-flex-around">
                <div class="title hide-text-2">评论 {{course.commentNum}} 问答  {{course.answerNum}}</div>
                <div class="intro hide-text-2"></div>
                <div class="people cr-basic fz-small">
                  <span class="progress">
                    <b class="wcprogress" :style="getprogresswidth(course.completeProgress)"></b>
                  </span>
                  
                </div>
              
              </div>
                <span style="margin-top: 3.5rem; ">已学完{{course.completeProgress}}</span>
            </div>
          </div>
        </div>
      </div>
      <jdf-footer></jdf-footer>
    </div>
  </transition>
</template>

<script>
import footer from "@/components/footer";
export default {
  data() {
    return {
      learnlist: [],
      src: this.$static("/static/images/noimg.jpg")
    };
  },
  created() {
    this.$loading.show(); // 显示loading
    this.axios
      .post("/api/b1/mobile/user/my-learning")
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.learnlist = res.data.data.list;
        } else {
          this.$toast.show(res.data.message);
        }
        this.$loading.hide();
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
        this.$loading.hide();
      });
  },
  methods: {
    //计算进度条
    getprogresswidth(num) {
      if (parseInt(num) == 100) {
        return "width:12rem";
      } else {
        return "width:" + parseInt(num) / 12 + "rem";
      }
    },
    //跳转到课程详情页
    toCourseDetail(id, type) {
      this.$router.push({ name: "cdetail", params: { id: id, type } });
    },
    //跳转到考试详情页
    toExamDetail(id) {
      this.$router.push({ name: "ksdetail", params: { id: id } });
    }
  },
  components: {
    "jdf-footer": footer
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #eff3f6;
  margin-bottom: 5rem;
}

.citem {
  /*height: 6rem;
  padding-bottom: 2rem;*/
  /*border-bottom: 1px solid #ccc;*/
  .title {
  }
  span {
  }
  .icon {
    img {
      width: 8rem;
      height: 5rem;
      border-radius: .5rem;
    }
  }
  .info {
    flex: 1;
    .title {
      word-break: break-all;
    }
  }
}

.publica {
  display: block;
  font-size: 1.7rem;
  margin-left: 1rem;
  color: #fff;
  border-radius: 2.5rem;
  width: 7rem;
  height: 2.8rem;
  line-height: 2.8rem;
  text-align: center;
}
.exam {
  margin-top: 1rem;
  padding-top: 2rem;
  background-color: #fff;
  a:first-child {
    @extend .publica;
    background-color: #30a634;
  }
  .citem:last-child {
    border: none;
  }
}
.course {
  margin-top: 1rem;
  padding-top: 2rem;
  background-color: #fff;
  a:first-child {
    @extend .publica;
    background-color: #0480f3;
  }
  .citem:last-child {
    border: none;
  }
  .fz-small {
    line-height: 0.3rem;
    color: #b0b0b0;
  }
  .hide-text-2 {
    color: #b0b0b0;
  }
  .progress {
    background: #ccc;
    width: 11rem;
    height: 0.3rem;
    display: block;
    border-radius: 0.3rem;
    float: left;
  }
}
.wcprogress {
  background-color: #0480f3;
  height: 0.2rem;
  display: block;
}
.project {
  margin-top: 1.5rem;
  background-color: #fff;
  a:nth-child(1) {
    @extend .publica;
    background-color: #ffb16f;
    height: 2.5rem;
    font-size: 0.8rem;
    width: 6.25rem;
  }
  .citem:last-child {
    border: none;
  }
  .progress {
    background: #ccc;
    width: 11rem;
    height: 0.3rem;
    display: block;
    float: right;
    margin-top: 0.7rem;
  }
}
.exambtn {
  margin-top: 2.5rem;
  background-color: #30a634;
  border-radius: 0.4rem;
  color: #fff;
  line-height:  2.4rem;
  width: 6.75rem;
  height: 2.4rem;
  font-size: 1.5rem;
  text-align: center;
  margin-left: 0.6rem;

}
.coursetitle {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

  .k-citem{
    height: auto;
    margin-top: 1rem;
    .title{
      font-size: 1.6rem;
    }
    .nums{
      font-size: 1.4rem;
      margin: 0.2rem 0;
    }
  }

  .cc-citem{
    margin-top: 1.5rem;
    .icon{
      margin-right: 1.5rem;
    }
    .progress{
/*      margin-right: 1.5rem;
*/    }
  }
.people{
	span{color: #bbb;}
}
</style>

