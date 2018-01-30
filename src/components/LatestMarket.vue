<template>
  <div>
    <div class="latest-market">
      <div class="wrapper">
        <div class="wrapper-title">
          <h3>区块链商品最新行情</h3>
          <div class="line"></div>
        </div>
        <div class="wrapper-table">
          <Table  :columns="columns" :data="data"></Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: '币种',
            key: 'name',
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
                h('span',{class:'img-right-text'}, params.row.name)
              ]
              );
            }
          },
          {
            title: '最新价格',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              return h('div',
                [
                  h('span',{class:'price-text'}, params.row.price),
                  h('span', {class:'price-img-up'})
                ]);
            }
          },
          {
            title: '24H涨跌',
            key: 'change',
            align: 'center',
            className:'change-table-info-column',
          },
          {
            title: '价格趋势（3日）',
            key: 'trend',
            align: 'center',
            render: (h, params) => {
              return h('div',{attrs:{id:'trend-table'}})
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
        data: [
          {
            name: 'ETH / ETH',
            price: '￥' + 7613.219,
            change: '-3.51%'
          },
          {
            name: 'ETH / ETH',
            price: 24,
            change: '-3.51%'
          },
          {
            name: 'ETH / ETH',
            price: 30,
            change: '-3.51%'
          },
          {
            name: 'ETH / ETH',
            price: 26,
            change: '-3.51%'
          }
        ]
      }
    },
    methods: {
      goTransaction(index){   //去交易
        console.log(index,'==============')
      }
    },
    mounted(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('trend-table'));

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
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
            .price-text{
              font-size:14px;
              display:inline-block;
              height:30px;
              line-height:30px;
            }
            .price-img-up{
              display: inline-block;
              width: 15px;
              height: 15px;
              margin-left: 10px;
              background: url("/static/img/icon-arrow.png");
              background-position: 0px 0px;
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
        #trend-table{
          width: 100%;
          height: 65px;
          border:1px solid red;
        }
      }
    }

  }

</style>
