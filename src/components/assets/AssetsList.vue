<template>
  <div>
    <div class="account-list">
      <div class="account-list-header">
        <Row>
          <Col span="4">
            <h3><span>资产列表</span></h3>
          </Col>
          <Col span="14" :style="{color:'#fff'}">
            预估总资产： {{}}
          </Col>
          <Col span="3">
            <a href="javascript:;" @click="route('assetsdetail')" class="account-detail">账户明细</a>
          </Col>
          <Col span="3">
            <a href="javascript:;" @click="route('coinaddress')" class="account-management">提币管理</a>
          </Col>
        </Row>
      </div>
      <div>
        <Table :class="'no-border-table dark-mode'" stripe :columns="account_list_column" :data="account_list_data" />
        <div class="pager">
          <div class="pager-inner">
            <Page :total="pagetotal" 
            show-total
            placement="top"
            :page-size-opts="pageSizeOpts"
            @on-change="change"
            @on-page-size-change="pageSizeChange" 
            show-sizer
            show-elevator/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Page } from 'iview';
import { pageSizeOpts } from '../constant/constant';
export default {
  mounted () {
    this.getAccountList()
  },
  components:{
    Page
  },
  data () {
    return {
      pagetotal:0,
      pageno:1,
      pagesize:10,
      pageSizeOpts,
      account_list_data:[],
      account_list_column: [
      {
        title: '币种名称',
        key: 'name',
        className:'coin-name'
      },
      {
        title: '可用资产',
        key: 'useable',
        sortable: true,
        className:'table-asset',
        sortMethod(a,b,type){
          if (type == 'asc') {
            return a - b;
          }else {
            return b - a;
          }
        },
      },
      {
        title: '冻结资产',
        key: 'freeze',
        sortable: true,
        className:'table-asset',
        sortMethod(a,b,type){
          if (type == 'asc') {
            return a - b;
          }else {
            return b - a;
          }
        },
      },
      {
        title: '总量',
        key: 'total',
        sortable: true,
        className:'table-asset',
        sortMethod(a,b,type){
          if (type == 'asc') {
            return a - b;
          }else {
            return b - a;
          }
        },
      },
      {
        title: '操作',
        key: 'option',
        render: (h, obj) => {
          let that = this;
          return h('div', {
            'class': {
              'account-options': true
            }
          }, [
            h('button', {
              'class': {
                'account-in': true
              },
              domProps: {
                innerHTML: '充币'
              },
              on: {
                click: this.handle.bind(this, {
                  type: 'in',
                  data: obj
                })
              }
            }),
            h('button', {
              'class': {
                'account-out': true
              },
              domProps: {
                innerHTML: '提币'
              },
              on: {
                click: this.handle.bind(this, {
                  type: 'out',
                  data: obj
                })
              }
            }),
          ])
        }
      }
    ],
    }
  },
  methods:{
    route(value) {
      this.$router.push({
        path:'/assets/'+value
      })
    },
    change(value){
      this.pageno = value;
      var pageno = this.pageno;
      var pagesize = this.pagesize;
      this.getAccountList(pageno,pagesize);
    },
    pageSizeChange(value) {
      console.log(this.pageno);
      this.pagesize = value;
      var pageno = this.pageno;
      var pagesize = this.pagesize;
      this.getAccountList(pageno,pagesize);
    },
    handle(action) {
      console.log(action);
      if (action.type == 'in') {
        // this.$router.push('/assets/recharge')
        this.$router.push({
          path:"/assets/recharge",
          name:"Recharge",
          // params:action,
          query:{
            name:action.data.row.name
          }
        });
      }else if(action.type == 'out') {
        this.$router.push({
          path:"/assets/withdraw",
          name:"Withdraw",
          // params:action,
          query:{
            name:action.data.row.name
          }
        });
      }
    },
    getAccountList(pageno,pagesize) {
      let that = this;
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource:1,
        pageno,
        pagesize
      }).then((data) => {
        console.log('success',data);
        if (data.data && data.data.page) {
          console.log('pagepage',data.data.page);
          that.pagetotal = data.data.page.sum*1;
          console.log(that.pagetotal);
        }
        let list = (data.data && data.data.accountFund) ? data.data.accountFund : [];
        let formatList = list.map((value, index) => {
          let result = {};
          result.name = value.currencyname;
          result.useable =  Number(value.usablefund).toFixed(10);
          result.freeze =  Number(value.frozenfund).toFixed(10);
          result.total =  Number(value.total).toFixed(10);
          return result;
        })
        this.account_list_data = formatList;
      })
    },
  }
}
</script>

<style lang="scss">
  .account-list h3 {
    display: inline-block;
    font-weight: normal;
    height: 60px;
    line-height: 60px;
    color: #fff;
    border-bottom: 2px solid #2d8cf0;
    padding: 0 10px;
  }
  .account-list {
    .account-list-header {
      background:#2a2a2a;
      box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
      .ivu-col {
        height: 60px;
        line-height: 60px;
      }
    }
    .ivu-table td.coin-name {
      color:#4CB2F9;
    }
    .ivu-table td.table-asset {
      color: #fff;
    }
    .account-detail,.account-management {
      display: block;
      height: 60px;
      text-align: center;
      border-left: 1px solid #222;
    }
  }
  .pager {
    color: #666;
  }
</style>
