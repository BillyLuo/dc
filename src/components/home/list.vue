<template>
    <div class="list">
        <!-- <div class="chart_menu">
            <Menu ref="" class="menus" mode="horizontal"  :active-name="activeName" @on-select='selectMenu'>
                <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
                    {{value.name}}
                </MenuItem>
            </Menu>
           
            <AutoComplete
                v-model="querycoin"
                :filter-method="query"
                placeholder="请输入关键词..."
                :data="coinData"
                @on-select="select"
                icon="ios-search"
                style="width:200px">
            </AutoComplete>
            <ButtonGroup class="list_style clear">
                <Button :class="{jgg_show:true,l_show:true,list_style_active:chart_active}" @click="showstyle('1')" icon="android-apps"></Button>
                <Button :class="{list_show:true,l_show:true,list_style_active:list_active}" icon="navicon-round"  @click="showstyle('2')"></Button>
            </ButtonGroup>
        </div> -->
        <div class="currency_list clear" v-show="chart_active">
            <div v-if="array.length" class="currency_list_inner clear">
                <div  v-for="(item,index) in array" v-if="index < 12" v-show="true" :key="index" :name='index' :class=" (index+1)%4 !== 0?'need_margin clear':'clear'" >
                    <div class="draw_chart">
                        <img @click="collect($event,item,index)" :src='item.star?"/static/img/star1.png":"/static/img/star.png"' alt="">
                        <canvas class="charts" :id="'chart'+index"></canvas>
                    </div>
                    <div class="info_chart">
                        <p class="bizhong" style=""><img :class="'icon-'+item.currencyname.toLowerCase()" :src="'/static/img/coin/'+item.currencyname+'_mid.png'"/>{{item.currencyname }} <span :class="item.range  >0?'span1 green':'span1 red'">{{item.range >0?"+"+item.range +"%":item.range +'%'}}</span></p>
                        <p class="price">{{ item.close }} {{ item.tradecurrency }}<span></span></p>
                    </div>
                </div>
                <div  v-for="(item,index) in array"  v-if="index >= 12" v-show='show_list' :key="index" :name='index' :class=" (index+1)%4 !== 0?'need_margin clear  animated '+animate:'clear  animated '+animate" >
                    <div class="draw_chart">
                        <img @click="collect($event,item,index)" :src='item.star?"/static/img/star1.png":"/static/img/star.png"' alt="">
                        <canvas class="charts" :id="'chart'+index"></canvas>
                    </div>
                    <div class="info_chart">
                        <p class="bizhong" style=""><img :class="'icon-'+item.currencyname.toLowerCase()" :src="'/static/img/coin/'+item.currencyname+'_mid.png'"/>{{item.currencyname }} <span :class="item.range  >0?'span1 green':'span1 red'">{{item.range >0?"+"+item.range +"%":item.range +'%'}}</span></p>
                        <p class="price">{{ item.close }} {{ item.tradecurrency }}<span></span></p>
                    </div>
                </div>
                <div :class="'showall '+animate" v-if="array.length > 12" style="width:100%;">
                    <Button @click="showall">{{ button_info }}</Button>
                </div>
            </div>
            <div v-else style="width: 100%;color: #f1f1f1;text-align:center;padding: 80px 0;">
                暂时没有获取到任何币种信息，请检查网络或重新登录
            </div>
        </div>
        <div class="list_table" v-show="list_active">
            <Table :columns="columns_list" :data="array">

            </Table>
        </div>
        
    </div>
</template>

<script>

let menu=[
    // {key:"ETH",name:"ETH"},
    {key:"USDT",name:"USDT"},
    // {key:"BTC",name:"BTC"}
];
    import { Menu,MenuItem,ButtonGroup,AutoComplete } from 'iview';
    import echarts from 'echarts';
    import bus from '../../bus/bus';
    import index from 'vue';
    import cookies from 'cookies-js';
    export default {
        name:"list",
        components:{
            Menu,
            MenuItem,
            ButtonGroup,
            AutoComplete
        },
        data(){
            return {
                isLogined:false,
                changed:false,
                querycoin:"",
                coinData:[],
                menu,
                activeName:"USDT",
                show_list:false,
                array:[],
                coinArray:[],//query 是暂存所有的cion
                queryArrray:[],
                button_info:"See All",
                animate:"fadeInDown",
                chart_active: false,
                list_active: true,
                columns_list:[],
                data:[
                ],
                // list_img_src:"/static/img/wjx.png"
            }
        },
        created(){
            this.columns_list=[   
                {
                    title: '股票名称',
                    key: 'currencyname',
                    align:'center',
                    sortable: true,
                    className:'currency-name link',
                    render:(h,param)=>{
                        // param.row.currencyname/param.row.tradecurrency
                        return  h('div',{
                          class:"list_imgs",
                        },[
                            // h("img",
                            //     {
                            //         attrs:{
                            //             src:param.row.star ? "/static/img/xzwjx.png" : "/static/img/wjx.png"
                            //         },
                            //         on:{
                            //             click:(e)=>{
                            //                 this.collect(e,param.row,param.index);
                            //             }
                            //         }
                            //     }
                            // ),
                            h('span',{
                              on: {
                                click:()=> {
                                  this.$router.push({
                                    name: 'stockdetail',
                                    query: {
                                      code: param.row.currencycode,
                                      type: '2'
                                    }
                                  })
                                }
                              }
                            },param.row.currencyname)
                        ])
                    }
                },
                {
                  title: '股票代码',
                  key: 'currencycode',
                  align: 'center',
                },
                {
                    title: '价格',
                    key: 'close',
                    align:'center',
                    sortable: true,
                    sortMethod(a,b,type){
                        if (type == 'asc') {
                            return a - b;
                        }else {
                            return b - a;
                        }
                    },
                },
                {
                    title: '涨幅',
                    key: 'range',
                    align:'center',
                    sortable: true,
                    sortMethod(a,b,type){
                        if (type == 'asc') {
                            return a - b;
                        }else {
                            return b - a;
                        }
                    },
                    render:(h,param)=>{
                        if(param.row.range < 0 ){
                            return  h('span',{class:'range_die ranges',style:"color:#f04516"}, Number(param.row.range).toFixed(2) + '%')
                        }else if(param.row.range > 0 ){
                            return  h('span',{class:'range_zhang ranges',style:"color:#3ec47b"}, "+"+ Number(param.row.range).toFixed(2) + '%')
                        }else{
                            return  h('span',{class:''}, Number(param.row.range).toFixed(2) + '%')
                        }
                        
                    }
                }
                ,
                {
                    title: '最高价',
                    key: 'high',
                    align:'center'
                }
                ,
                {
                    title: '最低价',
                    key: 'low',
                    align:'center'
                }
                ,
                {
                  title: '成交额',
                  key: 'amount',
                  align:'center'
                },
                {
                  title: '操作',
                  key: 'opt',
                  align:'center',
                  render: (h,param)=> {
                    return h('span',{
                      'class': 'home-go-trade',
                      on:{
                        click: ()=>{
                          console.log(param.row);
                          this.$router.push({
                            name: 'stockdetail',
                            query: {
                              code: param.row.currencycode,
                              type: '2'
                            }
                          })
                        }
                      }
                    },'去交易')
                  }
                }
                
            ];
        },
        mounted(){
            const that = this;
            window.onresize = () => {
                setTimeout(function(){
                    that.echarts();
                },100)
            }
            this.chushihua();
            this.validateLogin();
        },
        
        methods:{
            validateLogin() {
                var loginName = cookies.get('name');
                if (loginName) {
                    this.isLogined = true;
                }
            },
            query(value,option) {
                var coinArray = this.coinArray;
                var that = this;
                if (!value || value.length >= 2) {
                    setTimeout(() => {
                        that.echarts();
                    }, 300);
                }
                this.array = coinArray.filter((item,index)=>{
                    return item.currencyname.toUpperCase().indexOf(value.toUpperCase()) !== -1;
                })
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            select(value) {
                console.log(value);
            },
            getMarket(){
                var that = this;
                this.$ajax({
                    method:'post',
                    url:'/trade/tps/pbqct.do?t='+Date.now(),
                    data:{
                      // type: '1',
                      // tradecurrency: 'DC',
                      reqresource:'1'
                    }
                }).then((res)=>{
                    if (res.status == 200) {
                        if (res.data && res.data.err_code == '1') {
                            let collection = res.data.currencyDetail;
                            let market = that.data;
                            if (!collection || !collection.length) {
                                that.array = market.map((item,index)=>{
                                    item.star = false;
                                    item.charts = item.dayclose;
                                    return item;
                                })
                            }else {
                                var result = [];
                                result = market.map((item,index) => {
                                    item.star = false;
                                    item.charts = item.dayclose;
                                    for (var i =0;i<collection.length;i++) {
                                        if (item.currencyname == collection[i].currencyname ){
                                            item.star = true;
                                        }
                                    }
                                    return item;
                                })
                                console.log('start00000',result);
                                that.array = result;
                            }
                            this.coinArray = Object.assign([],this.array);
                            if (that.changed) {
                                return;
                            }else {
                                setTimeout(()=>{
                                    that.echarts();                                    
                                },150)
                                that.changed = true;
                            }
                        }else {
                            that.initMarket();
                        }
                    }else {
                        that.initMarket();
                    }
                }).catch((err) => {
                    that.initMarket();
                })
            },
            initMarket(){
                let that = this;
                let market = that.data;
                if (market.length) {
                    that.array = market.map((item,index)=>{
                        item.star = false;
                        item.charts = item.dayclose;
                        return item;
                    })
                }
                if (that.changed) {
                    return;
                }else {
                    setTimeout(()=>{
                        that.echarts();                                    
                    },150)
                    that.changed = true;
                }
            },
            //收藏
            collect(e,item,index) {
                let that = this;
                let currency = item.currencyname;
                let tradecurrency = item.tradecurrency;
                let type = 'insert';
                let reqresource = '1';
                if (item.star) {
                    type = 'delete';
                }
                let isLogined = this.isLogined;
                if (!isLogined) {
                    this.$Message.warning('请您先登录之后再收藏');
                    return;
                }
                this.$ajax({
                    url:'/trade/tps/pbcct.do',
                    method:'post',
                    data:{
                        currency,tradecurrency,type,reqresource
                    }
                }).then((res)=>{
                    console.log('----0000收藏了0000---',res);
                    if (type == 'insert') {
                        if (res.data && res.data.err_code == '1'){
                            this.$Message.success('收藏成功');
                            var target = this.array[index];
                            target.star = true;
                            // this.array.splice(index,1);
                            // this.array.push(target);
                            this.array[index]['star'] = true;
                            this.array = Object.assign([],this.array);
                            // this.getMarket();
                        }else if (res.status == 200 && res.data && res.data.err_code != '1' && res.data.msg){
                            if (res.data.msg.match('session')){
                                this.$Message.warning('您的登录信息已经超时，请重新登录。');
                            }else {
                                this.$Message.warning('收藏失败,'+res.data.msg);
                            }
                        }else {
                            this.$Message.warning('收藏失败,请稍后重试');
                        }
                    }else {
                       if (res.data && res.data.err_code == '1'){
                            this.$Message.success('取消收藏成功');
                            this.array[index].star = false;
                            this.array = Object.assign([],this.array);
                            // this.getMarket();
                        }else if (res.status == 200 && res.data && res.data.err_code != '1' && res.data.msg){
                            if (res.data.msg.match('session')){
                                this.$Message.warning('您的登录信息已经超时，请重新登录。');
                            }else {
                                this.$Message.warning('收藏失败,'+res.data.msg);
                            }
                        }else {
                            this.$Message.warning('取消收藏失败,请稍后重试');
                        } 
                    }
                }).catch((err)=>{
                    if (type == 'insert') {
                        console.log('lalalallala收藏失败了',err);
                        this.$Message.warning('收藏失败,请稍后重试');
                    }else {
                        console.log('lalalallala取消收藏失败了',err);
                        this.$Message.warning('取消收藏失败,请稍后重试');
                    }
                })
            },
            collection(param){
                console.log(param)
                this.chushihua();
            },
            chushihua(){
                let that = this;
                this.$ajax({
                    method: "post",
                    url: "/trade/tdc/pbfcd.do",
                    data:{
                      type: '2',
                      'tradecurrency':"DC",
                      reqresource:1
                    }
                }).then((data)=>{
                    console.log('0000000000000000',data.data.currencyDetail)
                    if(data.data && data.data.currencyDetail){
                      that.data = data.data.currencyDetail;
                      that.coinData = data.data.currencyDetail.map((item,index)=>{
                          return item.currencyname;
                      })
                      that.coinArray = data.data.currencyDetail;
                      that.array = that.coinArray;
                      // that.getMarket();
                    }
                })
            },
            showstyle(val){
                console.log(val)
                let that=this;
                if(val =="1"){
                    this.chart_active= true;
                    this.list_active = false;
                    that.echarts();
                    window.onresize = () => {
                        setTimeout(function(){
                            that.echarts();
                        },100)
                    }
                }
                if(val =="2"){
                    this.chart_active= false;
                    this.list_active = true;
                }
            },
            echarts(){
                var colors = ['#f6e89d', '#afccf0', '#f4d2af', "#7fd8c0"];  
                let that = this;
                this.array.map((item,index)=>{
                    if (index > 11) return false;
                    let colorindex = parseInt(Math.random()* 4);
                    var el = document.getElementById("chart"+index);
                    if (el) {
                        echarts.dispose(el)
                        let myChart = echarts.init(el);
                        let option1 = {
                                backgroundColor:'#fff',
                                grid:{
                                    left:0,
                                    right:0,
                                    bottom:0,
                                    top:0
                                },
                                xAxis: {
                                    show: false,
                                    name:'',
                                    type: 'category',
                                    boundaryGap: false,
                                },
                                yAxis:{ 
                                    show: false,
                                    splitLine:{show: false},
                                    type:'value',
                                },
                                
                                series: [
                                    {
                                        id:"买入",
                                        type: 'line',
                                        symbol: "",
                                        symbolSize: 0,
                                        name: '数量',
                                        data: item.charts,
                                        lineStyle: {
                                            color: colors[colorindex],
                                            width:1
                                        },
                                        areaStyle: {
                                            color:colors[colorindex],
                                            opacity:0.3
                                            
                                        }
                                    }
                                ]
                            };
                        myChart.hideLoading();
                        myChart.setOption(option1);
                    }
                })
            },
            echarts1(){
                var colors = ['#f6e89d', '#afccf0', '#f4d2af', "#7fd8c0"];  
                let that = this;
                this.array.map((item,index)=>{
                    if (index > 11){
                        let colorindex = parseInt(Math.random()* 4);
                        var el = document.getElementById("chart"+index);
                        if (el) {
                            echarts.dispose(el)
                            let myChart = echarts.init(el);
                            let option1 = {
                                    backgroundColor:'#fff',
                                    grid:{
                                        left:0,
                                        right:0,
                                        bottom:0,
                                        top:0
                                    },
                                    xAxis: {
                                        show: false,
                                        name:'',
                                        type: 'category',
                                        boundaryGap: false,
                                    },
                                    yAxis:{ 
                                        show: false,
                                        splitLine:{show: false},
                                        type:'value',
                                    },
                                    
                                    series: [
                                        {
                                            id:"买入",
                                            type: 'line',
                                            symbol: "",
                                            symbolSize: 0,
                                            name: '数量',
                                            data: item.charts,
                                            lineStyle: {
                                                color: colors[colorindex],
                                                width:1
                                            },
                                            areaStyle: {
                                                color:colors[colorindex],
                                                opacity:0.3
                                                
                                            }
                                        }
                                    ]
                                };
                            myChart.hideLoading();
                            myChart.setOption(option1)
                        }
                    }
                })
            },
            showall(){
                if(this.show_list == true){
                    this.button_info = "See All";
                    this.animate="fadeOutUp"
                    setTimeout(()=>{
                        this.show_list=false; 
                    },600)
                    
                }else{
                    this.animate="fadeInDown"
                    this.show_list=true; 
                    setTimeout(()=>{
                        this.echarts1();
                    },100)
                    this.button_info ='Retract';
                }
                
            },
            selectMenu(name){
                bus.$emit("vl_currency",name)
            }
        }
    }
</script>

<style lang='scss'>


    .list{
        width:100%;
        // min-width:10px;
        min-height:300px;
        background: #353535;
        padding:30px 48px;
        .chart_menu{
            text-align: center;
            .menus {
                display: inline-block;
                height: 60px;
                line-height: 60px;
                background: none;
                vertical-align: middle;
                .ivu-menu-item{
                    color:#fff;
                    border-bottom:none;
                    padding:0;
                    margin-right:65px;
                }
                .ivu-menu-item:hover{
                   border-bottom: 2px solid #2d8cf0;
                }
                .ivu-menu-item-selected{
                    color:#fff;
                    border-bottom: 2px solid #2d8cf0;
                }
                
            }
            .menus:after{
                height:0;
            }
            .ivu-input-icon-normal + .ivu-input{
                padding-right: 0;
                padding-left:32px;
            }
            .ivu-input-icon{
                left:0 ;
            }
            .ivu-input{
                background:#404448;
                border-radius:3px;
                width:202px;
                height:30px;
                border:none;
                color:#8d8f8c;
            }
            .list_style{
                float:right;
                margin-top: 15px;
                width:60px;
                .ivu-btn{
                    padding:3px 9px;
                    font-size:14px;
                }
                .ivu-btn:focus {
                    -webkit-box-shadow: none;
                    box-shadow: none;
                }
                .l_show{
                    width:30px;
                    height:30px;
                }
                .jgg_show{
                    // background: #2d8cf0;
                    border:none;
                    color:#333;
                    float: left;
                }
                
                .list_show{
                    border:none;
                    // background: #f4f4f4;
                    color:#333;
                    float: right;
                }
                .list_style_active{
                    background:#2d8cf0;
                    color:#fff;
                }
            }
            
           
        }
        .currency_list{
            margin-top: 30px;
            transition: 0.4s;
            & .currency_list_inner>div{
                float: left;
                margin-bottom: 10px;
                width:23.5%;
                // background: #ccc;
                margin-bottom:50px;
                .draw_chart{
                    background:#ffffff;
                    box-shadow:0 2px 16px 0 rgba(0,0,0,0.52);
                    border-radius:5px;
                    width:100%;
                    height:178px;
                    margin-bottom: 8px;
                    position: relative;
                    overflow: hidden;
                    img{
                        position: absolute;
                        width:20px;
                        height:20px;
                        left:12px;
                        top:12px;
                    }
                    .charts{
                        width:100%;
                        height:120px;
                        position: absolute;
                        left:0px;
                        bottom: 0px;
                        // background: #f00;

                    }
                }
                @media screen and (min-width:1360px){
                    .draw_chart{
                        height:200px;
                        .charts{
                            height:140px;
                        }
                    }
                    
                }
                .info_chart{
                    .bizhong{
                        line-height:30px; 
                        height:30px; 
                        color:#fff;
                        font-family:Helvetica;
                        // padding-left:30px;
                        &>img{
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 8px;
                            width:20px;
                        }
                        .span1{
                            font-family:Helvetica-Bold;
                            line-height: 30px;
                            display: inline-block;
                            padding:0 15px;
                            min-width:60px;
                            text-align: center;
                            background: #2a2a2a;
                            border-radius:5px;
                            float:right;
                        }
                        .red{
                            color:#ff750d;
                        }
                        .green{
                            color:#3ec47b;
                        }
                    }
                    .price{
                        font-family:Helvetica-Light;
                        font-size:14px;
                        color:#fff;
                        span{
                            margin-left: 10px;
                            color:#0babf2;
                        }
                    }
                   
                }
            }
            .need_margin{
                margin-right: 2%;
            }
        }
        .list_table{
            margin-top: 34px;
            .ivu-table:after{
                width:0;
            }
            .ivu-table::before{
                height:0;
            }
            .ivu-table-wrapper{
                border:none;
            }
            .ivu-table{
                font-size: 14px;
                background: none;
                .ivu-table-tbody{
                    color:#fff;
                    .ivu-table-column-center,.ivu-table-column-left{
                        background: #353535;
                    }
                }
                .ivu-table-row-hover{
                    .ivu-table-column-center{
                        background: #2a2b2d;
                    }
                }
                .ivu-icon-arrow-down-b {
                    color:#5a5a5a;
                }
                .ivu-icon-arrow-up-b {
                    color:#5a5a5a;
                }
                .ivu-table-sort i.on {
                    color: #adb7ac;
                }
            }
            .ivu-table td{
                height:40px;
                border-bottom:1px solid #404448;
            }
            
            .ivu-table-header{
                color:#adb7ac;
                .ivu-table-column-center{
                    background: #404448;
                    border:none;
                }
            }
            .ranges{
                display: inline-block;
                text-align: left;
                text-align: center;
            }
            .range_zhang{
                position: relative;
            }
            .range_die{
                position: relative;
            }
            .range_zhang:after{
                content: "";
                display: block;
                width:9px;
                height:5px;
                position: absolute;
                right:-11px;
                top:6px;
                background: url("/static/img/greenzhang.png") no-repeat;
            }
            .range_die:after{
                content: "";
                display: block;
                width:9px;
                height:5px;
                position: absolute;
                right:-11px;
                top:7px;
                background: url("/static/img/reddie.png") no-repeat;
            }
            .list_imgs{
                position: relative;
            }
            .ivu-table-cell img,span{
                vertical-align: middle;
            }
            .ivu-table-cell img{
                position: absolute;
                left:30px;
                top:4px;
            }

            @media screen and (max-width:1500px) {
                .ivu-table-cell img{
                    position: absolute;
                    left:0px;
                    top:4px;
                }
            }
        }
        .showall{
            width:100%;
            margin: 30px 0;
            text-align: center;
            button{
                background-image:linear-gradient(-180deg, #3fc67c 0%, #009688 100%);
                border-radius:5px;
                width:216px;
                height:38px;
                border:none;
                margin-top:27px;
                color:#fff;
                font-size:14px;
            }
            .ivu-btn:focus {
                -webkit-box-shadow: none;
                box-shadow: none;
            }
        }
    }
    .icon-byteball {
        // border-radius: 20%;
    }
    .home-go-trade {
      display: inline-block;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      padding: 0 10px;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      border: 1px solid #f1f1f1;
      opacity: .5;
      &:hover {
        opacity: 1;
      }
    }
</style>