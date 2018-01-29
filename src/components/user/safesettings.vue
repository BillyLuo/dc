<template>
  <div class="safe-settings">
    <Row>
      <Col span="8">
        <div class="setting-item bind-email">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>绑定您的邮箱</h3>
              <a href="javascipt:;" @click="openEmailModal">未绑定</a>
             </div>
             <a href="javascript:;" @click="openEmailModal" class="item-status">绑定</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-name">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>实名认证</h3>
              <a href="javascipt:;">已认证</a>
             </div>
             <a href="javascript:;" class="item-status">您的账号已通过实名认证</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-phone">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>手机绑定</h3>
              <a href="javascipt:;">1517****4695</a>
             </div>
             <a href="javascript:;" class="item-status" @click="openTelModal">修改</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-code">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>谷歌验证码</h3>
              <a href="javascipt:;">未绑定</a>
             </div>
             <a href="javascript:;" class="item-status">绑定</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-loginpass">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>登录密码设置</h3>
              <a href="javascipt:;">已设置</a>
             </div>
             <a href="javascript:;" class="item-status" @click="openLoginPassModal">修改</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-tradepass">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>交易密码设置</h3>
              <a href="javascipt:;" @click="openTradePassModal">未设置</a>
             </div>
             <a href="javascript:;" class="item-status" @click="openTradePassModal">绑定</a>
          </div>
        </div>
      </Col>
    </Row>
    <Modal
        title="邮箱认证"
        v-model="emailModal"
        :loading="emailLoading"
        @on-ok="email_ok"
        @on-cancel="email_cancel">
        <Input placeholder="邮箱地址" v-model="input_email"/>
    </Modal>
    <Modal
        title="修改手机"
        v-model="telModal"
        :loading="true"
        @on-ok="tel_ok">
        <Form ref="modifyTel" :model="modifyTel" :rules="modifyTelRules" :label-width="80">
          <FormItem label="Name" prop="name">
              <Input v-model="modifyTel.tel" :placeholder="modifyTel.tel" disabled />
          </FormItem>
          <FormItem label="短信验证码" prop="mail">
              <Input v-model="modifyTel.code" placeholder="短信验证码" />
          </FormItem>
          </Form>
    </Modal>
    <Modal
        title="邮箱认证"
        v-model="emailModal"
        :loading="emailLoading"
        @on-ok="email_ok">
        <Input placeholder="邮箱地址" v-model="input_email"/>
    </Modal>
    <Modal
        title="修改登录密码"
        v-model="loginPassModal"
        @on-ok="loginPassModal">
    </Modal>
    <Modal
        title="设置交易密码"
        v-model="tradePassModal"
        @on-ok="trade_pass_ok">
    </Modal>
    <Modal
        title="修改手机"
        v-model="phoneModal"
        @on-ok="phone_ok">
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem } from 'iview';
export default {
  data () {
    return {
      emailModal: false,
      telModal:false,
      loginPassModal: false,
      tradePassModal: false,
      phoneModal: false,
      input_email:'',
      emailLoading:true,
      modifyTel:{
        tel:'15178875695',
        code:''
      },
      modifyTelRules:{
        tel:[
          {required:true},
          {type:'tel'}
        ],
        code:[
          {required:true,message:'请输入验证码',min:5,trigger:'blur'},
          {type:'string',min:5}
        ]
      }
    }
  },
  components:{
    Form,
    FormItem
  },
  methods:{
    openEmailModal(){
      this.emailModal = true;
    },
    email_ok () {
      console.log('ok email',arguments);
      let email = this.input_email;
      if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
        setTimeout(()=>{
          this.input_email = '';
          this.$Message.success('邮箱设置成功。');
          this.emailModal = false;
        },1000)
      }else {
        console.log('wrong');
        this.emailLoading = false;
        this.$Message.warning('请输入正确的邮箱');
      }
    },
    openTelModal(){
      this.telModal = true;
    },
    tel_ok(){
      this.$refs['modifyTel'].validate((valid)=>{
        console.log('valid or not',valid);
      })
    },
    email_cancel (){
      console.log('cancel email',arguments);
    },
    openLoginPassModal(){
      this.loginPassModal = true;
    },
    login_pass_ok (){

    },
    openTradePassModal (){
      this.tradePassModal = true;
    },
    trade_pass_ok (){

    },
    openPhoneModal (){
      this.phoneModal = true;
    },
    phone_ok (){

    }
  }
}
</script>

<style lang="scss">
  .setting-item {
    width: 300px;
    height: 150px;
    border: 1px solid #eee;
    margin: 20px auto;
    border-radius: 4px;
    position: relative;
    .item-pic {
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 35px 30px;
      vertical-align: middle;
      i {
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-image: url(/static/img/icon-info.png);
        background-repeat: no-repeat;
      }
    }
    .item-content {
      margin-top: 50px;
      // width: 180px;
      text-align: left;
      h3 {
        color: #666;
        font-weight: 400;
      }
      a {
        font-size: 12px;
      }
    }
    .item-status {
      position: absolute;
      top: 0;
      right: 0;
      color: #aaa;
      font-size: 12px;
      padding: 10px;
      &:hover {
        color: #333;
      }
    }
  }
  $bind-email-color: #6dea6a;
  $bind-name-color: #6ABEEA;
  $bind-phone-color: #CA78FA;
  $bind-code-color: #6F7BF3;
  $bind-loginpass-color: #F4E058;
  $bind-tradepass-color: #FFA257;

  .safe-settings .ivu-col {
    .bind-email{
      i {
        background-position: 0 0;
        background-color: $bind_email_color;
      }
      &:hover {
        border-color: $bind_email_color;
      }
    }
    .bind-name{
      i {
        background-position: 0 -70px;
        background-color: $bind-name-color;
      }
      &:hover {
        border-color: $bind_name_color;
      }
    }
    .bind-phone{
      i {
        background-position: 0 -140px ;
        background-color: $bind-phone-color;
      }
      &:hover {
        border-color: $bind_phone_color;
      }
    }
    .bind-code {
      i {
        background-position: 0 -210px;
        background-color: $bind-code-color;
      }
      &:hover {
        border-color: $bind_code_color;
      }
    }
    .bind-loginpass {
      i {
        background-position: 0 -280px ;
        background-color: $bind-loginpass-color;
      }
      &:hover {
        border-color: $bind_loginpass_color;
      }
    }
    .bind-tradepass{
      i {
        background-position: 0 -350px ;
        background-color: $bind-tradepass-color;
      }
      &:hover {
        border-color: $bind_tradepass_color;
      }
    }
  }
</style>
