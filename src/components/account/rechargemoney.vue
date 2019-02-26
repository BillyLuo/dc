<template>
  <div class="rechargemoney">
    <div class="wrapper rechargemoney-content">
      <div class="recharge-replay">
        <div><h4>充值申请</h4></div>
        <div class="recharge-form">
          <Form :model="model" :rules="rules" :label-width="100">
            <FormItem label="银行名称：" prop="bankname">
              <Input v-model="model.bankname" placeholder="银行名称" />
            </FormItem>
            <FormItem label="银行账号：" prop="bankaccount">
              <Input v-model="model.bankaccount" placeholder="银行账号" />
            </FormItem>
            <FormItem label="账号名称：" prop="accountname">
              <Input v-model="model.accountname" placeholder="账号名称" />
            </FormItem>
            <FormItem label="转账时间：" prop="transfertime">
              <Input v-model="model.transfertime" placeholder="转账时间" />
            </FormItem>
            <FormItem label="转账金额：" prop="transferamount">
              <Input v-model="model.transferamount" placeholder="转账金额" />
            </FormItem>
            <FormItem label="币种：" prop="coin">
              <Input v-model="model.coin" placeholder="币种" />
            </FormItem>
            <FormItem label="交易号：" prop="txnumber">
              <Input v-model="model.txnumber" placeholder="银行名称" />
            </FormItem>
            <FormItem label="手机号：" prop="phone">
              <Input v-model="model.phone" placeholder="手机号" />
            </FormItem>
            <FormItem label="备注（可选）：" prop="remark">
              <Input v-model="model.remark" type="textarea" rows="3" placeholder="备注" />
            </FormItem>
            <Button @click="submit" class="submit-apply" type="primary" long>提交</Button>
          </Form>
        </div>
        <div>
          <h4>充值须知</h4>
          <ul>
            <li>通过网络银行或者银行柜台将资金转账到交易所账户。记录转账相关信息，包括交易号，交易时间，交易金额等。</li>
            <li>在本页面提交充值申请。</li>
            <li>等待交易所确认。</li>
            <li>
              <div style="margin-bottom: 8px;">交易所账号信息</div>
              <p>银行名称：</p>
              <p>账号名称：</p>
              <p>账号：</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="recharge-record">
        <div><h4>充值记录</h4></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, FormItem } from 'iview';
export default {
  components: {
    Form,FormItem
  },
  data() {
    return {
      type: '',
      model: {
        bankname: '',
        bankaccount: '',
        accountname: '',
        transfertime: '',
        transferamount: '',
        coin: '',
        txnumber: '',
        phone: '',
        remark: ''
      },
      rules: {}
    }
  },
  methods: {
    submit() {
      
    }
  }
}
</script>

<style lang="scss">
  .rechargemoney {
    color: #fff;
    ul li {
      list-style-type: disc;
      color: #eee;
    }
  }
  .recharge-apply, .recharge-record {
    padding: 20px 0;
    margin-bottom: 100px;
  }
  .recharge-title {
    border-bottom: 1px solid #eee;
  }
  .rechargemoney-content {
    padding: 20px 0;
    h4 {
      font-size: 20px;
      margin: 10px 0;
      margin-bottom: 20px;
      font-weight: normal;
      line-height: 44px;
      border-bottom: 1px solid #999;
    }
  }
  .recharge-form {
    width: 500px;
    margin: 40px 0 80px 0;
  }
  .submit-apply {
    margin: 10px 0;
  }
</style>
