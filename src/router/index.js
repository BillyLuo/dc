import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import('@/components/Home')
const Login = ()=> import('@/components/Login')
const Assets = ()=> import('@/components/assets/Assets')
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
      path:'/assets',
      name:'Assets',
      component:Assets
    }
  ]
})
