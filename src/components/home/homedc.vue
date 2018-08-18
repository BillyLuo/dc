<template>
  <div>
    <div>
      <div>
        <h3 class="home-dc-title"><span>DC行情</span></h3>
      </div>
      <div class="homedc-content">
        <homedcmarket />
      </div>
    </div>
  </div>
</template>

<script>
import homedcmarket from './homedcmarket';
export default {
  components: {
    homedcmarket
  }
}
</script>

<style lang="scss">
  .home-dc-title {
    color: #fff;
    font-size: 28px;
    text-align: center;
    margin: 30px 0;
  }
  .homedc-content {
    padding: 40px 40px 60px 40px;
  }
</style>
