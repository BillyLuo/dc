<template>
  <div class="stock-announcement">
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
          <Col :span="12">股票名称： {{active.coinname}}</Col>
          <Col :span="12">发布时间： {{active.creattime}}</Col>
        </Row>
        <div class="announcement-title">{{active.announcementtitle}}</div>
        <div class="announcement-desc" v-html="active.announcementdesc">
          {{active.announcementdesc}}
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="closeModal">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      {key: 'coinname', title: '股票名称'},
      {key: 'announcementtitle', title: '标题', className: 'ellipsis link'},
      {key: 'creattime', title: '时间'},
      {key: 'opt', title: '操作', render:(h,param)=>{
        return h('span',{
          'class': 'home-stock-detail',
          on: {
            click:()=>{
              
            }
          }
        },'详情')
      }}
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
    fake () {
      this.data = [
        {
          coinname: '一支股票', 
          announcementtitle: '一些通知，一些通知，一些通知,一些通知，一些通知，一些通知,一些通知，一些通知，一些通知,一些通知，一些通知，一些通知', 
          creattime: '2018-09-09: 09:00:00',
          announcementdesc: '一些详情'
        },
        {
          coinname: '长城股份', 
          announcementtitle: '什么通知，什么通知，什么通知，一些通知，一些通知，一些通知，通知', 
          creattime: '2018-12-09: 09:00:00',
          announcementdesc: '一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情一些详情'
        }
      ]
    },
    init() {
      this.getData();
    },
    getData() {
      this.$ajax.post('/trade/tps/pbacm.do',{
        type: 'query'
      }).then((res) => {
        var data = res.data || {};
        console.log('res',data);
        if (data.err_code == '1') {
          this.data = data.announcement;
        }
      }).catch((err) => {
        console.log('errr');
      })
    },
    rowClick(obj) {
      this.active = obj;
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
  .announcement-title {
    h3 {
      color: #fff;
      font-size: 28px;
      // text-align: center;
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
  .home-stock-detail {
    display: inline-block;
    padding: 2px 15px;
    border: 1px solid #fff;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;
  }
</style>
