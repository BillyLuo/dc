<template>
  <div class="my-stock-table">
    <Table stripe :data="data" :columns="columns" :class="'no-border-table dark-mode'"/>
  </div>
</template>

<script>
var Big = require('big.js');
import cookies from 'cookies-js';
import { mapState } from 'vuex';
export default {
  data () {
    var that = this;
    var columns = [
      { key: 'currencyname', title: '股票名称'},
      { key: 'coincode', title: '股票代码'},
      { key: 'usablefund', title: '可用资产'},
      { key: 'frozenfund', title: '冻结资产'},
      { key: 'total', title: '总量'},
      { key: 'operation',title: '操作', render: (h,params) => {
        return h ('div',{},[
          h('a',{'class': 'stock-address',on:{
            click: () => {
              if(params.row) {
                this.$router.push({
                  name: 'accountstockdetail',
                  query: {
                    coincode: params.row.coincode,
                    type: params.row.type
                  }
                })
              }
            }
          }},'账号地址'),
          h('a',{'class': 'stock-transfer',on: {
            click: () => {
              var userinfo = that.userinfo;
              if (userinfo && userinfo.uid) {
                if (!userinfo.nameAuth.bound) {
                  that.$Notice.warning({
                    title: '提示',
                    desc: '请先完成实名认证'
                  })
                  that.$router.push({
                    name: 'safeSettings'
                  })
                  return;
                }
                if (!userinfo.tradePass.bound) {
                  that.$Notice.warning({
                    title: '提示',
                    desc: '请先设置交易密码'
                  })
                  that.$router.push({
                    name: 'safeSettings'
                  })
                  return;
                }
              } else {
                if (!cookies.get('name')) {
                  that.$Notice.warning({
                    title: '提示',
                    desc: '请登录'
                  })
                }
                return;
              }
              this.$router.push({
                name:'stocktransfer',
                query: {
                  coincode: params.row.coincode,
                  type: params.row.type
                }
              })
            }
          }},'权益转移')
        ])
      }}
    ]
    return {
      columns,
      data: []
    }
  },
  computed: {
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
        return {
          email,nameAuth,phone,loginPass,tradePass,google,uid:info.uid
        }
      }
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getAccountList()
    },
    fake () {
      this.data = [
        {stockname: '股票名称',stockcode: '0241', available: '22.00000000', frozen: '0', total: '22.00000000'},
        {stockname: '一个股票', stockcode:'9023', available: '38.23000000', frozen: '0', total: '38.23000000'}
      ]
    },
    getAccountList() {
      let that = this;
      var pageno = this.pageno;
      var pagesize = this.pagesize;
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource: 1,
        pairstype: '2'
        // pageno,
        // pagesize
      }).then((data) => {
        console.log('success',data);
        if (data.data && data.data.page) {
          console.log('pagepage',data.data.page);
          that.pagetotal = data.data.page.sum*1 || 1;
          console.log(that.pagetotal);
        }
        let list = (data.data && data.data.accountFund) ? data.data.accountFund : [];
        let formatList = list.map((value, index) => {
          let result = {};
          result.currencyname = value.currencyname;
          result.usablefund =  new Big(Number(value.usablefund)).toFixed(10);
          result.frozenfund =  new Big(Number(value.frozenfund)).toFixed(10);
          result.total =  new Big(Number(value.total)).toFixed(10);
          result.coincode = value.coincode;
          result.type = value.type;
          return result;
        })
        this.data = formatList;
      })
    },
  }
}
</script>

<style lang="scss">
  .my-stock-table {
    .stock-address,.stock-transfer {
      margin: 0 10px;
    }
  }
</style>
