<template>
  <div class="stocklist">
    <div class="stocklist-inner wrapper">
      <div>
        <Table :data="data" :columns="columns" stripe :class="'no-border-table dark-mode'"
          @on-row-click="gotodetail"
        />
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let columns = [
      {key: 'currencyname', className: 'link', title: '股票名称'},
      {key: 'currencycode', className: 'link', title: '股票代码'},
      {key: 'range', title: '涨幅'},
      {key: 'curprice', title: '现价'},
      {key: 'high', title: '最高价'},
      {key: 'low', title: '最低价'},
      {key: 'vol', title: '成交额'},
      {key: 'swing', title: '振幅'},
      {key: 'opt', title: '操作',className: 'go-trade', render: (h)=>{
        return h('a','去交易')
      }}
    ]
    return {
      columns,
      data: [],
      spinShow: false
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      // this.data = [
      //   {
      //     currencyname: '超级股', currencycode: '8888', range: '23.23', curprice: '23.22',high: '23.99', low: '20.11', vol: '32232323.23', swing: '20%'
      //   }
      // ]
      this.getStockList();
    },
    getStockList(){
      this.spinner.start();
      var that = this;
      this.$ajax.post('/trade/tdc/pbfcd.do',{
        type: '2',
        reqresource: '1',
        tradecurrency: 'DC'
      }).then((res) => {
        this.spinner.stop();
        res = res.data || {};
        if (res.err_code == '1' && res.currencyDetail instanceof Array && res.currencyDetail.length) {
          that.data = res.currencyDetail.map((item,index) => {
            item.range = Number(item.range * 100).toFixed(2) + '%';
            item.swing = Number(item.swing * 100).toFixed(2) + '%';
            return item;
          })
        }
      }).catch((err) => {
        this.spinner.stop();
      })
    },
    gotodetail(row) {
      this.$router.push({
        name: 'stockdetail',
        query: {
          code: row.currencycode,
          type: row.cointype
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .stocklist-inner {
    padding-top: 40px;
  }
</style>
