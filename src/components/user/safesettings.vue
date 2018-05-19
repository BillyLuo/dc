<template>
  <div class="safe-settings">
    <div :style="{background:'#2A2A2A',marginBottom:'3px',fontSize:'18px',color:'#fff',height:'76px',lineHeight:'76px',boxShadow:'1px 2px 3px 0px #000'}">
      <h4 class="text-left" :style="{paddingLeft:'10px',fontWeight:'500'}">
        账户安全
      </h4>
    </div>
    <Row>
      <Col>
        <div class="text-left safe-level clear" :style="{color:'#666'}">
          <div class="color-grey float-left" :style="{width:'300px',fontSize:'14px'}">
            安全等级
          </div>
          <div class="float-left" :style="{width:'300px',marginRight:'40px'}">
            <Progress :stroke-width="15" :percent="safeLevel">
              <span class="color-grey">{{safeLevelStatus}}</span>
            </Progress>
          </div>
          <div class="float-left color-grey">
            {{safeLevelInfo}}
          </div>
        </div>
      </Col>
      <Col span="24">
        <div class="setting-item bind-email">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>
                <i v-if="userinfo.email.bound" class="icon-status icon-setted">
                  <Icon type="checkmark-round"></Icon>
                </i>
                <i v-else class="icon-status icon-to-be-set">
                  <Icon type="alert"></Icon>
                </i> 
                绑定您的邮箱</h3>
              <a href="javascript:;" :class="{active:userinfo.email.bound,disabled:true}" @click="openEmailModal">{{userinfo.email.bound?(userinfo.email.value.match(/.+@/)[0].length > 3 ? userinfo.email.value.slice(0,2)+'****':userinfo.email.value.match(/.+(?=@)/))+userinfo.email.value.match(/@.+$/):'未绑定'}}</a>
             </div>
             <a href="javascript:;" @click="openEmailModal" :class="{'item-status':true,'item-status-active':!userinfo.email.bound,disabled:userinfo.email.bound}">{{userinfo.email.bound?'已绑定':'绑定'}}</a>
          </div>
        </div>
      </Col>
      <Col span="24">
        <div class="setting-item bind-name">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>
                <i v-if="userinfo.nameAuth.bound" class="icon-status icon-setted">
                  <Icon type="checkmark-round"></Icon>
                </i>
                <i v-else class="icon-status icon-to-be-set">
                  <Icon type="alert"></Icon>
                </i> 
                <span>实名认证</span>
              </h3>
              <a v-if="userinfo.nameAuth.bound" class="active disabled" href="javascript:;">已认证</a>
              <a href="javascript:;" v-else>未认证</a>
             </div>
             <a href="javascript:;" class="item-status disabled" v-if="userinfo.nameAuth.bound" >您的账号已通过实名认证</a>
             <a href="javascript:;" class="item-status item-status-active" v-else @click="()=>{this.$router.push({path:'/user/authentication',query:{name:'authentication'}})}">实名认证</a>
          </div>
        </div>
      </Col>
      <Col span="24">
        <div class="setting-item bind-phone">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>
                <i v-if="userinfo.phone.bound" class="icon-status icon-setted">
                  <Icon type="checkmark-round"></Icon>
                </i>
                <i v-else class="icon-status icon-to-be-set">
                  <Icon type="alert"></Icon>
                </i> 
                手机绑定</h3>
              <a href="javascript:;" v-if="userinfo.phone.bound" class="active">{{userinfo.phone.value.slice(0, 3) +
          "****" + userinfo.phone.value.slice(-4)}}</a>
              <a href="javascript:;" v-else>绑定</a>
             </div>
             <a href="javascript:;" v-if="userinfo.phone.bound" class="item-status" @click="openTelModal">修改</a>
             <a href="javascript:;" class="item-status item-status-active" v-else @click="openTelSetModal">绑定</a>
          </div>
        </div>
      </Col>
      <!-- <Col span="24">
        <div class="setting-item bind-code">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>
                <i v-if="userinfo.google.bound" class="icon-status icon-setted">
                  <Icon type="checkmark-round"></Icon>
                </i>
                <i v-else class="icon-status icon-to-be-set">
                  <Icon type="alert"></Icon>
                </i> 
                谷歌验证码</h3>
              <a href="javascript:;">未绑定</a>
             </div>
             <a href="javascript:;" class="item-status" @click="google">绑定</a>
          </div>
        </div>
      </Col> -->
      <Col span="24">
        <div class="setting-item bind-loginpass">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>
                <i v-if="userinfo.loginPass.bound" class="icon-status icon-setted">
                  <Icon type="checkmark-round"></Icon>
                </i>
                <i v-else class="icon-status icon-to-be-set">
                  <Icon type="alert"></Icon>
                </i> 
                登录密码设置</h3>
              <a v-if="userinfo.loginPass.bound" class="active" href="javascript:;">已设置</a>
              <a v-else href="javascript:;">设置</a>
             </div>
             <a href="javascript:;" class="item-status" @click="openLoginPassModal">修改</a>
          </div>
        </div>
      </Col>
      <Col span="24">
        <div class="setting-item bind-tradepass">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>
                <i v-if="userinfo.tradePass.bound" class="icon-status icon-setted">
                  <Icon type="checkmark-round"></Icon>
                </i>
                <i v-else class="icon-status icon-to-be-set">
                  <Icon type="alert"></Icon>
                </i> 
                交易密码设置</h3>
              <a v-if="userinfo.tradePass.bound" class="active">
                已设置
              </a>
              <a v-else href="javascript:;" @click="openTradePassModal">未设置</a>
             </div>
             <a v-if="!userinfo.tradePass.bound" href="javascript:;" class="item-status item-status-active" @click="openTradePassModal">绑定</a>
             <a v-else href="javascript:;" class="item-status" @click="()=>{this.setTradePwdModal=true}">修改</a>
          </div>
        </div>
      </Col>
    </Row>
    <LoginRecord />
    <Modal
        width="400"
        title="邮箱认证"
        v-model="emailModal"
        :loading="emailLoading">
        <Input placeholder="邮箱地址" v-model="input_email">
          <span slot="append" style="cursor: pointer;" @click="sendEmailCode">{{bindEmailText}}</span>
        </Input>
        <div class="errmsg">{{emailErrMsg}}</div>
        <Input placeholder="邮箱验证码" v-model="input_email_code"/>
        <Button :class="'btn-block'" slot="footer" type="primary" @click="email_ok">确定</Button>
        <div class="errmsg">{{emailCodeErrMsg}}</div>
    </Modal>
    <Modal width="400"
      title="绑定手机"
      v-model="telSetModal"
    >
      <Form :label-width="100"
      :rules="telSetRules"
      ref="telSet"
      :model="telSetValidate"
      > 
        <FormItem label="国家：" prop="country_code">
          <Select class="" v-model="telSetValidate.country_code">
            <Option v-for="(country,index) in countryList" :key="country.phone_code+index" :value="country.phone_code">{{country.name + '（'+country.phone_code + '）'}}</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号码：" prop="tel">
          <Input v-model="telSetValidate.tel" placeholder="请输入手机号码" />
        </FormItem>
        <FormItem label="验证码：" prop="imgCode">
          <Input v-model="telSetValidate.imgCode" placeholder="验证码" :class="'img-code-input'">
            <img :src="telImgUrl" slot="append" :class="'imgUrl'" alt="" />
          </Input>
          <div style="padding-top: 8px;text-align: right;line-height: 20px;"><a href="javascript:;" @click="refreshTelImgUrl">刷新验证码</a></div>
        </FormItem>
        <FormItem label="短信验证码：" prop="code">
          <Input v-model="telSetValidate.code" placeholder="短信验证码">
            <a style="color: #333;" href="javascript:;" slot="append" @click="sendSetTel">{{setTelText}}</a>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="confirmTelSet" type="primary" :class="'btn-block'">确定</Button>
      </div>
    </Modal>
    <Modal
        width="400"
        title="修改手机"
        v-model="telModal"
        :loading="telLoading"
        @on-ok="tel_ok">
        <Form :class="'modify-tel'" ref="modifyTel" :model="modifyTelValidate" :rules="modifyTelRules" :label-width="100">
          <FormItem label="手机号码" prop="tel">
              <Input v-model="modifyTelValidate.tel" :placeholder="modifyTelValidate.tel" disabled />
          </FormItem>
          <FormItem label="短信验证码" prop="code">
              <Input v-model="modifyTelValidate.code" placeholder="短信验证码">
                <a href="javascript:;" slot="append" style="color: #333;" class="send-code" @click="sendModifyTel1">{{sendModifyTelText1}}</a>
              </Input>
          </FormItem>
          <FormItem label="国家：" prop="country_code">
            <Select class="" v-model="modifyTelValidate.country_code">
              <Option v-for="(country,index) in countryList" :key="country.phone_code+index" :value="country.phone_code">{{country.name + '（'+country.phone_code + '）'}}</Option>
            </Select>
          </FormItem>
          <FormItem label="新手机号码" prop="new_tel">
              <Input v-model="modifyTelValidate.new_tel" placeholder="手机号码">
              </Input>
          </FormItem>
          <FormItem label="短信验证码" prop="new_code">
              <Input v-model="modifyTelValidate.new_code" placeholder="短信验证码">
                <a href="javascript:;" style="color: #333;" slot="append" class="send-code" @click="sendModifyTel2">{{sendModifyTelText2}}</a>
              </Input>
          </FormItem>
          <FormItem label="验证码" prop="imgCode">
              <Input :class="'img-code-input'" v-model="modifyTelValidate.imgCode" placeholder="验证码">
                <img :src="telImgUrl" slot="append" :class="'imgUrl'" @click="refreshTelImgUrl" alt="图片验证码">
              </Input>
              <div style="padding-top: 8px;text-align: right;line-height: 20px;"><a href="javascript:;" @click="refreshTelImgUrl">刷新验证码</a></div>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button :class="'btn-block'" slot="footer" type="primary" @click="tel_ok">确定</Button>
        </div>
    </Modal>
    <Modal
        width="400"
        title="修改登录密码"
          v-model="loginPassModal"
        >
        <Form 
          :class="'modify-pass'" 
          :label-width="100"
          ref="modifyLogin"
          :model="modifyLoginValidate"
          :rules="modifyLoginRules"
        >
          <FormItem label="旧登录密码：" prop="oldpwd">
            <Input v-model="modifyLoginValidate.oldpwd" placeholder="请输入旧密码" type="password"></Input>
          </FormItem>
          <FormItem label="新登录密码：" prop="newpwd">
            <Input v-model="modifyLoginValidate.newpwd" placeholder="请设置新密码" type="password" />
          </FormItem>
          <FormItem label="确认新密码：" prop="confirmpwd">
            <Input v-model="modifyLoginValidate.confirmpwd" placeholder="请再一次输入密码" type="password"></Input>
          </FormItem>
          <FormItem label="验证码：" prop="code">
            <Input placeholder="请输入验证码" v-model="modifyLoginValidate.code">
              <a style="color: #333;" slot="append"  @click="sendLoginMessage">{{loginCodeMsg}}</a>
            </Input>
              <Button slot="append" class="send-code">
                <span>发送验证码</span>
              </Button>
            </Input>
          </FormItem>
        </Form>
        <Button type="primary" :class="'btn-block'" slot="footer" @click="login_pass_ok">确定</Button>
    </Modal>
    <Modal
        width="400"
        title="设置交易密码"
        v-model="tradePassModal">
        <Form :class="'modify-trade-pass'" :label-width="100"
          :rules="modifyTradeRules"
          :model="modifyTradeValidate"
          ref="modifyTrade"
        >
          <FormItem label="交易密码：" prop="newpwd">
            <Input placeholder="" type="password" v-model="modifyTradeValidate.newpwd"></Input>
          </FormItem>
          <FormItem label="确认密码：" prop="confirmpwd">
            <Input placeholder="" type="password" v-model="modifyTradeValidate.confirmpwd"></Input>
          </FormItem>
          <FormItem label="验证码：" prop="code">
            <Input placeholder="" prop="code" v-model="modifyTradeValidate.code">
              <a style="color:#333;" slot="append" class="send-code" @click="sendModifyTrade">
                {{modifyTradeText}}
              </a>
            </Input>
          </FormItem>
        </Form>
        <Button type="primary" :class="'btn-block'" slot="footer" @click="trade_pass_ok">确定</Button>
    </Modal>
    <Modal title="修改交易密码" v-model="setTradePwdModal"
      width="400"
    >
      <Form :model="setTradeValidate"
        :label-width="100"
        ref="setTradePwd"
        :rules="setTradeRules">
        <FormItem label="旧交易密码：" prop="oldpwd">
          <Input v-model="setTradeValidate.oldpwd" placeholder="旧交易密码" type="password" />
        </FormItem>
        <FormItem label="新交易密码：" prop="newpwd">
          <Input v-model="setTradeValidate.newpwd" placeholder="新交易密码" type="password" />
        </FormItem>
        <FormItem label="确认新密码：" prop="confirmpwd">
          <Input v-model="setTradeValidate.confirmpwd" placeholder="确认新交易密码" type="password" />
        </FormItem>
        <FormItem label="验证码：" prop="code">
          <Input v-model="setTradeValidate.code" placeholder="验证码" type="text">
            <a href="javascript:;" style="color: #333;" slot="append" @click="sendSetTrade">{{setTradeText}}</a>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :class="'btn-block'" @click="set_trade_ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Form, FormItem, Icon, Progress } from 'iview';
import LoginRecord from './loginrecord';
import {telReg,emailReg} from '../constant/constant';
export default {
  data () {
    return {
      input_email_code:'',//绑定邮箱时的邮箱验证码
      emailCodeErrMsg:'', //绑定邮箱时的邮箱验证码错误信息
      emailTimer:null,
      bindEmailText:'发送验证码',
      lang:'',
      countryList:[],
      safeLevelStatus:'',
      safeLevel:0,
      safeLevelInfo:'',
      emailModal: false,
      emailErrMsg:'',
      telModal:false,
      telSetModal:false,
      telLoading:true,
      telImgUrl:'/trade/tps/pbccs.do?'+Date.now(),
      loginPassModal: false,
      tradePassModal: false,
      setTradePwdModal:false,
      input_email:'',
      emailLoading:true,
      loginCodeMsg:'发送验证码',
      setTelText:'发送验证码',
      sendModifyTelText1:'发送验证码',
      sendModifyTelText2:'发送验证码',
      modifyTradeText:'发送验证码',
      setTradeText:'发送验证码',
      setTelTimer:null,
      modifyTelTimer1:null,
      modifyTelTimer2:null,
      modifyTradeTimer:null,
      setTradeTimer:null,
      loginCodeState:1,  //1,未发送  2.发送中
      loginTimer:null,
      country_codeold:'',
      modifyTelValidate:{
        country_code:'',
        tel:'',
        code:'',
        new_tel:'',
        new_code:'',
        imgCode:''
      },
      telSetValidate:{
        country_code:'',
        tel:'',
        imgCode:'',
        code:''
      },
      modifyTradeValidate:{
        code:'',
        newpwd:'',
        confirmpwd:'',
      },
      setTradeValidate:{
        oldpwd:'',
        newpwd:'',
        confirmpwd:'',
        code:'',
      },
      modifyTelRules:{
        tel:[
          {required:true,message:'请输入手机号码'},
          // {type:'string',len:11,message:'请输入合格的手机号码',pattern:/^1[34578]\d{9}$/,trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',message:'请正确输入6位验证码',len:4,pattern:/^\d{4}$/,trigger:'blur'}
        ],
        country_code:[
          {required:true,message:'请输入手机代码',trigger:'blur'}
        ],
        new_tel:[
          {required:true,message:'请输入您的新手机号码。',trigger:'blur'},
          {type:'string',len:11,pattern:/^1[34578]\d{9}$/,message:'请输入合格的手机号码',trigger:'blur'}        
        ],
        new_code:[
          {required:true,message:'请输入短信验证码',trigger:'blur'},
          {type:'string',message:'请正确输入4位验证码',len:4,pattern:/^\d{4}$/,trigger:'blur'}
        ],
        imgCode:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',message:'请输入4位合格的验证码',len:4,pattern:/^\w{4}$/,trigger:'blur'}
        ]
      },
      telSetRules:{
        country_code:[
          {required:true,message:'请输入电话代码',trigger:'blur'},
        ],
        tel:[
          {required:true,message:'请输入手机号码',trigger:'blur'},
          {type:'string',min:11,max:11,message:'请输入正确的手机号码',trigger:'blur'}
        ],
        imgCode:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',min:4,max:4,message:'请输入4位验证码',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入短信验证码',trigger:'blur'},
          {type:'string',min:4,max:4,message:'请输入4位短信验证码',trigger:'blur'}
        ]
      },
      modifyLoginValidate:{
        oldpwd:'',
        newpwd:'',
        confirmpwd:'',
        code:''
      },
      modifyLoginRules: {
        oldpwd:[
          {required:true,message:'请输入旧登录密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'登录密码应该在6-20位，且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'},
        ],
        newpwd:[
          {required:true,message:'请输入新登录密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'登录密码应该在6-20位，且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'},
        ],
        confirmpwd:[
          {required:true,message:'请再一次输入新密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'登录密码应该在6-20位,且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',message:'请输入4位短信验证码',len:4,pattern:/^\d{4}$/,trigger:'blur'}
        ]
      },
      modifyTradeRules:{
        newpwd:[
          {required:true,message:'请输入交易密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'交易密码应该在6-20位,且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'},
        ],
        confirmpwd:[
          {required:true,message:'请再次输入交易密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'交易密码应该在6-20位,且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',min:4,max:4,message:'请输入4位验证码',pattern:/^\w{4}$/,trigger:'blur'}
        ]
      },
      setTradeRules:{
        oldpwd:[
          {required:true,message:'请输入交易密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'交易密码应该在6-20位,且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'},
        ],
        newpwd:[
          {required:true,message:'请输入交易密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'交易密码应该在6-20位,且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'},
        ],
        confirmpwd:[
          {required:true,message:'请再次输入交易密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'交易密码应该在6-20位,且不应包含特殊字符',pattern:/^\w{6,20}$/,trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',min:4,max:4,message:'请输入4位验证码',trigger:'blur'}
        ]
      }
    }
  },
  mounted(){
    this.getLanguage();
    this.initCountry();
  },
  computed:{
    ...mapState({
      userinfo(state) {
        var info = state.userinfo;
        console.log('state-----!!!!!!',info);
        var email = {bound:false,value:''},
        nameAuth = {bound:false,value:''},
        phone = {bound:false,value:''},
        loginPass = {bound:false,value:''},
        tradePass = {bound:false,value:''},
        google = {bound:false,value:''};
        var num = 0;
        if (state.userinfo.emailset ==1) {
          email.bound = true;
          email.value = info.email;
          num += 1;
        }
        if (info.identityset ==1) {
          nameAuth.bound = true;
          num += 1;
        }
        if (info.mobileset ==1) {
          num += 1;
          phone.bound = true;
          phone.value = info.mobile;
          this.modifyTelValidate.tel = info.mobile;
        }
        if (info.googlecodeset ==1 ) {
          num += 1;
          google.bound = true;
        }
        if (info.loginpasswordset == 1) {
          num += 1;
          loginPass.bound = true;
        }
        if (info.tradepasswordset == 1) {
          num += 1;
          tradePass.bound = true;
        }
        console.log('------userinfo-------',{
          email,nameAuth,phone,loginPass,tradePass,google
        },this);
        var safeLevel = num/5*100;
        var safeLevelStatus = '';
        var safeLevelInfo = '';
        if (safeLevel < 20) {
          safeLevelStatus = '极低';
          safeLevelInfo = '为保障您的账户安全，请尽快完善安全设置';
        }else if (safeLevel < 40) {
          safeLevelStatus = '较低';
          safeLevelInfo = '为保障您的账户安全，请尽快完善安全设置';
        }else if (safeLevel < 100) {
          safeLevelStatus = '中等';
          safeLevelInfo = '您的账户较为安全，请尽快完善其他安全设置';
        }else {
          safeLevelStatus = '安全';
          safeLevelInfo = '您已通过所有安全认证';
        }
        this.safeLevel = safeLevel;
        this.safeLevelStatus = safeLevelStatus;
        this.safeLevelInfo = safeLevelInfo;
        this.country_codeold = info.country_code;
        console.log(info.country_code)
        return {
          email,nameAuth,phone,loginPass,tradePass,google
        }
      }
    })
  },
  components:{
    Form,
    FormItem,
    Icon,
    Progress,
    LoginRecord
  },
  methods:{
    //发送邮箱验证码
    sendEmailCode () {
      if (!this.input_email) {
        this.emailErrMsg = "请输入邮箱";
        return false;
      } else {
        if (
          this.input_email &&
          !emailReg.test(this.input_email)
        ) {
          this.emailErrMsg = "邮箱格式不正确";
          // this.emailErrorInput = "errorInput";
          return false;
        }
        let $this = this;
        if (this.emailTimer) {
          return;
        }
        var num = 60;
        this.emailTimer = setInterval(function() {
          num -= 1;
          if (num <= 1) {
            clearTimeout($this.emailTimer);
            $this.bindEmailText = "重新获取";
            $this.emailTimer = null;
          }else {
            $this.bindEmailText = num + ' s';
          }
        }, 1000);
        this.$ajax({
          method: "post",
          url: "/trade/tps/pbsel.do",
          data: {
            email: this.input_email,
            // reqresource: 1,
            type:"1"
          }
        }).then(function(data) {
          console.log(data);
          if (data.data.err_code == "1") {
            $this.$Notice.success({
              title: "验证码发送成功，请注意查收。",
              desc: "",
              top: 100
            });

          } else {
            $this.$Notice.error({
              title: "验证码发送失败，请重新发送。",
              top: 100
            });
          }
        }).catch((err) => {
          $this.$Notice.error({
              title: "验证码发送失败，请稍后重试。",
              top: 100
            });
        });
      }
    },
    // 设置国家电话代码
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
              this.telSetValidate.country_code = '86';
              this.modifyTelValidate.country_code = '86';
            }else {
              this.countryList = res.data.countries.map((item,index) => {
                item.name = item.desc_en;
                return item;
              })
              this.telSetValidate.country_code = res.data.countries[0].phone_code;
              this.modifyTelValidate.country_code = res.data.countries[0].phone_code;
            }
          }
        }).catch((err) => {
          console.log('获取国家列表失败',err);
          this.message.error('网络请求似乎除了问题，请稍后重试');
        })
      },
    //设置手机
    sendSetTel(){
      if (this.setTelTimer) {
        return;
      }else {

      }
      var tel = this.telSetValidate.tel.trim();
      if (!telReg.test(tel)) {
        this.$Notice.warning({
          title:'提示',
          desc:'请输入正确的手机号'
        });
        return;
      }else {
        this.sendTextMsg2(tel);
      }
      var num = 60;
      var that = this;
      this.setTelTimer = setInterval(function () {
        if (num >1) {
          num --;
          that.setTelText = num + 's后重新发送';
        }else {
          that.setTelText = '发送验证码';
          clearInterval(that.setTelTimer);
          that.setTelTimer = null;
        }
      },1000);
    },
    sendModifyTel1(){
      let that = this;
      let old_tel = this.modifyTelValidate.tel.trim();
      console.log(old_tel,this.modifyTelTimer1);
      if (this.modifyTelTimer1) {
        return;
      }
      if (!old_tel) {
        this.$Notice.warning({
          title:'提示',
          desc:'请输入手机号码'
        })
        return;
      }
      if (!telReg.test(old_tel)) {
        this.$Message.warning('请输入正确的手机号码');
        return false;
      }else {
        this.sendTextMsg(old_tel);
        var num = 60;
        that.modifyTelTimer1 = setInterval(function () {
          if (num > 1) {
            num -- ;
            that.sendModifyTelText1 = num + 's后重新获取';

          }else {
            that.sendModifyTelText1 = '发送验证码';
            clearInterval(that.modifyTelTimer1);
            that.modifyTelTimer1 = null;
          }
        },1000);
      }
    },
    sendModifyTel2(){
      let that = this;
      let new_tel = this.modifyTelValidate.new_tel.trim();
      if (this.modifyTelTimer2) {
        return false;
      }
      if (!telReg.test(new_tel)) {
        this.$Message.warning('请输入正确的手机号码');
        return false;
      }else {
        this.sendTextMsg1(new_tel);
        var num = 60;
        that.modifyTelTimer2 = setInterval(function () {
          if (num > 1) {
            num -- ;
            that.sendModifyTelText2 = num + 's后重新获取';

          }else {
            that.sendModifyTelText2 = '发送验证码';
            clearInterval(that.modifyTelTimer2);
            that.modifyTelTimer2 = null;
          }
        },1000);
      }
    },
    sendModifyTrade(){
      let that = this;
      let tel = this.userinfo.phone.value.trim();
      if (this.modifyTradeTimer) {
        return false;
      }
      if (!tel) {
        this.$Notice.warning({
          title:'提示',
          desc:'请绑定手机号码后再进行此操作'
        })
        return;
      }
      if (!telReg.test(tel)) {
        this.$Message.warning('请输入正确的手机号码');
        return false;
      }else {
        this.sendTextMsg(tel);
        var num = 60;
        that.modifyTradeTimer = setInterval(function () {
          if (num > 1) {
            num -- ;
            that.modifyTradeText = num + 's后重新获取';

          }else {
            that.modifyTradeText = '发送验证码';
            clearInterval(that.modifyTradeTimer);
            that.modifyTradeTimer = null;
          }
        },1000);
      }
    },
    sendSetTrade(){
      let that = this;
      let tel = this.userinfo.phone.value.trim();
      if (this.sendTradeTimer) {
        return false;
      }
      if (!tel) {
        this.$Notice.warning({
          title:'提示',
          desc:'请绑定手机号码后再进行此操作'
        })
        return;
      }
      if (!telReg.test(tel)) {
        this.$Message.warning('请输入正确的手机号码');
        return false;
      }else {
        this.sendTextMsg(tel);
        var num = 60;
        that.sendTradeTimer = setInterval(function () {
          if (num > 1) {
            num -- ;
            that.setTradeText = num + 's后重新获取';

          }else {
            that.setTradeText = '发送验证码';
            clearInterval(that.sendTradeTimer);
            that.sendTradeTimer = null;
          }
        },1000);
      }
    },

    //刷新验证码
    refreshTelImgUrl(){
      this.telImgUrl='/trade/tps/pbccs.do?t='+Date.now()
    },
    openEmailModal(){
      if (!this.userinfo.email.bound) {
        this.emailModal = true;
      }else {

      }
    },
    openTelSetModal() {
      this.telSetModal = true;
    },
    email_ok () {
      console.log('ok email',arguments);
      let email = this.input_email.trim();
      let mobilecode = this.input_email_code.trim();
      if (!mobilecode) {
        this.emailCodeErrMsg = '请输入邮箱验证码';
        return;
      }else if (!mobilecode.match(/^\d{4}$/)) {
        this.emailCodeErrMsg = '请输入4位正确的邮箱验证码';
        return ;
      }else {
        this.emailCodeErrMsg = '';
      }
      if (emailReg.test(email)) {
        this.$Spin.show();
        this.$ajax.post('/trade/tps/pbvcs.do',{
          type:'email',
          email,
          mobilecode,
          reqresource:1
        }).then((res)=>{
          this.$Spin.hide();
          if (res.status == 200 && res.data && res.data.err_code == '1') {
            console.log(res,'---');
            this.input_email = '';
            this.emailErrMsg = '';
            this.$Message.success('邮箱设置成功。');
            this.emailModal = false;
            // this.userinfo.email = {
            //   bound:true,
            //   value:email
            // }
            this.$store.dispatch('getUserInfo');
          }else {
            if (res.status == 200 && res.data && res.data.err_code == '2') {
              this.$Notice.warning({
                title:'提示',
                desc:res.data.msg
              })
            }else {
              this.$Notice.warning({
                title:'提示',
                desc:'设置失败，请稍后重试'
              })
            }
          }
        }).catch((err)=>{
          console.log(err);
          this.$Spin.hide();
          this.$Notice.warning({
            title:'提示',
            desc:'设置失败，请稍后重试'
          })
        })
      }else {
        console.log('wrong email');
        this.emailLoading = false;
        this.emailErrMsg = '请输入正确的邮箱';
      }
    },
    openTelModal(){
      this.telModal = true;
    },
    tel_ok(){
      this.telLoading = false;
      var that = this;
      var {code,tel,new_tel,new_code,imgCode, country_code } = this.modifyTelValidate;
      this.$refs['modifyTel'].validate((valid)=>{
        console.log('valid or not',valid);
        if (!valid) {
          return;
        }
        this.$Spin.show();
        that.$ajax.post('/trade/tps/pbvcs.do',{
          type:'mobile',
          region:'1',
          mobileold:tel,
          mobile:new_tel,
          country_code,
          country_codeold:that.country_codeold,
          mobilecodeold:code,
          mobilecode:new_code,
          code:imgCode,
          reqresource:1
        }).then((res) => {
          that.$Spin.hide();
          console.log('修改手机',res);
          if (res.data && res.data.err_code == '1') {
            that.$Message.success('手机重设成功');
            that.telModal = false;
            that.$store.dispatch('getUserInfo');
            that.$refs['modifyTel'].resetFields();
          }else if(res.data && res.data.err_code== '2' && res.data.msg){
            that.$Notice.warning({
              title:'提示',
              desc:res.data.msg
            })
          }else {
            that.$Notice.warning({
              title:'提示',
              desc:'设置失败，请稍后重试'
            })
          }
        }).catch((err) => {
          that.$Spin.hide();
          that.$Notice.warning({
            title:'提示',
            desc:'设置失败，请稍后重试'
          })
        })
      })
      this.refreshTelImgUrl();
    },
    confirmTelSet(){  //设置手机号码
      let that = this;
      var { tel, imgCode , code ,country_code } = this.telSetValidate;
      this.refreshTelImgUrl();
      this.$refs.telSet.validate((valid) => {
        console.log('valid or not',valid);
        if (valid) {
          that.$Spin.show();
          that.$ajax.post('/trade/tps/pbvcs.do',{
            type:'mobile',
            mobile:tel,
            region:1,
            country_code,
            mobilecode:code,
            code:imgCode,
            reqresource:1
          }).then((res) => {
            console.log(res);
            that.$Spin.hide();
            if (res.data && res.data.err_code == '1') {
              that.$Message.success('设置成功');
              that.$store.dispatch('getUserInfo');
              that.telSetModal = false;
              that.$refs.telSet.resetFields();
            }else if (res.data && res.data.msg) {
              that.$Notice.warning({
                title:'提示',
                desc:res.data.msg
              })
            }else {
              that.$Notice.warning({
                title:'提示',
                desc:'验证码错误，请稍后重试'
              })
            }
          }).catch((err) => {
            that.$Spin.hide();
            console.log('tel--set--err',err);
            that.$Message.warning('设置失败，请稍后重试。');
          })
        }
      })
    },
    email_cancel (){
      console.log('cancel email',arguments);
    },
    openLoginPassModal(){
      this.loginPassModal = true;
    },
    login_pass_ok (){
      let that = this;
      let {oldpwd,newpwd,confirmpwd,code} = this.modifyLoginValidate;
      let tel = this.userinfo.phone.value;
      console.log('修改登录密码');
      this.$refs.modifyLogin.validate((valid)=>{
        console.log(valid);
        if(valid) {
          if (!oldpwd) {
            that.$Message.warning('请输入旧密码。');
            return false;
          }
          if (!oldpwd.match(/^\w{8,20}$/g)) {
            that.$Message.warning('请输入8-20位密码。');
            return false;
          }
          if (!newpwd.match(/\d/g)) {
            that.$Message.warning('密码应至少包含一个数字');
            return false;
          }
          if (!newpwd.match(/[a-zA-Z]/g)) {
            that.$Message.warning('密码应至少包含一个字母');
            return false;
          }
          if (!newpwd.match(/[A-Z]/g)) {
            that.$Message.warning('密码应至少包含一个大写字母');
            return false;
          }
          if (!newpwd.match(/^[a-zA-Z].+/g)) {
            that.$Message.warning('密码应该以字母开头');
            return false;
          }
          if (newpwd !== confirmpwd) {
            that.$Message.warning('两次密码输入不一致');
            return false;
          }
          if (!tel) {
            that.$Notice.warning({
              title:'提示',
              desc:'请绑定手机号码后再进行此操作'
            })
            return false;
          }
          that.$Spin.show();
          that.$ajax.post('/trade/tps/pbvcs.do',{
            type:'loginpwd',oldpwd,newpwd,confirmpwd,mobilecode:code,reqresource:1
          }).then((res)=>{
            that.$Spin.hide();
            if (res.status == 200 && res.data && res.data.err_code == '1') {
              that.$Message.success('登录密码设置成功');
              that.loginPassModal = false;
              that.$store.dispatch('getUserInfo');
              that.$refs.modifyLogin.resetFields();
            } else {
              if (res.status == 200 && res.data && res.data.err_code == '2') {
                this.$Notice.warning({
                  title:'提示',
                  desc:res.data.msg
                })
              }else {
                this.$Notice.warning({
                  title:'提示',
                  desc:'设置失败，请稍后重试'
                })
              }
            }
          }).catch((err)=>{
            that.$Spin.hide();
            console.log('err---err',err);
            that.$Notice.warning({
              title:'提示',
              desc:'设置失败，请稍后重试'
            })
          })
        }
      })
    },
    openTradePassModal (){
      this.tradePassModal = true;
    },
    trade_pass_ok (){
      var that = this;
      let tel = this.userinfo.phone.value;
      let {newpwd,confirmpwd,code} = this.modifyTradeValidate;
      this.$refs.modifyTrade.validate((valid)=>{
        if (valid) {
          if (newpwd !== confirmpwd) {
            that.$Message.warning('两次密码输入不一致');
            return false;
          }
          if (!tel) {
            that.$Notice.warning({
              title:'提示',
              desc:'请绑定手机号码后再进行此操作'
            })
            return;
          }
          that.$Spin.show();
          that.$ajax.post('/trade/tps/pbvcs.do',{
            type:'tradepwd',
            newpwd,
            confirmpwd,
            mobilecode:code,
            reqresource:1
          }).then((res)=>{
            console.log(res);
            that.$Spin.hide();
            if (res && res.data && res.data.err_code == '1') {
              that.$Message.success('交易密码设置成功');
              that.tradePassModal = false;
              that.$store.dispatch('getUserInfo');
              that.$refs.modifyTrade.resetFields();
            }else {
              if (res.status == 200 && res.data && res.data.err_code == '2') {
                this.$Notice.warning({
                  title:'提示',
                  desc:res.data.msg
                })
              }else {
                this.$Notice.warning({
                  title:'提示',
                  desc:'设置失败，请稍后重试'
                })
              }
            }
          }).catch((err)=>{
            that.$Spin.hide();
            console.log('---wrong err---',err);
            that.$Notice.warning({
              title:'提示',
              desc:'设置失败，请稍后重试'
            })
          })
        }
      })
    },
    set_trade_ok() {  //修改交易密码
      console.log('设置交易密码');
      var that = this;
      var tel = this.userinfo.phone.value;
      let {newpwd,confirmpwd,code,oldpwd} = this.setTradeValidate;
      this.$refs.setTradePwd.validate((valid)=>{
        if (valid) {
          if (newpwd !== confirmpwd) {
            that.$Message.warning('两次密码输入不一致');
            return false;
          }
          if (!tel) {
            that.$Notice.warning({
              title:'提示',
              desc:'请绑定手机号码后再进行此操作'
            })
            return;
          }
          that.$Spin.show();
          that.$ajax.post('/trade/tps/pbvcs.do',{
            type:'tradepwd',
            newpwd,
            oldpwd,
            confirmpwd,
            mobilecode:code,
            reqresource:1
          }).then((res)=>{
            that.$Spin.hide();
            console.log(res);
            if (res && res.data && res.data.err_code == '1') {
              that.$Message.success('交易密码修改成功');
              that.setTradePwdModal = false;
              that.$store.dispatch('getUserInfo');
              that.$refs.setTradePwd.resetFields();
            }else {
              if (res.status == 200 && res.data && res.data.err_code == '2') {
                this.$Notice.warning({
                  title:'提示',
                  desc:res.data.msg
                })
              }else {
                this.$Notice.warning({
                  title:'提示',
                  desc:'设置失败，请稍后重试'
                })
              }
            }
          }).catch((err)=>{
            that.$Spin.hide();
            console.log('---wrong err---',err);
            that.$Notice.warning({
              title:'提示',
              desc:'设置失败，请稍后重试'
            })
          })
        }
      })
    },
    google(){
      this.$Modal.info({
        title:'提示',
        content:'功能暂未开放',
        'closable':true
      })
    },
    sendLoginMessage(){
      let tel = this.userinfo.phone.value.trim();
      if (!tel) {
        this.$Notice.warning({
          title:'提示',
          desc:'请绑定手机号码后再进行此操作'
        })
        return false;
      }
      console.log('sendmessage',tel,this.loginCodeState); //修改登录密码 loginModal  发送验证码
      var num = 60;
      var that = this;
      if (this.loginCodeState == 2) {
        return false;
      }else {
        this.loginTimer = setInterval(function () {
          num -- ;
          that.loginCodeMsg = num + '秒后重发';
          that.loginCodeState = 2;
          if (num <= 0) {
            clearInterval(that.loginTimer);
            that.loginCodeState = 1;
            that.loginCodeMsg = '发送验证码';
          }
        },1000);
        this.$ajax.post('/trade/tps/pbaut.do',{
            reqresource: 1,
            "type":"2"
        }).then((res) => {
          console.log('短信验证',res);
          if (res.status == 200 && res.data && res.data.err_code == '1') {
            that.$Message.success('短信已发送');
          }else {
            that.$Message.warning('短信发送失败，请稍后重试。');
          }
        }).catch((err) => {
          console.log(err);
          that.$Message.success('短信发送失败，请稍后重试。');
        })
      }
    },
    sendTextMsg(tel){
      var that = this;
      if (!tel) {
        that.$Notice.warning({
          title:'提示',
          desc:'请输入手机号码。'
        });
        return;
      }
      this.$ajax.post('/trade/tps/pbaut.do',{
            reqresource: 1,
            "type":"2"
      }).then((res) => {
        console.log('短信验证',res);
        if (res.status == 200 && res.data && res.data.err_code == '1') {
          that.$Message.success('短信已发送');
        }else {
          that.$Message.warning('短信发送失败，请稍后重试。');
        }
      }).catch((err) => {
        console.log(err);
        that.$Message.warning('短信发送失败，请稍后重试。');
      })
    },
    sendTextMsg1(tel){
      var that = this;
      if (!tel) {
        that.$Notice.warning({
          title:'提示',
          desc:'请输入手机号码。'
        });
        return;
      }
      this.$ajax.post('/trade/tps/pbaut.do',{
            reqresource: 1,
            country_code:this.modifyTelValidate.country_code,
            phone:tel,
            "type":"2"
      }).then((res) => {
        console.log('短信验证',res);
        if (res.status == 200 && res.data && res.data.err_code == '1') {
          that.$Message.success('短信已发送');
        }else {
          that.$Message.warning('短信发送失败，请稍后重试。');
        }
      }).catch((err) => {
        console.log(err);
        that.$Message.warning('短信发送失败，请稍后重试。');
      })
    },
    sendTextMsg2(tel){
      var that = this;
      if (!tel) {
        that.$Notice.warning({
          title:'提示',
          desc:'请输入手机号码。'
        });
        return;
      }
      this.$ajax.post('/trade/tps/pbaut.do',{
            reqresource: 1,
            country_code:this.telSetValidate.country_code,
            phone:tel,
            "type":"2"
      }).then((res) => {
        console.log('短信验证',res);
        if (res.status == 200 && res.data && res.data.err_code == '1') {
          that.$Message.success('短信已发送');
        }else {
          that.$Message.warning('短信发送失败，请稍后重试。');
        }
      }).catch((err) => {
        console.log(err);
        that.$Message.warning('短信发送失败，请稍后重试。');
      })
    }
  }
}
</script>

<style lang="scss">
  
</style>
