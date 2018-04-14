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
const Rate = ()=> import('@/components/about/rate/Rate');
const Apply = ()=> import('@/components/about/apply/Apply');
const News = ()=> import('@/components/news/News');
const NewsList = ()=> import('@/components/news/newsList/NewsList');
const NewsDetail = ()=> import('@/components/news/newsDetail/NewsDetail');
const Homes = ()=> import('@/components/home1/home');
const Quotation = () => import("@/components/market/Quotation")
Vue.use(Router)

export default new Router({
  mode:'hash',
  base:'tradex', 
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
        {path:'/assets/withdraw',name:'Withdraw',component:Withdraw}
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
      name: 'Market',
      component: Market
    },
    {
      path: '/quotation',
      name: 'Quotation',
      component: Quotation
    },
    {
      path:'/reset',
      name:'Reset',
      component:ResetPassword
    },
    {
      path:'/resetByEmail',
      name:'ResetByEmail',
      component:ResetByEmail
    },
    {
      path:'/resetByPhone',
      name:'ResetByPhone',
      component:ResetByPhone
    },
    {
      path:'/about',
      name:'About',
      component:About,
      children:[
        {path:'/about/aboutus',component: AboutUs,name:'AboutUs'},
        {path:'rate',component:Rate,name:'Rate'},
        {path:'apply',component:Apply,name:'Apply'}
      ]
    },
    {
      path:'/news',
      component:News,
      children:[
        {path:'/',component:NewsList,name:'News'},
        {path:'detail',component:NewsDetail,name:'NewsDetail'}
      ]
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
