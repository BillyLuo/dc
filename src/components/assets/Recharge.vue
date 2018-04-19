<template>
  <div class="recharge">
    <h3 class="recharge-currency">{{currencyType+'充值'}}</h3>
    <div class="divide"></div>
    <div class="recharge-address clear">
      <div class="float-left color-586c86">充值地址</div>
      <input :value="rechargeAddress" readonly :class="'float-left recharge-address-detail'" />
      <Button class="yy-button" @click="bespoke" type="primary">预约</Button>
    </div>
    <div v-show="currencyType == 'ETH'?false:true" class="recharge-address clear">
      <div class="float-left color-586c86">公钥</div>
      <input :value="public_pas" readonly :class="'float-left recharge-address-detail'" />
    </div>
    <div class="recharge-note">
      <div class="recharge-note-title color-586c86">充值须知</div>
      <ul class="recharge-note-content">
        <li>冲币备注。</li>
        <li>您充值{{currencyType}}上述地址后，需要整个{{currencyType}}网络节点的确认，为了快速到账，您可以向ETH网络支付少量的手续费。</li>
        <li>最小充值金额是：0.0001 您的{{currencyType}}地址不会改变，可以重复充值，如有更改，我们会通过网站公告或邮件通知您。</li>
      </ul>
    </div>
    <div class="recharge-record">
      <h3 class="color-white">{{currencyType}}充值记录</h3>
      <Table :class="'no-border-table dark-mode'" stripe :columns="record_column" :data="record_data" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title:'ETH充值',
      currencyType:'ETH',
      rechargeAddress:'',
      public_pas:"",
      // record_column:[
      //   {
      //     title: '最后更新',
      //     key: 'lastupdate'
      //   },
      //   {
      //     title: '充值地址',
      //     key: 'rechargeaddress',
      //     sortable: false
      //   },
      //   {
      //     title: '充值数量',
      //     key: 'rechargecount',
      //     sortable: true
      //   },
      //   {
      //     title: '确认数',
      //     key: 'count',
      //     sortable: true
      //   },
      //   {
      //     title: '状态',
      //     key: 'status',
      //     sortable: false
      //   }
      // ],
      record_column: [
        {
          title: '币种',
          key: 'coin',
          sortable: true
        },
        {
          title: '交易时间',
          key: 'createdTime',
          sortable: true
        },
        {
          title: '类型',
          key: 'operateType',
          sortable: true,
          render: (h,param) =>{
            // console.log(param.row)
            if(param.row.operateType == "1"){
              return h("span","充币")
            }else if(param.row.operateType == "2"){
              return h("span","提币")
            }
          }
        },
        {
          title: '金额',
          key: 'amount',
          sortable: true,
          sortMethod(a,b,type){
            if (type == 'asc') {
              return a - b;
            }else {
              return b - a;
            }
          },
          render: (h,param) =>{
            return h("span",Number(param.row.amount).toFixed(6))
          }
        },
        {
          title: '手续费',
          key: 'serviceCharge',
          // sortable: true,
          sortMethod(a,b,type){
            if (type == 'asc') {
              return a - b;
            }else {
              return b - a;
            }
          },
          render: (h,param) =>{
            return h("span",Number(param.row.serviceCharge).toFixed(6))
          }
        },
        {
          title: '状态',
          key: 'status',
          // sortable: true,
          render: (h,params) =>{
              // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
              if(params.row.status == "1"){
                  return h("span","充值到账")
              }else if(params.row.status == "2" ){
                  return h("span","提币中")
                  
              }else if(params.row.status == "3" ){
                  return h("span","提币到账")
              }else if(params.row.status == "4"){
                  return h("span","提币失败")
              }
          }
        },
      ],
      record_data:[]
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$router': 'getParams'
  },
  mounted(){
    this.getParams();
    this.detaillist();
  },
  methods:{
    detaillist(){
      let that=this;
      this.record_data=[];
      this.$ajax.post('/trade/tps/pbqrw.do',{
        coin:this.currencyType,
        reqresource:1,
        operateType:1,
        pageno:1,
        pagesize:100
      }).then((res)=>{
        console.log('-----detail',res);
        if (res.status == 200 && res.data.err_code == '1') {
          if(res.data.recordDetail){
              res.data.recordDetail.map((item)=>{
                if(item.operateType == "1"){
                  that.record_data.push(item)
                }
              })
              
          }
        }else {
          that.$Message.warning('获取充币记录失败,请稍后重试');
        }
      }).catch((err)=>{
        console.warn('获取充币记录失败');
        that.$Message.warning('获取充币记录失败,请稍后重试');
      })
    },
    getParams () {
      // 取到路由带过来的参数 
      let routerParams = this.$route.query
      console.log("=======routerParams======",routerParams)
      this.currencyType = routerParams.name;
      let that=this;
      this.$ajax({
          method:"post",
          url:"/trade/tps/pblaf.do",
          data:{
              reqresource:1,
              currencytype: that.currencyType
          }
      }).then((res)=>{
          if(res.data.accountFund && res.data&&res.data.err_code=="1"){
              that.rechargeAddress = res.data.accountFund[0].address;
              that.public_pas = res.data.accountFund[0].pub;
          }
      })
      
    },
    bespoke(){
      let that = this;
      this.$ajax({
          method:"post",
          url:"/trade/tps/pbrcd.do",
          data:{
              reqresource:1,
              coin: that.currencyType
          }
      }).then((res)=>{
          console.log(res.data)
          if(res.data && res.data.err_code =="1"){
            that.$Notice.success({
							title:'温馨提示',
							desc:'您已预约成功'
						})
          }else{
            that.$Notice.error({
							title:'错误提示',
							desc: res.data.msg
						})
          }
            
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .recharge {
  }
  .recharge-currency {
    color:#fff;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    padding: 0 2px;
    padding-left: 0;
    position: relative;
    font-weight: 400;
    &:after{
      content:'';
      display: inline-block;
      width: 100%;
      left: 0px;
      height: 2px;
      // background: #3166D2;
      position: absolute;
      bottom: 0px;
    }
  }
  .recharge-address {
    margin: 50px 0;
    .yy-button{
      height:40px;
      width:80px;
      // line-height: 40px;
      margin-left: 20px;
    }
    div.float-left {
      width: 100px;
      line-height: 40px;
      margin-right: 40px;
    }
    .recharge-address-detail {
      width: 600px;
      height: 40px;
      padding: 0 10px;
      background: transparent;
      // border: 1px solid #f5f5f5;
      border: 0px;
      color: #586c86;
      appearance: none;
    }
    
  }
  .recharge-note {
    border: 1px solid #586c86;
    // background: #FDFEFF;
    padding: 20px;
    border-radius: 3px;
  }
  .recharge-note-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .recharge-note-content {
    line-height: 1.8em;
    li {
      position: relative;
      padding-left: 15px;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        width: 6px;
        height: 6px;
        background-color: #fff;
        border-radius: 50%;
        -webkit-transform: translate(0,-50%);
        -moz-transform: translate(0,-50%);
        -ms-transform: translate(0,-50%);
        transform: translate(0,-50%);
        top: .9em;
        background-color: #3166D2;
      }
    }
  }
  .recharge-record {
    margin-top: 50px;
    &>h3 {
      font-weight: 400;
      position: relative;
      height: 40px;
      line-height: 40px;
      margin-bottom: 40px;
      &::after{
        content: '';
        display: inline-block;
        width: 60px;
        height: 2px;
        background-color: #3166D2;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
</style>
