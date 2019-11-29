<template>
  <div class="detail">
    <!-- 头部 -->
    <jdf-header title style="background-color:#d9dde1"></jdf-header>

    <!-- 主要内容 -->
    <div class="content">
      <!-- 上部分信息 -->
      <div class="imooc-container">
        <!-- 标题 -->
        <div class="title bold">{{ project.title }}</div>
        <!-- 副标题 -->
        <div class="content mb-10">{{ project.desc }}</div>

        <div class="chapter imooc-container">
          <div class="title bold">课程报名</div>
          <div class="citem imooc-flex" v-for="item in courselist" :key="item.id">
            <div class="icon">
              <img :src="item.cover[0].url" />
            </div>
            <div class="info imooc-flex imooc-flex-column imooc-flex-around">
              <div class="title hide-text-2">{{ item.title }}</div>
              <div class="people cr-basic fz-small">
                <span>{{ item.startTime }}~{{ item.endTime }}</span>
                <span>{{course.address}}{{item.info}}</span>
                <span v-if="isReg==0" @click="procoursereg(id)">报名</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
export default {
  data() {
    return {
      courselist: [],
      project: {},
      type: ""
    };
  },
  created() {
    let couseid = this.$route.params.couseid; //项目ID
    let id = this.$route.params.id; //项目下要报名的课程ID
    this.type = this.$route.params.type;
    //获取项目基本信息
    this.axios
      .post("/api/b1/mobile/project/index", { id: couseid })
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.project = res.data.data.list;
        } else {
          this.$toast.show(res.data.message);
        }
      });
    //查询项目中的课程或训练营
    this.axios
      .post("/api/b1/mobile/project/item-index", { id, type: this.type })
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.course = res.data.data.list;
        } else {
          this.$toast.show(res.data.message);
        }
      });
  },
  methods: {
    //项目下课程报名
    procoursereg(id) {
      this.axios
        .post("/api/b1/common/enroll/reg", {
          id: id,
          type: this.type
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$toast.show("报名成功！");
          } else {
            this.$toast.show("报名失败！errorcode=" + res.data.code);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    }
  },
  components: {
    "jdf-header": header
  }
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.footer {
  padding: 0.5rem 1.5rem;
  .chat {
    flex-basis: 6rem;
    text-align: center;
  }
  .buttons {
    flex: 1;
    border-radius: 3rem;
    overflow: hidden;
    .btn {
      flex: 1;
      text-align: center;
      padding: 1.2rem;
      background-color: $main;
      color: #fff;
    }
    .add-btn {
      background-color: rgba($main, 0.7);
    }
  }
}
</style>
