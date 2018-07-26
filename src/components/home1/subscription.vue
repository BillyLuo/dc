<template>
  <div class="subscription">
    <div class="subscription-inner">
      <div>
        <h3 class="text-center subscription-title">新股认购</h3>
      </div>
      <div>
        <Table :data="data"  stripe :columns="columns" :class="'no-border-table dark-mode'" />
      </div>
      <Modal v-model="visible" title="新股认购"
      >
        <Form :label-width="120">
          <FormItem label="股票名称：">
            <Input v-model="active.stockname" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="股票代码：">
            <Input v-model="active.stockcode" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="行业：">
            <Input v-model="active.industry" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="预售截止日期：">
            <Input v-model="active.preselldeaddate" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="预售价格（DC）：">
            <Input v-model="active.presellprice" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="DC余额：">
            <Input v-model="dcbalance" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="需要支付总额(DC)：">
            <Input v-model="dctotal" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="需要认购数额：">
            <InputNumber style="width: 100%;" v-model="active.stockamount"  placeholder="请输入"></InputNumber>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" long @click="confirm" :loading="modalLoading">确定</Button>
        </div>
      </Modal>
      <Modal v-model="detailVisible" title="股票详情" class="detail-modal">
        <Row>
          <Col :span="6">股票名称：</Col>
          <Col :span="18">{{active.stockname}}</Col>
        </Row>
        <Row>
          <Col :span="6">股票代码：</Col>
          <Col :span="18">{{active.stockcode}}</Col>
        </Row>
        <Row>
          <Col :span="6">行业：</Col>
          <Col :span="18">{{active.industry}}</Col>
        </Row>
        <Row>
          <Col :span="6">预售价格(DC)：</Col>
          <Col :span="18">{{active.presellprice}}</Col>
        </Row>
        <Row>
          <Col :span="6">预售截止日期：</Col>
          <Col :span="18">{{active.preselldeaddate}}</Col>
        </Row>
        <Row>
          <Col :span="24">股票描述：</Col>
          <Col :span="24">{{ active.desc }}</Col>
        </Row>
      </Modal>
    </div>
  </div>
</template>

<script>
import { Form, FormItem } from 'iview';
import { BigNumber as big } from 'bignumber.js';
export default {
  components: {
    Form,FormItem
  },
  data () {
    var columns = [
      {key: 'stockname',title: '股票名称'},
      {key: 'stockcode', title: '股票代码'},
      {key: 'industry', title: '行业'},
      {key: 'presellprice', title: '预售价格(DC)'},
      {key: 'preselldeaddate', title: '预售截止日期'},
      {key: 'option', title: '操作',
      render: (h,param) => {
        let that = this;
        return h('div',{},[
          h('span',{
            'class': 'stock-btn stock-detail',
            on: {
              click: function () {
                that.detailVisible = true;
                console.log(param);
                if (param.row) {
                  that.active = param.row;
                  that.active.desc = '一些股票的描述，一些股票的描述，一些股票的描述，一些股票的描述，一些股票的描述。';
                }
              }
            }
          },'股票详情'),
          h('span',{
            'class': 'stock-btn stock-subscription',
             on: {
               click: function () {
                 console.log(that);
                 that.visible = true;
                 if (param.row) {
                   that.active = param.row;
                 }
               }
             }}, '认购')
        ])
      }},
    ];
    return {
      columns,
      data: [],
      visible: false,
      detailVisible: false,
      dcbalance: 200,
      modalLoading: false,
      active: {
        stockname: '',
        stockcode: '',
        preselldeaddate: '',
        presellprice: '',
        stockamount: 0,
        desc: ''
      },
    }
  },
  computed: {
    dctotal () {
      var total = this.active.presellprice * this.active.stockamount;
      return total ? Number(total).toFixed(2) : 0;
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.data = [
        {stockname: '名称',stockcode: '9029',industry: '能源',presellprice: '32.23',preselldeaddate: '2018-09-0 09:00:00'},
        {stockname: '化工',stockcode: '2323',industry: '化工',presellprice: '12.21',preselldeaddate: '2018-09-0 09:00:00'}
      ]
    },
    confirm() {
      this.modalLoading = true;
      setTimeout(() => {
        this.submit();
      }, 2000);
    },
    submit() {
      this.$Message.success('认购成功');
      this.visible = false;
      this.modalLoading = false;
    }
  }
}
</script>

<style lang="scss">
  .subscription-inner {
    padding: 30px;
    margin: 0 auto;
  }
  .subscription-title {
    color: #fff;
    font-size: 28px;
    margin-bottom: 20px;
  }
  .stock-btn {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid #eee;
    color: #eee;
    border-radius: 4px;
    margin: 8px;
    cursor: pointer;
    user-select: none;
    opacity: .7;
    &:hover {
      opacity: 1;
    }
  }
  .detail-modal .ivu-row {
    margin: 10px;
  }
</style>
