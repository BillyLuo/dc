<template>
  <div class="dc-center">
    <div class="wrapper">
      <div class="dc-market-title">
        <h3 class="">DC行情</h3>
      </div>
      <Table stripe :data="data" :columns="columns" class="no-border-table dark-mode"
        @on-row-click="rowClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      {key: 'currencyname',className: 'link',title: '币种',render:(h,param)=>{
        var {row} = param;
        return h('span',{},row.currencyname + '/' + row.tradecurrency)
      }},
      {key: 'curprice',title: '现价'},
      {key: 'range',title: '涨幅'},
      {key: 'high',title: '最高价'},
      {key: 'low',title: '最低价'},
      {key: 'amount',title: '成交额'},
      {key: 'opt', title: '操作',className: 'go-trade', render: (h,param) => {
        return h('a','去交易');
      }}
    ]
    return {
      columns,
      data: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      
      this.getStockList();
    },
    getStockList(){
      this.spinner.start();
      var that = this;
      this.$ajax.post('/trade/tdc/pbfcd.do',{
        type: '3',
        reqresource: '1',
        tradecurrency: 'DC'
      }).then((res) => {
        this.spinner.stop();
        res = res.data || {};
        if (res.err_code == '1' && res.currencyDetail instanceof Array && res.currencyDetail.length) {
          that.data = res.currencyDetail.map((item,index) => {
            item.range = Number(item.range ).toFixed(2) + '%';
            item.swing = Number(item.swing ).toFixed(2) + '%';
            return item;
          })
        }
      }).catch((err) => {
        this.spinner.stop();
      })
    },
    rowClick(obj) {
      this.$router.push({
        name: 'dcdetail',
        query: {
          coin: obj.currencycode
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .dc-market-title {
    font-size: 18px;
    padding: 30px;
    color: #eee;
  }
</style>
