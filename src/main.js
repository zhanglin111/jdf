// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
var infiniteScroll = require('vue-infinite-scroll');
// mock data
// import Mock from './mock/index'

// icon font
import './public/stylesheets/style.css'

// toast component
import toast from './public/javascripts/toast';
Vue.prototype.$toast = toast

import loading from './util/loading.js' // 引入loading
Vue.use(loading) // 全局使用loading

// store
import storage from './public/javascripts/storage';
Vue.prototype.$storage = storage
Vue.prototype.$staticurl = ""
Vue.prototype.$static = function (url) {
  return "javascript:this.src='" + url + "'";
}

// axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
// Vue.prototype.$http = axios

axios.defaults.baseURL = "http://120.92.36.69" // 设置默认请求的url
Vue.prototype.axios = axios
//axios请求拦截器，在发送请求前加入token到header
axios.interceptors.request.use(
  config => {
    if (storage.get("userInfo") != null) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = JSON.parse(storage.get("userInfo")).token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
//axios响应拦截器，在响应之后判断登录状态，如果没有登录，跳转到登录页面
axios.interceptors.response.use(
  response => {
    if (response.data.code === "6001") {
      if (response.data.message === '请登录后操作') {
        window.location.href = "/login"
      }
      //显示错误信息
      return Promise.reject(response)
    }
    return response;
  }, error => {
    //显示错误信息
    return Promise.reject(error)
  });


Vue.config.productionTip = false

// change title
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  title && (document.title = to.meta.title);
  next();
})
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})


