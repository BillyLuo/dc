<template>
  <div class="stock-address">
    <div class="wrapper">
      <div class="stock-address-title">
        <h3>{{stockname}}股票地址</h3>
      </div>
      <div class="stock-address-detail">
        <Row>
          <Col :span="4"><span style="color: #eee;">账号地址：</span></Col>
          <Col :span="4">{{stockaddress}}</Col>
        </Row>
      </div>
      <div class="stock-receive-record">
        <div class="stock-address-title">
          <h3>{{stockname}}接收记录</h3>
        </div>
        <receiverecord />
      </div>
    </div>
  </div>
</template>

<script>
import receiverecord from './receiverecord';
export default {
  components: {receiverecord},
  data() {
    return {
      stockname: '长城股份',
      stockaddress: 'oxhfajfowadfsfeafdfeghe2'
    }
  }
}
</script>

<style lang="scss">
  .stock-address-title {
    color: #eee;
    padding: 20px 0 10px 0;
    border-bottom: 1px solid #eee;
  }
  .stock-address-detail {
    padding: 50px 0;
  }
</style>
