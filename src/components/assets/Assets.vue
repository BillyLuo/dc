<template>
  <div id="assets">
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
        <TabPane :label="label1" name="name1">
          <div class="account-list">
            <h3><span>资产列表</span></h3>
            <div>
              <Table stripe :columns="account_list_column" :data="account_list_data"/>
            </div>
          </div>
        </TabPane>
        <TabPane :label="label2" name="name2">
          <h3><span>我的财务管理</span></h3>
          <div class="financial-management">
            <div>
              <span>起始时间：</span>
              <DatePicker :editable="false" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
              <span style="margin: 0 20px;"> ~ </span>
              <DatePicker :editable="false" type="date" placeholder="Select date" style="width: 200px;margin-right:30px;"></DatePicker>
              <Tag>今天</Tag>
              <Tag>7天</Tag>
              <Tag>15天</Tag>
              <Tag>30天</Tag>
            </div>
          </div>
        </TabPane>
        <TabPane :label="label3" name="name3">
          <h3><span>我的账号</span></h3>
        </TabPane>
        <TabPane :label="label4" name="name4">
          <h3><span>我的资产管理</span></h3>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    this.getAccountList();
    this.formatTel();
  },
  data (){
    return {
      userinfo:{
        user:'Will',
        tel:'15178874695',
        user_id:'234325'
      },
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
      },
      account_list_column:[
        {title:'币种名称',key:'name'},
        {title:'可用资产',key:'useable',sortable:true},
        {title:'冻结资产',key:'freeze',sortable:true},
        {title:'总量',key:'total',sortable:true},
        {title:'操作',key:'option',render: (h,obj) => {
          let that = this;
          return h('div',{
            'class':{
              'account-options':true
            }
          },[
            h('button',{
              'class':{
                'account-in':true
              },
              domProps:{
                innerHTML:'冲币'
              },
              on:{
                click:this.handle.bind(this,{type:'in',data:obj})
              }
            }),
            h('button',{
              'class':{
                'account-out':true
              },
              domProps:{
                innerHTML:'提币'
              },
              on:{
                click:this.handle.bind(this,{type:'out',data:obj})
              }
            }),
          ])
        }}
      ],
      account_list_data:[
        
      ]
    }
  },
  methods: {
    handle(action) {
      console.log(action);
    },
    formatTel (){
      if (this.userinfo && this.userinfo.tel) {
        this.userinfo.tel = this.userinfo.tel.slice(0,4)+'****'+this.userinfo.tel.slice(-4);
      }
    },
    getAccountList(){
      let list = [
        {
          name:'BTC',
          useable:'0.33',
          freeze:'0.00',
          total:'3.33'
        },
        {
          name:'ETH',
          useable:'45.19',
          freeze:'0.00',
          total:'66.62'
        }
      ]
      let formatList = list.map((value,index)=>{
        let result = {};
        result.name = value.name;
        result.useable = '$ '+value.useable;
        result.freeze = '$ '+value.freeze;
        result.total = '$ '+value.total;
        return result;
      })
      this.account_list_data = formatList;
    }
  },
  filters:{
    'formatmoney'(value){
      value = value.toString();
      if(!value) {
        return '';
      }else {
        return '$' + value;
      }
    }
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
    .ivu-tabs-tabpane {
      h3 {
        font-weight: 400;
        padding-left: 20px;
        span {
          display: inline-block;
          padding-bottom: 10px;
          border-bottom: 2px solid #2d8cf0;
        }
      }
    }
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
        width: 1040px;
        padding: 20px;
        float: left;
        min-height: 400px;
        background: #fff;
      }
      .ivu-tabs-tab {
        display: block;
        padding: 20px 40px;
        margin: 0;
        border-bottom: 1px solid #eee;
      }
      .ivu-tabs-tab-active {
        border-right: 2px solid #2d8cf0;
      }
    }
    .ivu-table-wrapper{
      border-left: 0;
      .ivu-table::after {
        height: 0;
      }
    }
  }
  .account-list {
    h3 {
      
    }
  }
  .account-options {
    button {
      width: 44px;
      height: 22px;
      border:0;
      border-radius: 4px;
      margin: 2px;
      color: #fff;
      outline: none;
      opacity: 0.8;
    }
    button:hover {
      opacity: 1;
    }
    .account-in {
      color: rgb(124, 154, 221);
      background: #EBF0FB;
    }
    .account-out {
      background: #7CBDE6;
    }
  }
  .financial-management {
    padding: 20px;
  }
</style>
