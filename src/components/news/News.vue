<template>
  <div class="wrapper">
    <div class="news clear">
      <div class="news-menu float-left">
        <Menu :active-name="activeName" :width="'160px'" @on-select="route">
          <MenuItem v-for="(item,index) in menu" :key="index" :name="item.name">
            {{item.label}}
          </MenuItem>
        </Menu>
      </div>
      <div class="float-left news-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem } from 'iview';
let menu = [
  {name:'news',label:'新闻'}
];
let activeName = menu[0].name;
export default {
  data () {
    return {
      menu,
      activeName
    }
  },
  components:{
    Menu,MenuItem
  },
  methods:{
    route(){
      this.$router.push({
        name:'News'
      })
    }
  }
}
</script>

<style lang="scss">
  .news{
    min-height: 500px;
    padding: 20px 0;
  }
  .news-menu {
    min-height: 460px;
    background: #f9f9f9;
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
      background: #fff;
    }
  }
  .news-main {
    width: 1000px;
    padding: 0 20px;
    margin-left: 20px;
    background: #fff;
    min-height: 480px;
  }
</style>
