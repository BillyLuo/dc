<template>
  <div>
    <div class="wallet-box-background">
      <div class="wallet-box">
        <div class="login-left">
          <img src="/static/img/bg-user.jpg" alt="" width="100%" height="100%">
        </div>
        <div class="login-rigth">
          <Card style="width:100%" :class="'login-card'">
            <div style="text-align:center">
              <img src="/static/img/logo.png">
              <h3>登录蜂巢币-fclink</h3>
            </div>
          </Card>
          <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :class="'login-form-all'">
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="输入邮箱/手机号" :class="'login-input'">
              <Icon type="ios-person-outline" slot="prepend" :class="'login-input-icon'"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="密码" :class="'login-input'">
              <Icon type="ios-locked-outline" slot="prepend" :class="'login-input-icon'"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="tel">
              <Input type="text" v-model="formInline.tel" placeholder="手机号" :class="'login-input'">
              <Icon type="ios-telephone-outline" slot="prepend" :class="'login-input-icon'"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="verificationCode">
              <Input type="text" v-model="formInline.verificationCode" placeholder="验证码" :class="'login-input'" style="width: 200px">
              </Input>
              <Button type="primary" :class="'verification-code-button'" @click="telCodeButtonClick" :disabled="telCodeDisabled">
                {{ telCodeText }}
              </Button>
            </FormItem>
            <br />
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')" :class="'login-form-button'">登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  import { Form, FormItem, } from 'iview'
  import nodeForge from 'node-forge';
  export default {
    components:{
      Form,FormItem
    },
    data () {
      const validateTel = (rule, value, callback)=> {
          if(value === ''){
              callback(new Error("请输入手机号"))
          }else if(value && !(/^1[34578]\d{9}$/.test(value))){
            callback(new Error("手机号格式不正确"))
          }else{
            callback()
          }
      };
      return {
        formInline: {
          user: '',
          password: '',
          tel:'',
          verificationCode:''
        },
        telCodeText:'发送验证码',
        telCodeDisabled:false,
        ruleInline: {
          user: [
            { required: true, message: '请输入邮箱或姓名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码.', trigger: 'blur' },
            { type: 'string', min: 8, message: '密码不能小于8位', trigger: 'blur' }
          ],
          tel: [
            { validator: validateTel, trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: '请输入验证码.', trigger: 'blur' },
          ]
        },
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login()
          }
        })
      },
      telCodeButtonClick(){     // 短信button 事件
        if(this.formInline.tel && (/^1[34578]\d{9}$/.test(this.formInline.tel))){
          this.telCodeTimeOut();
          this.getCode()
        }else{
          this.$Message.error('请输入手机号');
        }
      },
      telCodeTimeOut(){   //验证码倒计时
        let $this = this;
        this.telCodeText = 60;
        this.telCodeDisabled = true;
        this.getCodeTimeOut = setInterval(function(){
          $this.telCodeText -=1;
          if($this.telCodeText <=1){
            clearTimeout($this.getCodeTimeOut);
            $this.telCodeText = "重新获取";
            $this.telCodeDisabled = false;
          }
        },1000);
      },
      getCode(){    // 获取验证码  发送短信
        let $this = this;
        this.$ajax({
          method: 'post',
          url: '/bizs/biz/pbsms.do?fh=LIOCOD0000000J00&resp=bd',
          data: {
            tel:this.formInline.tel
          }
        }).then(function (response) {
          if(response.data.err_code == 1){
            $this.$Message.success('短信发送成功');
          }else{
            $this.$Message.success('短信获取失败');
          }
        }).catch(function (error) {
          $this.$Message.success('失败');
          console.log(error);
        });
      },
      login(){    // 登录
        if(this.formInline.verificationCode){
          this.codeCompare();
        }else{
          $this.$Message.error('请输入验证码');
        }
      },
      codeCompare(){   // 验证码对比
        this.handleSpinCustomShow();
        let $this = this;
        this.$ajax({
          method: 'post',
          url: '/bizs/biz/pbmcd.do?fh=REGBIZ0000000J00&resp=bd',
          data: {
            input_code:this.formInline.verificationCode
          }
        }).then(function (response) {
          if(response.data.err_code == 1){
            $this.timeoutDate();  // 后台数据验证
          }else{
            $this.$Spin.hide();
            $this.$Message.error('验证码错误');
          }
        }).catch(function (error) {
          $this.$Spin.hide();
          $this.$Message.success('失败');
          console.log(error);
        });
      },
      timeoutDate(){   // 后台数据验证
        let $this = this;
        let md = nodeForge.md.md5.create();
        md.update(this.formInline.password);
        const password = md.digest().toHex();
        this.$ajax({
          method: 'post',
          url: 'bizs/lio/pblin.do?fh=LINLIO0000000J00&resp=bd',
          data: {
            "user_name":this.formInline.user,
            "password":password,
            "login_type":1,
            "menu_type":1
          }
        }).then(function (response) {
          $this.$Spin.hide();
          if(response.data.err_code == "1"){
            $this.$Message.success('登录成功!');
          }else if(response.data.err_code == "2"){
            $this.$Message.error('用户名或密码错误!');
          }
        }).catch(function (error) {
          $this.$Spin.hide();
          console.log(error);
        });
      },
      handleSpinCustomShow () {   // loading
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'load-c',
                  size: 18
                }
              }),
              h('div', '验证消息中...')
            ])
          }
        });
      },
    }
  }
</script>

<style>
  .wallet-box-background{
    width: 100%;
    background: #f9f9f9;
  }
  .wallet-box{
    width: 1200px;
    margin: 0 auto;
    height: 585px;
    padding: 45px 0 65px 0;
  }
  .login-left{
    width: 800px;
    height: 450px;
    float: left;
  }
  .login-rigth{
    width: 400px;
    box-sizing: border-box;
    padding: 25px 45px 45px 45px;
    height: 450px;
    float: right;
    background: #fff;

  }
  .login-form-all>.ivu-form-item{
    width:100%;
    margin: 0 0 20px 0;
  }
  .login-input>.ivu-input-group-prepend{
    height: 50px;
  }
  .login-input-icon{
    font-size: 20px;
    font-weight: 600;
  }
  .login-input>.ivu-input{
    height:50px;
    background: #fafafa;
  }
  .verification-code-button{
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0;
    border-style: none;
    height: 50px;
    width: 110px;
  }
  .login-form-button{
    width: 100%;
    height: 50px;
  }
  .login-card{
    background: #ffffff69;
    border: none;
  }
  .login-card .ivu-card-body{
    padding-top: 0;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
