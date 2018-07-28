<template>
  <div>
    <Table stripe :data="data" :columns="columns" class="no-border-table dark-mode"/>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      {key: 'coin', title: '币种'},
      {key: 'time', title: '时间'},
      {key: 'type', title: '类型'},
      {key: 'money', sortable: true, title: '金额'},
      {key: 'fee', title: '手续费'},
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
