<template>
  <div>
    <div class="user imooc-container">
      <jdf-return white="true"></jdf-return>购买课程
    </div>
    <div class="course">
      <h3>商品信息</h3>
      <div class="citem imooc-flex">
        <div class="icon">
          <img :src="course.cover[0].url" />
        </div>
        <div class="info imooc-flex imooc-flex-column imooc-flex-around">
          <div class="title hide-text-2">{{course.title}}</div>
          <div class="intro hide-text-2">￥{{course.price}}</div>
          <!-- <div class="people cr-basic fz-small">
            <span>取消收藏</span>
          </div>-->
        </div>
      </div>
    </div>
    <div class="hasline"></div>
    <div class="pay">
      <h3>支付方式</h3>
      <p>
        <img style="width:12.5rem;height:5rem;" src="/static/images/wxpay.png" />
      </p>
    </div>
    <div class="hasline"></div>
    <div class="balance">
      <h3>商品金额</h3>
      <div class="spje">
        <span class="sptitle">{{course.title}}</span>
        <span class="spmoney">￥{{course.price}}</span>
      </div>
    </div>
    <div class="hasline"></div>
    <div class="agree">
      <input type="checkbox" checked />我已阅读并同意《用户付费协议》
    </div>
    <div class="buyfooter">
      <span>
        实付：
        <b style="color:#dc0009">￥{{course.price}}</b>
      </span>
      <span @click="BuySubmit()">提交订单</span>
    </div>
  </div>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      course: {},
      orderId: "",
      jspai: {}
    };
  },
  methods: {
    BuySubmit() {
      this.orderId = this.$route.params.id;
      var openId = JSON.parse(this.$storage.get("userInfo")).openId;
      if (openId != undefined && openId != "") {
        this.axios
          .post(
            "/api/b1/wechat/payment/jsapi",
            JSON.stringify({
              id: this.orderId
            })
          )
          .then(res => {
            console.log("BuySubmit", res);
            if (res.data.code == "0") {
              this.jspai = res.data.data.jspai;
              this.begain_wxpay();
            } else {
              this.$toast.show(res.data.message);
            }
          })
          .catch(error => {
            // 获取到拦截器中返回的错误信息
            this.$toast.show(error);
          });
      } else {
        this.$toast.show("微信授权失败，请重新登录");
      }
      console.log(this.orderId);
    },
    begain_wxpay: function() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        this.wxPay();
      }
    },
    wxPay: function() {
      var _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: _this.appId, //公众号名称，由商户传入
          timeStamp: _this.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: _this.nonceStr, //随机串
          package: _this.package,
          signType: _this.signType, //微信签名方式：
          paySign: _this.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            this.$toast.show("支付成功");
            this.$router.push({ name: "order" });
          } else {
            this.$toast.show("支付失败");
          }
        }
      );
    }
  },
  components: {
    "jdf-return": back
  },
  created() {
    // 获取传递过来的课程ID，进行查询
    let id = this.$route.params.id;
    this.axios.post("/api/b1/mobile/order/goods-info", { id }).then(res => {
      console.log(res);
      if (res.data.code == "0") {
        this.course = res.data.data.list;
      } else {
        this.$toast.show(res.data.message);
      }
    });
  }
};
</script>


<style lang="scss" scoped>
.hasline {
  border-bottom: 0.5rem solid #eff2f7;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.spje {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
.sptitle {
  font-size: 1.8rem;
  line-height: 2rem;
}
.spmoney {
  color: #dc0009;
  font-size: 1.8rem;
  line-height: 2rem;
}
.user {
  border-bottom: 1px solid #eff3f6;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
}
.citem {
  height: 7rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
  .title {
    padding-left: 0.5rem;
  }
  span {
    color: #d00000;
    margin: 0 0.5rem;
    padding: 0.2rem 0.4rem;
  }
  .icon {
    margin-left: 1rem;
    margin-right: 1rem;
    img {
      height: 100%;
      width: 8rem;
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
.course,
.pay,
.agree,
.balance {
  margin: 1rem;
  min-height: 6rem;
  h3 {
    color: #71777d;
    font-weight: normal;
  }
}
.agree {
  input {
    appearance: checkbox;
  }
}
.buyfooter {
  position: fixed;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  border-top: 0.1rem solid #eff2f7;
  // background-color: #eee9e9;
  text-align: center;
  font-size: 2.2rem;
  bottom: 0;
  span {
    display: block;
    float: left;
  }
  span:first-child {
    width: 60%;
  }
  span:last-child {
    height: 100%;
    width: 40%;
    background-color: #c00606;
    color: #fff;
  }
}
</style>

