<template>
  <div class="withdraw">
    <h3 class="withdraw-title">{{withdrawType}}提现</h3>
    <div class="divide"></div>
    <Form :class="'withdraw-table'" inline label-position="left" :model="withdrawModel" :label-width="140">
      <FormItem label="账户余额">
        <Input :class="'withdraw-item'" v-model="withdrawModel.balance" disabled/>
      </FormItem>
      <FormItem label="提现地址">
        <Input :class="'withdraw-item'" v-model="withdrawModel.address" />
      </FormItem>
      <FormItem label="提现数量">
        <Input :class="'withdraw-item'" v-model="withdrawModel.account" />
      </FormItem>
      <FormItem :label="withdrawType+'手续费比例'">
        <Input :class="'withdraw-item'" v-model="withdrawModel.commission" />
      </FormItem>
      <FormItem label="交易密码">
        <Input :class="'withdraw-item'" v-model="withdrawModel.trade_password" />
      </FormItem>
      <FormItem label="短信验证码">
        <Input :class="'withdraw-item'" v-model="withdrawModel.text_code" />
      </FormItem>
    </Form>
    <div class="submit-btn">
      <Button class="btn-block" type="primary">立即提现</Button>
    </div>
    <div class="withdraw-note">
      <div class="withdraw-note-title">提现须知</div>
      <ul class="withdraw-note-content">
        <li>处理时间为09:00-0:00</li>
        <li>最小提币数量为0.4个,最大提币数量为99999.0个。</li>
      </ul>
    </div>
    <div class="withdraw-record">
      <h3>提现记录</h3>
      <Table :class="'no-border-table'" stripe :columns="record_column" :data="record_data" />
    </div>
  </div>
</template>

<script>
import { Form, FormItem } from 'iview';
var record_column = [
  {
    title: '提现时间',
    key: 'withdrawtime'
  },
  {
    title: '提现方式',
    key: 'withdrawway',
    sortable: false
  },
  {
    title: '提交数量',
    key: 'account',
  },
  {
    title: '手续费',
    key: 'commission',
  },
  {
    title: '提现状态',
    key: 'status',
  },
  {
    title: '备注号',
    key: 'remark',
  }
]
export default {
  components:{
    Form: Form,
    FormItem: FormItem
  },
  mounted (){
    console.log(FormItem);
  },
  data () {
    return {
      msg:'提币',
      withdrawType:'ETH',
      withdrawModel:{
        balance:'0.00',
        address:'',
        account:'',
        commission:'',
        trade_password:'',
        text_code:''
      },
      record_column:record_column,
      record_data:[]
    }
  }
}
</script>

<style scoped lang="scss">
  @import './withdraw';
  .withdraw-title {
    font-size: 16px;
    font-weight: 400;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    padding: 0 2px;
    padding-left: 0;
    position: relative;
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
  .withdraw-table {
  margin-top: 40px;
  padding: 20px;
  .ivu-form-item {
    display: block;
  }
  .withdraw-item {
      width: 400px;
    }
}
.withdraw {
  .submit-btn {
    width: 400px;
    margin-left: 160px;
    margin-bottom: 40px;
  }
}
.withdraw-note {
  border: 1px solid #F2F6FE;
  background: #FDFEFF;
  padding: 20px;
  border-radius: 3px;
}
.withdraw-note-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}
.withdraw-note-content {
  color: #999;
  line-height: 1.8em;
  li {
    position: relative;
    padding-left: 15px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border-radius: 50%;
      -webkit-transform: translate(0,-50%);
      -moz-transform: translate(0,-50%);
      -ms-transform: translate(0,-50%);
      transform: translate(0,-50%);
      top: .9em;
      background-color: #3166D2;
    }
  }
}
.withdraw-record {
  margin-top: 50px;
  &>h3 {
    font-weight: 400;
    position: relative;
    height: 40px;
    line-height: 40px;
    margin-bottom: 40px;
    &::after{
      content: '';
      display: inline-block;
      width: 60px;
      height: 2px;
      background-color: #FDD11A;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
