<template>
  <div style="background:#fff;">
    <div class="latest-market">
      <div class="wrapper">
        <div class="wrapper-title">
          <h3>区块链商品最新行情</h3>
          <div class="line"></div>
        </div>
        <div class="wrapper-table">
          <Table  :columns="columns" :data="dataArry"></Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  export default {
    data () {
      const dataArry = [];
      for (let i = 0;i < 26;i++){
        dataArry.push({
          name: 'ETH / ETH',
          price: '￥' + 7613.219,
          change: '-3.51%',
          trend:[820+i/100, 932+i/100, 901+i/100, 934+i/100, 1290+i/100, 1330+i/100, 1320+i/100]
        })
      }
      return {
        dataArry:[],
        columns: [
          {
            title: '币种',
            key: 'currencyname',
            align: 'center',
            className:'demo-table-info-column',
            render: (h, params) => {
              return h('div', {
                  attrs: {
                  }
                },
                [
                  h('img', {
                    attrs: {
                      src: '/static/img/coin/icon-btc.png',
                      width:'30px',
                      height:'30px',
                      style:'float:left;margin-left:25px'
                    }
                  }),
                  h('span',{class:'img-right-text'}, params.row.currencyname)
                ]
              );
            }
          },
          {
            title: '最新价格',
            key: 'curprice',
            align: 'center',
            render: (h, params) => {
              return h('div',
                [
                  h('span',{class:params.row.range > 0 ?'price-text-red':'price-text'}, Number(params.row.curprice).toFixed(4)),
                  h('span', {class:params.row.range > 0 ?'price-img-up':"price-img-down"})
                ]);
            }
          },
          {
            title: '24H涨跌',
            key: 'range',
            align: 'center',
            className:'change-table-info-column',
            render: (h,params) =>{
              return h("span",params.row.range + '%')
            }
          },
          {
            title: '价格趋势（3日）',
            key: 'dayclose',
            align: 'center',
            render: (h, params) => {
              return h('div',{attrs:{
                id:'trend-table'+ params.index,
                style:'width: 240px;\n' +
                '          height: 65px;position: absolute;top:0'
              }})
            }
          },
          {
            title: ' ',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    shape:"circle"
                  },
                  style: {
                    marginRight: '5px',
                    width:'110px'
                  },
                  on: {
                    click: () => {
                      this.goTransaction(params.index)
                    }
                  }
                }, '去交易'),
              ]);
            }
          }
        ],
        // data: dataArry
      }
    },
    methods: {
      goTransaction(index){   //去交易
        // console.log(index,'==============')
        this.$router.push("trading")
      }
    },
    created(){
      let that=this;
      this.dataArry = [];
       this.$ajax({
        method: "get",
        url: "/trade/tps/pbfcd.do",
        data:{
          reqresource:1
        }
      }).then((data)=>{
        console.log("shouye ====== ")
        console.log(data.data.currencyDetail)
        if(data.data.currencyDetail){
          that.dataArry = data.data.currencyDetail;
          
        }
      })
    },
    mounted(){
      
      let that=this;
     
      setTimeout(function(){
        for(let i=0 ; i< that.dataArry.length;i++){
            let myChart = echarts.init(document.getElementById('trend-table'+i));
            const  option = {
              xAxis: {
                show : false,
                type: 'category',
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                show : false,
                type: 'value',
              },
              series: [{
                data: that.dataArry[i].dayclose,
                type: 'line',
                symbol: '',
                symbolSize: 0
              }]
            };
            myChart.setOption(option);
          }
      },1000)
    }
  }
</script>
<style lang="scss">
  .latest-market{
    width: 100%;
    padding: 70px 0;
    .wrapper{
      width: 1200px;
      margin: 0 auto;
      .wrapper-title{
        width: 100%;
        margin-bottom: 35px;
        text-align: center;
        font-size: 14px;
        h3{
          font-size: 20px;
          color: #333;
          font-weight: 400;
          margin-bottom: 10px;
        }
        .line{
          width: 30px;
          height: 3px;
          background: #FDD11A;
          margin: 0 auto;
        }
      }
      .wrapper-table{
        width: 100%;
        .ivu-table-body{
          overflow: hidden;
        }
        .ivu-table{
          font-family: HelveticaExtNormal,"Microsoft Yahei",arial,Helvetica;
          td.demo-table-info-column{
            background-color: #f8f9fe;
            color: #50586D;
            .img-right-text{
              font-size:16px;
              display:inline-block;
              height:30px;
              line-height:30px;
            }
          }
          td.change-table-info-column{
            font-size:14px;
          }
          th.ivu-table-column-center{
            height: 60px;
            background: #fff;
            font-size: 16px;
            font-weight: 500;
          }
          td.ivu-table-column-center{
            height: 65px;
            padding: 10px;
            position: relative;
            .price-text{
              font-size:14px;
              display:inline-block;
              height:30px;
              line-height:30px;
              color :green;
            }
            .price-text-red{
              color:#f00;
            }
            .price-img-up{
              display: inline-block;
              width: 15px;
              height: 15px;
              margin-left: 10px;
              background: url("/static/img/icon-arrow.png");
              background-position: 0px 0px;
            }
            .price-img-down{
              display: inline-block;
              width: 15px;
              height: 15px;
              margin-left: 10px;
              background: url("/static/img/icon-arrow.png");
              background-position:0  15px;
            }
          }
          .ivu-table-row:hover{
            .demo-table-info-column{
              background-color: #192E5B;
              color: #fff;
            }
          }
          .ivu-table-row-hover{
            background-color: #f8f9fe;
          }
        }
      }
    }

  }

</style>
