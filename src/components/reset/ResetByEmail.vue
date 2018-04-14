<template>
  <div class="reset-by-email wrapper">
    <div class="reset-step">
      <Step :step="['01. 填写账户','02. 设置密码','03. 完成']" :currentStep="step" />
    </div>
    <div class="reset-form">
      <div class="reset-form-inner">
        <h3 class="reset-title">您正通过 <span>电子邮件</span> 找回登录密码</h3>
        <Form v-show="step == 1" ref="form1" :label-width="100" :model="resetForm" :rules="resetRules" style="width: 500px; margin: 0 auto;">
          <form-item label="邮箱地址：" prop="email">
            <Input type="email" size="large" :maxlength="50" placeholder="邮箱地址" v-model="resetForm.email">
              <span slot="append" :style="{cursor:'pointer'}" @click="validateEmail">{{sendEmailText}}</span>
            </Input>
          </form-item>
          <form-item label="邮箱验证码：" prop="emailCode">
            <Input type="text" size="large" :maxlength="6" placeholder="邮箱验证码" v-model="resetForm.emailCode"/>
          </form-item>
          <!-- <form-item prop="credentials" label="证件类型： ">
            <Select style="width: 400px;display:inline-block;" v-model="resetForm.credentials">
              <Option value="1">身份证</Option>
            </Select>
          </form-item>
          <form-item label="证件号码：" prop="credentialsNumber">
            <Input type="text" size="large" placeholder="证件号码" v-model="resetForm.credentialsNumber"/>
          </form-item> -->
          <form-item label="验证码：" prop="imgCode">
            <Input type="text" placeholder="验证码" size="large" class="no-radius-input" @on-enter="submitEmail" v-model="resetForm.imgCode" style="width: 300px;"/>
            <img :src="imgSrc" class="img-code" @click="changeImgCode"/>
            <div class="text-right" style="padding-top:6px;height: 20px;"><a href="javascript:;" @click="changeImgCode">刷新</a>验证码</div>
          </form-item>
          <div class="reset-btn-wrapper">
            <Button type="primary" size="large" class="btn-block" @click="submitEmail">提交</Button>
          </div>
        </Form>
          <Form v-show="step == 2" ref="pwdForm" 
            :model="pwdForm"
            :rules="pwdRules"
            :label-width="100" style="width: 500px;margn: 0 auto">
            <!-- <FormItem label="登录账号：" prop="username">
              <Input size="large" v-model="pwdForm.username" placeholder="用户名" value=""/>
            </FormItem> -->
            <div style="padding: 10px 0;">您正在找回密码的用户登录名是：<a>{{resetForm.email}}</a>。</div>
            <FormItem label="新登录密码：" prop="pwd">
              <Input size="large" type="password" v-model="pwdForm.pwd" placeholder="新登录密码，包含数字和大小写" value=""/>
            </FormItem>
            <FormItem label="确认密码：" prop="confirmpwd">
              <Input size="large" type="password" v-model="pwdForm.confirmpwd" placeholder="确认密码" value=""/>
            </FormItem>
            <div class="reset-btn-wrapper">
              <Button type="primary" size="large" class="btn-block" @click="next(3)">下一步</Button>
            </div>
          </Form>
        <div v-show="step == 3">
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
import { idReg } from '../constant/constant';
import Step from '../step';
var emailValidator = (rules,value,c)=> {
  if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    c('请填写正确的email');
  }else {
    c();
  };
}
var resetRules = {
  email:[
    {required:true,message:'请输入邮箱地址',trigger:'blur'},
    {max:50,message:'邮箱地址过长',trigger:'blur'},
    {validator:emailValidator,trigger:'blur'}
  ],
  emailCode:[
    {required:true,message:'请输入邮箱密码',trigger:'blur'},
    {len:6,message:'请输入6位邮箱验证码',trigger:'blur'},
    {pattern:/\w{6}/,message:'验证码不应包含特殊字符',trigger:'blur'}
  ],
  credentials:[
    {required:true}
  ],
  credentialsNumber:[
    {required:true,message:'请输入证件号码',trigger:'blur'},
    {type:'string',pattern:idReg,message:'请输入正确的身份证号码',trigger:'blur'}
  ],
  imgCode:[
    {required:true,message:'请输入图片验证码',trigger:'blur'},
    {type:'string',len:4,pattern:/^\w{4}$/,message:'请输入4位图片验证码',trigger:'blur'}
  ]
};
var pwdValidator = (rules,value,c) => {
  if (!value) {
    c('请输入密码');
  }
  if (value.length > 20 || value.length < 8) {
    c('密码应该在8-20位');
  }
  if (!value.match(/^\w{8,20}$/g)) {
    c('密码不应包含特殊字符');
  }
  if (!value.match(/[a-z]/g) || !value.match(/[0-9]/g) || !value.match(/[A-Z]/g)) {
    c('密码应该至少包含一个大写字母，一个小写字母和一个数字');
  }
  if (!value.match(/^[a-zA-Z]/g)) {
    c('密码应以字母开头');
  }
  c();
}
console.log('reset---rules',resetRules);
export default {
  data () {
    return {
      step:1,
      sendEmailText:'发送邮箱验证码',
      emailTimer:null,
      imgSrc:'/trade/tps/pbccs.do',
      sendText:'发送验证码',
      userId:'',
      resetForm: {
        email:'',
        emailCode:'',
        credentials:'1',
        credentialsNumber:'',
        imgCode:''
      },
      pwdForm:{
        username:'',
        pwd:'',
        confirmpwd:''
      },
      resetRules,
      pwdRules: {
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {type:'email',max:50,message:'请输入合格的用户名',trigger:'blur'}
        ],
        pwd:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {type:'string',min:8,max:20,message:'请输入8-20位密码',trigger:'blur'},
          {validator:pwdValidator,trigger:'blur'}
        ],
        confirmpwd:[
          {required:true,message:'请再次输入密码',trigger:'blur'},
          {
            validator:(rules,value,c) => {
              let { pwd , confirmpwd } = this.pwdForm;
              if (pwd != confirmpwd) {
                c('两次密码输入不一致');
              }else {
                c();
              }
            },trigger:'blur'
          }
        ]
      }
    }
  },
  mounted(){
    console.log(this.$route);
    var query = this.$route.query;
    if (query && query.step) {
      console.log(query.step.match(/^[123]{1}$/g));
      if (query.step.match(/^[123]{1}$/g)) {
        this.step = query.step;
      }else {
        this.step = 1;
      }
    }
  },
  components:{
    Form,FormItem,Step
  },
  methods:{
    sendEmail(){
      var that = this;
      if (this.emailTimer) {
        return false;
      }
      var num = 60;
      this.emailTimer = setInterval(()=>{
        num --;
        if (num > 0) {
          that.sendEmailText = num + 's后重试';
        }else {
          clearInterval(that.emailTimer);
          that.sendEmailText = '发送邮箱验证码';
          that.emailTimer = null;
        }
      },1000);
    },
    validateEmail () {
      this.$refs['form1'].validateField('email',(valid)=>{
        if (!valid) {
          this.sendEmail();
        }
      })
    },
    emailInputBlur () {
      console.log('blur');
      var email = this.resetForm.email.trim();
      var modifytype = 1; //1邮箱 2手机
      var reqresource = 1;
      var checkcode = this.resetForm.imgCode;
      var emailcode = this.resetForm.emailCode;
      this.resetForm.imgCode = '';
      return this.$ajax.post('/trade/tps/pbrpw.do',{
        reqresource,
        modifytype,
        email,
        emailcode,
        checkcode
      }).then((res) => {
        console.log('res',res.data);
        if (res.data && res.data.err_code == '1' && res.data.userId) {
          this.step = 2;
          this.userId = res.data.userId;
        }else if (res.data && res.data.err_code != '1' && res.data.msg){
          this.$Notice.warning({
            title:'提示',
            desc:res.data.msg +'，请重试'
          })
        }else {
          this.$Notice.warning({
            title:'提示',
            desc:'用户名不存在'
          })
        }
      }).catch((err)=>{
        console.log('err');
        this.$Notice.warning({
          title:'提示',
          desc:'查询出错，请稍后重试'
        })
      })
    },
    changeImgCode() {
      this.imgSrc = '/trade/tps/pbccs.do?t=' + Date.now();
    },
    submitEmail(){
      this.$refs['form1'].validate((valid)=>{
        if (valid) {
          this.changeImgCode();
          this.emailInputBlur();
          
          // this.step = 2;
        }
      })
    },
    changePwd(){
      var userId = this.userId;
      var anewpwd = this.pwdForm.pwd.trim();
      var bnewpwd = this.pwdForm.confirmpwd.trim();
      var reqresource = 1;
      this.$ajax.post('/trade/tps/pbmpw.do',{
        userId,anewpwd,bnewpwd,reqresource
      }).then((res)=>{
        console.log(res);
        if (res.data && res.data.err_code == '1') {
          this.step = 3;
        }else if (res.data && res.data.err_code != '1' && res.data.msg) {
          this.$Notice.waning({
            title:'提示',
            desc:res.data.msg+',请稍后重试'
          }) 
        }else {
          this.$Notice.waning({
            title:'提示',
            desc:'修改失败，请稍后重试'
          })
        }
      }).catch((err)=>{
        this.$Notice.waning({
          title:'提示',
          desc:'网络请求失败，请稍后重试'
        })
      })
    },
    next(value) {
      this.$refs['pwdForm'].validate((valid)=>{
        console.log('valid or not',valid);
        if (valid) {
          this.changePwd();
        }
      })

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
