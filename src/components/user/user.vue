<template>
  <div class="user-center">
    <user-info></user-info>
    <div class="user-main clearfix">
      <div class="user-menu" active-name="user-menu">
        <Menu width="160px">
          <MenuItem name="safe-settings">
            基本信息
          </MenuItem>
          <MenuItem name="broker">
            金牌经纪人
          </MenuItem>
          <MenuItem name="api">
            API访问
          </MenuItem>
          <MenuItem name="login-record">
            登录记录
          </MenuItem>
          <MenuItem name="authentication">
            实名认证
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
export default {
  data (){
    return {

    }
  },
  components:{
    'user-info': userInfo
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