<template>
    <div class="quotation">
        <div class="title">
            <div class="title_hq bod_left"  style="width:125px;">
                <p class="news_p">最新价</p>
                <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'">{{ news_price }}</span>
            </div>
            <div class="title_hq" style="width:125px;">
                <p class="news_p">24h涨跌</p>
                <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'">{{zhangfu +'%'}} <Icon :type="zhangfu > 0 ? 'arrow-up-a' :'arrow-down-a'"/></span>
            </div>
            <div class="title_hq" style="width:140px;">
                <Select class="select_usd" style="width:138px" v-model="model" @on-change="selectbi">
                    <Option v-for="item in data" :value="item.currencyname" :key="item.currencyname">{{ item.currencyname+"/"+item.tradecurrency }}</Option>
                </Select>
            </div>
        </div>
        <Row class="qt_right">
            <Col span="18">
                <div id="chart"> </div>
            </Col>
            <Col span="6">
                <Table class="right-list"  @on-row-click="dbclick" :columns="columns1" :data="data1"></Table>
                <div class="table_qt">
                    <Col class="db_table" span="6">
                        <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'">{{ news_price }}</span>
                    </Col>
                    <Col class="db_table rose" span="12">
                        <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'">{{ zhangfu +"%" }} <Icon :type="zhangfu > 0 ? 'arrow-up-a' :'arrow-down-a'"/></span>
                    </Col>
                    <Col class="db_table" span="6" style="height:100%;">
                        <span :style="zhangfu >0 ?'color:#e55541;':'color:#1e9900;'"> </span>
                    </Col>
                </div>
                <Table class="right-list2"  @on-row-click="dbclick" :columns="columns1" :data="data2"></Table>
                <div class="buy_sell">
                    <Tabs size="small" v-model="buy_sell"  @on-click="changeTab">
                        <TabPane label="买入" name='buy' class="buy_bi">
                            <div class="keyong">
                                <p>可用 {{ jijia_keyong }}</p>
                                <p>冻结 {{ jijia_dongjie }}</p>
                            </div>
                            <div class="price" style="margin-top:2px;">
                                <input v-model="price"  @input="inputBuyPrice($event,'price')" @blur="inputBlur($event,'price')" class="input-number" />
                                <span> {{ '限价 '+jijiabizhong }}</span>
                            </div>
                            <div class="price">
                                <input v-model="count"  @input="inputBuyPrice($event,'count')" @blur="inputBlur($event,'count')" class="input-number" />
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
                                <p>可用 {{ jichu_keyong }} </p>
                                <p>冻结 {{ jichu_dongjie }} </p>
                            </div>
                            <div class="price" style="margin-top:2px;">
                                <input v-model="price1"  @input="inputBuyPrice($event,'price1')" @blur="inputBlur($event,'price1')" class="input-number" />
                                <span> {{ '限价 '+jijiabizhong }}</span>
                            </div>
                            <div class="price">
                                <input v-model="count1"  @input="inputBuyPrice($event,'count1')" @blur="inputBlur($event,'count1')" class="input-number" />
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
        <Row class="weituo">
            <Col span="18" class="wwj" style="padding-right:2px; background:#353535;">
                <Tabs v-model="active_tab" @on-click="cdTab">
                    <TabPane label="委托撤单" name='wtcd'>
                        <Table class="no-border-table dark-mode" height="721" :loading="loading" :data="order_record_data2" no-data-text="<span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
                    </TabPane>
                    <TabPane label="委托历史" name='wtls'>
                        <Table  class="no-border-table dark-mode" :data="weituo_data" :columns="weituo_columns" stripe></Table>
                        <Table class="no-border-table dark-mode"  height="600" :loading="loading" :data="order_record_data" no-data-text="<span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
                    </TabPane>
                    <TabPane label="交易记录" name='jyjl'>
                        <Table class="no-border-table dark-mode"  :data="weituo_data1" :columns="weituo_columns" stripe></Table>
                        <Table  class="no-border-table dark-mode" height="600" :loading="loading" :data="order_record_data1" no-data-text="<span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span="6" class="list_jyls">
                <Table class="no-border-table dark-mode right_scroll" :columns='columns2' height='795' :data='datas2' stripe></Table>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import TradingView from './trading';
import {Tabs,TabPane,Table,Form,FormItem,Slider} from 'iview';
var Big = require('big.js');
import { mapState } from "vuex";
function initCharts (symbol) {
        new TradingView.widget({
            "container_id":"chart",
            "width": '100%',
            "height": 660,
            "symbol": 'BITFINEX:'+(symbol?''+symbol:"BTCUSD"),
            "interval": "15",
            "timezone": "Asia/Hong_Kong",
            "theme": "Dark",
            "style": "1",
            fullscreen:true,
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
    name:"Quotation",
    data() {
        return {
            model:"ETH",
            news_price:"",
            jichubizhong:"ETH",
            jijiabizhong:"USDT",
            //right 
            zhangfu:"",
            price:'',
            price_:'',
            count:"",
            count_:'',
            slides_value:0,
            price1:'',
            price1_:'',
            count1:"",
            count1_:'',
            slides_value1:0,
            jichu_keyong:'',
            jichu_dongjie:'',
            jijia_keyong:'',
            jijia_dongjie:'',
            loading:false,
            buy_sell:"buy",
            data:[],
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
            tradepwd:"",
            active_tab:'wtcd',
            pageno:1,
            pagesize:100,
            begintime:[],
            order_record_data2:[],
            order_record_cloumns:[],
            weituo_data:[],
            weituo_data1:[],
            weituo_columns: [],
            order_record_data: [],
            weituo_columns1:[],
            order_record_data1:[],
            order_record_cloumns1:[],
            columns2:[],
            datas2:[]
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
                var price = new Big(this.price);
                return price.times(this.count*1.002).toFixed(10);
            }
        },
        sellmoney(){
            if(this.price1 > 0 && this.count1 > 0){
                 var price1 = new Big(this.price1);
                return price1.times(this.count1*0.998).toFixed(10);
            }
        },
    },
    mounted(){
        initCharts(this.jichubizhong+""+this.jijiabizhong.split("T")[0]);
        this.getRlist();
        this.getBalance(this.jijiabizhong);
        this.newPrice();
        this.query_entrust();
        this.query_entrust2();
        this.query_entrust3();
        this.wt_title();
        this.weituolist ();
        this.listcolumns2();
        this.hangqing();
    },
    methods:{
        selectbi(val){
            let that=this;
            this.data.map((item)=>{
                if(item.currencyname == val){
                    that.zhangfu = Number(item.range).toFixed(2);
                    that.news_price = item.curprice;
                    that.jichubizhong = item.currencyname;
                    that.jijiabizhong = item.tradecurrency;
                    initCharts(item.currencyname+""+item.tradecurrency.split("T")[0]);
                    that.getRlist();
                    that.getBalance(that.jijiabizhong);
                    that.newPrice();
                    that.wt_title();
                    that.weituolist ();
                    that.query_entrust();
                    that.listcolumns2();
                    that.hangqing();
                    that.buy_sell = "buy";
                    that.active_tab='wtcd';
                }
                
            })
        },
        hangqing(){
            let that=this;
            this.$ajax({
                method: "post",
                url: "/trade/tps/pbfcd.do",
                data:{
                    'tradecurrency':this.jijiabizhong,
                    reqresource:1
                }    
                
            }).then((data)=>{
                console.log(data);
                if(data.data && data.data.err_code == "1"){
                    that.data = data.data.currencyDetail;
                   that.data.map((item)=>{
                        if(item.currencyname == that.model){
                            that.zhangfu = Number(item.range).toFixed(2);
                            that.news_price = item.curprice;
                            console.log("==========",item.range,"====",)
                        }
                        
                    })
                }
            })
        },
        listcolumns2(){
            let that =this;
            that.datas2=[];
            this.columns2=[
                {
                    title: '时间',
                    key: 'tradetime',
                    render: (h,params) => {
                        return  h("span",{
                            style:{
                                color:"#fff"
                            }
                        },params.row.tradetime.substr(11,20))
                    }
                },
                {
                    title: '价格',
                    key: 'tradeprice',
                    render: (h,params)=>{
                        if(params.row.tradetype == "1"){
                            return h('span',{
                                style: {
                                        color: '#f22929'
                                    },
                            },Number(params.row.tradeprice).toFixed(6))
                            
                        }
                        if(params.row.tradetype == "2"){
                            return h('span',{
                                style: {
                                        color: '#1e9900'
                                    },
                            },Number(params.row.tradeprice).toFixed(6))

                            
                        }
                    }
                },
                {
                    title: '数量',
                    key: 'tradecount',
                    render: (h,params)=>{
                        return  h("span",{
                            style:{
                                color:"#42b6f6"
                            }
                        },Number(params.row.tradecount).toFixed(6))
                    }
                }
            ]
            this.$ajax({
                method: 'post',
                url: '/trade/tps/pblds.do',
                data: {
                    currencytype:that.jichubizhong,
                    pagesize: 100,
                    reqresource:1
                }
            })
            .then(function (response) {
                console.log(response.data.latestDeal);
                if(response.data.latestDeal){
                    that.datas2 = response.data.latestDeal;
                }
                
            })
        },
        weituolist () {
            this.weituo_columns = [
                {
                    title:"总买入数("+this.jichubizhong+")",
                    key: "totalbuynum",
                    render (h,row){
                        if(row.row.totalbuynum){
                            return h("span",Number(row.row.totalbuynum).toFixed(10));
                        }else{
                            let numb=0;
                            return  h("span",numb.toFixed(10))
                        }
                        
                    }
                },
                {
                    title:"平均买入价("+this.jijiabizhong+")",
                    key: "avebuyprice",
                    render (h,row){
                        if(row.row.avebuyprice){
                            return  h("span",Number(row.row.avebuyprice).toFixed(10));
                        }else{
                            let numb=0;
                            return  h("span",numb.toFixed(10))
                        }
                        
                    }
                },
                {
                    title:"总卖出数("+this.jichubizhong+")",
                    key: "totalsellnum",
                    render (h,row){
                        if(row.row.totalsellnum){
                            return  h("span",Number(row.row.totalsellnum).toFixed(10));
                        }else{
                            let numb=0;
                            return  h("span",numb.toFixed(10))
                        }
                        
                    }
                },
                {
                    title:"平均卖出价("+this.jijiabizhong+")",
                    key: "avesellprice",
                    render (h,row){
                        if(row.row.avesellprice){
                            return  h("span",Number(row.row.avesellprice).toFixed(10));
                        }else{
                            let numb=0;
                            return  h("span",numb.toFixed(10))
                        }
                        
                    }
                }
            ]
        },
        cdTab(name){
            if(name == "wtcd"){
                this.query_entrust();
                this.wt_title();
            }
            if(name == "wtls"){
                this.query_entrust2();
                this.wt_title();
            }
            if(name == "jyjl"){
                this.query_entrust3();
                this.wt_title();
            }
        },
        query_entrust3 (currencycode,starttime,endtime) {
            let that = this;
            that.weituo_data1 = [];
            that.order_record_data1 = [];
            // 交易
            this.$ajax({
                method: 'post',
                url: '/trade/tps/pbdms.do',
                data: {
                    "currencytype":that.jichubizhong,//币种
                    "starttime":that.begintime[0] ? that.begintime[0] : "",
                    "endtime":that.begintime[1] ? that.begintime[1] : "",
                    "pageno":that.pageno,
                    "tradecurrency": that.jijiabizhong,
                    "pagesize":that.pagesize,
                    "reqresource":"1",
                }
            })
            .then((response) => {
                console.log("pjyjl======",response)
                if(response.data.err_code=="1" && response.data  && response.data.dealManage){
                    that.weituo_data1 = [{
                        avebuyprice : response.data.avebuyprice,
                        avesellprice: response.data.avesellprice,
                        totalbuynum: response.data.totalbuynum,
                        totalsellnum: response.data.totalsellnum
                    }]

                    that.order_record_data1 = response.data.dealManage;
                }
                if(response.data.err_code=="1" && response.data && response.data.page && response.data.page.sum){
                    that.total = Number(response.data.page.sum);
                }
                that.loading = false;
            })
        },
        query_entrust2() {
            let that = this;
            that.weituo_data=[];
            that.order_record_data=[];
            this.$ajax({
                method: 'post',
                url: '/trade/tps/pbets.do',
                data: {
                    "currencytype":that.jichubizhong,//币种
                    "starttime":that.begintime[0] ? that.begintime[0] : "",
                    "endtime":that.begintime[1] ? that.begintime[1] : "",
                    "pageno":that.pageno,
                    "pagesize":that.pagesize,
                    "reqresource":"1",
                    "status":"1,2,4",
                    "tradecurrency": that.jijiabizhong
                }
            })
            .then((response) => {
                if( response.data.err_code=="1" && response.data && response.data.dealManage){
                    that.weituo_data = [{
                        avebuyprice : response.data.avebuyprice,
                        avesellprice: response.data.avesellprice,
                        totalbuynum: response.data.totalbuynum,
                        totalsellnum: response.data.totalsellnum
                    }]
                    that.order_record_data = response.data.dealManage;
                    
                }
                if(response.data && response.data.page && response.data.page.sum){
                    that.total = Number(response.data.page.sum);
                    
                }
                that.loading = false;
            })
        },
        query_entrust(){
            this.order_record_data2 = [];
            let that = this;
            this.$ajax({
                method: 'post',
                url: '/trade/tps/pbets.do',
                data: {
                    "currencytype":that.jichubizhong,//币种
                    "starttime":that.begintime[0] ? that.begintime[0] : "",
                    "endtime":that.begintime[1] ? that.begintime[1] : "",
                    "pageno":that.pageno,
                    "pagesize":that.pagesize,
                    "tradecurrency": that.jijiabizhong,
                    "reqresource":"1",
                    "status":"0,3"
                }
            })
            .then((response) => {
                console.log(response)
                if(response.data  && response.data.dealManage ){
                    that.order_record_data2 = response.data.dealManage;
                }
                // if(response.data && response.data.page && response.data.page.sum){
                //     that.total = Number(response.data.page.sum);
                // }
                that.loading = false;
            })
        },
        wt_title(){
            this.order_record_cloumns =[
                {
                        title: "委托时间",
                        key: "entrusttime",
                    },
                    {
                        title: '类型',
                        key: 'tradetype',
                        width:100,
                        render: (h,params) =>{
                            if(params.row.tradetype == "1"){
                                return h("span",{style:{
                                    color:"#f22929"
                                }},"买入")
                            }else  if(params.row.tradetype == "2"){
                                return h("span",{style:{
                                    color:"#1e9900"
                                }},"卖出")
                            }
                        }
                    },
                    {
                        title: '数量',
                        key: 'entrustcount',
                        render: (h,params)=>{
                            return h("span",Number(params.row.entrustcount).toFixed(10))
                        }
                    },
                    {
                        title: '价格',
                        key: 'tradeprice',
                        render: (h,params)=>{
                            return h("span",Number(params.row.tradeprice).toFixed(10))
                        }
                    },
                    {
                        title: '金额',
                        key: 'entrustamount',
                        render: (h,params)=>{
                            return h("span",Number(params.row.entrustamount).toFixed(10)) 
                        }
                    },
                    {
                        title: '成交量',
                        key: 'tradecount',
                        render: (h,params)=>{
                            return h("span",Number(params.row.tradecount).toFixed(10))
                        }
                    },
                    {
                        title: '成交金额',
                        key: 'tradeamount',
                        render: (h,params)=>{
                            if (params.row.tradeamount && params.row.tradeamount!="null") return  h("span",Number(params.row.tradeamount).toFixed(10))
                                else return h("span","")
                        }
                    },
                    {
                        title: '手续费',
                        key: 'charge',
                        render: (h,params)=>{
                            if(this.order_record_cloumns_title != "jiaoyijilu"){
                                return h("span",Number(params.row.charge))
                            }else{
                                return h("span",Number(params.row.charge))
                            }
                        }
                    },
                    {
                        title: '平均成交价',
                        key: 'averageprice',
                        
                        render: (h,params)=>{
                            return h("span",Number(params.row.averageprice).toFixed(10))
                        }
                    }
                    
            ]
             if(this.active_tab == "wtcd"){
                this.order_record_cloumns.push({
                        title: "操作",
                        key: 'status',
                        render: (h,params) =>{
                            // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
                            if(params.row.status == "1"){
                                return h("span","已成交")
                            }else if(params.row.status == "3" || params.row.status == "0"){
                                return  h('div', [
                                            h('Button', {
                                                props: {
                                                    type: 'primary',
                                                    size: 'small'
                                                },
                                                style: {
                                                    marginRight: '5px'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.show(params.row)
                                                    }
                                                }
                                            }, '撤销')
                                        ]);
                            }else if(params.row.status == "2"){
                                return h("span","已撤销")
                            }else if(params.row.status == "4"){
                                return  h('span', "部分成交撤销");
                            }
                        }
                    })
            }
            if(this.active_tab == "wtls"){
                this.order_record_cloumns.push({
                    title: "状态",
                    key: 'status',
                    render: (h,params) =>{
                        // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
                        if(params.row.status == "1"){
                            return h("span","已成交")
                        }else if(params.row.status == "3" || params.row.status == "0"){
                            return  h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                click: () => {
                                                    this.show(params.row)
                                                }
                                            }
                                        }, '撤销')
                                    ]);
                        }else if(params.row.status == "2"){
                            return h("span","已撤销")
                        }else if(params.row.status == "4"){
                            return  h('span', "部分成交撤销");
                        }
                    }
                })
            }
            if(this.active_tab == "jyjl"){
            }
        },
        show(row){//撤单
            console.log(row);
            let that= this;
            this.$Modal.confirm({
                title: '温馨提示',
                content: '<p>是否确认撤销？</p>',
                onOk: () => {
                console.log("onOK")
                    that.$ajax({
                        method: "post",
                        url:"/trade/tps/pbceo.do",
                        data:{
                            "id":row.tradeid,
                            "reqresource":"1"
                        }
                    }).then((res)=>{
                        if (res.status == 200 && res.data && res.data.err_code == '1') {
                            setTimeout(() => {
                                that.$Notice.success({
                                    title:"提示",
                                    desc: "撤单成功"
                                })
                            },30)
                            that.query_entrust();
                            this.getBalance(this.jijiabizhong);
                            this.getBalance(this.jichubizhong);
                        }else {
                            setTimeout(() => {
                                that.$Notice.error({
                                    title:"提示",
                                    desc: "撤单失败"
                                })
                            },30)
                        }
                    })
                    
                    
                }
            });
        },
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
                                that.active_tab='wtcd';
                                that.query_entrust();
                                that.getBalance(this.jijiabizhong);
                                that.newPrice();
                                that.tradepwd ="";
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
                                that.active_tab='wtcd';
                                that.query_entrust();
                                that.getBalance(this.jichubizhong);
                                that.newPrice();
                                that.tradepwd ="";
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
                // this.$Notice.error({
                //     desc: "买入价能为空，且必须大于零。"
                // })
                return false;
            }
            
        },
        inputBuyPrice(e,priceType){
            var value = e.target.value;
            var oldValue = this[priceType+'_'];
            // console.log('oldvalue',oldValue,this);
            if(priceType=="count" || priceType == "count1"){
                if (!value) {
                    this[priceType] = '';
                    this[priceType+'_'] = '';
                }else {
                    if (regs.test(value)) {
                        this[priceType] = value;
                        this[priceType+'_'] = value;
                    }else {
                        value = value.slice(0,-1);
                        var matched = value.match(regs);
                        if (matched && matched.length) {
                            this[priceType] = matched[0];
                            this[priceType+'_'] = matched[0];
                        }else {
                            if (regs.test(oldValue)) {
                                this[priceType] = oldValue;
                            }else {
                                this[priceType]  = '';
                            }
                        }
                    }
                }
            }else{
                if (!value) {
                    this[priceType] = '';
                    this[priceType+'_'] = '';
                }else {
                    if (reg.test(value)) {
                        this[priceType] = value;
                        this[priceType+'_'] = value;
                    }else {
                        value = value.slice(0,-1);
                        var matched = value.match(reg);
                        if (matched && matched.length) {
                            this[priceType] = matched[0];
                            this[priceType+'_'] = matched[0];
                        }else {
                            if (reg.test(oldValue)) {
                                this[priceType] = oldValue;
                            }else {
                                this[priceType]  = '';
                            }
                        }
                    }
                }
            }
            
        },
        inputBlur(e,type){
            var value = this[type];
            var len = value.length;
            if (value.indexOf('.') === len - 1) {
                this[type] = value.slice(0,len - 1);
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
                           that.jichu_keyong = Number(res.data.accountFund[0].usablefund).toFixed(10);
                           that.jichu_dongjie = Number(res.data.accountFund[0].frozenfund).toFixed(10);
                       }else{
                           that.jijia_keyong = Number(res.data.accountFund[0].usablefund).toFixed(10);
                           that.jijia_dongjie = Number(res.data.accountFund[0].frozenfund).toFixed(10);
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
        dbclick (row,index) {
            if(row.operate == "2"){
                this.count =  Number(row.count);
                this.price =  Number(row.price);
                this.buy_sell="buy";
            }else{
                this.count1 =  Number(row.count);
                this.price1 =  Number(row.price);
                this.buy_sell="sell";

            }
        },
    }
}
    
</script>

<style lang="scss">
    .quotation{
        min-width:1440px;
        // margin-top:80px;
        background:#222222;
        .title{
            width:390px;
            height:80px;
            position: absolute;
            top:0;
            right:240px;
            z-index: 1000;
            background: #222;
            .title_hq{
                float: left;
                text-align: center;
                height:80px;
                border-right:1px solid #000;
                .news_p{
                    padding-top:20px;
                    height:40px;
                    font-size:12px;
                    vertical-align: bottom;
                    color:#586c86;
                }
            }
            .bod_left{
                border-left:1px solid #000;
            }
            
            .select_usd{
                height: 80px;
                color:#08b3ff;
                font-size:16px;
                
                .ivu-select-selection{
                    height:80px;
                    background: none;
                    border:none;
                    .ivu-select-placeholder{
                        height:80px;
                        line-height: 80px;
                        font-size:16px;
                    }
                    .ivu-select-selected-value{
                        height: 80px;
                        line-height:80px;
                        color:#08b3ff;
                        font-size:16px;
                    }
                    .ivu-select-arrow{
                        color:#08b3ff;
                    }
                }
            }
            .ivu-select:focus .ivu-select-selection {
                border:none;
                outline: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
            }
            .ivu-select-visible .ivu-select-selection {
                border:none;
                outline: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
            }
        }
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
                cursor: default;
            }
            .table_qt{
                background:#2a2a2a;
                box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
                width:100%;
                height:54px;
                .db_table{
                    text-align: center;
                    font-size:16px;
                    font-weight:600;
                    line-height: 54px;
                    color:#1e9900;
                }
                
                .rose{
                    font-size:20px;
                    // text-align: left;
                    // padding-left:5px;
                }
            }
            .buy_sell{
                width:100%;
                height:250px;
                background: #272626;
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
        .weituo{
            .ivu-table-header{
                width:100%;
               
            }
            .ivu-table{
                table{
                    width:100% !important;
                }
                .ivu-table-tip{
                    width: 100%;
                }
            }
            .ivu-table td{
                background: #222222;
            }
            .ivu-table:after{
                width:0px;
            }
            .ivu-table-wrapper{
                border:none;
            }
            .dark-mode .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
                background: #2a2a2a;
            }
            .ivu-tabs-bar{
                margin-bottom: 0px;
                border-bottom: none;
                box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
                background: #2a2a2a;
                .ivu-tabs-nav-container{
                    font-size: 16px;
                }
                
                .ivu-tabs-nav{
                    width:100%;
                    .ivu-tabs-ink-bar{
                        display: none !important;
                    }
                    .ivu-tabs-tab{
                        width:100px;
                        text-align: center;
                        padding:25px 16px;
                        color: #586c86;
                        font-weight:400;
                    }
                    .ivu-tabs-tab-active{
                        color: #fff;
                    }
                }
            }
            .wwj{
                .ivu-table-tbody .ivu-table-cell{
                    color:#fff;
                }
                .dark-mode .ivu-table th {
                    background: #222222;
                    color: #596980;
                    border-bottom: 0px;
                    height: 70px;
                }
            }
            .list_jyls{
                .dark-mode .ivu-table th {
                    background: #222222;
                    color: #596980;
                    border-bottom: 0px;
                    height: 50px;
                }
                .ivu-table-body{
                    background: #222222;
                }
                .right_scroll{
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
                }
            }

            
        }
    }
</style>
