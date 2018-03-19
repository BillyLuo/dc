<template>
  <div>
    <div class="account-list">
      <h3><span>资产列表</span></h3>
      <div>
        <Table :class="'no-border-table'" stripe :columns="account_list_column" :data="account_list_data" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.getAccountList()
  },
  data () {
    return {
      account_list_data:[],
      account_list_column: [{
        title: '币种名称',
        key: 'name'
      },
      {
        title: '可用资产',
        key: 'useable',
        sortable: true
      },
      {
        title: '冻结资产',
        key: 'freeze',
        sortable: true,
      },
      {
        title: '总量',
        key: 'total',
        sortable: true
      },
      {
        title: '操作',
        key: 'option',
        render: (h, obj) => {
          let that = this;
          return h('div', {
            'class': {
              'account-options': true
            }
          }, [
            h('button', {
              'class': {
                'account-in': true
              },
              domProps: {
                innerHTML: '冲币'
              },
              on: {
                click: this.handle.bind(this, {
                  type: 'in',
                  data: obj
                })
              }
            }),
            h('button', {
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
            }),
          ])
        }
      }
    ],
    }
  },
  methods:{
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
    getAccountList() {
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource:1
      }).then((data) => {
        console.log('success',data);
        let list = (data.data && data.data.accountFund) ? data.data.accountFund : [];
        let formatList = list.map((value, index) => {
          let result = {};
          result.name = value.currencyname;
          result.useable = '$ ' + value.usablefund;
          result.freeze = '$ ' + value.frozenfund;
          result.total = '$ ' + value.total;
          return result;
        })
        this.account_list_data = formatList;
      })
    },
  }
}
</script>

<style>
  .account-list h3 {
    display: inline-block;
    font-weight: normal;
    height: 60px;
    line-height: 60px;
    border-bottom: 2px solid #2d8cf0;
    padding: 0 10px;
  }
</style>
