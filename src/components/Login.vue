<template>
  <div class="login-wrapper">
    <div class="ivu-modal-mask"></div>
    <div class="ivu-modal-wrap">
      <div class="ivu-modal">
        <div class="wallet-box-background">
          <div class="wallet-box clear">
            <div class="close-login" @click.stop="closeModal($event)">
              <Icon type="close"></Icon>
            </div>
            <div class="login-left">
              <div class="login-img">
                
              </div>
              <div class="mask">
                <div class="mask-inner">
                  <div class="mask-logo">
                    <img src="/static/img/logo.png"/>
                    <h2>币邦</h2>
                  </div>
                  <div class="mask-line"></div>
                  <div class="mask-content">
                    <h3>全球领先的数字资产交易平台</h3>
                    <h4>The Leading Global Digital Asset Exchange</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="login-right">
              <div style="width:100%" :class="'login-card'">
                <div class="text-left">
                  <!-- <img src="/static/img/logo.png"> -->
                  <h3>账号登录</h3>
                </div>
              </div>
              <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :class="'login-form-all'">
                <div style="height:38px;">
                  <Alert type="error" show-icon :class="loginError.length>0?'show':'hide'">{{loginError}}</Alert>
                </div>
                <FormItem prop="country_code">
                  <div class="login-label">国家</div>
                  <Select class="select-country" v-model="formInline.country_code">
                    <Option v-for="(country,index) in countryList" :key="country.phone_code+index" :value="country.phone_code">{{country.name + '（'+country.phone_code + '）'}}</Option>
                  </Select>
                  </Input>
                </FormItem>
                <FormItem prop="user">
                  <div class="login-label">手机号码 / 邮箱</div>
                  <input @keyup.enter="handleSubmit('formInline')" type="text" :maxlength="50" v-model="formInline.user" placeholder="输入邮箱/手机号" :class="'login-input'">
                  <Icon type="ios-person-outline" slot="prepend" :class="'login-input-icon'"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <div class="login-label">密码</div>
                  <input @keyup.enter="handleSubmit('formInline')" type="password" autocomplete="new-password" v-model="formInline.password" placeholder="密码" :class="'login-input'">
                  <Icon type="ios-locked-outline" slot="prepend" :class="'login-input-icon'"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="checkcode" :class="'item-checkcode'">
                  <div class="login-label">验证码</div>
                  <div class="clear" style="position:relative">
                    <input class="login-input float-left" v-model="formInline.checkcode" placeholder="请输入图片验证码" @keyup.enter="handleSubmit('formInline')">
                    <img class="checkcode float-right" :src="checkUrl" @click="changeCode"/>
                  </div>
                  <div style="text-align: right;padding: 4px;height: 20px;">看不清？<a href="javascript:;" @click="changeCode">换一张图片</a>。</div>
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
                <!-- <div style="padding: 4px 0 15px 0;">
                  <Checkbox v-model="rememberpass" @on-change="togglepass">记住密码</Checkbox>
                </div> -->
                <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')" :class="'login-form-button'">登录</Button>
                </FormItem>
                <div style="font-size: 12px;margin-top: 60px;">
                  <a class="float-left reset-pass" style="margin-right: 20px" href="javascript:;" @click="resetpass">忘记密码？</a>
                  <span  class="register-btn" >还没有账号？ </span><a href="javascript:;" @click="goRigister"> 注册</a> 
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { Form, FormItem, } from 'iview'
  import nodeForge from 'node-forge';
  import cookies from 'cookies-js';
  export default {
    components:{
      Form,FormItem
    },
    mounted(){
      this.getLanguage();
      this.initCountry();
    },
    updated(){
    },
    data () {
      const validateTel = (rule, value, callback)=> {
          if(value === ''){
              callback(new Error("请输入手机号"))
          }else if(value && !(/^1[34578]\d{9}$/.test(value))){
            callback(new Error("请输入11位正确的手机号"))
          }else{
            callback()
          }
      };
      let validateUser = (rule,value,c) => {
        if (!value) {
          c('请输入账号');
        }else if (!(value.match(/^1[34578]\d{9}$/) || value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
          c('手机或者邮箱格式有误');
        }else if (value.length > 50){
          c('用户名输入不应该超过50位');
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
        }else if (value.length > 20 ){
          c('密码不能大于20位');
        }else if (value.match(/[^a-zA-Z0-9_]/g)) {
          c('密码不应包含特殊字符');
        }else {
          c();
        }
      }
      return {
        formInline: {
          country_code:'',
          user: '',
          password: '',
          checkcode:'',
          tel:'',
          verificationCode:'',
          reqresource:"1"
        },
        lang:'',//浏览器语言
        countryList:[],
        loginError:'',
        rememberpass:'记住密码',
        telCodeText:'发送验证码',
        telCodeDisabled:false,
        checkUrl:'/trade/tps/pbccs.do?t='+Date.now(),
        ruleInline: {
          user: [
            { validator:validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePwd, trigger: 'blur' },
          ],
          checkcode:[
            {required:true,message:'请输入图片验证码',trigger: 'blur'},
            {type:'string',min:4,max:4,message:'请输入4位验证码',trigger:'blur'}
          ],
          // tel: [
          //   { validator: validateTel, trigger: 'blur' }
          // ],
          // verificationCode: [
          //   { required: true, message: '请输入验证码.', trigger: 'blur' },
          // ]
        },
      }
    },
    methods: {
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
              this.formInline.country_code = '86';
            }else {
              this.countryList = res.data.countries.map((item,index) => {
                item.name = item.desc_en;
                return item;
              })
              this.formInline.country_code = res.data.countries[0].phone_code;
            }
          }
        }).catch((err) => {
          console.log('获取国家列表失败',err);
          this.message.error('网络请求似乎除了问题，请稍后重试');
        })
      },
      closeModal(e){
        var target = e.target;
        if (target && (target.className.match('ivu-modal-wrap') ||
          target.className.match('close-login') ||
          target.className.match('ivu-icon-close') ||
          target.className.match('wallet-box-background'))) {
        }else {
          return false;
        }
        this.$router.push({
          path:'/'
        })
      },
      changeCode(){
        this.formInline.checkcode = '';
        this.checkUrl = '/trade/tps/pbccs.do?' + Date.now();
      },
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
          console.log(valid);
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
          url: '/trade/biz/pbsms.do?fh=LIOCOD0000000J00&resp=bd',
          data: {
            tel:this.formInline.tel,
            reqresource:1
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
        if(this.formInline.checkcode){
          this.codeCompare();
        }else{
          $this.$Message.warning('请输入验证码');
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
      handleSpinCustomShow () { 
        console.log('zhuce--------',this.loginError);
        var that = this;
        var loginname = this.formInline.user.trim();
        var pwd = this.formInline.password.trim();
        var checkcode = this.formInline.checkcode.trim();
        var reqresource = this.formInline.reqresource.trim();
        var country_code = this.formInline.country_code.trim();
        this.changeCode();
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
          this.$Spin.hide();
          return;
        }
        this.$ajax({
          method:'post',
          url:'/trade/tps/pblin.do',
          data:{
            loginname,
            pwd,
            checkcode,
            reqresource,
            country_code
          }
        }).then((data)=>{
          console.log(data);
          // that.$Spin.hide();
          if (data.status == 200 && data.data.err_code == '1') {
            that.$store.dispatch('getUserInfo');
            cookies.set("name",loginname,{
              expires: 1800
            })
            
            // location = '/';
            // location.href = '/tradex';
            that.$router.push({
              path:'/'
            })
          }else {
            this.formInline.checkcode = '';
            if (data && data.data && data.data.err_code == '2' && data.data.msg) {
              that.loginError = data.data.msg;
            } 
            setTimeout(() => {
              that.loginError = '';
            }, 3000);          
          }
          that.$Spin.hide();
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

<style lang="scss">
  $placeholder: #e1e1e1;
  .login-wrapper {
    .ivu-modal {
      top: 80px;
    }
  }
  .wallet-box-background{
    width: 100%;
    /* background: #f9f9f9; */
    /* padding: 20px 0; */
    /* height: 585px; */
  }
  .wallet-box{
    width: 1000px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    position: relative;
  }
  .close-login {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 6px;
    right: 6px;
    font-size: 14px;
    // border-radius: 50%;
    text-align: center;
    line-height: 20px;
    color: #ddd;
    // background: #fff;
    cursor: pointer;
    &:hover {
      color: #08B3FF;
    }
  }
  .login-left{
    /* width: 800px; */
    /* height: 480px; */
    float: left;
    position: relative;
  }
  .login-left .login-img {
    display: block;
    width: 500px;
    height: 680px;
    background: url(/static/img/login.jpg) no-repeat;
    background-position:0 -80px;
    background-size: cover;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .login-left .mask {
    position: absolute;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    margin: auto;
    background: rgba(46,46,46,.9);
    z-index: 3;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .mask {
    .mask-inner {
      padding: 140px 80px;
      text-align: right;
      color: #fff;
      img {
        width: 80px;
        height: 90px;
      }
      h2 {
        font-size: 30px;
        font-weight: normal;
        padding: 30px 0;
        color: #fff;
      }
      h3 {
        font-size: 26px;
        font-weight: 400;
        padding: 30px 0;
      }
      h4 {
        font-size: 30px;
        font-weight: 500;
      }
      .mask-line {
        height: 1px;
        background: #fff;
      }
    }
  }
  .login-right{
    width: 500px;
    box-sizing: border-box;
    padding: 80px;
    height: 480px;
    float: right;
    background: #fff;
    border-top-right-radius: 8px;
  }
  .login-form-all>.ivu-form-item{
    width:100%;
    margin: 0 0 28px 0;
  }
  .login-input>.ivu-input-group-prepend{
    height: 40px;
  }
  .login-input-icon{
    font-size: 20px;
    font-weight: 600;
  }
  .login-label {
    height: 14px;
    line-height: 14px;
    color: #999;
  }
  .login-input{
    display: block;
    width: 100%;
    outline:none;
    border:0;
    border-bottom: 1px solid $placeholder;
    height:34px;
    background: #fff;
    color: #4CB2F9;
    /* padding: 0 10px; */
    margin: 4px 0;
    font-size: 14px;
  }
  login-input:-moz-placeholder{
    color: $placeholder;
  }
  .login-input:-ms-input-placeholder{
    color: $placeholder;
  }
  .login-input::-moz-placeholder {
    color: $placeholder;
  }
  input.login-input::-webkit-input-placeholder{
    color: $placeholder;
  }
  .verification-code-button{
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0;
    border-style: none;
    height: 40px;
    width: 110px;
  }
  .login-form-button{
    width: 100%;
    height: 40px;
  }
  .login-card{
    background: #ffffff69;
    border: none;
    padding: 8px 0;
    outline: none;
    box-shadow: 0;
  }
  .login-card img {
    width: 68px;
    height: 64px;
  }
  .login-card h3 {
    font-weight: 400;
    font-size: 24px;
    color: #333;
    padding: 0;
  }
  .login-card .ivu-card-body{
    padding-top: 0;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .item-checkcode .ivu-input-group-append {
    padding: 0;
  }
  .item-checkcode .checkcode {
    display: inline-block;
    position: absolute;
    bottom:10px;
    right: 0;
    width: 90px;
    height: 38px;
    float: right;
  }
  .reset-pass,.register-btn {
    color: #D1D3D2;
  }
  //新增国家
  .select-country {
    width: 98%;
    border: 0;
    height: 33px;
    border-bottom: 1px solid #e1e1e1;
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
      padding-left: 0;
    }
  }
</style>
