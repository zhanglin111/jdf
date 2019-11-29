import Vue from 'vue'
import Router from 'vue-router'



// 主页以及其子路由
let Index = resolve => require(['@/views/index/index'], resolve)
let Home = resolve => require(['@/views/index/home'], resolve)


//课程相关
let MoreCourse = resolve => require(['@/views/course/morecourse'], resolve)
let CourseDetail = resolve => require(['@/views/course/detail'], resolve)


//项目
//项目下课程列表
let Procourse = resolve => require(['@/views/project/procourse'], resolve)


//考试相关 
let Exam = resolve => require(['@/views/exam/exam'], resolve)
let ExamDetail = resolve => require(['@/views/exam/detail'], resolve)
let Result = resolve => require(['@/views/exam/result'], resolve)
let Checkexam = resolve => require(['@/views/exam/checkexam'], resolve)
let Evaluation = resolve => require(['@/views/exam/evaluation'], resolve)
let Examanalisy = resolve => require(['@/views/exam/examanalisy'], resolve)
let Tipspage = resolve => require(['@/views/exam/tipspage'], resolve)


//我的学习
let LearnMain = resolve => require(['@/views/learn/main'], resolve)
let Learn = resolve => require(['@/views/learn/learn'], resolve)
let LearncourseDetail = resolve => require(['@/views/learn/course'], resolve)
let Homework = resolve => require(['@/views/learn/homework'], resolve)
let Play = resolve => require(['@/views/learn/play'], resolve)
let Coursepdf = resolve => require(['@/views/learn/coursepdf'], resolve)


//订单相关
let BuyCourse = resolve => require(['@/views/order/buycourse'], resolve)

// 搜索
let Search = resolve => require(['@/views/search/search'], resolve)

// 个人中心
let Main = resolve => require(['@/views/user/main'], resolve)
let UserCenter = resolve => require(['@/views/user/usercenter'], resolve)
let Login = resolve => require(['@/views/user/login'], resolve)
let FindPwd = resolve => require(['@/views/user/findpwd'], resolve)
let MyCertificate = resolve => require(['@/views/user/mycertificate'], resolve)
let MyCollect = resolve => require(['@/views/user/mycollect'], resolve)
let MyInfo = resolve => require(['@/views/user/myinfo'], resolve)
let MyLearnRecord = resolve => require(['@/views/user/mylearnrecord'], resolve)
let MyOrder = resolve => require(['@/views/user/myorder'], resolve)
let Updatepwd = resolve => require(['@/views/user/updatepwd'], resolve)
let Cershow = resolve => require(['@/views/user/certificateshow'], resolve)
Vue.use(Router)


let routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  component: Index,
  redirect: '/index/home',
  meta: {
    title: '京东方'
  },
  children: [{
    path: '/index/home',
    component: Home,
    meta: {
      title: '京东方'
    },
  }]
},
{
  path: '/search',
  name: 'search',
  component: Search,
  meta: {
    title: '搜索'
  },
},
{
  path: '/index/course',
  component: MoreCourse,
  name: "course",
  meta: {
    title: '更多课程'
  },
},
{
  path: '/play/:src',
  name: 'play',
  component: Play,
  meta: {
    title: 'Scrom播放'
  },
},
{
  path: '/pdf/:id',
  name: 'coursepdf',
  component: Coursepdf,
  meta: {
    title: 'PDF'
  },
},
{
  path: '/cdetail/:id/:type',
  name: 'cdetail',
  component: CourseDetail,
  meta: {
    title: '课程详情'
  },
},
{
  path: '/buycourse/:id',
  name: 'buycourse',
  component: BuyCourse,
  meta: {
    title: '课程详情'
  },
},
{
  path: '/learn/main',
  component: LearnMain,
  name: "learnmain",
  meta: {
    title: '我的学习'
  }
},
{
  path: '/csdetail/:id',
  name: 'csdetail',
  component: LearncourseDetail,
  meta: {
    title: '课程详情'
  },
},

{
  path: '/procourse/:id',
  name: 'procourse',
  component: Procourse,
  meta: {
    title: '项目详情'
  },
},
{
  path: '/learn/:id',
  name: 'learn',
  component: Learn,
  meta: {
    title: '开始学习'
  }
},
{
  path: '/homework/:id',
  name: 'homework',
  component: Homework,
  meta: {
    title: '作业'
  }
},
{
  path: '/user',
  component: Main,
  name: "center",
  redirect: '/user/mycenter',
  meta: {
    title: '个人中心'
  },
  children: [
    {
      path: '/user/mycenter',
      component: UserCenter,
      meta: {
        title: '个人中心'
      },
    },
    {
      path: '/user/myfav',
      component: MyCollect,
      meta: {
        title: '我的收藏'
      },
    }, {
      path: '/user/learnrecord',
      component: MyLearnRecord,
      meta: {
        title: '学习记录'
      },
    }
    , {
      path: '/user/order',
      component: MyOrder,
      meta: {
        title: '我的订单'
      },
    }
    , {
      path: '/user/certificate',
      component: MyCertificate,
      meta: {
        title: '我的证书'
      },
    }
    , {
      path: '/user/certificateshow',
      name: 'cershow',
      component: Cershow,
      meta: {
        title: '我的证书'
      },
    }, {
      path: '/user/info',
      component: MyInfo,
      meta: {
        title: '个人信息'
      },
    }
    , {
      path: '/user/updatepwd',
      component: Updatepwd,
      meta: {
        title: '修改密码'
      },
    }
  ]
},
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    title: '登录'
  },
}
  ,
{
  path: '/findpwd',
  name: 'findpwd',
  component: FindPwd,
  meta: {
    title: '找回密码'
  },
},
{
  path: '/ksdetail/:id',
  name: 'ksdetail',
  component: ExamDetail,
  meta: {
    title: '考试详情'
  },
},
{
  path: '/exam/:id',
  name: 'exam',
  component: Exam,
  meta: {
    title: '开始考试'
  },
},
{
  path: '/tips',
  name: 'tipspage',
  component: Tipspage,
  meta: {
    title: '测评详情'
  },
},
{
  path: '/cp/:id',
  name: 'evaluation',
  component: Evaluation,
  meta: {
    title: '测评详情'
  },
}
  ,
{
  path: '/checkexam/:id',
  name: 'checkexam',
  component: Checkexam,
  meta: {
    title: '检查试卷'
  },
},
{
  path: '/examanalisy/:id',
  name: 'examanalisy',
  component: Examanalisy,
  meta: {
    title: '试题解析'
  },
},
{
  path: '/result/:id',
  name: 'result',
  component: Result,
  meta: {
    title: '考试结果'
  },
}
]

export default new Router({
  routes,
  mode: 'history'
  // base: '/m'
})

