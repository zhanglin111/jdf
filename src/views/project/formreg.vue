<template>
  <div class="formreg">
    <div class="title">
      确认购买{{title}}实战
      <span class="close" @click="closeview()">X</span>
    </div>
    <!-- 用户信息 -->
    <div class="userinfo">
      <div class="box">
        <div class="info">
          <div :key="index" v-for="(item,index) in formdata.dataList">
            <span>{{ item.name }}：{{ item.span }}</span>
            <div v-if="item.selectList">
              <select class="select">
                <option
                  :key="diritem.id"
                  v-for="diritem in item.selectList"
                  :value="diritem.kid"
                >{{diritem.system}}-{{diritem.enterpriseName}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span class="btn" @click="submitreg()">确认</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {}
    };
  },

  props: ["id", "title"],
  created() {
    this.id = "";
    // 获取表单数据
    this.axios
      .post("/api/b1/common/enroll-manage/get-embed", {
        id: this.id
      })
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.formdata = res.data.data.list;
        } else {
          this.$toast.show(res.data.message);
        }
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
      });
  },
  methods: {
    closeview() {
      this.$emit("fun", false);
    },
    //提交报名
    submitreg() {
      this.axios
        .post("/api/b1/mobile/enroll-manage/save-embed", {
          arr: {
            "95c9799e-54a4-11e7-8d4e-3c9509520016": "程萌(10156597)",
            "b275b533-54a4-11e7-8d4e-3c9509520016": "10156597",
            "d4ef83ac-54ae-11e7-8d4e-3c9509520016": "chengmeng@boe.com.cn",
            "e007e0e5-54ae-11e7-8d4e-3c9509520016": "18010005322",
            "e435e69f-54ae-11e7-8d4e-3c9509520016": "13118119930226076X",
            "ai67da1e-54ae-11e7-8d4e-3c9509520016": "业务支援体系",
            "7c3fv9e9-54ae-11e7-8d4e-3c9509520016": "B3",
            "fcfdc9e9-54ae-11e7-8d4e-3c9509520016": "CIO组织",
            "a3d2dw7d-54ae-11e7-8d4e-3c9509520016": "",
            "55adccff-54af-11e7-8d4e-3c9509520016": "肖铭(106732)",
            "5bbe8f0d-54af-11e7-8d4e-3c9509520016": "冯蓓(00002869)",
            "660d76f5-54af-11e7-8d4e-3c9509520016": "集团总部",
            "72ba3bf4-54af-11e7-8d4e-3c9509520016": "集团总部",
            "784313b6-54af-11e7-8d4e-3c9509520016": ""
          },
          embedId: "BFD033D6-786E-C6F9-8BB8-D13DD5F93B40",
          id: this.id
        })
        .then(res => {
          if (res.data.code == "0") {
            this.$toast.show("报名成功！");
          } else {
            this.$toast.show("报名失败！errorcode:" + res.data.code);
          }
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.formreg {
  width: 80%;
  margin: 0 auto;
  min-height: 40rem;
  position: absolute;
  z-index: 3;
  top: 8rem;
  background: #fff;
  margin-left: 10%;
  .select {
    height: 2.4rem;
  }
}
.formreg .title {
  height: 4rem;
  font-size: 1.4rem;
  text-align: center;
  border-bottom: 0.5rem solid #ebebeb;
  line-height: 4rem;
  .close {
    display: inline-block;
    background-color: #3558b4;
    color: #fff;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 50%;
    float: right;
    margin-top: 0.8rem;
    font-size: 1rem;
    margin-right: 1rem;
  }
}
.formreg span {
  line-height: 2rem;
}
.formreg .btn {
  display: inline-block;
  width: 70%;
  height: 4rem;
  background-color: #3558b4;
  color: #fff;
  left: 15%;
  text-align: center;
  position: absolute;
  border-radius: 0.5rem;
  bottom: 2rem;
  line-height: 4rem;
  font-size: 1.8rem;
}
</style>
