<template>
  <div class="home-header">
    <div class="header-inner">
      <Menu mode="horizontal" @on-select="route" active-name="home">
        <MenuItem name="home">
            首页
        </MenuItem>
        <MenuItem name="trade">
            交易中心
        </MenuItem>
        <MenuItem name="assets">
            数字资产
        </MenuItem>
        <MenuItem name="user">
            个人中心
        </MenuItem>
      </Menu>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    route(name){
      console.log(this.$router);
      this.$router.push(name);
    }
  }
}
</script>

<style scoped lang="scss">
  .header-inner {
    text-align: center;
    margin: 0 auto;
    ul {
      padding: 0 10%;
    }
  }
</style>
