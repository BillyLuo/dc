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
    <div class="account-manage bg-white">
      <Tabs value="name1" :animated="false">
        <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane :label="getLabel" name="name3">标签三的内容</TabPane>
      </Tabs>
    </div>
    <Input />
  </div>
</template>
<script>
export default {
  mounted () {
  },
  data (){
    return {
      getLabel:(h)=> {
        return h('div',[
          h('span','wjfl')
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
    .ivu-tabs {
      .ivu-tabs-ink-bar{
        display: none !important;
      }
      .ivu-tabs-bar {
        padding: 30px 0;
        border: none;
        float: left;
        width: 200px;
        position: relative;
        z-index: 10;
      }
      .ivu-tabs-content {
        width: 1000px;
        float: left;
        min-height: 400px;
      }
      .ivu-tabs-tab {
        display: block;
      }
    }
  }
</style>
