<template>
    <div class="hq-deal">
        <Row>
            <Col span="16" class="deal-buysell">
                <Row>
                    <Tabs size="small">
                        <TabPane label="限价交易" class="jiaoyi">
                            <Col span='12' style="padding:0 20px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <Input :number="true" v-model="buyprice" @on-change="inputNumber(1)" :maxlength="14"></Input>
                                            <span>{{ params.bizhong }}</span>
                                            <p>≈ <i> 0.0000 </i> CNY</p>
                                        </FormItem> 
                                        <FormItem label="买入量" class="deal-input">
                                            <Input :number="true" v-model="buycount" @on-change="inputNumber(2)" :maxlength="14"></Input>
                                            <span>{{ params.currency }}</span>
                                        </FormItem>
                                        <p class="count-money">交易额 <i>{{buymoney}}</i> <span>USDT</span></p>
                                        <Button class="mairu">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="卖出价" class="deal-input">
                                            <Input :number="true" v-model="sellprice" @on-change="inputNumber(3)" :maxlength="14"></Input>
                                            <span>{{ params.bizhong }}</span>
                                            <p>≈ <i> 0.000 </i> CNY</p>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <Input :number="true" v-model="sellcount" @on-change="inputNumber(4)" :maxlength="14"></Input>
                                            <span>{{ params.currency }}</span>
                                        </FormItem>
                                        <p class="count-money">交易额 <i>{{ sellmoney }}</i> <span>USDT</span></p>
                                        <Button class="mairu">卖出{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                        </TabPane>
                        <TabPane label="市价交易" class='jiaoyi'>
                            <Col span='12' style="padding:0 20px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格买入" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="买入量" class="deal-input">
                                            <Input :number="true" v-model="buycount1" @on-change="inputNumber(5)" :maxlength="14"></Input>
                                            <span>{{ params.currency }}</span>
                                        </FormItem>
                                        <Button class="mairu">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div style="padding:20px 20px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem  label="卖出价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格卖出" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <Input  :number="true" v-model="sellcount1" @on-change="inputNumber(6)" :maxlength="14"></Input>
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
            buyprice:"",
            buycount:'',
            sellprice:'',
            sellcount:'',
            buycount1:'',
            sellcount1:"",
            buymoney:'0.0000',
            sellmoney:'0.0000',
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
        inputNumber(val){
            console.log(val)
            if(val==1){
                var p = /^[0-9]+([.]{1}[0-9]+){0,1}$/; 
                var b = p.test(this.buyprice);//true
                let buyp;
                let that =this;
                if(!b){
                    setTimeout(function(){
                        that.buyprice = that.buyprice.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                        that.buyprice = that.buyprice.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
                        that.buyprice = that.buyprice.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.  
                        that.buyprice = that.buyprice.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                        console.log(that.buyprice)
                    },10)
                }

                setTimeout(function(){
                    that.buymoney = (that.buycount*that.buyprice).toFixed(6);
                },20)
            }
            if(val == 2){
                var p = /^[0-9]+([.]{1}[0-9]+){0,1}$/; 
                var b = p.test(this.buycount);//true
                let buyp;
                let that =this;
                if(!b){
                    setTimeout(function(){
                        that.buycount = that.buycount.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                        that.buycount = that.buycount.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
                        that.buycount = that.buycount.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.  
                        that.buycount = that.buycount.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                        console.log(that.buycount)
                    },10)
                }

                setTimeout(function(){
                    that.buymoney = (that.buycount*that.buyprice).toFixed(6);
                },20)
            }
            if(val == 3){
                var p = /^[0-9]+([.]{1}[0-9]+){0,1}$/; 
                var b = p.test(this.sellprice);//true
                let buyp;
                let that =this;
                if(!b){
                    setTimeout(function(){
                        that.sellprice = that.sellprice.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                        that.sellprice = that.sellprice.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
                        that.sellprice = that.sellprice.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.  
                        that.sellprice = that.sellprice.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                        console.log(that.sellprice)
                    },10)
                }

                setTimeout(function(){
                    that.sellmoney = (that.sellprice*that.sellcount).toFixed(6);
                },20)
            }
            if(val == 4){
                var p = /^[0-9]+([.]{1}[0-9]+){0,1}$/; 
                var b = p.test(this.sellcount);//true
                let buyp;
                let that =this;
                if(!b){
                    setTimeout(function(){
                        that.sellcount = that.sellcount.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                        that.sellcount = that.sellcount.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
                        that.sellcount = that.sellcount.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.  
                        that.sellcount = that.sellcount.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                        console.log(that.sellcount)
                    },10)
                }

                setTimeout(function(){
                    that.sellmoney = (that.sellprice*that.sellcount).toFixed(6);
                },20)
            }
            if(val == 5){
                var p = /^[0-9]+([.]{1}[0-9]+){0,1}$/; 
                var b = p.test(this.buycount1);//true
                let buyp;
                let that =this;
                if(!b){
                    setTimeout(function(){
                        that.buycount1 = that.buycount1.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                        that.buycount1 = that.buycount1.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
                        that.buycount1 = that.buycount1.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.  
                        that.buycount1 = that.buycount1.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                        console.log(that.buycount1)
                    },10)
                }

                
            }
            if(val == 6){
                var p = /^[0-9]+([.]{1}[0-9]+){0,1}$/; 
                var b = p.test(this.sellcount1);//true
                let buyp;
                let that =this;
                if(!b){
                    setTimeout(function(){
                        that.sellcount1 = that.sellcount1.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                        that.sellcount1 = that.sellcount1.replace(/^\./g,"");  //验证第一个字符是数字而不是.  
                        that.sellcount1 = that.sellcount1.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.  
                        that.sellcount1 = that.sellcount1.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                        console.log(that.sellcount1)
                    },10)
                }

            }
           
        },
        dblclick (row,index) {
            if(index<5){
                this.buycount = row.tradecount;
                this.buyprice = row.tradeprice;
                this.buymoney = (this.buycount*this.buyprice).toFixed(6);
            }else{
                this.sellcount = row.tradecount;
                this.sellprice = row.tradeprice;
                this.sellmoney = (this.sellcount*this.sellprice).toFixed(6);
            }
        },
        paramsinfo (obj) {
            console.log(obj)
            let that =this;
            this.data1 = [];
            this.$ajax({
                method: 'post',
                url: '/trade/tps/pblds.do',
                data: {
                    "currencycode":obj.currency,
                    "count":"5",
                    latetype: 1
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