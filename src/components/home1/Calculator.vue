<template>
    <div class="">
        <div class="calculator">
            <img src="/static/img/1.png" class="bg-img" alt="">
            <div class="cal_js">
                <p>Block chain commodity calculator</p>
                <Row class="textinput">
                    <Col span="8" class="cal">
                        <div class="icon_input">
                            <img src="/static/img/suanpan.png" alt="">
                        </div>
                        <div class="shuru">
                            <input class="inputs" v-model="value" size="large" @input="inputlength($event)" />
                            <Select class="selects" v-model="model1" slot="prepend" style="width: 80px;">
                                <Option v-for="item in cityList" :value="item.currencyname" :key="item.currencyname">{{ item.currencyname }}</Option>
                            </Select>
                        </div>
                        
                        <div class="jiantou">
                            <img  src="/static/img/jiantou.png" alt="">
                        </div>
                    </Col>
                    <Col span="8" class="cal">
                        <div class="icon_input">
                            <img src="/static/img/suanpan.png" alt="">
                        </div>
                        <Input v-model="value1" disabled size="large">
                            <Select v-model="model2" slot="prepend" style="width: 80px;">
                                <Option v-for="item in cityList" :value="item.currencyname" :key="item.currencyname">{{ item.currencyname }}</Option>
                            </Select>
                        </Input>
                    </Col>
                    <Col span="8" class="cal">
                        <div class="icon_input">
                            <img src="/static/img/sjt.png" style="width:30px;height:16px;margin-top:5px;" alt="">
                        </div>
                        <Button class="convers" @click="zhuanhuan">CONVERSION</Button>
                    </Col>
                </Row>
            </div>
        </div>
        
    </div>
</template>

<script>
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
import bus from '../../bus/bus';
    export default {
        data() {
            return {
                cityList:[],
                jijia:'USDT',
                value: '',
                value1: '',
                model1: 'ETH',
                model2: 'USDT'
            }
        },
        created(){
            bus.$on('vl_currency', (val) => { //Hub接收事件
                this.jichubizhogn = val;
            });
        },
        mounted(){
            this.selectCurrency()
        },
        methods:{
            inputlength(e){
                console.log(e)
                var value = e.target.value;
                if (!value) {
                    this.value = '';
                }else {
                    console.log(reg.test(value))
                    if (reg.test(value)) {
                        this.value = value;
                    }else {
                        value = value.slice(0,-1);
                        console.log(value)
                        var matched = value.match(reg);
                        console.log(matched)
                        if (matched && matched.length) {
                            this.value = matched[0];
                        }else {
                            this.value  = '';
                        }
                    }
                }
                
            },
            selectCurrency(){
                this.cityList = [];
                let that=this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbfct.do",
                    data:{
                        reqresource:1
                    }
                }).then((res)=>{
                    if(res.data.currencys && res.data.err_code == "1" && res.data){
                        res.data.currencys.map((item)=>{
                            console.log(item)
                            that.cityList.push({
                                currencyname:item.currencyname
                            })
                        })
                    }
                })
            },
            zhuanhuan(){
                // console.log(this.value);
                // console.log(this.model1);
                // console.log(this.model2);
                // console.log(this.jijia);
                let that = this;
                this.$ajax({
                    method:"post",
                    url:"/trade/tps/pbccp.do",
                    data:{
                        currency:that.model1, //币种
                        exccurrency:that.model2, //需要兑换的币种
                        tradecurrency:that.jijia, //计价币种
                        currencynum:that.value.toString(),//数量
                        reqresource:1
                    }
                }).then((data)=>{
                    // console.log(data)
                    if(data.data && data.status==200 && data.data.err_code == "1"){
                        that.value1=data.data.price
                    }else{
                        that.value1 = ""
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="scss">
    .calculator{
        // background:#2c2d2f;
        
        width:100%;
        position: relative;
        .bg-img{
            width:100%;
            display: block;
            // opacity: 0.8;
        }
        .cal_js{
            position: absolute;
            padding:0 47px;
            width:100%;
            height:100%;
            background: rgba($color: #000000, $alpha: 0.8);
            top:0;
            left:0;
            font-family:Helvetica;
            p{
                font-size:32px;
                color:#ffffff;
                letter-spacing:0;
                text-align:center;
                margin-top: 82px;
            }
            .textinput{
                margin-top:100px;
                .shuru{
                    position: relative;
                }
                .inputs{
                    width:100%;
                    height:50px;
                    border-radius: 5px;
                    border:none;
                    padding-left:90px;
                }
                .selects{
                    position:absolute;
                    top:0;
                    left:0;
                    height:50px;
                    .ivu-select-selection{
                        height:50px;
                        .ivu-select-selected-value{
                            height:49px;
                            line-height: 49px;
                            background: #fff;
                        }
                    }
                    .ivu-btn:focus {
                        -webkit-box-shadow: none;
                        box-shadow: none;
                    }
                    .ivu-select-visible .ivu-select-selection {
                        
                        border-color: #dddee1;
                        outline: 0;
                        -webkit-box-shadow: none;
                        box-shadow: none;
                    }
                }
                .ivu-select-selection:hover {
                    border-color: #dddee1;
                }
                .ivu-select-visible .ivu-select-selection {
                    border-color: #dddee1;
                    outline: 0;
                    -webkit-box-shadow: none;
                    box-shadow: none;
                }
                .cal{
                    padding:0 40px;
                    text-align: center;
                    position: relative;
                    background: none;
                    .ivu-input-disabled{
                        color:#333;
                    }
                    .jiantou{
                        position: absolute;
                        height:50px;
                        width:30px;
                        right:-15px;
                        bottom:0;
                        text-align: center;
                        img{
                            width:30px;
                            height:21px;        
                            position:absolute;
                            left:0;
                            top:50%;
                            margin-top: -10.5px;
                        }
                    }
                    .convers{
                        height:50px;
                        border:none;
                        width:100%;
                        margin-top: 3px;
                        background-image:linear-gradient(-180deg, #13daff 0%, #1a7da9 100%);
                        color:#fff;
                        font-family:Helvetica-Bold;
                        font-size:14px;
                    }
                    .ivu-btn:focus {
                        -webkit-box-shadow: none;
                        box-shadow: none;
                    }
                }
                .icon_input{
                    margin-bottom: 30px;
                    img{
                        width:30px;
                    }

                }
                .ivu-input-wrapper{
                    height:50px;
                    .ivu-select{
                        height:50px;
                    }
                    .ivu-select-placeholder{
                        height:50px;
                        line-height: 50px;
                    }
                    .ivu-select-selection{
                        height:50px;
                    }
                    .ivu-select-dropdown{
                        top:46px !important;
                    }
                    .ivu-input-group-prepend{
                        height:50px;
                        padding:0 7px;
                    }
                    .ivu-select:focus .ivu-select-selection {
                        border:none;
                        outline: 0;
                        -webkit-box-shadow: none;
                        box-shadow: none;
                    }
                    .ivu-input-group-prepend .ivu-select-selection, .ivu-input-group-append .ivu-select-selection {
                        background-color: #fff;
                        margin: 0; 
                    }
                    .ivu-select-selected-value{
                            height: 50px;
                            line-height: 50px;
                            font-weight: 600;
                    }
                }
                .ivu-input-large{
                    height:50px;
                }
            }
            @media screen and (min-width:1400px) {
                p{
                    margin-top:120px;
                }
            }
            @media screen and (min-width: 1200px) and (max-width: 1400px) {
                .textinput{
                    margin-top:100px;
                }
                
            }
            @media screen and (min-width: 1400px) and (max-width: 1600px) {
                .textinput{
                    margin-top:100px;
                }
                
            }
            @media screen and (min-width: 1600px) {
                .textinput{
                    margin-top:170px;
                }
                
            }
           
        }
    }
</style>
