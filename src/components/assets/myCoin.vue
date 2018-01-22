<template>
    <div class="my_con">
      <div class="my_coin_tab">
        <span :class="{active:my_coin_active == 'coin'}" @click="togglecoin('coin')">COINS发布</span><span :class="{active:my_coin_active == 'statistic'}" @click="togglecoin('statistic')">全站交易统计</span>
      </div>
      <Table stripe :columns="my_coin_columns" :data="my_coin_data"/>
    </div>
</template>

<script>
export default {
  data (){
    return {
      my_coin_active:'coin',
      my_coin_columns:[
        {title:'分红主题',key:'theme'},
        {title:'本次赠送CoinS总数',key:'total'},
        {title:'获得币数',key:'coin_number'},
        {title:'状态',key:'status'},
        {title:'分红日期',key:'date'}
      ],
      my_coin_data:[
        
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
</style>
