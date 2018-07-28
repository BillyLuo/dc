<template>
  <div class="my-stock-table">
    <Table stripe :data="data" :columns="columns" :class="'no-border-table dark-mode'"/>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      { key: 'stockname', title: '股票名称'},
      { key: 'stockcode', title: '股票代码'},
      { key: 'available', title: '可用资产'},
      { key: 'frozen', title: '冻结资产'},
      { key: 'total', title: '总量'},
      { key: 'operation',title: '操作', render: (h,params) => {
        return h ('div',{},[
          h('a',{'class': 'stock-address',on:{
            click: () => {
              if(params.row) {
                this.$router.push({
                  name: 'accountstockdetail',
                  query: {
                    name: params.row.coinname
                  }
                })
              }
            }
          }},'账号地址'),
          h('a',{'class': 'stock-transfer',on: {
            click: () => {
              this.$router.push({
                name:'stocktransfer'
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.data = [
        {stockname: '股票名称',stockcode: '0241', available: '22.00000000', frozen: '0', total: '22.00000000'},
        {stockname: '一个股票', stockcode:'9023', available: '38.23000000', frozen: '0', total: '38.23000000'}
      ]
    }
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
