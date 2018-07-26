<template>
  <div class="stocklist">
    <div class="stocklist-inner wrapper">
      <div>
        <Table :data="data" :columns="columns" stripe :class="'no-border-table dark-mode'"
          @on-row-click="gotodetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let columns = [
      {key: 'stockname', title: '股票名称'},
      {key: 'stockcode', title: '股票代码'},
      {key: 'rise', title: '涨幅'},
      {key: 'current', title: '现价'},
      {key: 'up', title: '最高价'},
      {key: 'dwon', title: '最低价'},
      {key: 'total', title: '成交额'},
      {key: 'amplitude', title: '振幅'}
    ]
    return {
      columns,
      data: []
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.data = [
        {
          stockname: '超级股', stockcode: '8888', rise: '23.23', current: '23.22',up: '23.99', down: '20.11', total: '32232323.23', amplitude: '20%'
        }
      ]
    },
    gotodetail(row) {
      console.log(row,'rowrowrow');
      this.$router.push({
        name: 'stockdetail'
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
