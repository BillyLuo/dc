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
          <FormItem label="转出账户名：" prop="account_name">
            <Input v-model="transferForm.account_name" placeholder="转出账户名"/>
          </FormItem>
          <FormItem label="转出数量：" prop="amount">
            <Input v-model="transferForm.amount" placeholder="转出数量"/>
          </FormItem>
          <FormItem label="交易密码：" prop="trade_pwd">
            <Input v-model="transferForm.trade_pwd" placeholder="请输入交易密码" type="password"/>
          </FormItem>
          <FormItem label="短信验证码：" prop="text_code">
            <Input v-model="transferForm.text_code" placeholder="请输入短信验证码">
              <span class="" slot="append" style="cursor: pointer;">{{getCodeText}}</span>
            </Input>
          </FormItem>
          <FormItem label="转账附言：" prop="comment">
            <Input type="textarea" :rows="4" v-model="transferForm.comment" />
          </FormItem>
        </Form>
        <div>
          <Button type="primary" long @click="confirm">转让权益</Button>
        </div>
      </div>
      <div class="stock-transfer-record">
        <div class="transfer-notification">
          <h3>转让须知</h3>
          <ul>
            <li>转让须知1</li>
            <li>转让须知2</li>
          </ul>
        </div>
        <div>
          <h3 class="stock-record-title">转让记录</h3>
          <stocktransfertable />
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
      stockname: '长城股份',
      stockcode: '9023',
      available: '23.33',
      address: '0x243423432423434jflesjlfj',
      account_name: '',
      amount: 32,
      trade_pwd: '',
      text_code: '',
      comment: '一些附言'
    }
    var transferRules = {};
    return {
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

    },
    confirm() {
      console.log('转账')
    }
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
