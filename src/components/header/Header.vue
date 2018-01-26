<template>
  <div class="home-header">
    <div class="header-inner clear wrapper">
      <div class="header-logo" @click="route('home')">
        <img src="/static/img/logo.png"/>
        <span>蜂巢币</span>
      </div>
      <div class="home-menu">
        <Menu :mode="mode" @on-select="route" :active-name="activeName">
          <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
              <div v-scroll-to="value.scrollto">{{value.text}}</div>
          </MenuItem>
        </Menu>
      </div>
      <div class="mobile-menu">
        <i class="fa fa-bars fa-2x" @click="showMenu(true)"></i>
        <div class="mobile-menu-content" :style="{display:showMobileMenu?'block':'none'}">
          <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
              <div @click="showMenu()" v-scroll-to="value.scrollto">{{value.text}}</div>
          </MenuItem>
        </div>
      </div>
      <div class="header-right float-left">
        <div v-if="isLogined">

        </div>
        <!-- <div v-else class="login">
          <span class="login-in" @click="route('login')">登录</span>|
          <span class="register" @click="route('register')">注册</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router/index';
import { Menu,MenuItem,Row,Col } from 'iview';
router.afterEach(route => {
    // console.log('------------',this)
});
let menu = [
  {name:'home',text:'首页',scrollto:'.home-header'},
  {name:'trade',text:'团队介绍',scrollto:'#team'},
  {name:'assets',text:'路线图',scrollto:'#route-map'},
  // {name:'user',text:'个人中心'},
]
export default {
  name:'Header',
  components:{
    Menu,
    MenuItem,
    Row,
    Col
  },
  data(){
    return {
      activeName:'home',
      isLogined:false,
      menu,
      mode:'horizontal',
      isMobile:false,
      showMobileMenu:false
    }
  },
  created(){
    var w = window.innerWidth;
    if (w <= 640) {
      this.isMobile = true;
      // this.mode = 'vertical';
    }
  },
  mounted (){
    // this.initActive();
    var main = document.getElementById('main');
    if (main) {
      main.onclick = function () {
        var menu = document.getElementsByClassName('mobile-menu-content');
        if (menu.length) {
          menu[0].style.display= 'none';
        }
      }
    }
  },
  watch:{
    "$route":"getPath"  // 监听事件
  },
  methods:{
    showMenu(value){
      if (value) {
        console.log('showmenu');
        this.showMobileMenu = true;
        var menu = document.getElementsByClassName('mobile-menu-content');
        if (menu.length) {
          menu[0].style.display= 'block';
        }
      }else {
        console.log('hi');
        this.showMobileMenu = false;
      }
    },
    getPath(){
      let path = this.$route.path;    //或得当前路径
      console.log("----",path)
      console.log(path.match(path))
      if (path.match('/home')) {
        this.activeName = 'home';
      }else if (path.match('/trade')){
        this.activeName = 'trade';
      }else if (path.match('/assets')){
        this.activeName = 'assets';
      }else if (path.match('/user')){
        this.activeName = 'user';
      }
      console.log(this.activeName);
      // this.activeName = activeName;
    },
    route (name) {
      console.log(name);
      if (!name || name == 'home') {
        this.$router.push('/');
      }
    },
    // route(name){
      // this.initActive(name);
      // this.$router.push('/'+name);
    // },
    // initActive(name){
    //   let path = location.pathname;
    //   if (name) {
    //     path = '/' + name;
    //   }
    //   console.log(path);
    //   let activeName = 'home';
    //   if (path.match('/home')) {
    //     activeName = 'home';
    //   }else if (path.match('/trade')){
    //     activeName = 'trade';
    //   }else if (path.match('/assets')){
    //     activeName = 'assets';
    //   }else if (path.match('/user')){
    //     activeName = 'user';
    //   }
    //   console.log(activeName);
    //   this.activeName = activeName;
    // }
  }
}
</script>

<style scoped lang="scss">
  @import '../../my-theme/mixin.scss';
  .home-header {
    height: 70px;
    width: 100%;
    position: absolute;
    top:0;
    left: auto;
    right: auto;
    margin: auto;
    color: #fff;
    z-index: 1000;
    background: #323232;
    .ivu-menu-item {
      color: #fff;
    }
    .ivu-menu-light{
      background: transparent;
    }
    .home-menu {
      display: block;
    }
    .mobile-menu {
      display: none;
    }
    @media screen and (max-width: 640px) {
      & {
        .home-menu {
          display: none;
        }
        .mobile-menu {
          display: block;
        }
      }
    }
  }
  .header-inner {
    background: #323232;
    margin-right: auto;
    margin-left: auto;
    padding: 0 20px;
    padding-top: 10px;
    .ivu-menu-item,.ivu-menu-item:hover {
      border-bottom: none;
    }
    .ivu-menu-item-selected {
      border-bottom: none;
    }
    ul {
      float: left;
      &::after{
        background: none;
      }
      li {
        // font-size: 16px;
      }
    }
  }
  .header-logo {
    width: 300px;
    height: 60px;
    float: left;
    img {
      width: 40px;
      height: 60px;
      vertical-align: middle;
      padding: 10px 0;
      cursor: pointer;
    }
    span {
      font-size: 20px;
      cursor: pointer;
    }
    @media screen and (max-width:640px){
      & {
        width: 120px;
      }
    }
  }
  .header-right {
    margin-left: 50px;
    position: relative;
    z-index: 1300;
  }
  .login {
    margin: 15px 0;
    width: 120px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: $primary-color;
    text-align: center;
    color: #fff;
    span {
      margin: 0 4px;
      cursor: pointer;
    }
  }
  .mobile-menu {
    float: right;
    position: relative;
    .mobile-menu-content {
      background: #333;
      padding: 20px;
      position: absolute;
      top: 0px;
      right: 0;
      width: 120px;
      border-radius: 4px;
      display: none;
      li {
        line-height: 30px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
</style>
