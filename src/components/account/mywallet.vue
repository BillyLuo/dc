<template>
  <div class="my-wallet-table">
    <Table stripe :data="data" :columns="columns" :class="'no-border-table dark-mode'"/>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      { key: 'coinname', title: '币种名称'},
      { key: 'available', title: '可用资产'},
      { key: 'frozen', title: '冻结资产'},
      { key: 'total', title: '总量'},
      { key: 'operation',title: '操作', render: (h,params) => {
        return h ('div',{},[
          h('a',{'class': 'wallet-address',on:{
            click: () => {
              if(params.row) {
                this.$router.push({
                  name: 'Recharge',
                  query: {
                    name: params.row.coinname
                  }
                })
              }
            }
          }},'钱包地址'),
          h('a',{'class': 'coin-transfer'},'转账')
        ])
      }}
    ]
    return {
      columns,
      data: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.data = [
        {coinname:'BTC', available: '22.00000000', frozen: '0', total: '22.00000000'},
        {coinname:'ETH', available: '38.23000000', frozen: '0', total: '38.23000000'}
      ]
    }
  }
}
</script>

<style lang="scss">
  .my-wallet-table {
    .wallet-address,.coin-transfer {
      margin: 0 10px;
    }
  }
</style>
