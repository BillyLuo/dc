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
              <a href="javascript:;" @click="openEmailModal">未绑定</a>
             </div>
             <a href="javascript:;" @click="openEmailModal" class="item-status">绑定</a>
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
              <a href="javascript:;">已认证</a>
             </div>
             <a href="javascript:;" class="item-status">您的账号已通过实名认证</a>
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
              <a href="javascript:;">1517****4695</a>
             </div>
             <a href="javascript:;" class="item-status" @click="openTelModal">修改</a>
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
             <a href="javascript:;" class="item-status">绑定</a>
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
              <a href="javascript:;">已设置</a>
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
              <a href="javascript:;" @click="openTradePassModal">未设置</a>
             </div>
             <a href="javascript:;" class="item-status" @click="openTradePassModal">绑定</a>
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
              <Input v-model="modifyTelValidate.imgCode" placeholder="验证码">
              </Input>
          </FormItem>
        </Form>
        <Button :class="'btn-block'" slot="footer" type="primary" @click="tel_ok">确定</Button>
    </Modal>
    <Modal
        width="400"
        title="修改登录密码"
        v-model="loginPassModal">
        <Form :class="'modify-pass'" :label-width="100">
          <FormItem label="旧登录密码：">
            <Input placeholder=""></Input>
          </FormItem>
          <FormItem label="新登录密码：">
            <Input placeholder=""></Input>
          </FormItem>
          <FormItem label="确认新密码：">
            <Input placeholder=""></Input>
          </FormItem>
          <FormItem label="验证码：">
            <Input placeholder="">
              <Button slot="append" class="send-code">
                发送验证码
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
        <Form :class="'modify-trade-pass'" :label-width="100">
          <FormItem label="新交易密码：">
            <Input placeholder=""></Input>
          </FormItem>
          <FormItem label="确认新密码：">
            <Input placeholder=""></Input>
          </FormItem>
          <FormItem label="验证码：">
            <Input placeholder="">
              <Button slot="append" class="send-code">
                发送验证码
              </Button>
            </Input>
          </FormItem>
        </Form>
        <Button type="primary" :class="'btn-block'" slot="footer" @click="trade_pass_ok">确定</Button>
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem } from 'iview';
export default {
  data () {
    return {
      emailModal: false,
      emailErrMsg:'',
      telModal:false,
      telLoading:true,
      loginPassModal: false,
      tradePassModal: false,
      input_email:'',
      emailLoading:true,
      modifyTelValidate:{
        tel:'15178875695',
        code:'',
        new_tel:'',
        new_code:'',
        imgCode:''
      },
      modifyTelRules:{
        tel:[
          {required:true},
          {type:'string'}
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
      }
    }
  },
  components:{
    Form,
    FormItem
  },
  methods:{
    openEmailModal(){
      this.emailModal = true;
    },
    email_ok () {
      console.log('ok email',arguments);
      let email = this.input_email;
      if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
        setTimeout(()=>{
          this.input_email = '';
          this.emailErrMsg = '';
          this.$Message.success('邮箱设置成功。');
          this.emailModal = false;
        },1000)
      }else {
        console.log('wrong');
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
    },
    email_cancel (){
      console.log('cancel email',arguments);
    },
    openLoginPassModal(){
      this.loginPassModal = true;
    },
    login_pass_ok (){
      console.log('修改登录密码');
    },
    openTradePassModal (){
      this.tradePassModal = true;
    },
    trade_pass_ok (){

    }
  }
}
</script>

<style lang="scss">
  @import './safesettings';
</style>
