<template>
    <div class="api">
        <div class="member-tips">
            <div class="box">
                <div class="name fs-18 color-dark">
                    重要<span class="color-EE6E31">提示</span>
                </div>
                <div class="txt lh-16em fs-14 color-999999">
                    <p>每个用户最多只能创建1个密钥对。</p>
                    <p>私有密钥允许您通过富币网开放协议提供API访问您账户并执行交易指令，我们为您提供密钥非常重要，请妥善保管。</p>
                </div>
            </div>
        </div>
        <div class="member-api-form">
            <Row class="mb-30">
                <Col span="3" class='fs-16 color-666666 lh-40'>
                    交易密码
                </Col>
                <Col span="10" class='fs-16 color-666666 lh-40'>
                    <!-- <input:value="mima"/>    -->
                    <Input  class="inputs input-outline" type='password' v-model="mima" size="large"></Input> 
                </Col>
            </Row>
            <Row class="mb-30">
                <Col span="3" class='fs-16 color-666666 lh-40'>
                    API权限
                </Col>
                <Col span="10" class='fs-16 color-666666 lh-40'>
                    <Select v-model="quanxian"  style="width:100%">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
            </Row>
            <Row class="mb-30">
                <Col span="3" class='fs-16 color-666666 lh-40'>
                    IP地址
                </Col>
                <Col span="10" class='fs-16 color-666666 lh-40'>
                   <Input  class="inputs input-outline" v-model="ipaddress" size="large" placeholder="不限制留空，多个IP用逗号隔开"></Input>     
                </Col>
            </Row>
            <Row class="">
                <Col span="13" class='tishi'>
                   <div>{{ sadfaf }}</div>
                </Col>
            </Row>
            <Row class="mb-30">
                <Col span="13" class='fs-16 color-666666 lh-40 btn'>
                   <Button type="primary" size="large" class="btn-cj" @click="chuangjian">创建</Button>
                </Col>
            </Row>
        </div>
        <Tabs value="name1">
            <TabPane label="我的密匙" name="name1">
                <div class="ext-table">
                    <Table :data="data1" no-data-text="<img class='wujilu' src='/static/img/icon-wujilu.png'/><br/><span class='tishixinxi'>您暂时没有密匙</span>" :columns="columns1" stripe></Table>
                </div>
            </TabPane>
        </Tabs>
    </div>  
</template>

<script>
import {Tabs,TabPane} from "iview"

    export default {
        components: {
            TabPane,
            Tabs
        },
        data() {
            return {
                mima: '',
                ipaddress: '',
                cityList: [
                    {
                        value: '1',
                        label: '交易'
                    },
                    {
                        value: '2',
                        label: '提现'
                    },
                    {
                        value: '3',
                        label: '交易与提现'
                    }
                ],
                quanxian: '1',
                sadfaf: '',
                columns1:[
                    {
                        title: '创建日期',
                        key: ''
                    },
                    {
                        title: 'API访问密钥(Access Key)',
                        key: ''
                    },
                    {
                        title: '权限',
                        key: ''
                    },
                    {
                        title: 'IP地址',
                        key: ''
                    },
                    {
                        title: '操作',
                        key: ''
                    }
                ],
                data1:[]
            }
        },
        methods: {
            chuangjian () {
                console.log(this.mima)
                console.log(this.quanxian)
                console.log(this.ipaddress)
                if(this.mima.length == 0){
                    this.sadfaf = "请输入交易密码";
                }else{
                    this.sadfaf = "";
                }
                //  this.$ajax({
                //     method: 'post',
                //     url: '/murphy/txs/tps/pblds.do',
                //     data: {
                //         "currencycode":"eth",
                //         "count":"5"
                //     }
                // })
                // .then(function (response) {
                //     console.log(response);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });


                // this.$ajax.post('http:/172.16.21.31:8000/txs/tps/pblds.do',{
                //     "currencycode":"eth",
                //     "count":"1"
                // })
                // .then(function(response){
                //     console.log(response.data)
                // })
            }
        }
    }
</script>

<style lang="scss">
    .api{
        min-height: 400px;
        padding-top:35px;
        .ivu-tabs-bar{
            margin-bottom: 0;
        }
        .member-tips{
            padding: 0 35px;
            margin-bottom:35px;
            .box {
                position: relative;
                border: 1px solid #F2F6FE;
                background-color: #FDFEFF;
                padding: 20px;
                border-radius: 3px;
                .name {
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    width: 110px;
                    transform: translate(0,-50%);
                    .color-EE6E31 {
                        color: #3166D2;
                    }
                }
                .fs-18 {
                    font-size: 18px;
                }

                .color-dark {
                    color: #333;
                }
                .txt {
                    padding-left: 110px;
                }
                .fs-14 {
                    font-size: 14px;
                }
                .color-999999 {
                    color: #999;
                }
                .lh-16em {
                    line-height: 1.6em;
                }
            }
        }
        .member-api-form{
            padding:0 35px;
            .fs-16 {
                font-size: 16px;
            }
            .color-666666 {
                color: #666;
            }
            .lh-40 {
                line-height: 40px;
            }
            .ivu-input-large{
                height:40px;
                outline:none;
            }
            .ivu-input{
                background: #FBFBFB;
                border-radius: 0;
                padding:0 15px;
                color:#666;
            }
            .ivu-input:focus {
                border: 1px solid #dddee1;
                box-shadow:none;
            }
            .ivu-input:hover {
                border-color: #dddee1;
            }
            .mb-30{
                margin-bottom:30px;
            }
            .ivu-select-selection{
                border-radius: 0;
                height:40px;
                background: #FBFBFB;
                color: #666;
                .ivu-select-placeholder{
                    height:40px;
                    line-height: 40px;
                }
            }
            .ivu-select-selected-value{
                height: 40px;
                line-height: 40px;
            }
            .ivu-select-selection:hover {
                border-color: #dddee1;
            }
            .ivu-select-visible{
                border-color:#dddee1; 
            }
            .ivu-select-visible .ivu-select-selection {
                border-color: #dddee1;
            }
            .ivu-select-visible .ivu-select-selection {
                box-shadow: none;
            }
            .tishi{
                color: #ff0000;
                font-size:12px;
                line-height: 20px;
            }
            .btn{
                text-align: center;
                .btn-cj{
                    padding: 8px 25px;
                }
            }
        }
        .ext-table{
            margin-bottom: 50px;
            table{
                width:100% !important;
                th{
                    text-align: center;
                }
                td{
                    text-align: center;

                }
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
    }
</style>
