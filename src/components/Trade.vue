<template>
    <div class="clear trade wrapper">
        <div class="tradelists clear">
             <Menu ref='currencymenu' @on-select="info" mode="horizontal" class="trade-menu" :active-name="activeName" >
                <MenuItem v-for="value in menu" :name=" value.currencyname + '/' + value.valuationcurrency " :key="value.currencyname">
                    <span><img :src="''"/>{{ value.currencyname }}/{{value.valuationcurrency}}</span>
                </MenuItem>
            </Menu>
        </div>
        <div class="tradelist">
            <Menu ref='asdf' @on-select="infos" class="trade-menu" :active-name="active_name2" >
                <MenuItem v-for="value in menu1" :name="value.name" :key="value.name">
                    <span>{{ value.text }}</span>
                </MenuItem>
            </Menu>
        </div>
        <div class="context-title" v-if="types =='buy' && userinfo.validationAmount < 5">
            <Row>
                <Col span="14">
                    <div class="title-text">
                        <img src="/static/img/icon-safe.png"/>在您进行开始交易之前，您需要完成<a @click="safe()">安全设置</a>
                    </div>
                </Col>
                <Col span="10">
                    <step :step="stepJson" :currentStep="'1'"></step>
                </Col>
            </Row>
        </div>
        
        <div class="trade-contract" v-if="types =='buy'">
            <Row>
                <Col span='8'>
                    <div class="trade-buy buy-sell">
                        <div class='buy-title'>
                            <span class="text-buy">买入</span>{{jichubizhong}}/<span>{{ jijiabizhong }}</span>
                        </div>
                        <div class="money">
                            <p class="buy-money">可用：<span>{{buy_keyong}}</span> {{jijiabizhong}}</p>
                            <p class="buy-money">冻结：<span>{{buy_dongjie}}</span> {{jijiabizhong}}</p>
                        </div>
                        <div class="trade-button">
                            <span>委托类型</span>
                            <Button>限单价</Button>
                        </div>
                        <div class="trade-input">
                            
                            <div style="position:relative; margin-bottom:10px;">
                                <input v-model="buyprice" @input="inputBuyPrice($event,'buyprice')" class="input-number" />
                                <span class='span'>买入价 {{jijiabizhong}}</span>
                            </div>
                            <div style="position:relative; margin-bottom:10px;">
                                <input v-model="buycount"  @input="inputBuyPrice($event,'buycount')"  class="input-number"/>
                                <span class='span'>买入量 {{jichubizhong}}</span>
                            </div>
                            
                            <!-- <Input :number="true" v-model="buyprice" @input="inputBuyPrice($event,'buyprice')" >
                                <span slot="prepend">买入价 {{jijiabizhong}}</span>
                            </Input>
                            <Input :number="true" v-model="buycount"  :maxlength="14">
                                <span slot="prepend">买入量 {{jichubizhong}}</span>
                            </Input> -->
                            <p>
                                ≈ $ <span>{{buymoney}}</span>
                            </p>
                            <!-- <Slider v-model="value" :max="1000" @on-change="ss"></Slider> -->
                            <Slider v-model="sliderbuy" :tip-format="sliderformat" @on-input="sliderchange"></Slider>
                            <Button class="buy-button buy-button1" @click="buy">
                                买入 {{jichubizhong}}
                            </Button>
                            <p style="color:#666;">如果账户余额不足，充值请到<a href="javascript:;" @click="chongzhi">数字资产</a></p>
                            <!-- <Button class="buy-button" style="margin-bottom:30px;" @click='chongzhi'>
                                立即充值
                            </Button> -->
                        </div>
                    </div>
                </Col>
                <Col span='8'>
                    <div class="trade-sell buy-sell">
                        <div class='sell-title'>
                            <span  class="text-buy">卖出</span>{{jichubizhong}}/<span>{{ jijiabizhong }}</span>
                        </div>
                        <div class="money">
                            <p class="buy-money">可用：<span>{{ sell_keyong }}</span> {{ jichubizhong }}</p>
                            <p class="buy-money">冻结：<span>{{ sell_dongjie }}</span> {{ jichubizhong }}</p>
                        </div>
                        <div class="trade-button">
                            <span>委托类型</span>
                            <Button>限单价</Button>
                        </div>
                        <div class="trade-input">
                            <div style="position:relative; margin-bottom:10px;">
                                <input v-model="sellprice" @input="inputBuyPrice($event,'sellprice')" class="input-number" />
                                <span class='span'>卖出价 {{jijiabizhong}}</span>
                            </div>
                            <div style="position:relative; margin-bottom:10px;">
                                <input v-model="sellcount"  @input="inputBuyPrice($event,'sellcount')"  class="input-number"/>
                                <span class='span'>卖出量 {{jichubizhong}}</span>
                            </div>


                            <!-- <div style="position:relative; margin-bottom:10px;">
                                <InputNumber v-model="sellprice"  :min='0.001' class="input-number"></InputNumber>
                                <span class='span'>卖出价 {{jijiabizhong}}</span>
                            </div>
                            <div style="position:relative; margin-bottom:10px;">
                                <InputNumber v-model="sellcount"   :min='0.001' class="input-number"></InputNumber>
                                <span class='span'>卖出量 {{jichubizhong}}</span>
                            </div> -->
                            <p>
                                ≈ $ <span>{{sellmoney}}</span>
                            </p>
                            <Slider v-model="slidersell" :tip-format="sliderformat" @on-input="slidersellchange"></Slider>
                            <Button class="buy-button buy-button1" @click="sell">
                                卖出 {{jichubizhong}}
                            </Button>

                        </div>
                    </div>
                </Col> 
                <Col span='8'>
                    <div class="trade-record buy-sell">
                        <p class="table-title">最新成交价格</p>
                        <Table :row-class-name='rowClassName' @on-row-click="dblclick" size='small' :data="price_datas" :columns="price_columns" stripe></Table>
                        <p class="table-title" style="margin-top:20px;">最新成交记录</p>
                        <Table class='chengjiaojilu' style="margin-bottom:20px;" :row-class-name='rowClassName' size='small' :data="record_data" :columns="record_columns" stripe></Table>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="trade-contract" v-else-if="types === 'weituo'">
            <div class="trade-time">
                <span>查询日期：</span>
                <DatePicker :value="begintime" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择查询日期" @on-change="timeschange" style="width: 200px"></DatePicker>
                <Button @click="weituojilu">刷新统计</Button>
            </div>
            <div class="trade-table">
                <Table :data="weituo_data" :columns="weituo_columns" stripe></Table>
                <Table :loading="loading" :data="order_record_data" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
                <div style="margin: 10px;overflow:hidden">
                    <div style="float: right;line-height:  40px;height: 40px;">
                        <Page :page-size-opts='[10,20,30,40,50]' :total="total" show-sizer show-elevator show-total placement='top' :page-size='pagesize' :current="pageno" @on-change="changePage" @on-page-size-change='pagesizesa'></Page>
                    </div>
                </div>
            </div>
        </div>
        <div class="trade-contract" v-else-if="types === 'jiaoyijilu'">
            <div class="trade-time">
                <span>查询日期：</span>
                <DatePicker :value="begintime1" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择查询日期" @on-change="timeschange1" style="width: 200px"></DatePicker>
                <Button @click="weituojilu1">刷新统计</Button>
            </div>
            <div class="trade-table">
                <Table :data="weituo_data" :columns="weituo_columns" stripe></Table>
                <Table :loading="loading" :data="order_record_data1" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
                <div style="margin: 10px;overflow:hidden">
                    <div style="float: right;line-height:  40px;height: 40px;">
                        <Page :page-size-opts='[10,20,30,40,50]' :total="total" show-sizer show-elevator show-total placement='top' :page-size='pagesize' :current="pageno" @on-change="changePage1" @on-page-size-change='pagesizes1'></Page>
                    </div>
                </div>
            </div>
        </div>
        <div class="trade-contract" v-else-if="types === 'chedan'">
            <div class="trade-time">
                <Button @click="revoke">一键撤销</Button>
            </div>
            <div class="trade-table">
                <Table :loading="loading" :data="order_record_data2" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
                <div style="margin: 10px;overflow:hidden">
                    <div style="float: right;line-height:  40px;height: 40px;">
                        <Page :page-size-opts='[10,20,30,40,50]' :total="total" show-sizer show-elevator show-total placement='top' :page-size='pagesize' :current="pageno" @on-change="changePage2" @on-page-size-change='pagesizes2'></Page>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    import { Menu,MenuItem,DatePicker,Table,Slider,Page } from 'iview';
    import step from './step';
    import { mapState } from "vuex";
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
    var reg = numReg('10','10');
    var regs = numReg('10','3');
    var decimal = function(a,b){
        let s = a.toString()
        return s.substring(0,s.lastIndexOf('.')+b)
    }
    // let menu = [
        //     {"name":"BTC",text:"BTC",icon:"/static/img/coin/icon-btc.png"},
        //     {"name":"ETH",text:"ETH",icon:"/static/img/coin/icon-eth1.png"},
        //     {"name":"ETC",text:"ETC",icon:"/static/img/coin/icon-etc.png"},
        //     {"name":"LTC",text:"LTC",icon:"/static/img/coin/icon-ltc.png"},
        //     {"name":"DOGE",text:"DOGE",icon:"/static/img/coin/icon-doge.png"},
        //     // {"name":"YBC",text:"YBC",icon:"/static/img/coin/icon-.png"}
    // ]
    let menu1 = [
        {"name":"buy",text:"买入/卖出"},
        {"name":"chedan",text:"委托撤单"},
        {"name":"weituo",text:"委托历史"},
        {"name":"jiaoyijilu",text:"交易记录"},
    ]
    export default {
        components:{
            DatePicker,Table,
            Menu,MenuItem,Slider,step,Page
        },
        props: ['lang'],
        data() {
            return {
                pagesize:10,
                loading:false,
                pageno:1,
                total:0,
                sliderbuy:0,
                slidersell:0,
                stepJson:["01.安全设置","02.充值","03.下单交易"],
                active_name2:'buy',
                activeName:'',
                menu:[],
                menu1,
                value: 1000,
                numbers:0,
                begintime: '',
                begintime1: '',
                types:"buy",
                jichubizhong:"ETH",
                jijiabizhong:"USDT",
                // buymoney:0,
                // sellmoney:0,
                buyprice:0,
                buycount:0,
                sellprice:0,
                sellcount:0,
                // 最新成交价格
                price_datas:[],
                price_columns: [
                    {
                        title: '买卖',
                        key: 'operate',
                        width:'76px',
                        align:"center",
                        render: (h,params) => {
                            if(params.row.operate == "2"){
                                return h("span","卖出")
                            }else{
                                return h("span","买入")
                            }
                        }
                    },
                    {
                        title: '交易数量',
                        key: 'count',
                        align:"center",
                        render: (h,params)=>{
                            if(params.row.count){
                                return  h("span",Number(params.row.count).toFixed(10))
                            }else{
                                return h("span",Number(0).toFixed(10))
                            }
                            
                        }
                    },
                    {
                        title: '交易价格',
                        key: 'price',
                        align:"center",
                        render: (h, params) => {
                            console.log(params.row);
                            if(params.row.price){
                                return h("span",Number(params.row.price).toFixed(10))
                            }else{
                                return h("span",Number(0).toFixed(10))
                            }
                            
                        }
                    }
                ],
                // 最新交易记录
                record_columns:[
                    {
                        title: "时间",
                        key: 'tradetime',
                        width:'76px',
                        align:"center",
                        render: (h,params) => {
                            return  h("span",params.row.tradetime.substr(11,20))
                        }
                    },
                    {
                        title: '价格(¥)',
                        key: 'tradeprice',
                        align:"center",
                        render: (h, params) => {
                            return  h("span",Number(params.row.tradeprice).toFixed(10))
                        }
                        
                    },
                    {
                        title: '数量',
                        key: 'tradecount',
                        align:"center",
                        render: (h, params) => {
                            return  h("span",Number(params.row.tradecount).toFixed(10))
                        }
                    }
                ],
                record_data: [],
                 // 委托
                weituo_data:[],
                weituo_columns: [],
                order_record_data: [],
                order_record_data1:[],
                order_record_cloumns: [
                   
                ],
                order_record_cloumns_title: "",
                order_record_data2:[],
                // 可用资产冻结资产 
                buy_keyong:"",
                buy_dongjie:"",
                sell_keyong:"",
                sell_dongjie:""

            }
        },
        mounted () {
            this.$Message.config({
                top: 100,
                duration: 3
            })
            this.query();
            this.weituolist();
            this.mairuzijin();
            this.maichuzijin();
            this.selectCurrency();
            this.priceq();
            this.$Notice.config({
                top: 100
            });
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
                if(this.buyprice > 0 && this.buycount > 0){
                    //this.sliderbuy = ((Number(this.buycount*this.buyprice*1.002)/Number(this.buy_keyong))/100).toFixed(2)
                    return  decimal(this.buycount*this.buyprice*1.002,11)
                }
            },
            sellmoney(){
                if(this.sellprice > 0 && this.sellcount > 0){
                    return decimal((this.sellcount*this.sellprice-this.sellcount*this.sellprice*0.002),11);
                }
            },
        },
        methods: {
            inputBuyPrice(e,priceType){
                var value = e.target.value;
                if(priceType=="buycount" || priceType == "sellcount"){
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
            slidersellchange(val){
                // console.log(val)
                // console.log("可用资金",this.sell_keyong,"----单价：",this.sellprice,"-----百分比：",val,"-------手续费：1.002")

                console.log(this.sell_keyong*(val/100))
                this.sellcount = decimal(this.sell_keyong*(val/100),4)
            },
            sliderchange(val){//滑块
                // console.log(val)
                // console.log("可用资金",this.buy_keyong,"----单价：",this.buyprice,"-----百分比：",val,"-------手续费：1.002")


                this.buycount = decimal((this.buy_keyong*(val/100))/(this.buyprice*1.002),4)
            },
            sliderformat(val){//滑块
                return val+'%'
            },
            selectCurrency(){
                let that=this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbfct.do",
                    data:{
                        reqresource:1
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.currencys && res.data.err_code == "1" && res.data){
                    console.log(res.data.currencys)
                        that.menu = res.data.currencys
                        setTimeout(()=>{
                            that.$refs['currencymenu'].currentActiveName = 'ETH/USDT'
                            // alert(that.$refs['currencymenu'].currentActiveName);
                        },300)
                        
                        
                    }
                })
            },
            buy(){//买入
                console.log(this.userinfo.validationAmount)
                let that = this;
                if(this.userinfo.validationAmount< 5){
                    this.$Modal.error({
                        render(h){
                            return h('p',[
                                    "请先到",
                                    h('a',
                                        {
                                            domProps: {
                                                innerHTML: '个人中心'
                                            },
                                            on:{
                                                click:()=>{
                                                   
                                                    that.safe("1")
                                                }
                                            }
                                        }
                                    ),
                                    '完成安全设置'
                                ])
                        }
                    })
                    return false;
                }
                if(Number(this.buycount*this.buyprice) < 150){
                    this.$Modal.warning({
                        title:"温馨提示",
                        content:"买入数量不能小于150 USDT且不包括手续费"
                    })
                    return false;
                }
                if(Number(this.buymoney) > Number(this.buy_keyong)){
                    this.$Modal.warning({
                        render(h){
                            return h('p',[
                                    "账户可用资金不足，请到",
                                    h('a',
                                        {
                                            domProps: {
                                                innerHTML: '数字资产'
                                            },
                                            on:{
                                                click:()=>{
                                                    console.log("-----",this)
                                                    console.log(that)
                                                    that.chongzhi("1")
                                                }
                                            }
                                        }
                                    ),
                                    '充值'
                                ])
                        }
                    })
                    return false;
                }
                if(that.buycount > 0 && that.buyprice > 0){
                    this.$ajax({
                        method:"post",
                        url:"/trade/tps/pbces.do",
                        data:{
                            "entrusttype":"1",
                            "operate":"1",
                            "entrustcoin":that.jichubizhong,
                            "tradecoin":that.jijiabizhong,
                            "entrustnum":that.buycount,
                            "entrustprice":that.buyprice,
                            "reqresource":"1",
                        }
                    }).then((res)=>{
                        console.log(res)
                        if(res.data && res.data.err_code == "1"){
                            this.$Modal.success({
                                content: "创建委托成功"
                            })
                            that.buycount = 0;
                            that.buyprice = 0;
                            // that.buymoney = 0;
                            that.mairuzijin();
                            that.maichuzijin();
                        }else{
                            this.$Modal.error({
                                content: "创建委托失败，"+res.data.msg
                            })
                        
                        }
                    })
                }else{
                    this.$Notice.warning({
                        title:"温馨提示",
                        desc: "买入价或买入量不能为空"
                    })
                }
            },
            sell(){//卖出 
                let that = this;
                if(this.userinfo.validationAmount< 5){
                    this.$Modal.error({
                        render(h){
                            return h('p',[
                                    "请先到",
                                    h('a',
                                        {
                                            domProps: {
                                                innerHTML: '个人中心'
                                            },
                                            on:{
                                                click:()=>{
                                                   
                                                    that.safe("1")
                                                }
                                            }
                                        }
                                    ),
                                    '完成安全设置'
                                ])
                        }
                    })
                    return false;
                }
                if(Number(this.sellcount) > Number(this.sell_keyong)){
                    this.$Modal.error({
                        render(h){
                            return h('p',[
                                    "账户可用资金不足，请到",
                                    h('a',
                                        {
                                            domProps: {
                                                innerHTML: '数字资产'
                                            },
                                            on:{
                                                click:()=>{
                                                    console.log("-----",this)
                                                    console.log(that)
                                                    that.chongzhi("1")
                                                }
                                            }
                                        }
                                    ),
                                    '充值'
                                ])
                        }
                    })
                    return false;
                }
                if(that.sellcount > 0 && that.sellprice > 0){
                    this.$ajax({
                        method:"post",
                        url:"/trade/tps/pbces.do",
                        data:{
                            "entrusttype":"1",
                            "operate":"2",
                            "entrustcoin":that.jichubizhong,
                            "tradecoin":that.jijiabizhong,
                            "entrustnum":that.sellcount,
                            "entrustprice":that.sellprice,
                            "reqresource":"1",
                        }
                    }).then((res)=>{
                        if(res.data && res.data.err_code == "1"){
                            this.$Modal.success({
                                content: "创建委托成功"
                            })
                            that.sellcount =0;
                            that.sellprice =0;
                            // that.sellmoney =0;
                            that.mairuzijin();
                            that.maichuzijin();
                        }else{
                            this.$Modal.error({
                                content: "创建委托失败，"+res.data.msg
                            })
                        }
                    })
                }else{
                    this.$Notice.warning({
                        title:"温馨提示",
                        desc: "卖出价或卖出量不能为空"
                    })
                    
                }
                
            },
            mairuzijin(){//买入可用资金
                let that=this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pblaf.do",
                    data:{
                        reqresource:1,
                        currencytype: that.jijiabizhong
                    }
                }).then((res)=>{
                    if(res.data.accountFund && res.data&&res.data.err_code=="1"){
                        that.buy_keyong=Number(res.data.accountFund[0].usablefund).toFixed(10)
                        that.buy_dongjie=Number(res.data.accountFund[0].frozenfund).toFixed(10)
                    }else{
                        that.buy_keyong="0.000000"
                        that.buy_dongjie="0.000000"
                    }
                })
            },
            maichuzijin(){//卖出可用资金
                let that=this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pblaf.do",
                    data:{
                        reqresource:1,
                        currencytype: that.jichubizhong
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.accountFund && res.data&&res.data.err_code=="1"){
                        that.sell_keyong=Number(res.data.accountFund[0].usablefund).toFixed(10)
                        that.sell_dongjie=Number(res.data.accountFund[0].frozenfund).toFixed(10)
                    }else{
                        that.sell_keyong="0.000000"
                        that.sell_dongjie="0.000000"
                    }
                })
            },
            revoke(){//一键撤销
                // this.$Modal.info({
                //     content: "功能暂未开放"
                // })
                let that = this;
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>是否确认一键撤销？</p>',
                    onOk: () => {
                        console.log("onOK")
                        that.$ajax({
                            method: "post",
                            url:"/trade/tps/pbceos.do",
                            data:{
                                currencytype:that.jichubizhong,
                                tradecurrency:that.jijiabizhong,
                                reqresource:1
                            }
                        }).then((res)=>{
                            if(res.data && res.data.err_code == "1"){
                                setTimeout(() => {
                                     this.$Modal.success({
                                        content: "撤单成功"
                                    })
                                },300)
                                that.query_entrust2();
                                that.mairuzijin();
                                that.maichuzijin();
                            }else {
                                setTimeout(() => {
                                     this.$Modal.error({
                                        content: "撤单失败，"+res.data.msg
                                    })
                                },300)
                            }
                        })
                        
                        
                    }
                });
                
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
                                     this.$Modal.success({
                                        content: "撤单成功"
                                    })
                                },300)
                                this.query_entrust2();
                                that.mairuzijin();
                                that.maichuzijin();
                               
                            }else {
                                setTimeout(() => {
                                     this.$Modal.error({
                                        content: "撤单失败"
                                    })
                                },300)
                            }
                        })
                        
                        
                    }
                });
            },
            changePage(pageno){
                this.pageno = pageno;
                this.query_entrust();
                this.loading = true;
            },
            pagesizesa(pagesize){
                this.pageno = 1;
                this.pagesize=pagesize;
                this.loading = true;
                this.query_entrust();
            },
            changePage1(pageno){
                this.loading = true;
                this.pageno = pageno;
                this.query_entrust1();
            },
            pagesizes1(pagesize){
                this.loading = true;
                this.pageno = 1;
                this.pagesize=pagesize;
                this.query_entrust1();
            },
            changePage2(pageno){
                this.loading = true;
                this.pageno = pageno;
                this.query_entrust2();
            },
            pagesizes2(pagesize){
                this.loading = true;
                this.pageno = 1;
                this.pagesize=pagesize;
                this.query_entrust2();
            },
            timeschange(val){
                this.begintime = val;
            },
            timeschange1(val){
                this.begintime1 = val;
            },
            weituojilu () {
                this.total=0;
                this.pagesizes=10;
                this.pageno=1;
                this.loading = true;
                this.query_entrust();
            },
            weituojilu1 () {
                this.total=0;
                this.pagesizes=10;
                this.pageno=1;
                this.loading = true;
                this.query_entrust1();
            },
            // 委托列表表头
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
            wt_title(){
                this.order_record_cloumns =[
                    {
                            title: "委托时间",
                            key: "entrusttime",
                        },
                        {
                            title: '类型',
                            key: 'tradetype',
                            render: (h,params) =>{
                                if(params.row.tradetype == "1"){
                                    return h("span","买入")
                                }else  if(params.row.tradetype == "2"){
                                    return h("span","卖出")
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
                                    return h("span",Number(params.row.charge)+'%')
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
                        },
                        
                        
                ]

                if(this.order_record_cloumns_title != "jiaoyijilu"){
                    this.order_record_cloumns.push(
                        {
                            title: this.order_record_cloumns_title,
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
                        }
                    )
                }
            },
            // 查询交易记录
            query () {
                let that = this;
                this.price_datas = [];
                this.record_data = [];
                // 交易记录
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pblds.do',
                    data: {
                        currencytype:that.jichubizhong,
                        pagesize: 10,
                        reqresource:1
                    }
                })
                .then(function (response) {
                    if(response.data.latestDeal){
                       
                        response.data.latestDeal.map(function(item,index){
                            if(index<5){
                                that.record_data.push(item);
                            }
                        })
                    }
                   
                })

                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbles.do",
                    data: {
                        count : 5,//查询条数
                        coin : that.jichubizhong,//币种
                        tradecoin: that.jijiabizhong,//交易币种
                        reqresource:1
                    }
                }).then((data)=>{
                   if(data.data.latestEntrust && data.data){
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
                        that.price_datas = sortObj;
                   }
                        
                    
                })
            },
            //查询委托
            query_entrust () {
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
                        "reqresource":"1",
                        "status":"1,2,4",
                        "tradecurrency": that.jijiabizhong
                    }
                })
                .then((response) => {
                    console.log("weituo======",response)
                    if(response.data && response.data.dealManage){
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
            query_entrust1 (currencycode,starttime,endtime) {

                let that = this;
                // 交易
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pbdms.do',
                    data: {
                       "currencytype":that.jichubizhong,//币种
                        "starttime":that.begintime1[0] ? that.begintime1[0] : "",
                        "endtime":that.begintime1[1] ? that.begintime1[1] : "",
                        "pageno":that.pageno,
                        "tradecurrency": that.jijiabizhong,
                        "pagesize":that.pagesize,
                        "reqresource":"1",
                    }
                })
                .then((response) => {
                    console.log("weituo======",response)
                    if(response.data  && response.data.dealManage){
                        that.weituo_data = [{
                            avebuyprice : response.data.avebuyprice,
                            avesellprice: response.data.avesellprice,
                            totalbuynum: response.data.totalbuynum,
                            totalsellnum: response.data.totalsellnum
                        }]

                        that.order_record_data1 = response.data.dealManage;
                    }
                    if(response.data && response.data.page && response.data.page.sum){
                        that.total = Number(response.data.page.sum);
                    }
                    that.loading = false;
                })
            },
            query_entrust2(currencycode,starttime,endtime){
                this.order_record_data2 = [];
                let that = this;
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pbets.do',
                    data: {
                        "currencytype":currencycode ? currencycode : that.jichubizhong,//币种
                        "starttime":starttime ? starttime : "",
                        "endtime":endtime ? endtime:"",
                        "pageno":that.pageno,
                        "pagesize":that.pagesize,
                        "tradecurrency": that.jijiabizhong,
                        "reqresource":"1",
                        "status":"0,3"
                    }
                })
                .then((response) => {
                    console.log("chedan======",response)
                    if(response.data  && response.data.dealManage ){
                        that.weituo_data = [{
                            avebuyprice : response.data.avebuyprice,
                            avesellprice: response.data.avesellprice,
                            totalbuynum: response.data.totalbuynum,
                            totalsellnum: response.data.totalsellnum
                        }]
                        that.order_record_data2 = response.data.dealManage;
                    }
                    if(response.data && response.data.page && response.data.page.sum){
                        that.total = Number(response.data.page.sum);
                    }
                    that.loading = false;
                })
            },
            safe (val) {
                if(val == "1"){
                    this.$Modal.remove()
                }
                this.$router.push("user");
            },
            rowClassName (row, index) {
                if (row.operate == "1"||row.tradetype == '1') {
                    return 'table-row-color-5';
                } else if (row.operate == "2"||row.tradetype == '2') {
                    return 'table-row-color-10';
                }
                return '';
            },
            infos (name) {
                console.log(name)
                this.loading= true;
                this.pagesize=10;
                this.pageno=1;
                this.total=0;
                if(name == "weituo"){
                    this.query_entrust()
                    this.order_record_cloumns_title = "状态";
                    
                }
                if(name == "jiaoyijilu"){
                    this.query_entrust1();
                    this.order_record_cloumns_title = "jiaoyijilu"
                }
                if(name == "chedan"){
                    this.query_entrust2();
                    this.order_record_cloumns_title = "操作"
                }
                if(name == 'buy'){
                    this.query ();
                    this.mairuzijin();
                    this.maichuzijin();
                    this.priceq();
                }
                this.wt_title();
                this.types = name; 
                this.begintime = "";
                this.begintime1 = '';
                
            },
            info (name) {
                console.log(name)
                this.$refs['asdf'].currentActiveName = 'buy',
                this.types = "buy"
                this.activeName = name;
                this.buyprice=0;
                this.buycount=0;
                this.sellprice=0;
                this.sellcount=0;
                var bizhong = name.split("/");
                this.jichubizhong=bizhong[0];
                this.jijiabizhong=bizhong[1];
                this.weituolist();
                this.mairuzijin();
                this.maichuzijin();
                this.query();
                this.priceq();
                
            },
            priceq(){
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
                    if(res.data && res.data.err_code == "1" && res.data.currencyDetail){
                        that.buyprice = Number(res.data.currencyDetail[0].curprice);
                        that.sellprice = Number(res.data.currencyDetail[0].curprice);
                    }else{
                        that.buyprice = Number(0);
                        that.sellprice = Number(0);
                    }
                })
            },
            dblclick (row,index) {
                if(row.operate == "1"){
                    this.buycount = Number(row.count);
                    this.buyprice = Number(row.price);
                    if (!this.buyprice) {
                        this.buyprice = 0;
                    }
                    // this.buymoney = (this.buycount*this.buyprice*1.002).toFixed(10);
                }else{
                    this.sellcount = Number(row.count);
                    this.sellprice = Number(row.price);
                    // this.sellmoney = (this.sellcount*this.sellprice*1.002).toFixed(10);
                }
            },
            chongzhi (val) {
                if(val == "1"){
                    this.$Modal.remove()
                }
                this.$router.push("assets")
            },
        }
    }
</script>

<style lang="scss">
    .trade{
        width:1200px;
        margin: 0 auto;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{-moz-appearance:textfield;}
    .tradelists{
        width:100%;
        margin-bottom: 20px;
        background: #fff;
        .trade-menu{
            width:100% !important;
            img{
                display: inline;
                width:20px;
                margin: 15px 10px 0 0;
                margin-bottom: -5px;
            }
            .ivu-menu-item{
                width:12.5%;
                text-align: center;
            }
            
        }
        .ivu-menu{
            z-index: 0;
        }
        .ivu-menu-horizontal.ivu-menu-light:after{
            background:none;
            height:0px;
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
    }
    .trade-contract{
        min-height: 600px;
        background: #fff;
        float: left;
        width:1040px;
        padding-top:25px;
        // .ivu-input-number-handler-wrap{
        //     display: none;
        // }
        // .ivu-input-number-input-wrap{
        //     height:48px;
        // }
        .input-number{
            width:100%;
            height:50px;
            line-height:50px;
            border-radius: 0;
            background: #f5f4f4;
            padding-left:121px;
            position: relative;
            border:1px solid #dddee1; 
            color: #495060;
            // .ivu-input-number-input{
            //     height:50px;
            //     line-height: 50px;
            //     background: #f5f4f4;
            //     font-size: 14px;
            // }
        }
        .span{
            position: absolute;
            top:0;
            left:0;
            z-index: 3;
            line-height: 50px;
            width:120px;
            text-align: center;
            font-size:12px;
            color: #495060;
        }
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
            
            .ivu-btn{
                padding:10px 20px;
                color: #57a3f3;
                background-color: #fff;
                border-color: #57a3f3;
                margin-left:20px;
            }
            // .ivu-input:focus{
            //     color:#57a3f3;
            //     border-color: #57a3f3;
            //     -webkit-box-shadow: none;
            //     box-shadow: none;
            // }
            // .ivu-input:hover {
            //     border-color: #57a3f3;
            // }
            .input-number:focus{
                color:#2d8cf0;
                border-color: #57a3f3;
                -webkit-box-shadow: none;
                box-shadow: none;
                outline: 0;
            }
            .input-number:hover{
                color:#2d8cf0;
                border-color:#2d8cf0;
            }
            .input-number:focus + span{
                color:#57a3f3;
            }
            .input-number:hover + span{
                color:#57a3f3;
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
            border-left: 1px solid #ccc;
            // .ivu-input-number:hover {
            //     border-color: #f5322d;
            // }
            // .ivu-input-number-focused {
            //     border-color: #f5322d;
            //     outline: 0;
            //     -webkit-box-shadow:0 0 0 2px rgba(240, 45, 45, 0.28);
            //     box-shadow: 0 0 0 2px rgba(240, 45, 45, 0.28);
            // }
            // .ivu-input-number:focus {
            //     border-color: #f5322d;
            //     outline: 0;
            //     -webkit-box-shadow:0 0 0 2px rgba(240, 45, 45, 0.28);
            //     box-shadow: 0 0 0 2px rgba(240, 45, 45, 0.28);
            // }
            .ivu-btn{
                padding:10px 20px;
                color: #f5322d;
                background-color: #fff;
                border-color: #f5322d;
                margin-left:20px;
            }
            // .ivu-input:focus{
            //     color:#f5322d;
            //     border-color: #f5322d;
            //     -webkit-box-shadow: none;
            //     box-shadow: none;
            // }
            // .ivu-input:hover {
            //     border-color: #f5322d;
            // }
            .input-number:focus{
                color:#f5322d;
                border-color: #f5322d;
                -webkit-box-shadow: none;
                box-shadow: none;
                outline: 0;
            }
            .input-number:focus + span{
                color:#f5322d;
            }
            .input-number:hover + span{
                color:#f5322d;
            }
            .input-number:hover{
                color:#f5322d;
                border-color:#f5322d;
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
            .ivu-table-cell {
                padding-left: 0;
                padding-right: 0;
            }
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
        
        .chengjiaojilu{
            .table-row-color-5{
                color: #2d8cf0;
            }
            .table-row-color-5:hover td{
                background: none !important;
                 color:#2d8cf0;
            }
            .table-row-color-10{
                color:#f5322d;
            }
            .table-row-color-10:hover td{
                background: none !important;
                color:#f5322d;
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