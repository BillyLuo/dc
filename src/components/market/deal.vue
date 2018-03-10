<template>
    <div class="hq-deal">
        <Row>
            <Col span="16" class="deal-buysell">
                <Row>
                    <Tabs size="small">
                        <TabPane label="限价交易" class="jiaoyi">
                            <Col span='12' style="padding:0 20px;">
                                <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div>
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <Input number></Input>
                                            <span>{{ params.bizhong }}</span>
                                            <p>≈ <i> sdsfd </i> CNY</p>
                                        </FormItem> 
                                        <FormItem label="买入量" class="deal-input">
                                            <Input number></Input>
                                            <span>{{ params.currency }}</span>
                                        </FormItem>
                                        <p class="count-money">交易额 <i>0.12341234</i> <span>USDT</span></p>
                                        <Button class="mairu">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div>
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="卖出价" class="deal-input">
                                            <Input number></Input>
                                            <span>{{ params.bizhong }}</span>
                                            <p>≈ <i> sdsfd </i> CNY</p>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <Input number></Input>
                                            <span>{{ params.currency }}</span>
                                        </FormItem>
                                        <p class="count-money">交易额 <i>0.12341234</i> <span>USDT</span></p>
                                        <Button class="mairu">卖出{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                        </TabPane>
                        <TabPane label="市价交易" class='jiaoyi'>
                            <Col span='12' style="padding:0 20px;">
                                <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div>
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格买入" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="买入量" class="deal-input">
                                            <Input number></Input>
                                            <span>{{ params.currency }}</span>
                                        </FormItem>
                                        <Button class="mairu">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div>
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem  label="卖出价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格卖出" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <Input number></Input>
                                            <span>{{ params.currency }}</span>
                                        </FormItem>
                                        <Button class="mairu">卖出{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                        </TabPane>
                    </Tabs>
                    
                </Row>
            </Col>
            <Col span="8" class="new-price">
                <div class="price-list">
                    <div class="list-title">
                        最新价 <span>{{0.12321432}} {{ params.currency }}</span>
                    </div>
                    <div class="list-table">
                        <Table :columns="columns1" :data="data1"></Table>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import {Tabs,TabPane,Table,Form,FormItem} from 'iview';

export default {
    name: 'Deal',
    components:{
        Tabs,TabPane,Form,FormItem,Table
    },
    props: ['params'],
    data: function() {	
        return {
            columns1:[
                {
                    title: ' ',
                    key: 'id',
                    render: (h, params) => {
                        if(params.row.tradetype == "1"){
                            return h('span',{
                                style: {
                                        color: 'green',
                                        textAlign: 'center',
                                        display: 'inline-block',
                                        width: '100%'
                                    },
                            },'买入')

                           
                        }
                        if(params.row.tradetype == "2"){
                            return h('span',{
                                style: {
                                        color: 'red',
                                        textAlign: 'center',
                                        display: 'inline-block',
                                        width: '100%'
                                    },
                            },'卖出')

                           
                        }
                    }
                },
                {
                    title: '价格',
                    key: 'tradeprice'
                },
                {
                    title: '数量',
                    key: 'tradecount'
                },
                {
                    title: '累计',
                    key: 'sum'
                }
            ],
            data1:[
               
            ]
        }
    },
    mounted () {
        console.log("@@@@@@@@@@@@@@@@@@")
        console.log(this.params.currency)
    },
    watch:{
        params: "paramsinfo"
    },
    methods: {
        paramsinfo (obj) {
            console.log(obj)
            let that =this;
            this.data1 = [];
            this.$ajax({
                method: 'post',
                url: '/trade/tps/pblds.do',
                data: {
                    "currencycode":obj.currency,
                    "count":"5"
                }
            })
            .then(function (response) {
                if(response.data.latestDeal){
                    let  latestDeal=response.data.latestDeal;
                    function compare(property){
                        return function(obj1,obj2){
                            var value1 = obj1[property];
                            var value2 = obj2[property];
                            return value1 - value2;     // 升序
                        }
                    }
                    var sortObj = latestDeal.sort(compare("tradetype"));
                    console.log(sortObj)

                    // 最新成交价格
                    that.data1 = sortObj;
                }
                
            })
        }
    }
}
</script>

<style lang="less">
    @import '~iview/src/styles/index.less';
    @primary-color:#7A98F7;
    .hq-deal{
        color:#C7CCE6;
        margin-top: 10px;
        height:456px;
        overflow: hidden;
        .ivu-tabs {
            color:#C7CCE6;
        }
        .deal-buysell{
            background: #1c1f2e;
            min-height: 456px;
            .ivu-tabs-nav-scroll{
                padding:10px 20px 0;
            }
            .jiaoyi{
                background: #181B2A;
                padding:24px 10px;
                .ivu-form-item-label{
                    padding:10px 0;
                    color:#C7CCE6;
                }
                .ivu-form-item-content input{
                    background: #181B2A;
                    font-size:16px;
                    height:40px;
                    border:1px solid #4E5B85;
                }
                .deal-input{
                    margin-bottom: 10px;
                    
                    p{
                        line-height: 20px;
                        font-size:12px;
                        padding-left:20px;
                        background: #4E5B85;
                        i{
                            font-style:normal;
                        }
                    }
                    input{
                        padding-left: 20px;
                        border-radius: 0;
                    }
                    span{
                        line-height: 40px;
                        font-size:16px;
                        position: absolute;
                        right:20px;
                        top:0px;
                    }
                    
                }
                .count-money{
                    line-height: 30px;
                    margin-top: 20px;
                    font-size: 16px;
                    i{
                        font-style:normal;
                    }
                }
                .mairu{
                    background: #4E5B85;
                    border:none;
                    font-size:16px;
                    font-weight:600;
                    color:#C7CCE6;
                    margin:20px 0;
                    width:100%;
                }
            }
            .to-login{
                padding: 10px 20px;
                border-bottom:1px solid #1F2943;
                font-size: 14px;
                a{
                    color: #7A98F7;
                }
            }
            .ivu-tabs-nav .ivu-tabs-tab{
                font-size: 14px;
                font-weight: 600;
            }
            .ivu-tabs-bar {
                border-bottom-color: #1F2943;
                margin-bottom: 0px;
            }
        }
        .new-price{
            padding-left: 10px;
            .price-list{
                background: #1c1f2e;
                .list-title{
                   line-height: 47px;
                   padding-left:20px;
                   font-size:14px;
                   font-weight:600;
                   border-bottom: 1px solid #1F2943;
                }
                .list-table{
                    background: #181B2A;
                    .ivu-table{
                        background:none;
                        color:#C7CCE6;
                        min-height:410px;
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
                        height:36px;
                    }
                }
            }
        }
    }
</style>