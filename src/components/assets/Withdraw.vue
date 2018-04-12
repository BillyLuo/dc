<template>
  <div class="withdraw">
    <h3 class="withdraw-title">{{withdrawType}}提现</h3>
    <div class="divide"></div>
    <Form :class="'withdraw-table'" ref="form" :rules="withdrawRules" inline label-position="left" :model="withdrawModel" :label-width="140">
      <FormItem label="  账户余额" prop="balance">
        <Input :class="'withdraw-item'" v-model="withdrawModel.balance" disabled/>
      </FormItem>
      <FormItem label="提现地址" prop="address">
        <Select :class="'withdraw-item'" v-model="withdrawModel.address" @on-change="getpub" >
          <Option v-for="(item) in withdrawAddress" :value="item.adress"  :key="item.adress">{{item.adress}}</Option>
        </Select>
        <Button type="primary" @click="showAddModal">增加</Button>
      </FormItem>
      <FormItem  v-if="withdrawType !='ETH'" label="公钥" prop="account">
        <Input :class="'withdraw-item'" v-model="withdrawModel.pub" disabled/>
      </FormItem>
      <FormItem label="提现数量" prop="account">
        <InputNumber :class="'withdraw-item'" v-model="withdrawModel.account"></InputNumber>
      </FormItem>
      <FormItem :label="'  '+withdrawType+'手续费比例'" prop="commission">
        <Input :class="'withdraw-item'" v-model="withdrawModel.commission" disabled/>
      </FormItem>
      <FormItem label="交易密码" prop="trade_password">
        <Input :class="'withdraw-item'" type="password" v-model="withdrawModel.trade_password" />
      </FormItem>
      <FormItem label="短信验证码" prop="text_code">
        <Input :class="'withdraw-item'" v-model="withdrawModel.text_code">
          <span slot="append" style="width:100px; cursor: pointer; padding:6px;" @click="send">{{sendText}}</span>
        </Input>
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
      <Table :class="'no-border-table dark-mode'" stripe :columns="record_column" :data="record_data" />
    </div>
    <Modal
      class="addaddress"
      v-model="addaddress"
      title="添加地址"
      @on-ok="addok"
    >
      <Form ref="addaddress" :model="addModal" :rules="addAddressRules" :label-width="100" style="width: 400px;">
        <FormItem prop="address" label="提现地址：">
          <Input v-model="addModal.address" />
        </FormItem>
        <FormItem v-if="withdrawType !='ETH'" label="公钥" prop="pub">
            <Input v-model="addModal.pub" placeholder=""></Input>
        </FormItem>
        <FormItem prop="remark" label="备注：">
          <Input v-model="addModal.remark" />
        </FormItem>
        <FormItem prop="trade_password" label="交易密码：">
          <Input v-model="addModal.trade_password" type="password"/>
        </FormItem>
        <FormItem prop="add_text_code" label="短信验证码：">
          <Input v-model="addModal.add_text_code">
            <span slot="append" style="cursor:pointer;padding: 6px 10px;" @click="addTextMsg">{{addText}}</span>
          </Input>
        </FormItem>
      </Form>
      <Button class="btn-block" type="primary" slot="footer" @click="confirmAddAddress">确认提交</Button>
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
    {type:'string',min:6,max:6,message:'请填写6位验证码',trigger:'blur'}
  ],
  pub:[
    { required: true, message: '请输入地址', trigger: 'blur' },
  ]
}
var addAddressRules = {
  address:[
    {required:true,message:'请输入提现地址',trigger:'blur'},
    {type:'string',pattern:/^\w{2,42}$/,message:'提现地址不应超过42位，且不含特殊字符',trigger:'blur'}
  ],
  remark:[
    {type:'string',max:200,message:'备注不应超过200位',trigger:'blur'}
  ],
  trade_password:[
    {required:true,message:'请输入交易密码',trigger:'blur'}
  ],
  add_text_code:[
    {required:true,message:'请输入验证码',trigger:'blur'},
    {type:'string',len:6,message:'请输入6位验证码',trigger:'blur'}
  ],
  pub:[
    { required: true, message: '请输入地址', trigger: 'blur' },
  ]
}
export default {
  components:{
    Form: Form,
    FormItem: FormItem
  },
  data () {
    return {
      msg:'提币',
      withdrawType:'ETH',
      withdrawModel:{
        balance:'0.00',
        address:'1',
        account:0,
        commission:'0.002',
        trade_password:'',
        text_code:'',
        pub:''
      },
      addModal:{
        address:'',
        remark:'',
        trade_password:'',
        add_text_code:'',
        pub:""
      },
      withdrawAddress:[
        ],
      record_column:record_column,
      record_data:[],
      sendText:'发送验证码',
      addText:'发送验证码',
      sendTextTimer:null,
      addTextTimer:null,
      sendStatus:0, //0，未发送，1，发送中  2，已发送
      withdrawRules:withdrawRules,
      addAddressRules,
      addaddress:false  //添加地址modal
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$router': 'getParams'
  },
  mounted (){
    if (this.withdrawAddress.length) {
      this.withdrawModel.address = this.withdrawAddress[0];
    }
    this.getParams();
  },
  methods:{
    getpub(val){
      console.log(val,"67890-=====================");
      if(this.withdrawType!="ETH"){
        this.withdrawAddress.map((item)=>{
          if(item.adress == val){
            this.withdrawModel.pub = item.pub;
          }
        })
      }
      // this.withdrawModel.pub = val;
    },
    getParams () {
      // 取到路由带过来的参数 
      let routerParams = this.$route.query
      console.log("=======routerParams======",routerParams)
      this.withdrawType = routerParams.name;
      this.getbalance();
      this.address_list();
    },
    getbalance(){//可用资金
      console.log()
      let that=this;
      this.$ajax({
          method:"post",
          url:"/trade/tps/pblaf.do",
          data:{
              reqresource:1,
              currencytype: that.withdrawType
          }
      }).then((res)=>{
          console.log(res)
          if(res.data.accountFund && res.data&&res.data.err_code=="1"){
              that.withdrawModel.balance = res.data.accountFund[0].usablefund
              that.withdrawModel.account = Number(res.data.accountFund[0].total)
          }else{
              that.withdrawModel.balance = 0
              that.withdrawModel.account = 0
          }
      })
    },
    //可用地址
    address_list(){
        let that=this;
        this.withdrawAddress = [];
        this.$ajax({
          method:"post",
          url:"/trade/tps/pbqwa.do",
          data:{
            reqresource:1,
            coin:that.withdrawType
          }
        }).then((data)=>{
          if(data.data && data.data.err_code == "1" && data.data.walletAdress){
            that.withdrawAddress =data.data.walletAdress
            // data.data.walletAdress.map((item)=>{
            //   that.withdrawAddress.push(item.adress)
            // })
            
          }
        })
    },
    send () {
      console.log(this.sendStatus);
      var verifystr = '15178874695';
      if(this.sendStatus == 0 || this.sendStatus == 2) {
        var num = 60;
        var that = this;
        var timer = setInterval(function () {
          num --;
          that.sendStatus = 1;
          if (num <= 0) {
            clearInterval(timer);
            that.sendText = '发送验证码';
            that.sendStatus = 2;
          }else {
            that.sendText = num + 's后重试';
          }
        },1000)
      }else if (this.sendStatus == 1) {
        // console.log(this.sendStatus,'短信已经发送');
        return;
      }
      this.$ajax.post('/trade/tps/pbscs.do',{
        verifystr,
        reqresource:1
      }).then((res) => {
        console.log('短信验证',res);
        if (res.status == 200 && res.data && res.data.err_code == '1') {
          that.$Message.success('短信已发送');
        }else {
          that.$Message.warning('短信发送失败，请稍后重试。');
        }
      }).catch((err) => {
        console.log(err);
        that.$Message.success('短信发送失败，请稍后重试。');
      })
    },
    submitWithdraw(name){
      console.log('立即提现',this.withdrawModel);
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
      let that = this;
      if(that.withdrawModel.account < 0.4){
        that.$Notice.warning({
          title:'温馨提示',
          desc:'提现数量不能小于0.4'
        })
        return false;
      }
      if(that.withdrawModel.account > that.withdrawModel.balance){
        that.$Notice.warning({
          title:'温馨提示',
          desc:'提现数量不能大于账户余额'
        })
        return false;
      }

      if(that.withdrawModel.account > 99999){
        that.$Notice.warning({
          title:'温馨提示',
          desc:'提现数量不能大于99999'
        })
        return false;
      }
      
      this.$ajax({
          method:"post",
          url:"/trade/tps/pbwds.do",
          data:{
            addrs:  that.withdrawModel.address,
            count: that.withdrawModel.account,
            txpwd: that.withdrawModel.trade_password,
            smscode: that.withdrawModel.text_code,
            reqresource:1,
            brokerage: that.withdrawModel.commission,
            coin:that.withdrawType,
            pub:"6fca866412cffebc2ec2452d0a000d7f1ead7627"
          }
        }).then((res)=>{
          console.log(res)
          if(res.data ){
            that.$Notice.success({
							title:'温馨提示',
							desc:'您已提现成功'
						})
            that.withdrawModel={
                address:'',
                account:0,
                commission:'0.002',
                trade_password:'',
                text_code:''
            };
            this.getbalance();
          }else{
            that.$Notice.warning({
							title:'温馨提示',
							desc:'提现失败'
						})
          }
        
      })
    },
    addok() {
      L('确认添加');
    },
    showAddModal () {
      this.addaddress = true;
    },
    addTextMsg() {
      var that = this;
      var num = 60;
      var verifystr = '15178874695';
      if (this.addTextTimer) {
        return false;
      }
      this.$ajax.post('/trade/tps/pbscs.do',{
        // verifystr,
        reqresource:1
      }).then((res) => {
        console.log('短信验证',res);
        if (res.status == 200 && res.data && res.data.err_code == '1') {
          that.$Message.success('短信已发送');
        }else {
          that.$Message.warning('短信发送失败，请稍后重试。');
        }
      }).catch((err) => {
        console.log(err);
        that.$Message.success('短信发送失败，请稍后重试。');
      })
      this.addTextTimer = setInterval(function () {
        if (num > 1) {
          num --;
          that.addText = num + 's后重试';
        }else {
          that.addText = '发送验证码';
          clearInterval(that.addTextTimer);
          that.addTextTimer = null;
        }
      },1000);
    },
    confirmAddAddress(){
      var that = this;
      this.$refs.addaddress.validate((valid) => {
        if (valid) {
          that.addaddress = false;
          that.submitAddAddress();
        }
      })
    },
    submitAddAddress() {
      let data = this.addModal;
      console.log(data);
      if (!data.address) {
        return;
      }
      let that=this;
 
      this.$ajax({
        method:"post",
        url:"/trade/tps/pbwam.do",
        data:{
          coin: that.withdrawType,
          adress:that.addModal.address ,
          remark:that.addModal.remark,
          transckcode:that.addModal.trade_password,
          msgcheckcode:that.addModal.add_text_code,
          reqresource:1
        }
      }).then((data)=>{
        if(data.data && data.data.err_code=="1"){
          that.addmodal = false;
          that.$Message.success("添加成功");
          that.address_list()
        }else{
          that.$Message.success(data.data.msg);
        }
          
      })

      if (true) {
        this.$refs.addaddress.resetFields();
      }
    }
  }
}
</script>

<style lang="scss">
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
    color: #666;
    &:after{
      content:'';
      display: inline-block;
      width: 100%;
      left: 0px;
      height: 2px;
      // background: #3166D2;
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
  .ivu-input-group-append {
    background: #353535;
    border-color: #666;
    color: #666;
  }
  .ivu-select-dropdown{
    background: rgb(62, 62, 65);
  }
  .ivu-select-single .ivu-select-selection{
    background: #353535;
    border: 1px solid #666;
    color: #666;
  }
  .ivu-select-item-selected, .ivu-select-item-selected:hover{
    background: #353535;
    color: #666;
  }
  .ivu-input-number {
    border-color: #666;
  }
  .ivu-input,.ivu-input-number-input {
    background: #353535;
    color: #666;
    border-color: #666;
  }
  .submit-btn {
    width: 400px;
    margin-left: 160px;
    margin-bottom: 40px;
  }
}
.withdraw-note {
  border: 1px solid #666;
  // background: #FDFEFF;
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
