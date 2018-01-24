<template>
  <div>
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
            <Button type="primary" :class="'verification-code-button'">获取验证码</Button>
          </FormItem>
          <br />
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" :class="'login-form-button'">登录</Button>
          </FormItem>
        </Form>
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
          console.log("valid===",valid);
          if (valid) {
            this.Message.success('Success!');
            this.timeoutDate()
          } else {
            this.Message.error('Fail!');
          }
        })
      },
      timeoutDate(){   //查询数据
        this.handleSpinCustomShow();
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
          $this.handleSpinCustomClose();
          console.log(response);
        }).catch(function (error) {
          $this.handleSpinCustomClose();
          console.log(error);
        });
      },
      handleSpinCustomShow () {
        this.Spin.show({
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
      handleSpinCustomClose (){
        this.Spin.hide();
        this.Message.success('Success!');
      }
    }
  }
</script>

<style>
  .wallet-box{
    width: 100%;
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
