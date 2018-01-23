<template>
  <div>
    <div class="account bg-white">
      <Row>
        <Col span="8">
        <div class="user-info clear">
          <img class="user-portrait" src="/static/img/portrait.jpg" alt="portrait">
          <div class="user-info-right float-left">
            <div class="user-name">
              <span>{{userinfo.user}}</span>
              <span class="user-vip">VIP</span>
            </div>
            <div class="user-contact">
              <span class="user-id">UID:{{userinfo.user_id}}</span>
              <span class="user-tel">{{userinfo.tel}}</span>
            </div>
          </div>
        </div>
        </Col>
        <Col span="8">
        <div class="total-assets text-center">
          <span>预估总资产 <span class="primary-color">0</span><span class="primary-color"> / CNYT</span></span>
        </div>
        </Col>
        <Col span="8">
        <div class="safe-settings">
          <div>您已设置3个保护项，还有三个可以设置</div>
          <div class="set-safe">
            <Button class="primary-border primary-color" type="ghost">保护项设置</Button>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {
        user: 'Will',
        tel: '15178874695',
        user_id: '234325'
      },
    }
  }
}
</script>

<style lang="scss">
  .account {
    padding: 20px;
    margin-bottom: 20px;
    .ivu-row {
      .ivu-col:not(:last-of-type) {
        height: 80px;
        border-right: 1px solid #eee;
      }
    }
  }
  
  .user-info {
    img.user-portrait {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      float: left;
      margin-right: 20px;
    }
  }
  
  .user-info-right {
    padding: 10px 0;
    &>div {
      height: 30px;
      line-height: 30px;
    }
    .user-vip {
      display: inline-block;
      font-size: 12px;
      width: 60px;
      height: 26px;
      line-height: 26px;
      color: #fff;
      text-align: right;
      padding-right: 4px;
      vertical-align: middle;
      background-image: url(/static/img/icon-vip.png);
      background-repeat: no-repeat;
      background-size: 100% 26px;
    }
    .user-id {
      color: #3166D2;
      margin-right: 20px;
    }
  }
  
  .total-assets {
    width: 60%;
    margin: 0 auto;
    padding: 20px 0;
  }
  
  .safe-settings {
    text-align: center;
    padding: 10px 0;
    .set-safe {
      margin: 0 auto;
      margin-top: 10px;
    }
  }
</style>
