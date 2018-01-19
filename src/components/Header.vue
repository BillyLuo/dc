<template>
  <div class="home-header">
    <div class="header-inner clear">
      <div class="header-logo" @click="home">
        <img src="/static/img/logo.png"/>
        <span>蜂巢币</span>
      </div>
      <Menu mode="horizontal" @on-select="route" :active-name="activeName">
        <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
            {{value.text}}
        </MenuItem>
      </Menu>
      <div v-if="isLogined">

      </div>
      <div v-else class="login">
        <span class="login-in">登录</span>|
        <span class="register">注册</span>
      </div>
    </div>
  </div>
</template>

<script>
let menu = [
  {name:'home',text:'首页'},
  {name:'trade',text:'交易中心'},
  {name:'assets',text:'数字资产'},
  {name:'user',text:'个人中心'},
]
export default {
  name:'Header',
  data(){
    return {
      activeName:'home',
      isLogined:false,
      menu
    }
  },
  created (){
    let path = location.pathname;
    console.log(path);
    let activeName = 'home';
    if (path.match('/home')) {
      activeName = 'home';
    }else if (path.match('/trade')){
      activeName = 'trade';
    }else if (path.match('/assets')){
      activeName = 'assets';
    }else if (path.match('/user')){
      activeName = 'user';
    }
    this.activeName = activeName;
  },
  methods:{
    route(name){
      console.log(this.$router);
      this.$router.push(name);
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
  .home-header {
    background: #fff;
    box-shadow: 0px 3px 5px #999;
  }
  .header-inner {
    margin: 0 auto;
    width: 1200px;
    margin-right: auto;
    margin-left: auto;
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
    }
    span {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .login {
    float: right;
    margin: 15px 0;
    width: 120px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #407BE1;
    text-align: center;
    color: #fff;
    span {
      margin: 0 4px;
      cursor: pointer;
    }
  }
</style>
