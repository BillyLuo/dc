<template>
  <div class="coin-transfer">
    <div class="wrapper">
      <div style="padding: 30px 0;" v-if="!userinfo.nameAuth.bound">您尚未完成实名认证，<router-link :to="{name: 'safeSettings'}">去认证</router-link></div>
      <div style="padding: 30px 0;" v-else-if="!userinfo.tradePass.bound">您尚未设置交易密码，<router-link :to="{name: 'safeSettings'}">去设置</router-link></div>
      <div v-else class="transfer-form">
        <Form ref="form" :model="transferForm" :rules="transferRules" :label-width="120" label-position="left">
          <FormItem label="转账币种：" prop="coin">
            <Input v-model="transferForm.coin" disabled />
          </FormItem>
          <FormItem label="可用数额：" prop="usablefund">
            <Input v-model="transferForm.usablefund" disabled />
          </FormItem>
          <FormItem label="转入钱包地址：" prop="address">
            <Input v-model="transferForm.address" placeholder="转入钱包地址" />
          </FormItem>
          <FormItem label="转入账户名：" prop="name">
            <Input v-model="transferForm.name" placeholder="转入账户的姓名"/>
          </FormItem>
          <FormItem label="转出数量：" prop="amount">
            <Input v-model="transferForm.amount" placeholder="转出数量"/>
          </FormItem>
          <FormItem label="交易密码：" prop="pwd">
            <Input v-model="transferForm.pwd" placeholder="请输入交易密码" type="password"/>
          </FormItem>
          <FormItem label="短信验证码：" prop="smscode">
            <Input v-model="transferForm.smscode" :maxlength="4" placeholder="请输入短信验证码">
              <span class="" slot="append" @click="send" style="cursor: pointer;user-select: none;display: block;width: 80px;">{{getCodeText}}</span>
            </Input>
          </FormItem>
          <FormItem label="转账附言：" prop="remark">
            <Input type="textarea" :rows="4" v-model="transferForm.remark" />
          </FormItem>
        </Form>
        <div>
          <Button type="primary" long :loading="loading" @click="confirm">转账</Button>
        </div>
      </div>
      <div class="coin-transfer-record">
        <!-- <div class="divide-line"></div> -->
        <!-- <div class="transfer-notification">
          <h3>转账须知</h3>
          <ul>
            <li>转账须知1</li>
            <li>转账须知2</li>
          </ul>
        </div> -->
        <div>
          <h3 class="coin-record-title">转账记录</h3>
          <cointransfertable :coincode="coincode"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, FormItem } from 'iview';
import cointransfertable from './transfertable/coin';
import { mapState } from 'vuex';
export default {
  components: {
    Form, FormItem, cointransfertable
  },
  computed: {
    ...mapState({
      userinfo(state) {
        var info = state.userinfo;
        console.log('state-----!!!!!!1!!!!!!',info);
        var email = {bound:false,value:''},
        nameAuth = {bound:false,value:''},
        phone = {bound:false,value:''},
        loginPass = {bound:false,value:''},
        tradePass = {bound:false,value:''},
        google = {bound:false,value:''};
        var country_code = info.country_code;
        var num = 0;
        if (state.userinfo.emailset ==1) {
          email.bound = true;
          email.value = info.email;
          num += 1;
        }
        if (info.identityset ==1) {
          nameAuth.bound = true;
          num += 1;
        }
        if (info.mobileset ==1) {
          num += 1;
          phone.bound = true;
          phone.value = info.mobile;
        }
        if (info.googlecodeset ==1 ) {
          num += 1;
          google.bound = true;
        }
        if (info.loginpasswordset == 1) {
          num += 1;
          loginPass.bound = true;
        }
        if (info.tradepasswordset == 1) {
          num += 1;
          tradePass.bound = true;
        }
        console.log('------userinfo-------',{
          email,nameAuth,phone,loginPass,tradePass,google
        },this);
        return {
          email,nameAuth,phone,loginPass,tradePass,google,uid:info.uid,country_code
        }
      }
    })
  },
  data() {
    var transferForm = {
      coin: '',
      usablefund: '',
      address: '',
      name: '',
      amount: 0,
      pwd: '',
      smscode: '',
      remark: ''
    }
    var transferRules = {};
    return {
      coincode: '',
      transferForm,
      transferRules,
      getCodeText: '获取验证码',
      loading: false,
      timer: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initCoinInfo();
    },
    initCoinInfo(){
      var query = this.$route.query;
      let coincode = query.coincode || '';
      let pairstype = query.type || '';
      if (coincode) {
        this.coincode = coincode;
      }
      if (!coincode || !pairstype) {
        return;
      }
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource: '1',
        currencytype:coincode,
        pairstype
      }).then((res) => {
        console.log('resres',res);
        var data = res.data;
        if (data.err_code == '1' && data.accountFund && data.accountFund.length) {
          var account = data.accountFund[0];
          this.transferForm.coin = account.currencyname;
          this.transferForm.usablefund = account.usablefund;
        } 
      }).catch((err) => {

      })
    },
    confirm() {
      var reqresource = 1;
      let { amount, address, pwd, coin, remark,smscode, name} = this.transferForm;
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
    accountRecords() {
      
    },
    send() {
      if (!this.userinfo.phone.value) {
        return;
      }
      if (!this.timer) {
        this.getCode();
        var num = 60;
        this.timer = setInterval(()=>{
          num -- ;
          if (num >= 1) {
            this.getCodeText = num + 's';
          } else {
            this.getCodeText = '重新获取';
            clearInterval(this.timer);
            this.timer = null;
          }
        },1*1000)
      }else {
        
      }
      
    },
    getCode() {
      this.$ajax({
        method: "post",
        url: "/trade/tps/pbaut.do",
        data: {
          // verifystr: this.tel,
          reqresource: 1,
          country_code:this.userinfo.country_code,
          phone:this.userinfo.phone.value,
          "type":"2"
          // "type":"mobile"
        }
      }).then((data)=>{
        if (data.data.err_code == "1") {
          this.$Notice.success({
            title: "验证码发送成功，请注意查收。",
            desc: "",
            top: 100
          });
          // $this.$Modal.info({
          // 	content:'验证码发送成功，请注意查收。'
          // })
        } else {
          this.$Notice.error({
            title: "验证码发送失败，请重新发送。",
            top: 100
          });
        }
      }).catch((err)=>{
        this.$Notice.error({
          top: 100,
          title: '验证码发送错误，请重新发送'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .transfer-form {
    width: 500px;
    padding: 40px 0;
  }
  .transfer-notification {
    padding: 20px;
    margin: 30px 0;
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
  .coin-record-title {
    color: #fff;
    font-size: 20px;
    padding: 20px 0 10px 0;
    display: inline-block;
    border-bottom: 2px solid #ff0;
    margin-bottom: 20px;
  }
  .divide-line {
    height: 1px;
    background: #999;
    margin: 20px 0;
  }
</style>
