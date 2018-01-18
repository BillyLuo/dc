import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import('@/components/Home')
const Login = ()=> import('@/components/Login')

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
      path:'/login',
      name:'Login',
      component: Login
    }
  ]
})
