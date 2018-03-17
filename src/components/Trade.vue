<template>
    <div class="clear trade wrapper">
        <!-- <div class="tradelists clear">
             <Menu @on-select="info" mode="horizontal" class="trade-menu" active-name="BTC" >
                <MenuItem v-for="value in menu" :name="value.name" :key="value.name">
                     
                    <span><img :src="value.icon"/>{{ value.text }}</span>
                </MenuItem>
            </Menu>
        </div> -->
        <div class="tradelist">
            <Menu @on-select="infos" class="trade-menu" active-name="buy" >
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
                            <span class="text-buy">买入</span>{{jichubizhong}}/<span>{{ jijiabizhogn }}</span>
                        </div>
                        <div class="money">
                            <p class="buy-money">可用：<span>{{buy_keyong}}</span> {{jijiabizhogn}}</p>
                            <p class="buy-money">冻结：<span>{{buy_dongjie}}</span> {{jijiabizhogn}}</p>
                        </div>
                        <div class="trade-button">
                            <span>委托类型</span>
                            <Button>限单价</Button>
                        </div>
                        <div class="trade-input">
                            <Input :number="true" v-model="buyprice" @on-change="buy_price" :maxlength="14">
                                <span slot="prepend">买入价 ¥</span>
                            </Input>
                            <Input :number="true" v-model="buycount" @on-change="buy_count" :maxlength="14">
                                <span slot="prepend">买入量 {{jichubizhong}}</span>
                            </Input>
                            <p>
                                ≈ ￥ <span>{{buymoney}}</span>
                            </p>
                            <!-- <Slider v-model="value" :max="1000" @on-change="ss"></Slider> -->
                            <Slider></Slider>
                            <Button class="buy-button buy-button1" @click="buy">
                                买入 {{jichubizhong}}
                            </Button>
                            <Button class="buy-button" style="margin-bottom:30px;" @click='chongzhi'>
                                立即充值
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col span='8'>
                    <div class="trade-sell buy-sell">
                        <div class='sell-title'>
                            <span  class="text-buy">卖出</span>{{jichubizhong}}/<span>{{ jijiabizhogn }}</span>
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
                            <Input v-model="sellprice" :number="true"  @on-change="sell_price" :maxlength="14">
                                <span slot="prepend">卖出价 ¥</span>
                            </Input>
                            <Input v-model="sellcount" :number="true" @on-change="sell_count" :maxlength="14">
                                <span slot="prepend">卖出量 {{jichubizhong}}</span>
                            </Input>
                            <p>
                                ≈ ￥ <span>{{sellmoney}}</span>
                            </p>
                            <Slider></Slider>
                            <Button class="buy-button buy-button1" @click="sell">
                                卖出 {{jichubizhong}}
                            </Button>
                            <Button class="buy-button" style="margin-bottom:30px;" @click='tixian'>
                                立即提现
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
                <span>起始时间：</span>
                <DatePicker :value="begintime" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择起始时间" @on-change="timeschange" style="width: 200px"></DatePicker>
                <!-- <DatePicker :value="begintime" :editable="false" type="date" placeholder="请选择开始时间" style="width: 200px" @on-change="timeschange"></DatePicker>
                <span style="margin: 0 10px;"> ~ </span>
                <DatePicker :value="endtime" :editable="false" type="date" placeholder="请选择结束时间" style="width: 200px;margin-right:30px;" @on-change="timeschange"></DatePicker> -->
                <Button @click="weituojilu">刷新统计</Button>
            </div>
            <div class="trade-table">
                <Table :data="weituo_data" :columns="weituo_columns" stripe></Table>
                <Table :data="order_record_data" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
            </div>
        </div>
        <div class="trade-contract" v-else-if="types === 'jiaoyijilu'">
            <div class="trade-time">
                <span>起始时间：</span>
                <DatePicker :value="begintime1" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择起始时间" @on-change="timeschange1" style="width: 200px"></DatePicker>
                <!-- <DatePicker v-model="begintime1" :editable="false" type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
                <span style="margin: 0 10px;"> ~ </span>
                <DatePicker v-modal="endtime1" :editable="false" type="date" placeholder="请选择结束时间" style="width: 200px;margin-right:30px;"></DatePicker> -->
                <Button @click="weituojilu1">刷新统计</Button>
            </div>
            <div class="trade-table">
                <Table :data="weituo_data" :columns="weituo_columns" stripe></Table>
                <Table :data="order_record_data1" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
                <div v-if="jiaoyipage > 0" style="margin: 10px;overflow:hidden">
                    <div style="float: right;">
                        <Page :total="jiaoyipage" :current="jiaoyicurrent" @on-change="changePage"></Page>
                    </div>
                </div>
            </div>
        </div>
        <div class="trade-contract" v-else-if="types === 'chedan'">
            <div class="trade-time">
                <Button @click="revoke">一键撤销</Button>
            </div>
            <div class="trade-table">
                <Table :data="order_record_data2" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    import { Menu,MenuItem,DatePicker,Table,Slider,Page } from 'iview';
    import step from './step';
    import { mapState } from "vuex";
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
                stepJson:["01.安全设置","02.充值","03.下单交易"],
                jiaoyipage:0,
                jiaoyicurrent:1,
                // menu,
                menu1,
                value: 1000,
                numbers:0,
                begintime: '',
                begintime1: '',
                types:"buy",
                jichubizhong:"ETH",
                jijiabizhogn:"USDT",
                buymoney:0,
                sellmoney:0,
                buyprice:'',
                buycount:'',
                sellprice:'',
                sellcount:'',
                // 最新成交价格
                price_datas:[],
                price_columns: [
                    {
                        title: '买卖',
                        key: 'operate',
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
                        render: (h,params)=>{
                            return  h("span",Number(params.row.count).toFixed(6))
                        }
                    },
                    {
                        title: '交易价格',
                        key: 'price',
                        render: (h, params) => {
                            return  h("span",Number(params.row.price).toFixed(6))
                        }
                    }
                ],
               
                // 最新交易记录
                record_columns:[
                    {
                        title: "时间",
                        key: 'tradetime',
                        render: (h,params) => {
                            return  h("span",params.row.tradetime.substr(11,20))
                        }
                    },
                    {
                        title: '价格(¥)',
                        key: 'tradeprice',
                        render: (h, params) => {
                            return  h("span",Number(params.row.tradeprice).toFixed(6))
                        }
                        
                    },
                    {
                        title: '数量',
                        key: 'tradecount',
                        render: (h, params) => {
                            return  h("span",Number(params.row.tradecount).toFixed(6))
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
        computed: {
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
        },
        
        mounted () {
            this.query();
            
            this.weituolist();
            console.log(this.$store.state)
            // let userinfo = this.$store.state.userinfo;

            if(this.$store.state.userinfo.emailset ){
                this.numbers++
            }
            if(this.$store.state.userinfo.mobileset){
                this.numbers++
            }
            if(this.$store.state.userinfo.tradepasswordset){
                this.numbers++
            }
            if(this.$store.state.userinfo.identityset){
                this.numbers++
            }
            if(this.$store.state.userinfo.loginpasswordset){
                this.numbers++
            }
            
            console.log("--------------",this.numbers)
            this.mairuzijin();
            this.maichuzijin();
            
        },
        methods: {
            buy(){//买入
                let that = this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbces.do",
                    data:{
                        "entrusttype":"1",
                        "operate":"1",
                        "entrustcoin":that.jichubizhong,
                        "tradecoin":that.jijiabizhogn,
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
                        that.buycount = "";
                        that.buyprice = "";
                        that.buymoney = "";
                        this.mairuzijin();
                        this.maichuzijin();
                    }else{
                        this.$Modal.console.error({
                            content: "创建委托失败"
                        })
                    
                    }
                })
            },
            sell(){//卖出
                let that = this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbces.do",
                    data:{
                        "entrusttype":"1",
                        "operate":"2",
                        "entrustcoin":that.jijiabizhogn,
                        "tradecoin":that.jichubizhong,
                        "entrustnum":that.sellcount,
                        "entrustprice":that.sellprice,
                        "reqresource":"1",
                    }
                }).then((res)=>{
                    if(res.data && res.data.err_code == "1"){
                        this.$Modal.success({
                            content: "创建委托成功"
                        })
                        that.sellcount = "";
                        that.sellprice = "";
                        that.sellmoney = "";
                        this.mairuzijin();
                        this.maichuzijin();
                    }else{
                        this.$Modal.console.error({
                            content: "创建委托失败"
                        })
                    }
                })
            },
            mairuzijin(){//买入可用资金
                let that=this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pblaf.do",
                    data:{
                        reqresource:1,
                        currencytype: that.jijiabizhogn
                    }
                }).then((res)=>{
                    if(res.data.accountFund && res.data&&res.data.err_code=="1"){
                        that.buy_keyong=res.data.accountFund[0].usablefund
                        that.buy_dongjie=res.data.accountFund[0].frozenfund
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
                    if(res.data.accountFund && res.data&&res.data.err_code=="1"){
                        that.sell_keyong=res.data.accountFund[0].usablefund
                        that.sell_dongjie=res.data.accountFund[0].frozenfund
                    }
                })
            },
            revoke(){
                this.$Modal.info({
                    content: "功能暂未开放"
                })
            },
            show(row){//撤单
                console.log(row);
                let that= this;
                this.$Modal.confirm({
                    title: '',
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
                // this.$Modal.info({
                //     content: "功能暂未开放"
                // })
            },
            changePage(){

            },
            timeschange(val){
                this.begintime = val;
            },
            timeschange1(val){
                this.begintime1 = val;
            },
            weituojilu () {
                console.log(this.begintime)
                if(this.begintime.length){
                    this.query_entrust(this.jichubizhong,this.begintime[0],this.begintime[1]);
                }else{
                    this.query_entrust()
                }
               
            },
            weituojilu1 () {

                if(this.begintime1.length){
                    this.query_entrust1(this.jichubizhong,this.begintime1[0],this.begintime1[1]);
                }else{
                    this.query_entrust1()
                }
            },
            buy_price(){
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
                

            },
            buy_count(){
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
            },
            sell_price(){
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
                    that.sellmoney = (that.sellcount*that.sellprice).toFixed(6);
                },20)

            },
            sell_count(){
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
                    that.sellmoney = (that.sellcount*that.sellprice).toFixed(6);
                },20)
            },
            // 委托列表表头
            weituolist () {
                this.weituo_columns = [
                    {
                        title:"总买入数("+this.jichubizhong+")",
                        key: "totalbuynum",
                        render (h,row){
                            if(row.row.totalbuynum){
                                return h("span",Number(row.row.totalbuynum).toFixed(6));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(6))
                            }
                            
                        }
                    },
                    {
                        title:"平均买入价(CNYT)",
                        key: "avebuyprice",
                        render (h,row){
                            if(row.row.avebuyprice){
                                return  h("span",Number(row.row.avebuyprice).toFixed(6));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(6))
                            }
                            
                        }
                    },
                    {
                        title:"总卖出数("+this.jichubizhong+")",
                        key: "totalsellnum",
                        render (h,row){
                            if(row.row.totalsellnum){
                                return  h("span",Number(row.row.totalsellnum).toFixed(6));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(6))
                            }
                            
                        }
                    },
                    {
                        title:"平均卖出价(CNYT)",
                        key: "avesellprice",
                        render (h,row){
                            if(row.row.avesellprice){
                                return  h("span",Number(row.row.avesellprice).toFixed(6));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(6))
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
                                return h("span",Number(params.row.entrustcount).toFixed(6))
                            }
                        },
                        {
                            title: '价格',
                            key: 'tradeprice',
                            render: (h,params)=>{
                                return h("span",Number(params.row.tradeprice).toFixed(6))
                            }
                        },
                        {
                            title: '金额',
                            key: 'entrustamount',
                            render: (h,params)=>{
                                return h("span",Number(params.row.entrustamount).toFixed(6))
                            }
                        },
                        {
                            title: '成交量',
                            key: 'tradecount',
                            render: (h,params)=>{
                                return h("span",Number(params.row.tradecount).toFixed(6))
                            }
                        },
                        {
                            title: '成交金额',
                            key: 'tradeamount',
                            render: (h,params)=>{
                                if (params.row.tradeamount && params.row.tradeamount!="null") return  h("span",Number(params.row.tradeamount).toFixed(6))
                                    else return h("span","")
                            }
                        },
                        {
                            title: '手续费',
                            key: 'charge',
                            render: (h,params)=>{
                                return h("span",Number(params.row.charge).toFixed(6))
                            }
                        },
                        {
                            title: '平均成交价',
                            key: 'averageprice',
                            render: (h,params)=>{
                                return h("span",Number(params.row.averageprice).toFixed(6))
                            }
                        },
                        {
                            title: this.order_record_cloumns_title,
                            key: 'status',
                            render: (h,params) =>{
                                // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
                                if(params.row.status == "1"){
                                    return h("span","成交")
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
                                    return h("span","撤销")
                                }else if(params.row.status == "4"){
                                    return  h('span', "部分成交撤销");
                                }
                            }
                        }
                ]
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
                        currencytype:"ETH",
                        pagesize: 10,
                        reqresource:1
                    }
                })
                .then(function (response) {
                    console.log(response)
                    console.log(response.data.latestDeal);
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
                        coin : 'ETH',//币种
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
                        console.log(sortObj)

                        // 最新成交价格
                        that.price_datas = sortObj;
                    
                })
            },
            ss(value){
                console.log(value)
            },
            //查询委托
            query_entrust (currencycode,starttime,endtime) {
                console.log(currencycode,starttime,endtime)
                let that = this;
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pbets.do',
                    data: {
                        "currencytype":currencycode ? currencycode : 'ETH',//币种
                        "starttime":starttime ? starttime : "",
                        "endtime":endtime ? endtime:"",
                        "pageno":"1",
                        "pagesize":"14",
                        "reqresource":"1",
                        "status":"1,2,4"
                    }
                })
                .then((response) => {
                    console.log("weituo======",response)
                    if(response.data){
                        that.weituo_data = [{
                            avebuyprice : response.data.avebuyprice,
                            avesellprice: response.data.avesellprice,
                            totalbuynum: response.data.totalbuynum,
                            totalsellnum: response.data.totalsellnum
                        }]
                        that.order_record_data = response.data.dealManage;
                    }
                })
            },
            query_entrust1 (currencycode,starttime,endtime) {

                let that = this;
                // 交易
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pbdms.do',
                    data: {
                       "currencytype":currencycode ? currencycode : 'ETH',//币种
                        "starttime":starttime ? starttime : "",
                        "endtime":endtime ? endtime : "",
                        "pageno":"1",
                        "pagesize":"14",
                        "reqresource":"1",
                    }
                })
                .then((response) => {
                    console.log("weituo======",response)
                    if(response.data){
                        that.weituo_data = [{
                            avebuyprice : response.data.avebuyprice,
                            avesellprice: response.data.avesellprice,
                            totalbuynum: response.data.totalbuynum,
                            totalsellnum: response.data.totalsellnum
                        }]

                        that.order_record_data1 = response.data.dealManage;
                    }
                    
                })
            },
            query_entrust2(currencycode,starttime,endtime){
                let that = this;
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pbets.do',
                    data: {
                        "currencytype":currencycode ? currencycode : 'ETH',//币种
                        "starttime":starttime ? starttime : "",
                        "endtime":endtime ? endtime:"",
                        "pageno":"1",
                        "pagesize":"14",
                        "reqresource":"1",
                        status:"0,3"
                    }
                })
                .then((response) => {
                    console.log("chedan======",response)
                    if(response.data){
                        that.weituo_data = [{
                            avebuyprice : response.data.avebuyprice,
                            avesellprice: response.data.avesellprice,
                            totalbuynum: response.data.totalbuynum,
                            totalsellnum: response.data.totalsellnum
                        }]
                        that.order_record_data2 = response.data.dealManage;
                    }
                })
            },
            safe () {
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
                if(name == "weituo"){
                    this.query_entrust()
                    this.order_record_cloumns_title = "状态";
                    
                }
                if(name == "jiaoyijilu"){
                    this.query_entrust1()
                    this.order_record_cloumns_title = "状态"
                }
                if(name == "chedan"){
                    this.query_entrust2();
                    this.order_record_cloumns_title = "操作"
                }
                this.wt_title();
                this.types = name; 
                this.begintime = "";
                this.begintime1 = '';
                
            },
            // info (name) {
                //     this.jichubizhong=name;
                //     let key = name;
                //     this.weituolist();
                //     switch (key) {
                //         case "BTC":
                //                 this.btc("00")
                //             break;
                //         case "ETH":
                //                 this.eth("11")
                //             break;
                    
                //         default:
                //             break;
                //     };
                    
                // },
                // btc (ss) {
                //     console.log(ss)
                //     this.query();
                // },
                // eth (ss) {
                //     console.log(ss)
                //     this.query();
            // },
            dblclick (row,index) {
                // console.log("==========dbclick===========")
                // console.log(row,index)
                if(row.operate == "2"){
                    this.buycount = row.count;
                    this.buyprice = row.price;
                    this.buymoney = (this.buycount*this.buyprice).toFixed(6);
                }else{
                    this.sellcount = row.count;
                    this.sellprice = row.price;
                    this.sellmoney = (this.sellcount*this.sellprice).toFixed(6);
                }
            },
            chongzhi () {
                this.$router.push("assets/recharge")
            },
            tixian () {
                this.$router.push("assets/withdraw")
            }
        }
    }
</script>

<style lang="scss">
    .trade{
        width:1200px;
        margin: 0 auto;
        // padding-top:50px;
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
                width:10%;
                text-align: center;
                // padding:20xp 0px;
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
        // .jiantou{
            //     margin-top: 11px;
            //     line-height: 32px;
            //     width:105px;
            //     height:32px;
            //     text-align: center;
            //     position: relative;
            //     float: left;
            // }
            // .btn-style-1{
            //     background: #80A4ED;
            //     color: #fff;
            // }
            // .btn-style-2{
            //     background: #C0D0F0;
            //     color: #fff;
            // }
            // .btn-special-1{
            //     overflow: visible;
            //     margin-right: 10px;
            //     margin-left: 10px;
            // }
            // .btn-special-1:after, .btn-special-1:before {
            //     content: '';
            //     position: absolute;
            //     top: 0;
            //     bottom: 0;
            //     -webkit-transition: all .6s linear;
            //     -moz-transition: all .6s linear;
            //     -ms-transition: all .6s linear;
            //     transition: all .6s linear;
            // }
            // .btn-special-1:after, .btn-special-1:before {
            //     border-left: 20px solid transparent;
            //     border-top: 16px solid transparent;
            //     border-bottom: 16px solid transparent;
            // }
            // .btn-style-1.btn-special-1:before {
            //     border-bottom-color: #80A4ED;
            //     border-top-color: #80A4ED;
            // }
            // .btn-special-1:before {
            //     right: 100%;
            // }
            // .btn-special-1:after {
            //     border-left-color: #80A4ED;
            // }
            // .btn-special-1:after {
            //     left: 100%;
            // }
            // .btn-style-2.btn-special-1:before {
            //     border-bottom-color: #C0D0F0;
            //     border-top-color: #C0D0F0;
            // }
            // .btn-style-2.btn-special-1:after {
            //     border-left-color: #C0D0F0;
            // }
            // .btn-style-3 {
            //     color: #a0b3da;
            //     background-color: #EAF0FC;
            // }
            // .btn-style-3.btn-special-1:before {
            //     border-bottom-color: #EAF0FC;
            //     border-top-color: #EAF0FC;
            // }
            // .btn-style-3.btn-special-1:after {
            //     border-left-color: #EAF0FC;
        // }
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