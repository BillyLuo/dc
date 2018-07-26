<template>
  <div>
    <div class="account-list">
      <div class="account-list-header">
        <Row>
          <Col span="4">
            <h3><span>资产列表</span></h3>
          </Col>
          <Col span="12" :style="{color:'#fff'}">
            预估总资产： {{estimateassets}} / USDT
          </Col>
          <Col span="2" class="account-new">
            <a href="javascript:;" @click="route('subscribe')" class="account-detail">新股申购</a>
          </Col>
          <Col span="2" class="account-menu">
            <a href="javascript:;" @click="route('assetsdetail')" class="account-detail">账户明细</a>
          </Col>
          <Col span="2" class="account-menu">
            <a href="javascript:;" @click="route('coinaddress')" class="account-management">提币管理</a>
          </Col>
          <Col span="2" class="account-menu">
            <a href="javascript:;" @click="route('cashrecharge')" class="account-management">线下客服</a>
          </Col>
        </Row>
      </div>
      <div>
        <Table :class="'no-border-table dark-mode'" stripe :columns="account_list_column" :data="account_list_data" />
        <div class="pager">
          <div class="pager-inner">
            <Page :total="pagetotal" 
            show-total
            placement="top"
            :page-size-opts="pageSizeOpts"
            @on-change="change"
            @on-page-size-change="pageSizeChange" 
            show-sizer
            show-elevator/>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="visible">
      <div slot="footer">
        <Form :model="form" ref="transfer" :label-width="80" title="转账"
          label-position="left"
          :rules="formRules"
        >
          <FormItem label="uid：" prop="userId">
            <Input v-model="form.userId" placeholder="请输入uid"/>
          </FormItem>
          <FormItem label="数量：" prop="amount">
            <InputNumber :min="1"  style="width: 100%;" v-model="form.amount" placeholder="请输入转账数量"/>
          </FormItem>
          <FormItem label="密码：" prop="pwd">
            <Input v-model="form.pwd" type="password" placeholder="请输入转账金额"/>
          </FormItem>
        </Form>
        <Button type="primary" long :loading="formLoading" @click="confirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Page,Form,FormItem } from 'iview';
import { pageSizeOpts } from '../constant/constant';
var Big = require('big.js');
export default {
  mounted () {
    this.getAccountList()
  },
  components:{
    Page,Form, FormItem
  },
  computed:{
    ...mapState({
      estimateassets (state) {
        console.log('state--------------',state);
        if (state.userinfo.estimateassets) {
          return state.userinfo.estimateassets;
        }
      }
    })
  },
  data () {
    var uid_validator = (rules,value,c) => {
      if(!value.match(/^\w+$/)) {
        c('请输入uid');
      } else {
        c();
      }
    }
    var amount_validator = (rules,value,c) => {
      if (value) {
        value = value.toString();
      }
      if (!value) {
        c('请输入大于0的数字')
      } else if(!value.match(/^\d+$/)) {
        c('请输入正确的数字')
      } else {
        c();
      }
    }
    var pwd_validator = (rules,value,c) => {
      if (!value.match(/^\w{6,20}$/)) {
        c('请输入6～20位正确的密码')
      } else {
        c()
      }
    }
    return {
      visible: false,
      form: {
        userId: '',
        amount: 1,
        pwd: ''
      },
      formRules: {
        userId: [
          {required: true, message: '请输入uid', trigger: 'blur'},
          {validator: uid_validator, trigger: 'blur'}
        ],
        amount: [
          {required: true,type:'number', message: '请输入数量', trigger: 'change'},
          {validator: amount_validator, type:'number', trigger: 'change'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: pwd_validator, trigger: 'blur'}
        ]
      },
      formLoading: false,
      pagetotal:0,
      pageno:1,
      pagesize:10,
      pageSizeOpts,
      account_list_data:[],
      account_list_column: [
      {
        title: '币种名称',
        key: 'name',
        className:'coin-name'
      },
      {
        title: '可用资产',
        key: 'useable',
        sortable: true,
        className:'table-asset',
        sortMethod(a,b,type){
          if (type == 'asc') {
            return a - b;
          }else {
            return b - a;
          }
        },
      },
      {
        title: '冻结资产',
        key: 'freeze',
        sortable: true,
        className:'table-asset',
        sortMethod(a,b,type){
          if (type == 'asc') {
            return a - b;
          }else {
            return b - a;
          }
        },
      },
      {
        title: '总量',
        key: 'total',
        sortable: true,
        className:'table-asset',
        sortMethod(a,b,type){
          if (type == 'asc') {
            return a - b;
          }else {
            return b - a;
          }
        },
      },
      {
        title: '操作',
        key: 'option',
        render: (h, obj) => {
          var btns = [];
          var account_in = h('button', {
            'class': {
              'account-in': true
            },
            domProps: {
              innerHTML: '充币'
            },
            on: {
              click: this.handle.bind(this, {
                type: 'in',
                data: obj
              })
            }
          });
          var acccount_out = h('button', {
            'class': {
              'account-out': true
            },
            domProps: {
              innerHTML: '提币'
            },
            on: {
              click: this.handle.bind(this, {
                type: 'out',
                data: obj
              })
            }
          });
          var transfer = h('button', {
            'class': {
              'account-out': true
            },
            domProps: {
              innerHTML: '转账'
            },
            on:{
              click: () => {
                console.log(this);
                this.visible = true;
              }
            }
          });
          btns = [account_in,acccount_out];
          if (obj.row && obj.row.name == "DC") {
            btns.push(transfer);
          }
          let that = this;
          return h('div', {
            'class': {
              'account-options': true
            }
          }, btns)
        }
      }
    ],
    }
  },
  methods:{
    route(value) {
      this.$router.push({
        path:'/assets/'+value
      })
    },
    change(value){
      this.pageno = value;
      var pageno = this.pageno;
      var pagesize = this.pagesize;
      this.getAccountList(pageno,pagesize);
    },
    pageSizeChange(value) {
      console.log(this.pageno);
      this.pagesize = value;
      var pageno = this.pageno;
      var pagesize = this.pagesize;
      this.getAccountList(pageno,pagesize);
    },
    handle(action) {
      console.log(action);
      if (action.type == 'in') {
        // this.$router.push('/assets/recharge')
        this.$router.push({
          path:"/assets/recharge",
          name:"Recharge",
          // params:action,
          query:{
            name:action.data.row.name
          }
        });
      }else if(action.type == 'out') {
        this.$router.push({
          path:"/assets/withdraw",
          name:"Withdraw",
          // params:action,
          query:{
            name:action.data.row.name
          }
        });
      }
    },
    getAccountList(pageno,pagesize) {
      let that = this;
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource:1,
        pageno,
        pagesize
      }).then((data) => {
        console.log('success',data);
        if (data.data && data.data.page) {
          console.log('pagepage',data.data.page);
          that.pagetotal = data.data.page.sum*1;
          console.log(that.pagetotal);
        }
        let list = (data.data && data.data.accountFund) ? data.data.accountFund : [];
        let formatList = list.map((value, index) => {
          let result = {};
          result.name = value.currencyname;
          result.useable =  new Big(Number(value.usablefund)).toFixed(10);
          result.freeze =  new Big(Number(value.frozenfund)).toFixed(10);
          result.total =  new Big(Number(value.total)).toFixed(10);
          return result;
        })
        this.account_list_data = formatList;
      })
    },
    confirm() {
      this.$refs['transfer'].validate((valid) => {
        if (valid) {
          this.submit();
        }
      })
    },
    submit() {
      let {amount,userId, pwd} = this.form;
      this.formLoading = true;
      this.$ajax.post('/trade/tdc/pbtas.do',{
        amount,userId,reqresource: 1,pwd
      }).then((res) => {
        console.log(res);
        this.visible = false;
        this.formLoading = false;
        this.$refs['transfer'].resetFields();
        if (res.data.retCode == '1') {
          this.$Message.success('转账成功');
          this.getAccountList()
        } else {
          if (res.data.retMsg) {
            this.$Message.error('转账失败，' + res.data.retMsg);
          } else {
            this.$Message.error('转账失败，请稍后重试');
          }
        }
      }).catch((err) => {
        this.$Message.error('转账失败，请稍后重试');
        this.visible = false;
        this.formLoading = false;
        this.$refs['transfer'].resetFields();
      })
    }
  }
}
</script>

<style lang="scss">
  .account-list h3 {
    display: inline-block;
    font-weight: normal;
    height: 60px;
    line-height: 60px;
    color: #fff;
    border-bottom: 2px solid #2d8cf0;
    padding: 0 10px;
  }
  .account-list {
    .account-list-header {
      background:#2a2a2a;
      box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
      .ivu-col {
        height: 60px;
        line-height: 60px;
      }
    }
    .ivu-table td.coin-name {
      color:#4CB2F9;
    }
    .ivu-table td.table-asset {
      color: #fff;
    }
    .account-detail,.account-management {
      display: block;
      height: 60px;
      text-align: center;
      border-left: 1px solid #121212;
      font-size: 14px;
    }
  }
  .account-menu.ivu-col {
    padding: 0;
  }
</style>
