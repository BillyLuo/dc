<template>
  <div class="announcement">
    <div class="announcement-inner">
      <div class="announcement-title">
        <h3>股票公告</h3>
      </div>
      <div>
        <Table :data="data" stripe :columns="columns" class="no-border-table dark-mode" @on-row-click="rowClick"/>
      </div>
    </div>
    <Modal v-model="visible" title="股票公告详情" width="600">
      <div>
        <Row>
          <Col :span="12">股票名称： {{active.stockname}}</Col>
          <Col :span="12">发布时间： {{active.time}}</Col>
        </Row>
        <div class="announcement-title">{{active.title}}</div>
        <div class="announcement-desc">
          {{active.desc}}
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      {key: 'stockname', title: '股票名称'},
      {key: 'title', title: '标题', className: 'ellipsis link'},
      {key: 'time', title: '时间'}
    ]
    return {
      columns,
      active: {},
      data: [],
      visible: false
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init() {
      this.data = [
        {
          stockname: '股票名称', 
          title: '一些通知，一些通知，一些通知,一些通知，一些通知，一些通知,一些通知，一些通知，一些通知,一些通知，一些通知，一些通知', 
          time: '2018-09-09: 09:00:00',
          desc: '一些详情'
        },
        {
          stockname: '长城股份', 
          title: '什么通知，什么通知，什么通知，一些通知，一些通知，一些通知，通知', 
          time: '2018-12-09: 09:00:00',
          desc: '一些详情'
        }
      ]
    },
    rowClick(obj) {
      this.active = obj;
      this.visible = true;
    }
  }
}
</script>

<style lang="scss">
  .announcement-title {
    h3 {
      color: #fff;
      font-size: 28px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .announcement-inner {
    padding: 30px;
  }
  .ellipsis .ivu-table-cell {
    white-space: nowrap;
  }
  .announcement-title {
    color: #333;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    padding: 20px;
  }
</style>
