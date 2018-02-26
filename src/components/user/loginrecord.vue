<template>
    <div class="broker">
        <Tabs value="name1">
            <TabPane label="最近登陆历史" name="name1">
                <div class="ext-table">
                    <Table :data="data1" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有推广记录</span>" :columns="columns1" stripe></Table>
                </div>
            </TabPane>
            <TabPane label="安全设置历史" name="name2">
                <div class="ext-table">
                    <Table :data="data2" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有收益明细</span>" :columns="columns2" stripe></Table>
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
                data1:[
                    {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },
                     {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },
                     {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },
                     {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },
                     {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },
                     {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },
                     {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },
                     {
                        time:'sdfa',
                        ip:'123.1.21.1'
                    },

                ],
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
                        title: "登陆时间",
                        key: "time",
                    },
                    {
                        title: '登录IP',
                        key: 'ip'
                    }
                
                ],
                columns2: [
                   
                    {
                        title: '登陆时间',
                        key: 'type'
                    },
                    {
                        title: '最近安全设置',
                        key: 'count'
                    },
                    {
                        title: '登录IP',
                        key: 'ip'
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