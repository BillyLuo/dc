<template>
    <div class="broker">
        <Tabs value="name1">
            <TabPane label="最近登录历史" name="name1">
                <div class="ext-table">
                    <Table :data="data1" :class="'no-border-table dark-mode'" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有登录历史</span>" :columns="columns1" stripe></Table>
                    <div class="pager">
                        <div class="pager-inner">
                            <Page :total="recordPageTotal"
                                show-total
                                @on-change="recordPageChange"
                            />
                        </div>
                    </div>
                </div>
            </TabPane>
            <!-- <TabPane label="安全设置历史" name="name2">
                <div class="ext-table">
                    <Table :data="data2" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有安全设置历史</span>" :columns="columns2" stripe></Table>
                </div>
            </TabPane> -->
        </Tabs>
    </div>
</template>

<script>
import {Tabs,TabPane, Page } from "iview";
import { Message } from '../../utils/message';
    export default {
        name: 'broker',
        components: {
            TabPane,
            Tabs,
            Page
        },
        data () {
            return {
                recordPageTotal:0,
                recordPageNo:1,
                recordPageSize:10,
                data1:[],
                data2:[],
                columns1: [
                    {
                        title: "登录时间",
                        key: "logintime",
                    },
                    {
                        title: '登录IP',
                        key: 'loginip'
                    }
                
                ],
                columns2: [
                   
                    {
                        title: '登录时间',
                        key: 'logintime'
                    },
                    {
                        title: '最近安全设置',
                        key: 'latestsetting'
                    },
                    {
                        title: '登录IP',
                        key: 'loginip'
                    }
                
                ]
            }
        },
        mounted(){
            this.loginjslu()
        },
        methods:{
            loginjslu (){
                let pageno = this.recordPageNo;
                let pagesize = this.recordPageSize;
                let that =this;
                this.$ajax({
                    method:"POST",
                    url:"/trade/tps/pblrs.do",
                    data:{
                        reqresource:1,
                        pageno,
                        pagesize
                    }
                }).then((res)=>{
                    if (res.data && res.data.err_code == '1') {
                        console.log('登录记录',res.data.loginRecord)
                        if(res.data && res.data.loginRecord){
                            that.data1 = res.data.loginRecord;
                        }
                        if (res.data && res.data.page) {
                            that.recordPageTotal = res.data.page.sum * 1;
                        }else if (!that.recordPageTotal) {
                            that.recordPageTotal = res.data.loginRecord.length;
                        }
                    }else if (res.data && res.data.err_code == '2' && res.data.msg) {
                        Message.warn('登录记录获取失败，请稍后重试');
                    }
                }).catch((err) => {
                    console.warn('请求登录err,',err);
                    Message.warn('登录记录获取失败，请稍后重试');
                })
            },
            recordPageChange(value) {
                this.recordPageNo = value;
                this.loginjslu();
            }
        }
    }
</script>

<style lang="scss">
    .broker{
        margin-top: 30px;
        .ivu-tabs {
            background: #353535;
        }
        .ivu-tabs-bar {
            border: 0;
            box-shadow: 1px 2px 4px 0px #111;
            margin-bottom: 3px;
        }
        .ivu-tabs-tab-active {
            color: #fff;
            font-weight: 500;
            font-size: 16px;
        }
        min-height:400px;
       .ivu-tabs-nav-scroll{
            height:60px;
            background: #2a2a2a;
            .ivu-tabs-nav .ivu-tabs-tab{
                padding:20px 16px;
                color: #fff;
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