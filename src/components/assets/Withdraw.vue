<template>
  <div class="withdraw">
    <h3 class="withdraw-title">{{withdrawType}}提现</h3>
    <div class="divide"></div>
    <Form :class="'withdraw-table'" ref="form" :rules="withdrawRules" inline label-position="left" :model="withdrawModel" :label-width="140">
      <FormItem label="账户余额" prop="balance">
        <Input :class="'withdraw-item'" v-model="withdrawModel.balance" disabled/>
      </FormItem>
      <FormItem label="提现地址" prop="address">
        <Input :class="'withdraw-item'" v-model="withdrawModel.address" />
        <Button type="primary" @click="showAddModal">增加</Button>
      </FormItem>
      <FormItem label="提现数量" prop="account">
        <InputNumber :class="'withdraw-item'" v-model="withdrawModel.account"></InputNumber>
      </FormItem>
      <FormItem :label="withdrawType+'手续费比例'" prop="commission">
        <Input :class="'withdraw-item'" v-model="withdrawModel.commission" disabled/>
      </FormItem>
      <FormItem label="交易密码" prop="trade_password">
        <Input :class="'withdraw-item'" type="password" v-model="withdrawModel.trade_password" />
      </FormItem>
      <FormItem label="短信验证码" prop="text_code">
        <Input :class="'withdraw-item'" v-model="withdrawModel.text_code" style="width:300px;" />
        <Button type="primary" style="width:100px;" @click="send">{{sendText}}</Button>
      </FormItem>
    </Form>
    <div class="submit-btn">
      <Button class="btn-block" type="primary" @click="submitWithdraw('form')">立即提现</Button>
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
    <Modal
      class="addaddress"
      v-model="addaddress"
      title="添加地址"
      @on-ok="addok"
    >
      <Form ref="addaddress" :model="addModal" :label-width="100" style="width: 400px;">
        <FormItem prop="addaddress" label="提现地址：">
          <Input v-model="addModal.addaddress" />
        </FormItem>
        <FormItem prop="remark" label="备注：">
          <Input v-model="addModal.remark" />
        </FormItem>
        <FormItem prop="trade_password" label="交易密码：">
          <Input v-model="addModal.trade_password" type="password"/>
        </FormItem>
        <FormItem prop="add_text_code" label="短信验证码：">
          <Input v-model="addModal.add_text_code" style="width:200px;"/>
          <Button type="primary">{{addText}}</Button>
        </FormItem>
      </Form>
      <Button class="btn-block" type="primary" slot="footer">确认提交</Button>
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem } from 'iview';
let L = console.log;
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
var accountValidator = (rule,value,c) => {
  console.log('accout',value);
  if (!value) {
    c('请输入提现数量')
  }else if (value > 10000) {
    c();
  }else {
    c();
  }
}
var withdrawRules = {
  address:[
    {required:true,trigger: 'blur',message:'请填写地址'},
    {type:'string',min:2,max:64,message:'请输入合法的提现地址。',trigger:'blur'}
  ],
  account:[
    {type:'number',required:'true',message:'请输入提现数量',trigger:'blur'},
    {validator:accountValidator,trigger:'blur'}
  ],
  trade_password:[
    {required:true,message:'请输入密码',trigger:'blur'}
  ],
  text_code:[
    {required:true,trigger: 'blur',message:'请填写验证码'},
    {type:'string',min:4,max:4,message:'请填写四位验证码',trigger:'blur'}
  ]
}
export default {
  components:{
    Form: Form,
    FormItem: FormItem
  },
  mounted (){
  },
  data () {
    return {
      msg:'提币',
      withdrawType:'ETH',
      withdrawModel:{
        balance:'0.00',
        address:'',
        account:0,
        commission:'0.003',
        trade_password:'',
        text_code:''
      },
      addModal:{
        addaddress:'',
        remark:'',
        trade_password:'',
        add_text_code:''
      },
      record_column:record_column,
      record_data:[],
      sendText:'发送验证码',
      addText:'发送验证码',
      sendStatus:0, //0，未发送，1，发送中  2，已发送
      withdrawRules:withdrawRules,
      addaddress:false  //添加地址modal
    }
  },
  methods:{
    send () {
      console.log(this.sendStatus);
      if(this.sendStatus == 0 || this.sendStatus == 2) {
        var num = 4;
        var that = this;
        var timer = setInterval(function () {
          num --;
          that.sendStatus = 1;
          if (num <= 0) {
            clearInterval(timer);
            that.sendText = '发送验证码';
            that.sendStatus = 2;
          }else {
            that.sendText = num;
          }
        },1000)
      }else if (this.sendStatus == 1) {
        // console.log(this.sendStatus,'短信已经发送');
        return;
      }
    },
    submitWithdraw(name){
      console.log('立即提现',this.$refs[name]);
      this.$refs[name].validate((valid) => {
        console.log('valid or not',valid);
        if (valid) {
          this.validateCode();
        }else {
          // message();
        }
      })
    },
    validateCode(){
      console.log('校验验证码');
      console.log(this.withdrawModel);
    },
    addok() {
      L('确认添加');
    },
    showAddModal () {
      this.addaddress = true;
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
.addaddress .btn-block {
  // width: 80%;
  margin: 0 auto;
}
</style>
