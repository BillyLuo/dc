<template>
  <div class="my-wallet-table">
    <Table stripe :data="data" :columns="columns" :class="'no-border-table dark-mode'"/>
    <div class="pager">
      <!-- <div class="pager-inner">
        <Page :total="pagetotal"
          show-total
          placement="top"
          @on-change="pagechange"
          show-elevator
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import { Page } from 'iview';
var Big = require('big.js');
import { mapState } from 'vuex';
import cookies from 'cookies-js';
export default {
  components: {
    Page
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
  data () {
    var that = this;
    var columns = [
      { key: 'currencyname', title: '币种名称'},
      { key: 'usablefund', title: '可用资产'},
      { key: 'frozenfund', title: '冻结资产'},
      { key: 'total', title: '总量'},
      { key: 'operation',title: '操作', render: (h,params) => {
        var row = params.row;
        var address = h('a',{'class': 'wallet-address',on:{
            click: () => {
              if(params.row) {
                this.$router.push({
                  name: 'Recharge',
                  query: {
                    code: params.row.coincode,
                    type: params.row.type
                  }
                })
              }
            }
          }},'钱包地址');
        if (row && row.currencyname != "DC") {
          return address;
        }
        return h ('div',{},[
          address,
          h('a',{'class': 'coin-transfer',on:{
            click: ()=> {
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
                name: 'cointransfer',
                query: {
                  coincode: params.row.coincode,
                  type: params.row.type
                }
              })
            }
          }},'转账')
        ])
      }}
    ]
    return {
      pagetotal: 1,
      pageno: 1,
      pagesize: 10,
      columns,
      data: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getDcList();
    },
    fake(){
      this.data = [
        {coinname:'BTC', available: '22.00000000', frozen: '0', total: '22.00000000'},
        {coinname:'ETH', available: '38.23000000', frozen: '0', total: '38.23000000'}
      ]
    },
    getAccountList() {
      let that = this;
      var pageno = this.pageno;
      var pagesize = this.pagesize;
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource:1,
        pairstype: '1',
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
          that.data.push(result);
        })
      })
    },
    getDcList() {
      let that = this;
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource:1,
        pairstype: '3',
      }).then((data) => {
        console.log('success',data);
        if (data.data && data.data.page) {
        }
        if (data.data.err_code == '1') {
          this.getAccountList();
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
          that.data.push(result);
        })
      })
    },
    pagechange(page){
      console.log(page);
      this.pageno = page || 1;
      this.getAccountList();
    }
  }
}
</script>

<style lang="scss">
  .my-wallet-table {
    .wallet-address,.coin-transfer {
      margin: 0 10px;
    }
    margin-bottom: 20px;
  }
</style>
