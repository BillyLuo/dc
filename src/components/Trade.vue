<template>
    <div class="clear trade wrapper">
        <div class="tradelists">
             <Menu @on-select="info" mode="horizontal" class="trade-menu" active-name="BTC" >
                <MenuItem v-for="value in menu" :name="value.name" :key="value.name">
                     
                    <span><img :src="value.icon"/>{{ value.text }}</span>
                </MenuItem>
            </Menu>
        </div>
        <div class="tradelist">
            <Menu @on-select="infos" class="trade-menu" active-name="buy" >
                <MenuItem v-for="value in menu1" :name="value.name" :key="value.name">
                    <span>{{ value.text }}</span>
                </MenuItem>
            </Menu>
        </div>
        <div class="context-title" v-if="types =='buy'">
            <Row>
                <Col span="14">
                    <div class="title-text">
                        <img src="static/img/icon-safe.png"/>在您进行开始交易之前，您需要完成<a @click="safe()">安全设置</a>
                    </div>
                </Col>
                <Col span="10">
                    <div class="jiantou btn-style-1 btn-special-1">01.安全设置</div>
                    <div class="jiantou btn-style-2 btn-special-1">02.充值</div>
                    <div class="jiantou btn-style-3 btn-special-1">03.下单交易</div>
                </Col>
            </Row>
        </div>
        
        <div class="trade-contract" v-if="types =='buy' ">
            <Row>
                <Col span='8'>
                    <div class="trade-buy buy-sell">
                        <div class='buy-title'>
                            <span class="text-buy">买入</span>CNY/<span>{{btcname}}</span>
                        </div>
                        <div class="money">
                            <p class="buy-money">可用：<span>0.00000000</span> CNY</p>
                            <p class="buy-money">冻结：<span>0.00000000</span> CNY</p>
                        </div>
                        <div class="trade-button">
                            <span>委托类型</span>
                            <Button>限单价</Button>
                        </div>
                        <div class="trade-input">
                            <Input number>
                                <span slot="prepend">买入价 ¥</span>
                            </Input>
                            <Input number>
                                <span slot="prepend">买入量 {{btcname}}</span>
                            </Input>
                            <p>
                                ≈ ￥ <span>{{buymoney}}</span>
                            </p>
                            <!-- <Slider v-model="value" :max="1000" @on-change="ss"></Slider> -->
                            <Slider></Slider>
                            <Button class="buy-button buy-button1">
                                买入 {{btcname}}
                            </Button>
                            <Button class="buy-button" style="margin-bottom:30px;">
                                立即充值
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col span='8'>
                    <div class="trade-sell buy-sell">
                        <div class='sell-title'>
                            <span  class="text-buy">买入</span>CNY/<span>{{btcname}}</span>
                        </div>
                        <div class="money">
                            <p class="buy-money">可用：<span>0.00000000</span> CNY</p>
                            <p class="buy-money">冻结：<span>0.00000000</span> CNY</p>
                        </div>
                        <div class="trade-button">
                            <span>委托类型</span>
                            <Button>限单价</Button>
                        </div>
                        <div class="trade-input">
                            <Input number>
                                <span slot="prepend">买入价 ¥</span>
                            </Input>
                            <Input number>
                                <span slot="prepend">买入量 {{btcname}}</span>
                            </Input>
                            <p>
                                ≈ ￥ <span>{{buymoney}}</span>
                            </p>
                            <Slider ></Slider>
                            <Button class="buy-button buy-button1">
                                买入 {{btcname}}
                            </Button>
                            <Button class="buy-button" style="margin-bottom:30px;">
                                立即充值
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col span='8'>
                    <div class="trade-record buy-sell">
                        <p class="table-title">最新成交价格</p>
                        <Table :row-class-name='rowClassName' size='small' :data="price_datas" :columns="price_columns" stripe></Table>
                        <p class="table-title" style="margin-top:20px;">最新成交记录</p>
                        <Table style="margin-bottom:20px;" :row-class-name='rowClassName' size='small' :data="record_data" :columns="record_columns" stripe></Table>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="trade-contract" v-else-if="types === 'weituo'">
            <div class="trade-time">
                <span>起始时间：</span>
                <DatePicker :editable="false" type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
                <span style="margin: 0 20px;"> ~ </span>
                <DatePicker :editable="false" type="date" placeholder="请选择结束时间" style="width: 200px;margin-right:30px;"></DatePicker>
                <Button>刷新统计</Button>
            </div>
            <div class="trade-table">
                <Table :data="weituo_data" :columns="weituo_columns" stripe></Table>
                <Table :data="order_record_data" no-data-text="<img class='wujilu' src='static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
            </div>
        </div>
        <div class="trade-contract" v-else-if="types === 'jiaoyijilu'">
            <div class="trade-time">
                <span>起始时间：</span>
                <DatePicker :editable="false" type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
                <span style="margin: 0 20px;"> ~ </span>
                <DatePicker :editable="false" type="date" placeholder="请选择结束时间" style="width: 200px;margin-right:30px;"></DatePicker>
                <Button>刷新统计</Button>
            </div>
            <div class="trade-table">
                <Table :data="weituo_data" :columns="weituo_columns" stripe></Table>
                <Table :data="order_record_data" no-data-text="<img class='wujilu' src='static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<style lang="scss">
    .trade{
        width:1200px;
        margin: 0 auto;
        padding-top:50px;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance:textfield;}
    .tradelists{
        width:100%;
        margin-bottom: 20px;
        .trade-menu{
            width:100% !important;
            img{
                display: inline;
                width:20px;
                margin: 15px 10px 0 0;
                margin-bottom: -5px;
            }
            .ivu-menu-item{
                padding:20xp 0px;
            }
            
        }
        .ivu-menu{
                z-index: 0;
            }
    }
    .tradelist{
        width:140px;
        margin-right: 20px;
        float: left;
        .trade-menu{
            width:100% !important;
            img{
                width:20px;
                position: absolute;
            }
            .ivu-menu-item-active.ivu-menu-item-selected{
                background:#ebeff5;
            }
        }
    }
    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
        padding:20px 24px;
    }
    .context-title{
        height: 55px;
        background: #fff;
        
        float: left;
        width: 1040px;
        margin-bottom: 30px;
        padding: 0 20px;
        .title-text{
            font-size:10px;
            line-height: 55px;
            img{
                vertical-align:middle;
                margin-right: 20px;
            }
        }
        .jiantou{
            margin-top: 11px;
            line-height: 32px;
            width:105px;
            height:32px;
            text-align: center;
            position: relative;
            float: left;
        }
        .btn-style-1{
            background: #80A4ED;
            color: #fff;
        }
        .btn-style-2{
            background: #C0D0F0;
            color: #fff;
        }
        .btn-special-1{
            overflow: visible;
            margin-right: 10px;
            margin-left: 10px;
        }
        .btn-special-1:after, .btn-special-1:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            -webkit-transition: all .6s linear;
            -moz-transition: all .6s linear;
            -ms-transition: all .6s linear;
            transition: all .6s linear;
        }
        .btn-special-1:after, .btn-special-1:before {
            border-left: 20px solid transparent;
            border-top: 16px solid transparent;
            border-bottom: 16px solid transparent;
        }
        .btn-style-1.btn-special-1:before {
            border-bottom-color: #80A4ED;
            border-top-color: #80A4ED;
        }
        .btn-special-1:before {
            right: 100%;
        }
        .btn-special-1:after {
            border-left-color: #80A4ED;
        }
        .btn-special-1:after {
            left: 100%;
        }
        .btn-style-2.btn-special-1:before {
            border-bottom-color: #C0D0F0;
            border-top-color: #C0D0F0;
        }
        .btn-style-2.btn-special-1:after {
            border-left-color: #C0D0F0;
        }
        .btn-style-3 {
            color: #a0b3da;
            background-color: #EAF0FC;
        }
        .btn-style-3.btn-special-1:before {
            border-bottom-color: #EAF0FC;
            border-top-color: #EAF0FC;
        }
        .btn-style-3.btn-special-1:after {
            border-left-color: #EAF0FC;
        }
    }
    .trade-contract{
        min-height: 600px;
        background: #fff;
        float: left;
        width:1040px;
        padding-top:25px;
        .trade-time{
            padding: 0px 30px;
            button{
                background:#2d8cf0;
                border:none;
                color:#fff;
            }
        }
        .trade-table{
            margin-top: 20px;
            table{
                width:100% !important;
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
        .trade-buy{
            border-right: 1px solid #ccc;
            .ivu-btn{
                padding:10px 20px;
                color: #57a3f3;
                background-color: #fff;
                border-color: #57a3f3;
                margin-left:20px;
            }
            .ivu-input:focus{
                color:#57a3f3;
                border-color: #57a3f3;
                -webkit-box-shadow: none;
                box-shadow: none;
            }
            .ivu-input:hover {
                border-color: #57a3f3;
            }
            .trade-button{
                button{
                    position: relative;
                }
                button:after{
                    content: "";
                    z-index: 2;
                    display: block;
                    width: 20px;
                    background: url(/static/img/coin/icon-check.png) no-repeat 7px -4px;
                    height: 20px;
                    position: absolute;
                    right: 0;
                }
                button:before{
                    content:"";
                    z-index:1;
                    border-radius: 0;
                    display: block;
                    left: 100%;
                    margin-left: -20px;
                    top: 100%;
                    margin-top: -20px;
                    width: 20px;
                    height: 20px;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    border-top: 10px solid transparent;
                    border-left: 10px solid transparent;
                    border-right-color: #57a3f3;
                    border-bottom-color: #57a3f3;
                    opacity: 1;
                }
                
                
            }
            .buy-button{
                width: 100%;
                margin: 10px 0px 10px 0px;
                color:#fff;
                background: #57a3f3;
                border:none;
            }
            .buy-button1{
                background: #49DD5E;
                border:none;
            }
        

        }
        .trade-sell{
            .ivu-btn{
                padding:10px 20px;
                color: #f5322d;
                background-color: #fff;
                border-color: #f5322d;
                margin-left:20px;
            }
            .ivu-input:focus{
                color:#f5322d;
                border-color: #f5322d;
                -webkit-box-shadow: none;
                box-shadow: none;
            }
            .ivu-input:hover {
                border-color: #f5322d;
            }
            .trade-button{
                button{
                    position: relative;
                }
                button:after{
                    content: "";
                    z-index: 2;
                    display: block;
                    width: 20px;
                    background: url("/static/img/coin/icon-check.png") no-repeat 7px -4px;
                    height: 20px;
                    position: absolute;
                    right: 0;
                }
                button:before{
                    border-radius: 0;
                    display: block;
                    left: 100%;
                    margin-left: -20px;
                    top: 100%;
                    margin-top: -20px;
                    width: 20px;
                    height: 20px;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    border-top: 10px solid transparent;
                    border-left: 10px solid transparent;
                    border-right-color: #f5322d;
                    border-bottom-color: #f5322d;
                    opacity: 1;
                }
                
            }
            .buy-button{
                width: 100%;
                margin: 10px 0px 10px 0px;
                color:#fff;
                background: #57a3f3;
                border:none;
            }
            .buy-button1{
                background: #f5322d;
                border:none;
            }
            .ivu-slider-bar{
                background: #f5322d;
            }
            .ivu-slider-button{
                border-color: #f5322d;
            }
        }
        .buy-sell{
            padding: 0px 15px;
            .buy-title{
                line-height: 30px;
                border-left: 3px solid #2d8cf0;
                margin-bottom: 10px;
                padding-left: 10px;
                color: #666;
                .text-buy{
                    color:#2d8cf0;
                }
            }
            .sell-title{
                line-height: 30px;
                border-left: 3px solid #f5322d;
                margin-bottom: 10px;
                padding-left: 10px;
                color: #666;
                .text-buy{
                    color:#f5322d;
                }
            }
            .money{
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom:1px solid #ccc;
                .buy-money{
                    color:#666;
                }
            }
            .trade-button{
                margin-bottom: 20px;
                padding:10px 20px;
            }
            .ivu-input-group-prepend{
                background: none;
                position: absolute;
                z-index: 3;
                border:none;
                line-height: 50px;
                width:120px;
                text-align: center;
                padding:0;
            }
            .ivu-input{
                margin-bottom: 10px;
                height:50px;
                font-size: 16px;
                padding-left: 121px;
                background: #F5F4F4;
                border-radius: 0;

            }
        }
        .trade-record{
            .table-row-color-5{
                color: #2d8cf0;
            }
            .table-row-color-5:hover td{
                background: #2d8cf0 !important;
                color:#fff;
            }
            .table-row-color-10{
                color:#f5322d;
            }
            .table-row-color-10:hover td{
                background: #f5322d !important;
                color:#fff;
            }
            .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
                background:none;
            }
            .table-title{
                line-height: 40px;
                background: #f8f8f9;
                border: 1px solid #dddee1;
                border-bottom: none;
                padding-left: 18px;
            }
        }
        
        
        
    }
    
   
</style>
<script>
    import { Menu,MenuItem,DatePicker,Table,Slider } from 'iview';
    let menu = [
        {"name":"BTC",text:"BTC",icon:"/static/img/coin/icon-btc.png"},
        {"name":"ETH",text:"ETH",icon:"/static/img/coin/icon-eth1.png"},
        {"name":"ETC",text:"ETC",icon:"/static/img/coin/icon-etc.png"},
        {"name":"LTC",text:"LTC",icon:"/static/img/coin/icon-ltc.png"},
        {"name":"DOGE",text:"DOGE",icon:"/static/img/coin/icon-doge.png"},
        // {"name":"YBC",text:"YBC",icon:"/static/img/coin/icon-.png"}
    ]
    let menu1 = [
        {"name":"buy",text:"买入/卖出"},
        {"name":"weituo",text:"委托管理"},
        {"name":"jiaoyijilu",text:"交易记录"},
    ]
    export default {
        components:{
            DatePicker,Table,
            Menu,MenuItem,Slider
        },
        props: ['lang'],
        data() {
            return {
                menu,
                menu1,
                value: 1000,
                types:"buy",
                btcname:"BTC",
                buymoney:0,
                sellmoney:0,
                // 最新成交价格
                price_datas:[
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                    }
                ],
                price_columns: [
                    {
                        title: '交易ID',
                        key: 'tid'
                    },
                    {
                        title: '交易数量',
                        key: 'amount',
                    },
                    {
                        title: '交易价格',
                        key: 'price',
                        render: (h, params) => {
                            return params.row.price
                        }
                    }
                ],
                // 委托
                weituo_data:[
                    {
                        buycount: "12",
                        buyprice: "2134",
                        sellcount: "21",
                        sellprice: "3000"
                    },
                    {
                        buycount: "12",
                        buyprice: "2134",
                        sellcount: "21",
                        sellprice: "3000"
                    },
                    {
                        buycount: "12",
                        buyprice: "2134",
                        sellcount: "21",
                        sellprice: "3000"
                    }
                    // {
                    //     tid: "0000",
                    //     amount: "12",
                    //     price: "3244",
                    //     type: "buy",
                    //     date: "2017-10-23"
                    // },
                    // {
                    //     tid: "0000",
                    //     amount: "12",
                    //     price: "3244",
                    //     type: "buy",
                    //     date: "2017-10-23"
                    // },
                    // {
                    //     tid: "0000",
                    //     amount: "12",
                    //     price: "3244",
                    //     type: "buy",
                    //     date: "2017-10-23"
                    // }
                ],
                weituo_columns: [],
                // 最新交易记录
                record_columns:[
                    {
                        title: "时间",
                        key: 'time'
                    },
                    {
                        title: '价格(¥)',
                        key: 'price',
                    },
                    {
                        title: '数量',
                        key: 'number'
                    }
                ],
                record_data: [
                    {
                        time: '09:48:44',
                        price: "6804",
                        number: "3.08"
                    },
                    {
                        time: '09:34:13',
                        price: "6804",
                        number: "0.334"
                    },
                    {
                        time: '09:58:25',
                        price: "6804",
                        number: "2.000"
                    },
                    {
                        time: '09:18:53',
                        price: "6804",
                        number: "3.08"
                    },
                    {
                        time: '09:08:44',
                        price: "6804",
                        number: "3.08"
                    }
                ],
                // 委托时间	类型	数量	价格	金额	成交量	成交金额	手续费	平均成交价	状态/操作
                order_record_data: [],
                order_record_cloumns: [
                    {
                        title: "委托时间",
                        key: "weituotime",
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '数量',
                        key: 'count'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '金额',
                        key: 'money'
                    },
                    {
                        title: '成交量',
                        key: 'volume'
                    },
                    {
                        title: '成交金额',
                        key: 'amount'
                    },
                    {
                        title: '手续费',
                        key: 'poundage'
                    },
                    {
                        title: '平均成交价',
                        key: 'averageprice'
                    },
                    {
                        title: '状态/操作',
                        key: 'status'
                    }
                ]

            }
        },
        created () {
            this.weituo_columns = [
                    {
                        title:"总买入数("+this.btcname+")",
                        key: "buycount",
                        render (h,row){
                            return Number(row.row.buycount).toFixed(4);
                        }
                    },
                    {
                        title:"平均买入价(CNYT)",
                        key: "buyprice",
                        render (h,row){
                            return Number(row.row.buyprice).toFixed(4);
                        }
                    },
                    {
                        title:"总卖出数("+this.btcname+")",
                        key: "sellcount",
                        render (h,row){
                            return Number(row.row.sellcount).toFixed(4);
                        }
                    },
                    {
                        title:"平均卖出价(CNYT)",
                        key: "sellprice",
                        render (h,row){
                            return Number(row.row.sellprice).toFixed(4);
                        }
                    }
                ]
        },
        methods: {
            ss(value){
                console.log(value)
            },
            safe () {
                this.$router.push("user");
            },
            rowClassName (row, index) {
                if (index <5) {
                    return 'table-row-color-5';
                } else if (index >=5 ) {
                    return 'table-row-color-10';
                }
                return '';
            },
            infos (name) {
                this.types = name; 
            },
            info (name) {
                this.btcname=name;
                // this.tssss(name);
                let key = name;
                 this.weituo_columns = [
                    {
                        title:"总买入数("+this.btcname+")",
                        key: "buycount",
                        render (h,row){
                            return Number(row.row.buycount).toFixed(4);
                        }
                    },
                    {
                        title:"平均买入价(CNYT)",
                        key: "buyprice",
                        render (h,row){
                            return Number(row.row.buyprice).toFixed(4);
                        }
                    },
                    {
                        title:"总卖出数("+this.btcname+")",
                        key: "sellcount",
                        render (h,row){
                            return Number(row.row.sellcount).toFixed(4);
                        }
                    },
                    {
                        title:"平均卖出价(CNYT)",
                        key: "sellprice",
                        render (h,row){
                            return Number(row.row.sellprice).toFixed(4);
                        }
                    }
                ]
                switch (key) {
                    case "BTC":
                            this.btc("00")
                        break;
                    case "ETH":
                            this.eth("11")
                        break;
                
                    default:
                        break;
                }
                // wx18012316331879480877
                // this.$ajax({
                //     method: 'get',
                //     url: '/okcoin/kline.do?symbol=eth_cny&type=1min',
                //     // proxy: {
                //     //     host: 'localhost',
                //     //     port: ""
                //     // }
                // })
                // .then(function(response){
                //     console.log(response)
                // })
                // this.$ajax.get('/okcoin/ticker.do?symbol=btc_cny').catch(function(thrown) {
                //     // if (axios.isCancel(thrown)) {
                //         console.log('Request canceled', thrown);
                //     // } else {
                //         // handle error
                //     // }
                // });
                    // this.$ajax({
                    //     method:'get',okcoin
                    //     url:'https://api.btctrade.com/api/trades',
                    //     params:{
                    //         coin:"btc",
                    //         since:100
                    //     },
                    //     headers:{
                    //         'Access-Control-Allow-Origin':"*"
                    //     }
                    // })
                    // .then(function(response) {
                    //     console.log(response)
                    // });
                // get: function(url, fn) {
                        // var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
                        // obj.open('GET', "http://api.chbtc.com/data/v1/ticker?currency=eth_cny", true);
                        // obj.onreadystatechange = function() {
                        //     if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
                        //         // fn.call(this, obj.responseText);  //从服务器获得数据
                        //         console.log(obj.responseText)
                        //     }
                        // };
                        // console.log(obj)
                        // obj.send();
                    // },
                // this.$ajax.get('/okcoinss/trades.do?symbol=btc_usd')
                //         .then(function (response) {
                //             console.log(response);
                //         })
                //         .catch(function (error) {
                //             console.log(error);
                //         });
                
            },
            btc (ss) {
                console.log(ss)
            },
            eth (ss) {
                console.log(ss)
            }
        }
    }
</script>