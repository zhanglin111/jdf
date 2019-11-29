<template>
  <div>
    <div
      class="item imooc-flex imooc-container"
      :key="comment.id"
      v-for="(comment,index) in commentList"
    >
      <div class="avatar mr-10">
        <img :src="comment.avatar" class="avatar" />
      </div>
      <div class="info imooc-flex imooc-flex-column imooc-flex-between">
        <div class="name bold">{{ comment.name }}</div>
        <div class="type cr-basic">
          {{ timeformate(comment.time) }}
          <!-- <span
            :class="comment.isPraise==1?'cur':''"
            @click="praise(index,comment.id,comment.isPraise)"
          >{{ comment.praiseNum }}点赞</span>-->
        </div>
        <div class="type cr-basic">{{ comment.content }}</div>
      </div>
    </div>
    <span class="addcomment" v-if="ishow" @click="addcomment">发表评论</span>
    <jdf-addcomment
      v-on:fun="changeaddstatus"
      v-if="commentsatus"
      :id="course.id"
      :type="course.type"
    ></jdf-addcomment>
  </div>
</template>
<script>
import addcomment from "./addcomment";
import dateUtil from "../../util/time.js";
export default {
  data() {
    return {
      commentList: this.course.commentList,
      commentsatus: false //是否显示发表评论组件
    };
  },
  props: ["course", "ishow"],
  created() {
    // let id = this.course.id;
    // this.axios
    //   .post("/course/more-comment", {
    //     id: id
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.commentList = res.data.data.list.commentList;
    //   })
    //   .catch(error => {
    //     // 获取到拦截器中返回的错误信息
    //     this.$toast.show(error);
    //   });
  },
  methods: {
    //点赞:功能删除
    //index:当前点击评论索引（改变当前点赞状态不请求后台） id：评论ID，isPraise 是否已点赞：1 是已点赞，0是未点赞
    // praise(index, id, isPraise) {
    //   this.axios
    //     .post("/comment/praise", {
    //       id: id,
    //       isCancel: isPraise == 1 ? 1 : 0
    //     })
    //     .then(res => {
    //       //点赞成功后，不请求后台手动对点赞数量进行+-操作
    //       let praiseNum = parseInt(this.course.commentList[index].praiseNum);
    //       this.course.commentList[index].praiseNum =
    //         isPraise == 1 ? praiseNum - 1 : praiseNum + 1;
    //       this.course.commentList[index].isPraise = isPraise == 1 ? 0 : 1;
    //       console.log(res);
    //     })
    //     .catch(error => {
    //       // 获取到拦截器中返回的错误信息
    //       this.$toast.show(error);
    //     });
    // },
    //时间格式化，调用工具类转换为 xx小时前/xx分钟前/xx天前
    timeformate(timestr) {
      return dateUtil.timeDifferenceToContent(timestr);
    },
    addcomment() {
      this.commentsatus = true;
    },
    //子组件回调，发布成功后隐藏发布评论组件
    changeaddstatus(status) {
      this.commentsatus = status;
    }
  },
  components: {
    "jdf-addcomment": addcomment
  }
};
</script>
<style lang="scss" scoped>
.comment li {
  line-height: 2rem;
  border-bottom: 1px solid #d9dde1;
  margin: 1.5rem 1rem;
}
.comment li span {
  display: block;
}
.comment li span:first-child {
  color: #71777d;
}
.comment li span:last-child {
  color: #d9dde1;
}
.cur {
  color: red;
}
.addcomment {
  display: block;
  width: 8rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: #00a218;
  color: #fff;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>

