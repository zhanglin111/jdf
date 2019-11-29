<template>
  <div class="citem imooc-flex istop">
    <div class="icon" :style="{width: width, height: height}">
      <!-- <img :src="course.icon"> -->
    </div>
    <div class="info imooc-flex imooc-flex-column imooc-flex-around">
      <div class="title hide-text-2">{{ course.title }}</div>
      <span class="isnew" v-if="course.isnew ==1 ">new</span>
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
          type: "",
          isnew: ""
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
  }
};
</script>

<style lang="scss" scoped>
$active: #ebebeb;

.citem {
  &:active {
    background-color: $active;
  }
  .icon {
    margin-right: 1rem;
    img {
      height: 100%;
    }
  }
  .info {
    flex: 1;
    .title {
      word-break: break-all;
    }
  }
  // 置顶样式
  &.istop {
    position: relative;
    padding: 1rem;
    height: 6.5rem;
    font-size: 1.5rem;
    a {
      color: #fff;
    }
    .icon {
      border-radius: 0.5rem;
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
    .isnew {
      position: absolute;
      right: 0;
      top: -0.5rem;
      width: 3rem;
      height: 1.7rem;
      border-radius: 0.5rem;
      background-color: #f74217;
      color: #fff;
      border: 3px solid #fff;
      font-size: 0.7rem;
      text-align: center;
    }
  }
}
</style>
