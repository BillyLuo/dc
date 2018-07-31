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
            <Input v-model="active.currencyname" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="股票代码：">
            <Input v-model="active.currencycode" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="行业：">
            <Input v-model="active.industry" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="预售截止日期：">
            <Input v-model="active.endtime" disabled placeholder=""></Input>
          </FormItem>
          <FormItem label="预售价格（DC）：">
            <Input v-model="active.presellprince" disabled placeholder=""></Input>
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
          <Col :span="18">{{active.currencyname}}</Col>
        </Row>
        <Row>
          <Col :span="6">股票代码：</Col>
          <Col :span="18">{{active.currencycode}}</Col>
        </Row>
        <Row>
          <Col :span="6">行业：</Col>
          <Col :span="18">{{active.industry}}</Col>
        </Row>
        <Row>
          <Col :span="6">预售价格(DC)：</Col>
          <Col :span="18">{{active.presellprince}}</Col>
        </Row>
        <Row>
          <Col :span="6">预售截止日期：</Col>
          <Col :span="18">{{active.endtime}}</Col>
        </Row>
        <Row>
          <Col :span="24">股票描述：</Col>
          <Col :span="24">{{ active.currencydesc }}</Col>
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
      {key: 'currencyname',title: '股票名称'},
      {key: 'currencycode', title: '股票代码'},
      {key: 'industry', title: '行业'},
      {key: 'presellprince', title: '预售价格(DC)'},
      {key: 'endtime', title: '预售截止日期'},
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
                }
              }
            }
          },'股票详情'),
          h('span',{
            'class': 'stock-btn stock-subscription',
             on: {
               click: function () {
                 that.visible = true;
                 if (param.row) {
                   that.active = Object.assign(that.active,param.row);
                   that.active.stockamount = 1;
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
        currencyname: '',
        currencycode: '',
        endtime: '',
        presellprince: '',
        stockamount: 0,
        currencydesc: ''
      },
    }
  },
  computed: {
    dctotal () {
      var total = this.active.presellprince * this.active.stockamount;
      return total ? Number(total).toFixed(2) : 0;
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      // this.data = [
      //   {stockname: '名称',stockcode: '9029',industry: '能源',presellprice: '32.23',preselldeaddate: '2018-09-0 09:00:00'},
      //   {stockname: '化工',stockcode: '2323',industry: '化工',presellprice: '12.21',preselldeaddate: '2018-09-0 09:00:00'}
      // ]
      this.$ajax.post('/trade/tps/pbfct.do',{
        status: '3'
      }).then((res) => {
        console.log('fct',res);
        var data = res.data || {};
        if (data.err_code == '1' && data.currencys instanceof Array && data.currencys.length) {
          this.data = data.currencys;
        }
      }).catch((err) => {
        this.$Message.error('网络查询出错了');
      })
    },
    confirm() {
      var coinid = this.active.bizcurrencyid;
      var count = this.active.stockamount;
      if (!coinid ) {
        this.modalLoading = false;
        return;
      }
      if (!count) {
        this.modalLoading = false;
        this.$Message.warning('请输入申购数量');
        return;
      }
      this.modalLoading = true;
      this.submit();
    },
    submit() {
      var coinid = this.active.bizcurrencyid;
      var count = this.active.stockamount;
      if (!coinid ) {
        this.modalLoading = false;
        return;
      }
      if (!count) {
        this.modalLoading = false;
        this.$Message.warning('请输入申购数量');
        return;
      }
      var reqresource = 1;
      this.$ajax.post('/trade/tdc/pbpss.do',{
        coinid,reqresource,count
      }).then((res) => {
        var data = res.data;
        this.visible = false;
        this.modalLoading = false;
        if (data.retCode == '1') {
          this.$Message.success('认购成功');
        }else if (data.retMsg ) {
          this.$Message.error(data.retMsg + ',认购失败');
        }else {
          this.$Message.error('认购失败');
        }
      }).catch((err) => {
        this.visible = false;
        this.modalLoading = false;
        this.$Message.error('认购失败');
      })
      
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
