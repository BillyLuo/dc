<template>
  <div class="account">
    <div class="wrapper">
      <div class="my-wallet-title">
        <h3>我的钱包</h3>
      </div>
      <mywallet />
    </div>
  </div>
</template>

<script>
import mywallet from './mywallet';
export default {
  components: {
    mywallet
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
  .my-wallet-title {
    padding: 20px;
    h3 {
      color: #eee;
      font-size: 16px;
    }
  }
</style>
