<template>
    <div class="hq-list-sidebar">
        <!-- <div class="to-login">
            <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
        </div> -->
        <Tabs size="small" @on-click="getname">
            <TabPane label="USDT" name='USDT'>
                <Table height="600" @on-row-click="dbclickrow" :columns="columns1" :data="data1"></Table>
            </TabPane>
            <!-- <TabPane label="BTC" name='BTC'>
                <Table height="600" @on-row-click="dbclickrow" :columns="columns1" :data="data2"></Table>
            </TabPane>
            <TabPane label="ETH" name='ETH'>
                <Table height="600" @on-row-click="dbclickrow" :columns="columns1" :data="data3"></Table>
            </TabPane> -->
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
                    key: 'currencyname',
                    sortable: true
                },
                {
                    title: '最新价',
                    key: 'curprice',
                    sortable: true,
                    render: (h,params)=>{
                        return Number(params.row.curprice).toFixed(6)
                    }
                },
                {
                    title: '涨幅',
                    key: 'range',
                    sortable: true,
                    render: (h, params) => {
                        return h('div',
                            [
                                h('span',{class:params.row.range > 0 ?'price-text-red':'price-text'}, params.row.range+'%'),
                                h('span', {class:params.row.range > 0 ?'price-img-up':"price-img-down"})
                            ]
                        );
                    }
                }
            ],
            bizhong: 'USDT',
            data1:[
            ],
            // data2: [],
            // data3: []
        }
    },
    mounted(){
        this.datas();
    },
    methods: {
        // rowClassName(row,index){
        //     console.log(row,index)
        //     if(row.range.split('%') > 0){
        //         return 'zhang-red';
        //     }else{
        //         return 'jiang-green'
        //     }
        // },
        getname(name){
            console.log(name)
            this.bizhong = name
        },
        dbclickrow(row,index){
            console.log(row,index)
            let rowinfo = {
                row:row,
                bizhong: this.bizhong,
                currencyname: row.currencyname
            }
            this.$emit('itemrow', rowinfo)
        },
        datas (){
            let that=this;
            this.$ajax({
                method: "get",
                url: "/trade/tps/pbfcd.do",    
                reqresource:1
            }).then((data)=>{
                console.log(data);
                that.data1 = data.data.currencyDetail;
            })
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
    .ivu-table th, .ivu-table td{
        height:30px;
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
    .ivu-table-body{
        overflow-x: hidden
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
    .ivu-table-cell span {
        cursor: pointer;
    }
    .ivu-table .zhang-red{
        color:red;
    }
    .ivu-table .jiang-green{
        color:green;
    }
    .price-text{
        font-size:14px;
        display:inline-block;
        height:30px;
        line-height:30px;
        color :green;
        position: relative;
        width:50px;
    }
    .price-text-red{
        font-size:14px;
        display:inline-block;
        height:30px;
        line-height:30px;
        color:#f00;
        width:50px;
        // overflow: hidden;
        position: relative;
    }
    .price-text::after{
        content: "";
        display: inline-block;
        width:10px;
        height:15px;
        position: absolute;
        top:8px;
        right:-10px;
        background: url("/static/img/icon-arrow.png");
        background-position: 0px 15px;

    }
    .price-text-red::after{
        content: "";
        display: inline-block;
        width:10px;
        height:15px;
        position: absolute;
        top:8px;
        right:-10px;
        background: url("/static/img/icon-arrow.png");
        background-position: 0px 0px;

    }
    // .price-img-up{
    //     display: inline-block;
    //     width: 15px;
    //     height: 15px;
    //     margin-left: 10px;
    //     background: url("/static/img/icon-arrow.png");
    //     background-position: 0px 0px;
    // }
    // .price-img-down{
    //     display: inline-block;
    //     width: 15px;
    //     height: 15px;
    //     margin-left: 10px;
    //     background: url("/static/img/icon-arrow.png");
    //     background-position:0  15px;
    // }
}

</style>
