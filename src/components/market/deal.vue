<template>
    <div class="hq-deal">
        <Row>
            <Col span="16" class="deal-buysell">
                <Row>
                    <Tabs size="small">
                        <TabPane label="限价交易" class="jiaoyi">
                            <Col span='12' style="padding:0 10px;">
                                <div class="currency-balance">可用 {{usdtBalance}} USDT <span @click="recharge('USDT')">充币</span></div>
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div style="padding:20px 0px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <div style="position:relative;">
                                                <InputNumber v-model="buyprice" @on-change="inputNumber('buy')" :min='0' class="input-number"></InputNumber>
                                                <span class='span'>{{ params.bizhong }}</span>
                                            </div>
                                           
                                            <p>≈ <i> 0.0000 </i> CNY</p>
                                        </FormItem> 
                                        <FormItem label="买入量" class="deal-input">
                                            
                                            <div style="position:relative;">
                                                <InputNumber v-model="buycount" @on-change="inputNumber('buy')" :min='0' class="input-number"></InputNumber>
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                        </FormItem>
                                        <p class="count-money">交易额 <i>{{buymoney}}</i> <span>USDT</span></p>
                                        <Button class="mairu" @click="trade(1)">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div class="currency-balance">可用 {{changeCurrenyBalance}} {{changeCurreny}} <span @click="recharge(changeCurreny)">充币</span></div>
                                <div style="padding:20px 10px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="卖出价" class="deal-input">
                                            <div style="position:relative;">
                                                <InputNumber v-model="sellprice" @on-change="inputNumber('sell')" :min='0' class="input-number"></InputNumber>
                                                <span class='span'>{{ params.bizhong }}</span>
                                            </div>
                                           
                                            <p>≈ <i> 0.0000 </i> CNY</p>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <div style="position:relative;">
                                                <InputNumber v-model="sellcount" @on-change="inputNumber('sell')" :min='0' class="input-number"></InputNumber>
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                        </FormItem>
                                        <p class="count-money">交易额 <i>{{ sellmoney }}</i> <span>USDT</span></p>
                                        <Button class="mairu" @click="trade(2)">卖出{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                        </TabPane>
                        <TabPane label="市价交易" class='jiaoyi'>
                            <Col span='12' style="padding:0 10px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div class="currency-balance">可用 {{usdtBalance}} USDT <span @click="recharge('USDT')">充币</span></div>
                                <div style="padding:20px 0px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格买入" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="买入量" class="deal-input">
                                            <div style="position:relative;">
                                                <InputNumber v-model="buycount1" :min='0' class="input-number"></InputNumber>
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                        </FormItem>
                                        <Button class="mairu">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div class="currency-balance">可用 {{changeCurrenyBalance}} {{changeCurreny}} <span @click="recharge(changeCurreny)">充币</span></div>
                                <div style="padding:20px 10px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem  label="卖出价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格卖出" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <div style="position:relative;">
                                                <InputNumber v-model="sellcount1" :min='0' class="input-number"></InputNumber>
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                            
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
                    <div class="list-table recent-price">
                        <Table  @on-row-click="dblclick" :columns="columns1" :data="data1"></Table>
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
            buyprice:0,
            buycount:0,
            sellprice:0,
            sellcount:0,
            buycount1:0,
            sellcount1:0,
            buymoney:'0.0000',
            sellmoney:'0.0000',
            //usdt  数量
            usdtCurrency:'USDT',
            usdtBalance:'0',
            // 选择交易的币种的数量
            changeCurreny:'BTC',
            changeCurrenyBalance:'0',
            columns1:[
                {
                    title: ' ',
                    key: 'id',
                    width:"80px",
                    render: (h, params) => {
                        if(params.row.operate == "1"){
                            return h('span',{
                                style: {
                                        color: 'green',
                                        textAlign: 'center',
                                        display: 'inline-block',
                                        width: '100%'
                                    },
                            },'买入')

                           
                        }
                        if(params.row.operate == "2"){
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
                    key: 'price',
                    render: (h,params)=>{
                        if(params.row.price){
                            return  h("span",Number(params.row.price).toFixed(6))
                        }else{
                            return  h("span",Number(0).toFixed(6))
                        }
                        
                    }
                },
                {
                    title: '数量',
                    key: 'count',
                    render: (h,params)=>{
                        if(params.row.count){
                            return  h("span",Number(params.row.count).toFixed(6))
                        }else{
                            return  h("span",Number(0).toFixed(6))
                        }
                        
                    }
                },
                {
                    title: '累计',
                    key: 'totalcount',
                    render: (h,params)=>{
                        if(params.row.totalcount){
                            return  h("span",Number(params.row.totalcount).toFixed(6))
                        }else{ 
                            return  h("span",Number(0).toFixed(6))
                        }
                        
                    }
                }
            ],
            data1:[
               
            ]
        }
    },
    mounted () {
        var that = this;
        this.getBalance();
        this.getBalance('BTC');
        this.paramsinfo();
        // 获取某种币的数量
    },
    watch:{
        params: "paramsinfo"
    },
    methods: {
        //充币
        recharge (currency) {
            if (!currency) {
                return;
            }
            this.$router.push({
                path:'/assets',
                query:{
                    currency
                }
            })
        },
        inputNumber(val){
            if(val == "buy"){
                if(this.buyprice > 0 && this.buycount > 0){
                    this.buymoney = Number(this.buycount*this.buyprice).toFixed(6);
                }
            }
            if(val == "sell"){
                if(this.sellprice > 0 && this.sellcount > 0){
                    this.sellmoney = Number(this.sellcount*this.sellprice).toFixed(6);
                }
            }
            
        },
        dblclick (row,index) {
            if(row.operate == "1"){
                this.buycount =  Number(row.count);
                this.buyprice =  Number(row.price);
                this.buymoney = Number(this.buycount*this.buyprice).toFixed(6);
            }else{
                this.sellcount =  Number(row.count);
                this.sellprice =  Number(row.price);
                this.sellmoney = Number(this.sellcount*this.sellprice).toFixed(6);
            }
        },
        paramsinfo (obj) {
            console.log(obj,'currency')
            if (obj && obj.currency) {
                this.changeCurreny = obj.currency;
                this.getBalance('USDT');
                this.getBalance(obj.currency);
            }
            let that =this;
            this.data1 = [];
            this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbles.do",
                    data: {
                        count : 5,//查询条数
                        coin : obj ? obj.currency :'ETH',//币种
                        tradecoin: 'USDT',//交易币种
                        reqresource:1
                    }
                }).then((data)=>{
                    console.log(data.data.latestEntrust)
                    let  latestDeal=data.data.latestEntrust;
                    function compare(property){
                        return function(obj1,obj2){
                            var value1 = obj1[property];
                            var value2 = obj2[property];
                            return value1 - value2;     // 升序
                        }
                    }
                    var sortObj = latestDeal.sort(compare("tradetype"));
                    // 最新成交价格
                    that.data1 = sortObj;
                    
                })
        },
        getBalance(type) {
            var that = this;
            if (!type) {
                type = 'USDT';
            }
            this.$ajax.post('/trade/tps/pblaf.do',{
                reqresource:1,
                currencytype:type
            }).then((res) => {
                console.log('------res-getbalance----',res,res.data);
                if (res.status == 200 && res.data && res.data.err_code == '1') {
                    if (res.data && res.data.accountFund &&  res.data.accountFund.length) {
                        if (type == 'USDT') {
                            that.usdtBalance = res.data.accountFund[0].usablefund;
                        }else {
                            that.changeCurrenyBalance = res.data.accountFund[0].usablefund;
                        }
                    }else {
                       if (type == 'USDT') {
                            that.usdtBalance = '0';
                        }else {
                            that.changeCurrenyBalance = '0';
                        } 
                    }
                }
            })
        },
        //交易  type：1 买入    type：2   卖出
        trade(type) {
            var that = this;
            var operate = type;       //1 买入   2  卖出
            var entrusttype = 1;      //1.限价交易   2.市价交易
            var entrustcoin = '';     //委托币种
            var tradecoin = '';       //交易币种
            var entrustnum = '';      //委托数量
            var entrustprice = '';    //委托价格
            var reqresource = 1;      //请求来源，1：PC，2：APP
            if (type == 1) {
                tradecoin = 'USDT';
                entrustcoin = this.changeCurreny;
                entrustnum = this.buycount;
                entrustprice = this.buyprice;
                if (entrustnum <= 0) {
                    this.$Notice.warning({
                        title:'提示',
                        desc:'请输入委托数量'
                    })
                    return false;
                }
                if (entrustprice <= 0) {
                    this.$Notice.warning({
                        title:'提示',
                        desc:'请输入委托价格'
                    })
                    return false;
                }
                this.$ajax.post('/trade/tps/pbces.do',{
                    entrusttype,
                    entrustcoin,
                    tradecoin,
                    entrustnum,
                    entrustprice,
                    reqresource,
                    operate
                }).then((res) => {
                    console.log('发送请求成功',res);
                    if (res.status == 200 && res.data.err_code == '1') {
                        console.log('创建委托成功');
                        that.$Notice.success({
                            title:'提示',
                            desc:'委托创建成功'
                        })
                    }else {
                        that.$Notice.warning({
                            title:'提示',
                            desc:'委托创建失败，请稍后重试'
                        })
                    }
                }).catch((err) => {
                    console.log(err,'创建委托失败');
                    that.$Notice.warning({
                        title:'提示',
                        desc:'委托创建失败，请稍后重试'
                    })
                })
            }else if (type == 2) {
                tradecoin = this.usdtCurrency;
                entrustcoin = this.changeCurreny;
                entrustnum = this.sellcount;
                entrustprice = this.sellprice;
                if (entrustnum <= 0) {
                    this.$Notice.warning({
                        title:'提示',
                        desc:'请输入委托数量'
                    })
                    return false;
                }
                if (entrustprice <= 0) {
                    this.$Notice.warning({
                        title:'提示',
                        desc:'请输入委托价格'
                    })
                    return false;
                }
                this.$ajax.post('/trade/tps/pbces.do',{
                    entrusttype,
                    entrustcoin,
                    tradecoin,
                    entrustnum,
                    entrustprice,
                    reqresource,
                    operate
                }).then((res) => {
                    console.log('---res,发送请求成功',res);
                    if (res.status == 200 && res.data.err_code == '1') {
                        console.log('创建委托成功');
                        that.$Notice.success({
                            title:'提示',
                            desc:'委托创建成功'
                        })
                    }else {
                        that.$Notice.warning({
                            title:'提示',
                            desc:'委托创建失败，请稍后重试'
                        })
                    }
                }).catch((err) => {
                    console.log('err',err);
                    that.$Notice.warning({
                        title:'提示',
                        desc:'委托创建失败，请稍后重试'
                    })
                })
            }
        },
        doTrade(obj) {
            console.log('交易',obj);
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
        .ivu-input-number-handler-wrap{
            display: none;
        }
        .ivu-input-number-input-wrap{
            height:40px;
        }
        .input-number{
            width:100%;
            height:40px;
            line-height:40px;
            border-radius: 0;
            background: #f5f4f4;
            position: relative;
            border:none;
            .ivu-input-number-input{
                height:50px;
                line-height: 50px;
                background: #f5f4f4;
                font-size: 14px;
            }
        }
        // .span{
        //     position: absolute;
        //     top:0;
        //     left:0;
        //     z-index: 3;
        //     line-height: 50px;
        //     width:120px;
        //     text-align: center;
        //     font-size:12px;
        // }
    }
    .recent-price .ivu-table-cell {
        padding-left: 0;
        padding-right: 0;
    }
    .currency-balance {
        padding: 4px 0;
        font-size: 14px;
        font-weight: 500;
        span {
            float: right;
            color: #7A98F7;
            cursor: pointer;
            padding-right: 20px;
        }
    }
</style>