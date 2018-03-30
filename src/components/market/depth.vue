<template>
    <div class="depth">
        <Row>
            <Col span="14" class="depth-col">
                <div class="depth-title">
                    深度图
                </div>    
                <div id="canvas" :style="{width: '100%', height: '470px'}">

                </div>
            </Col>
            <Col span="10" class="depth-col2">
                <div class="depth-col">
                    <div class="depth-title">
                        实时交易
                    </div>
                    <Table :columns='columns' height='470' :data='datas'></Table>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import echarts from 'echarts';
import {Table} from "iview";
export default {
    name: 'depth',
    components:{
        Table
    },
    props: ['params'],
    data: function() {	
        return {
            currency: this.params.currency,
            bizhong: 'DUST',
            columns:[],
            datas: []
        }
    },
    watch:{
        params: 'xuanran'
    },
    mounted(){
        console.log(this.params)
        this.cahvas ();
        this.infoDate();
    },
    methods: {
        xuanran(a){
            console.log("===#####################")
            console.log("=======",a)
            this.currency = a.currency;
            this.bizhong= a.bizhong;
            this.infoDate();
        },
        addzero (number) {
            if(number < 10){
                return "0"+number;
            }else{
                return number;
            }
        },
        infoDate(){
            let that=this;
            this.columns=[
                {
                    title: '时间',
                    key: 'tradetime',
                    render: (h,params) => {
                        return  h("span",params.row.tradetime.substr(11,20))
                    }
                },
                {
                    title: '方向',
                    key: 'direction',
                    render: (h,params) => {
                        if(params.row.tradetype == "1"){
                            return h('span',{
                                style: {
                                        color: 'green',
                                        // textAlign: 'center',
                                        // display: 'inline-block',
                                        // width: '100%'
                                    },
                            },'买入')
                            
                        }
                        if(params.row.tradetype == "2"){
                            return h('span',{
                                style: {
                                        color: 'red',
                                        // textAlign: 'center',
                                        // display: 'inline-block',
                                        // width: '100%'
                                    },
                            },'卖出')

                            
                        }
                    }
                },
                {
                    title: '价格('+this.bizhong+')',
                    key: 'tradeprice',
                    render: (h,params)=>{
                        return  h("span",Number(params.row.tradeprice).toFixed(6))
                    }
                },
                {
                    title: '数量('+this.currency+')',
                    key: 'tradecount',
                    render: (h,params)=>{
                        return  h("span",Number(params.row.tradecount).toFixed(6))
                    }
                }
            ];

            this.$ajax({
                method: 'post',
                url: '/trade/tps/pblds.do',
                data: {
                    currencytype:"ETH",
                    pagesize: 100,
                    reqresource:1
                }
            })
            .then(function (response) {
                console.log(response.data.latestDeal);
                if(response.data.latestDeal){
                    that.datas=[];
                    that.datas = response.data.latestDeal;
                }
                
            })

        },
        cahvas () {
            // let biddata,askdata;
            // this.$ajax.get('/huobi/market/depth?symbol=btcusdt&type=step3')
            // .then((response)=>{
            //     console.log(response.data)
            //     biddata = response.data.tick.bids;
            //     askdata = response.data.tick.asks;
            //     let myChart = echarts.init(document.getElementById('canvas'))
            //     // myChart.showLoading();
            //     // myChart.clear();
            // let option1 = {
            //         backgroundColor:'#181B2A',
            //         tooltip: {
            //             trigger: 'axis',
            //             formatter: function(val){
            //                 return val[0].seriesId + "</br>价格"+val[0].data[0]+"</br>数量"+val[0].data[1]
            //             }
            //         },
            //         grid:{
            //             left:'5%',
            //             right:0,
            //             bottom:30,
            //             top:20
            //         },
            //         xAxis: {
            //             // show: false,
            //             name:'',
            //             type: 'category',
            //             boundaryGap: false,
            //             // data: ssw,
            //             // boundaryGap: true
            //         },
            //         yAxis:{ 
            //             // show: false,
            //             splitLine:{show: false},//去除网格线
            //             type:'value',
            //         },
                    
            //         series: [
            //             {
            //                 id:"买入",
            //                 type: 'line',
            //                 symbol: "",
            //                 symbolSize: 0,
            //                 name: '数量',
            //                 data: biddata,
            //                 lineStyle: {
            //                     color: 'red'
            //                 },
            //                 areaStyle: {
            //                     color:'red'
            //                 }
            //             }, 
            //             {
            //                 id: '卖出',
            //                 type: 'line',
            //                 name: '数量',
            //                 symbol: '',
            //                 symbolSize: 0,
            //                 data: askdata,
            //                 lineStyle: {
            //                     color: 'green'
            //                 },
            //                 areaStyle: {
            //                     color: 'green'
            //                 }
            //             }
            //         ]
            //     };
            //     myChart.hideLoading();
            //     myChart.setOption(option1)
            // })
            
        }
    }
}
</script>

<style lang="scss">
    .depth{
        margin-top: 10px;
        min-height:520px;
        .depth-col{
            min-height:520px;
            background: #181B2A;
            border-radius: 3px;
            .depth-title{
                height:47px;
                background: #1c1f2e;
                line-height: 47px;
                padding:0 20px;
                border-bottom:1px solid #1F2943;
                border-radius: 3px 3px 0 0 ;
                font-size:14px;
                font-weight:600;
            }
        }
        .depth-col2{
            padding-left:10px;
            min-height:520px;
            .ivu-table{
                background:none;
                color:#C7CCE6;
                min-height:410px;
            }
            .ivu-table:after{
                width:0px;
            }
            .ivu-table-wrapper{
                border:none;
            }
            .ivu-table td,.ivu-table th{
                background:none;
                border:none;
            }
            .ivu-table:before{
                background: none;
            }
            .ivu-table:after{
                background: none;
            }
            .ivu-table-row-hover td{
                background: #1E2235 !important;
            }
            .ivu-table-sort i.on {
                color: #7A98F7;
            }
            .ivu-table th, .ivu-table td{
                height:42.5px;
            }
        }
        .ivu-table-body::-webkit-scrollbar{
            width: 8px;
            height: 0px;
            background-color: #f8f8f800;
        }
        /*定义滚动条的轨道，内阴影及圆角*/
        .ivu-table-body::-webkit-scrollbar-track{
            -webkit-box-shadow: inset 0 0 6px rgba(17, 17, 17, 0.116);
            border-radius: 10px;
            background-color:none;
            opacity: 0;
        }
        /*定义滑块，内阴影及圆角*/
        .ivu-table-body::-webkit-scrollbar-thumb{
            /*width: 10px;*/
            height: 20px;
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(17, 17, 17, 0.116);
            background-color: rgba(145, 145, 145, 0.178);
        }
        
    }
</style>