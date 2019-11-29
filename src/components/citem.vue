<template>
  <div class="citem imooc-flex">
    <div class="icon" >
      <span class="isnew" v-if="course.isnew ==1 ">new</span>
      <img :src="course.cover"  :onerror="this.$static('/static/images/noimg.jpg')" />
    </div>
    <div class="info ">
      <div class="title hide-text-2">{{ course.title }}</div>
      <!-- <div class="intro hide-text-2">{{ course.intro }}</div> -->
      <div
        class="mt10 people cr-basic fz-small fix"
        v-if="course.type"
      >
        <span class="left">&#165; {{ course.price }} </span>
        <span class="left ml10">{{course.level}}</span>
        <span class="user-icon right">{{ course.enrollSuccess }}</span>
      </div>
      <div class="money fz-small cr-main">
        <span v-for="item in course.taglist" :key="item.name">{{ item.name }}</span>
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
          taglist: [],
          enrollSuccess: "",
          type: "",
          price: "",
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
// 列表公共样式（实战推荐、新上好课）
.citem {
  width: 100%;
  &:active {
    background-color: $active;
  }
  margin: 1.5rem 0 0 0;
  .icon {
    width: 7.5rem;
    height: 4.8rem;
    margin-right: 1rem;
    position: relative;
    img {
      height: 100%;
      border-radius: 1rem;
    }
    .isnew {
      position: absolute;
      right: 0;
      top: -0.5rem;
      width: 3rem;
      height: 1.5rem;
      line-height: 1.5rem;
      border-radius: 0.5rem;
      background-color: #f74217;
      color: #fff;
      border: 0.12rem solid #fff;
      font-size: 0.8rem;
      text-align: center;
    }
  }
  .info {
    height: 6.25rem;
    border-bottom: 1px solid #e0e0e0;
    position: relative;
    flex: 1;
    .title {
      word-break: break-all;
    }
  }

  .user-icon{
    position: relative;
    padding-left: 1.2rem;
    &::after{
      content: '';
      width: 0.83rem;
      height: 1rem;
      position: absolute;
      top: 0;
      left: 0;
      background: url("data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QONaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NmM2Y2IxMjYtZmQ1OS1kYzQxLWFiMGMtMzUzYjhjMDdkOTRiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4NkNGNThCMTEwMTExRUE5QUZCOEQ1QjRCMjMxNDdEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4NkNGNThBMTEwMTExRUE5QUZCOEQ1QjRCMjMxNDdEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFiZGNiNTUzLTViODAtMmY0Ny05YzE0LTNlMzMwMjg1NGVkNSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjBiZDU2MjBmLTZmZjYtODc0OC1hZmY5LTMxNDlmMmQ4MDgxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0LCQsNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABMAGAMBEQACEQEDEQH/xABmAAEBAQEAAAAAAAAAAAAAAAAJCAUHAQEAAAAAAAAAAAAAAAAAAAAAEAAABQMDAQUJAAAAAAAAAAABAgMEBQARBiESByJBEzMUFTFRYaGiNGQXCBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AaTmbIJTHMJknkUj3q6hDEOa27aUba0Be4fmk/E5Y0mWO1Z+quAmJtDqExrjYKBhIF4vIQ0Y9dF2OHTciixPZYxguIUEr8m/0vjUO5cY8hBkyVm5RAHG8QAggbsHWgl6C5SwSCnvW0OOGxxTPvbNxMFk9b6XoLi4k52geSlDxpGoRMqmAmSjgG/QHaGtAcuRW9XPfyl+7DxL7/lQY3T+F9VB3j+ZbftZtby/2ang393xoP//Z") center no-repeat;
      background-size:0.83rem 0.83rem ;
    }
  }
}
</style>
