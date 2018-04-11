<template>
  <div class="user-center">
    <user-info></user-info>
    <div class="user-main clear">
      <div class="user-menu" active-name="user-menu">
        <Menu ref="safesettings" width="160px" :active-name="activeMenu" @on-select="changeValue">
          <MenuItem v-for="item in userMenu" :name="item.value" :key="item.value">
            {{item.label}}
          </MenuItem>
        </Menu>
      </div>
      <div class="user-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import userInfo from './userBaseInfo';
import { Menu, MenuItem } from 'iview';
import { Message } from '../../utils/message';
import bus from '../../bus/bus'
let userMenu = [
  {label:'基本信息',value:'safesettings'},
  // {label:'金牌经纪人',value:'broker'},
  // {label:'API访问',value:'api'},
  {label:'实名认证',value:'authentication'},
  {label:'登录记录',value:'loginrecord'}
]
export default {
  components:{
    Menu,MenuItem,'user-info': userInfo
  },
  data (){
    return {
      userMenu,
      activeMenu:userMenu[0].value
    }
  },
  computed:{
    ...mapState({
      userinfo(state) {
        var isCertified = state.userinfo.identityset == '1' ? true : false;
        return {
          isCertified
        }
      }
    })
  },
  mounted(){
    var route = this.$route;
    var activeName = route.query.name;
    var that = this;
    bus.$on('changeSettingMenu',function (name) {
      that.initActive(name);
    })
    this.initActive(activeName);
    console.log(this.$store.state.userinfo,'userinfo--------');
    if (!this.$store.state.userinfo.uid) {
      Message.warn('网络请求似乎出现了问题，请检查您的网络或重新登录。');
    }
  },
  updated () {
    var route = this.$route;
    var activeName = route.query.name;
    if (activeName) {
      this.initActive(activeName);
    }
  },
  methods:{
    //init菜单的选中
    initActive(name) {
      if (!name) {
        return false;
      }
      if (name && name.charAt) {
        if (this.$refs['safesettings']) {
          this.$refs['safesettings'].currentActiveName  = name;
        }
      }
    },
    //点击左侧菜单
    changeValue(name){
      if (name == 'api') {
        this.$Modal.info({
          title:'提示',
          content:'功能暂未开放'
        })
        return false;
      }
      console.log(this.userinfo);
      if (!this.userinfo.isCertified && name != 'authentication') {
        this.$Notice.warning({
          title:'提示',
          desc:'请先完成实名认证'
        })
        return false;
      }
      this.$router.push({
        path:'/user/'+name,
        query:{
          name
        }
      })
    }
  }
}
</script>

<style lang='scss'>
  @import './safesettings';
  .user-menu .ivu-menu-vertical .ivu-menu-item{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .user-center {
    width:1200px;
    margin: 0 auto;
    .user-menu {
      width: 160px;
      float: left;
    }
    .user-content {
      width: 1020px;
      margin-left: 20px;
      float: right;
    }
  }
</style>