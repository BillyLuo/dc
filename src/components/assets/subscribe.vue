<template>
  <div class="subscribe">
    <div>
      <div class="subscribe-title">
        <h3><span>新股申购</span></h3>
      </div>
      <div>
        <Table :columns="columns" stripe :data="data" :class="'no-border-table dark-mode'"/>
      </div>
    </div>
    <Modal v-model="visible" title="新股申购" :width="400"
      @on-cancel="cancel"
    >
      <div>
        <div v-if="active.currencyname" class="subscribe-name">您正在申购{{active.currencyname}}</div>
        <div v-else class="subscribe-name">申购有误，请稍后重试</div>
        <InputNumber v-model="amount" style="width: 100%;" placeholder="请输入申购数量" :min="1"></InputNumber>
        <div style="margin: 20px 0;">
          <Input type="password" v-model="pwd" placeholder="请输入交易密码" />
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="subscribe_loading" long @click="confirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    var columns = [
      {title: '股票名称', key: 'currencyname'},
      {title: '股票代码', key: 'currencycode'},
      {title: '操作', key: 'option', render: (h,param)=>{
        return h('span',{
          'class': 'subscribe-new',
          on:{
            click:()=>{
              this.openModal(param.row);
              if (param.row) {
                this.active = param.row;
              }
            }
          }
        },'申购');
      }}
    ];
    return {
      columns,
      data: [],
      amount: 0,
      pwd: '',
      visible: false,
      subscribe_loading: false,
      active: {}
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.$ajax.post('/trade/tps/pbfct.do',).then((res) => {
        console.log('fct----',res);
        if (res.data && res.data.err_code == '1') {
          this.data = res.data.currencys;
        }
      }).catch((err) => {
        console.log('err---fct',err);
      })
    },
    openModal (obj){
      this.visible = true;
    },
    confirm() {
      var amount = this.amount;
      var pwd = this.pwd;
      if (!amount) {
        this.$Message.warning('请输入申购数量');
        return;
      }
      if (!pwd) {
        this.$Message.warning('请输入交易密码');
        return false;
      } else if (!pwd.match(/^\w{6,20}$/)) {
        this.$Message.warning('请输入6～20位交易密码');
        return false;
      }
      this.subscribe_loading = true;
      this.submit();
    },
    submit() {
      let active = this.active;
      console.log(active);
      let count = this.amount;
      let pwd = this.pwd.trim();
      if (active.currencyname) {
        let coinid = active.bizcurrencyid;
        this.$ajax.post('/trade/tdc/pbpss.do',{
          coinid,
          count,
          pwd,
          reqresource: 1
        }).then((res) => {
          console.log(res);
          this.subscribe_loading = false;
          this.visible = false;
          this.amount = 0;
          this.pwd = '';
          if (res.data && res.data.retCode == '1') {
            this.$Message.success('申购成功')
          } else if (res.data.retMsg) {
            this.$Message.error('申购出错，' + res.data.retMsg);
          } else {
            this.$Message.error('申购出错，请稍后重试');
          }
        }).catch((err) => {
          this.pwd = '';
          this.$Message.error('申购出错，请稍后重试');
        })
      }
    },
    cancel() {
      this.subscribe_loading = false;
      this.amount = 0;
      this.pwd = '';
    }
  }
}
</script>

<style lang="scss">
  .subscribe-title h3 {
    font-weight: normal;
    height: 60px;
    line-height: 60px;
    color: #fff;
    padding: 0 10px;
    box-shadow: 1px 1px 4px #333;
  }
  .subscribe-new {
    display: inline-block;
    padding: 2px 10px;
    font-size: 12px;
    border: 1px solid #596980;
    color: #596980;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    transition: .2s linear;
    &:hover {
      color: #84a2ce;
      border-color: #84a2ce;
    }
  }
  .subscribe-name {
    line-height: 3em;
  }
</style>
