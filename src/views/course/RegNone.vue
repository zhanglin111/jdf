<template>
  <div class="detail">
    <!-- 头部 -->
    <!-- <jdf-header title style="background-color:#d9dde1"></jdf-header> -->
    <a :class="type=='project'?'aproject':'acourse'">{{type=='project'?'项目':'课程'}}</a>
    <!-- 主要内容 -->
    <div class="content" v-if="course">
      <!-- 上部分信息 -->
      <div class>
        <!-- 标题 -->
        <div class="title">{{ course.title }}</div>
        <!-- 价格 -->
        <div class="desc" v-if="type!='project'">
          <span class="money">&#165;{{ course.price }}</span>
          <span></span>
        </div>
        <!-- 副标题 -->
        <div class="desc">{{ course.desc }}</div>
        <div class="hasline"></div>
        <!--项目下包含的课程-->
        <div class="chapter imooc-container" v-if="type=='project'">
          <div class="subtitle">包含课程</div>
          <div class="citem imooc-flex" v-for="item in course.itemList" :key="item.id">
            <div class="icon">
              <img :src="item.cover[0].url" />
            </div>
            <div class="info imooc-flex imooc-flex-column imooc-flex-around">
              <div class="title hide-text-2">{{ item.title }}</div>
            </div>
          </div>
        </div>

        <!-- 章节:项目详情页时不显示章节 -->
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
        <!-- 教师 -->
        <div class="tacher has-line">
          <jdf-teacher :teacherList="course.teacherList"></jdf-teacher>
        </div>
        <div class="cateinfo has-line">
          <p class="class">
            归属 {{ course.cateName }}{{ course.ownership }}
            {{ course.cost }}
          </p>
          <p class="class">信息 {{ course.enrollSuccess }}</p>
        </div>
        <div class="hasline"></div>
        <!-- 评分 -->
        <div class="rate imooc-container">
          <p>
            课程评分：
            <span>{{ parseFloat(course.score).toFixed(2) }}</span>
          </p>
          <jdf-comment :course="course" :ishow="false"></jdf-comment>
        </div>
      </div>
      <!-- 底部 -->
      <div class="footer imooc-flex">
        <div class="chat imooc-flex imooc-flex-center">
          <div class="content" @click="addfav(course.id)">
            <div class="icon">
              <span class="icon-sc"></span>
            </div>
            <p class="fz-small">收藏</p>
          </div>
        </div>
        <div class="buttons imooc-flex">
          <div
            class="btn buy-btn"
            v-if="buttonlist.length!=0"
            @click="toAction(course.id,buttonlist[0],course.type)"
          >{{buttonlist[0].text}}</div>
        </div>
      </div>
    </div>
    <jdf-formreg
      :id="course.id"
      :title="course.title"
      v-on:fun="changeformstatus"
      v-show="formstatus"
    ></jdf-formreg>
    <div class="formmask" v-show="formstatus"></div>
  </div>
</template>

<script>
import header from "@/components/header";
import teacher from "@/components/teacher";
import comment from "../learn/comment";
import formreg from "../project/formreg";
export default {
  data() {
    return {
      intro: null,
      formstatus: false, //表单状态,默认为隐藏
      showAll: false
    };
  },
  props: ["course", "type", "buttonlist"],
  methods: {
    //加入收藏
    addfav(id) {
      this.axios
        .post("/api/b1/mobile/fav/add", { id, type: this.type })
        .then(res => {
          if (res.data.code == "0") {
            this.$toast.show("收藏成功！");
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    //项目下课程报名(项目ID，类型是课程还是训练营)
    proreg(id, type) {
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
    },
    //取消报名
    cancelproreg(id, type) {
      this.axios
        .post("/api/b1/common/enroll/cancel-enroll", {
          id: id,
          type: type
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$toast.show("取消报名成功！");
          } else {
            this.$toast.show(res.data.message);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    //未报名时操作
    toAction(id, button, type) {
      console.log(type);
      //是否弹窗(如果action是reg并且要求弹窗，前端需要先获取表单数据，然后弹出该表单弹窗)
      if (button.action == "reg" && button.isPopup == "1") {
        //弹出报名formreg.vue,参数 报名课程/项目ID，类型
        this.formstatus = true;
      } else if (button.action == "reg" && button.isPopup == "0") {
        //调用报名接口
        this.proreg(id, type);
      }
      //取消报名
      else if (button.action == "cancelEnroll") {
        this.cancelproreg(id, type);
      }
      //是否支付
      else if (button.isPay == "1") {
      }
    },
    //子组件触发父组件方法
    changeformstatus(status) {
      this.formstatus = status;
    }
  },
  components: {
    "jdf-header": header,
    "jdf-teacher": teacher,
    "jdf-comment": comment,
    "jdf-formreg": formreg
  }
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.detail {
  color: #323232;
}
.regstartbtn {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.7rem;
  background-image: url("/static/icon/startbtn.png");
  background-size: cover;
  float: left;
  margin-right: 0.5rem;
}
.class-list {
  padding: 0 3rem;
}
.money {
  color: #ee9435;
  font-weight: bold;
}
.desc {
  padding: 0 2rem 2rem 2rem;
  line-height: 2rem;
}
.publica {
  display: block;
  color: #fff;
  border-radius: 1.4rem;
  line-height: 3rem;
  height: 3rem;
  text-align: center;
  width: 7rem;
  margin-left: 1rem;
  // font-size: 1.8rem;
  margin-top: 0.5rem;
}
.acourse {
  @extend .publica;
  background-color: #0480f2;
}
.aproject {
  @extend .publica;
  background: #ffb16f;
}
.hasline {
  border-bottom: 0.5rem solid #eff2f7;
  margin-top: 2rem;
  margin-bottom: 2rem;
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
  .title {
    height: 2rem;
    font-size: 1.6rem;
    margin: 1rem 0 0.5rem 2rem;
  }
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
.cateinfo {
  background-color: #fafbfd;
  border-radius: 0.5rem;
  border: 1px solid #e9e9e9;
  width: 28rem;
  height: 8rem;
  margin: 0 auto;
  margin-top: 2rem;
  .class {
    margin: 1rem 1rem;
    height: 3rem;
    border-bottom: 1px solid #ececee;
    line-height: 3rem;
  }
}
.imooc-flex {
  margin-top: 1rem;
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
.footer {
  padding: 0.5rem 1.5rem;
  .chat {
    flex-basis: 12rem;
    text-align: center;
  }
  .buttons {
    flex: 1;
    border-radius: 1rem;
    overflow: hidden;
    .btn {
      flex: 1;
      text-align: center;
      padding: 1.2rem;
      background-color: #e57600;
      color: #fff;
    }
    .add-btn {
      background-color: rgba($main, 0.7);
    }
  }
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
.formmask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
}
.more-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20rem;
  background: linear-gradient(bottom, #fff 0, rgba(255, 255, 255, 0) 100%);
}
.icon-sc {
  display: block;
  width: 1.9rem;
  height: 1.9rem;
  background-size: cover;
  margin-top: 0.7rem;
  float: left;
  background-image: url("/static/icon/icon-sc.png");
}
</style>
