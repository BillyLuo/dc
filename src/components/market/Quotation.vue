<template>
    <div class="quotation">
        <div class="title">
            <div class="title_hq bod_left"  style="width:125px;">
                <p class="news_p">最新价</p>
                <span :style="zhangfu <=0 ?'color:#e55541;':'color:#1e9900;'">{{ news_price }}</span>
            </div>
            <div class="title_hq" style="width:125px;">
                <p class="news_p">24h涨跌</p>
                <span :style="zhangfu <=0 ?'color:#e55541;':'color:#1e9900;'">{{zhangfu +'%'}} <Icon :type="zhangfu > 0 ? 'arrow-up-a' :'arrow-down-a'"/></span>
            </div>
            <div class="title_hq" style="width:140px;">
                <Select class="select_usd" style="width:138px" v-model="model" @on-change="selectbi">
                    <Option v-for="item in data" :value="item.currencyname" :key="item.currencyname">{{ item.currencyname+"/"+item.tradecurrency }}</Option>
                </Select>
            </div>
        </div>
        <Row class="qt_right">
            <Col span="18">
                <!-- <div id="chart"> </div> -->
                <div id="tv_chart_container"></div>
            </Col>
            <Col span="6">
                <Table class="right-list"  @on-row-click="dbclick" :columns="columns1" :data="data1"></Table>
                <div class="table_qt">
                    <Col class="db_table" span="6">
                        <span :style="zhangfu <=0 ?'color:#e55541;':'color:#1e9900;'">{{ news_price }}</span>
                    </Col>
                    <Col class="db_table rose" span="12">
                        <span :style="zhangfu <=0 ?'color:#e55541;':'color:#1e9900;'">{{ zhangfu +"%" }} <Icon :type="zhangfu > 0 ? 'arrow-up-a' :'arrow-down-a'"/></span>
                    </Col>
                    <Col class="db_table" span="6" style="height:100%;">
                        <span :style="zhangfu <=0 ?'color:#e55541;':'color:#1e9900;'"> </span>
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
import {Tabs,TabPane,Table,Form,FormItem,Slider} from 'iview';
var Big = require('big.js');
import {BigNumber} from 'bignumber.js';
import { mapState } from "vuex";
    let widget;
    let buttonArr = [
      {
        value: "1F",
        period: "1Min",
        text: "分时",
      },
      {
        value: "1",
        period: "Min",
        text: "1min",
        select:false,
      },
      {
        value: "5",
        period: "5Min",
        text: "5min",
        select:false,
      },
      {
        value: "15",
        period: "15Min",
        text: "15min",
        select:true,
      },
      {
        value: "30",
        period: "30Min",
        text: "30min",
        select:false,
      },
      {
        value: "60",
        period: "1H",
        text: "1hour",
        select:false,
      },
      {
        value: "120",
        period: "2H",
        text: "2hour",
        select:false,
      },
      {
        value: "240",
        period: "4H",
        text: "4hour",
        select:false,
      },
      {
        value: "360",
        period: "6H",
        text: "6hour",
        select:false,
      },
      {
        value: "720",
        period: "12H",
        text: "12hour",
        select:false,
      },
      {
        value: "1D",
        period: "1D",
        text: "日线",
        select:false,
      },
      {
        value: "1W",
        period: "1W",
        text: "周线",
        select:false,
      },
      {
        value: "1M",
        period: "1M",
        text: "月线",
        select:false,
      }
    ]
    var numReg = function (m,n) {
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
                    width:"80",
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
                            return  h("span",params.row.price)
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
                            return  h("span",params.row.count)
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
            datas2:[],
            time_type:"15Min"
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
                // var price = new BigNumber(this.price*this.count*1.002);
                let x = new BigNumber(this.price)
                let y = x.multipliedBy(this.count)
                let z = y.multipliedBy(1.002)
                // console.log(x.toFixed(10)+'----'+y.toFixed(10)+'-----'+z.toFixed(10))
                // console.log(price.times(this.count*1.002))
                // var ss = new BigNumber(this.price*this.count*1.002)
                return z.toFormat(10);
            }
        },
        sellmoney(){
            if(this.price1 > 0 && this.count1 > 0){
                var price1 = new BigNumber(this.price1*this.count1*0.998);
                let a = new BigNumber(this.price1)
                let b = a.multipliedBy(this.count1)
                let c = b.multipliedBy(0.998)
                return c.toFormat(10);
            }
        },
    },
    mounted(){
        this.tradingViewGetReady();
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
        // tradeView准备
        tradingViewGetReady() {
            let s5,s10,s15,s20;
            let that = this;
            let Datafeed = that.datafeeds();
            TradingView.onready((() => {
                widget = window.widget = new TradingView.widget({
                    debug:false,
                    fullscreen: false,
                    // autosize:true,
                    width:"100%",
                    height:"660px",
                    symbol: this.jichubizhong+this.jijiabizhong,
                    interval:'15',
                    container_id: "tv_chart_container",
                    //	BEWARE: no trailing slash is expected in feed URL
                    datafeed: new Datafeed.UDFCompatibleDatafeed("http://localhost:8080",{jichubizhong:that.jichubizhong,jijiabizhong:that.jijiabizhong,timetype:that.time_type},180000), //that.chartinit(),
                    toolbar_bg: "#181b2b",
                    library_path: "static/charting_library/charting_library/",
                    locale: "zh",
                    drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
                    // charts_storage_url: 'http://saveload.tradingview.com',
                    charts_storage_api_version: "1.1",
                    client_id: 'tradingview.com',
                    user_id: 'public_user_id',
                    loading_screen: { backgroundColor: "#181b2b",foregroundColor:"#fff"},
                    disabled_features: [
                        "header_symbol_search",
                        "header_compare",
                        'header_undo_redo',
                        "caption_buttons_text_if_possible",
                        "adaptive_logo",
                        "main_series_scale_menu",
                        "go_to_date",
                        "show_dom_first_time",
                        "header_interval_dialog_button",
                        "header_screenshot",
                        "hide_chart_type",
                        "header_resolutions",
                        "header_chart_type",
                        "symbol_search_hot_key",
                        "header_saveload",
                        "go_to_date",
                        "timeframes_toolbar",
                        "volume_force_overlay"
                    ],
                    enabled_features: [
                        'dont_show_boolean_study_arguments',
                        "use_localstorage_for_settings",
                        "remove_library_container_border",//tv-close-panel top
                    ],
                    drawings_access: {
                        type: 'black',
                        tools: [{name: "Regression Trend"}],//todo: moje
                        tools: [
                            {name: "Trend Line", grayed: true},
                            {name: "Trend Angle", grayed: true}
                        ] //todo: bb
                    },
                    overrides: {
                        // "volumePaneSize": "medium",
                        "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
                        "paneProperties.background": "#181b2b",
                        "paneProperties.vertGridProperties.color": "rgba(100, 100, 100, 0.1)",
                        "paneProperties.horzGridProperties.color": "rgba(100, 100, 100, 0.1)",
                        "paneProperties.crossHairProperties.color": "#ccc",
                        "paneProperties.topMargin": 15,
                        "paneProperties.bottomMargin": 0,
                        "scalesProperties.lineColor ": "#ccc",
                        "scalesProperties.textColor" : "#ccc",
                        "paneProperties.legendProperties.showLegend": false,
					    "scalesProperties.showLeftScale":false,
                    },
                    studies_overrides: {
                        "volume.show ma": true
                    },
                    custom_css_url: 'chart.css'
                });

                widget.onChartReady(() => {
                    let handleClick = (e, value,pre) => {
                        // console.log(widget.chart())
                        if(value == "1F"){
                            widget.chart().setChartType(3)
                            widget.chart().setResolution(value,function(){});
                            widget.chart().getStudyById(s5).setVisible(false)
                            widget.chart().getStudyById(s10).setVisible(false)
                            widget.chart().getStudyById(s15).setVisible(false)
                            widget.chart().getStudyById(s20).setVisible(false)

                        }else{
                            widget.chart().setChartType(1)
                            widget.chart().setResolution(value,function(){});
                            widget.chart().getStudyById(s5).setVisible(true)
                            widget.chart().getStudyById(s10).setVisible(true)
                            widget.chart().getStudyById(s15).setVisible(true)
                            widget.chart().getStudyById(s20).setVisible(true)
                        }
                        console.log(pre)
                        that.time_type = pre;
                        widget.chart().resetData()
                        $(e.target).addClass('select').closest('div.space-single').siblings('div.space-single').find('div.button').removeClass('select');
                    }
                    buttonArr.forEach((item,index)=>{
                        let button = widget.createButton()
                        button.parent().attr("style",'float:left')
                        button.addClass(item.select?"select time_button_header":'time_button_header')
                        .attr("style","background:none;border:none;color:#68696b;")
                        .html("<span>"+item.text+"</span>")
                        .on('click', function (e) {
                            handleClick(e,item.value,item.period);
                        })
                    })
                    s5 = widget.chart().createStudy("Moving Average",false,false,[5],null,{"plot.color":'#07bd7f'});
                    s10 = widget.chart().createStudy("Moving Average",false,false,[10],null,{"plot.color":'#540483'});
                    s15 = widget.chart().createStudy("Moving Average",false,false,[30],null,{"plot.color":'#3d85e6'});
                    s20 = widget.chart().createStudy("Moving Average",false,false,[60],null,{"plot.color":'#e5416b'});
                })
            })());
        },
        datafeeds(){
            "use strict";
            /*
                This class implements interaction with UDF-compatible datafeed.

                See UDF protocol reference at
                https://github.com/tradingview/charting_library/wiki/UDF
            */
            // import axios from 'axios';
            let that_vue =this;
            var Datafeeds = {};

            Datafeeds.UDFCompatibleDatafeed = function(datafeedURL,data_info, updateFrequency, protocolVersion) {
                
                this._datafeedURL = datafeedURL;
                this._configuration = undefined;

                this._symbolSearch = null;
                this._symbolsStorage = null;
                this._barsPulseUpdater = new Datafeeds.DataPulseUpdater(this, updateFrequency || 10 * 1000);
                this._quotesPulseUpdater = new Datafeeds.QuotesPulseUpdater(this);
                this._protocolVersion = protocolVersion || 2;

                this._enableLogging = false;
                this._initializationFinished = false;
                this._callbacks = {};
                this.data_info = data_info;
                this._initialize();
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.defaultConfiguration = function() {
                return {
                    supports_search: false,
                    supports_group_request: false,
                    supported_resolutions: ['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M'],
                    supports_marks: false,
                    supports_timescale_marks: false,
                    exchanges: ['COODEX'],
                    supports_time:false
                };
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.getServerTime = function(callback) {
                // if (this._configuration.supports_time) {
                // 	this._send(this._datafeedURL + "/time", {})
                // 		.done(function (response) {
                // 			callback(+response);
                // 		})
                // 		.fail(function() {

                // 		});
                // }
                callback(new Date().getTime())
                console.log(new Date().getTime())
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.on = function (event, callback) {

                if (!this._callbacks.hasOwnProperty(event)) {
                    this._callbacks[event] = [];
                }

                this._callbacks[event].push(callback);
                return this;
            };


            Datafeeds.UDFCompatibleDatafeed.prototype._fireEvent = function(event, argument) {
                if (this._callbacks.hasOwnProperty(event)) {
                    var callbacksChain = this._callbacks[event];
                    for (var i = 0; i < callbacksChain.length; ++i) {
                        callbacksChain[i](argument);
                    }
                    this._callbacks[event] = [];
                }
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.onInitialized = function() {
                this._initializationFinished = true;
                this._fireEvent("initialized");
            };



            Datafeeds.UDFCompatibleDatafeed.prototype._logMessage = function(message) {
                if (this._enableLogging) {
                    var now = new Date();
                    console.log(now.toLocaleTimeString() + "." + now.getMilliseconds() + "> " + message);
                }
            };


            Datafeeds.UDFCompatibleDatafeed.prototype._send = function(url, params) {
                var request = url;
                if (params) {
                    for (var i = 0; i < Object.keys(params).length; ++i) {
                        var key = Object.keys(params)[i];
                        var value = encodeURIComponent(params[key]);
                        request += (i === 0 ? "?" : "&") + key + "=" + value;
                    }
                }

                this._logMessage("New request: " + request);

                return $.ajax({
                    type: 'GET',
                    url: request,
                    contentType: 'text/plain'
                });
            };

            Datafeeds.UDFCompatibleDatafeed.prototype._initialize = function() {

                var that = this;
                that._setupWithConfiguration(
                    {"supports_search":true,
                    "supports_group_request":false,
                    "supports_marks":false,
                    "supports_timescale_marks":false,
                    "supports_time":true,
                    "exchanges":[],
                    "supportedResolutions":['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M']}
                );
                // this._send(this._datafeedURL + "/config")
                // 	.done(function(response) {
                // 		var configurationData = JSON.parse(response);
                // 		that._setupWithConfiguration(configurationData);
                // 	})
                // 	.fail(function(reason) {
                // 		that._setupWithConfiguration(that.defaultConfiguration());
                // 	});
            };


            Datafeeds.UDFCompatibleDatafeed.prototype.onReady = function(callback) {
                
                if (this._configuration) {
                    let taht = this;
                    setTimeout(function(){
                        callback(taht._configuration);
                    },0)
                }
                else {
                    var that = this;
                    this.on("configuration_ready", function() {
                        setTimeout(function(){
                            callback(taht._configuration);
                        },0)
                    });
                }
            };

            Datafeeds.UDFCompatibleDatafeed.prototype._setupWithConfiguration = function(configurationData) {
                this._configuration = configurationData;

                if (!configurationData.exchanges) {
                    configurationData.exchanges = [];
                }

                //	@obsolete; remove in 1.5
                var supportedResolutions = configurationData.supported_resolutions || configurationData.supportedResolutions;
                configurationData.supported_resolutions = supportedResolutions;

                //	@obsolete; remove in 1.5
                var symbolsTypes = configurationData.symbols_types || configurationData.symbolsTypes;
                configurationData.symbols_types = symbolsTypes;

                if (!configurationData.supports_search && !configurationData.supports_group_request) {
                    throw "Unsupported datafeed configuration. Must either support search, or support group request";
                }

                if (!configurationData.supports_search) {
                    this._symbolSearch = new Datafeeds.SymbolSearchComponent(this);
                }

                if (configurationData.supports_group_request) {
                    //	this component will call onInitialized() by itself
                    this._symbolsStorage = new Datafeeds.SymbolsStorage(this);
                }
                else {
                    this.onInitialized();
                }

                this._fireEvent("configuration_ready");
                this._logMessage("Initialized with " + JSON.stringify(configurationData));
            };


            //	===============================================================================================================================
            //	The functions set below is the implementation of JavaScript API.

            Datafeeds.UDFCompatibleDatafeed.prototype.getMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
                if (this._configuration.supports_marks) {
                    // onDataCallback({"id":[0,1,2,3,4,5],
                    // "time":[1455148800,1455235200,1454976000,1454976000,1454284800,1452988800],
                    // "color":["red","blue","green","red","blue","green"],
                    // "text":["今天1",
                    //   "测试2",
                    //   "测试3",
                    //   "测试4",
                    //   "测试5",
                    //   "测试6"],
                    //   "label":["A",
                    // 	"B",
                    // 	"CORE",
                    // 	"D",
                    // 	"EURO",
                    // 	"F"],
                    // 	"labelFontColor":["white",
                    // 	  "white",
                    // 	  "red",
                    // 	  "#FFFFFF",
                    // 	  "white",
                    // 	  "#000"],
                    // 	  "minSize":[14,28,7,40,7,14]})
                    // this._send(this._datafeedURL + "/marks", {
                    // 		symbol: symbolInfo.ticker.toUpperCase(),
                    // 		from : rangeStart,
                    // 		to: rangeEnd,
                    // 		resolution: resolution
                    // 	})
                    // 	.done(function (response) {
                    // 		onDataCallback(JSON.parse(response));
                    // 	})
                    // 	.fail(function() {
                    // 		onDataCallback([]);
                    // 	});
                }
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.getTimescaleMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
                if (this._configuration.supports_timescale_marks) {
                    // onDataCallback([{"id":"tsm1",
                    // "time":1455580800,
                    // "color":"red",
                    // "label":"A",
                    // "tooltip":""},
                    // {"id":"tsm2",
                    //   "time":1455235200,
                    //   "color":"blue",
                    //   "label":"D",
                    //   "tooltip":["Dividends: $0.56","Date: Fri Feb 12 2016这是测试数据"]},
                    //   {"id":"tsm3",
                    // 	"time":1454976000,
                    // 	"color":"green",
                    // 	"label":"D",
                    // 	"tooltip":["Dividends: $3.46","Date: Tue Feb 09 2016"]},
                    // 	{"id":"tsm4",
                    // 	  "time":1454284800,
                    // 	  "color":"#999999",
                    // 	  "label":"E",
                    // 	  "tooltip":["Earnings: $3.44","Estimate: $3.60"]},
                    // 	  {"id":"tsm7",
                    // 		"time":1452988800,
                    // 		"color":"red",
                    // 		"label":"E",
                    // 		"tooltip":["Earnings: $5.40","Estimate: $5.00"]}])
                    // this._send(this._datafeedURL + "/timescale_marks", {
                    // 	symbol: symbolInfo.ticker.toUpperCase(),
                    // 	from : rangeStart,
                    // 	to: rangeEnd,
                    // 	resolution: resolution
                    // })
                    // 	.done(function (response) {
                    // 		onDataCallback(JSON.parse(response));
                    // 	})
                    // 	.fail(function() {
                    // 		onDataCallback([]);
                    // 	});
                }
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.searchSymbolsByName = function(ticker, exchange, type, onResultReadyCallback) {
                var MAX_SEARCH_RESULTS = 30;

                if (!this._configuration) {
                    onResultReadyCallback([]);
                    return;
                }

                if (this._configuration.supports_search) {

                    this._send(this._datafeedURL + "/search", {
                            limit: MAX_SEARCH_RESULTS,
                            query: ticker.toUpperCase(),
                            type: type,
                            exchange: exchange
                        })
                        .done(function (response) {
                            var data = JSON.parse(response);

                            for (var i = 0; i < data.length; ++i) {
                                if (!data[i].params) {
                                    data[i].params = [];
                                }
                            }

                            if (typeof data.s == "undefined" || data.s != "error") {
                                onResultReadyCallback(data);
                            }
                            else {
                                onResultReadyCallback([]);
                            }

                        })
                        .fail(function(reason) {
                            onResultReadyCallback([]);
                        });
                }
                else {

                    if (!this._symbolSearch) {
                        throw "Datafeed error: inconsistent configuration (symbol search)";
                    }

                    var searchArgument = {
                        ticker: ticker,
                        exchange: exchange,
                        type: type,
                        onResultReadyCallback: onResultReadyCallback
                    };

                    if (this._initializationFinished) {
                        this._symbolSearch.searchSymbolsByName(searchArgument, MAX_SEARCH_RESULTS);
                    }
                    else {

                        var that = this;

                        this.on("initialized", function() {
                            that._symbolSearch.searchSymbolsByName(searchArgument, MAX_SEARCH_RESULTS);
                        });
                    }
                }
            };


            Datafeeds.UDFCompatibleDatafeed.prototype._symbolResolveURL = "/symbols";


            //	BEWARE: this function does not consider symbol's exchange
            Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
                console.log(symbolName)
                var that = this;
                setTimeout(function(){
                    if (!that._initializationFinished) {
                        thithats.on("initialized", function() {
                            that.resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback);
                        });

                        return;
                    }

                    var resolveRequestStartTime = Date.now();
                    that._logMessage("Resolve requested");

                    function onResultReady(data) {
                        var postProcessedData = data;
                        if (that.postProcessSymbolInfo) {
                            postProcessedData = that.postProcessSymbolInfo(postProcessedData);
                        }

                        that._logMessage("Symbol resolved: " + (Date.now() - resolveRequestStartTime));

                        onSymbolResolvedCallback(postProcessedData);
                    }

                    if (!that._configuration.supports_group_request) {
                        
                        onResultReady({
                            "name":that.data_info.jichubizhong + that.data_info.jijiabizhong,
                            "exchange-traded":"COODEX",
                            "exchange-listed":"COODEX",
                            "timezone":"Asia/Shanghai",
                            "minmov":1,
                            "minmov2":0,
                            "pricescale":10000,
                            "pointvalue":1,
                            "session": "24x7",
                            "has_intraday":true,
                            "has_no_volume":false,
                            "has_weekly_and_monthly": true,
                            "ticker":"COODEX",
                            "description":that.data_info.jichubizhong + that.data_info.jijiabizhong,
                            "type":"stock",
                            "regular_session": "24x7",
                            "supported_resolutions":['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M']}
                    );
                        // this._send(this._datafeedURL + this._symbolResolveURL, {
                        // 		symbol: symbolName ? symbolName.toUpperCase() : ""
                        // 	})
                        // 	.done(function (response) {
                        // 		var data = JSON.parse(response);

                        // 		if (data.s && data.s != "ok") {
                        // 			onResolveErrorCallback("unknown_symbol");
                        // 		}
                        // 		else {
                        // 			onResultReady(data);
                        // 		}
                        // 	})
                        // 	.fail(function(reason) {
                        // 		that._logMessage("Error resolving symbol: " + JSON.stringify([reason]));
                        // 		onResolveErrorCallback("unknown_symbol");
                        // 	});
                    }
                    else {
                        if (that._initializationFinished) {
                            that._symbolsStorage.resolveSymbol(symbolName, onResultReady, onResolveErrorCallback);
                        }
                        else {
                            that.on("initialized", function() {
                                that._symbolsStorage.resolveSymbol(symbolName, onResultReady, onResolveErrorCallback);
                            });
                        }
                    }
                },0)
                
            };


            Datafeeds.UDFCompatibleDatafeed.prototype._historyURL = "/history";

            Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {

            console.log("========rangeStartDate"+rangeStartDate+"---------------rangeEndDate"+rangeEndDate)
                //	timestamp sample: 1399939200
                if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
                    throw ["Got a JS time instead of Unix one.", rangeStartDate, rangeEndDate];
                }

                var that = this;
                console.log(that)

                var requestStartTime = Date.now();
                console.log(rangeStartDate,rangeEndDate)
                let ss = new Date(rangeStartDate*1000);
                let aa = new Date(rangeEndDate*1000);
                that_vue.$ajax({
                    method:"post",
                    url:"/trade/tps/pbklin.do",
                    data:{
                        coin :that.data_info.jichubizhong,//币种
                        tradecoin:that.data_info.jijiabizhong,//交易币种
                        //klinetime: "1",
                        timetype:that_vue.time_type,
                        starttime:ss.getFullYear()+'-'+(ss.getMonth()+1)+'-'+ss.getDate()+" "+ss.getHours()+':'+ss.getMinutes()+':'+ss.getSeconds(),
                        endtime:aa.getFullYear()+'-'+(aa.getMonth()+1)+'-'+aa.getDate()+" "+aa.getHours()+':'+aa.getMinutes()+':'+aa.getSeconds(),
                    }
                })
                .then((data)=>{
                    console.log(data)
                    var nodata="";
                    if(data && data.data && data.data.err_code){
                        console.log("-----")
                        if(data.data.err_code != "1"){
                            nodata = false ;
                        }else{
                            if( !data.data.kline || data.data.kline.lenght == 0){
                                nodata = true;
                            }
                        }
                        
                        console.log(nodata)
                        if (data.data.err_code != "1" && !nodata) {
                            if (!!onErrorCallback) {
                                onErrorCallback(data.data.err_code != "1"?"no_date":"ok");
                            }
                            return;
                        }

                        var bars = [];
                        var barsCount = nodata ? 0 : data.data.kline.length;
                        console.log(barsCount)
                        // var volumePresent = typeof data.v != "undefined";
                        // var ohlPresent = typeof data.o != "undefined";
                        
                        for (var i = 0; i < barsCount; ++i) {
                            
                            var barValue = {
                                // time: data.data.kline[i].klinetime,
                                time: Number(data.data.kline[i].klinetime),
                                close: Number(data.data.kline[i].close),
                                open : Number(data.data.kline[i].open),
                                high : Number(data.data.kline[i].high),
                                low : Number(data.data.kline[i].low),
                                volume : Number(data.data.kline[i].volume)
                            };

                            // if (ohlPresent) {
                            // 	barValue.open = data.o[i];
                            // 	barValue.high = data.h[i];
                            // 	barValue.low = data.l[i];
                            // }
                            // else {
                            // 	barValue.open = barValue.high = barValue.low = barValue.close;
                            // }

                            // if (volumePresent) {
                            // 	barValue.volume = data.v[i];
                            // }

                            bars.push(barValue);
                        }
                        console.log(bars)
                        
                    }else{
                        nodata = true;
                    }
                    onDataCallback(bars, {version: that._protocolVersion, noData: nodata});
                })
                .catch((arg)=>{
                    console.warn(["getBars(): HTTP error", arg]);
                    if (!!onErrorCallback) {
                        onErrorCallback("network error: " + JSON.stringify(arg));
                    }
                })
                // this._send(this._datafeedURL + this._historyURL, {
                // 		symbol: symbolInfo.ticker.toUpperCase(),
                // 		resolution: resolution,
                // 		from: rangeStartDate,
                // 		to: rangeEndDate
                // })
                // .done(function (response) {

                                // var nodata = data.s == "no_data";

                                // if (data.s != "ok" && !nodata) {
                                // 	if (!!onErrorCallback) {
                                // 		onErrorCallback(data.s);
                                // 	}
                                // 	return;
                                // }

                                // var bars = [];

                                // //	data is JSON having format {s: "status" (ok, no_data, error),
                                // //  v: [volumes], t: [times], o: [opens], h: [highs], l: [lows], c:[closes], nb: "optional_unixtime_if_no_data"}
                                // var barsCount = nodata ? 0 : data.t.length;

                                // var volumePresent = typeof data.v != "undefined";
                                // var ohlPresent = typeof data.o != "undefined";

                                // for (var i = 0; i < barsCount; ++i) {

                                // 	var barValue = {
                                // 		time: data.t[i] * 1000,
                                // 		close: data.c[i]
                                // 	};

                                // 	if (ohlPresent) {
                                // 		barValue.open = data.o[i];
                                // 		barValue.high = data.h[i];
                                // 		barValue.low = data.l[i];
                                // 	}
                                // 	else {
                                // 		barValue.open = barValue.high = barValue.low = barValue.close;
                                // 	}

                                // 	if (volumePresent) {
                                // 		barValue.volume = data.v[i];
                                // 	}

                                // 	bars.push(barValue);
                                // }
                                // console.log(bars)
                                
                                // onDataCallback(bars, {version: that._protocolVersion, noData: nodata, nextTime: data.nb || data.nextTime});
                // })
                // .fail(function (arg) {
                // 	console.warn(["getBars(): HTTP error", arg]);

                // 	if (!!onErrorCallback) {
                // 		onErrorCallback("network error: " + JSON.stringify(arg));
                // 	}
                // });
            };


            Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID) {
                this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID);
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeBars = function(listenerGUID) {
                this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.calculateHistoryDepth = function(period, resolutionBack, intervalBack) {
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.getQuotes = function(symbols, onDataCallback, onErrorCallback) {
                this._send(this._datafeedURL + "/quotes", { symbols: symbols })
                    .done(function (response) {
                        var data = JSON.parse(response);
                        if (data.s == "ok") {
                            //	JSON format is {s: "status", [{s: "symbol_status", n: "symbol_name", v: {"field1": "value1", "field2": "value2", ..., "fieldN": "valueN"}}]}
                            if (onDataCallback) {
                                onDataCallback(data.d);
                            }
                        } else {
                            if (onErrorCallback) {
                                onErrorCallback(data.errmsg);
                            }
                        }
                    })
                    .fail(function (arg) {
                        if (onErrorCallback) {
                            onErrorCallback("network error: " + arg);
                        }
                    });
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.subscribeQuotes = function(symbols, fastSymbols, onRealtimeCallback, listenerGUID) {
                this._quotesPulseUpdater.subscribeDataListener(symbols, fastSymbols, onRealtimeCallback, listenerGUID);
            };

            Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeQuotes = function(listenerGUID) {
                this._quotesPulseUpdater.unsubscribeDataListener(listenerGUID);
            };

            //	==================================================================================================================================================
            //	==================================================================================================================================================
            //	==================================================================================================================================================

            /*
                It's a symbol storage component for ExternalDatafeed. This component can
                * interact to UDF-compatible datafeed which supports whole group info requesting
                * do symbol resolving -- return symbol info by its name
            */
            Datafeeds.SymbolsStorage = function(datafeed) {
                this._datafeed = datafeed;

                this._exchangesList = ["NYSE", "FOREX", "AMEX"];
                this._exchangesWaitingForData = {};
                this._exchangesDataCache = {};

                this._symbolsInfo = {};
                this._symbolsList = [];

                this._requestFullSymbolsList();
            };



            Datafeeds.SymbolsStorage.prototype._requestFullSymbolsList = function() {

                var that = this;
                var datafeed = this._datafeed;

                for (var i = 0; i < this._exchangesList.length; ++i) {

                    var exchange = this._exchangesList[i];

                    if (this._exchangesDataCache.hasOwnProperty(exchange)) {
                        continue;
                    }

                    this._exchangesDataCache[exchange] = true;

                    this._exchangesWaitingForData[exchange] = "waiting_for_data";

                    this._datafeed._send(this._datafeed._datafeedURL + "/symbol_info", {
                            group: exchange
                        })
                        .done(function(exchange) {
                            return function(response) {
                                that._onExchangeDataReceived(exchange, JSON.parse(response));
                                that._onAnyExchangeResponseReceived(exchange);
                            };
                        }(exchange)) //jshint ignore:line
                        .fail(function(exchange) {
                            return function (reason) {
                                that._onAnyExchangeResponseReceived(exchange);
                            };
                        }(exchange)); //jshint ignore:line
                }
            };



            Datafeeds.SymbolsStorage.prototype._onExchangeDataReceived = function(exchangeName, data) {

                function tableField(data, name, index) {
                    return data[name] instanceof Array ?
                        data[name][index] :
                        data[name];
                }

                try
                {
                    for (var symbolIndex = 0; symbolIndex < data.symbol.length; ++symbolIndex) {

                        var symbolName = data.symbol[symbolIndex];
                        var listedExchange = tableField(data, "exchange-listed", symbolIndex);
                        var tradedExchange = tableField(data, "exchange-traded", symbolIndex);
                        var fullName = tradedExchange + ":" + symbolName;

                        //	This feature support is not implemented yet
                        //	var hasDWM = tableField(data, "has-dwm", symbolIndex);

                        var hasIntraday = tableField(data, "has-intraday", symbolIndex);

                        var tickerPresent = typeof data.ticker != "undefined";

                        var symbolInfo = {
                            name: symbolName,
                            base_name: [listedExchange + ":" + symbolName],
                            description: tableField(data, "description", symbolIndex),
                            full_name: fullName,
                            legs: [fullName],
                            has_intraday: hasIntraday,
                            has_no_volume: tableField(data, "has-no-volume", symbolIndex),
                            listed_exchange: listedExchange,
                            exchange: tradedExchange,
                            minmov: tableField(data, "minmovement", symbolIndex) || tableField(data, "minmov", symbolIndex) ,
                            minmove2: tableField(data, "minmove2", symbolIndex) || tableField(data, "minmov2", symbolIndex) ,
                            fractional: tableField(data, "fractional", symbolIndex),
                            pointvalue: tableField(data, "pointvalue", symbolIndex),
                            pricescale: tableField(data, "pricescale", symbolIndex),
                            type: tableField(data, "type", symbolIndex),
                            session: tableField(data, "session-regular", symbolIndex),
                            ticker: tickerPresent ? tableField(data, "ticker", symbolIndex) : symbolName,
                            timezone: tableField(data, "timezone", symbolIndex),
                            supported_resolutions: tableField(data, "supported-resolutions", symbolIndex) || this._datafeed.defaultConfiguration().supported_resolutions,
                            force_session_rebuild: tableField(data, "force-session-rebuild", symbolIndex) || false,
                            has_daily: tableField(data, "has-daily", symbolIndex) || true,
                            intraday_multipliers: tableField(data, "intraday-multipliers", symbolIndex) || ['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M'],
                            has_fractional_volume: tableField(data, "has-fractional-volume", symbolIndex) || false,
                            has_weekly_and_monthly: tableField(data, "has-weekly-and-monthly", symbolIndex) || false,
                            has_empty_bars: tableField(data, "has-empty-bars", symbolIndex) || false,
                            volume_precision: tableField(data, "volume-precision", symbolIndex) || 0
                        };

                        this._symbolsInfo[symbolInfo.ticker] = this._symbolsInfo[symbolName] = this._symbolsInfo[fullName] = symbolInfo;
                        this._symbolsList.push(symbolName);
                    }
                }
                catch (error) {
                    throw "API error when processing exchange `" + exchangeName + "` symbol #" + symbolIndex + ": " + error;
                }
            };


            Datafeeds.SymbolsStorage.prototype._onAnyExchangeResponseReceived = function(exchangeName) {

                delete this._exchangesWaitingForData[exchangeName];

                var allDataReady = Object.keys(this._exchangesWaitingForData).length === 0;

                if (allDataReady) {
                    this._symbolsList.sort();
                    this._datafeed._logMessage("All exchanges data ready");
                    this._datafeed.onInitialized();
                }
            };


            //	BEWARE: this function does not consider symbol's exchange
            Datafeeds.SymbolsStorage.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {

                if (!this._symbolsInfo.hasOwnProperty(symbolName)) {
                    onResolveErrorCallback("invalid symbol");
                }
                else {
                    onSymbolResolvedCallback(this._symbolsInfo[symbolName]);
                }

            };


            //	==================================================================================================================================================
            //	==================================================================================================================================================
            //	==================================================================================================================================================

            /*
                It's a symbol search component for ExternalDatafeed. This component can do symbol search only.
                This component strongly depends on SymbolsDataStorage and cannot work without it. Maybe, it would be
                better to merge it to SymbolsDataStorage.
            */

            Datafeeds.SymbolSearchComponent = function(datafeed) {
                this._datafeed = datafeed;
            };



            //	searchArgument = { ticker, onResultReadyCallback}
            Datafeeds.SymbolSearchComponent.prototype.searchSymbolsByName = function(searchArgument, maxSearchResults) {

                if (!this._datafeed._symbolsStorage) {
                    throw "Cannot use local symbol search when no groups information is available";
                }

                var symbolsStorage = this._datafeed._symbolsStorage;

                var results = [];
                var queryIsEmpty = !searchArgument.ticker || searchArgument.ticker.length === 0;

                for (var i = 0; i < symbolsStorage._symbolsList.length; ++i) {
                    var symbolName = symbolsStorage._symbolsList[i];
                    var item = symbolsStorage._symbolsInfo[symbolName];

                    if (searchArgument.type && searchArgument.type.length > 0 && item.type != searchArgument.type) {
                        continue;
                    }
                    if (searchArgument.exchange && searchArgument.exchange.length > 0 && item.exchange != searchArgument.exchange) {
                        continue;
                    }
                    if (queryIsEmpty || item.name.indexOf(searchArgument.ticker) === 0) {
                        results.push({
                            symbol: item.name,
                            full_name: item.full_name,
                            description: item.description,
                            exchange: item.exchange,
                            params: [],
                            type: item.type,
                            ticker: item.name
                        });
                    }

                    if (results.length >= maxSearchResults) {
                        break;
                    }
                }

                searchArgument.onResultReadyCallback(results);
            };



            //	==================================================================================================================================================
            //	==================================================================================================================================================
            //	==================================================================================================================================================

            /*
                This is a pulse updating components for ExternalDatafeed. They emulates realtime updates with periodic requests.
            */

            Datafeeds.DataPulseUpdater = function(datafeed, updateFrequency) {
                this._datafeed = datafeed;
                this._subscribers = {};

                this._requestsPending = 0;
                var that = this;

                var update = function() {
                    if (that._requestsPending > 0) {
                        return;
                    }

                    for (var listenerGUID in that._subscribers) {
                        var subscriptionRecord = that._subscribers[listenerGUID];
                        var resolution = subscriptionRecord.resolution;

                        var datesRangeRight = parseInt((new Date().valueOf()) / 1000);

                        //	BEWARE: please note we really need 2 bars, not the only last one
                        //	see the explanation below. `10` is the `large enough` value to work around holidays
                        var datesRangeLeft = datesRangeRight - that.periodLengthSeconds(resolution, 10);

                        that._requestsPending++;

                        (function(_subscriptionRecord) {

                            that._datafeed.getBars(_subscriptionRecord.symbolInfo, resolution, datesRangeLeft, datesRangeRight, function(bars) {
                                that._requestsPending--;

                                //	means the subscription was cancelled while waiting for data
                                if (!that._subscribers.hasOwnProperty(listenerGUID)) {
                                    return;
                                }

                                if (bars.length === 0) {
                                    return;
                                }

                                var lastBar = bars[bars.length - 1];
                                if (!isNaN(_subscriptionRecord.lastBarTime) && lastBar.time < _subscriptionRecord.lastBarTime) {
                                    return;
                                }

                                var subscribers = _subscriptionRecord.listeners;

                                //	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
                                //	_subscriptionRecord.lastBarTime = NaN
                                var isNewBar = !isNaN(_subscriptionRecord.lastBarTime) && lastBar.time > _subscriptionRecord.lastBarTime;

                                //	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
                                //	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
                                if (isNewBar) {

                                    if (bars.length < 2) {
                                        throw "Not enough bars in history for proper pulse update. Need at least 2.";
                                    }

                                    var previousBar = bars[bars.length - 2];
                                    for (var i =0; i < subscribers.length; ++i) {
                                        subscribers[i](previousBar);
                                    }
                                }

                                _subscriptionRecord.lastBarTime = lastBar.time;

                                for (var i =0; i < subscribers.length; ++i) {
                                    subscribers[i](lastBar);
                                }
                            },

                            //	on error
                            function() {
                                that._requestsPending--;
                            });
                        })(subscriptionRecord); //jshint ignore:line

                    }
                };

                if (typeof updateFrequency != "undefined" && updateFrequency > 0) {
                    setInterval(update, updateFrequency);
                }
            };


            Datafeeds.DataPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID) {
                this._datafeed._logMessage("Unsubscribing " + listenerGUID);
                delete this._subscribers[listenerGUID];
            };


            Datafeeds.DataPulseUpdater.prototype.subscribeDataListener = function(symbolInfo, resolution, newDataCallback, listenerGUID) {

                this._datafeed._logMessage("Subscribing " + listenerGUID);

                var key = symbolInfo.name + ", " + resolution;

                if (!this._subscribers.hasOwnProperty(listenerGUID)) {

                    this._subscribers[listenerGUID] = {
                        symbolInfo: symbolInfo,
                        resolution: resolution,
                        lastBarTime: NaN,
                        listeners: []
                    };
                }

                this._subscribers[listenerGUID].listeners.push(newDataCallback);
            };


            Datafeeds.DataPulseUpdater.prototype.periodLengthSeconds = function(resolution, requiredPeriodsCount) {
                var daysCount = 0;

                if (resolution == "D") {
                    daysCount = requiredPeriodsCount;
                }
                else if (resolution == "M") {
                    daysCount = 31 * requiredPeriodsCount;
                }
                else if (resolution == "W") {
                    daysCount = 7 * requiredPeriodsCount;
                }
                else {
                    daysCount = requiredPeriodsCount * resolution / (24 * 60);
                }

                return daysCount * 24 * 60 * 60;
            };


            Datafeeds.QuotesPulseUpdater = function(datafeed) {
                this._datafeed = datafeed;
                this._subscribers = {};
                this._updateInterval = 60 * 1000;
                this._fastUpdateInterval = 10 * 1000;
                this._requestsPending = 0;

                var that = this;

                setInterval(function() {
                    that._updateQuotes(function(subscriptionRecord) { return subscriptionRecord.symbols; });
                }, this._updateInterval);

                setInterval(function() {
                    that._updateQuotes(function(subscriptionRecord) { return subscriptionRecord.fastSymbols.length > 0 ? subscriptionRecord.fastSymbols : subscriptionRecord.symbols; });
                }, this._fastUpdateInterval);
            };

            Datafeeds.QuotesPulseUpdater.prototype.subscribeDataListener = function(symbols, fastSymbols, newDataCallback, listenerGUID) {
                if (!this._subscribers.hasOwnProperty(listenerGUID)) {
                    this._subscribers[listenerGUID] = {
                        symbols: symbols,
                        fastSymbols: fastSymbols,
                        listeners: []
                    };
                }
                this._subscribers[listenerGUID].listeners.push(newDataCallback);
            };

            Datafeeds.QuotesPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID) {
                delete this._subscribers[listenerGUID];
            };

            Datafeeds.QuotesPulseUpdater.prototype._updateQuotes = function(symbolsGetter) {
                if (this._requestsPending > 0) {
                    return;
                }

                var that = this;
                for (var listenerGUID in this._subscribers) {
                    this._requestsPending++;

                    var subscriptionRecord = this._subscribers[listenerGUID];
                    this._datafeed.getQuotes(symbolsGetter(subscriptionRecord),
                        // onDataCallback
                        function(subscribers, guid) {
                            return function(data) {
                                that._requestsPending--;

                                // means the subscription was cancelled while waiting for data
                                if (!that._subscribers.hasOwnProperty(guid)) {
                                    return;
                                }

                                for (var i =0; i < subscribers.length; ++i) {
                                    subscribers[i](data);
                                }
                            };
                        }(subscriptionRecord.listeners, listenerGUID), //jshint ignore:line
                        // onErrorCallback
                        function (error) {
                            that._requestsPending--;
                        }); //jshint ignore:line
                }
            };

            return Datafeeds;
        },
        selectbi(val){
            let that=this;
            this.data.map((item)=>{
                if(item.currencyname == val){
                    that.zhangfu = Number(item.range).toFixed(2);
                    that.news_price = item.curprice;
                    that.jichubizhong = item.currencyname;
                    that.jijiabizhong = item.tradecurrency;
                    // initCharts(item.currencyname+""+item.tradecurrency.split("T")[0]);
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
                    that.tradingViewGetReady();
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
                            },Number(params.row.tradeprice).toFixed(8))
                            
                        }
                        if(params.row.tradetype == "2"){
                            return h('span',{
                                style: {
                                        color: '#1e9900'
                                    },
                            },Number(params.row.tradeprice).toFixed(8))

                            
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
                        },params.row.tradecount)
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
                            return h("span",row.row.totalbuynum);
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
                            return  h("span",row.row.avebuyprice);
                        }else{
                            let numb=0;
                            return  h("span",numb)
                        }
                        
                    }
                },
                {
                    title:"总卖出数("+this.jichubizhong+")",
                    key: "totalsellnum",
                    render (h,row){
                        if(row.row.totalsellnum){
                            return  h("span",row.row.totalsellnum);
                        }else{
                            let numb=0;
                            return  h("span",numb)
                        }
                        
                    }
                },
                {
                    title:"平均卖出价("+this.jijiabizhong+")",
                    key: "avesellprice",
                    render (h,row){
                        if(row.row.avesellprice){
                            return  h("span",row.row.avesellprice);
                        }else{
                            let numb=0;
                            return  h("span",numb)
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
                        width:100,
                    },
                    {
                        title: '类型',
                        key: 'tradetype',
                        width:60,
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
                        width:100,
                        render: (h,params)=>{
                            return h("span",params.row.entrustcount)
                        }
                    },
                    {
                        title: '价格',
                        key: 'tradeprice',
                        width:100,
                        render: (h,params)=>{
                            return h("span",Number(params.row.tradeprice).toFixed(8))
                        }
                    },
                    {
                        title: '金额',
                        key: 'entrustamount',
                        render: (h,params)=>{
                            return h("span",params.row.entrustamount) 
                        }
                    },
                    {
                        title: '成交量',
                        key: 'tradecount',
                        width:100,
                        render: (h,params)=>{
                            return h("span",params.row.tradecount)
                        }
                    },
                    {
                        title: '成交金额',
                        key: 'tradeamount',
                        width:120,
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
                                return h("span",Number(params.row.charge).toFixed(10))
                            }else{
                                return h("span",Number(params.row.charge).toFixed(10))
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
                        width:100,
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
                    width:100,
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
                            font-size: 14px;
                            text-align: center;
                            padding:6px 16px;
                            color: #586c86;
                            font-weight:600;
                            // line-height: 30px;
                            transition: 0.3s linear;
                        }
                        .ivu-tabs-tab-active{
                            color: #2d8cf0;
                            font-size: 14px;
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
                    padding-right:0;
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
