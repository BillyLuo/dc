<template>
    <div class="clear">
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
                    <!-- <img :src="value.icon"/>  -->
                    <span>{{ value.text }}</span>
                </MenuItem>
            </Menu>
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
                        <Table :row-class-name='rowClassName' size='small' :data="datas" :columns="tableColumns" stripe></Table>
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
                <Table :data="datas1" :columns="tableColumns1" stripe></Table>
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
                <Table :data="datas1" :columns="tableColumns1" stripe></Table>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss">
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
    .trade-contract{
        min-height: 800px;
        background: #fff;
        float: left;
        width:1040px;
        padding-top:25px;
        .trade-time{
            padding: 20px 30px;
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
                -webkit-box-shadow: none;
                box-shadow: none;
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

    let menu = [
        {"name":"BTC",text:"BTC",icon:"/static/img/coin/icon-btc.png"},
        {"name":"ETH",text:"ETH",icon:"/static/img/coin/icon-eth1.png"},
        {"name":"ETC",text:"ETC",icon:"/static/img/coin/icon-etc.png"},
        {"name":"LTC",text:"LTC",icon:"/static/img/coin/icon-ltc.png"},
        {"name":"DOGE",text:"DOGE",icon:"/static/img/coin/icon-doge.png"},
        // {"name":"YBC",text:"YBC",icon:"/static/img/coin/icon-.png"}
    ]
    let menu1 = [
        {"name":"buy",text:"买入/卖出",icon:"/static/img/coin/icon-btc.png"},
        {"name":"weituo",text:"委托管理",icon:"/static/img/coin/icon-eth1.png"},
        {"name":"jiaoyijilu",text:"交易记录",icon:"/static/img/coin/icon-etc.png"},
        // {"name":"LTC",text:"LTC",icon:"/static/img/coin/icon-ltc.png"},
        // {"name":"DOGE",text:"DOGE",icon:"/static/img/coin/icon-doge.png"},
        // {"name":"YBC",text:"YBC",icon:"/static/img/coin/icon-.png"}
    ]
    export default {
        data() {
            return {
                menu,
                menu1,
                types:"buy",
                btcname:"BTC",
                buymoney:0,
                sellmoney:0,
                datas:[
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
                tableColumns: [
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
                datas1:[
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
                tableColumns1: [],
            }
        },
        created () {
            this.tableColumns1 = [
                    {
                        title:"总买入数("+this.btcname+")",
                        key: "buycount"
                    },
                    {
                        title:"平均买入价(CNYT)",
                        key: "buyprice"
                    },
                    {
                        title:"总卖出数("+this.btcname+")",
                        key: "sellcount"
                    },
                    {
                        title:"平均卖出价(CNYT)",
                        key: "sellprice"
                    }
                    // {
                    //     title: '交易ID',
                    //     key: 'tid'
                    // },
                    // {
                    //     title: '交易数量',
                    //     key: 'amount',
                    // },
                    // {
                    //     title: '交易价格',
                    //     key: 'price',
                    //     render: (h, params) => {
                    //         return params.row.price
                    //     }
                    // },
                    // {
                    //     title: '交易类型',
                    //     key: 'type',
                    //     render: (h, params) => {
                    //         let type={"buy":"买入"}
                    //         return type[params.row.type]
                    //     }
                    // },
                    // {
                    //     title: '成交时间',
                    //     key: 'date'
                    // }
                ]
        },
        methods: {
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
                console.log(name)
                this.btcname=name;
                // this.tssss(name);
                let key = name;
                 this.tableColumns1 = [
                    {
                        title:"总买入数("+name+")",
                        key: "buycount"
                    },
                    {
                        title:"平均买入价(CNYT)",
                        key: "buyprice"
                    },
                    {
                        title:"总卖出数("+name+")",
                        key: "sellcount"
                    },
                    {
                        title:"平均卖出价(CNYT)",
                        key: "sellprice"
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
                    // this.$ajax({
                    //     method:'get',
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
                this.datas=[
                    {
                        tid: "000",
                        amount: "12",
                        price: "3244",
                        type: "buy",
                        date: "2017-10-23"
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                        type: "buy",
                        date: "2017-10-23"
                    },
                    {
                        tid: "0000",
                        amount: "12",
                        price: "3244",
                        type: "buy",
                        date: "2017-10-23"
                    }
                ]
            },
            eth (ss) {
                console.log(ss)
                this.datas=[
                    {
                        tid: "111111",
                        amount: "12",
                        price: "3244",
                        type: "buy",
                        date: "2017-10-23"
                    },
                    {
                        tid: "11111",
                        amount: "12",
                        price: "3244",
                        type: "buy",
                        date: "2017-10-23"
                    },
                    {
                        tid: "1111111",
                        amount: "12",
                        price: "3244",
                        type: "buy",
                        date: "2017-10-23"
                    }
                ]
            }
        }
    }
</script>