<template>
  <div class="recharge">
    <h3 class="recharge-currency">{{currencyType+'充值'}}</h3>
    <div class="divide"></div>
    <div class="recharge-address clear">
      <div class="float-left">充值地址</div>
      <div class="float-right"></div>
    </div>
    <div class="recharge-note">
      <div class="recharge-note-title">充值须知</div>
      <ul class="recharge-note-content">
        <li>冲币备注。</li>
        <li>您充值ETH上述地址后，需要整个{{currencyType}}网络节点的确认，为了快速到账，您可以向ETH网络支付少量的手续费。</li>
        <li>最小充值金额是：0.0001 您的{{currencyType}}地址不会改变，可以重复充值，如有更改，我们会通过网站公告或邮件通知您。</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title:'ETH充值',
      currencyType:'ETH'
    }
  }
}
</script>

<style scoped lang="scss">
  .recharge {
  }
  .recharge-currency {
    height: 38px;
    line-height: 38px;
    display: inline-block;
    padding: 0 2px;
    padding-left: 0;
    position: relative;
    font-weight: 400;
    &:after{
      content:'';
      display: inline-block;
      width: 100%;
      left: 0px;
      height: 2px;
      background: #3166D2;
      position: absolute;
      bottom: 0px;
    }
  }
  .divide {
    border-bottom: 1px solid #f4f4f4;
  }
  .recharge-address {
    margin: 30px 0;
  }
  .recharge-note {
    border: 1px solid #F2F6FE;
    background: #FDFEFF;
    padding: 20px;
    border-radius: 3px;
  }
  .recharge-note-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }
  .recharge-note-content {
    color: #999;
    line-height: 1.8em;
  }
</style>
