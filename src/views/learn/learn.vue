<template>
  <div id="wrapper">
    <div>
      <jdf-return white="white"></jdf-return>
    </div>
    <div id="middle" class="container">
      <section v-if="iframetype=='default'" class="banner" :style="getimage()"></section>
      <video
        controls="controls"
        v-if="iframetype=='video'"
        @ended="endvideo()"
        autoplay="autoplay"
        class="banner"
        :src="iframesrc"
      ></video>
      <!-- <iframe style="margin-top: 3.5rem;" v-if="iframetype=='pdf'" :src="iframesrc" class="banner"></iframe> -->
      <!-- <span class="crumbs">{{course.catename}}</span>
      <h2>{{course.title}}</h2>-->

      <menu class="learn-menu">
        <span :class="state==1?'cur':''" @click="state =1">章节</span>
        <span :class="state==2?'cur':''" @click="state =2">详情</span>
        <span :class="state==3?'cur':''" @click="state =3">评论</span>
        <span :class="state==4?'cur':''" @click="state =4">问答</span>
      </menu>
      <!-- 章节 -->
      <div class="chapter imooc-container" v-show="state == 1">
        <!-- <div class="title bold">章节</div> -->
        <ul class="chapter-list">
          <li class="chapter-item" v-for="chapter in course.chapterList" :key="chapter.id">
            <div class="title">{{ chapter.name }}</div>
            <ul class="class-list cr-basic">
              <li class="class-item" v-for="(clas,index) in chapter.resourceList" :key="clas.id">
                <a
                  v-if="clas.typeName!='Scorm课件'"
                  :class="clas.isClick==1?'':'unclick'"
                  @click="play(clas)"
                >
                  <span class="startbtn"></span>
                  {{ clas.name }}-{{clas.state}}
                </a>

                <a v-if="clas.typeName=='Scorm课件'" @click="play(clas)">
                  <span class="startbtn"></span>
                  {{ clas.name }}-{{clas.state}}
                </a>
              </li>
            </ul>
          </li>
          <!-- 透明遮罩 -->
          <!-- <li class="more-mask" v-if="!showAll"></li> -->
        </ul>
        <!-- 查看全部 -->
        <!-- <div class="check-all" v-if="!showAll" @click="showAll = !showAll">查看全部</div> -->
      </div>
      <!--2.详情-->
      <div class="intro-b" v-show="state == 2">{{course.desc}}</div>
      <!--3.评论-->
      <div class="comment" v-show="state == 3">
        <jdf-comment :course="course" :ishow="true"></jdf-comment>
      </div>
      <!--4.问答-->
      <div class="questions" v-show="state == 4 ">
        <jdf-question :course="course"></jdf-question>
      </div>
    </div>
  </div>
</template>
<script>
import back from "@/components/return";
import header from "@/components/header";
import question from "./question";
import comment from "./comment";
export default {
  data() {
    return {
      state: 1,
      course: {},
      iframesrc: "", //加载地址，播放视频地址、pdf地址
      iframetype: "default" //根据type决定显示 video还是 iframe
    };
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      // this.id = "001F18B3-6AFB-F061-21E2-334497DD178A";
      this.axios
        .post("/api/b1/mobile/course/play", { id: this.id })
        .then(res => {
          if (res.data.code == "0") {
            console.log(res);
            this.course = res.data.data.list;
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
  methods: {
    getimage() {
      return (
        "background-image: url('" +
        this.$staticurl +
        "/static/images/normal.png')"
      );
    },
    play(resource) {
      //判断是否可点击
      if (resource.isClick == 0) {
        return;
      } else {
        if (resource.typeName == "Scorm课件") {
          this.$storage.set("scorminfo", {
            resId: resource.id,
            src: encodeURIComponent(
              resource.scormData.resource[0].href,
              "utf-8"
            ),
            scoId: resource.scormData.resource[0].scoId
          });
          window.location.href = "/static/scorm/Scorm.html";
        } else if (resource.typeCode == "examination") {
          this.$router.push({
            name: "ksdetail",
            params: { id: resource.itemId }
          });
        } else if (resource.typeCode == "video") {
          this.iframetype = "video";
          this.axios
            .post("/api/b1/mobile/course/play", { id: resource.id })
            .then(res => {
              this.iframesrc = res.data.data.list.url;
            })
            .catch(error => {
              // 获取到拦截器中返回的错误信息
              this.$toast.show(error);
            });
        } else if (resource.typeCode == "pdf") {
          this.$router.push({
            name: "coursepdf",
            params: { id: resource.id }
          });
        } else if (resource.typeCode == "evaluation") {
          this.$router.push({
            name: "evaluation",
            params: { id: resource.itemId }
          });
        } else if (resource.typeCode == "homework") {
          this.$router.push({
            name: "homework",
            params: { id: resource.id }
          });
        }
      }
    },
    //视频播放完成后调用
    endvideo() {
      console.log("--视频播放完成--");
    }
  },
  components: {
    "jdf-question": question,
    "jdf-comment": comment,
    "jdf-return": back,
    "jdf-header": header
  }
};
</script>
<style>
#wrapper {
  padding-bottom: 1.30666667rem;
}
.chapter .title {
  height: 2rem;
  font-size: 1.6rem;
  margin: 1rem 0 0.5rem 0rem;
}
li.class-item {
  line-height: 2.3rem;
  font-size: 1.5rem;
  padding-left: 1.2rem;
}
.startbtn {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url("/static/icon/startbtn.png");
  background-size: cover;
  float: left;
  margin-right: 0.5rem;
}
.banner:after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.98666667rem;
  z-index: 1;
}
.banner {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 15rem;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner .crumbs {
  position: absolute;
  top: 2rem;
  left: 0.42666667rem;
  line-height: 0.32rem;
  height: 0.32rem;
  font-size: 10px;
  color: #fff;
  letter-spacing: 0;
  z-index: 2;
}
.banner h2 {
  position: relative;
  font-size: 16px;
  width: 100%;
  line-height: 7rem;
  margin: 0 auto;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
  z-index: 2;
}
.learn-menu {
  height: 5rem;
  padding-top: 2rem;
  display: flex;
  font-size: 1.6rem;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.learn-menu span.cur {
  color: #ff2d50;
  font-weight: bold;
  border-bottom: 1px solid #ff2d50;
}
[data-dpr="2"] .learn-menu span {
  font-size: 28px;
}
.learn-menu span {
  position: relative;
  flex: 1;
  font-size: 1.6rem;
  line-height: 1.28rem;
  color: #71777d;
  letter-spacing: 0;
  text-align: center;
}
li.class-item {
  line-height: 2.2rem;
}
.intro-t {
  padding-top: 0.64rem;
  padding-bottom: 0.48rem;
  margin-bottom: 0.21333333rem;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.intro-t p {
  margin: 0.64rem;
  margin-top: 0;
  margin-bottom: 0.48rem;
  padding-bottom: 0.64rem;
  border-bottom: 1px solid #d9dde1;
  border-bottom-width: 0.02666667rem;
}
.intro-t menu {
  display: flex;
  text-align: center;
}
.intro-b h4 {
  color: #2b333b;
  font-size: 0.37333333rem;
  margin-bottom: 0.21333333rem;
  font-weight: 600;
}
.intro-b p {
  font-size: 12px;
  color: #71777d;
  line-height: 1.9rem;
  margin-bottom: 0.3rem;
}
.intro-b {
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.unclick {
  color: #ccc;
}
.chapter .title.bold {
  font-size: 1.8rem;
  height: 2.5rem;
}
</style>


