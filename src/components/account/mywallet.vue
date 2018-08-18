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
export default {
  components: {
    Page
  },
  data () {
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
                    name: params.row.currencyname
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
              console.log(params,this.$router.push);
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
