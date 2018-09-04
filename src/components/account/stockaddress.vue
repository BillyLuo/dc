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
          <h3>{{stockname}}交易记录</h3>
        </div>
        <receiverecord :coincode="coincode"/>
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
      stockname: '',
      stockaddress: '',
      coincode: ''
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      var {coincode, type} = this.$route.query;
      var pairstype = type;
      if (!coincode || !pairstype) {
        return;
      }
      this.coincode = coincode;
      console.log(coincode,type);
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource: '1',
        currencytype:coincode,
        pairstype
      }).then((res) => {
        console.log('resres',res);
        var data = res.data;
        if (data.err_code == '1' && data.accountFund && data.accountFund.length) {
          var account = data.accountFund[0];
          this.stockname = account.currencyname;
          this.stockaddress = account.address;
        } 
      }).catch((err) => {
        this.$Message.error('网络请求出错了，请稍后重试');
      })
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
