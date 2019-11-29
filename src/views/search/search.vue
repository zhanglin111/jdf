<template>
  <transition name="slidedown">
    <div class="search imooc-container">
      <!-- 表单 -->
      <div class="form-wrapper imooc-flex">
        <span class="icon-search" @click.prevent="search"></span>
        <div class="input">
          <input type="text" v-model="word" placeholder="请输入搜索关键词" @click="search" />
        </div>
        <div class="cancel-btn imooc-flex imooc-flex-center">
          <span @click="$router.go(-1)">取消</span>
        </div>
      </div>

      <!-- 历史搜索 -->
      <dl class="history-list mb-10" v-if="historylist.length">
        <dd>历史搜索</dd>
        <dt
          v-for="his in historylist"
          :key="his.id"
          @click="choiceWord(his.keyword)"
        >{{ his.keyword }}</dt>
        <dd v-if="historylist.length == 0" class="no-result cr-basic">暂无</dd>
      </dl>

      <!-- 热门搜索 -->
      <dl class="hot-list" v-if="hotlist.length">
        <dd>热门搜索</dd>
        <dt v-for="hot in hotlist" :key="hot.id" @click="choiceWord(hot.keyword)">{{ hot.keyword }}</dt>
      </dl>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      word: "",
      hotlist: [],
      historylist: []
    };
  },
  created() {
    this.axios
      .post("/api/b1/mobile/search/index")
      .then(res => {
        if (res.data.code == "0") {
          console.log(res);
          this.hotlist = res.data.data.list.hotList;
          this.historylist = res.data.data.list.historyList;
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
    search() {
      if (this.word == "") return false;
      this.$router.push({
        name: "course",
        params: { word: this.word, issearch: true }
      });
    },
    choiceWord(word) {
      this.word = word;
      this.search();
    }
    // ,
    // setHistory(word) {
    //   if (!this.$storage.get("history")) {
    //     this.$storage.set("history", "[]");
    //   }
    //   let history = JSON.parse(this.$storage.get("history"));
    //   if (history.length >= 10) {
    //     history.splice(0, 1);
    //   }
    //   history.indexOf(word) == -1 && history.push(word);
    //   this.$storage.set("history", JSON.stringify(history));
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "@/public/stylesheets/theme.scss";
.icon-search {
  background-image: url(/static/images/search.png);
  display: block;
  background-size: cover;
  width: 2rem;
  height: 2rem;
  margin-top: 1rem;
}
.search {
  position: relative;
  background-color: #fff;
  z-index: 3;
  height: 100vh;
  .form-wrapper {
    height: 4rem;
    margin-bottom: 2rem;
    .input {
      position: relative;
      flex: 1;
      margin-right: 1rem;
      input {
        width: 100%;
        height: 100%;
        padding: 1rem;
      }

      .search-btn {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 2rem;
        line-height: 4.5rem;
        width: 2rem;
        font-size: 2rem;
      }
    }
  }
  .hot-list,
  .history-list {
    dt {
      display: inline-block;
      background-color: #f1f1f1;
      padding: 0.5rem 1rem;
      margin: 1rem 0.5rem 0 0;
      vertical-align: top;
    }
  }
  .no-result {
    margin: 1rem 0;
  }
  .result-list {
    dt {
      margin-top: 1rem;
      color: $main;
      animation: bounce-in 0.3s;
    }
  }
}
</style>
