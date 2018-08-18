<template>
  <div class="stock-transfer">
    <div class="wrapper">
      <div class="transfer-form">
        <Form ref="form" :model="transferForm" :rules="transferRules" :label-width="120" label-position="left">
          <FormItem label="股票名称：" prop="stockname">
            <Input v-model="transferForm.stockname" disabled />
          </FormItem>
          <FormItem label="股票代码：" prop="stockname">
            <Input v-model="transferForm.stockcode" disabled />
          </FormItem>
          <FormItem label="可用数额：" prop="available">
            <Input v-model="transferForm.available" disabled />
          </FormItem>
          <FormItem label="转出钱包地址：" prop="address">
            <Input v-model="transferForm.address" placeholder="转出钱包地址" />
          </FormItem>
          <FormItem label="转出账户名：" prop="name">
            <Input v-model="transferForm.name" placeholder="转出用户名"/>
          </FormItem>
          <FormItem label="转出数量：" prop="amount">
            <Input v-model="transferForm.amount" placeholder="转出数量"/>
          </FormItem>
          <FormItem label="交易密码：" prop="pwd">
            <Input v-model="transferForm.pwd" placeholder="请输入交易密码" type="password"/>
          </FormItem>
          <FormItem label="短信验证码：" prop="smscode">
            <Input v-model="transferForm.smscode" placeholder="请输入短信验证码">
              <span class="" slot="append" style="cursor: pointer;">{{getCodeText}}</span>
            </Input>
          </FormItem>
          <FormItem label="转账附言：" prop="remark">
            <Input type="textarea" :rows="4" v-model="transferForm.remark" />
          </FormItem>
        </Form>
        <div>
          <Button :loading="loading" type="primary" long @click="confirm">转让权益</Button>
        </div>
      </div>
      <div class="stock-transfer-record">
        <!-- <div class="transfer-notification">
          <h3>转让须知</h3>
          <ul>
            <li>转让须知1</li>
            <li>转让须知2</li>
          </ul>
        </div> -->
        <div>
          <h3 class="stock-record-title">转让记录</h3>
          <stocktransfertable :coincode="transferForm.stockcode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, FormItem } from 'iview';
import stocktransfertable from './transfertable/stock';
export default {
  components: {
    Form, FormItem, stocktransfertable
  },
  data() {
    var transferForm = {
      stockname: '',
      stockcode: '',
      available: '',
      address: '',
      account_name: '',
      amount: 0,
      pwd: '',
      text_code: '',
      comment: ''
    }
    var transferRules = {};
    return {
      loading: false,
      transferForm,
      transferRules,
      getCodeText: '获取验证码'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var {coincode, type} = this.$route.query;
      var pairstype = type;
      if (!coincode || !pairstype) {
        return;
      }
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
          this.transferForm.stockname = account.currencyname;
          this.transferForm.stockcode = account.coincode;
          this.transferForm.available = account.usablefund;
        } 
      }).catch((err) => {
        this.$Message.error('网络请求出错了，请稍后重试');
      })
    },
    confirm() {
      var reqresource = 1;
      let { amount, address, pwd, remark,smscode, name} = this.transferForm;
      let coin = this.transferForm.stockcode;
      if (amount <= 0) {
        this.$Message.warning('转出的数量需要大于0');
        return;
      }
      this.loading = true;
      this.$ajax.post('/trade/tdc/pbtas.do',{
        reqresource,amount,address,pwd,coin,remark,smscode,name
      }).then((res) => {
        this.loading = false;
        let data = res.data || {};
        if (data.retCode == '1') {
          this.$Message.success('转账成功');
        }else if (data.retMsg) {
          this.$Message.error(data.retMsg + ',转账失败，请稍后重试');
        }else {
         this.$Message.error('转账失败，请稍后重试'); 
        }
      }).catch((err) => {
        this.loading = false;
        this.$Message.error('转账失败，请稍后重试');
      })
    },
  }
}
</script>

<style lang="scss">
  .transfer-form {
    width: 500px;
    padding: 40px 0;
  }
  .transfer-notification {
    padding: 20px;
    margin: 40px 0;
    border-radius: 4px;
    border: 1px solid #eee;
    h3 {
      color: #fff;
    }
    ul li {
      list-style-type: disc;
      list-style-position: inside;
      color: #999;
    }
  }
  .stock-record-title {
    color: #fff;
    font-size: 20px;
    padding: 20px 0 10px 0;
    display: inline-block;
    border-bottom: 2px solid #ff0;
    margin-bottom: 20px;
  }
</style>
