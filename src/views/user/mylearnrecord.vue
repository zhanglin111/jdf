<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>学习记录
      </div>
      <div class="head">
        <div class="project">
          <a>项目</a>

          <div class="citem" v-for="(item,index) in recordlist.projectList" :key="index">
            <div class="coursetitle">{{item.title}}</div>
            <div class="people cr-basic fz-small">
              <span>共{{item.taskNum}}门课</span>
              <span class="time">完成时间：{{item.completeTime}}</span>
            </div>
          </div>
        </div>
        <span class="splitbg"></span>
        <div class="exam">
          <a>考试</a>
          <div class="citem" v-for="(item,index) in recordlist.examList" :key="index">
            <div class="coursetitle">{{item.title}}</div>
            <div class="people cr-basic fz-small">
              <span>限制次数：{{item.limitTimes}}</span>
              <span>考试时长：{{item.duration}}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="splitbg"></span>
      <div class="course">
        <a>课程</a>
        <div class="citem" v-for="(item,index) in recordlist.courseList" :key="index">
          <div class="coursetitle">{{item.title}}</div>
          <div class="people cr-basic fz-small">
            <span>学习时长：{{item.learningDuration}}</span>
            <span>完成时间：{{item.completeTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      recordlist: []
    };
  },
  components: {
    "jdf-return": back
  },
  created() {
    this.$loading.show(); // 显示loading
    this.axios
      .post("/api/b1/mobile/user/my-record")
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.recordlist = res.data.data.list;
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
.citem {
  padding-right: 2rem;
  padding-left: 1rem;
  padding-bottom: 1.5rem;
  padding-top: 1.2rem;
  border-bottom: 1px solid #e4e8eb;
  .title {
    padding-left: 0.5rem;
  }
  .icon {
    margin-right: 1rem;
    img {
      height: 100%;
      width: 9rem;
      border-radius: 1rem;
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
  color: #fff;
  border-radius: 1rem;
  line-height: 3rem;
  height: 3rem;
  text-align: center;
  width: 8rem;
  margin-left: 1rem;
  font-size: 1.8rem;
}
.exam {
  margin-top: 1rem;
  padding-top: 2rem;
  background-color: #fff;
  a:first-child {
    @extend .publica;
    background: #fe0000;
    width: 7rem;
    border-radius: 2rem;
  }
  .citem:last-child {
    border: none;
  }
}
.fz-small {
  display: flex;
  justify-content: space-between;
  margin: 0.7rem 0;
  color: #b0b0b0;
  .time{

  }
}
.course {
  margin-top: 1rem;
  padding-top: 2rem;
  background-color: #fff;
  a:first-child {
    @extend .publica;
    background: #0480f2;
    width: 7rem;
    border-radius: 2rem;
  }
  .citem:last-child {
    border: none;
  }

  .hide-text-2 {
    color: #b0b0b0;
  }
  .progress {
    background: #ccc;
    width: 12rem;
    height: 0.5rem;
    display: block;
    border-radius: 0.3rem;
    float: left;
  }
}
.project {
  margin-top: 2rem;
  background-color: #fff;

  a:nth-child(1) {
    @extend .publica;
    background: #ffb16f;
    width: 7rem;
    border-radius: 2rem;
  }
  .citem:last-child {
    border: none;
  }
  .progress {
    background: #ccc;
    width: 12rem;
    height: 0.5rem;
    display: block;
    border-radius: 0.3rem;
    float: right;
    margin-top: 0.5rem;
    margin-right: 1rem;
  }
}

.coursetitle {
  margin-top: 1rem;
  font-size: 1.6rem;
}
.splitbg {
  display: block;
  width: 100%;
  height: 1rem;
  background-color: #eff3f6;
}
</style>

