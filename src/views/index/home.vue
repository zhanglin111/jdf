<template>
  <div class="home mt-10">
    <!-- 轮播图 -->
    <div class="banner">
      <swiper :options="boptions" ref="mySwiper" v-if="bannerlist.length != 0">
        <swiper-slide v-for="(banner, index) in bannerlist" :key="index">
          <img :src="banner.img" style="height: 10rem;" />
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
    </div>

    <!-- 公告 -->
    <!--<div class="notice imooc-container imooc-flex imooc-flex-between fz-small">-->
      <!--<div class="info">-->
        <!--<div class="content cr-basic hide-text-1" style="width:25rem">{{notice.title}}</div>-->
      <!--</div>-->
      <!--<div class="btn">详情</div>-->
    <!--</div>-->

    <!-- 热门推荐 -->
    <div class="rec imooc-container">
      <!-- 头部 -->
      <div class="head imooc-flex imooc-flex-between">
        <div class="title">热门推荐</div>
        <div class="more-link">
          <span @click="loadnext()" class="cr-basic black">换一批</span>
        </div>
      </div>

      <!-- 列表 -->
      <ul class="hotcourse rec-list">
        <li
          class="rec-item istop"
          v-for="rec in topListCourse"
          :key="rec.id"
          @click="toClassDetail(rec.id,rec.type)"
        >
          <jdf-hotcourse :course="rec" width="13rem"></jdf-hotcourse>
        </li>
      </ul>
    </div>

    <!-- 新上好课 -->
    <div class="new imooc-container">
      <!-- 头部 -->
      <div class="head imooc-flex imooc-flex-between">
        <div class="title">资源列表</div>
        <div class="more-link">
          <router-link to="/index/course" class="cr-basic">更多&nbsp;></router-link>
          <!-- <a href="/index/course" class="cr-basic">更多》</a> -->
        </div>
      </div>

      <!-- 列表 -->
      <ul
        class="rec-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <li
          class="rec-item"
          v-for="(cne,index) in listCourse"
          :key="index"
          @click="toClassDetail(cne.id,cne.type)"
        >
          <div>
            <jdf-zylb :course="cne" width="8rem" height="auto"></jdf-zylb>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import sliceArray from "@/public/javascripts/sliceArray";
import hotcourse from "./hotcourse";
import zylb from "./zylb";
export default {
  data() {
    return {
      notice: {}, //通知公告
      bannerlist: [], //轮播图
      topListCourse: [], //推荐
      listCourse: [], //资源列表
      page: 1, //下拉更多默认页码为1
      busy: false, //下拉加载
      //轮播图配置属性
      boptions: {
        effect: "coverflow",
        slidesPerView: 1.1,
        spaceBetween: 65,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        coverflowEffect: {
          rotate: 0,
          stretch: 10,
          depth: 100,
          modifier: 2,
          slideShadows: true
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  created() {
    this.getHomeData();
  },
  methods: {
    loadnext() {
      //换一批
      this.axios
        .post("/api/b1/mobile/index/other")
        .then(res => {
          this.topListCourse = res.data.data.list.dataList;
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    getHomeData() {
      this.$loading.show(); // 显示loading
      this.axios
        .post("/api/b1/mobile/index/index")
        .then(res => {
          if (res.data.code == "0") {
            let data = res.data.data.list;
            this.bannerlist = data.carousel;
            this.topListCourse = data.topListCourse;
            this.listCourse = data.listCourse;
            this.notice = data.notice[0];
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
    //id:课程/项目/班级ID ，type：分类
    toClassDetail(id, type) {
      this.$router.push({ name: "cdetail", params: { id, type } });
    },
    loadMore: function() {
      if (/home/.test(this.$route.path)) {
        //下拉加载更多资源列表数据
        this.axios
          .post("/api/b1/mobile/index/more", { page: this.page++ })
          .then(res => {
            if (res.data.code == "0") {
              // console.log(res.data.data.list.listCourse);
              // console.log(res.data.data.totalPage);
              //判断如果下拉页面等于总页码则不再下拉
              if (this.page >= res.data.data.totalPage) {
                this.busy = false;
              } else {
                this.busy = true;
                this.listCourse = this.listCourse.concat(
                  res.data.data.list.listCourse
                );
                this.busy = false;
              }
            } else {
              this.$toast.show(res.data.message);
            }
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
          });
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    "jdf-hotcourse": hotcourse,
    "jdf-zylb": zylb
  }
};
</script>

<style lang="scss" scoped>
$active: #ebebeb;
.home {
  .rec-item {
    // 置顶样式
    &.istop {
      float: left;
      width: 49%;
      min-width: 10.5rem;
      &:nth-child(odd) {
        margin-right: 2%;
      }
    }
  }
}
.hotcourse li {
  border-radius: 0.5em;
}
.new {
  clear: both;
  .cr-basic {
    color: red;
  }
}
.hotcourse li:nth-child(1) {
  background-color: #d6eed8;
  color: #28ae33;
  margin: 0.5rem 0;
}
.hotcourse li:nth-child(2) {
  background-color: #cdeefd;
  color: #00a9f4;
  margin: 0.5rem 0;
}
.hotcourse li:nth-child(3) {
  background-color: #ffddd3;
  color: #ff581d;
  margin: 0.5rem 0;
}
.hotcourse li:nth-child(4) {
  background-color: #e9f3db;
  color: #86c844;
  margin: 0.5rem 0;
}
</style>

