<template>
  <div>
    <Table :data="data" :columns="columns" stripe class="dark-mode" />
  </div>
</template>

<script>
export default {
  data() {
    var columns = [
      {}
    ]
    return {
      columns,
      data:[]
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init() {

    },
    fake() { //模拟假数据

    },
    initList() {

    }
  }
}
</script>

<style>

</style>
