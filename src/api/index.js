import ajax from './ajax'

const BASE_URL = 'http://120.92.36.69/api/b1/mobile';
const UAT_HOST = 'http://120.92.36.69/api/b1/mobile';
const PRO_HOST = 'http://120.92.36.69/api/b1/mobile';

/*
  获取首页数据（轮播图、通知、热门推荐、资源列表）
* /
// export const reqIndexData = () => ajax(BASE_URL + '/index/index')


/*
  热门推荐（换一批） 
 */
// export const reqIndexOtherData = ({ token }) => ajax(BASE_URL + '/index/other', { token }, "POST")
export const reqIndexOtherData = {
    topListCourse: [
        {
            id: 1,
            title: "测试课程标题5",
            type: "在线班级",
            isnew: "0"
        },
        {
            id: 2,
            title: "测试课程标题6",
            type: "在线班级",
            isnew: "1"
        },
        {
            id: 3,
            title: "测试课程标题7",
            type: "在线班级",
            isnew: "0"
        },
        {
            id: 4,
            title: "测试课程标题8",
            type: "在线班级",
            isnew: "1"
        }
    ]
}

export const reqIndexData = {
    notice: {
        id: 1,
        title: "公告：新人注册专享35元大礼包，你来我就送！"
    },
    carousel: [
        {
            img:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            clickurl: "22"
        },
        {
            img: "2.jpg",
            clickurl: "www.baidu.com"
        },
        {
            img: "3.jpg",
            clickurl: "www.baidu.com"
        }
    ],
    topListCourse: [
        {
            id: 1,
            title: "测试课程标题1",
            type: "在线班级",
            isnew: "1"
        },
        {
            id: 2,
            title: "测试课程标题2",
            type: "在线班级",
            isnew: "0"
        },
        {
            id: 3,
            title: "测试课程标题3",
            type: "在线班级",
            isnew: "1"
        },
        {
            id: 4,
            title: "测试课程标题4",
            type: "在线班级",
            isnew: "1"
        }
    ],
    listCourse: [
        {
            id: 1,
            title: "测试资源课程标题1",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            cost: "20",
            regSum: "30人",
            type: "在线班级",
            price: 100
        },
        {
            id: 2,
            title: "测试资源课程标题2",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            cost: "20",
            regSum: "30人",
            type: "在线班级",
            price: 100
        },
        {
            id: 3,
            title: "测试资源课程标题3",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            cost: "20",
            regSum: "30人",
            type: "在线班级",
            price: 100
        }
    ]
};
/*
  首页下拉更多 
 */
// export const reqIndexMoreData = () => ajax(BASE_URL + '/index/more')
export const reqIndexMoreData = {
    listCourse: [
        {
            id: 4,
            title: "测试资源课程标题4",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            cost: "20",
            regSum: "30人",
            type: "在线班级",
            price: 100
        },
        {
            id: 5,
            title: "测试资源课程标题5",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            cost: "20",
            regSum: "30人",
            type: "在线班级",
            price: 100
        },
        {
            id: 6,
            title: "测试资源课程标题6",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            cost: "20",
            regSum: "30人",
            type: "在线班级",
            price: 100
        }
    ]
};

//最新列表
// export const reqLatestlistData = () => ajax(BASE_URL + '/index/latest-list')
export const reqLatestlistData = {
    listCourse: [
        {
            id: 1,
            title: "最新测试资源课程标题1",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签1" }, { name: "标签2" }],
            enrollSuccess: "50人",
            type: "在线班级",
            price: 100,
            isnew: 0
        },
        {
            id: 2,
            title: "最新测试资源课程标题2",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签3" }, { name: "标签4" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 500,
            isnew: 0
        },
        {
            id: 3,
            title: "最新测试资源课程标题3",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签5" }, { name: "标签6" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 100,
            isnew: 1
        }
    ]
};

//最热列表
// export const reqHotlistData = ({type,keyword}) => ajax(BASE_URL + '/index/hot-list',{type,keyword},"POST")
export const reqHotlistData = {
    listCourse: [
        {
            id: 1,
            title: "最热测试资源课程标题1",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签1" }, { name: "标签2" }],
            enrollSuccess: "50人",
            type: "在线班级",
            price: 100,
            isnew: 0
        },
        {
            id: 2,
            title: "最热测试资源课程标题2",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签3" }, { name: "标签4" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 500,
            isnew: 1
        },
        {
            id: 3,
            title: "最热测试资源课程标题3",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签5" }, { name: "标签6" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 100,
            isnew: 0
        }
    ]
};


//搜索首页
// export const reqHotlistData = ({token}) => ajax(BASE_URL + 'search/index',{token},"POST")
export const reqSearchData = {
    historyList: [{ keyword: "java" }, { keyword: "python" }, { keyword: "c#" }],
    hotList: [{ keyword: "区块链" }, { keyword: "人工智能" }, { keyword: "机器学习" }]
}

//新课程分类
// export const reqCateListData = ({ token }) => ajax(BASE_URL + 'search/index', { token }, "POST")
export const reqCateListData = {
    dataList: [{ cateId: 1, cateName: "区块链1", courseNum: 20, image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg", taglist: [{ keyword: "标签1" }, { keyword: "标签2" }] },
    { cateId: 2, cateName: "区块链2", courseNum: 40, image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg", taglist: [{ keyword: "标签3" }, { keyword: "标签4" }] },
    { cateId: 3, cateName: "区块链3", courseNum: 50, image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg", taglist: [{ keyword: "标签5" }, { keyword: "标签6" }] }]
}

//分类下班级列表
// export const reqCourseListData = ({ token }) => ajax(BASE_URL + 'search/index', { token }, "POST")
export const reqCourseListData = {
    listCourse: [
        {
            id: 1,
            title: "测试班级1",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签1" }, { name: "标签2" }],
            enrollSuccess: "50人",
            type: "在线班级",
            price: 100,
            isnew: 0
        },
        {
            id: 2,
            title: "测试班级2",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签3" }, { name: "标签4" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 500,
            isnew: 0
        },
        {
            id: 3,
            title: "测试班级3",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签5" }, { name: "标签6" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 100,
            isnew: 1
        }
    ]
}

//搜索结果列表
// export const reqSearchListData = ({ token }) => ajax(BASE_URL + 'search/list', { token }, "POST")
export const reqSearchListData = {
    listCourse: [
        {
            id: 1,
            title: "搜索结果测试课程1",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签1" }, { name: "标签2" }],
            enrollSuccess: "50人",
            type: "在线班级",
            price: 100,
            isnew: 0
        },
        {
            id: 2,
            title: "搜索结果测试课程2",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签3" }, { name: "标签4" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 500,
            isnew: 0
        },
        {
            id: 3,
            title: "搜索结果测试课程3",
            cover:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571847370319&di=5430938722f103f332cb7b1aaed80b93&imgtype=0&src=http%3A%2F%2Fpic46.nipic.com%2F20140816%2F18875271_104608886000_2.jpg",
            level: "中级",
            taglist: [{ name: "标签5" }, { name: "标签6" }],
            enrollSuccess: "30人",
            type: "在线班级",
            price: 100,
            isnew: 1
        }
    ]
}

//注册接口user/reg
export const reqUserReg = ({ account, mobile, password, confirmPassword, verifyCode }) => ajax(BASE_URL + 'user/reg', { account, mobile, password, confirmPassword, verifyCode }, "POST")

//登录接口
// export const reqSearchListData = ({ token }) => ajax(BASE_URL + 'search/list', { token }, "POST")


//获取验证码
export const reqCodeimg = () => ajax(BASE_URL + '/code/show-img')
