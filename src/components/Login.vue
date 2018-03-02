<template>
  <div>
    <div class="wallet-box-background">
      <div class="wallet-box">
        <div class="login-left">
          <img src="/static/img/bg-user.jpg" alt="" width="100%" height="100%">
        </div>
        <div class="login-right">
          <div style="width:100%" :class="'login-card'">
            <div style="text-align:center">
              <img src="/static/img/logo.png">
              <h3>登录蜂巢币-fclink</h3>
            </div>
          </div>
          <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :class="'login-form-all'">
            <div style="height:38px;">
              <Alert type="error" show-icon :class="loginError.length>0?'show':'hide'">{{loginError}}</Alert>
            </div>
            <FormItem prop="user">
              <Input @on-enter="handleSubmit('formInline')" type="text" v-model="formInline.user" placeholder="输入邮箱/手机号" :class="'login-input'">
              <Icon type="ios-person-outline" slot="prepend" :class="'login-input-icon'"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input @on-enter="handleSubmit('formInline')" type="password" v-model="formInline.password" placeholder="密码" :class="'login-input'">
              <Icon type="ios-locked-outline" slot="prepend" :class="'login-input-icon'"></Icon>
              </Input>
            </FormItem>
            <!-- <FormItem prop="tel">
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
            </FormItem> -->
            <FormItem>
              <Checkbox v-model="rememberpass" @on-change="togglepass">记住密码</Checkbox>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')" :class="'login-form-button'">登录</Button>
            </FormItem>
            <div style="font-size: 12px;">
              <span  class="color-999" >没有账号？ </span><a href="javascript:;" @click="goRigister"> 请注册</a> <a class="float-right" href="javascript:;" @click="resetpass">忘记密码？</a>
            </div>
          </Form>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  import { Form, FormItem, } from 'iview'
  import nodeForge from 'node-forge';
  import cookies from 'cookiesjs';
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
      let validateUser = (rule,value,c) => {
        if (!value) {
          c('请输入账号');
        }else if (!(value.match(/^1[34578]\d{9}$/) || value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
          c('手机或者邮箱格式有误');
        }else {
          c();
        }
      }
      let validatePwd = (rule,value,c) => {
        if (!value) {
          c('请输入密码');
        }else if (!value.match(/[a-z]/g) || !value.match(/[A-Z]/g) || !value.match(/\d/g)){
          c('密码应至少包含1个大写字母，1个小写字母和1个数字');
        }else if (value.length < 8) {
          c('密码不能小于8位。')
        }else if (value.length > 64 ){
          c('密码不能大于64位');
        }else if (value.match(/[^a-zA-Z0-9_]/g)) {
          c('密码不应包含特殊字符');
        }else {
          c();
        }
      }
      return {
        formInline: {
          user: 'finchain',
          password: '123456',
          tel:'15373872695',
          verificationCode:'2234'
        },
        loginError:'',
        rememberpass:'记住密码',
        telCodeText:'发送验证码',
        telCodeDisabled:false,
        ruleInline: {
          user: [
            { validator:validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePwd, trigger: 'blur' },
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
      togglepass(value) {
        // console.log(value);
      },
      resetpass () {
        this.$router.push({
          path:'/reset'
        })
      },
      goRigister () {
        this.$router.push({
          path:'/register'
        })
      },
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
          $this.$Message.warning('短信发送失败，请稍后重试');
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
      },
      timeoutDate(){   // 后台数据验证
        let $this = this;
        let md = nodeForge.md.md5.create();
        md.update(this.formInline.password);
        const password = md.digest().toHex();
        
      },
      handleSpinCustomShow () {   // loading
        var that = this;
        var loginname = this.formInline.user;
        var pwd = this.formInline.password;
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
              h('div', '登录中...')
            ])
          }
        });
        if (this.loginError) {
          return;
        }
        this.$ajax({
          method:'post',
          url:'/bizs/tps/pblin.do',
          data:{
            loginname,
            pwd
          }
        }).then((data)=>{
          console.log(data);
          that.$Spin.hide();
          if (data.status == 200 && data.data.err_code == '1') {
            that.$router.push({
              name:'Home',
              params:{
                isLogined:true
              }
            })
            cookies({
              name: loginname
            },{
              expires: 60*30
            })
          }else {
            that.loginError = '您输入的账号或密码有误';  
            setTimeout(() => {
              that.loginError = '';
            }, 3000);          
          }
        }).catch((err)=>{
          console.log('wrong---',err);
          that.$Spin.hide();
        })
        // setTimeout(() => {
        //   this.$Spin.hide();
        //   this.$router.push({
        //     name:'Home',
        //     params:{
        //       isLogined:true
        //     }
        //   })
        // },1000);
      },
    }
  }
</script>

<style>
  .wallet-box-background{
    width: 100%;
    background: #f9f9f9;
    padding: 20px 0;
    height: 585px;
  }
  .wallet-box{
    width: 1200px;
    margin: 0 auto;
  }
  .login-left{
    width: 800px;
    height: 450px;
    float: left;
  }
  .login-right{
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
    padding: 10px 0;
    outline: none;
    box-shadow: 0;
  }
  .login-card .ivu-card-body{
    padding-top: 0;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
