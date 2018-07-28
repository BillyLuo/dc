<template>
  <div class="account">
    <div class="wrapper">
      <div class="my-wallet-title">
        <h3>我的钱包</h3>
      </div>
      <mywallet />
      <div>
        <div class="my-stock-title">
          <h3>我的股票</h3>
        </div>
        <mystock />
      </div>
    </div>
  </div>
</template>

<script>
import mywallet from './mywallet';
import mystock from './mystock'
export default {
  components: {
    mywallet, mystock
  },
  data() {
    return {

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {

    }
  }
}
</script>

<style lang="scss">
  .my-wallet-title, .my-stock-title {
    padding: 20px;
    h3 {
      color: #eee;
      font-size: 16px;
    }
  }
</style>
