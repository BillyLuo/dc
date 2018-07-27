<template>
  <div class="digit-center">
    <div class="wrapper">
      <div class="digit-market-title">
        <h3 class="">数字货币行情</h3>
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
      {key: 'currency',className: 'link',title: '币种'},
      {key: 'price',title: '现价'},
      {key: 'increase',title: '涨幅'},
      {key: 'high',title: '最高价'},
      {key: 'low',title: '最低价'},
      {key: 'turnover',title: '成交额'},
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
      this.data = [
        {
          currency: 'BTC/DC',
          price: '22',
          increase: '45%',
          high: '26',
          low: '18',
          turnover: '99992'
        },
        {
          currency: 'ETH/DC',
          price: '22',
          increase: '45%',
          high: '26',
          low: '18',
          turnover: '99992'
        },
        {
          currency: 'EOS/DC',
          price: '22',
          increase: '45%',
          high: '26',
          low: '18',
          turnover: '99992'
        },
        {
          currency: 'LTC/DC',
          price: '22',
          increase: '45%',
          high: '26',
          low: '18',
          turnover: '99992'
        }
      ]
    },
    rowClick() {
      this.$router.push({
        name: 'digitdetail'
      })
    }
  }
}
</script>

<style lang="scss">
  .digit-market-title {
    font-size: 18px;
    padding: 30px;
    color: #eee;
  }
</style>
