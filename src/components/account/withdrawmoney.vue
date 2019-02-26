<template>
  <div class="withdrawmoney">
    <div class="wrapper withdrawmoney-content">
      <div class="withdraw-replay">
        <div><h4>提现申请</h4></div>
        <div class="withdraw-form">
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
            <FormItem label="提现金额" prop="withdrawamount">
              <Input v-model="model.withdrawamount" placeholder="提现金额" />
            </FormItem>
            <FormItem label="币种：" prop="coin">
              <Input v-model="model.coin" placeholder="币种" />
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
          <h4>提现须知</h4>
          <ul>
            <li>在本页面提交提现申请。</li>
            <li>收款银行账号必须与当前用户的信息一致。</li>
            <li>等待交易所确认。</li>
          </ul>
        </div>
      </div>
      <div class="withdraw-record">
        <div><h4>提现记录</h4></div>
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
        withdrawamount: '',
        coin: '',
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
  .withdrawmoney {
    color: #fff;
    ul li {
      list-style-type: disc;
      color: #eee;
    }
  }
  .withdraw-apply, .withdraw-record {
    padding: 20px 0;
    margin-bottom: 100px;
  }
  .withdraw-title {
    border-bottom: 1px solid #eee;
  }
  .withdrawmoney-content {
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
  .withdraw-form {
    width: 500px;
    margin: 40px 0 80px 0;
  }
  .submit-apply {
    margin: 10px 0;
  }
</style>
