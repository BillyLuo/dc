<template>
    <div class="broker">
        <Tabs value="name1">
            <TabPane label="会员推广明细" name="name1">
                <div class="extension">
                    <div style="min-height: 112px;">
                        <div class="extension-pic">
                            <img src="/static/img/pic-03.png" alt="">
                        </div>
                        <div class="ptl8-txt">
                            <h4 class="yaoqingma mb10">
                                您的专属邀请码：<span class="color-3166D2">159929</span>
                            </h4>
                            <p class="color-999999 mb10">您的专属推广链接</p>
                            <div class="grow clearfix">
                                <div class="col12-lg-7">
                                    <input type="text" id="extension" value="https://www.coinw.com/newUser/register.html?r=159929" class="ta-c input-style-5 fs-14 pl15 pr15 radius-sm ff-hen">
                                </div>
                                <div class="col12-lg-5">
                                    <button class="w100 btn btn-h42 btn-rounded btn-style-1 fs-16" data-clipboard-target="#extension">复制</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ext-table">
                    <Table :data="data1" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有推广记录</span>" :columns="columns1" stripe></Table>
                </div>
            </TabPane>
            <TabPane label="收益明细" name="name2">
                <div class="extension">
                    <div style="min-height: 112px;">
                        <div class="extension-pic">
                            <img src="/static/img/pic-03.png" alt="">
                        </div>
                        
                        <div class="ptl8-txt">
                            <h4 class="fs-16 color-dark mb10">
                                累计邀请人数：<span class="ff-hen color-3166D2">0人</span>
                                <span class="ptl8-txt">待结算佣金：<span class="ff-hen color-3166D2">￥0.0</span></span>
                            </h4>
                            <h4 class="fs-16 color-dark mb10">
                                累计邀请佣金：<span class="ff-hen color-3166D2">￥0.0</span>
                                <span class="ptl8-txt">已结算佣金：<span class="ff-hen color-3166D2">￥0.0</span></span>
                            </h4>
                        </div>
    
                    </div>
                </div>
                <div class="ext-table">
                    <Table :data="data2" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有收益明细</span>" :columns="columns2" stripe></Table>
                </div>
            </TabPane>
            <TabPane label="收益排行榜" name="name3">
                <div class="ext-table">
                    <Table :data="data3" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="columns3" stripe></Table>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import {Tabs,TabPane} from "iview"
    export default {
        name: 'broker',
        components: {
            TabPane,
            Tabs
        },
        data () {
            return {
                data1:[],
                data2:[],
                data3:[
                    {
                        paiming:1,
                        name: '1234124312',
                        money: '134'
                    },
                     {
                        paiming:2,
                        name: '1234124312',
                        money: '134'
                    },
                     {
                        paiming:3,
                        name: '1234124312',
                        money: '134'
                    },
                     {
                        paiming:4,
                        name: '1234124312',
                        money: '134'
                    },
                     {
                        paiming:5,
                        name: '1234124312',
                        money: '134'
                    },
                     {
                        paiming:6,
                        name: '1234124312',
                        money: '134'
                    }
                ],
                columns1: [
                    {
                        title: "会员UID",
                        key: "weituotime",
                    },
                    {
                        title: '会员姓名',
                        key: 'type'
                    },
                    {
                        title: '推荐时间',
                        key: 'count'
                    }
                
                ],
                columns2: [
                   
                    {
                        title: '收益内容',
                        key: 'type'
                    },
                    {
                        title: '收益日期',
                        key: 'count'
                    }
                
                ],
                columns3: [
                    {
                        title: "排名",
                        key: "paiming",
                    },
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '收益金额',
                        key: 'money'
                    }
                
                ]
            }
        }
    }
</script>

<style lang="scss">
    .broker{
        min-height:400px;
        
        .ivu-tabs-bar{
            margin-bottom: 0;
        }
            
       .ivu-tabs-nav-scroll{
            height:60px;
            .ivu-tabs-nav .ivu-tabs-tab{
                padding:19px 16px;
            }
            
        }
        .extension{
            padding: 35px;
            .extension-pic{
                position: absolute;
                width: 255px;
                text-align: center;
                img{
                    vertical-align: middle;
                    width: auto;
                    height: auto;
                    display: inline-block;
                }
            }
            .ptl8-txt{
                margin-left: 255px;
                .yaoqingma{
                    font-size:16px;
                    font-weight: normal;
                    .color-3166D2{
                        color: #3166D2;
                    }
                }
                .color-999999 {
                    color: #999;
                }
                .mb10{
                    margin-bottom: 10px;
                }
                .color-3166D2{
                    color: #3166D2;
                }
                h4{
                    font-weight:normal;
                }
                .grow {
                   
                    .col12-lg-7 {
                        float: left;
                        width: 58.33333%;
                        .input-style-5 {
                            height: 42px;
                            width:100%;
                            line-height: 42px;
                            border: 1px solid #eee;
                            background: #FBFBFB;
                            color: #666;
                            -webkit-appearance: none;
                            padding: 0 15px;
                            // appearance: none;
                        }
                    }
                    .col12-lg-5 {
                        float: left;
                        width: 41.66667%;
                        .btn-style-1 {
                            color: #fff;
                            background-color: #3166D2;
                            border:none;
                        }
                        .btn-h42 {
                            height: 42px;
                            line-height: 42px;
                            padding-left: 15px;
                            padding-right: 15px;
                        }
                        .btn-rounded {
                            border-radius: 4px;
                            width:100px;
                            text-align: center;
                            margin-left: 15px;
                        }
                    }
                }
               
            }
        }
        .ext-table{
            margin-bottom: 50px;
            table{
                width:100% !important;
                th{
                    text-align: center;
                }
                td{
                    text-align: center;

                }
            }
            
            .ivu-table-wrapper{
                border:none;
            }
            .ivu-table-wrapper{
                .ivu-table:after{
                    height: 0px !important;
                    width:0p;
                }
                .ivu-table:before{
                    height: 0px !important;
                }
            }
            .ivu-table td{
                border-bottom:none;
            }
            .wujilu{
                margin-top: 50px;
            }
            .tishixinxi{
                margin-bottom: 50px;
            }
        }
        
    }
</style>