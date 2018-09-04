<template>
  <div class="receive-record">
    <div>
      <Table stripe :data="data" :columns="columns" class="no-border-table dark-mode" />
    </div>
  </div>
</template>

<script>
export default {
  props:['coincode'],
  data() {
    var columns = [
      {key: 'createtime', title: '时间'},
      {key: 'touser', title: '受让账号地址'},
      {key: 'fromuser', title: '授让账号地址'},
      {key: 'amount', title: '数额'},
      {key: 'transtype', title: '类型',width: 100},
      {key: 'status', title: '状态'}
    ]
    return {
      columns,
      data: []
    }
  },
  watch:{
    coincode: function (value) {
      this.init();
    }
  },
  mounted() {
    this.init();
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
