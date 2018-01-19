<template>
  <div id="assets">
    <div class="account bg-white">
      <Row>
        <Col span="8">
          <div class="user-info clear">
            <img class="user-portrait" src="/static/img/portrait.jpg" alt="portrait">
            <div class="user-info-right float-left">
              <div class="user-name">
                <span>Will</span>
                <span class="user-vip">VIP</span>
              </div>
              <div class="user-contact">
                <span class="user-id">UID:32323</span>
                <span class="user-tel">151788****</span>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="total-assets text-center">
            <span>预估总资产 <span class="primary-color">0</span></span>
          </div>
        </Col>
        <Col span="8">
          <div class="safe-settings">
            <div>您已设置3个保护项，还有三个可以设置</div>
            <div class="set-safe"><Button class="primary-border primary-color" type="ghost">保护项设置</Button></div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="account-manage">
      <Tabs value="name1" :animated="false">
        <TabPane :label="label1" name="name1">标签一的内容</TabPane>
        <TabPane :label="label2" name="name2">标签二的内容</TabPane>
        <TabPane :label="label3" name="name3">标签三的内容</TabPane>
        <TabPane :label="label4" name="name4">标签四的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
  },
  data (){

    return {
      label1:(h)=> {
        return h('div',[
          h('span','账户资产')
        ])
      },
      label2:(h)=> {
        return h('div',[
          h('span','账户明细')
        ])
      },
      label3:(h)=> {
        return h('div',[
          h('span','资金账号')
        ])
      },
      label4:(h) => {
        return h('div',[
          h('span','资金管理')
        ])
      }
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
  .account {
    padding: 20px;
    margin-bottom: 20px;
    .ivu-row{
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
  .user-info-right{
    padding: 10px 0;
    &>div {
      height: 30px;
      line-height: 30px;
    }
    .user-vip {
      display: inline-block;
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
  .safe-settings{
    text-align: center;
    padding: 10px 0;
    .set-safe {
      margin: 0 auto;
      margin-top: 10px;
    }
  }
  .account-manage {
    .ivu-tabs-nav-wrap{
      margin-bottom: 0;
    }
    .ivu-tabs {
      .ivu-tabs-ink-bar{
        display: none !important;
      }
      .ivu-tabs-bar {
        border: none;
        float: left;
        font-size: 16px;
        font-weight: 400;
        width: 160px;
        position: relative;
        z-index: 10;
      }
      .ivu-tabs-nav {
        background: #fff;
      }
      .ivu-tabs-content {
        width: 1000px;
        float: left;
        min-height: 400px;
      }
      .ivu-tabs-tab {
        display: block;
        padding: 20px 40px;
        margin: 0;
        border-bottom: 1px solid #eee;
      }
    }
  }
</style>
