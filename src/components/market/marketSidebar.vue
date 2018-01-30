<template>
    <div class="hq-list-sidebar">
        <div class="to-login">
            <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
        </div>
        <Tabs size="small">
            <TabPane label="标签一">
                <Table height="400" @on-row-dblclick="dbclickrow" :columns="columns1" :data="data1"></Table>
            </TabPane>  
            <TabPane label="标签二">
                
            </TabPane>
            <TabPane label="标签三">
                
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import {Tabs,TabPane,Table} from 'iview';
export default {
    name: 'marketSidebar',
    components:{
        Tabs,TabPane,Table
    },
    data: function() {	
        return {
            columns1:[
                {
                    title: '币种',
                    key: 'bizhong',
                    sortable: true
                },
                {
                    title: '最新价',
                    key: 'keyprice',
                    sortable: true
                },
                {
                    title: '涨幅',
                    key: 'zhangfu',
                    sortable: true
                }
            ],
            data1:[
                {
                    bizhong: 'ETHUSDT',
                    keyprice: '2993',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '299452',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '299333',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '2993',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '299452',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '299333',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '2993',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '299452',
                    zhangfu: '0.43'
                },
                {
                    bizhong: 'BTC',
                    keyprice: '299333',
                    zhangfu: '0.43'
                }
            ]
        }
    },
    methods: {
        dbclickrow(row,index){
            console.log(row,index)
            this.$emit('itemrow', row)
        }
    }
}
</script>

<style lang="scss">
.hq-list-sidebar{
    .to-login{
        padding: 10px 20px;
        a{
            color: #7A98F7;
        }
    }
    .ivu-tabs {
        color:#C7CCE6;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #7A98F7;
    }
    .ivu-tabs-ink-bar {
        background-color: #7A98F7;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
        font-size: 14px;
        font-weight: 600;
    }
    .ivu-tabs-bar {
        border-bottom: none;
        margin-bottom: 0px;
    }
    .ivu-tabs-nav .ivu-tabs-tab:hover {
        color: #7A98F7;
    }
    .ivu-tabs-tabpane{
        background: #181B2A;
    }
    .ivu-table{
        background:none;
        color:#C7CCE6;
    }
    .ivu-table-wrapper{
        border:none;
    }
    .ivu-table td,.ivu-table th{
        background:none;
        border-bottom-color: #1F2943;
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
}
    
</style>