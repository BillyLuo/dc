<template>
    <div class="hangqing clear" style="margin-top:80px;">
       
        <!-- <header class="hq-header">

        </header> -->
        <section class="section1">
            <div class="hq-sidebar">
                <Sidebar v-on:itemrow="changeState"/>
            </div>
        </section>
        <section class="section2">
            <div class="hq-content">
                <div class='k-charts'>
                    <!-- <div class="k-select">
                        <Select v-model="model1" @on-change='selectTime' style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div> -->
                    <!-- <div id="canvas" :style="{width: '100%', height: '400px'}">
                        
                    </div> -->
                    <div id="chart">
                    </div>
                    
                </div>
                <Deal/>
            </div>


        </section>
    </div>
</template>

<script>
import echarts from 'echarts';
import TradingView from './trading';
import Sidebar from './marketSidebar';
import Deal from './deal';
console.log(TradingView);
function initCharts (symbol) {
        new TradingView.widget({
            "container_id":"chart",
            "width": '100%',
            "height": 500,
            "symbol": symbol?'BINANCE:'+symbol:"BINANCE:BTCUSDT",
            "interval": "1",
            "timezone": "Asia/Hong_Kong",
            "theme": "Dark",
            "style": "1",
            "locale": "zh_CN",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "withdateranges": true,
            "hide_side_toolbar": false,
            "allow_symbol_change": false,
            "hideideasbutton": true,
            "show_popup_button": true,
            "popup_width": "1000",
            "popup_height": "650"
        });
} 

export default {
    name: 'Market',
    components:{
        Sidebar,Deal
    },
    data: function() {	
        return {
            param:'1min',
            cityList: [
                {
                    value: '1min',
                    label: '1min'
                },
                {
                    value: '5min',
                    label: '5min'
                },
                {
                    value: '15min',
                    label: '15min'
                },
                {
                    value: '30min',
                    label: '30min'
                },
                {
                    value: '60min',
                    label: '60min'
                },
                {
                    value: '1day',
                    label: '1day'
                },
                {
                    value: '1mon',
                    label: '1mon'
                },
                {
                    value: '1week',
                    label: '1week'
                },
                {
                    value: '1year',
                    label: '1year'
                }
            ],
            model1: ''
        }
    },
    mounted () {
        //this.drawLine(this.param);
        // setTimeout(()=>{
            initCharts();
        // },100)
    },
    methods: {
        changeState(row){
            console.log(row.bizhong)
            initCharts(row.bizhong);
        },
        selectTime (value) {
            console.log(value)
            //this.drawLine(value);
        },
        drawLine(param){
            let data;
            let myChart = echarts.init(document.getElementById('canvas'))
                myChart.showLoading();
                myChart.clear();
            this.$ajax.get('/huobi/history/kline?symbol=ethusdt&period='+param)
            .then(function(response){
                console.log(response)
                data = response.data.data;

                function compare(property){
                    return function(a,b){
                        var value1 = a[property];
                        var value2 = b[property];
                        return value1 - value2;
                    }
                }
                data.sort(compare('id'))

                let data1 = [];
                let data2 = [];
                // for(var i=0;i<data.length;i++){
                //     var date = new Date(data[i].id*1000)
                //     data1.push(date.getHours()+":"+date.getMinutes())
                //     // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest),成交量，成交笔数,data[i].amount,data[i].count
                //     // data2.push([data[i].open,data[i].close,data[i].low,data[i].high])
                // }

                data2 = data.map(function(item){
                    var date = new Date(item.id*1000)
                    data1.push(date.getHours()+":"+date.getMinutes())
                    return [item.open,item.close,item.low,item.high]
                })
            let upColor = '#ec0000';
            let upBorderColor = '#8A0000';
            let downColor = '#00da3c';
            let downBorderColor = '#008F28';
            let option={};
            function calculateMA(dayCount) { 
                let result = [];
                for (let i = 0, len = data2.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    let sum = 0;
                    for (let j = 0; j < dayCount; j++) {
                        sum += data2[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            };
                
                option = {
                    backgroundColor:'#21202D',
                    
                    title: {
                        text: 'K线数据',
                        left: 0,
                        textStyle:{color: '#fff'}
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        formatter: function (params) {
                            // console.log(params)
                            var res = "时间:"+params[0].name;
                            res += '<br/>  开盘 : ' + params[0].value[1].toFixed(4) + '<br/>  最高 : ' + params[0].value[4].toFixed(4);
                            res += '<br/>  收盘 : ' + params[0].value[2].toFixed(4) + '<br/>  最低 : ' + params[0].value[3].toFixed(4);
                            return res;
                        }
                        
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            restore : {show: true},
                            saveAsImage : {show: true},
                            // dataView : {show: true},
                            // magicType: {
                            //     type: ['line', 'bar', 'stack', 'tiled']
                            // }
                        }
                    },
                    legend: {
                        show:false,
                        data: [ '开', '收', '低', '高'],
                        inactiveColor: '#777',
                    },
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: data1,
                        scale: true,
                        boundaryGap : false,
                        axisLine: {onZero: false},
                        splitLine: {show: false},
                        splitNumber: 30,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisLine: {
                            lineStyle:{
                                color:"#777"
                            }
                        }
                    },
                    yAxis: {
                        scale: true,
                        position: 'right',
                        splitNumber:10,
                        splitArea: {
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color:"#777"
                            }
                        }
                    },
                    brush: {
                        // left:'30px',
                        // toolbox: ['rect','polygon','lineX','lineY','keep','clear'],
                        // xAxisIndex: 'all',
                        // brushLink: 'all',
                        // outOfBrush: {
                        //     colorAlpha: 0.1
                        // }
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 50,
                            end: 100
                        },
                        {
                            show: true,
                            type: 'slider',
                            y: '90%',
                            start: 50,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'candlestick',
                            data: data2,
                            itemStyle: {
                                normal: {
                                    color: upColor,
                                    color0: downColor,
                                    borderColor: upBorderColor,
                                    borderColor0: downBorderColor
                                }
                            },
                            markPoint: {
                                label: {
                                    normal: {
                                        show:true,
                                        formatter: function (param) {
                                            return param != null ? Math.round(param.value) : '';
                                        }
                                    }
                                },
                                data: [
                                    {
                                        name: 'highest value',
                                        type: 'max',
                                        valueDim: 'highest'
                                    },
                                    {
                                        name: 'lowest value',
                                        type: 'min',
                                        valueDim: 'lowest'
                                    },
                                    {
                                        name: 'average value on close',
                                        type: 'average',
                                        valueDim: 'close'
                                    }
                                ],
                                tooltip: {
                                    formatter: function (param) {
                                        // console.log(param)
                                        return param.name + '<br>' + (param.data.coord || '');
                                    }
                                }
                            }
                        },
                        {
                            name: '开',
                            type: 'line',
                            data: calculateMA(5),
                            smooth: true,
                            symbol:"none",
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: '收',
                            type: 'line',
                            data: calculateMA(10),
                            smooth: true,
                            symbol:"none",
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: '低',
                            type: 'line',
                            data: calculateMA(20),
                            smooth: true,
                            symbol:"none",
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: '高',
                            type: 'line',
                            data: calculateMA(30),
                            smooth: true,
                            symbol:"none",
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },

                    ]
                };
                myChart.hideLoading();
                myChart.setOption(option)
            })
        }
    }
}
</script>

<style lang="scss">

    .hangqing{
        // width:1200px;
        margin: 0 auto;
        background: #262a42;
        color:#C7CCE6;
        .hq-header{
            width:100%;
            height:60px;
            background: #323232;
        }
        .section1{
            width:24%;
            float: left;
            // background: #efefef;
            min-height:300px;
            .hq-sidebar{
                margin: 10px;
                background: #1B1E2E;
                min-height:100px;
            }
        }
        .section2{
            width:76%;
            float: left;
            
            min-height:300px;
            .hq-content{
                margin: 10px;
                // background: #ccc;
                min-height:100px;
                .k-charts{
                    width:100%;
                   
                }
                .k-select{
                    width:100%;
                    height:50px;
                    padding: 10px 20px;
                    background: #21202D;
                }
            }
        }
        .ivu-tabs-nav .ivu-tabs-tab:hover {
        color: #7A98F7;
    }
    }
</style>