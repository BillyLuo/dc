<template>
  <div class="safe-settings">
    <Row>
      <Col span="8">
        <div class="setting-item bind-email">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>绑定您的邮箱</h3>
              <a href="javascript:;" :class="{active:userinfo.email.bound,disabled:true}" @click="openEmailModal">{{userinfo.email.bound?'已绑定':'未绑定'}}</a>
             </div>
             <a href="javascript:;" @click="openEmailModal" :class="{'item-status':true,disabled:userinfo.email.bound}">{{userinfo.email.bound?userinfo.email.value.slice(0,4)+'****'+userinfo.email.value.match(/@.+$/):'绑定'}}</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-name">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>实名认证</h3>
              <a v-if="userinfo.nameAuth.bound" class="active disabled" href="javascript:;">已认证</a>
              <a v-else>认证</a>
             </div>
             <a href="javascript:;" class="item-status disabled">您的账号已通过实名认证</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-phone">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>手机绑定</h3>
              <a href="javascript:;" v-if="userinfo.phone.bound" class="active">{{userinfo.phone.value.slice(0, 4) +
          "****" + userinfo.phone.value.slice(-4)}}</a>
              <a href="javascript:;" v-else>绑定</a>
             </div>
             <a href="javascript:;" v-if="userinfo.phone.bound" class="item-status" @click="openTelModal">修改</a>
             <a href="javascript:;" class="item-status" v-else @click="openTelSetModal">绑定</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-code">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>谷歌验证码</h3>
              <a href="javascript:;">未绑定</a>
             </div>
             <a href="javascript:;" class="item-status" @click="google">绑定</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-loginpass">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>登录密码设置</h3>
              <a v-if="userinfo.loginPass.bound" class="active" href="javascript:;">已设置</a>
              <a v-else href="javascript:;">设置</a>
             </div>
             <a href="javascript:;" class="item-status" @click="openLoginPassModal">修改</a>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="setting-item bind-tradepass">
          <div class="clear">
            <div class="item-pic float-left">
              <i></i>
            </div>
             <div class="item-content float-left">
              <h3>交易密码设置</h3>
              <a v-if="userinfo.tradePass.bound" class="active">
                已设置
              </a>
              <a v-else href="javascript:;" @click="openTradePassModal">未设置</a>
             </div>
             <a v-if="!userinfo.tradePass.bound" href="javascript:;" class="item-status" @click="openTradePassModal">绑定</a>
             <a v-else href="javascript:;" class="item-status" @click="openTradePassModal">修改</a>
          </div>
        </div>
      </Col>
    </Row>
    <Modal
        width="400"
        title="邮箱认证"
        v-model="emailModal"
        :loading="emailLoading">
        <Input placeholder="邮箱地址" v-model="input_email"/>
        <div class="errmsg">{{emailErrMsg}}</div>
        <Button :class="'btn-block'" slot="footer" type="primary" @click="email_ok">确定</Button>
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
            <a style="color: #333;" href="javascript:;" slot="append">发送验证码</a>
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
                <Button type="primary" slot="append" class="send-code">发送验证码</Button>
              </Input>
          </FormItem>
          <FormItem label="手机号码" prop="new_tel">
              <Input v-model="modifyTelValidate.new_tel" placeholder="手机号码">
              </Input>
          </FormItem>
          <FormItem label="短信验证码" prop="new_code">
              <Input v-model="modifyTelValidate.new_code" placeholder="短信验证码">
                <Button type="primary" slot="append" class="send-code">发送验证码</Button>
              </Input>
          </FormItem>
          <FormItem label="验证码" prop="imgCode">
              <Input :class="'img-code-input'" v-model="modifyTelValidate.imgCode" placeholder="验证码">
                <img :src="telImgUrl" slot="append" :class="'imgUrl'" alt="">
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
          <FormItem label="新交易密码：" prop="newpwd">
            <Input placeholder="" type="password" v-model="modifyTradeValidate.newpwd"></Input>
          </FormItem>
          <FormItem label="确认新密码：" prop="confirmpwd">
            <Input placeholder="" type="password" v-model="modifyTradeValidate.confirmpwd"></Input>
          </FormItem>
          <FormItem label="验证码：" prop="code">
            <Input placeholder="" prop="code" v-model="modifyTradeValidate.code">
              <a style="color:#333;" slot="append" class="send-code">
                发送验证码
              </a>
            </Input>
          </FormItem>
        </Form>
        <Button type="primary" :class="'btn-block'" slot="footer" @click="trade_pass_ok">确定</Button>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Form, FormItem } from 'iview';
export default {
  data () {
    return {
      emailModal: false,
      emailErrMsg:'',
      telModal:false,
      telSetModal:false,
      telLoading:true,
      telImgUrl:'/trade/tps/pbccs.do?'+Date.now(),
      loginPassModal: false,
      tradePassModal: false,
      input_email:'',
      emailLoading:true,
      loginCodeMsg:'发送验证码',
      loginCodeState:1,  //1,未发送  2.发送中
      loginTimer:null,
      modifyTelValidate:{
        tel:'15178875695',
        code:'',
        new_tel:'',
        new_code:'',
        imgCode:''
      },
      telSetValidate:{
        tel:'',
        imgCode:'',
        code:''
      },
      modifyTradeValidate:{
        code:'123456',
        newpwd:'Aa123123',
        confirmpwd:'Aa123123',
      },
      modifyTelRules:{
        tel:[
          {required:true,message:'请输入手机号码'},
          {type:'string',min:11,max:11,message:'请输入合格的手机号码',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',message:'请输入4位验证码',min:4,trigger:'blur'}
        ],
        new_tel:[
          {required:true,min:11,message:'请输入您的新手机号码。',trigger:'blur'}          
        ],
        new_code:[
          {required:true,message:'请输入短信验证码',trigger:'blur'}
        ],
        imgCode:[
          {required:true,message:'请输入验证码',trigger:'blur'}
        ]
      },
      telSetRules:{
        tel:[
          {required:true,message:'请输入手机号码',trigger:'blur'},
          {type:'string',min:11,max:11,message:'请输入正确的手机号码',trigger:'blur'}
        ],
        imgCode:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',min:4,max:4,message:'请输入6位验证码',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入短信验证码',trigger:'blur'},
          {type:'string',min:6,max:6,message:'请输入4位短信验证码',trigger:'blur'}
        ]
      },
      modifyLoginValidate:{
        oldpwd:'Aa123123',
        newpwd:'Aa123456',
        confirmpwd:'Aa123456',
        code:'123456'
      },
      modifyLoginRules: {
        oldpwd:[
          {required:true,message:'请输入旧登录密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'登录密码应该在6-20位',trigger:'blur'},
        ],
        newpwd:[
          {required:true,message:'请输入新登录密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'登录密码应该在6-20位',trigger:'blur'},
        ],
        confirmpwd:[
          {required:true,message:'请再一次输入新密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'登录密码应该在6-20位',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',message:'请输入6位短信验证码',min:6,max:6,trigger:'blur'}
        ]
      },
      modifyTradeRules:{
        newpwd:[
          {required:true,message:'请输入交易密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'交易密码应该在6～20位',trigger:'blur'},
        ],
        confirmpwd:[
          {required:true,message:'请再次输入交易密码',trigger:'blur'},
          {type:'string',min:6,max:20,message:'交易密码应该在6～20位',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {type:'string',min:6,max:6,message:'请输入6位验证码',trigger:'blur'}
        ]
      }
    }
  },
  computed:{
    ...mapState({
      userinfo(state) {
        console.log('state-----!!!!!!',state);
        var info = state.userinfo;
        var email = {bound:false,value:''},
        nameAuth = {bound:false,value:''},
        phone = {bound:false,value:''},
        loginPass = {bound:false,value:''},
        tradePass = {bound:false,value:''};
        if (state.userinfo.emailset ==1) {
          email.bound = true;
          email.value = info.email;
        }
        if (state.userinfo.identityset ==1) {
          
        }
        if (state.userinfo.mobileset==1) {
          phone.bound = true;
          phone.value = info.mobile;
        }
        if (state.userinfo.googlecodeset ==1 ) {
          
        }
        if (state.userinfo.loginpasswordset == 1) {
          loginPass.bound = true;
        }
        if (state.userinfo.tradepasswordset == 1) {
          tradePass.bound = true;
        }
        return {
          email,nameAuth,phone,loginPass,tradePass
        }
      }
    })
  },
  components:{
    Form,
    FormItem
  },
  methods:{
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
      var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailReg.test(email)) {
        this.$ajax.post('/trade/tps/pbvcs.do',{
          type:'email',
          email
        }).then((res)=>{
          if (res.status == 200 && res.data && res.data.err_code == '1') {
            console.log(res,'---');
            this.input_email = '';
            this.emailErrMsg = '';
            this.$Message.success('邮箱设置成功。');
            this.emailModal = false;
            this.userinfo.email = {
              bound:true,
              value:email
            }
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
      this.$refs['modifyTel'].validate((valid)=>{
        console.log('valid or not',valid);
      })
      this.refreshTelImgUrl();
    },
    confirmTelSet(){
      let that = this;
      var { tel, imgCode , code } = this.telSetValidate;
      this.$refs.telSet.validate((valid) => {
        console.log('valid or not',valid);
        if (valid) {
          that.$ajax.post('/trade/tps/pbvcs.do',{
            type:'mobile',
            mobile:tel,
            region:1,
            mobilecode:code,
            code:imgCode
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log('tel--set--err',err);
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
      console.log('修改登录密码');
      this.$refs.modifyLogin.validate((valid)=>{
        console.log(valid);
        if(valid) {
          that.$ajax.post('/trade/tps/pbvcs.do',{
            type:'loginpwd',oldpwd,newpwd,confirmpwd,code
          }).then((res)=>{
            if (res.status == 200 && res.data && res.data.err_code == '1') {
              that.$Message.success('登录密码设置成功');
              that.loginPassModal = false;
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
      let {newpwd,confirmpwd,code} = this.modifyTradeValidate;
      this.$refs.modifyTrade.validate((valid)=>{
        console.log(that.modifyTelValidate);
        if (valid) {
          that.$ajax.post('/trade/tps/pbvcs.do',{
            type:'tradepwd',
            newpwd,
            confirmpwd,
            code
          }).then((res)=>{
            console.log(res);
            if (res && res.data && res.data.err_code == '1') {
              that.$Message.success('交易密码设置成功');
              that.tradePassModal = false;
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
      var tel = this.$store.state.userinfo.mobile;   
      console.log('sendmessage',tel,this.loginCodeState); //修改登录密码 loginModal  发送验证码
      var num = 4;
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
        this.$ajax.post('/trade/tps/pbscs.do',{
          verifystr:tel
        }).then((res) => {
          console.log('短信验证',res);
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import './safesettings';
</style>
