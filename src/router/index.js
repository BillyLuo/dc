import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import('@/components/Home')
const Login = ()=> import('@/components/Login')
const Register = ()=> import ('@/components/Register');
const Assets = ()=> import('@/components/assets/Assets')
const Trade = ()=> import('@/components/Trade')
const User = ()=> import('@/components/user/user')
const safeSettings = ()=> import('@/components/user/safesettings');
Vue.use(Router)

export default new Router({
  mode:'history',
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
      component:Assets
    },
    {
      path:'/trade',
      name:'Trade',
      component: Trade
    },
    {
      path:'/user',
      name:'User',
      component: User,
      children:[
        {path:'/user/safesettings',name:'safeSettings',component:safeSettings}
      ]
    }
  ]
})
