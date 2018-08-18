<template>
  <div class="cashrech">
    <h3><span>线下客服</span></h3>
    <div class="financial-management">
      <!-- <div>
        
        <div style="padding:4px 0;font-size:12px;color: #f00;">{{dateErr}}</div>
      </div> -->
      
      <Table :class="'no-border-table dark-mode'" stripe :columns="account_detail_column" :data="account_detail_data" />
      
    </div>
  </div>
</template>
<script>
export default {
  data(){
      return {
          account_detail_column:[
            {
                title: '客服昵称',
                key: 'name'
            },
            {
                title: '客服QQ',
                key: "qq"
            },
            {
                title:"客服简介",
                key:"jianjie"
            }
          ],
          account_detail_data:[
                {
                    name: '客服1',
                    qq: '100000',
                    jianjie: '钻石金牌客服'
                },
                {
                    name: '客服2',
                    qq: '100001',
                    jianjie: '钻石金牌客服'
                },
                {
                    name: '客服3',
                    qq: '100002',
                    jianjie: '钻石金牌客服'
                },
                {
                    name: '客服4',
                    qq: '100003',
                    jianjie: '钻石金牌客服'
                }
          ]
      }
  }
}
</script>

<style lang="scss">
  .cashrech {
      &>h3{
            background: rgb(42, 42, 42);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
            height: 72px;
            line-height: 72px;
            color: rgb(255, 255, 255);
            padding: 0px 20px;
            font-size: 16px;
            // margin-bottom: 20px;
      } 
   
    .ivu-table .ivu-table-body .ivu-table-cell{
        color:#fff !important;
    }
  }
</style>
