<template>
  <div class="wrapper about">
    <div class="clear">
      <div class="float-left about-menu">
        <Menu ref="menu" mode="vertical" theme="light" :width="'160px'" @on-select="selectMenu" :active-name="activeName">
          <MenuItem v-for="(item,index) in aboutMenu" :name="item.name" :key="index">
            {{item.label}}
          </MenuItem>
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
  {name:'rate',label:'费率说明'},
  {name:'apply',label:'上币申请'}
]
var activeName = aboutMenu[0].name;
export default {
  data () {
    return {
      aboutMenu,
      activeName
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
  }
  .about-menu {
    width: 200px;
  }
  .about-content {
    width: 980px;
  }
</style>
