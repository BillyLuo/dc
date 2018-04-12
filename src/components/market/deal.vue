<template>
    <div class="hq-deal">
        <Row>
            <Col span="16" class="deal-buysell">
                <Row>
                    <Tabs size="small" v-model="active_tab" @on-click="changeTab">
                        <TabPane label="限价交易" name='xjjy' class="jiaoyi">
                            <Col span='12' style="padding:0 10px;">
                                <div class="currency-balance">可用 {{usdtBalance}} {{params.bizhong}} <span @click="recharge(params.bizhong)">充币</span></div>
                                <div class="currency-balance">冻结 {{usdtBalance1}} {{params.bizhong}}</div>
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div style="padding:20px 0px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <div style="position:relative;">
                                                <input v-model="buyprice" @input="inputBuyPrice($event,'buyprice')" class="input-number" />
                                                <span class='span'>{{ params.bizhong }}</span>
                                            </div>
                                           
                                            <p>≈ <i> 0.0000 </i> CNY</p>
                                        </FormItem> 
                                        <FormItem label="买入量" class="deal-input">
                                            
                                            <div style="position:relative;">
                                                <input v-model="buycount" @input="inputBuyPrice($event,'buycount')" class="input-number" />
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                        </FormItem>
                                        <p class="count-money">交易额 ≈ <i>{{buymoney}}</i> <span>USDT</span></p>
                                        <Slider v-model="sliderbuy" :tip-format="sliderformat" @on-input="sliderchange"></Slider>
                                        <Button class="mairu" @click="trade(1)">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <!-- <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div> -->
                                <div class="currency-balance">可用 {{changeCurrenyBalance}} {{changeCurreny}} <span @click="recharge(changeCurreny)">充币</span></div>
                                <div class="currency-balance">冻结 {{changeCurrenyBalance1}} {{changeCurreny}} <span @click="recharge(changeCurreny)">充币</span></div>
                                <div style="padding:20px 0px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="卖出价" class="deal-input">
                                            <div style="position:relative;">
                                               <input v-model="sellprice" @input="inputBuyPrice($event,'sellprice')" class="input-number" />
                                                <span class='span'>{{ params.bizhong }}</span>
                                            </div>
                                           
                                            <p>≈ <i> 0.0000 </i> CNY</p>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <div style="position:relative;">
                                                <input v-model="sellcount" @input="inputBuyPrice($event,'sellcount')" class="input-number" />
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                        </FormItem>
                                        <p class="count-money">交易额 ≈ <i>{{ sellmoney }}</i> <span>USDT</span></p>
                                        <Slider v-model="slidersell" :tip-format="sliderformat" @on-input="slidersellchange"></Slider>
                                        <Button class="mairu" @click="trade(2)">卖出{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                        </TabPane>
                        <!-- <TabPane label="市价交易" name='sjjy' class='jiaoyi'>
                            <Col span='12' style="padding:0 10px;">
                                <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div>
                                <div class="currency-balance">可用 {{usdtBalance}} USDT <span @click="recharge('USDT')">充币</span></div>
                                <div style="padding:20px 0px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem label="买入价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格买入" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="买入量" class="deal-input">
                                            <div style="position:relative;">
                                                <input v-model="buycount1" @input="inputBuyPrice($event,'buycount1')" class="input-number" />
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                        </FormItem>
                                        <Button class="mairu">买入{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col span='12' style="padding-left:10px;">
                                <div class="to-login">
                                    <a href="/login">登陆 </a> 或 <a href="/register"> 注册 </a> 开始交易
                                </div>
                                <div class="currency-balance">可用 {{changeCurrenyBalance}} {{changeCurreny}} <span @click="recharge(changeCurreny)">充币</span></div>
                                <div style="padding:20px 10px 0 0;">
                                    <Form  label-position="top">
                                        <FormItem  label="卖出价" class="deal-input">
                                            <Input disabled placeholder="以市场上最优价格卖出" number></Input>
                                            <span>{{ params.bizhong }}</span>
                                        </FormItem>
                                        <FormItem label="卖出量" class="deal-input">
                                            <div style="position:relative;">
                                                <input v-model="sellcount1" @input="inputBuyPrice($event,'sellcount1')" class="input-number" />
                                                <span class='span'>{{ params.currency }}</span>
                                            </div>
                                            
                                        </FormItem>
                                        <Button class="mairu">卖出{{ params.currency }}</Button>
                                    </Form>
                                </div>
                            </Col>
                        </TabPane> -->
                        <TabPane label="委托撤销" name='wtcx' class='jiaoyi'>
                            <Entrust/>
                        </TabPane>
                        <TabPane label="委托历史" name='wtls' class='jiaoyi'>
                            <Entrusth/>
                        </TabPane>
                        <TabPane label="交易记录" name='jyjl' class='jiaoyi'>
                            <Transaction/>
                        </TabPane>
                    </Tabs>
                    
                </Row>
            </Col>
            <Col span="8" class="new-price">
                <div class="price-list">
                    <div class="list-title">
                        最新价 <span>{{new_price}} {{ params.currency }}</span>
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
import {Tabs,TabPane,Table,Form,FormItem,Slider} from 'iview';
import Entrust from "./Entrust";
import Entrusth from "./Entrusthistory";
import Transaction from "./Transaction";
import bus from '../../bus/bus';
import { mapState } from "vuex";
var numReg = function (m,n) {
    m=m.toString();
    n=n.toString();
    if (!m) {
        m = 15;
    }else if(!m.match(/^[1-9]\d*$/)) {
        m = 15;
    }
    if (!n) {
        n = 8;
    }else if (!n.match(/^[1-9]\d*$/)) {
        n = 8;
    }

    return new RegExp('^(((0(\\.\\d{0,' + n + '})?))|([1-9]\\d{0,'+(m-1)+'}(\\.\\d{0,'+n+'})?))$');
}
var reg = numReg(8,8);
var regs = numReg(10,3);
var decimal = function(a,b){
        let s = a.toString()
        if(s.indexOf('.') != -1){
            return s.substring(0,s.lastIndexOf('.')+b)
        }else{
            return s
        }
        
    }
export default {
    name: 'Deal',
    components:{
        Tabs,TabPane,Form,FormItem,Table,Entrust,Entrusth,Transaction,Slider
    },
    props: ['params'],
    data: function() {	
        return {
            active_tab:"xjjy",
            new_price:"",
            buyprice:'',
            buycount:'',
            sellprice:'',
            sellcount:'',
            buycount1:'',
            sellcount1:'',
            //usdt  数量
            usdtCurrency:'USDT',
            usdtBalance:'0',
            usdtBalance1:'0',
            // 选择交易的币种的数量
            changeCurreny:'ETH',
            changeCurrenyBalance:'0',
            changeCurrenyBalance1:'0',
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
               
            ],
            sliderbuy:0,
            slidersell:0,
            tradepwd:""
        }
    },
    created(){
        this.active_tab="xjjy";
        bus.$on("chexiao",(val)=>{
            if(val.chexiaowancheng){
                this.paramsinfo({});
            }
        })
    },
    mounted () {
        var that = this;
        this.paramsinfo();
        // this.priceq();
       
        this.active_tab="xjjy";
    },
    computed:{
        ...mapState({
            userinfo: state => {
                var amount = 0;
                if (state.userinfo.emailset ==1) {
                amount += 1;
                }
                if (state.userinfo.identityset ==1) {
                amount += 1;
                }
                if (state.userinfo.mobileset==1) {
                amount += 1;
                }
                if (state.userinfo.googlecodeset ==1 ) {
                amount += 1;
                }
                if (state.userinfo.loginpasswordset == 1) {
                amount += 1;
                }
                if (state.userinfo.tradepasswordset == 1) {
                amount += 1;
                }
                return {
                    validationAmount: amount
                };
            }
        }),
        buymoney(){
            return this.buycount*this.buyprice*1.002;
        },
        sellmoney(){
            return this.sellcount*this.sellprice*(1-0.002);
        }
    },
    watch:{
        params: "paramsinfo",
        changeCurreny(){
            // this.newPrice();
        }
    },
    methods: {
        newPrice(){
            console.log(this.params,"======================")
            let that =this;
            this.$ajax({
                method:"post",
                url:"/trade/tps/pbfcd.do",
                data:{
                    "currencytype":that.changeCurreny,
                    'tradecurrency':that.usdtCurrency,
                    "reqresource":"1"
                }
            }).then((res)=>{
                console.log(res)
                if(res.data && res.data.err_code == "1" && res.data.currencyDetail.length){
                    that.new_price = Number(res.data.currencyDetail[0].curprice);
                    that.buyprice =res.data.currencyDetail[0].curprice;
                    that.sellprice = res.data.currencyDetail[0].curprice;
                }else if(res.data && res.data.err_code != '1' && res.data.msg){
                    this.$Notice.warning({
                        title:'提示',
                        desc:'查询出错了，'+res.data.msg
                    })
                    that.buyprice = '';
                    that.sellprice = '';
                }else {
                    this.$Notice.warning({
                        title:'提示',
                        desc:'查询出错了，请稍后重试'
                    })
                    that.buyprice = '';
                    that.sellprice = '';
                }
            }).catch((res)=>{
                this.$Notice.warning({
                    title:'提示',
                    desc:'查询出错了，请稍后重试'
                })
            })
        },
        sliderformat(val){//滑块
            return val+'%'
        },
        sliderchange(val){//滑块
            // console.log("可用资金",this.buy_keyong,"----单价：",this.buyprice,"-----百分比：",val,"-------手续费：1.002")
            if(this.buyprice && this.buyprice != 0){
                this.buycount = decimal((this.usdtBalance*(val/100))/(this.buyprice*1.002),4)
            }else{
                this.$Modal.error({
                    content: "买入价能为空，且必须大于零。"
                })
                return false;
            }
            
        },
        slidersellchange(val){
            // console.log("可用资金",this.sell_keyong,"----单价：",this.sellprice,"-----百分比：",val,"-------手续费：1.002")
            this.sellcount = decimal(this.changeCurrenyBalance*(val/100),4)
        },
        inputBuyPrice(e,priceType){
            var value = e.target.value;
            if(priceType=="buycount" || priceType == "sellcount"){
                if (!value) {
                    this[priceType] = '';
                }else {
                    if (regs.test(value)) {
                        this[priceType] = value;
                    }else {
                        value = value.slice(0,-1);
                        var matched = value.match(regs);
                        if (matched && matched.length) {
                            this[priceType] = matched[0];
                        }else {
                            this[priceType]  = '';
                        }
                    }
                }
            }else{
                if (!value) {
                    this[priceType] = '';
                }else {
                    if (reg.test(value)) {
                        this[priceType] = value;
                    }else {
                        value = value.slice(0,-1);
                        var matched = value.match(reg);
                        if (matched && matched.length) {
                            this[priceType] = matched[0];
                        }else {
                            this[priceType]  = '';
                        }
                    }
                }
            }
            
        },
        // priceq(currency){
        //     let that =this;
        //     if (!currency) {
        //         currency = 'ETH';
        //     }
        //     let tradecurrency = this.usdtCurrency;
        //     this.$ajax({
        //         method:"post",
        //         url:"/trade/tps/pbfcd.do",
        //         data:{
        //             "currencytype":currency,
        //             'tradecurrency':tradecurrency,
        //             "reqresource":"1"
        //         }
        //     }).then((res)=>{
        //         console.log(res)
        //         if(res.data && res.data.err_code == "1" && res.data.currencyDetail){
        //             that.buyprice =res.data.currencyDetail[0].curprice;
        //             that.sellprice = res.data.currencyDetail[0].curprice;
        //         }else if(res.data && res.data.err_code != '1' && res.data.msg){
        //             this.$Notice.warning({
        //                 title:'提示',
        //                 desc:'查询出错了，'+res.data.msg
        //             })
        //             that.buyprice = '';
        //             that.sellprice = '';
        //         }else {
        //             this.$Notice.warning({
        //                 title:'提示',
        //                 desc:'查询出错了，请稍后重试'
        //             })
        //             that.buyprice = '';
        //             that.sellprice = '';
        //         }
        //     }).catch((res)=>{
        //         this.$Notice.warning({
        //             title:'提示',
        //             desc:'查询出错了，请稍后重试'
        //         })
        //     })
        // },
        //充币
        recharge (currency) {
            if (!currency) {
                return;
            }
            this.$router.push({
                path:'/assets/recharge',
                query:{
                    name:currency
                }
            })
        },
        inputNumber(val){
            console.log(val);
        },
        dblclick (row,index) {
            if(row.operate == "1"){
                this.buycount =  Number(row.count);
                this.buyprice =  Number(row.price);
            }else{
                this.sellcount =  Number(row.count);
                this.sellprice =  Number(row.price);
            }
        },
        paramsinfo (obj) {
            console.log(obj,'currency')
            this.usdtCurrency = this.params.bizhong;
            this.changeCurreny = this.params.currency;
            console.log(this.usdtCurrency+"==================="+this.changeCurreny)
            bus.$emit("vl_currency",this.params)
            this.getBalance(this.usdtCurrency);
            this.getBalance(this.changeCurreny);
            this.newPrice();
            if (obj && obj.currency) {
                this.changeCurreny = obj.currency;
                // this.getBalance(this.usdtCurrency);
                // this.getBalance(obj.currency);
                this.changeCurreny = obj.currency;
            }
            let that =this;
            this.data1 = [];
            this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbles.do",
                    data: {
                        count : 5,//查询条数
                        coin : obj ? obj.currency :'ETH',//币种
                        tradecoin: this.usdtCurrency,//交易币种
                        reqresource:1
                    }
                }).then((data)=>{
                    console.log(data.data.latestEntrust)
                    if(data.data.latestEntrust && data.data && data.data.err_code =="1"){
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
                    }
                    
                })
        },
        // 可用冻结资金
        getBalance(type) {
            var that = this;
            if (!type) {
                type = this.usdtCurrency;
            }
            this.$ajax.post('/trade/tps/pblaf.do',{
                reqresource:1,
                currencytype:type
            }).then((res) => {
                console.log('------res-getbalance----',res,res.data);
                if (res.status == 200 && res.data && res.data.err_code == '1') {
                    if (res.data && res.data.accountFund &&  res.data.accountFund.length) {
                        if (type == 'USDT') {
                            that.usdtBalance = Number(res.data.accountFund[0].usablefund).toFixed(10);
                            that.usdtBalance1 = Number(res.data.accountFund[0].frozenfund).toFixed(10);
                        }else {
                            that.changeCurrenyBalance = Number(res.data.accountFund[0].usablefund).toFixed(10);
                            that.changeCurrenyBalance1 = Number(res.data.accountFund[0].frozenfund).toFixed(10);
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
            this.tradepwd ="";
            var that = this;
            var operate = type;       //1 买入   2  卖出
            var entrusttype = 1;      //1.限价交易   2.市价交易
            var entrustcoin = '';     //委托币种
            var tradecoin = '';       //交易币种
            var entrustnum = '';      //委托数量
            var entrustprice = '';    //委托价格
            var reqresource = 1;      //请求来源，1：PC，2：APP
            var tradepwd="";
            this.$Modal.confirm({
                    title:"请输入交易密码",
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: that.tradepwd,
                                autofocus: true,
                                placeholder: '请输入交易密码',
                                type:'password'
                            },
                            style:{
                                marginTop: '30px'
                            },
                            on: {
                                input: (val) => {
                                   this.tradepwd = val;
                                //    console.log("=========",this.tradepwd)
                                }
                            }
                        })
                    },
                    onOk: () => {
                        console.log("---------------------",that.userinfo.validationAmount)
                        if(that.userinfo.validationAmount < 5){
                            console.log("21432143214")
                            that.$Notice.warning({
                                title:'提示',
                                desc:'请先到个人中心完成安全设置。'
                            })
                            return false;
                        }
                        if (type == 1) {
                            // "entrustcoin":that.jichubizhong,
                            // "tradecoin":that.jijiabizhong,
                            tradecoin = this.params.bizhong;
                            entrustcoin = this.changeCurreny;
                            entrustnum = this.buycount;
                            entrustprice = this.buyprice;
                            tradepwd = this.tradepwd;
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
                                operate,
                                tradepwd
                            }).then((res) => {
                                console.log('发送请求成功',res);
                                if (res.status == 200 && res.data.err_code == '1') {
                                    console.log('创建委托成功');
                                    that.$Notice.success({
                                        title:'提示',
                                        desc:'委托创建成功'
                                    })
                                    that.buycount = 0;
                                    that.getBalance();
                                    that.paramsinfo (that.params)
                                }else if (res.data && res.data.msg) {
                                    that.$Notice.warning({
                                        title:'提示',
                                        desc:'委托创建失败,'+res.data.msg
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
                            tradepwd = that.tradepwd;
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
                                operate,
                                tradepwd
                            }).then((res) => {
                                console.log('---res,发送请求成功',res);
                                if (res.status == 200 && res.data.err_code == '1') {
                                    console.log('创建委托成功');
                                    that.$Notice.success({
                                        title:'提示',
                                        desc:'委托创建成功'
                                    })
                                    var coin = that.changeCurreny;
                                    that.sellcount = 0;
                                    that.getBalance(coin);
                                    that.paramsinfo (that.params)
                                }else if (res.data && res.data.msg) {
                                    that.$Notice.warning({
                                        title:'提示',
                                        desc:'委托创建失败,'+res.data.msg
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
                })
            
        },
        changeTab(name){
            if(name =="xjjy"){
                this.getBalance(this.changeCurreny);
                this.getBalance(this.params.bizhong);
            }
            if(name == 'wtcx'){
                this.params["wtcx"] = true;
                this.params["wtls"] = false;
                this.params["jyjl"] = false;
                bus.$emit("vl_currency",this.params)
            }
            if(name == 'wtls'){
                this.params["wtcx"] = false;
                this.params["wtls"] = true;
                this.params["jyjl"] = false;
                bus.$emit("vl_currency",this.params)
            }
            if(name == 'jyjl'){
                this.params["wtcx"] = false;
                this.params["wtls"] = false;
                this.params["jyjl"] = true;
                bus.$emit("vl_currency",this.params)
            }

        },
        safe (val) {
            if(val == "1"){
                this.$Modal.remove()
            }
            this.$router.push("user");
        },
    }
}
</script>

<style lang="less">
    @import '~iview/src/styles/index.less';
    @primary-color:#7A98F7;
    .hq-deal{
        color:#C7CCE6;
        margin-top: 10px;
        min-height:456px;
        .ivu-row{
            height:100%;
        }
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
            height:100%;
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
            color:#666;
            outline: none;
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