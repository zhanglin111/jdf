<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>我的订单
      </div>
      <div class="citem imooc-flex" v-for="(item,index) in orderlist" :key="index">
        <div class="icon">
          <img :src="item.itemList[0].cover" />
        </div>
        <div class="info ">
          <div class="title hide-text-2">{{item.itemList[0].name}}</div>
          <div class="intro hide-text-2"></div>
          <div class="people cr-basic fz-small">
            <span>￥{{item.orderPrice}}</span>
            <span>{{item.date}}</span>
            <span>{{item.status}}</span>
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
      orderlist: []
    };
  },
  components: {
    "jdf-return": back
  },
  created() {
    this.axios
      .post("/api/b1/mobile/user/my-order")
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.orderlist = res.data.data.list.orderList;
        } else {
          this.$toast.show(res.data.message);
        }
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
      });
  }
};
</script>

<style lang="scss" scoped>
.user {
  border-bottom: 1px solid #ccc;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
}
// .imooc-container {
//   position: fixed;
//   background: #fff;
//   width: 100%;
//   top: 0;
// }
.citem:last-child {
  margin-bottom: 5rem;
}
.citem {
  padding-left: 1.1rem;
  padding-right: 1.1rem;
  margin-top: 2rem;
  .title {
    padding-left: 0.5rem;
  }
  span {
    margin-right: 0.1rem;
    color: #53565d;
  }
  span:nth-child(1),span:nth-child(2){
    margin-right: 0.6rem;

  }
  span:last-child {
    color: red;
  }
  .icon {
    width: 7.5rem;
    height: 4.8rem;
    margin-right: 1rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  }
  .info {
    min-height: 5.6rem;
    border-bottom: 1px solid #e0e0e0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-bottom: 1rem;
    .title {
      word-break: break-all;
    }
  }
  .people{
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
  }
}
</style>

