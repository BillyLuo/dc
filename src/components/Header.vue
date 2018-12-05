<template>
  <div :class="{'home-header':true,active:scroll}" :style="height">
      <Menu ref="main_menu" class='header-menu' mode="horizontal" @on-select="route" :active-name="activeName">
        <MenuItem v-for="(value,index) in menu" :class="value.className" :name="value.name" :key="value.name + index">
            {{value.text}}
        </MenuItem>
      </Menu>
      <div class="header-right header-user">
        <div v-if="isLogined" class="logined clear">
          <div class="user-name float-left">{{userInfo.username}}</div>
          <div class="user-level float-left">
            <!-- <span class="user-vip">VIP{{userInfo.userLevel}}</span> -->
          </div>
          <div class="login-out">
            <div style="line-height: 32px;">
              <div class="login-out-title" :style="{cursor:'pointer',width: '100%'}" @click="route('user')">个人中心</div>
              <div class="divide"></div>
              <!-- <div class="all-asset">账户总资产：<span>{{userInfo.amount}}  CNYT</span></div> -->
              <!-- <div class="divide"></div> -->
              <!-- <div class="uid">UID: <span>{{userInfo.uid}}</span></div> -->
              <!-- <div class="divide"></div> -->
              <button class="login-out-btn" @click="loginOut">登出</button>
            </div>
          </div>
        </div>
        <div v-else class="login">
            <Button class="log-in-out" @click="route('login')">登录</Button>or<Button @click="route('register')" class="log-in-out">注册</Button>
            <!-- <img src="/static/img/language.png" alt=""> -->
        </div>
        <!-- <div  class="login">
          <span class="login-in" @click="route('login')">登录</span>|
          <span class="register" @click="route('register')">注册</span>
        </div> -->
        <div class="choose-lang">
          <Dropdown @on-click="chooseLang" :class="'dark-mode'">
            <a href="javascript:void(0)">
              {{lang}}<Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem class="lang-item" v-for="(item) in langs" :key="item.lang" :name="item.value">{{item.label}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
  </div>
</template>

<script>
let langs = [
  {value: 'zh-CN',label: '简体中文'},
  {value: 'en-US', label: 'English'}
]
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
import { Menu,MenuItem,Row,Col,DropdownMenu,DropdownItem,Dropdown } from 'iview';
router.afterEach(route => {
    // console.log('------------',this)
});
let menu = [
  {name:'home',type: 'diamond',text:'',className:'menu-logo'},
  {name:'home',text:'首页'},
  {name: 'stock', text: '股票中心'},
  {name: 'dc', text: 'DC中心'},
  // {name: 'digit', text: '数字货币'},
  {name: 'subscription', text: '新股认购'},
  {name: 'account', text: '账户中心'},
  // {name:'assets',text:'数字资产'},
  // {name:'user',text:'个人中心'},
  // {name:'market',text:'行情中心'}
]
export default {
  name:'Header',
  components:{
    Menu,
    MenuItem,
    Row,
    Col,Dropdown,DropdownMenu,DropdownItem
  },
  data(){
    return {
      lang: '简体中文',
      langs,
      scroll:false,
      activeName:'home',
      isLogined:false,
      isCertified: false,
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
    this.initLang();
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
        }
      })
      .catch(err => {
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
        if(path == '/market'){
          this.height = "height:80px;background:#222222;min-width:1360px;position:relative";
        }else{
          this.height = "height:80px;background:#222222;";
        }
        
      }
      
      if(path == '/home' || path == '/'){
        this.height = "height:0px;position:absolute;top:0px;";
      }

      this.$refs.main_menu.currentActiveName = 'home';
      let that =this;
      menu.map(function(item){
          if(path.split("/")[1] && path.split("/")[1].match(item.name)){
            // console.log(path.split("/")[1])
            that.$refs.main_menu.currentActiveName = item.name;
          }
      })

      if(!cookies.get("name") && (path == "/trading" || path == "/assets" || path == "/user" || path == "")){
          this.$Notice.warning({
            title:'提示',
            desc:'请您先登录'
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
        if(name == 'market'){
          this.height = "height:80px;background:#222222;min-width:1360px;position:relative";
        }else{
          this.height = "height:80px;background:#222222;";
        }
       
      }else{
        this.height = "height:0px;position:absolute;top:0px;";
      }
      if(!cookies.get("name")  && (name == "trading" || name == "assets" || name == "user" || name == "market")){
          this.$refs.main_menu.currentActiveName = 'user';
          this.$Notice.warning({
            title:'提示',
            desc:'请您先登录'
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
        // if (!this.isCertified && name != 'home' && name !='login' && name != 'register' && name != 'user') {
        //   this.$Notice.warning({
        //     title:'提示',
        //     desc:'请先完成实名认证'
        //   })
        //   this.$router.push({
        //     name:'authentication',
        //     query:{
        //       name:'authentication'
        //     }
        //   })
        //   return;
        // }
        this.$router.push({
          path:'/'+name
        });
      }


      var isLogined = this.isLogined;
      // if (!this.isLogined && name != 'register' && name && name!='home') {
      //   this.$refs.main_menu.currentActiveName = 'home';
      //   if (name != 'home' && name != 'login' && name != 'register') {
      //     this.$Notice.warning({
      //       title:'提示',
      //       desc:'请您先登录'
      //     });
      //   } 
      //   this.$router.push({
      //     name:'Login'
      //   })
      //   cookies.set("name", "",{expires: 0})    
      // }else {

      // }
      if (!this.isLogined && name == 'account') {
        this.$refs.main_menu.currentActiveName = 'home';
        this.$router.push({
          name: 'Login'
        })
        cookies.set("name", "",{expires: 0});
        return;
      }
      this.$router.push({
        path:'/'+name
      });
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
      }).catch((err) => {
        this.$Message.warning('登出失败，请稍后重试');
      })
      // this.$router.push({
      //   path:'/login',
      //   params:{
      //     isLogined:false
      //   }
      // })
    },
    chooseLang(value) {
      var that = this;
      langs.forEach((item,index) => {
        if (value === item.value) {
          that.lang = item.label;
          localStorage.setItem('lang',value);
          location.reload();
        }
      })
    },
    initLang() {
      var lang = localStorage.getItem('lang');
      if (!lang) {
        return;
      }
      var that = this;
      langs.forEach((item,index) => {
        if (lang === item.value) {
          that.lang = item.label;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../my-theme/mixin.scss';
  .home-header {
    margin-top: 30px;
    min-width: 1360px;
    width: 100%;
    left: auto;
    right: auto;
    margin: auto;
    z-index: 999;
    transition: 0.4s;
    position: relative;
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
        .menu-logo{
            display: block;
            width:120px;
            height:39px;
            line-height: 39px;
            padding-left: 38px;
            position: absolute;
            left:70px;
            top:50%;
            color: #EAC84A !important;
            margin-top: -19.5px;
            background: url('/static/img/logo.png') no-repeat;
            background-size: 36px;
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
    width:150px;
    position: absolute;
    right: 100px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    z-index: 1009;
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
      right:100px;
      line-height: 80px;
      height:80px;
      color:#fff;
      z-index:9;
      .log-in-out{
          border:none;
          background: none;
          color:#fff;
          font-size:14px;
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
      left: 55%;
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
      left: 55%;
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
    width: 120px;
    right: -15px;
    top: 60px;
    z-index: 999999999;
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
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      &:hover {
        color: #2d8cf0;
      }
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
      padding: 0 10px;
    }
    .login-out-btn {
      width: 100%;
      height: 24px;
      line-height: 24px;
      border: none;
      color: #fff;
      background: #2a2b2d;
      letter-spacing: 2px;
      outline: none;
      cursor: pointer;
      &:hover {
        color: #2d8cf0;
      }
    }
  }
  .choose-lang {
    position: absolute;
    top: 30px;
    height: 20px;
    line-height: 20px;
    right: 30px;
  }
  .lang-item {
    color: #eee;
    &:hover {
      background: #2a2b2d;
      color: #fff;
    }
  }
</style>
