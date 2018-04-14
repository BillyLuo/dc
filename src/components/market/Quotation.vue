<template>
    <div class="quotation">
        <Row class="qt_right">
            <Col span="18">
                <div id="chart"> </div>
            </Col>
            <Col span="6">
                <Table class="right-list"  @on-row-click="dbclick" :columns="columns1" :data="data1"></Table>
                <div class="table_qt">
                    <Col class="db_table" span="8">
                        <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'">1243</span>
                    </Col>
                    <Col class="db_table rose" span="8">
                        <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'">{{zhangfu}} <Icon :type="zhangfu > 0 ? 'arrow-up-a' :'arrow-down-a'"/></span>
                    </Col>
                    <Col class="db_table" span="8">
                        <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'">982</span>
                    </Col>
                </div>
                <Table class="right-list2"  @on-row-click="dbclick" :columns="columns1" :data="data2"></Table>
                <div class="buy_sell">
                    <Tabs size="small" @on-click="changeTab">
                        <TabPane label="买入" name='buy' class="buy_bi">
                            <div class="keyong">
                                <p>可用 {{ jijia_keyong }} {{ jijiabizhong }}</p>
                                <p>冻结 {{ jijia_dongjie }} {{ jijiabizhong }}</p>
                            </div>
                            <div class="price" style="margin-top:2px;">
                                <input v-model="price"  @input="inputBuyPrice($event,'price')" class="input-number" />
                                <span> {{ '限价 '+jijiabizhong }}</span>
                            </div>
                            <div class="price">
                                <input v-model="count"  @input="inputBuyPrice($event,'count')" class="input-number" />
                                <span> {{ '仓位 '+jichubizhong }}</span>
                            </div>
                            <div class="slides_sty">
                                <Slider v-model="slides_value" @on-input="sliderchange" :tip-format="hideFormat"></Slider>
                            </div>
                            <div class="ammont">
                                预计交易额：{{ buymoney }}
                            </div>
                            <div class="button_sell_buy">
                                <Button class="buy" @click="buycurrency">买入</Button>
                                <!-- <Button class="sell clear">卖出</Button> -->
                            </div>
                        </TabPane>
                        <TabPane label="卖出" name='sell' class="buy_bi">
                            <div class="keyong">
                                <p>可用 {{ jichu_keyong }} {{ jichubizhong }}</p>
                                <p>冻结 {{ jichu_dongjie }} {{ jichubizhong }}</p>
                            </div>
                            <div class="price" style="margin-top:2px;">
                                <input v-model="price1"  @input="inputBuyPrice($event,'price1')" class="input-number" />
                                <span> {{ '限价 '+jijiabizhong }}</span>
                            </div>
                            <div class="price">
                                <input v-model="count1"  @input="inputBuyPrice($event,'count1')" class="input-number" />
                                <span> {{ '仓位 '+jichubizhong }}</span>
                            </div>
                            <div class="slides_sty">
                                <Slider v-model="slides_value1" @on-input="slidersellchange" :tip-format="hideFormat"></Slider>
                            </div>
                            <div class="ammont">
                                预计交易额：{{ sellmoney }}
                            </div>
                            <div class="button_sell_buy">
                                <Button class="sell clear" @click="sellcurrency" >卖出</Button>
                            </div>
                        </TabPane>
                    </Tabs>
                    <!-- <div class="keyong">
                        <p>可用 {{ keyong }} {{ jijiabizhong }}</p>
                        <p>冻结 {{ dongjie }} {{ jijiabizhong }}</p>
                        <p>可用 {{ jichu_keyong }} {{ jichubizhong }}</p>
                        <p>冻结 {{ jichu_dongjie }} {{ jichubizhong }}</p>
                    </div>
                    <div class="price" style="margin-top:10px;">
                        <input v-model="price" class="input-number" />
                        <span> {{ '限价 '+jijiabizhong }}</span>
                    </div>
                    <div class="price">
                        <input v-model="count" class="input-number" />
                        <span> {{ '仓位 '+jichubizhong }}</span>
                    </div>
                    <div class="slides_sty">
                        <Slider v-model="slides_value" :tip-format="hideFormat"></Slider>
                    </div>
                    <div class="ammont">
                        预计交易额：{{ total }}
                    </div>
                    <div class="button_sell_buy">
                        <Button class="buy">买入</Button>
                        <Button class="sell clear">卖出</Button>
                    </div> -->
                </div>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import TradingView from './trading';
import {Tabs,TabPane,Table,Form,FormItem,Slider} from 'iview';
import { mapState } from "vuex";
function initCharts (symbol) {
        console.log(symbol)
        new TradingView.widget({
            "container_id":"chart",
            "width": '100%',
            "height": 660,
            "symbol": 'BITFINEX:'+(symbol?''+symbol:"BTCUSD"),
            "interval": "15",
            "timezone": "Asia/Hong_Kong",
            "theme": "Dark",
            "style": "1",
            "locale": "zh_CN",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "withdateranges": false,
            "hide_top_toolbar":false,
            "hide_side_toolbar": false,
            "allow_symbol_change": false,
            "hideideasbutton": true,
            "show_popup_button": false,
            "popup_width": "1000",
            "popup_height": "650",
            "save_image":false
        });
} 
    var numReg = function (m,n) {
        // m=m.toString();
        // n=n.toString();
        if (!m) {
            m = 15;
        }else if(!m.match(/^[1-9]\d*$/)) {
            m = 15;
        }
        if (!n) {
            n = 10;
        }else if (!n.match(/^[1-9]\d*$/)) {
            n = 10;
        }
        return new RegExp('^(((0(\\.\\d{0,' + n + '})?))|([1-9]\\d{0,'+(m-1)+'}(\\.\\d{0,'+n+'})?))$');
    }
    let i=0;
    var reg = numReg('8','8');
    var regs = numReg('10','3');
    var decimal = function(a,b){
        let s = a.toString()
        if(s.indexOf('.') != -1){
            return s.substring(0,s.lastIndexOf('.')+b)
        }else{
            return s
        }
        
    }
export default {
    components:{
        Tabs,TabPane,Table,Slider
    },
    data() {
        return {
            jichubizhong:"ETH",
            jijiabizhong:"USDT",
            //right 
            zhangfu:"99.99",
            price:'',
            count:"",
            slides_value:0,
            price1:'',
            count1:"",
            slides_value1:0,
            jichu_keyong:'',
            jichu_dongjie:'',
            jijia_keyong:'',
            jijia_dongjie:'',
            data1:[],
            data2:[],
            columns1:[
                {
                    title: ' ',
                    key: 'id',
                    // width:"100",
                    align:'left',
                    render: (h, params) => {
                        if(params.row.operate == "1"){
                            return h('span',{
                                style: {
                                        color: '#1e9900',
                                        textAlign: 'center',
                                        display: 'inline-block',
                                        width: '100%'
                                    },
                            },'买'+params.row.xuhao)

                           
                        }
                        if(params.row.operate == "2"){
                            return h('span',{
                                style: {
                                        color: '#e55541',
                                        textAlign: 'center',
                                        display: 'inline-block',
                                        width: '100%'
                                    },
                            },'卖'+params.row.xuhao)

                           
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
                }
            ],
            tradepwd:""
        }
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
            if(this.price > 0 && this.count > 0){
                return  decimal(this.count*this.price*1.002,11)
            }
        },
        sellmoney(){
            if(this.price1 > 0 && this.count1 > 0){
                return decimal((this.count1*this.price1-this.count1*this.price1*0.002),11);
            }
        },
    },
    mounted(){
        initCharts();
        this.getRlist();
        this.getBalance(this.jijiabizhong);
        this.newPrice();
    },
    methods:{
        buycurrency(){
            console.log(this.userinfo.validationAmount)
            let that = this;
            
            if(this.userinfo.validationAmount< 5){
                this.$Notice.warning({
                    title:"温馨提示",
                    desc: "请先到个人中心完成安全设置"
                })
                return false;
            }
            if(Number(this.count*this.price) < 150){
                this.$Notice.warning({
                    title:"温馨提示",
                    desc: "买入数量不能小于150 USDT且不包括手续费"
                })
                return false;
            }
            if(Number(this.buymoney) > Number(this.jijia_keyong)){
                this.$Notice.warning({
                    title:"温馨提示",
                    desc: "账户可用资金不足，请到数字资产充值"
                })
               
                return false;
            }
            if(that.count > 0 && that.price > 0){
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
                                }
                            }
                        })
                    },
                    onOk: () => {
                        this.$ajax({
                            method:"post",
                            url:"/trade/tps/pbces.do",
                            data:{
                                "entrusttype":"1",
                                "operate":"1",
                                "entrustcoin":that.jichubizhong,
                                "tradecoin":that.jijiabizhong,
                                "entrustnum":that.count,
                                "entrustprice":that.price,
                                "reqresource":"1",
                                "tradepwd":that.tradepwd
                            }
                        }).then((res)=>{
                            console.log(res)
                            if(res.data && res.data.err_code == "1"){
                                this.$Notice.success({
                                    title:"温馨提示",
                                    desc: "创建委托成功"
                                })
                                
                                that.count = 0;
                                that.getBalance(this.jijiabizhong);
                                that.newPrice();
                            }else{
                                this.$Notice.error({
                                    title:"温馨提示",
                                    desc: "创建委托失败，"+res.data.msg
                                })
                            }
                        })
                       
                    },
                })

                
            }else{
                this.$Notice.warning({
                    title:"温馨提示",
                    desc: "买入价或买入量不能为空"
                })
            }
        },
        sellcurrency(){
            let that = this;
            if(this.userinfo.validationAmount< 5){
                this.$Notice.warning({
                    title:"温馨提示",
                    desc: "请先到个人中心完成安全设置"
                })
                return false;
            }
            if(Number(this.count1) > Number(this.jichu_keyong)){
                this.$Notice.warning({
                    title:"温馨提示",
                    desc: "账户可用资金不足，请到数字资产充值"
                })
                return false;
            }
            if(that.count1 > 0 && that.price1 > 0){
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
                                }
                            }
                        })
                    },
                    onOk: () => {
                        this.$ajax({
                            method:"post",
                            url:"/trade/tps/pbces.do",
                            data:{
                                "entrusttype":"1",
                                "operate":"2",
                                "entrustcoin":that.jichubizhong,
                                "tradecoin":that.jijiabizhong,
                                "entrustnum":that.count1,
                                "entrustprice":that.price1,
                                "reqresource":"1",
                                "tradepwd":that.tradepwd
                            }
                        }).then((res)=>{
                            if(res.data && res.data.err_code == "1"){
                                this.$Notice.success({
                                    title:"温馨提示",
                                    desc: "创建委托成功"
                                })
                                that.count1 =0;
                                that.getBalance(this.jichubizhong);
                                that.newPrice();
                            }else{
                                this.$Notice.error({
                                    title:"温馨提示",
                                    desc: "创建委托失败，"+res.data.msg
                                })
                            }
                        })
                       
                    },
                })
                
            }else{
                this.$Notice.warning({
                    title:"温馨提示",
                    desc: "卖出价或卖出量不能为空"
                })
            }
        },
        slidersellchange(val){
            this.count1 = decimal(this.jichu_keyong*(val/100),4)
        },
        sliderchange(val){//滑块
            if(this.price && this.price!=0){
                this.count = decimal((this.jijia_keyong*(val/100))/(this.price*1.002),4)
            }else{
                this.$Notice.error({
                    content: "买入价能为空，且必须大于零。"
                })
                return false;
            }
            
        },
        inputBuyPrice(e,priceType){
            var value = e.target.value;
            if(priceType=="count" || priceType == "count1"){
                if (!value) {
                    this[priceType] = '';
                }else {
                    console.log(regs.test(value))
                    if (regs.test(value)) {
                        this[priceType] = value;
                    }else {
                        value = value.slice(0,-1);
                        console.log(value)
                        var matched = value.match(regs);
                        console.log(matched)
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
                    console.log(reg.test(value))
                    if (reg.test(value)) {
                        this[priceType] = value;
                    }else {
                        value = value.slice(0,-1);
                        console.log(value)
                        var matched = value.match(reg);
                        console.log(matched)
                        if (matched && matched.length) {
                            this[priceType] = matched[0];
                        }else {
                            this[priceType]  = '';
                        }
                    }
                }
            }
            
        },
        newPrice(){
            let that =this;
            this.$ajax({
                method:"post",
                url:"/trade/tps/pbfcd.do",
                data:{
                    "currencytype":that.jichubizhong,
                    'tradecurrency':that.jijiabizhong,
                    "reqresource":"1"
                }
            }).then((res)=>{
                console.log(res)
                if(res.data && res.data.err_code == "1" && res.data.currencyDetail.length){
                    that.price =res.data.currencyDetail[0].curprice;
                    that.price1 = res.data.currencyDetail[0].curprice;
                }else if(res.data && res.data.err_code != '1' && res.data.msg){
                    this.$Notice.warning({
                        title:'提示',
                        desc:'查询出错了，'+res.data.msg
                    })
                    that.price = '';
                    that.price1 = '';
                }else {
                    this.$Notice.warning({
                        title:'提示',
                        desc:'查询出错了，请稍后重试'
                    })
                    that.price = '';
                    that.price1 = '';
                }
            }).catch((res)=>{
                this.$Notice.warning({
                    title:'提示',
                    desc:'查询出错了，请稍后重试'
                })
            })
        },
        hideFormat(val){
            return val+'%';
        },
        changeTab(name){
            this.tradepwd = "";
            if(name == "buy"){
                this.getBalance(this.jijiabizhong);
                this.newPrice();
                this.count="";
            }
            if(name == "sell"){
                this.getBalance(this.jichubizhong);
                this.newPrice();
                this.count1="";
            }
        },
        getBalance(type) {
            var that = this;
            this.$ajax.post('/trade/tps/pblaf.do',{
                reqresource:1,
                currencytype:type
            }).then((res) => {
                // console.log(res);
                if (res.status == 200 && res.data && res.data.err_code == '1') {
                    if (res.data && res.data.accountFund &&  res.data.accountFund.length) {
                       if(type == that.jichubizhong){
                           that.jichu_keyong = res.data.accountFund[0].usablefund;
                           that.jichu_dongjie = res.data.accountFund[0].frozenfund;
                       }else{
                           that.jijia_keyong = res.data.accountFund[0].usablefund;
                           that.jijia_dongjie = res.data.accountFund[0].frozenfund;
                       }
                    }else {
                       if(type == that.jichubizhong){
                           that.jichu_keyong = 0;
                           that.jichu_dongjie = 0;
                       }else{
                           that.jijia_keyong = 0;
                           that.jijia_dongjie = 0;
                       }
                    }
                }
            })
        },
        getRlist(){
            let that =this;
            this.data1 = [];
            this.data2 = [];
            this.$ajax({
                method:"post",
                url:"/trade/tps/pbles.do",
                data: {
                    count : 5,//查询条数
                    coin : this.jichubizhong,//币种
                    tradecoin: this.jijiabizhong,//交易币种
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

                    function compare1(property){
                        return function(obj1,obj2){
                            var value1 = obj1[property];
                            var value2 = obj2[property];
                            return value2 - value1;     // 升序
                        }
                    }
                    var sortObj = latestDeal.sort(compare("price"));
                    // 最新成交价格
                    var sell_data= [];
                    sortObj.map((item,index)=>{
                        if(item.operate =="1"){
                            item["xuhao"] = index+1;
                            that.data1.push(item);
                        }
                        if(item.operate =="2"){
                            sell_data.push(item);
                        }
                    })
                    that.data1.sort(compare1('price'))
                    sell_data.sort(compare('price'))


                    sell_data.map((item,index)=>{
                        item['xuhao'] = index+1;
                        that.data2.push(item)
                    })
                    // that.data1 = sortObj;
                }
                
            })
        },
        dbclick(){

        }
    }
}
    
</script>

<style lang="scss">
    .quotation{
        min-width:1440px;
        margin-top:80px;
        background:#222222;
        .ivu-col{
            padding:0;
            background:#222222;
        }
        .qt_right{
            height:660px;
            .right-list{
                border:none;
            }
            .right-list2{
                border:none;
                .ivu-table-header{
                    display: none;
                }
            }
            .ivu-table-header{
                width:100%;
                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
                background: #2a2a2a;
            }
            .ivu-table-body{
                background: #000;
                min-height:158px;
            }
            .ivu-table{
                table{
                    width:100% !important;
                }
                .ivu-table-tip{
                    width: 100%;
                    background: #000;
                    min-height:158px;
                }
            }
            .ivu-table:before{
                height:0px;
            }
            .ivu-table:after{
                width:0px;
            }
            
            .ivu-table th {
                background-color: #2a2a2a;
                color: #586c86;
            }
            .ivu-table th{
                border-bottom:none;
            }
            .ivu-table td{
                background-color: #000;
                border-bottom:none;
                height:31px;
                color:#989898;
            }
            .ivu-table-cell{
                padding:0;
            }
            .table_qt{
                background:#2a2a2a;
                box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
                width:100%;
                height:54px;
                .db_table{
                    text-align: center;
                    font-size:18px;
                    font-weight:600;
                    line-height: 54px;
                    color:#1e9900;
                }
                .db_table1{
                    text-align: center;
                    font-size:18px;
                    font-weight:600;
                    line-height: 54px;
                    color:#e55541;
                }
                .rose{
                    font-size:24px;
                    // text-align: left;
                    // padding-left:5px;
                }
            }
            .buy_sell{
                width:100%;
                height:250px;
                background: #222;
                // padding:5px 15px 0;
                .buy_bi{
                    padding:0 15px;
                }
                .ivu-tabs-bar{
                    margin-bottom: 3px;
                    border-bottom-color:#2a2a2a;
                    .ivu-tabs-nav{
                        width:100%;
                        .ivu-tabs-ink-bar{
                            display: none !important;
                        }
                        .ivu-tabs-tab{
                            width:49%;
                            text-align: center;
                            padding:6px 16px;
                            color: #586c86;
                            font-weight:400;
                        }
                        .ivu-tabs-tab-active{
                            color: #2d8cf0;
                        }
                    }
                }
                
                .keyong{
                    color:#586c86;
                    font-size:12px;
                    &>p{
                        width: 49%;
                        display: inline-block;
                    }
                }
                .price{
                    color:#fff;
                    position: relative;
                    margin-bottom: 10px;
                    span{
                        position: absolute;
                        display: block;
                        width:100px;
                        height:40px;
                        line-height: 40px;
                        text-align: center;
                        top:0;
                        left:0
                    }
                }
                .input-number{
                    text-align: right;
                    width:100%;
                    height:40px;
                    line-height:40px;
                    border-radius: 0;
                    color:#666;
                    outline: none;
                    position: relative;
                    background: none;
                    border:none;
                    border:1px solid rgba(255,255,255,0.20);
                    padding: 0 15px 0 100px;
                    color: #fff;
                    font-weight: 400;
                }
                .slides_sty{
                    padding-left:3px;
                    .ivu-slider-wrap{
                        height: 9px;
                        margin: 5px 0;
                        border: 1px solid rgba(255,255,255,0.20);
                        border-radius: 9px;
                        background:none;
                        .ivu-slider-bar{
                            height:7px;
                            border-radius: 7px;
                        } 
                        .ivu-slider-button{
                            background:#ffffff;
                            border:1px solid #979797;
                            border-radius:64px;
                            width:10px;
                            height:10px;
                        }
                    }
                }
                .ammont{
                    color:#fff;
                }
                .button_sell_buy{
                    padding:10px 0;
                    width:100%;
                    button{
                        width:100%;
                        height:40px;
                        border:none;
                        color:#fff;
                        font-size:16px;
                    }
                    .sell{
                        // float: right;
                        // border:1px solid #979797;
                        background: #1e9900;
                    }
                    .buy{
                        background: #2584ff;
                       

                    }
                }
            }
        }
    }
</style>
