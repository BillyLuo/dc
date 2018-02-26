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
        sortable: true
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
        this.$router.push('/assets/recharge')
      }else if(action.type == 'out') {
        this.$router.push('/assets/withdraw');
      }
    },
    getAccountList() {
      let list = [{
          name: 'BTC',
          useable: '0.33',
          freeze: '0.00',
          total: '3.33'
        },
        {
          name: 'ETH',
          useable: '45.19',
          freeze: '0.00',
          total: '66.62'
        }
      ]
      let formatList = list.map((value, index) => {
        let result = {};
        result.name = value.name;
        result.useable = '$ ' + value.useable;
        result.freeze = '$ ' + value.freeze;
        result.total = '$ ' + value.total;
        return result;
      })
      this.account_list_data = formatList;
    },
  }
}
</script>

<style>

</style>
