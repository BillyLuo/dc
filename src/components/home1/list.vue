<template>
    <div class="list">
        <div class="chart_menu">
            <Menu ref="" class="menus" mode="horizontal"  :active-name="activeName" @on-select='selectMenu'>
                <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
                    {{value.name}}
                </MenuItem>
            </Menu>
           
            <Input icon="search" v-model="value" placeholder="Enter something..." style="width: 200px;"></Input>
            <ButtonGroup class="list_style clear">
                <Button :class="{jgg_show:true,l_show:true,list_style_active:chart_active}" @click="showstyle('1')" icon="android-apps"></Button>
                <Button :class="{list_show:true,l_show:true,list_style_active:list_active}" icon="navicon-round"  @click="showstyle('2')"></Button>
            </ButtonGroup>
        </div>
        <div class="currency_list clear" v-show="chart_active">
            <div  v-for="(item,index) in array" v-if="index < 12" v-show="true" :key="index" :name='index' :class=" (index+1)%4 !== 0?'need_margin clear':'clear'" >
                <div class="draw_chart">
                    <img  :src='item.star?"/static/img/star1.png":"/static/img/star.png"' alt="">
                    <canvas class="charts" :id="'chart'+index"></canvas>
                </div>
                <div class="info_chart">
                    <p class="bizhong" style=""><img src="/static/img/logo.png"/>Ethereum {{item.bi}} <span :class="item.zhangfu >0?'span1 green':'span1 red'">{{item.zhangfu>0?"+"+item.zhangfu+"%":item.zhangfu+'%'}}</span></p>
                    <p class="price">{{ item.price }} {{ item.bi }}<span>${{ item.money }}</span></p>
                </div>
            </div>
            <div  v-for="(item,index) in array"  v-if="index >= 12" v-show='show_list' :key="index" :name='index' :class=" (index+1)%4 !== 0?'need_margin clear  animated '+animate:'clear  animated '+animate" >
                <div class="draw_chart">
                    <img  :src='item.str?"/static/img/star.png":"/static/img/star1.png"' alt="">
                    <canvas class="charts" :id="'chart'+index"></canvas>
                </div>
                <div class="info_chart">
                    <p class="bizhong" style=""><img src="/static/img/logo.png"/>Ethereum {{item.bi}} <span :class="item.zhangfu >0?'span1 green':'span1 red'">{{item.zhangfu>0?"+"+item.zhangfu+"%":item.zhangfu+'%'}}</span></p>
                    <p class="price">{{ item.price }} {{ item.bi }}<span>${{ item.money }}</span></p>
                </div>
            </div>
            <div :class="'showall '+animate" style="width:100%;">
                <Button @click="showall">{{ button_info }}</Button>
            </div>
        </div>
        <div class="list_table" v-show="list_active">
            <Table :columns="columns_list" :data="data">

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
    let list=[
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8,3,4,5,3.4,4.3,5.3,3.8,3.6,4.9,5.0,6.0],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },

         {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8,3,4,5,3.4,4.3,5.3,3.8,3.6,4.9,5.0,6.0],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
         {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8,3,4,5,3.4,4.3,5.3,3.8,3.6,4.9,5.0,6.0],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
         {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8,3,4,5,3.4,4.3,5.3,3.8,3.6,4.9,5.0,6.0],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
         {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8,3,4,5,3.4,4.3,5.3,3.8,3.6,4.9,5.0,6.0],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:0,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:0,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-20.33",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:0,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"10.38",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:0,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:0,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"3120.33",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:0,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:0,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        },
        {
            bi:"ETH",
            star:1,
            charts:[1.2,3.4,2,0.5,0.9,1.8,2.5,2.8],
            zhangfu:"-0.3",
            price:"23",
            money:'334'

        }
    ]
    import { Menu,MenuItem,ButtonGroup } from 'iview';
    import echarts from 'echarts';
    import bus from '../../bus/bus';
    export default {
        name:"list",
        components:{
            Menu,
            MenuItem,
            ButtonGroup
        },
        data(){
            return {
                value:"",
                menu,
                activeName:"USDT",
                show_list:false,
                array:list,
                button_info:"See All",
                animate:"fadeInDown",
                chart_active:true,
                list_active:false,
                columns_list:[],
                data:[
                ],
                // list_img_src:"/static/img/wjx.png"
            }
        },
        created(){
            this.columns_list=[   
                {
                    title: '币种',
                    key: 'currencyname',
                    align:'center',
                    sortable: true,
                    render:(h,param)=>{
                        // param.row.currencyname/param.row.tradecurrency
                        return  h('div',{
                            class:"list_imgs"
                        },[
                            h("img",
                                {
                                    attrs:{
                                        src:param.row.currencyname == "ETH" ? "/static/img/xzwjx.png" : "/static/img/wjx.png"
                                    },
                                    on:{
                                        click:()=>{
                                            this.collection(param)
                                        }
                                    }
                                }
                            ),
                            h("span",param.row.currencyname+"/"+param.row.tradecurrency)
                        ])
                    }
                },
                {
                    title: '价格',
                    key: 'curprice',
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
                    key: 'vol',
                    align:'center'
                }
                
            ];
        },
        mounted(){
            const that = this;
            this.echarts();
            window.onresize = () => {
                setTimeout(function(){
                    that.echarts();
                },100)
            }
            this.chushihua();
        },
        
        methods:{
            collection(param){
                console.log(param)
                this.chushihua();
            },
            chushihua(){
                let that = this;
                this.$ajax({
                    method: "post",
                    url: "/trade/tps/pbfcd.do",
                    data:{
                    'tradecurrency':"USDT",
                    reqresource:1
                    }
                }).then((data)=>{
                    console.log("shouye ====== ",data.data)
                    console.log(data.data.currencyDetail)
                    if(data.data.currencyDetail){
                        that.data = data.data.currencyDetail;
                    
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
                        myChart.setOption(option1)
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
            & > div{
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
                        width:103%;
                        height:120px;
                        position: absolute;
                        left:-5px;
                        bottom: -5px;
                        // background: #f00;

                    }
                }
                @media screen and (min-width:1440px){
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
            margin-bottom: 50px;
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
                    .ivu-table-column-center{
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
                width:60px;
                text-align: left;
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
</style>