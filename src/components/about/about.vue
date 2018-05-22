<template>
  <div class="wrapper about">
    <div class="clear">
      <div class="float-left about-menu">
        <Menu ref="menu" mode="vertical" theme="dark" :width="'160px'" @on-select="selectMenu" :active-name="activeName">
          <MenuGroup title="关于">
            <MenuItem v-for="(item,index) in aboutMenu" :name="item.name" :key="index">
              {{item.label}}
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="条款说明">
            <MenuItem v-for="(item,index) in aboutMenu1" :name="item.name" :key="index+'98'">
              {{item.label}}
            </MenuItem>
          </MenuGroup>
          
        </Menu>
      </div>
      <div class="float-left about-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem,MenuGroup } from 'iview';
var aboutMenu = [
  {name:'aboutus',label:'关于我们'},
  {name:'apply',label:'上币申请'},
  {name:'notice',label:'公告'},
];
var aboutMenu1 = [
  {name:'law',label:'法律声明'},
  {name:'rate',label:'费率'}
];
var activeName = aboutMenu[0].name;
export default {
  data () {
    return {
      aboutMenu,
      activeName,
      aboutMenu1
    }
  },
  components:{
    Menu,MenuItem,MenuGroup
  },
  mounted() {
    this.initActive();
  },
  updated () {
    this.initActive();
  },
  methods:{
    selectMenu(name) {
      console.log(name)
      if (name) {
        this.$router.push({
          path:'/about/'+name,
          query:{
            active:name
          }
        })
      }
    },
    initActive (name) {
      let that = this;
      let query = this.$route.query;
      let activeName;
      if (query && query.active) {
        activeName = query.active;
      }
      this.$nextTick(()=>{
        if (that.$refs['menu']) {
          that.$refs['menu'].currentActiveName = activeName;
        }
      })
    }
  }
}
</script>

<style lang="scss">

  .about {
    padding: 30px 0;
    min-height: 400px;
    .ivu-menu-item-active{
      color: #2d8cf0 !important;
      border-right-color: #2d8cf0 !important;
    }
  }
  .ivu-menu-item{
      color:#fff !important;
    }
  .about-menu {
    width: 200px;
  }
  .about-content {
    width: 980px;
  }
  .ivu-menu-dark {
    background: #222222;
  }
  
</style>
