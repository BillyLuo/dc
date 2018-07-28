<template>
  <div class="receive-record">
    <div>
      <Table stripe :data="data" :columns="columns" class="no-border-table dark-mode" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var columns = [
      {key: 'time', title: '时间'},
      {key: 'receive_account', title: '受让账号地址'},
      {key: 'send_account', title: '授让账号地址'},
      {key: 'amount', title: '数额'},
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
  methods: {
    init() {

    }
  }
}
</script>

<style>

</style>
