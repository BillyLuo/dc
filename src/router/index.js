import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import('@/components/home/Home')
const Login = ()=> import('@/components/Login')
const Register = ()=> import ('@/components/Register');
const Assets = ()=> import('@/components/assets/Assets')
const AssetsList = ()=> import('@/components/assets/AssetsList');
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

Vue.use(Router)

export default new Router({
  mode:'history',
  base:'tradex',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/home',
      component:Home
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
      name:'Assets',
      component:Assets,
      children:[
        {path:'',component:AssetsList},
        {path:'/assets/assetslist',component:AssetsList},
        {path:'/assets/recharge',component:Recharge},
        {path:'/assets/withdraw',component:Withdraw}
      ]
    },
    {
      path:'/trade',
      name:'Trade',
      component: Trade
    },
    {
      path:'/user',
      // name:'User',
      component: User,
      children:[
        {path:'',component:safeSettings},
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
