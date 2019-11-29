<template>
  <div class="detail"></div>
</template>

<script>
export default {
  data() {
    return {
      course: null,
      isReg: 0
    };
  },
  activated() {
    this.getproject();
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name == "prodetail") {
          this.getproject();
        }
      }
    }
  },
  methods: {
    getproject() {
      // 获取传递过来的项目ID，进行查询
      let id = this.$route.params.id;
      this.axios
        .post("/api/b1/mobile/project/index", { id: id })
        .then(res => {
          console.log(res);
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
@import "@/public/stylesheets/theme.scss";
.detail {
  padding: 4rem 0 6rem;
  .content {
    .title {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .rel-money {
      color: $main;
      font-size: 2rem;
    }
    .old-money {
      text-decoration: line-through;
    }
    .play-btn {
      font-size: 2.5rem;
    }
    .intro {
      margin-top: 1rem;
      padding: 0 1rem;
      background-color: #f4f5f7;
      border-radius: 1rem;
      font-size: 1.2rem;
      .intro-item {
        padding: 1rem 0;
        height: 4.5rem;
        line-height: 2;
        border-bottom: 0.1rem solid #d9dde1;
        &:last-child {
          border-bottom: none;
        }
      }
      .title {
        font-size: 1.2rem;
        margin-right: 1rem;
      }
    }
    .chapter {
      .title {
        font-size: 1.6rem;
      }
      .chapter-list {
        position: relative;
        height: 50rem;
        overflow: hidden;
        transition: all 0.5s linear;
        &.show-all {
          height: auto;
        }
      }
      .class-list {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
        li {
          padding: 1rem;
          border-bottom: 0.1rem solid #ebebeb;
        }
      }
      .more-mask {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20rem;
        background: linear-gradient(
          bottom,
          #fff 0,
          rgba(255, 255, 255, 0) 100%
        );
      }
      .check-all {
        color: $main;
        text-align: center;
        margin-top: 2rem;
      }
    }
    .teacher {
      .item {
        padding-bottom: 0;
      }
    }
    .rate {
      .rate-container {
        padding-top: 1.5rem;
        .item {
          flex: 1;
          text-align: center;
          &:first-child {
            font-size: 3rem;
            color: $main;
          }
        }
      }
      .comment-item {
        padding: 1.5rem;
        border-radius: 1rem;
        background-color: #f4f5f7;
        margin-top: 1rem;
        .info {
          line-height: 4rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
