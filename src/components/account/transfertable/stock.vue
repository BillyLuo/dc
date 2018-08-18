<template>
  <div>
    <Table stripe :data="data" :columns="columns" class="no-border-table dark-mode"/>
  </div>
</template>

<script>
export default {
  props:{
    coincode: {
      type: String
    }
  },
  data () {
    var columns = [
      {key: 'coincode', title: '币种'},
      {key: 'createtime', title: '时间'},
      {key: 'transtype', title: '类型'},
      {key: 'amount', sortable: true, title: '金额'},
      {key: 'charge', title: '手续费'},
      {key: 'status', title: '状态'}
    ]
    return {
      columns,
      data: []
    }
  },
  mounted() {
    this.init();
  },
  watch:{
    coincode:'init'
  },
  methods: {
    init() {
      let coincode = this.coincode;
      console.log(coincode);
      if (!coincode) {
        return;
      }
      this.$ajax.post('/trade/tdc/pbqts.do',{
        coincode
      }).then((res) => {
        var data = res.data;
        if (data.retCode == '1' && data.transfers && data.transfers.length) {
          this.data = data.transfers.map((item) => {
            item.amount = item.amount || 0;
            item.status = '完成';
            return item;
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
