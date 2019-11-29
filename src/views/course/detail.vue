<template>
  <div class="detail">
    <div class="user imooc-container">
      <jdf-return white="gray"></jdf-return>详情页面
    </div>
    <!--已报名班级/项目详情页面-->
    <jdf-regok :course="course" :buttonlist="buttonlist" :type="type" v-if="isReg=='1'"></jdf-regok>
    <!--未报名班级/项目详情页面-->
    <jdf-regnone :course="course" :buttonlist="buttonlist" :type="type" v-if="isReg=='0'"></jdf-regnone>
  </div>
</template>

<script>
import back from "@/components/return";
import RegOk from "./RegOk";
import RegNone from "./RegNone";
export default {
  data() {
    return {
      course: null,
      isReg: 0,
      id: "",
      type: "", //类型（在线、面授、项目）
      buttonlist: []
    };
  },
  created() {
    this.getcourse();
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name == "cdetail") {
          this.getcourse();
        }
      }
    }
  },
  methods: {
    getcourse() {
      this.$loading.show(); // 显示loading

      //得到项目或者课程的详细信息
      this.type = this.$route.params.type; //判断类别
      // 获取传递过来的课程ID，进行查询
      this.id = this.$route.params.id;
      //要请求的url
      let url = "";
      if (this.type == "project") {
        // this.id = "B1DCA016-B890-D108-A6F1-530AA39A11AF"; //未报名
        // id="52295389-100E-CA45-42C3-94F64F6DB743" //已报名
        // this.id = "B664E9ED-40F1-67C2-6A85-2B8BC8F9E2DA";
        url = "/api/b1/mobile/project/index";
      } else {
        // this.id = "DABF29EA-D453-4785-FD1A-12CE54880E03";
        url = "/api/b1/mobile/course/index";
      }
      this.axios
        .post(url, { id: this.id })
        .then(res => {
          if (res.data.code == "0") {
            this.isReg = parseInt(res.data.data.list.isReg);
            this.course = res.data.data.list;
            console.log("0--------", this.course, this.isReg);
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
      //得到buttonlist
      this.axios
        .post("/api/b1/common/learning/button-list", {
          id: this.id,
          type: this.type
        })
        .then(res => {
          this.buttonlist = res.data.data.list.buttonList;
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    }
  },
  components: {
    "jdf-regnone": RegNone,
    "jdf-return": back,
    "jdf-regok": RegOk
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
.detail {
  margin-bottom: 7rem;
}
</style>
