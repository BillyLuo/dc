import Vue from 'vue'
import Router from 'vue-router'
// const Home = ()=> import('@/components/home/Home')
const Login = ()=> import('@/components/Login')
const Register = ()=> import ('@/components/Register');
const ResetPassword = ()=> import('@/components/reset/ResetPassword');
const ResetByEmail = ()=> import('@/components/reset/ResetByEmail');
const ResetByPhone = ()=> import('@/components/reset/ResetByPhone');
const Assets = ()=> import('@/components/assets/Assets')
const AssetsList = ()=> import('@/components/assets/AssetsList');
const AssetsDetail = ()=> import('@/components/assets/AssetsDetail');
const CoinAddress = ()=> import('@/components/assets/CoinAddress');
const Recharge = ()=> import('@/components/assets/Recharge')
const Withdraw = ()=> import('@/components/assets/Withdraw')
const subscribe = () => import('@/components/assets/subscribe');
const Trade = ()=> import('@/components/Trade')
const User = ()=> import('@/components/user/user')
const safeSettings = ()=> import('@/components/user/safesettings');
const RealCertification = ()=> import('@/components/user/realCertification');
const sliderTest = ()=> import('@/components/sliderTest.vue');
const NotFound = () => import('@/components/notfound/notFound');
const Market = () => import("@/components/market/Market");
const Broker = () => import("@/components/user/broker");
const loginrecord = () => import("@/components/user/loginrecord");
const Api = () => import("@/components/user/api");
const About = () => import('@/components/about/about');
const AboutUs = () => import('@/components/about/aboutus/AboutUs');
const Rate = ()=> import('@/components/about/rate/Rate.vue');
const Apply = ()=> import('@/components/about/apply/Apply');
const News = ()=> import('@/components/news/News');
const NewsList = ()=> import('@/components/news/newsList/NewsList');
const NewsDetail = ()=> import('@/components/news/newsDetail/NewsDetail');
const Homes = ()=> import('@/components/home/home');
const Quotation = () => import("@/components/market/Quotation")
const Cashrecharge = () => import("@/components/assets/Cashrecharge");
const Aboutbibang = () => import("@/components/about/aboutbibang")
const Notice = () => import("@/components/about/notice/Notice")
const Law = ()=> import('@/components/about/law/law.vue');
const Protocol = ()=> import('@/components/about/protocol/protocol.vue');
const Secrecy = ()=> import('@/components/about/secrecy/secrecy.vue');
const kline = ()=> import('@/components/market/kline');

const stocklist = () => import('@/components/stock/stocklist');
const stockdetail = () => import('@/components/stock/stockdetail');
//DC
const dcindex = () => import('@/components/dc/index');
const dcdetail = () => import('@/components/dc/detail');
//数字货币中心
const digit = () => import('@/components/digit/index')
const digitdetail = () => import('@/components/digit/detail')
//subscription
const subscription = () => import('@/components/subscription/index')

//account
const account = () => import('@/components/account/index');
const accountstockdetail = () => import('@/components/account/stockaddress')
const cointransfer = () => import('@/components/account/cointransfer');
const stocktransfer = () => import('@/components/account/stocktransfer');
Vue.use(Router)

export default new Router({
  mode:'hash',
  // base:'tradex', 
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Homes
    },
    // {
    //   path: '/homes',
    //   name: 'Index',
    //   component: Homes
    // },
    {
      path:'/home',
      name:'Home',
      component:Homes
    },
    {
      path:'/kline',
      name:'kline',
      component:kline
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/assets',
      // name:'Assets',
      component:Assets,
      children:[
        {path:'',name:'Assets',component:AssetsList},
        {path:'/assets/assetslist',component:AssetsList},
        {path:'/assets/assetsdetail',component:AssetsDetail},
        {path:'/assets/coinaddress',component:CoinAddress},
        {path:'/assets/recharge',name:'Recharge',component:Recharge},
        {path:'/assets/withdraw',name:'Withdraw',component:Withdraw},
        {path:'/assets/cashrecharge',name:'Cashrecharge',component:Cashrecharge},
        {path: 'subscribe', name: 'subscribe', component: subscribe}
      ]
    },
    {
      path:'/trading',
      // name:'Trade',
      component: Trade
    },
    {
      path:'/user',
      component: User,
      children:[
        {path:'',name:'User',component:safeSettings},
        {path:'/user/safesettings',name:'safeSettings',component:safeSettings},
        {path:'/user/broker',name:'broker',component:Broker},
        {path:'/user/api',name:'api',component:Api},
        {path:'/user/loginrecord',name:'loginrecord',component:loginrecord},
        {path:'/user/authentication',name:'authentication',component:RealCertification}
      ]
    },
    {
      path:'/sliderTest',
      name:'sliderTest',
      component: sliderTest
    },
    {
      path:'*',
      component:NotFound
    },
    {
      path: '/market',
      name: 'Quotation',
      component: Quotation
    },
    {
      path:'/reset',
      component:ResetPassword,
      children:[
        {
          path:'',
          name:'Reset',
          component:ResetByPhone
        },
        {
          path:'/reset/resetByEmail',
          name:'ResetByEmail',
          component:ResetByEmail
        },
        {
          path:'/reset/resetByPhone',
          name:'ResetByPhone',
          component:ResetByPhone
        },
      ]
    },
    {
      path:'/about',
      name:'About',
      component:About,
      children:[
        {path:'/about/aboutus',component: Aboutbibang,name:'AboutUs'},
        {path:'notice',component:Notice,name:'Notice'},
        {path:'apply',component:Apply,name:'Apply'},
        {path:'rate',component:Rate,name:'Rate'},
        {path:'law',component:Law,name:'Law'},
        {path:'secrecy',component:Secrecy,name:'Secrecy'},
        {path:'protocol',component:Protocol,name:'Protocol'}
      ]
    },
    {
      path:'/news',
      component:News,
      children:[
        {path:'/',component:NewsList,name:'News'},
        {path:'detail',component:NewsDetail,name:'NewsDetail'}
      ]
    },
    {
      path: '/stock',
      component: stocklist,
      name: 'stocklist'
    },
    {
      path: '/stock/detail',
      component: stockdetail,
      name: 'stockdetail'
    },
    //dc
    {
      path: '/dc',
      component: dcindex,
      name: 'dc'
    },
    {
      path: '/dc/dcdetail',
      component: dcdetail,
      name: 'dcdetail'
    },
    //数字货币中心
    {
      path: '/digit',
      component: digit,
      name: 'digit'
    },
    {
      path: '/digit/detail',
      component: digitdetail,
      name: 'digitdetail'
    },
    //subscription
    {
      path: '/subscription',
      component: subscription,
      name: 'subscription'
    },
    // account
    {
      path: '/account',
      component: account,
      name: 'account'
    },
    {
      path: '/account/stockdetail',
      component: accountstockdetail,
      name: 'accountstockdetail'
    },
    {
      path: '/account/cointransfer',
      component: cointransfer,
      name: 'cointransfer'
    },
    {
      path: '/account/stocktransfer',
      component: stocktransfer,
      name: 'stocktransfer'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      savedPosition;
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
