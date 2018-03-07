<template>
  <div :class="{'home-header':true,active:scroll}">
    <div class="header-inner clear wrapper">
      <div class="header-logo" @click="route('home')">
        <img src="/static/img/logo.png"/>
        <span>交易网</span>
      </div>
      <Menu ref="main_menu" mode="horizontal" @on-select="route" :active-name="activeName">
        <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
            {{value.text}}
        </MenuItem>
      </Menu>
      <div class="header-right float-left header-user">
        <div v-if="isLogined" class="logined">
          <div class="user-name float-left">{{userInfo.username}}</div>
          <div class="user-level float-left">
            <span class="user-vip">VIP{{userInfo.userLevel}}</span>
          </div>
          <div class="login-out">
            <div>
              <div class="login-out-title">个人中心</div>
              <div class="divide"></div>
              <div class="all-asset">账户总资产：<span>0 CNYT</span></div>
              <div class="divide"></div>
              <div class="uid">UID: <span>234325</span></div>
              <div class="divide"></div>
              <button class="login-out-btn" @click="loginOut">登出</button>
            </div>
          </div>
        </div>
        <div v-else class="login">
          <span class="login-in" @click="route('login')">登录</span>|
          <span class="register" @click="route('register')">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../bus/bus.js';
import cookies from 'cookies-js';
function scroll (e) {
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  var scroll = false;
  if (scrollTop > 100) {
    scroll = true;
  }
  this.scroll = scroll;
}
import router from '../router/index';
import { Menu,MenuItem,Row,Col } from 'iview';
router.afterEach(route => {
    // console.log('------------',this)
});
let menu = [
  {name:'home',text:'首页'},
  {name:'trading',text:'交易中心'},
  {name:'assets',text:'数字资产'},
  {name:'user',text:'个人中心'},
  {name:'market',text:'行情中心'},
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
      scroll:false,
      activeName:'home',
      isLogined:false,
      menu,
      userInfo:{
        username:15178874695,
        userLevel:1
      }
    }
  },
  mounted (){
    // this.initActive();
    // console.log('----header----',this);
    console.log(cookies.get("name"))
      this.getPath();
      var that = this;
      window.onscroll = scroll.bind(this);
      bus.$on('login',(value) => {
        if (value) {
          console.log(value)
          that.isLogined = true;
        }
      })

    if(cookies.get("name")){
      that.isLogined = true;
    }else{
      that.isLogined = false;
      this.$router.push("login")
    }
    
    // this.init();
  },
  watch:{
    "$route":"getPath"  // 监听事件
  },
  methods:{
    init() {
      if (!this.isLogined) {
        this.$router.push({
          name:'Home'
        })
      }
    },
    getPath(){
      let path = this.$route.path;
      this.activeName = 'home';
      let that =this;
      menu.map(function(item){
          if(item.name==path.split("/")[1]){
            console.log(path.split("/")[1])
            that.activeName = path.split("/")[1];
          }
      })

      if(!cookies.get("name") && (path == "/trade" || path == "/assets" || path == "/user" || path == "/market")){
        this.$router.push({
            path:'/login'
          });
          cookies.set("name", "",{expires: 0})
          this.isLogined = false;
          return false
      }else if(!cookies.get("name") && path == "/home"){
          this.$router.push({
            path:'/home'
          });
          cookies.set("name", "",{expires: 0})
          this.isLogined = false;
          return false
      }
    },
    route(name){
      cookies.set('name','will');
      if(!cookies.get("name")  && (name == "trade" || name == "assets" || name == "user" || name == "market")){
          this.$router.push({
            path:'/login'
          });
          cookies.set("name", "",{expires: 0})
          this.isLogined = false;
          return false
      }else if(!cookies.get("name") && name == "home"){
          this.$router.push({
            path:'/home'
          });
          cookies.set("name", "",{expires: 0})
          this.isLogined = false;
          return false
      }else {
        this.$router.push({
          path:'/'+name
        });
      }


      var isLogined = this.isLogined;
      console.log(isLogined)
      if (!this.isLogined && name != 'register' && name && name!='home') {
        this.$refs.main_menu.currentActiveName = 'home';
        if (name != 'home' && name != 'login' && name != 'register') {
          this.$Modal.info({
            content:'请您先登录'
          });
        } 
        this.$router.push({
          name:'Login'
        })
        cookies.set("name", "",{expires: 0})    
      }else {
        this.$router.push({
          path:'/'+name
        });
      }
    },
    loginOut () {
      this.isLogined = false;
      cookies.set("name", "",{expires: 0}) 
      this.$router.push({
        path:'/login',
        params:{
          isLogined:false
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  @import '../my-theme/mixin.scss';
  .home-header {
    height: 100px;
    position: fixed;
    top: 40px;
    width: 100%;
    left: auto;
    right: auto;
    margin: auto;
    background: #fff;
    z-index: 1000;
    transition: 0.4s;
    &.active {
      box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
      height: 60px;
      .header-inner {
        padding: 0px;
      }
    }
    .ivu-menu-item {
      // color: #fff;
    }
    .ivu-menu-light{
      background: transparent;
    }
    .user-name {
      cursor: default;
    }
  }
  .header-inner {
    margin-right: auto;
    margin-left: auto;
    padding: 20px 30px;
    transition: 0.4s;
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
  }
  .header-right {
    margin-left: 50px;
    position: relative;
    z-index: 1300;
  }
  .header-user {
    height: 70px;
    // margin-top: 20px;
    &:hover .login-out {
      display: block;
    }
  }
  .logined {
    padding: 17px 0;
    line-height: 26px;
  }
  .login {
    margin: 15px 0;
    width: 130px;
    height: 30px;
    font-size: 14px;
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
  .login-out {
    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: 100%;
      left: 50%;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      -webkit-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
      -ms-transform: translate(-50%,0);
      transform: translate(-50%,0);
      border-bottom: 10px solid #fff;
      -webkit-transform: translate(-50%,1px);
      -moz-transform: translate(-50%,1px);
      -ms-transform: translate(-50%,1px);
      transform: translate(-50%,1px);
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 100%;
      left: 50%;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      -webkit-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
      -ms-transform: translate(-50%,0);
      transform: translate(-50%,0);
      border-bottom: 10px solid #F6F7FC;
      -webkit-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
      -ms-transform: translate(-50%,0);
      transform: translate(-50%,0);
    }
    display: none;
    background: #fff;
    position: absolute;
    width: 240px;
    left: -40%;
    top: 60px;
    border: 1px solid #F6F7FC;
    box-shadow: 0 4px 4px rgba(0,0,0,.1);
    font-size: 12px;
    .login-out-title {
      font-size: 14px;
      display: inline-block;
      border-bottom: 2px solid #3166D2;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .all-asset {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      color: #666;
      span {
        display: inline-block;
        border-radius: 12px;
        padding: 2px 12px;
        height: 24px;
        color: #fff;
        background-color: #3166D2;
        text-align: center;
        line-height: 20px;
      }
    }
    .uid {
      height: 48px;
      line-height: 48px;
      color: #666;
      padding: 0 20px;
    }
    .login-out-btn {
      width: 100%;
      height: 40px;
      border: none;
      color: #192E5B;
      background: #F6F7FC;
      letter-spacing: 2px;
      outline: none;
      &:hover {
        background: rgba(190, 203, 245,.3);
      }
    }
  }
</style>
