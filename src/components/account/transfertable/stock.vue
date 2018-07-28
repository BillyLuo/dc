<template>
  <div>
    <Table stripe :data="data" :columns="columns" class="no-border-table dark-mode"/>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      {key: 'time', title: '时间'},
      {key: 'account_name', title: '转出账户名称'},
      {key: 'account_address', title: '转出账号地址'},
      {key: 'amount', sortable: true, title: '数额'},
      {key: 'status', title: '状态'}
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

    }
  }
}
</script>

<style>

</style>
