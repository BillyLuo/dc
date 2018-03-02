<template>
  <div class="reset-by-phone wrapper">
    <div class="reset-step">
      <Step :step="['01. 填写账户','02. 设置密码','03. 完成']" :currentStep="step"/>
    </div>
    <div class="reset-form">
      <div class="reset-form-inner">
        <h3 class="reset-title">您正通过 <span>手机</span> 找回登录密码</h3>
        <Form v-if="step == 1" :label-width="100" :model="resetForm" :rules="resetRules" style="width: 500px; margin: 0 auto;">
          <form-item label="手机号码：" prop="tel">
            <Input type="text" size="large" placeholder="手机号码" v-model="resetForm.tel"/>
          </form-item>
          <form-item label="验证码：" prop="imgCode">
            <Input type="text" placeholder="验证码" size="large" class="no-radius-input" v-model="resetForm.imgCode" style="width: 300px;"/>
            <img src="/static/img/VScode.jpg" class="img-code"/>
          </form-item>
          <form-item label="短信验证码：" prop="textCode">
            <Input type="text" placeholder="短信验证码" size="large" class="no-radius-input" v-model="resetForm.textCode" style="width: 296px;"/>
            <Button type="primary" size="large" style="width: 100px;">发送验证码</Button>
          </form-item>
          <FormItem prop="credentials">
            <span class="credentials-type">证件类型：</span>
            <Select style="width: 400px;display:inline-block;" v-model="resetForm.credentials">
              <Option value="1">身份证</Option>
            </Select>
          </FormItem>
          <form-item label="证件号码：" prop="credentialsNumber">
            <Input type="text" size="large" placeholder="证件号码" v-model="resetForm.credentialsNumber"/>
          </form-item>
          <div class="reset-btn-wrapper">
            <Button type="primary" size="large" class="btn-block" @click="next(2)">下一步</Button>
          </div>
        </Form>
        <Form v-if="step == 2" :label-width="100" style="width: 500px;margn: 0 auto">
          <FormItem label="登录账号：" prop="loginname">
            <Input size="large" value=""/>
          </FormItem>
          <FormItem label="新登录密码：" prop="pwd">
            <Input size="large" placeholder="新登录密码" value=""/>
          </FormItem>
          <FormItem label="确认密码：" prop="repeatPwd">
            <Input size="large" placeholder="确认密码" value=""/>
          </FormItem>
          <div class="reset-btn-wrapper">
            <Button type="primary" size="large" class="btn-block" @click="next(3)">下一步</Button>
          </div>
        </Form>
        <div v-if="step == 3">
          <h3 class="reset-success">恭喜，重置登录密码成功</h3>
          <div class="reset-btn-wrapper">
            <Button type="primary" size="large" class="btn-block" @click="login">立即登录</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, FormItem } from 'iview';
import Step from '../step';
var telValidator = (rules,value,c)=> {
  if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    c('请填写正确的电话号码');
  }else {
    c();
  };
}
var resetRules = {
  tel:[
    {validator:telValidator,trigger:'blur'}
  ]
};
console.log('reset---rules',resetRules);
export default {
  data () {
    return {
      step:1,
      sendText:'发送验证码',
      resetForm: {
        tel:'15178873838',
        credentials:'1',
        credentialsNumber:'3532534235434324234324',
        imgCode:'',
        textCode:'1231'
      },
      resetRules:resetRules
    }
  },
  components:{
    Form,FormItem,Step
  },
  methods:{
    next(value) {
      this.step = value;
    },
    login(){
      this.$router.push({
        name:'Login'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .reset-step {
    padding-bottom: 10px;
    margin: 20px 0;
    background: #fff;
  }
  .no-radius-input .ivu-input {
    border-radius: 0;
  }
  .reset-form {
    padding: 40px 350px 60px;
    background: #fff;
    .ivu-form-item {
      margin: 30px 0;
    }
    .ivu-form-item-label{
      font-size: 14px;
    }
  }
  .reset-title {
    text-align: center;
    font-weight: normal;
    span {
      color: #3166D2;
    }
    height: 60px;
    line-height: 60px;
    border-bottom: 3px solid #3166D2;
    margin-bottom: 20px;
  }
  .credentials-type {
    display: block;
    width: 100px;
    text-align: right;
    height: 32px;
    padding-right: 12px;
    line-height: 32px;
    position: absolute;
    top: 0;
    left: -100px;
  }
  .reset-btn-wrapper {
    margin: 10px 0;
  }
  .img-code {
    width: 100px;
    height: 36px;
    float: right;
    vertical-align: middle;
  }
  .reset-success {
    text-align: center;
    font-weight: normal;
    margin: 80px 0;
  }
</style>
