<template>
  <div class="user-center" @click="changeActiveName">
    <user-info></user-info>
    <div class="user-main clear">
      <div class="user-menu" active-name="user-menu">
        <Menu ref="safesettings" width="160px" :active-name="activeMenu" @on-select="changeValue">
          <MenuItem v-for="item in userMenu" :name="item.value" :key="item.value">
            {{item.label}}
          </MenuItem>
        </Menu>
      </div>
      <div class="user-content bg-white">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import userInfo from './userBaseInfo';
import { Menu, MenuItem } from 'iview';
let userMenu = [
  {label:'基本信息',value:'safesettings'},
  // {label:'金牌经纪人',value:'broker'},
  {label:'API访问',value:'api'},
  {label:'登录记录',value:'loginrecord'},
  {label:'实名认证',value:'authentication'}
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
  mounted(){
    
  },
  methods:{
    changeValue(name){
      if (name == 'api') {
        this.$Modal.info({
          title:'提示',
          content:'功能暂未开放'
        })
        return false;
      }
      this.$router.push({
        path:'/user/'+name
      })
    },
    changeActiveName () {
      var that = this;
      this.$nextTick(()=> {
        // that.$refs['safesettings'].currentActiveName  = 'api';
      })
    }
  }
}
</script>

<style lang='scss'>
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