<template>
    <div class="depth">
        <Row>
            <Col span="14" class="depth-col">
                <div class="depth-title">
                    深度图
                </div>    
                <div id="canvas" :style="{width: '100%', height: '400px'}">

                </div>
            </Col>
            <Col span="10" class="depth-col2">
                <div class="depth-col">
                    <div class="depth-title">
                        实时交易
                    </div>
                    <Table :columns='columns' :data='datas'></Table>
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
            console.log("=======",a)
            this.currency = a.currency;
            this.bizhong= a.bizhong;

            this.infoDate();
        },
        infoDate(){
            let that=this;
            this.columns=[
                {
                    title: '时间',
                    key: 'ts',
                    render: (h,params) =>{
                        if(params.row.ts){
                            var date = new Date(params.row.ts)
                            console.log(date)
                            console.log(date.getHours()+':'+date.getMinutes()+':'+date.getSeconds())
                            return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
                        }else{
                            return ""
                        }
                    }
                },
                {
                    title: '方向',
                    key: 'direction',
                    render: (h,params) => {
                        if(params.row.direction == "buy"){
                            return h('span',{
                                style: {
                                        color: 'green',
                                        // textAlign: 'center',
                                        // display: 'inline-block',
                                        // width: '100%'
                                    },
                            },'买入')
                            
                        }
                        if(params.row.direction == "sell"){
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
                    key: 'price',
                },
                {
                    title: '数量('+this.currency+')',
                    key: 'amount'
                }
            ];
            this.$ajax.get('/huobi/market/history/trade?size=10&symbol='+this.params.currency.toLocaleLowerCase()+''+this.params.bizhong.toLocaleLowerCase())
            .then(function(response){
                response.data.data.map((item)=>{
                    console.log(item.data)
                    that.datas.push(item.data[0])
                })
                
            })
            
        },
        cahvas () {
             let myChart = echarts.init(document.getElementById('canvas'))
                myChart.showLoading();
                myChart.clear();
            let option = {
                title: {
                    text: '堆叠区域图'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {}},
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };

            myChart.hideLoading();
                myChart.setOption(option)

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
        
    }
</style>