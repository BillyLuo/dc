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
              <a href="javascipt:;" @click="openEmailModal">未绑定</a>
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
              <a href="javascipt:;">已认证</a>
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
              <a href="javascipt:;">1517****4695</a>
             </div>
             <a href="javascript:;" class="item-status">修改</a>
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
              <a href="javascipt:;">未绑定</a>
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
              <a href="javascipt:;">已设置</a>
             </div>
             <a href="javascript:;" class="item-status">修改</a>
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
              <a href="javascipt:;">未设置</a>
             </div>
             <a href="javascript:;" class="item-status">绑定</a>
          </div>
        </div>
      </Col>
    </Row>
    <Modal
        title="邮箱认证"
        v-model="emailModal"
        @on-ok="email_ok"
        @on-cancel="email_cancel">
        <Input placeholder="邮箱地址" v-model="input_email"/>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      emailModal: false,
      input_email:''
    }
  },
  methods:{
    openEmailModal(){
      this.emailModal = true;
    },
    email_ok () {
      console.log('ok email',arguments);
    },
    email_cancel (){
      console.log('cancel email',arguments);
    }
  }
}
</script>

<style lang="scss">
  .setting-item {
    width: 300px;
    height: 150px;
    border: 1px solid #eee;
    margin: 20px auto;
    border-radius: 4px;
    position: relative;
    .item-pic {
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 35px 30px;
      vertical-align: middle;
      i {
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-image: url(/static/img/icon-info.png);
        background-repeat: no-repeat;
      }
    }
    .item-content {
      margin-top: 50px;
      // width: 180px;
      text-align: left;
      h3 {
        color: #666;
        font-weight: 400;
      }
      a {
        font-size: 12px;
      }
    }
    .item-status {
      position: absolute;
      top: 0;
      right: 0;
      color: #aaa;
      font-size: 12px;
      padding: 10px;
      &:hover {
        color: #333;
      }
    }
  }
  $bind-email-color: #6dea6a;
  $bind-name-color: #6ABEEA;
  $bind-phone-color: #CA78FA;
  $bind-code-color: #6F7BF3;
  $bind-loginpass-color: #F4E058;
  $bind-tradepass-color: #FFA257;

  .safe-settings .ivu-col {
    .bind-email{
      i {
        background-position: 0 0;
        background-color: $bind_email_color;
      }
      &:hover {
        border-color: $bind_email_color;
      }
    }
    .bind-name{
      i {
        background-position: 0 -70px;
        background-color: $bind-name-color;
      }
      &:hover {
        border-color: $bind_name_color;
      }
    }
    .bind-phone{
      i {
        background-position: 0 -140px ;
        background-color: $bind-phone-color;
      }
      &:hover {
        border-color: $bind_phone_color;
      }
    }
    .bind-code {
      i {
        background-position: 0 -210px;
        background-color: $bind-code-color;
      }
      &:hover {
        border-color: $bind_code_color;
      }
    }
    .bind-loginpass {
      i {
        background-position: 0 -280px ;
        background-color: $bind-loginpass-color;
      }
      &:hover {
        border-color: $bind_loginpass_color;
      }
    }
    .bind-tradepass{
      i {
        background-position: 0 -350px ;
        background-color: $bind-tradepass-color;
      }
      &:hover {
        border-color: $bind_tradepass_color;
      }
    }
  }
</style>
