<template>
  <div :class="{'home-header':true,active:scroll}">
    <div class="header-inner clear wrapper">
      <div class="header-logo" @click="route('home')">
        <img src="/static/img/logo.png"/>
        <span>蜂巢币</span>
      </div>
      <Menu mode="horizontal" @on-select="route" :active-name="activeName">
        <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
            {{value.text}}
        </MenuItem>
      </Menu>
      <div class="header-right float-left">
        <div v-if="isLogined">

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
function scroll (e) {
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  var scroll = false;
  if (scrollTop > 100) {
    // console.log(e);
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
  {name:'trade',text:'交易中心'},
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
      menu
    }
  },
  mounted (){
    // this.initActive();
    // console.log('----header----',this);
    window.onscroll = scroll.bind(this);
  },
  watch:{
    "$route":"getPath"  // 监听事件
  },
  methods:{
    getPath(){
      let path = this.$route.path;
      let that =this;
      menu.map(function(item){
          if(item.name==path.substr(1,path.length-1)){
            that.activeName = path.substr(1,path.length-1);
          }
      })
    },
    route(name){
      this.$router.push('/'+name);
    },
  }
}
</script>

<style scoped lang="scss">
  @import '../my-theme/mixin.scss';
  .home-header {
    height: 100px;
    position: fixed;
    top: 50px;
    width: 100%;
    left: auto;
    right: auto;
    margin: auto;
    background: #fff;
    z-index: 1000;
    transition: 0.5s;
    &.active {
      box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
    }
    .ivu-menu-item {
      // color: #fff;
    }
    .ivu-menu-light{
      background: transparent;
    }
  }
  .header-inner {
    margin-right: auto;
    margin-left: auto;
    padding: 20px 30px;
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
</style>
