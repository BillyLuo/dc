<template>
  <div class="user-center">
    <user-info></user-info>
    <div class="user-main clear">
      <div class="user-menu" active-name="user-menu">
        <Menu width="160px" :active-name="activeMenu" @on-select="changeValue">
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
let userMenu = [
  {label:'基本信息',value:'safesettings'},
  {label:'金牌经纪人',value:'broker'},
  {label:'API访问',value:'api'},
  {label:'登录记录',value:'loginrecord'},
  {label:'实名认证',value:'authentication'}
]
export default {
  data (){
    return {
      userMenu,
      activeMenu:userMenu[0].value
    }
  },
  components:{
    'user-info': userInfo
  },
  methods:{
    changeValue(name){
      console.log(name,this.$router);
      this.$router.push({
        path:'/user/'+name
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