<template>
  <div class="citem imooc-flex">
    <div
      class="icon"
    ><img :src="course.cover"
    /></div>
    <!-- :onerror="this.$static('/static/images/noimg.jpg')"  -->
    <div class="info imooc-flex imooc-flex-column imooc-flex-around">
      <div class="title hide-text-2">{{ course.title }}</div>
      <div
        class="people cr-basic fz-small"
        style="display: flex;
    justify-content: space-between;"
      >
        <span class="price">&#165;{{course.price}}</span>
        <div style="display: flex;">
          <span class="regSum">{{ course.regSum }}</span>
          <span class="type">{{ GetZHName(course.type) }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default() {
        return {
          title: "",
          cover: "",
          level: "",
          cost: "",
          regSum: "",
          type: "",
          price: ""
        };
      }
    },
    width: {
      default() {
        return "auto";
      }
    },
    height: {
      default() {
        return "auto";
      }
    }
  },
  methods: {
    GetZHName(str) {
      //根据英文类型返回对应的中文名称
      if (str == "online-course") {
        return "在线班级";
      } else if (str == "face-course") {
        return "面授班级";
      } else if (str == "project") {
        return "学习项目";
      } else {
        return str;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$active: #ebebeb;
// 列表公共样式（实战推荐、新上好课）
.regSum{
  margin-right: 4rem;
  margin-top: 0.1rem;
}
.citem {
  width: 100%;

  &:active {
    background-color: $active;
  }
  margin: 2rem 0 0 0;
  .icon {
    width: 7.5rem;
    height: 4.8rem;
    margin-right: 1rem;
    img {
      height: 100%;
      border-radius: 0.5rem;
      min-width: 3rem;
      min-height: 5rem;
    }
  }
  .info {
    height: 6rem;
    border-bottom: 1px solid #e0e0e0;
    flex: 1;
    .title {
      word-break: break-all;
    }
  }
  // 置顶样式
  &.istop {
    position: relative;
    padding: 1rem;
    color: #fff;
    line-height: 1.7;
    a {
      color: #fff;
    }
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .people {
      color: #fff;
    }
    .money {
      color: #fff;
    }
  }
  .fz-small {
    span {
      display: block;
      float: left;
    }
    .price {
      width: 5rem;
    }
  }
}
</style>
