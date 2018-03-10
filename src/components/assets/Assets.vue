<template>
  <div id="assets" class="">
    <user-info></user-info>
    <div class="account-manage">
      <Tabs :class="'vertical-tab'" v-model="currentTab" :animated="false" @on-click="tabClick">
        <TabPane :label="label1" name="accountAssets">
          <router-view></router-view>
        </TabPane>
        <TabPane :label="label2" name="accountDetail">
          <h3><span>我的财务管理</span></h3>
          <div class="financial-management">
            <div>
              <span>起始时间：</span>
              <DatePicker v-model="startDate" @on-change="chooseStartDate" :editable="false" type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
              <span style="margin: 0 20px;"> ~ </span>
              <DatePicker v-model="endDate" @on-change="chooseEndDate" :editable="false" type="date" placeholder="请选择结束时间" style="width: 200px;margin-right:30px;"></DatePicker>
              <Button size="small" @click="chooseDate(0)" :type="setDayActive == 0 ? 'primary' : 'ghost'">今天</Button>
              <Button size="small" @click="chooseDate(7)" :type="setDayActive == 7 ? 'primary' : 'ghost'">7天</Button>
              <Button size="small" @click="chooseDate(15)" :type="setDayActive == 15 ? 'primary' : 'ghost'">15天</Button>
              <Button size="small" @click="chooseDate(30)" :type="setDayActive == 30 ? 'primary' : 'ghost'">30天</Button>
            </div>
            <div>
              <span>操作类型：</span>
              <Select @on-change="changeType" :filterable="true" v-model="operation_type" style="width:200px;margin: 30px 0;">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" :style="{width: '100px',fontSize:'14px',marginLeft:'20px'}" @click="getAssetsDetail">查询</Button>
            </div>
            <Table :class="'no-border-table'" stripe :columns="account_detail_column" :data="account_detail_data" />
          </div>
        </TabPane>
        <!-- <TabPane :label="label3" name="fundAccount">
          <div class="fund_account">
            <a href="javascript:;" :class="{active:fund_account_active == item.value}" v-for="(item) in fund_account_lists" :key="item.value" @click="changeFundAccount(item.value)">
              <span>{{item.label}}</span>
            </a>
          </div>
        </TabPane>
        <TabPane :label="label4" name="fundsManagement">
          <h3><span>我的资产管理</span></h3>
        </TabPane> -->
        <TabPane label="我的COINS" name="myCoin">
          <myCoin></myCoin>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import myCoin from './myCoin';
  import userInfo from '../user/userBaseInfo';
  import { Tabs,TabPane,DatePicker,Table } from 'iview';
  import moment from 'moment';
  export default {
    components: {
      Table,
      DatePicker,
      Tabs,
      myCoin,
      TabPane,
      'user-info': userInfo
    },
    mounted() {
      this.getAssetsDetail();
    },
    data() {
      return {
        currentTab:'accountAssets',
        operation_type: '1',
        label1: (h) => {
          return h('div', [
            h('span', '账户资产')
          ])
        },
        label2: (h) => {
          return h('div', [
            h('span', '账户明细')
          ])
        },
        label3: (h) => {
          return h('div', [
            h('span', '资金账号')
          ])
        },
        label4: (h) => {
          return h('div', [
            h('span', '资金管理')
          ])
        },
        typeList: [{
            label: 'BTC提现',
            value: '1'
          },
          {
            label: 'ETH提现',
            value: '2'
          },
          {
            label: 'BHC提现',
            value: '3'
          }
        ],
        account_list_data: [
  
        ],
        account_detail_column: [{
            title: '交易时间',
            key: 'trade_time',
            sortable: true
          },
          {
            title: '类型',
            key: 'trade_type',
            sortable: true
          },
          {
            title: '金额',
            key: 'trade_money',
            sortable: true
          },
          {
            title: '手续费',
            key: 'serice_charge',
            sortable: true
          },
          {
            title: '状态',
            key: 'trade_status',
            sortable: true
          },
        ],
        account_detail_data: [
  
        ],
        fund_account_active: 'bk',
        fund_account_lists: [{
            label: '银行卡管理',
            value: 'bk'
          },
          {
            label: 'BTC 提现管理',
            value: 'btc'
          },
          {
            label: 'Hsr 提现管理',
            value: 'hsr'
          },
          {
            label: 'CDT 提现管理',
            value: 'cdt'
          },
          {
            label: 'OX 提现管理',
            value: 'ox'
          },
          {
            label: 'TNT 提现管理',
            value: 'tnt'
          },
          {
            label: 'MANA 提现管理',
            value: 'mana'
          }
        ],
        startDate:'',
        endDate:new Date(),
        setDayActive:7
      }
    },
    methods: {
      changeFundAccount(value) {
        this.fund_account_active = value;
      },
      validateDate() {
        
      },
      changeType(value) {
        console.log(value);
      },
      chooseStartDate(value) {
        this.startDate = value;
      },
      chooseEndDate(value) {
        console.log(value);
        this.endDate = value;
      },
      chooseDate(value) {
        this.setDayActive = value;
        var endDate = this.endDate;
        if (!endDate) {
          endDate = new Date();
          this.endDate = endDate;
        }
        if (value == 0 ) {
          this.startDate = endDate.setHours(0);
        }else if (value) {
          var day = moment(endDate).subtract(value, 'days');
          this.startDate = day;
        }
      },
      tabClick(name) {
        // console.log('name---',name,this.currentTab);
        if (name == 'accountAssets') {
          this.$router.push({
            path:'/assets'
          })
        }
      },
      getAssetsDetail(){
        let startDate = this.startDate;
        let endDate = this.endDate;
        let operation = this.operation_type;
        if (startDate) {
          startDate = moment(this.startDate).format('YYYY-MM-DD');
        }else {
          startDate = '';
        } 
        if (endDate) {
          endDate = moment(this.endDate).format('YYYY-MM-DD');
        }else {
          this.endDate = new Date();
          endDate = moment().format('YYYY-MM-DD');
        }
        console.log({
          operation,
          startDate,
          endDate
        });
        this.$ajax.post('/trade/tps/pblad.do',{
          operation
        }).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.warn('获取资产详情失败');
        })
      }
    },
    filters: {
      'formatmoney' (value) {
        value = value.toString();
        if (!value) {
          return '';
        } else {
          return '$' + value;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../my-theme/mixin.scss';
  #assets{
    width:1200px;
    margin: 0 auto;
  }
  .account-manage {
    .ivu-tabs-tabpane {
      &>h3 {
        font-weight: 400;
        padding-left: 20px;
        span {
          display: inline-block;
          padding-bottom: 10px;
          border-bottom: 2px solid $primary-color;
        }
      }
    }
    .ivu-tabs-nav-wrap {
      margin-bottom: 0;
    }
    .ivu-tabs {
      .ivu-tabs-ink-bar {
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
        width: 1020px;
        padding: 20px;
        float: right;
        min-height: 400px;
        background: #fff;
      }
      .ivu-tabs-tab {
        display: block;
        padding: 20px 40px;
        margin: 0;
        border-bottom: 1px solid #eee;
        &:hover {
          color: $primary-color;
        }
      }
      .ivu-tabs-tab-active {
        border-right: 2px solid $primary-color;
      }
    }
    .no-border-table.ivu-table-wrapper {
      border-left: 0;
      .ivu-table::after {
        height: 0;
      }
    }
  }
  
  .account-list {
    h3 {}
  }
  
  .account-options {
    button {
      width: 54px;
      height: 22px;
      border: 0;
      border-radius: 4px;
      margin: 4px;
      color: #fff;
      outline: none;
      opacity: 0.8;
      cursor: pointer;
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
  
  //财务管理
  .financial-management {
    padding: 20px;
    button {
      margin: 0 6px;
    }
  }
  
  //资金账号
  .fund_account {
    a {
      display: inline-block;
      span {
        color: #495060;
        font-size: 16px;
      }
      padding: 10px 0;
      margin: 0 20px;
      opacity: 0.6;
      transition: 0.2s;
    }
    a:hover,
    a.active {
      border-bottom: 2px solid $primary-color;
      opacity: 1;
    }
  }
</style>
