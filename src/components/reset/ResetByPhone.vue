<template>
  <div class="reset-by-phone">
    <div class="reset-step">
      <!-- <Step :step="['01. 填写账户','02. 设置密码','03. 完成']" :currentStep="step"/> -->
    </div>
    <div class="reset-form">
      <div class="reset-form-inner">
        <h3 class="reset-title">您正通过 <span>手机</span> 找回登录密码</h3>
        <Form v-show="step == 1" ref="form1" :label-width="110" :model="resetForm" :rules="resetRules" style="width: 500px; margin: 0 auto;">
          <FormItem label="国家：" prop="country_code">
            <Select class="reset-select-country" v-model="resetForm.country_code">
              <Option v-for="(country,index) in countryList" :key="country.phone_code+index" :value="country.phone_code">{{country.name + '（'+country.phone_code + '）'}}</Option>
            </Select>
          </FormItem>
          <form-item label="手机号码：" prop="tel">
            <Input :class="'dark-mode'" type="text" size="large" placeholder="手机号码" v-model="resetForm.tel"/>
          </form-item>
          <form-item label="验证码：" prop="imgCode">
            <Input :class="'dark-mode'" type="text" placeholder="验证码" size="large" class="no-radius-input" v-model="resetForm.imgCode" style="width: 290px;"/>
            <img :src="imgSrc" class="img-code" alt="验证码"/>
            <div class="text-right" :style="{height:'20px'}" >
              <a href="javascript:;" @click="changeImg">刷新</a>图片验证码
            </div>
          </form-item>
          <form-item label="短信验证码：" prop="textCode">
            <Input type="text" placeholder="短信验证码" size="large" class="no-radius-input dark-mode" v-model="resetForm.textCode">
              <span slot="append" style="display:block;cursor:pointer;width: 80px;" @click="send">{{sendCodeText}}</span>
            </Input>
          </form-item>
          <!-- <FormItem prop="credentials" label="证件类型：">
            <Select style="width: 400px;display:inline-block;" v-model="resetForm.credentials">
              <Option value="1">身份证</Option>
            </Select>
          </FormItem>
          <form-item label="证件号码：" prop="credentialsNumber">
            <Input type="text" size="large" placeholder="证件号码" v-model="resetForm.credentialsNumber"/>
          </form-item> -->
          <div class="reset-btn-wrapper">
            <Button type="primary" size="large" class="btn-block" @click="next(2)">下一步</Button>
          </div>
        </Form>
        <Form v-show="step == 2" ref="form2" 
          :model="pwdForm"
          :rules="pwdRules"
          :label-width="100" style="width: 500px;margn: 0 auto">
          <!-- <FormItem label="登录账号：" prop="username">
            <Input size="large" v-model="pwdForm.username" placeholder="请输入您的登录手机号" value=""/>
          </FormItem> -->
          <div style="padding: 10px 0;">您正在找回密码的用户登录名是：<a>{{resetForm.tel}}</a>。</div>
          <FormItem label="新登录密码：" prop="pwd">
            <Input :class="'dark-mode'" size="large" type="password" v-model="pwdForm.pwd" placeholder="新登录密码，包含数字和大小写" value=""/>
          </FormItem>
          <FormItem label="确认密码：" prop="confirmpwd">
            <Input :class="'dark-mode'" size="large" type="password" v-model="pwdForm.confirmpwd" placeholder="确认密码" value=""/>
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
import { telReg,idReg } from '../constant/constant'
import Step from '../step';
var telValidator = (rules,value,c)=> {
  if (!telReg.test(value)) {
    c('请填写正确的电话号码');
  }
  c();
}
var resetRules = {
  country_code:[
    {required:true,message:'请输入手机代码',trigger:'blur'}
  ],
  tel:[
    {required:true,message:'请输入手机号码',trigger:'blur'},
    {validator:telValidator,trigger:'blur'}
  ],
  imgCode:[
    {required:true,message:'请输入图片验证码',trigger:'blur'},
    {pattern:/^\w{4}$/,message:'请输入4位正确的验证码',trigger:'blur'}
  ],
  textCode:[
    {required:true,message:'请输入短信验证码',trigger:'blur'},
    {type:'string',pattern:/^\d{4}$/,message:'请输入4位正确的短信验证码',trigger:'blur'}
  ],
  credentials:[
    {required:true}
  ],  
  credentialsNumber:[
    {required:true,message:'请输入身份证号码',trigger:'blur'},
    {pattern:idReg,message:'请输入正确的身份证号',trigger:'blur'}
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
var imgSrc = '/trade/tps/pbccs.do?t='+Date.now();
export default {
  data () {
    return {
      lang:'',
      countryList:[],
      userId:'',
      sendCodeText:'发送验证码',
      sendTimer:null,
      step:1,
      imgSrc,
      sendText:'发送验证码',
      country:'086',
      resetForm: {
        tel:'',
        credentials:'1',
        credentialsNumber:'',
        imgCode:'',
        textCode:'',
        country_code:''
      },
      pwdForm:{
        username:'',
        pwd:'',
        confirmpwd:''
      },
      resetRules:resetRules,
      pwdRules: {
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {pattern:telReg,message:'请输入合格的手机号码',trigger:'blur'}
        ],
        country_code:[
          {required:true,message:'请输入手机代码',trigger:'blur'}
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
  components:{
    Form,FormItem,Step
  },
  mounted () {
    this.getLanguage();
    this.initCountry();
  },
  updated(){
    // this.changeImg();
  },
  methods:{
    getLanguage () {
      var lang = '';
      if (navigator.language) {
        lang = navigator.language;
      }else if (navigator.browserLanguage) {
        lang = navigator.browserLanguage
      }else if (navigator.userLanguage) {
        lang = navigator.userLanguage
      }
      this.lang = lang;
    },
    initCountry () {
      this.$ajax.post('/trade/tps/pbcol.do',{
        is_page:0
      }).then((res) => {
        if (res.status == 200 && res.data.err_code == '1' && res.data && res.data.countries) {
          console.log('国家----------------',res,res.data);
          if (this.lang.match('zh-CN')) {
            this.countryList = res.data.countries.map((item,index) => {
              item.name = item.full_name;
              return item;
            });
            this.resetForm.country_code = '86';
          }else {
            this.countryList = res.data.countries.map((item,index) => {
              item.name = item.desc_en;
              return item;
            })
            this.resetForm.country_code = res.data.countries[0].phone_code;
          }
        }
      }).catch((err) => {
        console.log('获取国家列表失败',err);
        this.message.error('网络请求似乎除了问题，请稍后重试');
      })
    },
    changeImg(){
      this.imgSrc = imgSrc + '?t=' + Date.now();
    },
    send() {
      var tel = this.resetForm.tel.trim();
      if (!tel) {
        this.$Notice.error({
          title:'请输入手机号码',
        })
        return;
      }
      var that = this;
      if (this.sendTimer) {
        return false;
      }
      var num = 60;
      this.sendTimer = setInterval(function () {
        num --;
        if (num <= 1) {
          that.sendCodeText = '发送验证码';
          clearInterval(that.sendTimer);
          that.sendTimer = null;
        }else {
          that.sendCodeText = num + 's';
        }
      },1000)
      this.sendCode();
    },
    sendCode(){
      var that = this;
      var tel = this.resetForm.tel.trim();
      console.log(tel);
      this.$refs['form1'].validateField('tel',(valid)=>{
        if (!valid) {
          that.$ajax({
            method: "post",
            url: "/trade/tps/pbaut.do",
            data:{
              "phone":tel,
              reqresource:1,
              country_code:this.country,
              "type":"2"
              // "type":"mobile"
            }
          }).then(function(data){
            console.log(data)
            if(data.data.err_code == "1"){
              that.$Notice.success({
                title: '验证码发送成功，请注意查收。',
                desc: '',
                top: 100
              });
              // $this.$Modal.info({
              // 	content:'验证码发送成功，请注意查收。'
              // })
            }else{
              that.$Notice.error({
                title:'验证码发送失败，请重新发送。',
                top:100
              })
            }
          })
        }else {
          // that.$Notice.warning({
          //   title:'提示',
          //   desc:'请输入正确的手机号码'
          // })
          return;
        }
      })
    },
    verifyUser(){
      var modifytype = 2; //1邮箱 2手机
      var mobileno = this.resetForm.tel.trim();
      var reqresource = 1;
      var checkcode = this.resetForm.imgCode;
      var country_code = this.resetForm.country_code;
      var mobilecode = this.resetForm.textCode;
      this.$ajax.post('/trade/tps/pbrpw.do',{
        modifytype,mobileno,reqresource,checkcode,mobilecode,country_code
      }).then((res)=>{
        if (res.data && res.data.err_code == '1' && res.data.userId){
          this.step = 2;
          this.userId = res.data.userId;
        }else if (res.data && res.data.err_code != '1' && res.data.msg) {
          this.$Notice.warning({
            title:'提示',
            desc:res.data.msg+'，请稍后重试'
          })
        }else {
          this.$Notice.warning({
            title:'提示',
            desc:'查询失败，请稍后重试'
          })
        }
      }).catch((err) => {
        this.$Notice.warning({
          title:'提示',
          desc:'网络请求失败，请稍后重试'
        })
      })
    },
    changepwd(){
      var userId = this.userId;
      var anewpwd =this.pwdForm.pwd;
      var bnewpwd = this.pwdForm.confirmpwd;
      var reqresource = 1;
      this.$ajax.post('/trade/tps/pbmpw.do',{
        userId,anewpwd,bnewpwd,reqresource
      }).then((res)=>{
        if (res.data && res.data.err_code == '1'){
          this.step = 3;
        }else if (res.data && res.data.err_code != '1' && res.data.msg) {
          this.$Notice.warning({
            title:'提示',
            desc:res.data.msg+'，请稍后重试'
          })
        }else {
          this.$Notice.warning({
            title:'提示',
            desc:'设置密码失败，请稍后重试'
          })
        }
      }).catch((err) => {
        this.$Notice.warning({
          title:'提示',
          desc:'网络请求失败，请稍后重试'
        })
      })
    },
    next(value) {
      if (value == 2) {
        this.$refs['form1'].validate((valid) => {
          console.log('valid or not',valid);
          this.changeImg();
          if (valid ) {
            this.verifyUser();
          }
        })
      }else if (value == 3) {
        this.$refs['form2'].validate((valid) => {
          console.log('----valid----or----not',valid);
          if (valid) {
            this.changepwd();
          }
        })
      }
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
  }
  .no-radius-input .ivu-input {
    border-radius: 0;
  }
  .reset-form {
    width: 520px;
    margin: 0 auto;
    padding-bottom: 60px;
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
