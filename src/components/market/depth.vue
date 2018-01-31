<template>
    <div class="depth">
        <Row>
            <Col span="14" class="depth-col">
                <div class="depth-title">
                    深度图
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
import {Table} from "iview";
export default {
    name: 'depth',
    components:{
        Table
    },
    data: function() {	
        return {
            btcname: 'ETH',
            prices: 'DUST',
            columns:[],
            datas: []
        }
    },
    created(){
        this.columns=[
            {
                title: '时间',
                key: 'time'
            },
            {
                title: '方向',
                key: 'buysell',
                render: (h,params) => {
                    if(params.row.buysell == "buy"){
                        return h('span',{
                            style: {
                                    color: 'green',
                                    // textAlign: 'center',
                                    // display: 'inline-block',
                                    // width: '100%'
                                },
                        },'买入')

                        
                    }
                    if(params.row.buysell == "sell"){
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
                title: '价格('+this.prices+')',
                key: 'price',
            },
            {
                title: '数量('+this.btcname+')',
                key: 'num'
            }
        ]
        for (var i=0; i<10;i++){
            if(i%2 == 0){
                this.datas.push({time: '09:48:0'+i,buysell: 'buy',price: (Math.random()*1000).toFixed(4),num: (Math.random()*10).toFixed(4)})
            }else{
                this.datas.push({time: '09:48:0'+i,buysell: 'sell',price: (Math.random()*1000).toFixed(4),num: (Math.random()*10).toFixed(4)})
            }
        }
    },
    methods: {}
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