<template>
<div class="register-box-background">
	<div class="register-box">
	<div class="register-left">
		<img src="/static/img/bg-user.jpg" alt="" width="100%" height="100%">
	</div>
	<div class="register-right">
		<Tabs value="name1" :class="'register-right-tabs'" @on-click="registerTabs">
		<TabPane label="手机注册" name="name1" :class="'register-right-tabs-tabpaneOne'">
			<div class="register-input">
			<Input v-model="tel" size="large" placeholder="请输入手机号" :class="telErrorInput" @on-focus="telFocus"/>
			<p class="register-error-text">
				{{errorTel}}
			</p>
			</div>
			<div class="register-input">
			<Input v-model="vsCode" size="large" placeholder="验证码" :class="vsCodeErrorInput" @on-focus="vsCodeFocus" />
			<p class="register-error-text">
				{{ errorVsCode }}
			</p>
			<div class="register-vsCode">
				<img src="/trade/tps/pbccs.do" alt="" width="100%" height="100%">
			</div>
			</div>
			<div class="register-input">
			<Input v-model="telCode" size="large" placeholder="短信验证码" :class="telCodeErrorInput" @on-focus="telCodeFocus"/>
			<p class="register-error-text">
				{{ errorTelCode }}
			</p>
			<div class="register-vsCode">
				<Button type="primary" @click="telCodeTimeOut" :disabled="telCodeDisabled">
				{{ telCodeText }}
				</Button>
			</div>
			</div>
			<div class="register-input">
			<Input
				type="password"
				v-model="password"
				size="large"
				placeholder="输入密码"
				:class="passwordCodeErrorInput"
				@on-focus="passwordFocus"
				@on-change="passwordChange"
				@on-blur="passwordBlur"
			/>
			<div class="prompt" v-if="prompt">
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
			<div class="register-input">
			<Input type="password" v-model="passwordAgain" size="large" placeholder="再次输入密码" :class="passwordAgainCodeErrorInput" @on-focus="passwordAgainFocus"/>
			<p class="register-error-text">
				{{ errorPasswordAgain }}
			</p>
			</div>
			<div class="register-input">
			<Input v-model="InvitationCode" size="large" placeholder="邀请码（选填）" :class="InvitationCodeErrorInput" />
			<p class="register-error-text">
				{{ errorInvitationCode }}
			</p>
			</div>
			<div class="register-input">
			<Checkbox v-model="single" >阅读并同意 <a href="javaScript:;">《蜂巢币用户协议》</a></Checkbox>
			</div>
			<div class="register-input">
			<Button type="primary" @click="submitTel">注册</Button>
			</div>
		</TabPane>
		<TabPane label="邮箱注册" name="name2" :class="'register-right-tabs-tabpaneTwo'">
			<div class="register-input">
			<Input v-model="email" size="large" placeholder="请输入邮箱" :class="emailErrorInput"  @on-focus="telFocus" />
			<p class="register-error-text">
				{{errorEmail}}
			</p>
			</div>
			<div class="register-input">
			<Input v-model="vsCode" size="large" placeholder="验证码" :class="vsCodeErrorInput" @on-focus="vsCodeFocus" />
			<p class="register-error-text">
				{{ errorVsCode }}
			</p>
			<div class="register-vsCode">
				<img src="/trade/tps/pbccs.do?1" alt="" width="100%" height="100%">
			</div>
			</div>
			<div class="register-input">
			<Input v-model="telCode" size="large" placeholder="邮箱验证码" :class="telCodeErrorInput" @on-focus="telCodeFocus" />
			<p class="register-error-text">
				{{ errorTelCode }}
			</p>
			<div class="register-vsCode">
				<Button type="primary" @click="telCodeTimeOut1" :disabled="telCodeDisabled">
				{{ telCodeText }}
				</Button>
			</div>
			</div>
			<div class="register-input">
			<Input
				type="password"
				v-model="password"
				size="large"
				placeholder="输入密码"
				:class="passwordCodeErrorInput"
				@on-focus="passwordFocus"
				@on-change="passwordChange"
				@on-blur="passwordBlur"
			/>
			<div class="prompt" v-if="prompt">
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
			<div class="register-input">
			<Input type="password" v-model="passwordAgain" size="large" placeholder="再次输入密码" :class="passwordAgainCodeErrorInput" @on-focus="passwordAgainFocus" />
			<p class="register-error-text">
				{{ errorPasswordAgain }}
			</p>
			</div>
			<div class="register-input">
			<Input v-model="InvitationCode" size="large" placeholder="邀请码（选填）" :class="InvitationCodeErrorInput" />
			<p class="register-error-text">
				{{ errorInvitationCode }}
			</p>
			</div>
			<div class="register-input">
			<Checkbox v-model="single" >阅读并同意 <a href="javaScript:;">《蜂巢币用户协议》</a></Checkbox>
			</div>
			<div class="register-input">
			<Button type="primary" @click="submitEmail">注册</Button>
			</div>
		</TabPane>
		</Tabs>
	</div>
	</div>
</div>
</template>
<script>
import {Tabs,TabPane} from 'iview'
export default {
	components:{
	Tabs,
	TabPane
	},
	data () {
	return {
		tel: '',
		email:'',
		vsCode:'',
		telCode:'',
		telCodeText:'发送验证码',
		password:'',
		passwordAgain:"",
		InvitationCode:'',
		single:true,      // 是否同意服务条款
		errorTel:'',
		errorEmail:'',
		errorVsCode:'',
		errorTelCode:'',
		errorPassword:'',
		errorPasswordAgain:'',
		errorInvitationCode:'',
		telErrorInput:"",
		emailErrorInput:'',
		vsCodeErrorInput:'',
		telCodeErrorInput:'',
		passwordCodeErrorInput:'',
		passwordAgainCodeErrorInput:'',
		InvitationCodeErrorInput:'',
		getCode:'',   // 倒计时
		telCodeDisabled:false,

		prompt:false,
		PromptOne:'<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',
		PromptTwo:'<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',
		PromptThree:'<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',
		PromptFour:'<i class="fa fa-times" aria-hidden="true" style="color:red"></i>',

		PromptAll: {},
		PromptOneWidth: 0,
		PromptTwoWidth: 0,
		PromptThreeWidth: 0,
		PromptFourWidth: 0,
	}
	},
	methods: {
	passwordChange(){    // 密码强度
		if(/[a-zA-Z]+/g.test(this.password) && /[0-9]+/g.test(this.password)){   // 只能是字母和数字
		this.PromptOne = '<i class="fa fa-check" aria-hidden="true" style="color: green"></i>';
		this.PromptOneWidth = 20
		}else{
		this.PromptOne = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
		this.PromptOneWidth = 0
		}
		if(/^\w{8,20}$/.test(this.password)){       // 8-20个字符
		this.PromptTwo = '<i class="fa fa-check" aria-hidden="true" style="color: green"></i>';
		if(this.password.length <= 10){
			this.PromptTwoWidth = 10
		}else if(this.password.length >10 && this.password.length <=15){
			this.PromptTwoWidth = 20
		}else if(this.password.length >15 && this.password.length <=18){
			this.PromptTwoWidth = 30
		}else if(this.password.length >18 && this.password.length<=20){
			this.PromptTwoWidth = 40
		}
		}else{
		this.PromptTwo = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
		this.PromptTwoWidth = 0
		}
		if(/[A-Z]+/g.test(this.password) && /[a-z]+/g.test(this.password)){ // 包含大写和小写字母
		this.PromptThree = '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
		this.PromptThreeWidth = 20
		}else{
		this.PromptThree = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
		this.PromptThreeWidth = 0
		}
		if(this.password && /^(?![0-9]+$)/.test(this.password[0])){        // 不能以数字开头
		this.PromptFour = '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
		this.PromptFourWidth = 20
		}else{
		this.PromptFour = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
		this.PromptFourWidth = 0
		}
		this.passwordChangeWidth();
	},
	passwordChangeWidth(){   // 密码强度条长度
		this.PromptAll = {'width':this.PromptOneWidth + this.PromptTwoWidth + this.PromptThreeWidth + this.PromptFourWidth + '%'};
	},
	registerTabs(){    // 切换TAbs 状态还原
		this.clearTime();
		this.tel = '';
		this.email = '';
		this.vsCode = '';
		this.telCode ='';
		this.telCodeText = '发送验证码';
		this.password = '';
		this.passwordAgain = '';
		this.InvitationCode = '';
		this.single = false;      // 是否同意服务条款

		this.errorTel = '';
		this.errorEmail = '';
		this.errorVsCode = '';
		this.errorTelCode = '';
		this.errorPassword = '';
		this.errorPasswordAgain = '';
		this.errorInvitationCode = '';

		this.telErrorInput = "";
		this.emailErrorInput = '';
		this.vsCodeErrorInput = '';
		this.telCodeErrorInput = '';
		this.passwordCodeErrorInput = '';
		this.passwordAgainCodeErrorInput = '';
		this.InvitationCodeErrorInput = '';
		this.getCode = '';   // 倒计时
		this.telCodeDisabled = false;   // 倒计时按钮状态

		this.prompt = false;   //  密码提示框状态
		this.PromptOne = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
		this.PromptTwo = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
		this.PromptThree = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';
		this.PromptFour = '<i class="fa fa-times" aria-hidden="true" style="color:red"></i>';

		this.PromptAll = {};
		this.PromptOneWidth = 0;
		this.PromptTwoWidth = 0;
		this.PromptThreeWidth = 0;
		this.PromptFourWidth = 0;
	},
	clearTime(){    // 清除定时器
		if(this.getCode){
		clearTimeout(this.getCode);
		}
	},
	telCodeTimeOut(){   //验证码倒计时 手机
		if(!this.tel){
			this.errorTel = "请输入手机号";
			this.telErrorInput = "errorInput";
			return false;
		}else{
			let $this = this;
			this.telCodeText = 60;
			this.telCodeDisabled = true;
			this.getCode = setInterval(function(){
				$this.telCodeText -=1;
				if($this.telCodeText <=1){
					clearTimeout($this.getCode);
					$this.telCodeText = "重新获取";
					$this.telCodeDisabled = false;
				}
			},1000);

			this.$ajax({
				method: "post",
				url: "/trade/tps/pbscs.do",
				data:{
					"verifystr":this.tel,
					"type":"mobile"
				}
			}).then(function(data){
				console.log(data)
				if(data.data.err_code == "1"){
					$this.$Modal.info({
						content:'验证码发送成功，请注意查收。'
					})
				}else{
					$this.$Modal.info({
						content:'验证码发送失败，请重新发送。'
					})
				}
			})
		}
	},
	telCodeTimeOut1(){   //验证码倒计时 邮箱

		if(!this.email){
			this.errorEmail = "请输入邮箱";
			this.emailErrorInput = "errorInput"
			return false;
		}else{
			let $this = this;
			this.telCodeText = 60;
			this.telCodeDisabled = true;
			this.getCode = setInterval(function(){
				$this.telCodeText -=1;
				if($this.telCodeText <=1){
					clearTimeout($this.getCode);
					$this.telCodeText = "重新获取";
					$this.telCodeDisabled = false;
				}
			},1000);
			this.$ajax({
				method: "post",
				url: "/trade/tps/pbscs.do",
				data:{
					"verifystr":this.email,
					"type":"email"
				}
			}).then(function(data){
				console.log(data)
				if(data.data.err_code == "1"){
					$this.$Modal.info({
						content:'验证码发送成功，请注意查收。'
					})
				}else{
					$this.$Modal.info({
						content:'验证码发送失败，请重新发送。'
					})
				}
			})
		}
	},
	submitTel(){    //手机注册
		let that  = this;
		if(!this.tel && !this.vsCode && !this.telCode && !this.password && !this.passwordAgain){
			if(!this.tel){
				this.errorTel = "请输入手机号";
				this.telErrorInput = "errorInput"
			}
			if(!this.vsCode){
				this.errorVsCode = "请输入验证码";
				this.vsCodeErrorInput = "errorInput"
			}
			if(!this.telCode){
				this.errorTelCode = "请输入短信验证码";
				this.telCodeErrorInput = "errorInput"
			}
			if(!this.password){
				this.errorPassword = "请输入密码";
				this.passwordCodeErrorInput = "errorInput"
			}
			if(!this.passwordAgain){
				this.errorPasswordAgain = "请确认密码";
				this.passwordAgainCodeErrorInput = "errorInput"
			}
		}else if(this.tel && this.vsCode && this.telCode && this.password && this.passwordAgain){
			if(this.tel && !(/^1[34578]\d{9}$/.test(this.tel))){
				this.errorTel = "手机号格式不正确";
				this.telErrorInput = "errorInput"
				return false;
			}
			// 密码格式/^[a-zA-Z]+(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/
			if(this.password && (!/[A-Z]+/g.test(this.password) || (!/[a-z]+/g.test(this.password)) || (!/^[a-zA-Z]+/g.test(this.password)) || (!/\d+/g.test(this.password)) || this.password.length<8 || this.password.length>20)){
				this.errorPassword = "密码格式不正确请重新输入。";
				this.passwordCodeErrorInput = "errorInput"
				return false;
			}
			if(this.password != this.passwordAgain){
				this.$Modal.info({
					content:'两次密码输入不一致，请重新输入。'
				})
				return false;
			}

			if(!this.single){
				this.$Modal.info({
					content:'请同意《蜂巢币用户协议》。'
				})
				return false;
			}
			
			this.$ajax({
				method: 'post',
				url: '/trade/tps/pbrus.do',
				data: {
					"loginname":this.tel,
					"checkcode":this.errorVsCode,
					"msgcheckcode":this.telCode,
					"password":this.password,
					"confirmpassword":this.passwordAgain,
					"invitedcode":this.InvitationCode
				}
			}).then(function(data){
				console.log(data)
				if(data.data.err_code == "1"){
					that.$Modal.info({
						content:'注册成功。'
					})
				}else{
					that.$Modal.info({
						content:'注册失败,'+data.data.msg
					})
				}
			})
		
		}
	},
	submitEmail(){   // 邮箱注册
		console.log("邮箱")
		console.log(this.email,this.vsCode,this.telCode,this.password,this.passwordAgain)
		let that = this;
		if(!this.email && !this.vsCode && !this.telCode && !this.password && !this.passwordAgain){
			if(!this.email){
				this.errorEmail = "请输入邮箱";
				this.emailErrorInput = "errorInput"
			}
			if(!this.vsCode){
				this.errorVsCode = "请输入验证码";
				this.vsCodeErrorInput = "errorInput"
			}
			if(!this.telCode){
				this.errorTelCode = "请输入邮箱验证码";
				this.telCodeErrorInput = "errorInput"
			}
			if(!this.password){
				this.errorPassword = "请输入密码";
				this.passwordCodeErrorInput = "errorInput"
			}
			if(!this.passwordAgain){
				this.errorPasswordAgain = "请确认密码";
				this.passwordAgainCodeErrorInput = "errorInput"
			}
		}else if(this.email && this.vsCode && this.telCode && this.password && this.passwordAgain){
			console.log(this.email)
			if(this.email && !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))){
				this.errorEmail = "邮箱格式不正确";
				this.emailErrorInput = "errorInput"
				return false;
			}
			// 密码格式/^[a-zA-Z]+(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/
			if(this.password && (!/[A-Z]+/g.test(this.password) || (!/[a-z]+/g.test(this.password)) || (!/^[a-zA-Z]+/g.test(this.password)) || (!/\d+/g.test(this.password)) || this.password.length<8 || this.password.length>20 )){
				this.errorPassword = "密码格式不正确请重新输入。";
				this.passwordCodeErrorInput = "errorInput"
				return false;
			}
			if(this.password != this.passwordAgain){
				this.$Modal.info({
					content:'两次密码输入不一致，请重新输入。'
				})
				return false;
			}
			if(!this.single){
				this.$Modal.info({
					content:'请同意《蜂巢币用户协议》。'
				})
				return false;
			}
			this.$ajax({
				method: 'post',
				url: '/trade/tps/pbrus.do',
				data: {
					"loginname":this.email,
					"checkcode":this.errorVsCode,
					"msgcheckcode":this.telCode,
					"password":this.password,
					"confirmpassword":this.passwordAgain,
					"invitedcode":this.InvitationCode
				}
			}).then(function(data){
				console.log(data)
				if(data.data.err_code == "1"){
					that.$Modal.info({
						content:'注册成功。'
					})
				}else{
					that.$Modal.info({
						content:'注册失败,'+data.data.msg
					})
				}
			})
		}
	},
	telFocus(){      // 获得焦点  消除错误提示
		this.errorTel = '';
		this.errorEmail = '';
		this.telErrorInput = "";
		this.emailErrorInput = '';
	},
	vsCodeFocus(){
		this.errorVsCode = '';
		this.vsCodeErrorInput = '';
	},
	telCodeFocus(){
		this.errorTelCode = '';
		this.telCodeErrorInput = '';
	},
	passwordFocus(){
		this.errorPassword = '';
		this.passwordCodeErrorInput = '';

		this.prompt = true;
	},
	passwordBlur(){     // 密码提示框消失
		this.prompt = false;
	},
	passwordAgainFocus(){
		this.errorPasswordAgain = '';
		this.passwordAgainCodeErrorInput = ""
	}
	}
}
</script>
<style>
.register-box-background{
	background: #f9f9f9;
	width: 100%;
	padding: 65px 0;
}
.register-box{
	width: 1200px;
	margin: 0 auto;
	height: 580px;
}
.register-box>.register-left{
	width: 800px;
	box-sizing: border-box;
	height: 580px;
	float: left;
}
.register-box>.register-right{
	width: 400px;
	box-sizing: border-box;
	height: 580px;
	float: right;
	padding: 0 45px;
	background: #fff;
}
.register-right-tabs>.ivu-tabs-bar>.ivu-tabs-nav-container{
	font-size: 18px;
	color: #999;
}
.register-right-tabs>.ivu-tabs-bar>.ivu-tabs-nav-container>.ivu-tabs-nav-wrap>.ivu-tabs-nav-scroll>.nav-text.ivu-tabs-nav>.ivu-tabs-tab{
	padding: 20px 0;
}
.register-right-tabs>.ivu-tabs-nav>.ivu-tabs-tab-active{
	color: #000;
}
.register-input{
	width: 100%;
	margin-bottom: 14px;
	position: relative;
	height: 48px;
}
.register-input input{
	height: 40px;
	background: #fafafa;
}
.errorInput input{
	border: 1px solid red;
}
.register-input .register-vsCode{
	position: absolute;
	width: 110px;
	height: 40px;
	top:0;
	right:0;
}
.register-input button{
	width: 100%;
	height: 40px;
	font-size: 14px;
}
.register-input .register-error-text{
	position: absolute;
	top: 42px;
	left: 10px;
	font-size: 12px;
	color: red;
}
.prompt{
	position: absolute;
	top: 60px;
	left: 50px;
	width: 200px;
	background-color: #f2f2f2;
	padding: 10px;
	border-radius: 2px;
	box-shadow: 0 7px 20px #000;
	z-index: 10;
}
.prompt p{
	font-size: 12px;
}
.prompt .p-gray{
	color: gray;
}
.prompt .prompt-div{
	margin-top: 5px;
}
.prompt .prompt-div .prompt-div-p{
	color: #282828;
	font-size: 12px;
	font-weight: 600;
}
.prompt .prompt-div .change-longer{
	position: relative;
	margin: 3px 0;
	width: 100%;
	height: 5px;
	background: -webkit-linear-gradient(left, rgba(3, 255, 0, 0.1), rgba(255, 0, 0, 0.1)); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(right, rgba(3, 255, 0, 0.1), rgba(255, 0, 0, 0.1)); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(right, rgba(3, 255, 0, 0.1), rgba(255, 0, 0, 0.1)); /* Firefox 3.6 - 15 */
	background: linear-gradient(to right, rgba(3, 255, 0, 0.1), rgba(255, 0, 0, 0.1)); /* 标准的语法 */
}
.prompt .prompt-div .change-longer .change-longer-children{
	position: absolute;
	top: 0;
	left: 0;
	height: 5px;
	background: -webkit-linear-gradient(left, rgb(3, 255, 0), rgb(255, 0, 0)); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(right, rgb(3, 255, 0), rgb(255, 0, 0)); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(right, rgb(3, 255, 0), rgb(255, 0, 0)); /* Firefox 3.6 - 15 */
	background: linear-gradient(to right, rgb(3, 255, 0), rgb(255, 0, 0)); /* 标准的语法 */
	transition: all 0.3s;
}
.prompt .prompt-div .prompt-div-p2{
	color: #282828;
}
.prompt:before{
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
</style>
