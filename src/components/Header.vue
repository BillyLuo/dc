<template>
  <div :class="{'home-header':true,active:scroll}" :style="height">
      <Menu ref="main_menu" class='header-menu' mode="horizontal" @on-select="route" :active-name="activeName">
        <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
            {{value.text}}
        </MenuItem>
      </Menu>
      <div class="header-right header-user">
        <div v-if="isLogined" class="logined">
          <div class="user-name float-left">{{userInfo.username}}</div>
          <div class="user-level float-left">
            <!-- <span class="user-vip">VIP{{userInfo.userLevel}}</span> -->
          </div>
          <div class="login-out">
            <div>
              <div class="login-out-title" :style="{cursor:'pointer'}" @click="route('user')">个人中心</div>
              <div class="divide"></div>
              <!-- <div class="all-asset">账户总资产：<span>{{userInfo.amount}}  CNYT</span></div> -->
              <div class="divide"></div>
              <div class="uid">UID: <span>{{userInfo.uid}}</span></div>
              <div class="divide"></div>
              <button class="login-out-btn" @click="loginOut">登出</button>
            </div>
          </div>
        </div>
        <div v-else class="login">
            <Button class="log-in-out" @click="route('login')">登录</Button>or<Button @click="route('register')" class="log-in-out">注册</Button>
            <img src="/static/img/language.png" alt="">
        </div>
        <!-- <div  class="login">
          <span class="login-in" @click="route('login')">登录</span>|
          <span class="register" @click="route('register')">注册</span>
        </div> -->
      </div>
  </div>
</template>

<script>
import bus from '../bus/bus.js';
import cookies from 'cookies-js';
import { mapState } from 'vuex';
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
  // {name:'trading',text:'交易中心'},
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
      isCertified:false,
      menu,
      height:"",
      userInfo:{
        username:'',
        userLevel:1,
        uid:''
      }
    }
  },
  computed:{
    ...mapState({
      userinfo(state) {
        console.warn("#########################",state.userinfo);
        var amount = state.userinfo.estimatedfund;
        var uid = state.userinfo.uid;
        return {
          amount,
          uid
        }
      }
    })
  },
  updated(){
    var username = cookies.get('name');
    // if (username) {
    //   this.userInfo.username = username;
    // }
  },
  mounted (){
    // this.initActive();
    // this.getLoginName();
    this.getUserInfo();
    this.getPath();
    var that = this;
    window.onscroll = scroll.bind(this);
    bus.$on('login',(value) => {
      if (value) {
        // console.log(value)
        that.isLogined = true;
        that.userInfo.username = cookies.get('name');
      }
    })
    bus.$on('certify',(value) => {
      console.log('certify',value);
      if (value) {
        that.isCertified = true;
      }
    })
    if(cookies.get("name")){
      that.isLogined = true;
      this.getUserInfo();
      that.userInfo.username = cookies.get('name');
    }else{
      var path = this.$route.path;
      that.isLogined = false;
      if (path == '/' || path == '/home') {

      }else {
        this.$router.push("/login")
      }
    }
    
    // this.init();
  },
  watch:{
    "$route":"getPath", // 监听事件
    userInfo: () => {
      this.getLoginName();
    }
  },
  methods:{
    getUserInfo(){
      var that = this;
      this.$ajax.post("/trade/tps/pblbi.do",{
        reqresource:1
      })
      .then(res => {
        // console.log("----header-userinfo-----", res.data);
        if (res.data && res.data.emailset != undefined) {
          if (res.data.identityset == '1') {
            this.isCertified = true;
          }
          that.userInfo.amount = res.data.estimatedfund ? res.data.estimatedfund : '0';
        } else {
          console.log('没有获取到相应的用户信息');
        }
      })
      .catch(err => {
        console.log("获取用户认证信息出错", err);
      });
      this.$ajax
      .post("/trade/tps/pbpis.do",{
        reqresource:1
      })
      .then(res => {
        // console.log("----user-----info----", res,res.data);
        if (res.data && res.data.username != undefined) {
          that.userInfo.uid = res.data.uid;
        } else {
        }
      })
      .catch(err => {
        console.log("获取用户信息出错", err);
      });
    },
    getLoginName(){
      let username = cookies.get('name');
      if (username){
        if (username.match(/^.+(?=@)/g) && username.match(/^.+(?=@)/g).length) {
          this.userInfo.username = username.match(/^.+(?=@).+/g)[0] ;
        }else {
          this.userInfo.username = username;
        }
      }
      console.log(this.userInfo.username);
    },
    init() {
      if (!this.isLogined) {
        this.$router.push({
          name:'Home'
        })
      }
    },
    getPath(){
      let path = this.$route.path;
      if(path != '/home' || path != '/'){
        this.height = "height:80px;background:#222222;position:fixed;top:0px;";
      }
      
      if(path == '/home' || path == '/'){
        this.height = "height:0px;position:absolute;top:0px;";
      }

      console.log("======",path =='/home')
      // console.log(path)
      this.$refs.main_menu.currentActiveName = 'home';
      let that =this;
      menu.map(function(item){
          if(item.name==path.split("/")[1]){
            // console.log(path.split("/")[1])
            that.$refs.main_menu.currentActiveName = path.split("/")[1];
          }
      })

      if(!cookies.get("name") && (path == "/trading" || path == "/assets" || path == "/user" || path == "/market")){
          this.$Modal.info({
            content:'请您先登录'
          });
          this.$refs.main_menu.currentActiveName = 'user';
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
      if(name != 'home'){
        this.height = "height:80px;background:#222222;position:fixed;top:0px;";
      }else{
        this.height = "height:0px;position:absolute;top:0px;";
      }
      if(!cookies.get("name")  && (name == "trading" || name == "assets" || name == "user" || name == "market")){
          this.$refs.main_menu.currentActiveName = 'user';
          this.$Modal.info({
            content:'请您先登录'
          });
          // this.activeName = 'user';
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
        if (!this.isCertified && name != 'home' && name !='login' && name != 'register' && name != 'user') {
          this.$Notice.warning({
            title:'提示',
            desc:'请先完成实名认证'
          })
          this.$router.push({
            name:'authentication',
            query:{
              name:'authentication'
            }
          })
          return;
        }
        this.$router.push({
          path:'/'+name
        });
      }


      var isLogined = this.isLogined;
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
      console.log("--------",name)

      

    },
    loginOut () {
      this.isLogined = false;
      cookies.set("name", "",{expires: 0}) 
      // console.log(this.$store.state.userinfo)
      let that = this;
      this.$ajax({
        method:"post",
        url: "/trade/tps/pblou.do",
        data:{
          username: that.$store.state.userinfo.username,
          reqresource:1
        }
      }).then((data) =>{
        // console.log(data)
        that.$router.push({
          path:'/login',
          params:{
            isLogined:false
          }
        })
      })
      // this.$router.push({
      //   path:'/login',
      //   params:{
      //     isLogined:false
      //   }
      // })
    },
  }
}
</script>

<style scoped lang="scss">
  @import '../my-theme/mixin.scss';
  .home-header {
    margin-top: 30px;
    min-width: 1200px;
    width: 100%;
    left: auto;
    right: auto;
    margin: auto;
    z-index: 1000;
    transition: 0.4s;
    position: relative;
    z-index: 998;
    // &.active {
    //   box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
    //   height: 80px;
    //   .header-inner {
    //     padding: 0px;
    //   }
    // }


    .user-name {
      cursor: default;
      font-size: 14px;
      line-height: 80px;
    }
    .header-menu{
        position: absolute;
        top:0;
        left: 0;
        padding-left:140px;
        background: none;
        &:before{
            content: "";
            display: block;
            width:34px;
            height:39px;
            position: absolute;
            left:70px;
            top:50%;
            margin-top: -19.5px;
            text-align: center;
            background: url('/static/img/logo.png') no-repeat;
        }
        .ivu-menu-item{
            color:#fff;
            font-size:16px;
            border-bottom: 0px solid transparent !important;
        }
        .ivu-menu-item:hover{
            color: #2d8cf0 !important;
            border-bottom:none !important;
        }
    }
    .ivu-menu-horizontal {
        height: 80px;
        line-height: 80px;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active{
        color: #2d8cf0 !important;
        border-bottom: none !important;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item{
        color:#fff;
    }
    .header-menu:after{
        height:0px !important;
    }
  }
  // .header-inner {
    // margin-right: auto;
    // margin-left: auto;
    // padding: 20px 30px;
    // transition: 0.4s;
    // ul {
    //   float: left;
    //   &::after{
    //     background: none;
    //   }
    //   li {
    //     // font-size: 16px;
    //   }
    // }
  // }
  // .header-logo {
  //   width: 300px;
  //   height: 60px;
  //   float: left;
  //   img {
  //     width: 46px;
  //     height: 60px;
  //     vertical-align: middle;
  //     padding: 10px 0;
  //     cursor: pointer;
  //   }
  //   span {
  //     font-size: 16px;
  //     cursor: pointer;
  //   }
  // }
  .logined {
    position: absolute;
    right: 200px;
    line-height: 40px;
    color: #fff;
    &:hover .login-out {
      display: block;
    }
  }
  // .header-user {
  //   // height: 70px;
  //   // margin-top: 20px;
  //   &:hover .login-out {
  //     display: block;
  //   }
  // }
  // .logined {
  //   padding: 17px 0;
  //   line-height: 26px;
  // }
  // .login {
  //   margin: 15px 0;
  //   width: 130px;
  //   height: 30px;
  //   font-size: 14px;
  //   line-height: 30px;
  //   border-radius: 15px;
  //   background: $primary-color;
  //   text-align: center;
  //   color: #fff;
  //   span {
  //     margin: 0 4px;
  //     cursor: pointer;
  //   }
  // }
  .login{
      // width:200px;
      position: absolute;
      top:0;
      right:40px;
      line-height: 80px;
      height:80px;
      color:#fff;
      z-index:9;
      .log-in-out{
          border:none;
          background: none;
          color:#fff;
      }
      .ivu-btn:focus {
          -webkit-box-shadow: none;
          box-shadow: none;
      }
      img{
          width: 21px;
          height: 21px;
          display: inline-block;
          vertical-align: middle;
      }
  }
  .login-out {
    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: 100%;
      left: 25%;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      -webkit-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
      -ms-transform: translate(-50%,0);
      transform: translate(-50%,0);
      border-bottom: 10px solid #2a2b2d;
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
      left: 25%;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      -webkit-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
      -ms-transform: translate(-50%,0);
      transform: translate(-50%,0);
      border-bottom: 10px solid #2a2b2d;
      -webkit-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
      -ms-transform: translate(-50%,0);
      transform: translate(-50%,0);
    }
    display: none;
    background: #2a2b2d;
    position: absolute;
    width: 300px;
    left: -60%;
    top: 70px;
    border: 1px solid #404448;
    box-shadow: 0 4px 4px rgba(0,0,0,.1);
    font-size: 12px;
    .divide{
      border:1px solid #404448;
    }
    .login-out-title {
      font-size: 14px;
      display: inline-block;
      // border-bottom: 2px solid #404448;
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
        background-color: #2a2b2d;
        text-align: center;
        line-height: 20px;
      }
    }
    .uid {
      height: 48px;
      line-height: 48px;
      color: #fff;
      padding: 0 20px;
    }
    .login-out-btn {
      width: 100%;
      height: 40px;
      border: none;
      color: #fff;
      background: #2a2b2d;
      letter-spacing: 2px;
      outline: none;
      &:hover {
        background: rgba(190, 203, 245,.3);
      }
    }
  }
</style>
