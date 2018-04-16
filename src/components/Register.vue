<template>
	<div :style="{marginBottom:'400px'}">
		<div class="ivu-modal-mask"></div>
    <div class="ivu-modal-wrap"  @click.stop="closeModal($event)">
      <div class="ivu-modal">
				<div class="register-box-background">
					<div class="register-box clear">
						<div class="close-login" @click.stop="closeModal($event)">
              <Icon type="close"></Icon>
            </div>
					<div class="register-left">
						<div class="login-img"></div>
						<div class="mask">
              <div class="mask-inner">
                <div class="mask-logo">
                  <img src="/static/img/logo.png"/>
                  <h2>币邦</h2>
                </div>
                <div class="mask-line"></div>
                <div class="mask-content">
                  <h3>type something</h3>
                  <h4>type something type</h4>
                </div>
              </div>
            </div>
					</div>
					<div class="register-right">
						<Tabs value="name1" :class="'register-right-tabs'" @on-click="registerTabs">
							<TabPane label="手机注册" name="name1" :class="'register-right-tabs-tabpaneOne'">
                <div class="register-label">手机号码</div>
								<div class="register-input-item">
									<span class="float-left tel-country">+86</span>
								  <input v-model="tel" size="large" :maxlength="11" placeholder="请输入手机号" class="register-input register-tel" :class="telErrorInput" @focus="telFocus" />
                  <p class="register-error-text">
                    {{errorTel}}
                  </p>
								</div>
                <div class="register-label">验证码</div>
								<div class="register-input-item">
                  <input v-model="vsCode" size="large" maxLength="4" class="register-input" placeholder="验证码" :class="vsCodeErrorInput" @focus="vsCodeFocus" />
                  <p class="register-error-text">
                    {{ errorVsCode }}
                  </p>
                  <div class="register-vsCode">
                    <img :src="src" alt="图片验证码" @click="imgsrc">
                  </div>
                  </div>
                  <div class="register-label">短信验证码</div>
                  <div class="register-input-item">
                  <input class="register-input" v-model="telCode" maxLength="6" size="large" placeholder="短信验证码" :class="telCodeErrorInput" @focus="telCodeFocus"/>
                  <p class="register-error-text">
                    {{ errorTelCode }}
                  </p>
                  <div class="register-vsCode">
                    <span type="primary" size="small" @click="telCodeTimeOut" :disabled="telCodeDisabled">
                    {{ telCodeText }}
                    </span>
                  </div>
								</div>
                <div class="register-label">密码</div>
								<div class="register-input-password">
								<input
									type="password"
									v-model="password"
									size="large"
                  class="register-input"
									placeholder="输入密码"
                  autocomplete="new-password"
                  maxLength="20"
									:class="passwordCodeErrorInput"
									@focus="passwordFocus"
									@input="passwordChange"
									@blur="passwordBlur"
								/>
								<div class="prompt tel-prompt" v-if="prompt">
									<p style="font-size:12px;color: #000;font-weight:600">您的密码必须符合：</p>
									<p class="p-gray">
									<span v-html="PromptOne"></span>
									&nbsp;只能是字母和数字
									</p>
									<p class="p-gray">
									<span v-html="PromptTwo"></span>
									&nbsp;8-20个字符
									</p>
									<p class="p-gray">
									<span v-html="PromptThree"></span>
									&nbsp;包含大写和小写字母
									</p>
									<p class="p-gray">
									<span v-html="PromptFour"></span>
									&nbsp;不能以数字开头
									</p>
									<div class="prompt-div">
									<p class="prompt-div-p">密码强度:</p>
									<div class="change-longer" >
										<div class="change-longer-children" :style="PromptAll">
										</div>
									</div>
									<p class="prompt-div-p2">避免使用您用于其他网站的密码,或易于被其他人猜到的密码。</p>
									</div>
								</div>
								<p class="register-error-text">
									{{ errorPassword }}
								</p>
								</div>
                <div class="register-label">再次输入密码</div>
								<div class="register-input-item">
								<input type="password" maxLength="20" autocomplete="new-password" class="register-input" v-model="passwordAgain" size="large" placeholder="再次输入密码" :class="passwordAgainCodeErrorInput" @foucs="passwordAgainFocus"/>
								<p class="register-error-text">
									{{ errorPasswordAgain }}
								</p>
								</div>
                <div class="register-label">邀请码</div>
								<div class="register-input-item">
								<input v-model="InvitationCode" class="register-input" size="large" placeholder="邀请码（选填）" :class="InvitationCodeErrorInput" />
								<p class="register-error-text">
									{{ errorInvitationCode }}
								</p>
								</div>
								<div style="margin-top: 30px;margin-bottom: 10px;">
								<Checkbox v-model="single" >阅读并同意 <a href="javaScript:;">《福币用户协议》</a></Checkbox>
								</div>
								<div class="go-register">
								<Button type="primary" size="large" @click="submitTel">注册</Button>
								</div>
							</TabPane>
							<TabPane label="邮箱注册" maxLength="50" name="name2" :class="'register-right-tabs-tabpaneTwo'">
                <div class="register-label">邮箱</div>
								<div class="register-input-item">
								<input v-model="email" size="large" class="register-input" placeholder="请输入邮箱" :maxlength="50" :class="emailErrorInput"  @foucs="telFocus" />
								<p class="register-error-text">
									{{errorEmail}}
								</p>
								</div>
                <div class="register-label">验证码</div>
								<div class="register-input-item">
								<input class="register-input" maxLength="4" v-model="vsCode" size="large" placeholder="验证码" :class="vsCodeErrorInput" @foucs="vsCodeFocus" />
								<p class="register-error-text">
									{{ errorVsCode }}
								</p>
								<div class="register-vsCode">
									<img :src="src" alt="图片验证码" @click="imgsrc">
								</div>
								</div>
                <div class="register-label">邮箱验证码</div>
								<div class="register-input-item">
								<input class="register-input" maxLength="6" v-model="telCode" size="large" placeholder="邮箱验证码" :class="telCodeErrorInput" @focus="telCodeFocus" />
								<p class="register-error-text">
									{{ errorTelCode }}
								</p>
								<div class="register-vsCode">
									<span type="primary" size="small" @click="telCodeTimeOut1" :disabled="telCodeDisabled">
									{{ telCodeText }}
									</span>
								</div>
								</div>
                <div class="register-label">密码</div>
								<div class="register-input-item">
								<input
									type="password"
									v-model="password"
									size="large"
                  maxLength="20"
                  class="register-input"
									placeholder="输入密码"
									:class="passwordCodeErrorInput"
									@focus="passwordFocus"
									@input="passwordChange"
									@blur="passwordBlur"
                  autocomplete="new-password"
								/>
								<div class="prompt email-prompt" v-if="prompt">
									<p style="font-size:12px;color: #000;font-weight:600">您的密码必须符合：</p>
									<p class="p-gray">
										<span v-html="PromptOne"></span>
										&nbsp;只能是字母和数字
									</p>
									<p class="p-gray">
										<span v-html="PromptTwo"></span>
										&nbsp;8-20个字符
									</p>
									<p class="p-gray">
										<span v-html="PromptThree"></span>
										&nbsp;包含大写和小写字母
									</p>
									<p class="p-gray">
										<span v-html="PromptFour"></span>
										&nbsp;不能以数字开头
										</p>
									<div class="prompt-div">
										<p class="prompt-div-p">密码强度:</p>
										<div class="change-longer">
											<div class="change-longer-children" :style="PromptAll">
											</div>
										</div>
										<p class="prompt-div-p2">避免使用您用于其他网站的密码,或易于被其他人猜到的密码。</p>
									</div>
								</div>
								<p class="register-error-text">
									{{ errorPassword }}
								</p>
								</div>
                <div class="register-label">再次输入密码</div>
								<div class="register-input-item">
								<input class="register-input" maxLength="20" autocomplete="new-password" type="password" v-model="passwordAgain" size="large" placeholder="再次输入密码" :class="passwordAgainCodeErrorInput" @focus="passwordAgainFocus" />
								<p class="register-error-text">
									{{ errorPasswordAgain }}
								</p>
								</div>
                <div class="register-label">邀请码</div>
								<div class="register-input-item">
								<input class="register-input" v-model="InvitationCode" size="large" placeholder="邀请码（选填）" :class="InvitationCodeErrorInput" />
								<p class="register-error-text">
									{{ errorInvitationCode }}
								</p>
								</div>
								<div class="register-input-item">
								<Checkbox v-model="single" >阅读并同意 <a href="javaScript:;">《福币用户协议》</a></Checkbox>
								</div>
								<div class="go-register">
								<Button type="primary" size="large" @click="submitEmail">注册</Button>
								</div>
							</TabPane>
						</Tabs>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Tabs, TabPane } from "iview";
import {emailReg,telReg} from './constant/constant.js';
export default {
  components: {
    Tabs,
    TabPane
  },
  data() {
    return {
      src: "/trade/tps/pbccs.do?t=" + Date.now(),
      tel: "",
      email: "",
      vsCode: "",
      telCode: "",
      telCodeText: "发送验证码",
      password: "",
      passwordAgain: "",
      InvitationCode: "",
      single: true, // 是否同意服务条款
      errorTel: "",
      errorEmail: "",
      errorVsCode: "",
      errorTelCode: "",
      errorPassword: "",
      errorPasswordAgain: "",
      errorInvitationCode: "",
      telErrorInput: "",
      emailErrorInput: "",
      vsCodeErrorInput: "",
      telCodeErrorInput: "",
      passwordCodeErrorInput: "",
      passwordAgainCodeErrorInput: "",
      InvitationCodeErrorInput: "",
      getCode: "", // 倒计时
      telCodeDisabled: false,

      prompt: false,
      PromptOne:
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',
      PromptTwo:
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',
      PromptThree:
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',
      PromptFour:
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',

      PromptAll: {},
      PromptOneWidth: 0,
      PromptTwoWidth: 0,
      PromptThreeWidth: 0,
      PromptFourWidth: 0
    };
  },
  created() {
    this.$Notice.config({
      top: 130
    });
  },
  methods: {
    closeModal(e) {
      var target = e.target;
      if (
        target &&
        (target.className.match("ivu-modal-wrap") ||
          target.className.match("close-login") ||
          target.className.match("ivu-icon-close") ||
          target.className.match("register-box-background"))
      ) {
      } else {
        return false;
      }
      this.$router.push({
        path: "/"
      });
    },
    imgsrc() {
      this.src = this.src + "?" + Date.now();
    },
    passwordChange() {
      // 密码强度
      if (/[a-zA-Z]+/g.test(this.password) && /[0-9]+/g.test(this.password)) {
        // 只能是字母和数字
        this.PromptOne =
          '<i class="fa fa-check" aria-hidden="true" style="color: green"></i>';
        this.PromptOneWidth = 20;
      } else {
        this.PromptOne =
          '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
        this.PromptOneWidth = 0;
      }
      if (/^\w{8,20}$/.test(this.password)) {
        // 8-20个字符
        this.PromptTwo =
          '<i class="fa fa-check" aria-hidden="true" style="color: green"></i>';
        if (this.password.length <= 10) {
          this.PromptTwoWidth = 10;
        } else if (this.password.length > 10 && this.password.length <= 15) {
          this.PromptTwoWidth = 20;
        } else if (this.password.length > 15 && this.password.length <= 18) {
          this.PromptTwoWidth = 30;
        } else if (this.password.length > 18 && this.password.length <= 20) {
          this.PromptTwoWidth = 40;
        }
      } else {
        this.PromptTwo =
          '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
        this.PromptTwoWidth = 0;
      }
      if (/[A-Z]+/g.test(this.password) && /[a-z]+/g.test(this.password)) {
        // 包含大写和小写字母
        this.PromptThree =
          '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
        this.PromptThreeWidth = 20;
      } else {
        this.PromptThree =
          '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
        this.PromptThreeWidth = 0;
      }
      if (this.password && /^(?![0-9]+$)/.test(this.password[0])) {
        // 不能以数字开头
        this.PromptFour =
          '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
        this.PromptFourWidth = 20;
      } else {
        this.PromptFour =
          '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
        this.PromptFourWidth = 0;
      }
      this.passwordChangeWidth();
    },
    passwordChangeWidth() {
      // 密码强度条长度
      this.PromptAll = {
        width:
          this.PromptOneWidth +
          this.PromptTwoWidth +
          this.PromptThreeWidth +
          this.PromptFourWidth +
          "%"
      };
    },
    registerTabs() {
      // 切换TAbs 状态还原
      this.clearTime();
      this.tel = "";
      this.email = "";
      this.vsCode = "";
      this.telCode = "";
      this.telCodeText = "发送验证码";
      this.password = "";
      this.passwordAgain = "";
      this.InvitationCode = "";
      this.single = true; // 是否同意服务条款

      this.errorTel = "";
      this.errorEmail = "";
      this.errorVsCode = "";
      this.errorTelCode = "";
      this.errorPassword = "";
      this.errorPasswordAgain = "";
      this.errorInvitationCode = "";

      this.telErrorInput = "";
      this.emailErrorInput = "";
      this.vsCodeErrorInput = "";
      this.telCodeErrorInput = "";
      this.passwordCodeErrorInput = "";
      this.passwordAgainCodeErrorInput = "";
      this.InvitationCodeErrorInput = "";
      this.getCode = ""; // 倒计时
      this.telCodeDisabled = false; // 倒计时按钮状态

      this.prompt = false; //  密码提示框状态
      this.PromptOne =
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
      this.PromptTwo =
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
      this.PromptThree =
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
      this.PromptFour =
        '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';

      this.PromptAll = {};
      this.PromptOneWidth = 0;
      this.PromptTwoWidth = 0;
      this.PromptThreeWidth = 0;
      this.PromptFourWidth = 0;
      this.src = "/trade/tps/pbccs.do?" + Date.now();
    },
    clearTime() {
      // 清除定时器
      if (this.getCode) {
        clearTimeout(this.getCode);
      }
    },
    telCodeTimeOut() {
      //验证码倒计时 手机
      if (!this.tel) {
        this.errorTel = "请输入手机号";
        this.telErrorInput = "errorInput";
        return false;
      } else {
        if (this.tel && !telReg.test(this.tel)) {
          this.errorTel = "请输入11位正确的手机号";
          this.telErrorInput = "errorInput";
          return false;
        }
        if ($this.getCode) {
          return;
        }
        let $this = this;
        this.telCodeText = 60;
        this.telCodeDisabled = true;
        this.getCode = setInterval(function() {
          $this.telCodeText -= 1;
          if ($this.telCodeText <= 1) {
            clearTimeout($this.getCode);
            $this.telCodeText = "重新获取";
            $this.getCode = null;
            $this.telCodeDisabled = false;
          }
        }, 1000);

        this.$ajax({
          method: "post",
          url: "/trade/tps/pbscs.do",
          data: {
            verifystr: this.tel,
            reqresource: 1
            // "type":"mobile"
          }
        }).then(function(data) {
          console.log(data);
          if (data.data.err_code == "1") {
            $this.$Notice.success({
              title: "验证码发送成功，请注意查收。",
              desc: "",
              top: 100
            });
            // $this.$Modal.info({
            // 	content:'验证码发送成功，请注意查收。'
            // })
          } else {
            $this.$Notice.error({
              title: "验证码发送失败，请重新发送。",
              top: 100
            });
          }
        });
      }
    },
    telCodeTimeOut1() {
      //验证码倒计时 邮箱

      if (!this.email) {
        this.errorEmail = "请输入邮箱";
        this.emailErrorInput = "errorInput";
        return false;
      } else {
        if (
          this.email &&
          !emailReg.test(this.email)
        ) {
          this.errorEmail = "邮箱格式不正确";
          this.emailErrorInput = "errorInput";
          return false;
        }
        let $this = this;
        if (this.getCode) {
          return;
        }
        this.telCodeText = 60;
        this.telCodeDisabled = true;
        this.getCode = setInterval(function() {
          $this.telCodeText -= 1;
          if ($this.telCodeText <= 1) {
            clearTimeout($this.getCode);
            $this.telCodeText = "重新获取";
            $this.getCode = null;
            $this.telCodeDisabled = false;
          }
        }, 1000);
        this.$ajax({
          method: "post",
          url: "/trade/tps/pbscs.do",
          data: {
            verifystr: this.email,
            reqresource: 1
            // "type":"email"
          }
        }).then(function(data) {
          console.log(data);
          if (data.data.err_code == "1") {
            $this.$Notice.success({
              title: "验证码发送成功，请注意查收。",
              desc: "",
              top: 100
            });

            // $this.$Modal.info({
            // 	content:'验证码发送成功，请注意查收。'
            // })
          } else {
            $this.$Notice.error({
              title: "验证码发送失败，请重新发送。",
              top: 100
            });
          }
        });
      }
    },
    submitTel() {
      //手机注册
      let that = this;
      if (
        !this.tel &&
        !this.vsCode &&
        !this.telCode &&
        !this.password &&
        !this.passwordAgain
      ) {
        if (!this.tel) {
          this.errorTel = "请输入手机号";
          this.telErrorInput = "errorInput";
        }
        if (!this.vsCode) {
          this.errorVsCode = "请输入验证码";
          this.vsCodeErrorInput = "errorInput";
        }
        if (!this.telCode) {
          this.errorTelCode = "请输入短信验证码";
          this.telCodeErrorInput = "errorInput";
        }
        if (!this.password) {
          this.errorPassword = "请输入密码";
          this.passwordCodeErrorInput = "errorInput";
        }
        if (!this.passwordAgain) {
          this.errorPasswordAgain = "请确认密码";
          this.passwordAgainCodeErrorInput = "errorInput";
        }
      } else {
        if (this.tel && telReg.test(this.tel)) {
          
        }else {
          this.errorTel = "请输入11位正确的手机号";
          this.telErrorInput = "errorInput";
          return false;
        }
        if (this.vsCode && this.vsCode.match(/^\w{4}$/g)) {
          this.errorVsCode = "";
        } else {
          this.errorVsCode = "请输入4位图片验证码";
          return false;
        }
        if (this.telCode && this.telCode.match(/^\d{6}$/g)) {
          this.errorTelCode = "";
        } else {
          this.errorTelCode = "请输入6位短信验证码";
          return;
        }
        // 密码格式/^[a-zA-Z]+(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/
        if (!this.password) {
          this.errorPassword = "请输入密码";
          return false;
        } else if (
          !/[A-Z]+/g.test(this.password) ||
          !/[a-z]+/g.test(this.password) ||
          !/^[a-zA-Z]+/g.test(this.password) ||
          !/\d+/g.test(this.password) ||
          this.password.length < 8 ||
          this.password.length > 20
        ) {
          this.errorPassword = "密码格式不正确请重新输入。";
          this.passwordCodeErrorInput = "errorInput";
          return false;
        }
        if (this.password != this.passwordAgain) {
          this.errorPasswordAgain = "两次密码输入不一致，请重新输入。";
          return false;
        }
        if (this.InvitationCode.length >= 8) {
          this.$Notice.warning({
            title: "提示",
            desc: "邀请码不应超过8位"
          });
          return false;
        }
        if (this.InvitationCode.match(/[^0-9]/g)) {
          this.$Notice.warning({
            title: "提示",
            desc: "邀请码只能是数字"
          });
          return false;
        }
        if (!this.single) {
          this.$Modal.info({
            content: "请同意《福币用户协议》。"
          });
          return false;
        }
        console.log({
          loginname: this.tel,
          checkcode: this.errorVsCode,
          msgcheckcode: this.telCode,
          password: this.password,
          confirmpassword: this.passwordAgain,
          invitedcode: this.InvitationCode
        });
        this.imgsrc();
        this.$ajax({
          method: "post",
          url: "/trade/tps/pbrus.do",
          data: {
            loginname: this.tel,
            checkcode: this.vsCode,
            msgcheckcode: this.telCode,
            password: this.password,
            confirmpassword: this.passwordAgain,
            invitedcode: this.InvitationCode,
            reqresource: 1
          }
        }).then(function(data) {
          console.log(data);
          if (data.data.err_code == "1") {
            that.$Notice.success({
              title: "提示",
              desc: "注册成功,请登录。"
            });
            that.$router.push("login");
          } else if (data.data.msg) {
            that.$Notice.warning({
              title: "提示",
              desc: "注册失败," + data.data.msg
            });
          } else {
            that.$Notice.warning({
              title: "提示",
              desc: "注册失败,请稍后重试"
            });
          }
        });
      }
    },
    submitEmail() {
      // 邮箱注册
      console.log("邮箱");
      console.log(
        this.email,
        this.vsCode,
        this.telCode,
        this.password,
        this.passwordAgain
      );
      let that = this;
      if (
        !this.email &&
        !this.vsCode &&
        !this.telCode &&
        !this.password &&
        !this.passwordAgain
      ) {
        if (!this.email) {
          this.errorEmail = "请输入邮箱";
          this.emailErrorInput = "errorInput";
        }
        if (!this.vsCode) {
          this.errorVsCode = "请输入验证码";
          this.vsCodeErrorInput = "errorInput";
        }
        if (!this.telCode) {
          this.errorTelCode = "请输入邮箱验证码";
          this.telCodeErrorInput = "errorInput";
        }
        if (!this.password) {
          this.errorPassword = "请输入密码";
          this.passwordCodeErrorInput = "errorInput";
        }
        if (!this.passwordAgain) {
          this.errorPasswordAgain = "请确认密码";
          this.passwordAgainCodeErrorInput = "errorInput";
        }
      } else {
        console.log(this.email);
        // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))
        if (
          this.email &&
          !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.email)
        ) {
          this.errorEmail = "邮箱格式不正确";
          this.emailErrorInput = "errorInput";
          return false;
        }
        if (this.email.length > 50) {
          this.errorEmail = "您输入的邮箱字符过长，不应多于50位";
          return false;
        }
        if (this.vsCode && this.vsCode.match(/^\w{4}$/g)) {
          this.errorVsCode = "";
        } else {
          this.errorVsCode = "请输入4位图片验证码";
          return false;
        }
        if (this.telCode && this.telCode.match(/^\w{6}$/g)) {
          this.errorTelCode = "";
        } else {
          this.errorTelCode = "请输入6位邮箱验证码";
          return;
        }
        // 密码格式/^[a-zA-Z]+(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/
        if (!this.password) {
          this.errorPassword = "请输入密码。";
          return;
        } else if (
          this.password &&
          (!/[A-Z]+/g.test(this.password) ||
            !/[a-z]+/g.test(this.password) ||
            !/^[a-zA-Z]+/g.test(this.password) ||
            !/\d+/g.test(this.password) ||
            this.password.length < 8 ||
            this.password.length > 20)
        ) {
          this.errorPassword = "密码格式不正确请重新输入。";
          this.passwordCodeErrorInput = "errorInput";
          return false;
        }
        if (this.password != this.passwordAgain) {
          this.$Notice.warning({
            title: "提示",
            desc: "两次密码输入不一致，请重新输入。"
          });
          return false;
        }
        console.log(this.InvitationCode);
        if (this.InvitationCode.length >= 8) {
          this.$Notice.warning({
            title: "提示",
            desc: "邀请码不应超过8位"
          });
          return false;
        }
        if (this.InvitationCode.match(/[^0-9]/g)) {
          this.$Notice.warning({
            title: "提示",
            desc: "邀请码只能是数字"
          });
          return false;
        }
        if (!this.single) {
          this.$Notice.warning({
            title: "提示",
            desc: "请同意《福币用户协议》。"
          });
          return false;
        }
        this.imgsrc();
        this.$ajax({
          method: "post",
          url: "/trade/tps/pbrus.do",
          data: {
            loginname: this.email,
            checkcode: this.vsCode,
            msgcheckcode: this.telCode,
            password: this.password,
            confirmpassword: this.passwordAgain,
            invitedcode: this.InvitationCode,
            reqresource: 1
          }
        }).then(function(data) {
          console.log(data);
          if (data.data.err_code == "1") {
            that.$Notice.success({
              title: "提示",
              desc: "注册成功,请登录。"
            });
            that.$router.push("login");
          } else if (data.data && data.data.msg) {
            that.$Notice.warning({
              title: "提示",
              desc: "注册失败," + data.data.msg
            });
          } else {
            that.$Notice.warning({
              title: "提示",
              desc: "注册失败,请稍后重试"
            });
          }
        });
      }
    },
    telFocus() {
      // 获得焦点  消除错误提示
      this.errorTel = "";
      this.errorEmail = "";
      this.telErrorInput = "";
      this.emailErrorInput = "";
    },
    vsCodeFocus() {
      this.errorVsCode = "";
      this.vsCodeErrorInput = "";
    },
    telCodeFocus() {
      this.errorTelCode = "";
      this.telCodeErrorInput = "";
    },
    passwordFocus() {
      this.errorPassword = "";
      this.passwordCodeErrorInput = "";

      this.prompt = true;
    },
    passwordBlur() {
      // 密码提示框消失
      this.prompt = false;
    },
    passwordAgainFocus() {
      this.errorPasswordAgain = "";
      this.passwordAgainCodeErrorInput = "";
    }
  }
};
</script>
<style lang="scss" scoped>
input:-webkit-autofill {
background-color : #FAFFBD ;
background-image : none ;
color : #000 ;
}
$placeholder: #e1e1e1;
.register-box-background {
  /* background: #f9f9f9; */
  width: 100%;
}
.register-box {
  width: 1000px;
  margin: 0 auto;
  /* height: 580px; */
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
.register-box > .register-left {
  width: 500px;
  box-sizing: border-box;
  /* height: 580px; */
  float: left;
  height: 650px;
  position: relative;
}
.register-box > .register-right {
  height: 740px;
  width: 500px;
  box-sizing: border-box;
  /* height: 580px; */
  float: right;
  padding: 50px 45px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #fff;
}
.register-left .login-img {
  display: block;
  width: 500px;
  height: 650px;
  background: url(/static/img/login.jpg) no-repeat;
  background-position: 0 -80px;
  background-size: cover;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.register-left .mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(46, 46, 46, 0.9);
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
.register-right-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container {
  font-size: 18px;
  color: #999;
}
.register-right-tabs
  > .ivu-tabs-bar
  > .ivu-tabs-nav-container
  > .ivu-tabs-nav-wrap
  > .ivu-tabs-nav-scroll
  > .nav-text.ivu-tabs-nav
  > .ivu-tabs-tab {
  padding: 20px 0;
}
.register-right-tabs > .ivu-tabs-nav > .ivu-tabs-tab-active {
  color: #000;
}
.register-input-item {
  margin-bottom: 10px;
  position: relative;
  height: 48px;
  .tel-country {
    position: absolute;
    left: 0;
    bottom: 20px;
  }
  .register-tel {
    padding-left: 30px;
  }
}

.register-input {
  display: block;
  width: 100%;
  outline:none;
  border:0;
  border-bottom: 1px solid $placeholder;
  height:32px;
  background: #fff;
  color: #4CB2F9;
  /* padding: 0 10px; */
  margin: 4px 0;
}
register-input:-moz-placeholder{
    color: $placeholder;
}
.register-input:-ms-input-placeholder{
  color: $placeholder;
}
.register-input::-moz-placeholder {
  color: $placeholder;
}
input.register-input::-webkit-input-placeholder{
  color: $placeholder;
}
.errorInput input {
  border: 1px solid red;
}
.register-vsCode {
  position: absolute;
  width: 100px;
  height: 30px;
  top: 0;
  right: 0;
}
.register-vsCode img {
  display: block;
  width: 100px;
  height: 30px;
}
.register-vsCode span {
  color: #08B3FF;
  cursor: pointer;
}
.register-input button {
  width: 100%;
  height: 30px;
  font-size: 14px;
}
.register-error-text {
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  color: red;
}
.prompt {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 200px;
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 7px 20px #000;
  z-index: 10;
}
.tel-prompt {
  top: 320px;
}
.prompt p {
  font-size: 12px;
}
.prompt .p-gray {
  color: gray;
}
.prompt .prompt-div {
  margin-top: 5px;
}
.prompt .prompt-div .prompt-div-p {
  color: #282828;
  font-size: 12px;
  font-weight: 600;
}
.prompt .prompt-div .change-longer {
  position: relative;
  margin: 3px 0;
  width: 100%;
  height: 5px;
  background: -webkit-linear-gradient(
    left,
    rgba(3, 255, 0, 0.1),
    rgba(255, 0, 0, 0.1)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    rgba(3, 255, 0, 0.1),
    rgba(255, 0, 0, 0.1)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    rgba(3, 255, 0, 0.1),
    rgba(255, 0, 0, 0.1)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    rgba(3, 255, 0, 0.1),
    rgba(255, 0, 0, 0.1)
  ); /* 标准的语法 */
}
.prompt .prompt-div .change-longer .change-longer-children {
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  background: -webkit-linear-gradient(
    left,
    rgb(3, 255, 0),
    rgb(255, 0, 0)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    rgb(3, 255, 0),
    rgb(255, 0, 0)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    rgb(3, 255, 0),
    rgb(255, 0, 0)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    rgb(3, 255, 0),
    rgb(255, 0, 0)
  ); /* 标准的语法 */
  transition: all 0.3s;
}
.prompt .prompt-div .prompt-div-p2 {
  color: #282828;
}
.prompt:before {
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #f2f2f2;
  position: absolute;
  top: -15px;
  left: 90px;
}
.go-register {
  .ivu-btn {
    width: 100%;
  }
}
</style>
