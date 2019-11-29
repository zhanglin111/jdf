<template>
  <!--已报名-->
  <div class="detail">
    <!-- 头部 -->
    <!-- <jdf-header title style="background-color:#d9dde1"></jdf-header> -->

    <!-- 主要内容 -->
    <div class="content" v-if="course">
      <!-- 上部分信息 -->
      <div :class="type=='project'?'':'coursetitle'">
        <!-- 标题 -->
        <div class="title">{{ course.title }}</div>
      </div>

      <!-- 教师 -->
      <div class="tacher has-line">
        <jdf-teacher :teacherList="course.teacherList"></jdf-teacher>
      </div>
      <div>
        <!-- 副标题 -->
        <div class="desc">{{ course.desc }}</div>
      </div>
      <div class="hasline"></div>
      <!--项目下包含的课程-->
      <div class="chapter" v-if="type=='project'">
        <div class="title">项目课程</div>
        <div class="citem imooc-flex" v-for="item in course.itemList" :key="item.id">
          <div class="icon">
            <img :src="item.cover[0].url" :onerror="src" />
          </div>
          <div class="info imooc-flex imooc-flex-column imooc-flex-around">
            <div class="oktitle hide-text-2">
              <span v-if="item.isReg=='1'">
                <span @click="toStudy(item.id)">{{ item.title }}</span>
                <span class="progress">{{item.completeProgress}}</span>
              </span>
              <div v-if="item.isReg=='0'">
                <span class="proregname">{{ item.title }}</span>
                <span class="proreg" @click="proreg(course.id,item.id,item.type)">报名</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 章节 -->
      <div class="chapter" v-if="type!='project'">
        <div class="title">章节</div>
        <ul class="chapter-list" :class="{'show-all': showAll}">
          <li class="chapter-item" v-for="chapter in course.chapterList" :key="chapter.id">
            <div class="title">{{ chapter.name }}</div>
            <ul class="class-list cr-basic">
              <li class="class-item" v-for="clas in chapter.resourceList" :key="clas.id">
                <span class="regstartbtn"></span>
                <span class="clasname">{{ clas.name }}</span>
              </li>
            </ul>
          </li>
          <!-- 透明遮罩 -->
          <li class="more-mask" v-if="!showAll"></li>
        </ul>
        <!-- 查看全部 -->
        <div class="check-all" v-if="!showAll" @click="showAll = !showAll">查看全部</div>
      </div>
      <div class="hasline"></div>
      <!-- 底部 -->
      <div
        class="btn footer"
        v-if="type=='project'"
        @click="toAction(course.id)"
      >{{buttonlist.length>0?buttonlist[0].text:" "}}</div>
      <div
        class="btn footer"
        v-if="type!='project'"
        @click="toAction(course.currentResId)"
      >{{buttonlist.length>0?buttonlist[0].text:" "}}</div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
import teacher from "@/components/teacher";
export default {
  data() {
    return {
      showAll: false,
      src: this.$static("/static/images/noimg.jpg")
    };
  },
  created() {
    let id = this.$route.params.id;
  },
  props: ["course", "type", "buttonlist"],
  components: {
    "jdf-header": header,
    "jdf-teacher": teacher
  },
  methods: {
    toAction(id) {
      this.$router.push({ name: "learn", params: { id } });
    },
    //项目下课程报名(项目ID，项目下要报名的课程ID，类型是课程还是训练营)
    proreg(couseid, id, type) {
      //进入到项目下课程的列表
      this.axios
        .post("/api/b1/common/enroll/reg", {
          id: id,
          type: type
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$toast.show("报名成功！");
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
      // this.$router.push({ name: "procourse", params: { couseid, id, type } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.coursetitle {
  background-color: #3558b4;
  color: #fff;
  height: 10rem;
  line-height: 10rem;
  .title {
    margin-top: 0;
  }
}
.hasline {
  border-bottom: 0.5rem solid #eff2f7;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.regstartbtn {
  display: block;
  width: 1.5rem;
  margin-top: 0.7rem;
  height: 1.5rem;
  background-image: url("/static/icon/startbtn.png");
  background-size: cover;
  float: left;
  margin-right: 0.5rem;
}
.desc {
  padding: 2rem;
  line-height: 2rem;
}
.chapter {
  .class-item {
    line-height: 3rem;
    height: 3rem;
    border-bottom: 0.1rem solid #e9e9ea;
  }
  .clasname {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 90%;
    height: 3rem;
    display: block;
  }
  margin-bottom: 5rem;
  .title {
    height: 2rem;
    font-size: 1.6rem;
    margin: 1rem 0 0.5rem 2rem;
  }
}
.oktitle {
  font-size: 1.4rem;
  font-weight: normal;
  width: 20rem;
  margin-left: 1rem;
}
.title {
  height: auto;
  font-size: 2rem;
  margin: 2rem;
}
.subtitle {
  height: 2rem;
  font-size: 1.5rem;
}
.icon img {
  width: 7rem;
  height: 5rem;
}
.imooc-flex {
  margin-top: 1rem;
  margin-left: 1rem;
}
.progress {
  display: block;
  float: right;
}
.imooc-flex .info .title {
  font-size: 1.4rem;
  font-weight: normal;
  width: 20rem;
  margin-left: 1rem;
}
.imooc-flex .info .proregname {
  width: 15rem;
  display: block;
  float: left;
  overflow: hidden;
}
.imooc-flex .info .proreg {
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #e47600;
  color: #fff;
  line-height: 4rem;
  text-align: center;
  float: right;
}
.class-list {
  padding: 0 3rem;
}
.footer {
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  background-color: #d60000;
  box-shadow: none;
}
.chapter .title.bold {
  font-size: 1.8rem;
  height: 2.5rem;
}
li.class-item {
  line-height: 2.3rem;
  font-size: 1.5rem;
  padding-left: 1.2rem;
}
.chapter-list {
  position: relative;
  height: 50rem;
  overflow: hidden;
  transition: all 0.5s linear;
  &.show-all {
    height: auto;
  }
}
.check-all {
  color: #e47600;
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
}
.more-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20rem;
  background: linear-gradient(bottom, #fff 0, rgba(255, 255, 255, 0) 100%);
}
</style>
