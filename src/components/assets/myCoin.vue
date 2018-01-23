<template>
    <div class="my_coin">
      <div class="my_coin_tab">
        <span :class="{active:my_coin_active == 'coin'}" @click="togglecoin('coin')">COINS发布</span><span :class="{active:my_coin_active == 'statistic'}" @click="togglecoin('statistic')">全站交易统计</span>
      </div>
      <Table :class="'no-border-table'" :style="{display:my_coin_active == 'coin' ? 'block':'none'}" stripe :columns="my_coin_columns" :data="my_coin_data"/>
      <Table stripe :class="'no-border-table'" :style="{display:my_coin_active == 'statistic' ? 'block':'none'}" :columns="trade_columns" :data="trade_data"/>
    </div>
</template>

<script>
export default {
  data (){
    return {
      my_coin_active:'coin',
      my_coin_columns:[
        {title:'分红主题',key:'theme'},
        {title:'本次赠送Coins总数',key:'total'},
        {title:'获得币数',key:'coin_number'},
        {title:'状态',key:'status'},
        {title:'分红日期',key:'date'}
      ],
      my_coin_data:[

      ],
      trade_columns:[
        {title:'全站交易总额',key:'website_total'},
        {title:'我的交易总额',key:'my_total'},
        {title:'预计可分数量',key:'divide_amount'},
        {title:'时间范围',key:'range_time'}
      ],
      trade_data:[
        
      ]
    }
  },
  methods:{
    togglecoin(value) {
      this.my_coin_active = value;
  },
  }
}
</script>
  
<style scoped lang="scss">
  .my_coin_tab {
    span {
      font-size: 16px;
      margin: 0 10px;
      padding: 10px 0;
      cursor: pointer;
    }
    span.active {
      border-bottom: 2px solid #2d8cf0;
    }
  }
  .my_coin {
    .no-border-table {
      margin-top: 30px;
    }
  }
</style>
